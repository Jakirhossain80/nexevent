import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";


export default function CTA() {
  return (
    <section
      id="cta"
      className="
        relative overflow-hidden
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="Call to action"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Content wrapper: stacked → side-by-side */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-12 items-center gap-8
            rounded-3xl border border-gray-200 dark:border-slate-800
            bg-white/70 dark:bg-slate-800/70
            backdrop-blur
            p-6 sm:p-10
            shadow-sm
            transition-all duration-500
          "
        >
          {/* Text */}
          <div className="lg:col-span-8">
            <h2
              className="
                text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }} // Poppins (headings)
            >
              Ready to Experience NexEvent?
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl"
              style={{ fontFamily: "var(--font-inter)" }} // Inter (body)
            >
              Create, publish, and manage events with a fast, secure, and modern
              workflow. Start free and scale when you’re ready.
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Primary CTA */}
              <Link
                href="/signup"
                aria-label="Get started with NexEvent"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                  text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                  dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                  shadow-sm hover:shadow-md
                  transition-all duration-500
                "
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Get Started
                {/* react-icon: decorative, improves affordance */}
                <FaArrowRight aria-hidden="true" className="translate-x-0 group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Secondary CTA (optional) */}
              <Link
                href="/about"
                aria-label="Learn more about NexEvent"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                  text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.98]
                  dark:text-indigo-300 dark:bg-slate-700 dark:hover:bg-slate-600
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                  dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                  shadow-sm hover:shadow-md
                  transition-all duration-500
                "
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Optional decorative image (uses next/image for optimization) */}
          <div className="lg:col-span-4">
            {/* Replace /cta-illustration-(light|dark).png with your real assets */}
            <div className="block dark:hidden">
              <Image
                src="/light5.png"
                alt="Illustration of organizing events with NexEvent"
                width={900}
                height={700}
                className="w-full h-auto rounded-2xl ring-1 ring-black/5 shadow-sm"
                priority={false} // keep lightweight; raise to true only if above the fold and critical to LCP
              />
            </div>
            <div className="hidden dark:block">
              <Image
                src="/dark5.png"
                alt="Illustration of organizing events with NexEvent (dark mode)"
                width={900}
                height={700}
                className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-sm"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient accent (pure CSS; zero layout shift) */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 bottom-0 h-24
          bg-gradient-to-t from-indigo-100/50 to-transparent
          dark:from-indigo-900/20
          transition-all duration-500
        "
      />
    </section>
  );
}
