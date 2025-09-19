"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";

// Icons
import {
  FaQuoteLeft,
  FaStar,
  FaUsers,
  FaCalendarCheck,
  FaSmile,
} from "react-icons/fa";

// Reusable components (code-splitting)
import SectionHeading from "@/components/SectionHeading";
import StoryCard from "@/components/StoryCard";
import TestimonialCard from "@/components/TestimonialSuccessCard";
import MetricCard from "@/components/MetricCard";

// Fonts (NexEvent: Poppins for headings, Inter for body)
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

export default function SuccessStoriesContent({ stories, testimonials, metrics }) {
  // Initialize AOS only on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once per element
    });
  }, []);

  // Map string icons from server file to actual components for MetricCard
  const metricIconMap = { FaUsers, FaCalendarCheck, FaSmile };

  return (
    <main
      className={`${inter.variable} ${poppins.variable} bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500`}
      aria-label="Success Stories main content"
    >
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="mx-auto max-w-[1080px] py-20">
          <header className="text-center">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-700 dark:text-indigo-400"
              style={{ fontFamily: "var(--font-poppins)" }}
              data-aos="fade-up"
            >
              Success Stories
            </h1>
            <p
              className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Real events. Real impact. See how teams use NexEvent to plan, run, and scale unforgettable experiences.
            </p>
          </header>
        </div>
      </section>

      {/* Story Highlights Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-[1480px]">
          <div data-aos="fade-up">
            <SectionHeading
              eyebrow="Highlights"
              title="Proven Outcomes Across Industries"
              subtitle="From summits to festivals, NexEvent adapts to your format and scale."
            />
          </div>

          <div
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Success story cards"
          >
            {stories.map((story, idx) => (
              <div
                key={story.id}
                data-aos="fade-up"
                data-aos-delay={100 * (idx % 3)}
              >
                {/* Keep component intact; wrapper only adds AOS */}
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-6xl">
          <div data-aos="fade-up">
            <SectionHeading
              eyebrow="Testimonials"
              title="What Clients Say"
              subtitle="Trusted by organizers who value reliability, speed, and insights."
              Icon={FaQuoteLeft}
            />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                data-aos="zoom-in-up"
                data-aos-delay={80 * (i % 3)}
              >
                <TestimonialCard t={t} StarIcon={FaStar} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-6xl">
          <div data-aos="fade-up">
            <SectionHeading
              eyebrow="Impact"
              title="Measured Results"
              subtitle="Metrics that matter to your team and your stakeholders."
            />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {metrics.map((m, i) => {
              const IconComp = metricIconMap[m.icon] || FaUsers;
              return (
                <div
                  key={m.label}
                  data-aos="fade-up"
                  data-aos-delay={90 * (i % 3)}
                >
                  <MetricCard icon={IconComp} label={m.label} value={m.value} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-5xl">
          <div
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 p-6 sm:p-8 text-center shadow-sm transition-all duration-500"
            data-aos="fade-up"
          >
            <h2
              className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Ready to create your own success story?
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              data-aos="fade-up"
              data-aos-delay="140"
            >
              Start a new event in minutes or talk to our team for a personalized walkthrough.
            </p>

            <div
              className="mt-6 flex items-center justify-center gap-3"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Link
                href="/create-event"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-500"
                aria-label="Create a new event"
              >
                Create Event
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-500"
                aria-label="Contact NexEvent team"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative (accessibly hidden) */}
      <span className="sr-only">
        Colors follow NexEvent palette: Indigo (primary), Emerald (accent), Gray/Slate backgrounds.
      </span>
    </main>
  );
}