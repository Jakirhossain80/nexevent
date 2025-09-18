"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import Link from "next/link";
import { FiUsers, FiCalendar, FiZap, FiShield } from "react-icons/fi";

const TEAM = [
  { name: "Ava Thompson", role: "Product Lead", src: "/f1.png" },
  { name: "Liam Carter", role: "Engineering", src: "/m2.png" },
  { name: "Maya Patel", role: "Design", src: "/f3.png" },
  { name: "Eric Yang", role: "Growth", src: "/m3.png" },
];

const HIGHLIGHTS = [
  {
    icon: FiCalendar,
    title: "Create Events Fast",
    desc:
      "Spin up events in minutes with clear forms, capacity controls, and a clean publishing flow.",
  },
  {
    icon: FiUsers,
    title: "Effortless Collaboration",
    desc:
      "Invite teammates, share links, and keep everyone aligned with a unified dashboard.",
  },
  {
    icon: FiZap,
    title: "Modern Performance",
    desc:
      "Next.js App Router, optimized images, and edge-aware caching keep your pages fast.",
  },
  {
    icon: FiShield,
    title: "Secure by Default",
    desc:
      "Google & Email auth through NextAuth, role-ready patterns, and server-side checks.",
  },
];

export default function AboutContent() {
  // Initialize AOS only on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true,
    });
  }, []);

  return (
    <main
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="About NexEvent"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* 1) Hero */}
        <section className="py-16 sm:py-20">
          <header className="max-w-3xl mb-16">
            <h1
              className="
                text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
              data-aos="fade-up"
            >
              About NexEvent
            </h1>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              We’re building the easiest way to plan, promote, and manage events —
              from intimate workshops to large community meetups.
            </p>
          </header>

          {/* Optional hero illustration */}
          <div
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            <div className="lg:col-span-7">
              <p
                className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                NexEvent was created by organizers for organizers. We know the pain
                of juggling forms, spreadsheets, and messages. With NexEvent, you
                get a single, modern workflow that keeps you focused on delivering
                great experiences — while the platform takes care of the rest.
              </p>
            </div>
            <div className="lg:col-span-5">
              {/* Light / Dark image swap */}
              <div className="block dark:hidden" data-aos="zoom-in" data-aos-delay="100">
                <Image
                  src="/light4.png"
                  alt="Illustration of organizers collaborating in NexEvent"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5"
                  priority={false}
                />
              </div>
              <div className="hidden dark:block" data-aos="zoom-in" data-aos-delay="100">
                <Image
                  src="/dark5.png"
                  alt="Illustration of organizers collaborating in NexEvent (dark mode)"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-white/10"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2) Our Mission */}
        <section
          className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800"
          data-aos="fade-up"
        >
          <div className="max-w-4xl">
            <h2
              className="
                text-xl sm:text-2xl lg:text-3xl font-semibold
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
              data-aos="fade-up"
            >
              Our Mission
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Make event management simple, collaborative, and secure. Empower
              organizers with a dashboard that handles the heavy lifting — from
              authentication and bookings to analytics — so teams can focus on
              crafting unforgettable experiences.
            </p>
          </div>
        </section>

        {/* 3) How It Works (Highlights) */}
        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800">
          <header className="max-w-3xl">
            <h2
              className="
                text-xl sm:text-2xl lg:text-3xl font-semibold
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
              data-aos="fade-up"
            >
              How It Works
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Create events, share them with your audience, track bookings, and
              manage everything from a unified dashboard.
            </p>
          </header>

          <ul
            className="
              mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
              gap-4 sm:gap-6
            "
            role="list"
          >
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }, idx) => (
              <li key={idx}>
                <article
                  className="
                    h-full rounded-2xl border border-gray-200 bg-white
                    dark:border-slate-800 dark:bg-slate-800
                    p-5 sm:p-6
                    shadow-sm transition-all duration-500
                    hover:-translate-y-0.5 hover:shadow-md
                    focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
                  "
                  data-aos="fade-up"
                  data-aos-delay={100 * (idx % 4)}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="
                        inline-flex h-12 w-12 items-center justify-center
                        rounded-xl bg-indigo-50 text-indigo-700
                        dark:bg-slate-700 dark:text-indigo-200
                        ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
                        transition-all duration-500
                        shrink-0
                      "
                      aria-hidden="true"
                      data-aos="zoom-in"
                      data-aos-delay={140 + 100 * (idx % 4)}
                    >
                      <Icon size={22} />
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base sm:text-lg font-semibold leading-snug"
                        style={{ fontFamily: "var(--font-poppins)" }}
                        data-aos="fade-up"
                        data-aos-delay={180 + 100 * (idx % 4)}
                      >
                        {title}
                      </h3>
                      <p
                        className="mt-1 text-sm sm:text-base text-slate-700 dark:text-slate-200"
                        style={{ fontFamily: "var(--font-inter)" }}
                        data-aos="fade-up"
                        data-aos-delay={220 + 100 * (idx % 4)}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* 4) Team */}
        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800">
          <header className="max-w-3xl">
            <h2
              className="
                text-xl sm:text-2xl lg:text-3xl font-semibold
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
              data-aos="fade-up"
            >
              Meet the Team
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              A small, dedicated group of builders focused on making event
              management effortless for everyone.
            </p>
          </header>

          <ul
            className="
              mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
              gap-4 sm:gap-6
            "
            role="list"
          >
            {TEAM.map((m, idx) => (
              <li key={idx}>
                <article
                  className="
                    h-full rounded-2xl border border-gray-200 bg-white
                    dark:border-slate-800 dark:bg-slate-800
                    p-4 sm:p-5 text-center
                    transition-all duration-500 hover:shadow-md hover:-translate-y-0.5
                  "
                  data-aos="zoom-in-up"
                  data-aos-delay={80 * (idx % 4)}
                >
                  <div
                    className="mx-auto h-24 w-24 sm:h-28 sm:w-28 relative rounded-full overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
                    data-aos="zoom-in"
                    data-aos-delay={120 + 80 * (idx % 4)}
                  >
                    <Image
                      src={m.src}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <h3
                    className="mt-3 text-sm sm:text-base font-semibold"
                    style={{ fontFamily: "var(--font-poppins)" }}
                    data-aos="fade-up"
                    data-aos-delay={160 + 80 * (idx % 4)}
                  >
                    {m.name}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-slate-500 dark:text-slate-400"
                    style={{ fontFamily: "var(--font-inter)" }}
                    data-aos="fade-up"
                    data-aos-delay={200 + 80 * (idx % 4)}
                  >
                    {m.role}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* 5) Call to Action */}
        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800">
          <div
            className="
              rounded-3xl border border-gray-200 dark:border-slate-800
              bg-white/70 dark:bg-slate-800/70 backdrop-blur
              p-6 sm:p-10 shadow-sm
              transition-all duration-500
              grid grid-cols-1 lg:grid-cols-12 gap-6 items-center
            "
            data-aos="fade-up"
          >
            <div className="lg:col-span-8" data-aos="fade-right" data-aos-delay="100">
              <h2
                className="
                  text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight
                  text-indigo-700 dark:text-indigo-300
                "
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Ready to create your next event?
              </h2>
              <p
                className="mt-2 text-slate-600 dark:text-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
                data-aos="fade-up"
                data-aos-delay="180"
              >
                Jump into the dashboard to set up your first event, or explore
                what’s live right now.
              </p>
            </div>

            <div className="lg:col-span-4" data-aos="fade-left" data-aos-delay="160">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Link
                  href="/dashboard"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                    text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                    dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                    transition-all duration-500
                  "
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-label="Go to Dashboard"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/events"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                    text-indigo-700 bg-indigo-50 hover:bg-indigo-100
                    dark:text-indigo-300 dark:bg-slate-700 dark:hover:bg-slate-600
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                    dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                    transition-all duration-500
                  "
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-label="Explore Events"
                >
                  Explore Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="h-10" />
      </div>
    </main>
  );
}