"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import { FaRegCalendarCheck, FaUsers, FaRegLightbulb, FaGlobe } from "react-icons/fa";

const ICONS = {
  conferences: FaRegCalendarCheck,
  weddings: FaUsers,
  concerts: FaRegLightbulb,
  corporate: FaGlobe,
};

export default function PortfolioCard({ image, title, desc, category }) {
  const Icon = ICONS[category] ?? FaGlobe;

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
    <article
      className="
        h-full overflow-hidden rounded-2xl
        border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        shadow-sm transition-all duration-500
        hover:-translate-y-0.5 hover:shadow-md
        focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
      "
      data-aos="fade-up"
    >
      <div className="relative aspect-[16/10]" data-aos="zoom-in" data-aos-delay="80">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover"
          priority={false}
        />
        {/* Category pill */}
        <span
          className="
            absolute top-3 left-3 inline-flex items-center gap-2
            rounded-full bg-white/90 text-slate-800
            dark:bg-slate-900/80 dark:text-slate-100
            ring-1 ring-inset ring-gray-200 dark:ring-slate-700
            px-3 py-1 text-xs font-medium
            transition-all duration-500
          "
          style={{ fontFamily: "var(--font-inter)" }}
          data-aos="fade-down"
          data-aos-delay="140"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3
          className="text-base sm:text-lg font-semibold"
          style={{ fontFamily: "var(--font-poppins)" }}
          data-aos="fade-up"
          data-aos-delay="120"
        >
          {title}
        </h3>
        <p
          className="mt-1 text-sm sm:text-base text-slate-700 dark:text-slate-200 line-clamp-3"
          style={{ fontFamily: "var(--font-inter)" }}
          data-aos="fade-up"
          data-aos-delay="160"
        >
          {desc}
        </p>
      </div>
    </article>
  );
}
