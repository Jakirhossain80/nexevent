import Image from "next/image";
import Link from "next/link";
import {
  FiMonitor,
  FiShoppingCart,
  FiSmartphone,
  FiBell,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";


const SHOWCASE = [
  {
    icon: FiMonitor,
    title: "Modern Dashboard Preview",
    desc:
      "A clean, data-driven dashboard to create, publish, and manage events with confidence.",
    imageLight: "/dashlight.png",
    imageDark: "/dashdark.png",
    alt: "NexEvent dashboard preview",
  },
  {
    icon: FiShoppingCart,
    title: "Easy Event Booking Flow",
    desc:
      "Frictionless checkout that helps attendees reserve seats in seconds.",
    imageLight: "/light1.png",
    imageDark: "/dark1.png",
    alt: "NexEvent booking flow screenshot",
  },
  {
    icon: FiSmartphone,
    title: "Mobile-Friendly Experience",
    desc:
      "Optimized layouts for all breakpoints—beautiful on phones, tablets, and desktops.",
    imageLight: "/light2.png",
    imageDark: "/dark2.png",
    alt: "NexEvent mobile view preview",
  },
  {
    icon: FiBell,
    title: "Real-time Notifications",
    desc:
      "Stay in sync with instant updates for new bookings and status changes.",
    imageLight: "/light3.png",
    imageDark: "/dark3.png",
    alt: "NexEvent notifications example",
  },
  {
    icon: FiTrendingUp,
    title: "Insights & Growth",
    desc:
      "Track performance and learn what works—optimize your events over time.",
    imageLight: "/light4.png",
    imageDark: "/dark4.png",
    alt: "NexEvent analytics and insights",
  },
  {
    icon: FiCheckCircle,
    title: "Reliable & Secure",
    desc:
      "Backed by modern auth, robust APIs, and best practices to keep data safe.",
    imageLight: "/light5.png",
    imageDark: "/dark5.png",
    alt: "NexEvent security illustration",
  },
];

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="Showcasing NexEvent in action"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Title + subtitle */}
        <header className="max-w-3xl">
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
              text-indigo-700 dark:text-indigo-300
            "
            style={{ fontFamily: "var(--font-poppins)" }} /* Poppins */
          >
            Showcasing NexEvent in Action
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} /* Inter */
          >
            See how NexEvent streamlines event creation, booking, and management with
            a modern, accessible UI across devices.
          </p>
        </header>

        {/* Cards grid */}
        <ul
          className="
            mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-6 lg:gap-8
          "
          role="list"
        >
          {SHOWCASE.map(({ icon: Icon, title, desc, imageLight, imageDark, alt }, idx) => (
            <li key={idx}>
              <article
                className="
                  group h-full overflow-hidden rounded-2xl
                  border border-gray-200 bg-white
                  dark:border-slate-800 dark:bg-slate-800
                  shadow-sm hover:shadow-md
                  transition-all duration-500 hover:-translate-y-0.5
                  focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
                "
              >
                {/* Media */}
                <div className="relative">
                  {/* Light image */}
                  <div className="block dark:hidden">
                    <Image
                      src={imageLight}
                      alt={alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority={idx < 2} /* prioritize a couple for LCP */
                    />
                  </div>
                  {/* Dark image */}
                  <div className="hidden dark:block">
                    <Image
                      src={imageDark}
                      alt={alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority={idx < 2}
                    />
                  </div>

                  {/* Icon badge */}
                  <span
                    className="
                      absolute left-4 -bottom-6
                      inline-flex items-center justify-center
                      h-12 w-12 rounded-xl
                      bg-indigo-600 text-white
                      ring-4 ring-white dark:ring-slate-800
                      transition-all duration-500
                      group-hover:scale-[1.03]
                    "
                    aria-hidden="true"
                    title={title}
                  >
                    <Icon size={22} />
                  </span>
                </div>

                {/* Copy */}
                <div className="pt-8 px-5 sm:px-6 pb-5">
                  <h3
                    className="text-base sm:text-lg font-semibold leading-snug"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {desc}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Optional CTA */}
        <div className="mt-10">
          <Link
            href="/portfolio" // ← change target if needed
            aria-label="Explore more NexEvent showcases"
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg px-5 py-3 text-sm sm:text-base font-medium
              text-white bg-indigo-600 hover:bg-indigo-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
              dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
              transition-all duration-500
            "
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore More
            {/* decorative icon */}
            <FiTrendingUp aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
