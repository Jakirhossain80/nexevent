import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // NextAuth "users" base fields:
    name: { type: String },
    email: { type: String, unique: true, index: true, sparse: true },
    emailVerified: { type: Date, default: null },
    image: { type: String },

    // App-specific fields:
    provider: { type: String, enum: ["google", "credentials"], default: "credentials" },
    passwordHash: { type: String, default: null },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

