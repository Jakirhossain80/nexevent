"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      className="
        relative
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent Hero"
    >
      {/* Contained layout */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-36 pb-10">
        {/* Grid: content + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Copy column */}
          <div className="lg:col-span-6">
            <h1
              className="
                text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Plan, Promote & Manage Events — Effortlessly
            </h1>

            <p
              className="
                mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl
                text-slate-600 dark:text-slate-300
                max-w-2xl
              "
              style={{ fontFamily: "var(--font-inter)" }}
            >
              NexEvent is a next-gen event management platform built with
              Next.js. Create events, accept bookings, and manage everything
              from a powerful, secure dashboard.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/signup"
                aria-label="Get started with NexEvent"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                  text-white bg-indigo-600 hover:bg-indigo-700
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                  dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                  transition-all duration-500
                "
              >
                Get Started
                <FiArrowRight aria-hidden="true" className="text-white" />
              </Link>

              <Link
                href="/events"
                aria-label="Explore events on NexEvent"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                  text-indigo-700 bg-indigo-50 hover:bg-indigo-100
                  dark:text-indigo-300 dark:bg-slate-800 dark:hover:bg-slate-700
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                  dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                  transition-all duration-500
                "
              >
                Explore Events
                <FiPlay aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Visual column */}
          <div className="lg:col-span-6">
            {/* Light image */}
            <div className="block dark:hidden">
              <Image
                src="/hero-light.png"
                alt="NexEvent dashboard preview in light mode"
                width={1200}
                height={900}
              
                className="w-full h-auto rounded-2xl shadow-lg ring-1 ring-black/5"
              />
            </div>
            {/* Dark image */}
            <div className="hidden dark:block">
              <Image
                src="/hero-dark.png"
                alt="NexEvent dashboard preview in dark mode"
                width={1200}
                height={900}
              
                className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-48
          bg-gradient-to-b from-indigo-100/40 to-transparent
          dark:from-indigo-900/20
          transition-all duration-500
        "
      />
    </section>
  );
}
