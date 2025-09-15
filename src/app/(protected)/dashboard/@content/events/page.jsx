// src/app/(protected)/dashboard/@content/events/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function EventsPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const page = Number(searchParams?.page || 1);
  const q = String(searchParams?.q || "");
  const db = await getDb();

  const filter = { ownerId: session.user.id };
  if (q) filter.$text = { $search: q };

  const limit = 10, skip = (page - 1) * limit;
  const items = await db.collection("events").find(filter).sort({ startAt: 1 }).skip(skip).limit(limit).toArray();
  const total = await db.collection("events").countDocuments(filter);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Events</h1>
      {/* Search + Table + Pagination */}
      {/* For client-side edits/deletes, enhance with React Query (mutations) */}
      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {items.map(ev => (
          <li key={ev._id} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{ev.title}</p>
              <p className="text-sm text-slate-500">{new Date(ev.startAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/dashboard/events/${ev._id}`} className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800">Edit</a>
              <form action={`/api/events/${ev._id}`} method="post" onSubmit={(e)=>{ if(!confirm("Delete?")) e.preventDefault(); }}>
                <input type="hidden" name="_method" value="DELETE" />
                <button className="px-3 py-1.5 rounded bg-rose-600 text-white">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
      {/* pagination UI… */}
    </div>
  );
}
