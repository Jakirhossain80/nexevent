import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/bookings?status=confirmed|cancelled
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const { searchParams } = new URL(req.url);

  // (optional) status filter
  const allowedStatus = new Set(["confirmed", "cancelled"]);
  const statusParam = searchParams.get("status");
  const statusFilter = statusParam && allowedStatus.has(statusParam) ? { status: statusParam } : {};

  // --- NEW: include organizer scope (bookings for events the user owns) ---
  // Find the events owned by the current user
  const myEvents = await db
    .collection("events")
    .find({ ownerId: session.user.id }, { projection: { _id: 1 } })
    .toArray();

  const myEventIds = myEvents.map((e) => e._id);
  const orFilters = [
    // bookings the user made (purchases)
    { userId: session.user.id },
  ];

  // If the user owns events, include bookings for those events (organizer view)
  if (myEventIds.length) {
    orFilters.push({ eventId: { $in: myEventIds } });
  }

  const filter = { $and: [{ $or: orFilters }, statusFilter] };

  const cursor = db
    .collection("bookings")
    .find(filter, {
      projection: {
        _id: 1,
        eventId: 1,
        userId: 1,
        attendee: 1,
        quantity: 1,
        status: 1,
        amount: 1,
        bookedAt: 1,
        createdAt: 1,
        updatedAt: 1,
      },
      sort: { bookedAt: -1 },
    });

  const docs = await cursor.toArray();

  // Always serialize ObjectId -> string before returning to the client
  const items = docs.map((doc) => ({
    ...doc,
    _id: String(doc._id),
    eventId: doc.eventId ? String(doc.eventId) : null,
  }));

  return NextResponse.json({ items });
}





















// POST /api/bookings
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const body = await req.json();

  // Basic validation
  if (!body?.eventId) {
    return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
  }

  let eventId;
  try {
    eventId = new ObjectId(String(body.eventId));
  } catch {
    return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
  }

  const qty = Math.max(1, Number(body.quantity || 1));

  // Atomic capacity check & reserve seats
  const event = await db.collection("events").findOneAndUpdate(
    {
      _id: eventId,
      $expr: { $lte: [{ $add: ["$seatsBooked", qty] }, "$capacity"] },
    },
    { $inc: { seatsBooked: qty } },
    { returnDocument: "after" }
  );

  if (!event.value) {
    return NextResponse.json({ error: "Event full or not found" }, { status: 400 });
  }

  const amount = (event.value.price || 0) * qty;
  const now = new Date();

  const doc = {
    eventId,
    userId: session.user.id, // string, consistent with GET filter
    quantity: qty,
    contactEmail: String(body.contactEmail || session.user.email || "").toLowerCase(),
    attendee: {
      name: body.name || session.user.name || "",
      phone: body.phone || "",
      note: body.note || "",
    },
    amount,
    status: "confirmed",
    bookedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("bookings").insertOne(doc);
  return NextResponse.json({ ok: true, id: String(result.insertedId) }, { status: 201 });
}


