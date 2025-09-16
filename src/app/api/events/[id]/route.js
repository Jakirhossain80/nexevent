import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(_req, { params }) {
  try {
    const db = await getDb();
    const _id = new ObjectId(params.id);
    const event = await db.collection("events").findOne({ _id });
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(event);
  } catch (err) {
    console.error("[API /events/:id GET] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = await getDb();
    const _id = new ObjectId(params.id);

    const existing = await db.collection("events").findOne({ _id });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const patch = {
      title: body.title !== undefined ? String(body.title).trim() : existing.title,
      description: body.description !== undefined ? String(body.description) : existing.description,
      city: body.city !== undefined ? String(body.city) : existing.city,
      venue: body.venue !== undefined ? String(body.venue) : existing.venue,
      coverImage: body.coverImage !== undefined ? String(body.coverImage || "") || null : existing.coverImage,
      tags: Array.isArray(body.tags) ? body.tags : existing.tags,
      capacity: body.capacity !== undefined ? Math.max(0, Number(body.capacity || 0)) : existing.capacity,
      price: body.price !== undefined ? Math.max(0, Number(body.price || 0)) : existing.price,
      visibility: body.visibility === "private" ? "private" : body.visibility === "public" ? "public" : existing.visibility,
      status: ["draft", "published", "archived"].includes(body.status) ? body.status : existing.status,
      startAt: body.startAt ? new Date(body.startAt) : existing.startAt,
      endAt: body.endAt ? new Date(body.endAt) : existing.endAt,
      updatedAt: new Date(),
    };

    // Basic validation
    if (!patch.title || Number.isNaN(+patch.startAt) || Number.isNaN(+patch.endAt)) {
      return NextResponse.json({ error: "Title and valid dates are required" }, { status: 400 });
    }

    await db.collection("events").updateOne({ _id }, { $set: patch });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[API /events/:id PATCH] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = await getDb();
    const _id = new ObjectId(params.id);
    const existing = await db.collection("events").findOne({ _id });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.collection("events").deleteOne({ _id });
    // optional cascade:
    await db.collection("bookings").deleteMany({ eventId: _id });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[API /events/:id DELETE] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
