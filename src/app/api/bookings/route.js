// src/app/api/bookings/route.js  (GET list mine, POST create)
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const filter = { userId: session.user.id };
  if (status) filter.status = status;

  const items = await db.collection("bookings").find(filter).sort({ bookedAt: -1 }).toArray();
  return NextResponse.json({ items });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const body = await req.json();

  const eventId = new ObjectId(String(body.eventId));
  const qty = Math.max(1, Number(body.quantity || 1));

  // atomic capacity check: only update if seats available
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
  const doc = {
    eventId,
    userId: session.user.id,
    quantity: qty,
    contactEmail: String(body.contactEmail || session.user.email || "").toLowerCase(),
    attendee: { name: body.name || session.user.name || "", phone: body.phone || "", note: body.note || "" },
    amount,
    status: "confirmed",
    bookedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("bookings").insertOne(doc);
  return NextResponse.json({ ok: true, id: String(result.insertedId) }, { status: 201 });
}
