"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FiUserCheck, FiSearch, FiCalendar, FiCheckCircle } from "react-icons/fi";

const STEPS = [
  {
    icon: FiUserCheck,
    title: "Sign Up / Login",
    desc:
      "Get started in seconds with Google OAuth or email. Your secure dashboard is ready when you are.",
  },
  {
    icon: FiSearch,
    title: "Explore & Book Events",
    desc:
      "Discover upcoming events, view details, and reserve your spot with a seamless booking flow.",
  },
  {
    icon: FiCalendar,
    title: "Create & Publish",
    desc:
      "Organize your own events. Add details, capacity, and schedule — then publish with one click.",
  },
  {
    icon: FiCheckCircle,
    title: "Manage & Track Easily",
    desc:
      "Monitor bookings, manage attendees, and keep everything on track from your dashboard.",
  },
];

export default function HowItWorks() {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once when scrolled into view
    });
  }, []);

  return (
    <section
      id="how-it-works"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="How NexEvent works"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-16 ">
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
            How It Works
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} /* Inter */
            data-aos="fade-up"
            data-aos-delay="120"
          >
            From sign-up to tracking results — NexEvent guides you through every step of
            creating, promoting, and managing successful events.
          </p>
        </header>

        {/* Steps Grid */}
        <ul
          className="
            mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8
          "
          role="list"
        >
          {STEPS.map(({ icon: Icon, title, desc }, idx) => (
            <li key={idx}>
              <article
                className="
                  h-full rounded-2xl border border-gray-200 bg-white
                  dark:border-slate-800 dark:bg-slate-800
                  p-5 sm:p-6
                  shadow-sm hover:shadow-md
                  transition-all duration-500
                  hover:-translate-y-0.5
                  focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
                "
                data-aos="fade-up"
                data-aos-delay={100 * (idx % 3)} /* subtle stagger by column */
              >
                <div className="flex items-start gap-4">
                  {/* Icon badge */}
                  <span
                    className="
                      inline-flex items-center justify-center
                      h-12 w-12 rounded-xl
                      bg-indigo-50 text-indigo-700
                      dark:bg-slate-700 dark:text-indigo-200
                      ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
                      transition-all duration-500
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
      </div>
    </section>
  );
}
