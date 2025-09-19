"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

export default function TestimonialCard({ name, role, quote, avatar, priority = false }) {
  // Initialize AOS (client-only)
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate each card once for a clean UX
    });
  }, []);

  return (
    <article
      className="
        relative h-full
        rounded-2xl border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        p-6 sm:p-7
        shadow-sm hover:shadow-md
        transition-all duration-500
      "
      data-aos="fade-up"
    >
      <div className="flex items-center gap-4">
        <div
          className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
          data-aos="zoom-in"
          data-aos-delay="80"
        >
          <Image
            src={avatar}
            alt={`${name} avatar`}
            fill
            sizes="56px"
            className="object-cover"
            priority={priority}
          />
        </div>
        <div className="min-w-0">
          <h3
            className="text-base font-semibold truncate"
            style={{ fontFamily: "var(--font-poppins)" }}
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {name}
          </h3>
          <p
            className="text-sm text-slate-500 dark:text-slate-400 truncate"
            style={{ fontFamily: "var(--font-inter)" }}
            data-aos="fade-up"
            data-aos-delay="160"
          >
            {role}
          </p>
        </div>
      </div>

      <p
        className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-200"
        style={{ fontFamily: "var(--font-inter)" }}
        data-aos="fade-left"
        data-aos-delay="200"
      >
        “{quote}”
      </p>
    </article>
  );
}
