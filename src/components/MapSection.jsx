// components/MapSection.jsx
import Image from "next/image";

export default function MapSection() {
  return (
    <div aria-label="Map section">
      <h2
        className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Find Us on the Map
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Visit our HQ or schedule a virtual call—we work with teams worldwide.
      </p>

      {/* Responsive Google Map embed */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
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
          src="/images/map-placeholder.jpg"
          alt="Static map placeholder"
          width={1200}
          height={675}
        />
      </div>
    </div>
  );
}
