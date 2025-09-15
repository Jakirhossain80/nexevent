// src/app/api/auth/signup/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Server misconfigured: MONGODB_URI is missing." },
        { status: 500 }
      );
    }

    let payload;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body. Expected JSON." },
        { status: 400 }
      );
    }

    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim().toLowerCase();
    const password = String(payload?.password || "");
    const image = payload?.image ? String(payload.image).trim() : null;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields (name, email, password) are required." },
        { status: 400 }
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");

    // Unique index (safe if exists)
    try {
      await users.createIndex({ email: 1 }, { unique: true });
    } catch {}

    const existing = await users.findOne({ email });

    // Hash once
    const hash = await bcrypt.hash(password, 12);
    const now = new Date();

    if (existing) {
      // CASE A: email exists BUT has no credential hash yet (e.g., Google-only user)
      const hasHash = Boolean(existing.passwordHash || existing.password);
      if (!hasHash) {
        const update = await users.updateOne(
          { _id: existing._id },
          {
            $set: {
              // prefer `passwordHash` going forward; keep legacy readable
              passwordHash: hash,
              // keep legacy field too if you want to stay compatible with old code:
              password: hash,
              name: existing.name || name,
              image: existing.image ?? image ?? null,
              provider: existing.provider || "credentials",
              updatedAt: now,
            },
            $setOnInsert: { createdAt: existing.createdAt || now },
          }
        );
        if (!update.acknowledged) {
          return NextResponse.json({ error: "Failed to attach password." }, { status: 500 });
        }
        return NextResponse.json({ ok: true, userId: String(existing._id), linked: true }, { status: 200 });
      }

      // CASE B: email exists AND already has a password -> block duplicate signup
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    // CASE C: New user (create)
    const doc = {
      name,
      email,
      passwordHash: hash, // ✅ canonical field
      password: hash,     // (optional) keep legacy for compatibility
      role: "user",
      image: image || null,
      provider: "credentials",
      createdAt: now,
      updatedAt: now,
    };

    const result = await users.insertOne(doc);
    if (!result?.insertedId) {
      return NextResponse.json(
        { error: "Failed to create user. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, userId: String(result.insertedId) }, { status: 201 });
  } catch (err) {
    console.error("SIGNUP_API_ERROR:", err?.message || err);
    if (String(err?.message || "").includes("E11000")) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
