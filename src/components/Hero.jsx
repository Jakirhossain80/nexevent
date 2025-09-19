"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true, // run once per element
      offset: 40,
    });

    // Ensure recalculation after fonts/images settle
    const t = setTimeout(() => AOS.refresh(), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="
        relative
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent Hero"
      data-aos="fade-in"
      data-aos-once="true"
    >
      {/* Contained layout */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 pt-36 pb-10">
        {/* Grid: content + visual */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          {/* Copy column */}
          <div className="lg:col-span-6" data-aos="fade-right" data-aos-delay="100">
            <h1
              className="
                text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
              data-aos="fade-up"
              data-aos-delay="150"
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
              data-aos="fade-up"
              data-aos-delay="220"
            >
              NexEvent is a next-gen event management platform built with
              Next.js. Create events, accept bookings, and manage everything
              from a powerful, secure dashboard.
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              data-aos="fade-up"
              data-aos-delay="280"
            >
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
                data-aos="zoom-in"
                data-aos-delay="320"
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
                data-aos="zoom-in"
                data-aos-delay="360"
              >
                Explore Events
                <FiPlay aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Visual column */}
          <div className="lg:col-span-6" data-aos="fade-left" data-aos-delay="140">
            {/* Light image */}
            <div className="block dark:hidden" data-aos="zoom-in-up" data-aos-delay="180">
              <Image
                src="/hero-light.png"
                alt="NexEvent dashboard preview in light mode"
                width={1200}
                height={900}
                className="w-full h-auto rounded-2xl shadow-lg ring-1 ring-black/5"
              />
            </div>
            {/* Dark image */}
            <div className="hidden dark:block" data-aos="zoom-in-up" data-aos-delay="180">
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
        data-aos="fade-down"
        data-aos-delay="0"
      />
    </section>
  );
}
