// src/app/(protected)/dashboard/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

// Ensure this page runs on the Node.js runtime (Mongoose/NextAuth need Node, not Edge)
export const runtime = "nodejs";

// Avoid any caching/flicker for auth-aware content
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // ✅ With session strategy: "jwt" and a proper authOptions export, this will return the session
  const session = await getServerSession(authOptions);

  // If there is no session, send the user to login with a callback back to /dashboard
  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const name = session.user?.name || session.user?.email || "there";

  return (
    <section className="p-6 md:p-8">
      <header>
        <h1
          className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Welcome, {name}
        </h1>
        <p
          className="mt-2 text-slate-600 dark:text-slate-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Manage your events, bookings, and profile from one place.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashCard
          href="/dashboard/events"
          title="Your Events"
          desc="Create, edit, and manage events."
        />
        <DashCard
          href="/dashboard/events/new"
          title="Create Event"
          desc="Launch a new event in minutes."
        />
        <DashCard
          href="/dashboard/bookings"
          title="Bookings"
          desc="Review attendee registrations."
        />
        <DashCard
          href="/dashboard/profile"
          title="Profile"
          desc="Update your personal details."
        />
        <DashCard
          href="/dashboard/settings"
          title="Settings"
          desc="Configure preferences and privacy."
        />
      </div>
    </section>
  );
}

function DashCard({ href, title, desc }) {
  return (
    <Link
      href={href}
      className="
        group block rounded-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 shadow-sm p-5
        hover:border-indigo-300 dark:hover:border-indigo-700
        hover:shadow transition-all duration-300
      "
    >
      <h2
        className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 group-hover:text-indigo-800 dark:group-hover:text-indigo-200 transition-colors"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h2>
      <p
        className="mt-1 text-sm text-slate-600 dark:text-slate-300"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {desc}
      </p>
      <span className="mt-3 inline-block text-sm text-indigo-700 dark:text-indigo-300 group-hover:underline">
        Open →
      </span>
    </Link>
  );
}
