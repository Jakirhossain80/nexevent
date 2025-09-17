// src/app/(protected)/dashboard/@content/bookings/page.jsx
"use client";

import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Normalizes various API response shapes into a consistent object:
 * { items: Array, total?: number, limit?: number }
 */
function normalizeBookingsResponse(json) {
  if (Array.isArray(json)) return { items: json, total: json.length, limit: json.length };
  if (json?.items && Array.isArray(json.items)) return { items: json.items, total: json.total, limit: json.limit };
  if (json?.data && Array.isArray(json.data)) return { items: json.data, total: json.total, limit: json.limit };
  // Fallback: nothing usable
  return { items: [] };
}

function BookingsList() {
  const [status, setStatus] = useState("");
  const [lastErrorMsg, setLastErrorMsg] = useState("");

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["bookings", { status }],
    queryFn: async () => {
      const usp = new URLSearchParams();
      if (status) usp.set("status", status);

      const res = await fetch(`/api/bookings?${usp.toString()}`, {
        cache: "no-store",
        // If you ever proxy to a different origin, keep credentials:
        credentials: "same-origin",
        headers: { "Accept": "application/json" },
      });

      let json;
      try {
        json = await res.json();
      } catch {
        // Non-JSON response
        console.error("BOOKINGS_API_NON_JSON_RESPONSE");
        throw new Error("Unexpected server response.");
      }

      if (!res.ok) {
        // Surface server-provided message, and log details for debugging
        const message = json?.error || json?.message || `Failed (${res.status})`;
        console.error("BOOKINGS_API_ERROR:", { status: res.status, message, body: json });
        throw new Error(message);
      }

      const normalized = normalizeBookingsResponse(json);
      return normalized;
    },
    // UX niceties: don't refetch on focus, keep previous while changing filters
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onError: (err) => setLastErrorMsg(err?.message || "Failed to load bookings"),
  });

  // Consistent array you can safely render
  const items = data?.items ?? [];

  return (
    <div className="p-6">
      <h1
        className="text-2xl font-semibold text-slate-800 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Booking History
      </h1>

      <div className="mt-4 flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          aria-label="Filter bookings by status"
        >
          <option value="">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => refetch()}
          className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm"
        >
          Apply
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading…</p>
        ) : isError ? (
          <p className="text-rose-600 dark:text-rose-400">
            {/* Show friendly error while logging details in the console */}
            {lastErrorMsg || "Failed to load bookings."}
          </p>
        ) : items.length ? (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((b) => {
              // Defensive field selection: accommodate different API shapes
              const when =
                b.bookedAt || b.createdAt || b.updatedAt || b.date || b.created_at || b.updated_at;
              const ts = when ? new Date(when) : null;

              return (
                <li key={b._id || b.id} className="py-3">
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {(b.attendee?.name || b.name || "Attendee")} — {b.quantity ?? 1} ticket(s)
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {ts ? ts.toLocaleString() : "—"} • {b.status || "unknown"}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default function BookingsPage() {
  // Local provider so we don’t alter your global Providers setup
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <BookingsList />
    </QueryClientProvider>
  );
}
