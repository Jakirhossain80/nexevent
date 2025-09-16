// src/app/(protected)/dashboard/@content/bookings/page.jsx
"use client";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function BookingsList() {
  const [status, setStatus] = useState("");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["bookings", { status }],
    queryFn: async () => {
      const usp = new URLSearchParams();
      if (status) usp.set("status", status);
      const res = await fetch(`/api/bookings?${usp.toString()}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load bookings");
      return json;
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100" style={{ fontFamily: "var(--font-poppins)" }}>
        Booking History
      </h1>

      <div className="mt-4 flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={() => refetch()} className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm">
          Apply
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading…</p>
        ) : isError ? (
          <p className="text-rose-600 dark:text-rose-400">Failed to load bookings.</p>
        ) : data?.items?.length ? (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.items.map((b) => (
              <li key={b._id} className="py-3">
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {b.attendee?.name || "Attendee"} — {b.quantity} ticket(s)
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(b.bookedAt).toLocaleString()} • {b.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <BookingsList />
    </QueryClientProvider>
  );
}
