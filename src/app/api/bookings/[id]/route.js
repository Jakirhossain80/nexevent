// src/app/api/bookings/[id]/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const _id = new ObjectId(params.id);
  const booking = await db.collection("bookings").findOne({ _id, userId: session.user.id });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const _id = new ObjectId(params.id);
  const booking = await db.collection("bookings").findOne({ _id, userId: session.user.id });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const patch = await req.json();
  if (patch.status === "cancelled" && booking.status !== "cancelled") {
    // release seats
    await db.collection("events").updateOne({ _id: booking.eventId }, { $inc: { seatsBooked: -booking.quantity } });
  }

  await db.collection("bookings").updateOne({ _id }, { $set: { status: patch.status, updatedAt: new Date() } });
  return NextResponse.json({ ok: true });
}
