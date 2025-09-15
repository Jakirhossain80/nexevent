import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // NextAuth "users" base fields
    name: { type: String },
    email: { type: String, unique: true, index: true, sparse: true },
    emailVerified: { type: Date, default: null },
    image: { type: String },

    // App-specific fields
    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },

    // Support both field names (your API currently writes `password`)
    // Keep them out of default query selection
    password: { type: String, default: null, select: false },
    passwordHash: { type: String, default: null, select: false },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "users",
  }
);

// Optional: ensure index in schema level (adapter also creates one)
UserSchema.index({ email: 1 }, { unique: true, sparse: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
