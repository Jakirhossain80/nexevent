"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SectionHeading({ eyebrow, title, subtitle, Icon }) {
  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once for headings
    });
  }, []);

  return (
    <div className="text-center" data-aos="fade-up">
      <div className="inline-flex items-center gap-2" data-aos="fade-down">
        {Icon ? (
          <Icon
            className="h-5 w-5 text-emerald-500"
            aria-hidden="true"
            data-aos="zoom-in"
            data-aos-delay="60"
          />
        ) : null}
        <span className="uppercase tracking-wide text-xs font-semibold text-emerald-500">
          {eyebrow}
        </span>
      </div>
      <h2
        className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
