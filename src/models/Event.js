import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  ownerId: { type: String, index: true, required: true }, // session.user.id
  title: { type: String, required: true, index: "text" },
  slug: { type: String, index: true, unique: true },
  description: { type: String },
  tags: [{ type: String, index: true }],
  coverImage: { type: String },
  venue: { type: String },
  city: { type: String, index: true },
  startAt: { type: Date, required: true, index: true },
  endAt: { type: Date, required: true },
  capacity: { type: Number, default: 0 },
  seatsBooked: { type: Number, default: 0 }, // keep quick capacity checks fast
  price: { type: Number, default: 0 }, // 0 = free
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
}, { timestamps: true, collection: "events" });

EventSchema.index({ title: "text", description: "text", tags: 1, city: 1 });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
