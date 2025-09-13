import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoose } from "@/lib/mongodb";
import Event from "@/models/Event"; // if you have one

export async function GET() {
  // Public listing? If private, keep the session check
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongoose();
  // ... fetch events owned by session.user.id if needed
  return NextResponse.json({ data: [] });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongoose();
  const body = await req.json();
  // ... create event with ownerId = session.user.id
  return NextResponse.json({ ok: true }, { status: 201 });
}
