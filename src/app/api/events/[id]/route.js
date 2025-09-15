import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(_req, { params }) {
  const db = await getDb();
  const event = await db.collection("events").findOne({ _id: new ObjectId(params.id) });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const _id = new ObjectId(params.id);
  const existing = await db.collection("events").findOne({ _id });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.ownerId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const patch = await req.json();
  patch.updatedAt = new Date();
  delete patch.ownerId; // owner cannot be changed

  await db.collection("events").updateOne({ _id }, { $set: patch });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const _id = new ObjectId(params.id);
  const existing = await db.collection("events").findOne({ _id });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.ownerId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await db.collection("events").deleteOne({ _id });
  // (optional) cascade: delete bookings for this event
  await db.collection("bookings").deleteMany({ eventId: _id });
  return NextResponse.json({ ok: true });
}
