import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", index: true, required: true },
  userId: { type: String, index: true, required: true }, // session.user.id
  quantity: { type: Number, default: 1, min: 1 },
  contactEmail: { type: String, required: true },
  attendee: {
    name: String,
    phone: String,
    note: String,
  },
  amount: { type: Number, default: 0 }, // price * quantity snapshot
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed", index: true },
  bookedAt: { type: Date, default: () => new Date(), index: true },
}, { timestamps: true, collection: "bookings" });

BookingSchema.index({ userId: 1, bookedAt: -1 });
export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
