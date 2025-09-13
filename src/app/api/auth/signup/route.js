import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectMongoose } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, image } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongoose();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12); // cost factor

    await User.create({
      name,
      email,
      image: image || null,
      provider: "credentials",
      passwordHash,
    });

    return NextResponse.json({ ok: true, message: "Account created" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
