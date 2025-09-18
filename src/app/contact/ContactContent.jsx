"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import { Poppins, Inter } from "next/font/google";

import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import MapSection from "@/components/MapSection";

// NexEvent fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function ContactContent() {
  // Initialize AOS on client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once as user scrolls
    });
  }, []);

  return (
    <main
      className={`${inter.variable} ${poppins.variable} bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500`}
      aria-label="Contact page main content"
    >
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 py-16 mt-20">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 items-center">
          <header data-aos="fade-up">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-700 dark:text-indigo-400"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Contact Us
            </h1>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Have a question or ready to create your next event? Our team will
              get back to you within one business day.
            </p>
          </header>

          {/* Optimized illustration (optional asset) */}
          <div className="relative h-48 sm:h-56 lg:h-64" data-aos="zoom-in" data-aos-delay="100">
            <Image
              src="/contact-illustration.png"
              alt="Illustration of people collaborating to plan an event"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
          {/* Keep child components untouched; AOS on wrappers only */}
          <div data-aos="fade-right">
            <ContactForm />
          </div>

          <div data-aos="fade-left" data-aos-delay="100">
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-6xl" data-aos="zoom-in-up">
          <MapSection />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-5xl">
          <div
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 p-6 sm:p-8 text-center shadow-sm transition-all duration-500"
            data-aos="fade-up"
          >
            <h2
              className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Prefer to get started right away?
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300" data-aos="fade-up" data-aos-delay="140">
              Spin up a new event in minutes—invite speakers, publish the agenda,
              and open registrations.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3" data-aos="zoom-in" data-aos-delay="200">
              <a
                href="/create-event"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-500"
                aria-label="Create a new event"
              >
                Create Event
              </a>
              <a
                href="/success-stories"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-500"
                aria-label="View our success stories"
              >
                View Success Stories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden note for screen readers about theme */}
      <span className="sr-only">
        Page uses NexEvent palette: Indigo (primary), Emerald (accent), Gray/Slate backgrounds.
      </span>
    </main>
  );
}