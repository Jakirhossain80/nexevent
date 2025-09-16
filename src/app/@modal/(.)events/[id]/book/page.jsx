// src/app/@modal/(..)events/[id]/book/page.jsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import Modal from "@/components/ui/Modal";

function BookFormInner() {
  const router = useRouter();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState(""); // fallback if user wants to use a different email
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: id,
          quantity,
          contactEmail: email || undefined,
          name,
          note,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to book");
      return data;
    },
    onSuccess: () => {
      setMsg({ type: "success", text: "Booking confirmed!" });
      // Close modal; underlying page will still be visible
      setTimeout(() => router.back(), 400);
    },
    onError: (err) => setMsg({ type: "error", text: err.message }),
  });

  function submit(e) {
    e.preventDefault();
    setMsg({ type: "idle", text: "" });
    mutation.mutate();
  }

  return (
    <Modal title="Book Tickets" onClose={() => router.back()}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Contact email (optional)
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            If empty, your account email will be used.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Attendee name</label>
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Note (optional)</label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-5 py-2.5 text-sm font-medium transition-all duration-500"
          >
            {mutation.isPending ? "Booking…" : "Confirm"}
          </button>
        </div>

        {msg.text ? (
          <p
            className={`text-sm ${
              msg.type === "success"
                ? "text-emerald-600 dark:text-emerald-400"
                : msg.type === "error"
                ? "text-rose-600 dark:text-rose-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            role={msg.type === "error" ? "alert" : "status"}
          >
            {msg.text}
          </p>
        ) : null}
      </form>
    </Modal>
  );
}

export default function BookModalPage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <BookFormInner />
    </QueryClientProvider>
  );
}
