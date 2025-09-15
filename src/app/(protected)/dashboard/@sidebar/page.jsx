// src/app/(protected)/dashboard/@sidebar/page.jsx
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  // usePathname() is client; if you want server, use plain links and highlight by comparing (optional client helper)
  return (
    <nav className="p-4 space-y-1">
      {[
        { href: "/dashboard/events", label: "Events" },
        { href: "/dashboard/events/new", label: "Create Event" },
        { href: "/dashboard/bookings", label: "Bookings" },
        { href: "/dashboard/profile", label: "Profile" },
        { href: "/dashboard/settings", label: "Settings" },
      ].map((i) => (
        <Link key={i.href} href={i.href} className="block px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
