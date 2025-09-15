"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookModal({ params }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: params.id, quantity, contactEmail: email }),
    });
    if (res.ok) {
      // close modal and refresh page data
      router.back();
    } else {
      alert((await res.json()).error || "Failed to book");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[999]">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6">
        <h2 className="text-lg font-semibold mb-3">Book Tickets</h2>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" required placeholder="Contact email" value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2" />
          <input type="number" min={1} value={quantity} onChange={(e)=>setQuantity(+e.target.value)}
            className="w-full rounded border px-3 py-2" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={()=>router.back()} className="px-4 py-2 rounded bg-slate-200">Cancel</button>
            <button className="px-4 py-2 rounded bg-indigo-600 text-white">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
