"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarCheck,
  FaUsers,
  FaTicketAlt,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

// Reusable, code-split components (unchanged)
import ServiceCard from "@/components/ServiceCard";
import BenefitItem from "@/components/BenefitItem";

const SERVICES = [
  {
    icon: FaCalendarCheck,
    title: "Event Creation & Management",
    desc: "Spin up events in minutes with rich details, capacity controls, scheduling, and publishing workflow designed for clarity.",
  },
  {
    icon: FaTicketAlt,
    title: "Booking & Ticketing",
    desc: "Frictionless booking flow with capacity checks and clear confirmations. Add payments later when you’re ready.",
  },
  {
    icon: FaUsers,
    title: "Collaboration Tools",
    desc: "Invite teammates, coordinate roles, and keep everyone aligned in a unified, secure dashboard.",
  },
  {
    icon: FaChartLine,
    title: "Analytics & Insights",
    desc: "Track bookings and engagement to learn what works. Make better decisions with simple, actionable metrics.",
  },
];

const BENEFITS = [
  "Fast, responsive experience across devices",
  "Secure authentication with Google & Email",
  "Accessible UI with robust keyboard support",
  "Scales from small meetups to large conferences",
];

export default function ServicesContent() {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate only the first time
    });
  }, []);

  return (
    <main
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent Services"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
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
              Our Services
            </h1>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Everything you need to plan, promote, and manage events—fast,
              secure, and collaborative.
            </p>
          </header>

          {/* Optional hero illustration (light/dark swap) */}
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
                NexEvent streamlines your workflow from creation to insights.
                Build polished event pages, accept bookings with confidence, and
                keep your team aligned—while the platform handles the heavy
                lifting.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="block dark:hidden" data-aos="zoom-in" data-aos-delay="100">
                <Image
                  src="/light2.png"
                  alt="Illustration of NexEvent services in light mode"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5"
                  priority={false}
                />
              </div>
              <div className="hidden dark:block" data-aos="zoom-in" data-aos-delay="100">
                <Image
                  src="/dark2.png"
                  alt="Illustration of NexEvent services in dark mode"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-white/10"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2) Service Highlights */}
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
              Service Highlights
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              A focused set of tools designed to make event operations clear,
              fast, and reliable.
            </p>
          </header>

          <ul
            className="
              mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
              gap-4 sm:gap-6
            "
            role="list"
          >
            {SERVICES.map(({ icon: Icon, title, desc }, idx) => (
              <li key={idx} data-aos="fade-up" data-aos-delay={100 * (idx % 4)}>
                {/* Keep ServiceCard untouched; AOS is applied on the list item */}
                <ServiceCard Icon={Icon} title={title} desc={desc} />
              </li>
            ))}
          </ul>
        </section>

        {/* 3) Why Choose Us */}
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
              Why Choose Us
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              We focus on what matters: speed, security, accessibility, and a
              delightful UX for organizers and attendees.
            </p>
          </header>

          <ul
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            role="list"
          >
            {BENEFITS.map((b, i) => (
              <li
                key={i}
                // alternate slight direction for variety on wider screens
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={80 * (i % 2)}
              >
                {/* Keep BenefitItem untouched; AOS is applied on the list item */}
                <BenefitItem text={b} />
              </li>
            ))}
          </ul>
        </section>

        {/* 4) Call to Action */}
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
                Ready to put these services to work?
              </h3>
              <p
                className="mt-2 text-slate-600 dark:text-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
                data-aos="fade-up"
                data-aos-delay="180"
              >
                Head to the dashboard to create your first event or browse
                what’s happening now.
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

          <div className="h-10" />
        </section>
      </div>
    </main>
  );
}