// src/app/(protected)/dashboard/@content/events/new/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider, useMutation, useQueryClient } from "@tanstack/react-query";

function CreateEventForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create event");
      return data;
    },
    onSuccess: async () => {
      setMsg({ type: "success", text: "Event created!" });
      // Invalidate and refetch the events list
      await queryClient.invalidateQueries({ queryKey: ["events", { mine: 1 }] });
      router.replace("/dashboard/events");
    },
    onError: (err) => setMsg({ type: "error", text: err.message }),
  });

  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      title: String(f.get("title") || "").trim(),
      description: String(f.get("description") || ""),
      city: String(f.get("city") || ""),
      venue: String(f.get("venue") || ""),
      coverImage: String(f.get("coverImage") || ""),
      tags: String(f.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      capacity: Number(f.get("capacity") || 0),
      price: Number(f.get("price") || 0),
      startAt: String(f.get("startAt") || ""),
      endAt: String(f.get("endAt") || ""),
      visibility: String(f.get("visibility") || "public"),
      status: String(f.get("status") || "draft"),
    };
    mutation.mutate(payload);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100" style={{ fontFamily: "var(--font-poppins)" }}>
        Create Event
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">Add details for your new event.</p>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
          <input name="title" required className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
          <textarea name="description" rows={4} className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">City</label>
          <input name="city" className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Venue</label>
          <input name="venue" className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Start</label>
          <input type="datetime-local" name="startAt" required className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">End</label>
          <input type="datetime-local" name="endAt" required className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Capacity</label>
          <input type="number" min="0" name="capacity" defaultValue={0} className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Price</label>
          <input type="number" min="0" step="0.01" name="price" defaultValue={0} className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Cover Image URL</label>
          <input type="url" name="coverImage" placeholder="https://..." className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Tags (comma separated)</label>
          <input name="tags" placeholder="tech, meetup" className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Visibility</label>
          <select name="visibility" className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
          <select name="status" className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-5 py-3 text-sm font-medium transition-all duration-500"
          >
            {mutation.isPending ? "Creating…" : "Create Event"}
          </button>
          {msg.text ? (
            <span
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
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default function CreateEventPage() {
  // Local provider so we don’t require changing your global Providers
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <CreateEventForm />
    </QueryClientProvider>
  );
}
