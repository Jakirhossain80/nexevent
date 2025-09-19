"use client";

import { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQS = [
  {
    q: "What is NexEvent and who is it for?",
    a: "NexEvent is a full-stack event management platform built with Next.js. It helps teams and creators plan, publish, and manage events with secure auth, bookings, and a modern dashboard.",
  },
  {
    q: "How do attendees book an event?",
    a: "From an event page, attendees can review details and reserve seats through a guided booking flow. Capacity and availability checks run server-side to ensure accurate seat counts.",
  },
  {
    q: "Is authentication secure?",
    a: "Yes. NexEvent supports Google OAuth and Email/Password via NextAuth. Sessions are cryptographically signed, and sensitive routes are protected by middleware and server checks.",
  },
  {
    q: "Does NexEvent work on mobile?",
    a: "Absolutely. NexEvent is responsive from 360px to desktop, with accessible patterns, smooth interactions, and optimized images for fast loads on all devices.",
  },
  {
    q: "Can I upgrade plans later?",
    a: "You can start on any plan and upgrade at any time. For billing, integrate Stripe when you’re ready to accept payments and handle subscriptions.",
  },
];

export default function FAQ() {
  // Set to true if you want multiple items open at once
  const allowMultiple = true;

  // Track open indices (Set allows multi-open control)
  const [openSet, setOpenSet] = useState(new Set());

  // Initialize AOS (client-only)
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once when scrolled into view
    });
  }, []);

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (allowMultiple) {
        next.has(idx) ? next.delete(idx) : next.add(idx);
      } else {
        next.clear();
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Heading */}
        <header className="max-w-3xl" data-aos="fade-up">
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
              text-indigo-700 dark:text-indigo-300
            "
            style={{ fontFamily: "var(--font-poppins)" }} // Poppins
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} // Inter
            data-aos="fade-up"
            data-aos-delay="120"
          >
            Answers to common questions about authentication, bookings, performance, and plans.
          </p>
        </header>

        {/* FAQ list */}
        <ul className="mt-10 space-y-3 sm:space-y-4" role="list">
          {FAQS.map((item, idx) => (
            <FAQItem
              key={idx}
              index={idx}
              question={item.q}
              answer={item.a}
              open={openSet.has(idx)}
              onToggle={() => toggle(idx)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Single FAQ item (accordion) */
function FAQItem({ index, question, answer, open, onToggle }) {
  const contentRef = useRef(null);
  const contentId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  // Compute dynamic max-height for smooth open/close
  const maxHeight = open ? contentRef.current?.scrollHeight ?? 0 : 0;

  return (
    <li
      className="
        rounded-2xl border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        transition-all duration-500
        hover:shadow-md hover:-translate-y-0.5
        focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
      "
      data-aos="fade-up"
      data-aos-delay={100 * (index % 3)} /* subtle stagger by column */
    >
      <h3>
        <button
          id={buttonId}
          aria-controls={contentId}
          aria-expanded={open}
          onClick={onToggle}
          className="
            w-full flex items-center justify-between gap-4
            px-5 sm:px-6 py-4 sm:py-5
            text-left
            transition-all duration-500
            hover:bg-gray-50 dark:hover:bg-slate-700/40
            rounded-2xl
            focus:outline-none
          "
        >
          <span
            className="text-base sm:text-lg font-semibold"
            style={{ fontFamily: "var(--font-poppins)" }} // Poppins
            data-aos="fade-up"
            data-aos-delay={140 + 100 * (index % 3)}
          >
            {question}
          </span>

          <span
            className="
              inline-flex h-8 w-8 shrink-0 items-center justify-center
              rounded-full
              bg-indigo-50 text-indigo-700
              dark:bg-slate-700 dark:text-indigo-200
              ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
              transition-all duration-500
            "
            aria-hidden="true"
            data-aos="zoom-in"
            data-aos-delay={160 + 100 * (index % 3)}
          >
            {open ? <FaChevronUp className="h-4 w-4" /> : <FaChevronDown className="h-4 w-4" />}
          </span>
        </button>
      </h3>

      {/* Collapsible content wrapper with max-height animation */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        ref={contentRef}
        style={{ maxHeight }}
        className="
          overflow-hidden
          transition-all duration-500 ease-in-out
        "
        data-aos="fade-down"
        data-aos-delay={200 + 100 * (index % 3)}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
          <p
            className="text-sm sm:text-base text-slate-700 dark:text-slate-200"
            style={{ fontFamily: "var(--font-inter)" }} // Inter
          >
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}
