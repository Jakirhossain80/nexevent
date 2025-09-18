"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import Link from "next/link";
import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialCard from "@/components/TestimonialCard";

export default function PortfolioContent({ items, categories, testimonials }) {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate only first time in view
    });
  }, []);

  return (
    <main
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent Portfolio"
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
              Our Portfolio
            </h1>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Real events, real outcomes. Explore how teams used NexEvent to plan,
              promote, and run unforgettable experiences.
            </p>
          </header>

          {/* Optional hero illustration (swap assets) */}
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
                From conferences to concerts, NexEvent streamlines booking flows,
                capacity checks, and organizer collaboration—so you can focus on your audience.
              </p>
            </div>
            <div className="lg:col-span-5">
              {/* Light/Dark illustration swap */}
              <div className="block dark:hidden" data-aos="zoom-in" data-aos-delay="100">
                <Image
                  src="/light3.png"
                  alt="Event highlight collage in light mode"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5"
                  priority={false}
                />
              </div>
              <div className="hidden dark:block" data-aos="zoom-in" data-aos-delay="100">
                <Image
                  src="/dark4.png"
                  alt="Event highlight collage in dark mode"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-white/10"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2 & 3) Filter + Portfolio Grid */}
        <section
          className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800"
          data-aos="fade-up"
        >
          {/* Keep the reusable component untouched; AOS applied on the wrapper */}
          <PortfolioGallery items={items} categories={categories} />
        </section>

        {/* 4) Client Testimonials */}
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
              What Clients Say
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              A few words from teams who trusted NexEvent to power their events.
            </p>
          </header>

          {/* CSS scroll-snap carousel on mobile, grid on desktop (no JS needed) */}
          <ul
            className="
              mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6
              md:[&>*]:snap-none
              overflow-x-auto md:overflow-visible
              snap-x snap-mandatory
              [-webkit-overflow-scrolling:touch]
              pb-2 md:pb-0
            "
            role="list"
            aria-live="polite"
          >
            {testimonials.map((t, i) => (
              <li
                key={i}
                className="snap-start md:snap-auto min-w-[85%] sm:min-w-[70%] md:min-w-0"
                data-aos="zoom-in-up"
                data-aos-delay={80 * (i % 3)} // gentle stagger across the row
              >
                {/* Keep card component untouched */}
                <TestimonialCard {...t} priority={i === 0} />
              </li>
            ))}
          </ul>
        </section>

        {/* 5) Call To Action */}
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
              <h3
                className="
                  text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight
                  text-indigo-700 dark:text-indigo-300
                "
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Inspired? Let’s create your next event.
              </h3>
              <p
                className="mt-2 text-slate-600 dark:text-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
                data-aos="fade-up"
                data-aos-delay="180"
              >
                Head to the dashboard to publish your first event, or contact us for a tailored setup.
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
                  Create Event
                </Link>
                <Link
                  href="/contact"
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
                  aria-label="Contact us"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="h-10" />
        </section>
      </div>
    </main>
  );
}