"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  // Init AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once per element
    });
  }, []);

  const year = new Date().getFullYear();

  const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Available Events" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Signup" },
  ];

  return (
    <footer
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="Site footer"
    >
      <div className="max-w-[1980px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Top: 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Logo + blurb */}
          <div data-aos="fade-right">
            {/* Light/Dark logo swap */}
            <div className="flex items-center gap-3">
              <div className="block dark:hidden" data-aos="zoom-in" data-aos-delay="80">
                <Image
                  src="/logo.png"
                  alt="NexEvent logo"
                  width={40}
                  height={40}
                  priority={false}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div className="hidden dark:block" data-aos="zoom-in" data-aos-delay="80">
                <Image
                  src="/logo.png"
                  alt="NexEvent logo (dark)"
                  width={40}
                  height={40}
                  priority={false}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <span
                className="text-lg font-semibold text-indigo-700 dark:text-indigo-300"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                NexEvent
              </span>
            </div>

            <p
              className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="140"
            >
              Plan, promote, and manage events with a modern, secure workflow —
              built with Next.js, optimized for performance, and designed for teams.
            </p>
          </div>

          {/* Center: Navigation */}
          <nav className="md:mx-auto" aria-label="Footer navigation" data-aos="fade-up">
            <h3
              className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Navigate
            </h3>

            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" role="list">
              {NAV_LINKS.map(({ href, label }, i) => (
                <li key={href} data-aos="fade-up" data-aos-delay={80 + i * 40}>
                  <Link
                    href={href}
                    className="
                      inline-flex items-center rounded-md
                      text-sm text-slate-600 dark:text-slate-300
                      hover:text-indigo-700 dark:hover:text-indigo-300
                      focus:outline-none focus-visible:ring-2
                      focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400
                      focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                      transition-all duration-500 px-1 py-0.5
                    "
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Social links */}
          <div className="md:justify-self-end" data-aos="fade-left">
            <h3
              className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Follow us
            </h3>

            <div className="mt-4 flex items-center gap-3">
              {[
                { href: "https://facebook.com/", Icon: FaFacebookF, label: "Facebook" },
                { href: "https://twitter.com/", Icon: FaTwitter, label: "Twitter / X" },
                { href: "https://linkedin.com/", Icon: FaLinkedinIn, label: "LinkedIn" },
                { href: "https://instagram.com/", Icon: FaInstagram, label: "Instagram" },
              ].map(({ href, Icon, label }, i) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-full ring-1 ring-inset
                    ring-slate-200 text-slate-600
                    hover:text-white hover:bg-indigo-600 hover:ring-indigo-600
                    dark:ring-slate-700 dark:text-slate-300
                    dark:hover:bg-indigo-500 dark:hover:ring-indigo-500
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400
                    focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                    transition-all duration-500
                  "
                  title={label}
                  data-aos="zoom-in"
                  data-aos-delay={100 + i * 60}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-gray-200 dark:bg-slate-800" data-aos="fade-in" />

        {/* Bottom bar */}
        <div
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <p
            className="text-xs sm:text-sm text-slate-500 dark:text-slate-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {year} NexEvent. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="
                text-xs sm:text-sm text-slate-500 dark:text-slate-400
                hover:text-indigo-700 dark:hover:text-indigo-300
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400
                focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                rounded-md px-1 py-0.5
                transition-all duration-500
              "
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="
                text-xs sm:text-sm text-slate-500 dark:text-slate-400
                hover:text-indigo-700 dark:hover:text-indigo-300
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400
                focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                rounded-md px-1 py-0.5
                transition-all duration-500
              "
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="160"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
