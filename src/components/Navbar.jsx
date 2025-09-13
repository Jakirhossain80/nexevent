"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogIn, FiUserPlus } from "react-icons/fi";
import ThemeToggle from "../components/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard", protected: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const brandStyle = { fontFamily: "var(--font-poppins)" }; // headings font
  // Body font (Inter) is already applied globally via layout.jsx

  const filteredLinks = NAV_LINKS.filter((l) =>
    l.protected ? !!session : true
  );

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        bg-gray-50/90 dark:bg-slate-900/90
        backdrop-blur
        border-b border-gray-200 dark:border-slate-800
        transition-all duration-500
      "
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        role="navigation"
        aria-label="Main"
      >
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="NexEvent Home">
          <Image
            src="/logo.svg"           // replace with your actual logo file (SVG/PNG)
            alt="NexEvent logo"
            width={28}
            height={28}
            priority
            className="select-none"
          />
          <span
            className="
              text-lg sm:text-xl font-semibold
              text-indigo-700 dark:text-indigo-400
              group-hover:text-indigo-600 dark:group-hover:text-indigo-300
              transition-colors duration-500
            "
            style={brandStyle}
          >
            NexEvent
          </span>
        </Link>

        {/* Right: Desktop nav + actions */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-2">
            {filteredLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium
                      transition-all duration-300
                      ${active
                        ? "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-slate-800"
                        : "text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-5 w-px bg-gray-200 dark:bg-slate-700" />

          <ThemeToggle />

          {/* Auth Area */}
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" aria-label="Loading user" />
          ) : session?.user ? (
            <UserMenu user={session.user} onSignOut={() => signOut()} />
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn()}
                className="
                  inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                  text-slate-700 dark:text-slate-100
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition-all duration-300
                "
              >
                <FiLogIn aria-hidden="true" /> Login
              </button>
              <Link
                href="/signup"
                className="
                  inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                  text-white bg-indigo-600 hover:bg-indigo-700
                  transition-all duration-300
                "
              >
                <FiUserPlus aria-hidden="true" /> Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="
              p-2 rounded-md
              text-slate-700 dark:text-slate-100
              hover:bg-gray-100 dark:hover:bg-slate-800
              transition-all duration-300
            "
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile slide-over */}
      <div
        id="mobile-menu"
        className={`
          md:hidden fixed inset-0 z-50
          ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`
            absolute inset-0 bg-black/30 transition-opacity duration-300
            ${mobileOpen ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-80 max-w-[80%]
            bg-gray-50 dark:bg-slate-900
            border-l border-gray-200 dark:border-slate-800
            transform transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
            flex flex-col
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="NexEvent logo" width={24} height={24} />
              <span className="text-base font-semibold text-indigo-700 dark:text-indigo-400" style={brandStyle}>
                NexEvent
              </span>
            </div>
            <button
              className="
                p-2 rounded-md
                text-slate-700 dark:text-slate-100
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition-all duration-300
              "
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Auth area (mobile) */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
            {status === "loading" ? (
              <div className="w-full h-9 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <UserAvatar user={session.user} size={36} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {session.user.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="ml-auto text-sm px-3 py-1.5 rounded-md bg-emerald-500/90 hover:bg-emerald-500 text-white transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => signIn()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                >
                  <FiLogIn aria-hidden="true" /> Login
                </button>
                <Link
                  href="/signup"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  <FiUserPlus aria-hidden="true" /> Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile nav links */}
          <ul className="p-2">
            {filteredLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      block px-4 py-3 rounded-md text-sm font-medium
                      transition-all duration-300
                      ${active
                        ? "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-slate-800"
                        : "text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

/* --- Helpers --- */

function UserAvatar({ user, size = 32 }) {
  const src = user?.image || "/avatar-placeholder.png";
  return (
    <Image
      src={src}
      alt={user?.name ? `${user.name} profile photo` : "User profile photo"}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}

function UserMenu({ user, onSignOut }) {
  return (
    <div className="relative group">
      <button
        className="
          inline-flex items-center gap-2
          px-2 py-1.5 rounded-full
          hover:bg-gray-100 dark:hover:bg-slate-800
          transition-all duration-300
        "
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <UserAvatar user={user} />
        <FiChevronDown
          className="text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors"
          aria-hidden="true"
        />
      </button>

      {/* Hover dropdown */}
      <div
        role="menu"
        className="
          invisible opacity-0 translate-y-1
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-200
          absolute right-0 mt-2 w-56
          rounded-xl border border-gray-200 dark:border-slate-700
          bg-white dark:bg-slate-900 shadow-lg overflow-hidden
        "
      >
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {user?.email}
          </p>
        </div>
        <div className="h-px bg-gray-200 dark:bg-slate-700" />
        <button
          onClick={onSignOut}
          className="
            w-full text-left px-4 py-2.5 text-sm
            text-emerald-600 hover:bg-gray-100
            dark:text-emerald-400 dark:hover:bg-slate-800
            transition
            inline-flex items-center gap-2
          "
          role="menuitem"
        >
          <FiUser aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}
