import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDb } from "@/lib/mongodb";


export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get("q") || "").trim();
  const mine = searchParams.get("mine") === "1";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
  const skip = (page - 1) * limit;

  const filter = {};
  if (q) {
    // optional text search if index exists
    filter.$text = { $search: q };
    try {
      await db.collection("events").createIndex(
        { title: "text", description: "text", tags: "text", city: "text", venue: "text" },
        { name: "events_text_idx" }
      );
    } catch {
      // ignore if already exists / insufficient permissions
    }
  }
  if (mine && session?.user?.id) filter.ownerId = session.user.id;

  const cursor = db
    .collection("events")
    .find(filter)
    .sort({ startAt: 1 })
    .skip(skip)
    .limit(limit);

  const [items, total] = await Promise.all([
    cursor.toArray(),
    db.collection("events").countDocuments(filter),
  ]);

  return NextResponse.json({ items, page, limit, total });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const body = await req.json();

  // Build doc with validation
  const title = String(body.title || "").trim();
  const startAt = new Date(body.startAt);
  const endAt = new Date(body.endAt);

  if (!title || Number.isNaN(+startAt) || Number.isNaN(+endAt)) {
    return NextResponse.json({ error: "Title and valid start/end dates are required." }, { status: 400 });
  }

  // base slug from provided slug or title
  let slug =
    String(body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "event";

  // ensure unique slug (cheap suffix approach)
  const existing = await db.collection("events").findOne({ slug });
  if (existing) slug += "-" + Math.random().toString(36).slice(2, 7);

  const now = new Date();
  const doc = {
    ownerId: session.user.id,
    title,
    slug,
    description: String(body.description || ""),
    tags: Array.isArray(body.tags) ? body.tags : [],
    coverImage: body.coverImage || null,
    venue: String(body.venue || ""),
    city: String(body.city || ""),
    startAt,
    endAt,
    capacity: Math.max(0, Number(body.capacity || 0)),
    seatsBooked: 0,
    price: Math.max(0, Number(body.price || 0)),
    visibility: body.visibility === "private" ? "private" : "public",
    status: ["draft", "published", "archived"].includes(body.status) ? body.status : "draft",
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("events").insertOne(doc);
  return NextResponse.json({ ok: true, id: String(result.insertedId), slug }, { status: 201 });
}
