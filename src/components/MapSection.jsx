"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

export default function MapSection() {
  // Initialize AOS on client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once per element
    });
  }, []);

  return (
    <div aria-label="Map section">
      <h2
        className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
        data-aos="fade-up"
      >
        Find Us on the Map
      </h2>
      <p
        className="mt-2 text-slate-600 dark:text-slate-300"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        Visit our HQ or schedule a virtual call—we work with teams worldwide.
      </p>

      {/* Responsive Google Map embed */}
      <div
        className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
        data-aos="zoom-in"
        data-aos-delay="180"
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            title="NexEvent HQ Location"
            src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Optional placeholder image example (uses next/image for optimization) */}
      <div className="sr-only">
        <Image
          src="/map-placeholder.png"
          alt="Static map placeholder"
          width={1200}
          height={675}
        />
      </div>
    </div>
  );
}
