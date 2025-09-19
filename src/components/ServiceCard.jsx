"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServiceCard({ Icon, title, desc }) {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate each card once
    });
  }, []);

  return (
    <article
      className="
        h-full rounded-2xl border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        p-5 sm:p-6
        shadow-sm transition-all duration-500
        hover:-translate-y-0.5 hover:shadow-md
        focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
      "
      data-aos="fade-up"
    >
      <div className="flex items-start gap-4">
        <span
          className="
            inline-flex h-12 w-12 items-center justify-center
            rounded-xl bg-indigo-50 text-indigo-700
            dark:bg-slate-700 dark:text-indigo-200
            ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
            transition-all duration-500
            shrink-0
          "
          aria-hidden="true"
          data-aos="zoom-in"
          data-aos-delay="80"
        >
          <Icon size={22} />
        </span>

        <div className="flex-1 min-w-0">
          <h3
            className="text-base sm:text-lg font-semibold leading-snug"
            style={{ fontFamily: "var(--font-poppins)" }}
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {title}
          </h3>
          <p
            className="mt-1 text-sm sm:text-base text-slate-700 dark:text-slate-200"
            style={{ fontFamily: "var(--font-inter)" }}
            data-aos="fade-up"
            data-aos-delay="160"
          >
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}
