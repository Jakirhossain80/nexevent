// src/app/api/events/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
  const mine = searchParams.get("mine") === "1";
  const q = (searchParams.get("q") || "").trim();
  const session = await getServerSession(authOptions);

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (mine && session?.user?.id) filter.ownerId = session.user.id;

  const skip = (page - 1) * limit;
  const items = await db
    .collection("events")
    .find(filter)
    .sort({ startAt: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection("events").countDocuments(filter);
  return NextResponse.json({ items, page, total, limit });
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await getDb();
    const body = await req.json();

    const title = String(body.title || "").trim();
    const startAt = new Date(body.startAt);
    const endAt = new Date(body.endAt);
    if (!title || !startAt || !endAt || Number.isNaN(+startAt) || Number.isNaN(+endAt)) {
      return NextResponse.json({ error: "Title and valid dates are required" }, { status: 400 });
    }

    // build doc
    const now = new Date();
    let slug =
      String(body.slug || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "event";

    // ensure unique-ish slug
    const exists = await db.collection("events").findOne({ slug });
    if (exists) slug += "-" + Math.random().toString(36).slice(2, 7);

    const doc = {
      ownerId: session.user.id,
      title,
      slug,
      description: String(body.description || ""),
      city: String(body.city || ""),
      venue: String(body.venue || ""),
      coverImage: body.coverImage || null,
      tags: Array.isArray(body.tags) ? body.tags : [],
      capacity: Math.max(0, Number(body.capacity || 0)),
      seatsBooked: 0,
      price: Math.max(0, Number(body.price || 0)),
      visibility: body.visibility === "private" ? "private" : "public",
      status: body.status === "published" ? "published" : "draft",
      startAt,
      endAt,
      createdAt: now,
      updatedAt: now,
    };

    const { insertedId } = await db.collection("events").insertOne(doc);
    return NextResponse.json({ ok: true, id: String(insertedId), slug }, { status: 201 });
  } catch (err) {
    console.error("[API /events POST] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
