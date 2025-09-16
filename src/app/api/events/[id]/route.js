// src/app/api/events/[id]/route.js
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Safely convert to ObjectId
function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

/**
 * GET /api/events/:id
 * Public (or protect if needed). Returns a single event.
 */
export async function GET(req, ctx) {
  // ✅ await params
  const { id } = await ctx.params;
  const _id = toObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = await getDb();
  const event = await db.collection("events").findOne({ _id });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(event);
}

/**
 * PATCH /api/events/:id
 * Auth required. Only the owner can update.
 */
export async function PATCH(req, ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ await params
  const { id } = await ctx.params;
  const _id = toObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = await getDb();
  const existing = await db.collection("events").findOne({ _id });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.ownerId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const $set = {
    ...(body.title !== undefined ? { title: String(body.title) } : {}),
    ...(body.description !== undefined ? { description: String(body.description) } : {}),
    ...(body.venue !== undefined ? { venue: String(body.venue) } : {}),
    ...(body.city !== undefined ? { city: String(body.city) } : {}),
    ...(body.startAt !== undefined ? { startAt: new Date(body.startAt) } : {}),
    ...(body.endAt !== undefined ? { endAt: new Date(body.endAt) } : {}),
    ...(body.capacity !== undefined ? { capacity: Number(body.capacity) } : {}),
    ...(body.price !== undefined ? { price: Number(body.price) } : {}),
    ...(body.visibility !== undefined ? { visibility: String(body.visibility) } : {}),
    updatedAt: new Date(),
  };

  await db.collection("events").updateOne({ _id }, { $set });
  return NextResponse.json({ ok: true });
}

/**
 * DELETE /api/events/:id
 * Auth required. Only the owner can delete.
 */
export async function DELETE(req, ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ await params
  const { id } = await ctx.params;
  const _id = toObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = await getDb();
  const existing = await db.collection("events").findOne({ _id });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.ownerId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.collection("events").deleteOne({ _id });
  return NextResponse.json({ ok: true });
}
