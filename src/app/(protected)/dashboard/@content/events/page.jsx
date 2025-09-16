// src/app/(protected)/dashboard/@content/events/page.jsx
"use client";

import { useMemo, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";

function EventsList() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const key = useMemo(() => ["events", { mine: 1, page, q }], [page, q]);

  const { data, isLoading, isError } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const usp = new URLSearchParams();
      usp.set("mine", "1");
      usp.set("page", String(page));
      if (q) usp.set("q", q);
      const res = await fetch(`/api/events?${usp.toString()}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load events");
      return json;
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100" style={{ fontFamily: "var(--font-poppins)" }}>
          My Events
        </h1>
        <Link
          href="/dashboard/events/new"
          className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition-all duration-500"
        >
          + Create Event
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, tags…"
          className="w-full md:w-80 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={() => setPage(1)}
          className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm"
        >
          Search
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading…</p>
        ) : isError ? (
          <p className="text-rose-600 dark:text-rose-400">Failed to load events.</p>
        ) : data?.items?.length ? (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {data.items.map((ev) => (
              <li key={ev._id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{ev.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {ev.city ? `${ev.city} • ` : ""}
                    {new Date(ev.startAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  href={`/dashboard/events/${ev._id}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No events yet. Create your first one!</p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-300">Page {page}</span>
        <button
          disabled={data && page * data.limit >= data.total}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function EventsPageClient() {
  // Local provider so we don’t touch your global Providers
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <EventsList />
    </QueryClientProvider>
  );
}
