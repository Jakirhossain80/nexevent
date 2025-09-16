"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Helper to format a Date or ISO string for <input type="datetime-local">
function toLocalInputValue(d) {
  try {
    const dt = new Date(d);
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = dt.getFullYear();
    const mm = pad(dt.getMonth() + 1);
    const dd = pad(dt.getDate());
    const hh = pad(dt.getHours());
    const mi = pad(dt.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  } catch {
    return "";
  }
}

function EditEventForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const queryClient = useQueryClient();

  const key = useMemo(() => ["event", id], [id]);

  // Load existing event
  const { data, isLoading, isError } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await fetch(`/api/events/${id}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load event");
      return json;
    },
    enabled: !!id,
  });

  // Local form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    venue: "",
    coverImage: "",
    tags: "",
    capacity: 0,
    price: 0,
    visibility: "public",
    status: "draft",
    startAt: "",
    endAt: "",
  });
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  useEffect(() => {
    if (!data) return;
    setForm({
      title: data.title || "",
      description: data.description || "",
      city: data.city || "",
      venue: data.venue || "",
      coverImage: data.coverImage || "",
      tags: (Array.isArray(data.tags) ? data.tags : []).join(", "),
      capacity: data.capacity ?? 0,
      price: data.price ?? 0,
      visibility: data.visibility || "public",
      status: data.status || "draft",
      startAt: toLocalInputValue(data.startAt),
      endAt: toLocalInputValue(data.endAt),
    });
  }, [data]);

  // Update mutation (PATCH)
  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to update event");
      return json;
    },
    onSuccess: async () => {
      setMsg({ type: "success", text: "Event updated!" });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["event", id] }),
        queryClient.invalidateQueries({ queryKey: ["events", { mine: 1 }] }), // refresh list
      ]);
      // Stay on page; you can router.replace if you want to go back:
      // router.replace("/dashboard/events");
    },
    onError: (err) => setMsg({ type: "error", text: err.message }),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to delete event");
      return json;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events", { mine: 1 }] });
      router.replace("/dashboard/events");
    },
    onError: (err) => setMsg({ type: "error", text: err.message }),
  });

  function onSubmit(e) {
    e.preventDefault();
    setMsg({ type: "idle", text: "" });

    const payload = {
      title: form.title.trim(),
      description: form.description,
      city: form.city,
      venue: form.venue,
      coverImage: form.coverImage,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      capacity: Number(form.capacity || 0),
      price: Number(form.price || 0),
      visibility: form.visibility,
      status: form.status,
      startAt: form.startAt, // ISO-like local string; server will parse Date()
      endAt: form.endAt,
    };

    updateMutation.mutate(payload);
  }

  function onDelete() {
    if (!confirm("Delete this event? This action cannot be undone.")) return;
    deleteMutation.mutate();
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-slate-500 dark:text-slate-400">Loading event…</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-6">
        <p className="text-rose-600 dark:text-rose-400">Failed to load event.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-3">
        <h1
          className="text-2xl font-semibold text-slate-800 dark:text-slate-100"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Edit Event
        </h1>
        <button
          onClick={onDelete}
          disabled={deleteMutation.isPending}
          className="rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white px-4 py-2 text-sm font-medium transition-all duration-500"
        >
          {deleteMutation.isPending ? "Deleting…" : "Delete"}
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">City</label>
          <input
            value={form.city}
            onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Venue</label>
          <input
            value={form.venue}
            onChange={(e) => setForm((s) => ({ ...s, venue: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Start</label>
          <input
            type="datetime-local"
            value={form.startAt}
            onChange={(e) => setForm((s) => ({ ...s, startAt: e.target.value }))}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">End</label>
          <input
            type="datetime-local"
            value={form.endAt}
            onChange={(e) => setForm((s) => ({ ...s, endAt: e.target.value }))}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Capacity</label>
          <input
            type="number"
            min="0"
            value={form.capacity}
            onChange={(e) => setForm((s) => ({ ...s, capacity: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Cover Image URL</label>
          <input
            type="url"
            value={form.coverImage}
            onChange={(e) => setForm((s) => ({ ...s, coverImage: e.target.value }))}
            placeholder="https://..."
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Tags (comma separated)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
            placeholder="tech, meetup"
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Visibility</label>
          <select
            value={form.visibility}
            onChange={(e) => setForm((s) => ({ ...s, visibility: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white px-5 py-3 text-sm font-medium transition-all duration-500"
          >
            {updateMutation.isPending ? "Saving…" : "Save Changes"}
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

export default function EditEventPage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <EditEventForm />
    </QueryClientProvider>
  );
}