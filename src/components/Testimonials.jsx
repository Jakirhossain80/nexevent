"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TESTIMONIALS = [
  {
    name: "Ava Thompson",
    role: "Community Lead, OpenHub",
    text:
      "NexEvent made our meetup series effortless. From creating events to tracking registrations, everything just flows. Our team saved hours every week.",
    rating: 5,
    avatar: "/f1.png",
  },
  {
    name: "Liam Carter",
    role: "Founder, CraftWorks",
    text:
      "The dashboard is clean and powerful. We launched our first paid workshop without a hiccup—bookings and attendee management were a breeze.",
    rating: 5,
    avatar: "/f2.png",
  },
  {
    name: "Maya Patel",
    role: "Program Manager, StartLab",
    text:
      "Love the mobile experience and secure login. Our attendees book in seconds, and real-time updates keep our team perfectly in sync.",
    rating: 4,
    avatar: "/m1.png",
  },
];

export default function Testimonials() {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once per element
    });
  }, []);

  return (
    <section
      id="testimonials"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="What our clients say about NexEvent"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Section heading */}
        <header className="max-w-3xl" data-aos="fade-up">
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
              text-indigo-700 dark:text-indigo-300
            "
            style={{ fontFamily: "var(--font-poppins)" }} /* Poppins */
          >
            What Our Clients Say
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} /* Inter */
            data-aos="fade-up"
            data-aos-delay="120"
          >
            Real feedback from teams using NexEvent to plan, promote, and manage
            their events with confidence.
          </p>
        </header>

        {/* Desktop grid; Mobile horizontal snap */}
        <ul
          className="
            mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8
            md:[&>*]:snap-none
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory
            [-webkit-overflow-scrolling:touch]
            pb-2 md:pb-0
          "
          role="list"
          aria-live="polite"
        >
          {TESTIMONIALS.map((t, idx) => (
            <li
              key={idx}
              className="
                snap-start md:snap-auto
                min-w-[85%] sm:min-w-[70%] md:min-w-0
              "
              data-aos="fade-up"
              data-aos-delay={100 * (idx % 3)} /* subtle stagger across columns */
            >
              <article
                className="
                  relative h-full
                  rounded-2xl border border-gray-200 bg-white
                  dark:border-slate-800 dark:bg-slate-800
                  p-6 sm:p-7
                  shadow-sm hover:shadow-md
                  hover:-translate-y-0.5
                  transition-all duration-500
                  focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
                "
              >
                {/* Decorative quote icon */}
                <FaQuoteLeft
                  className="
                    absolute -top-3 -left-3 h-8 w-8
                    text-indigo-600/90 dark:text-indigo-400/90
                    drop-shadow
                  "
                  aria-hidden="true"
                  data-aos="zoom-in"
                  data-aos-delay={140 + 100 * (idx % 3)}
                />

                {/* Header: Avatar + Name/Role */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                      relative h-14 w-14 shrink-0 rounded-full
                      ring-2 ring-indigo-100 dark:ring-slate-700
                      overflow-hidden
                    "
                    aria-hidden="true"
                    data-aos="zoom-in"
                    data-aos-delay={160 + 100 * (idx % 3)}
                  >
                    {/* next/image optimizes avatars; lazy by default */}
                    <Image
                      src={t.avatar}
                      alt={`${t.name} avatar`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-base font-semibold truncate"
                      style={{ fontFamily: "var(--font-poppins)" }}
                      data-aos="fade-up"
                      data-aos-delay={180 + 100 * (idx % 3)}
                    >
                      {t.name}
                    </h3>
                    <p
                      className="text-sm text-slate-500 dark:text-slate-400 truncate"
                      style={{ fontFamily: "var(--font-inter)" }}
                      data-aos="fade-up"
                      data-aos-delay={200 + 100 * (idx % 3)}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Testimonial text */}
                <p
                  className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-200"
                  style={{ fontFamily: "var(--font-inter)" }}
                  data-aos="fade-up"
                  data-aos-delay={220 + 100 * (idx % 3)}
                >
                  {t.text}
                </p>

                {/* Star rating */}
                <div
                  className="mt-5 flex items-center gap-1"
                  aria-label={`Rating: ${t.rating} out of 5 stars`}
                  data-aos="zoom-in-up"
                  data-aos-delay={260 + 100 * (idx % 3)}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`
                        h-4 w-4
                        ${i < t.rating ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}
                        transition-all duration-500
                        group-hover:scale-105
                      `}
                      aria-hidden="true"
                      title={i < t.rating ? "Filled star" : "Empty star"}
                    />
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* (Optional) subtle hint for mobile scrolling */}
        <p
          className="mt-3 md:hidden text-xs text-slate-500 dark:text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
          data-aos="fade-up"
          data-aos-offset="120"
        >
          Tip: swipe to see more testimonials →
        </p>
      </div>
    </section>
  );
}
