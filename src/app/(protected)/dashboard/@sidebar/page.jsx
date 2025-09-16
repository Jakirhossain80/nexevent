"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/events/new", label: "Create Event" },
  { href: "/dashboard/bookings", label: "Bookings" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="p-4 md:p-6 border-r border-slate-200 dark:border-slate-800">
      <nav className="space-y-1">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${
                active
                  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
