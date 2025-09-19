"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Link from "next/link";
import {
  FiLayers,
  FiShield,
  FiBell,
  FiSmartphone,
  FiLogIn,
  FiLayout,
} from "react-icons/fi";

const REASONS = [
  {
    icon: FiLayers,
    title: "Seamless Event Management",
    desc:
      "Create, publish, and iterate on events without friction. NexEvent streamlines setup, scheduling, and updates so you stay focused on results.",
  },
  {
    icon: FiShield,
    title: "Secure & Reliable Platform",
    desc:
      "Built with Next.js, MongoDB, and NextAuth. Enjoy robust authentication, role-ready controls, and best practices for data protection.",
  },
  {
    icon: FiBell,
    title: "Real-time Notifications",
    desc:
      "Stay in the loop with instant feedback on bookings and status changes. Keep organizers and attendees aligned at all times.",
  },
  {
    icon: FiSmartphone,
    title: "Mobile-First Design",
    desc:
      "From 360px to desktop, your event experience looks great and performs smoothly—responsive layouts, accessible patterns, and fast interactions.",
  },
  {
    icon: FiLogIn,
    title: "Google & Email Authentication",
    desc:
      "Sign up with Google in seconds or use email and password. Sessions are handled securely and persist across devices.",
  },
  {
    icon: FiLayout,
    title: "Dedicated Dashboard",
    desc:
      "Manage events, track bookings, and view insights from a focused dashboard designed for speed and clarity.",
  },
];

export default function WhyChoose() {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate only on first scroll into view
    });
  }, []);

  return (
    <section
      id="why-choose"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="Why choose NexEvent"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Heading */}
        <header className="max-w-3xl">
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
              text-indigo-700 dark:text-indigo-300
            "
            style={{ fontFamily: "var(--font-poppins)" }} /* Poppins */
            data-aos="fade-up"
          >
            Why Choose NexEvent?
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} /* Inter */
            data-aos="fade-up"
            data-aos-delay="120"
          >
            NexEvent brings together authentication, bookings, and a polished dashboard
            to help you plan, promote, and manage events—fast, securely, and at scale.
          </p>
        </header>

        {/* Reasons Grid */}
        <ul
          className="
            mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-6 lg:gap-8
          "
          role="list"
        >
          {REASONS.map(({ icon: Icon, title, desc }, idx) => (
            <li key={idx}>
              <article
                className="
                  h-full rounded-2xl border border-gray-200 bg-white
                  dark:border-slate-800 dark:bg-slate-800
                  p-5 sm:p-6
                  shadow-sm transition-all duration-500
                  hover:shadow-md hover:-translate-y-0.5
                  focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
                "
                data-aos="fade-up"
                data-aos-delay={100 * (idx % 3)} /* subtle stagger by column */
              >
                <div className="flex items-start gap-4">
                  {/* Icon badge (decorative) */}
                  <span
                    className="
                      inline-flex items-center justify-center
                      h-12 w-12 rounded-xl
                      bg-indigo-50 text-indigo-700
                      dark:bg-slate-700 dark:text-indigo-200
                      ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
                      transition-all duration-500
                      shrink-0
                    "
                    aria-hidden="true"
                    data-aos="zoom-in"
                    data-aos-delay={140 + 100 * (idx % 3)}
                  >
                    <Icon size={22} />
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base sm:text-lg font-semibold leading-snug"
                      style={{ fontFamily: "var(--font-poppins)" }} /* Poppins */
                      data-aos="fade-up"
                      data-aos-delay={180 + 100 * (idx % 3)}
                    >
                      {title}
                    </h3>
                    <p
                      className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300"
                      style={{ fontFamily: "var(--font-inter)" }} /* Inter */
                      data-aos="fade-up"
                      data-aos-delay={220 + 100 * (idx % 3)}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Optional CTA */}
        <div className="mt-10" data-aos="fade-up" data-aos-offset="120">
          <Link
            href="/signup" /* ← change target if needed */
            aria-label="Get started with NexEvent"
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg px-5 py-3 text-sm sm:text-base font-medium
              text-white bg-indigo-600 hover:bg-indigo-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
              dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
              transition-all duration-500
            "
            style={{ fontFamily: "var(--font-inter)" }} /* Inter */
          >
            Get Started with NexEvent
          </Link>
        </div>
      </div>
    </section>
  );
}
