import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarCheck, FaUsers, FaRegLightbulb, FaGlobe } from "react-icons/fa";

import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialCard from "@/components/TestimonialCard";

// Optional: enable ISR (revalidate every 6 hours)
// export const revalidate = 21600;

export const metadata = {
  title: "Our Portfolio — NexEvent",
  description:
    "Explore NexEvent’s portfolio: conferences, weddings, concerts, and corporate events. See how we plan, promote, and manage events that delight audiences.",
  openGraph: {
    title: "Our Portfolio — NexEvent",
    description:
      "A curated showcase of events powered by NexEvent: modern workflows, secure bookings, and polished experiences.",
    type: "website",
  },
};


export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "conferences", label: "Conferences" },
  { key: "weddings", label: "Weddings" },
  { key: "concerts", label: "Concerts" },
  { key: "corporate", label: "Corporate Events" },
];



// Showcase items (images go in /public/portfolio/*)
export const ITEMS = [
  {
    id: "p1",
    title: "Next.js Summit 2025",
    desc: "A hybrid conference with 2k+ attendees and seamless bookings.",
    category: "conferences",
    image: "/light1.png",
  },
  {
    id: "p2",
    title: "Coastal Wedding",
    desc: "Intimate ceremony & reception with smooth RSVP flow.",
    category: "weddings",
    image: "/light2.png",
  },
  {
    id: "p3",
    title: "Open Air Concert",
    desc: "High-volume ticketing with capacity & gate scanning.",
    category: "concerts",
    image: "/light3.png",
  },
  {
    id: "p4",
    title: "Global Product Launch",
    desc: "Corporate keynote + regional watch parties with live Q&A.",
    category: "corporate",
    image: "/light4.png",
  },
  {
    id: "p5",
    title: "Tech Leaders Meetup",
    desc: "Monthly networking with managed invitations.",
    category: "conferences",
    image: "/light5.png",
  },
  {
    id: "p6",
    title: "Charity Concert",
    desc: "Fundraiser with merch pre-orders and VIP tiers.",
    category: "concerts",
    image: "/dark4.png",
  },
];

// Testimonials (avatars go in /public/avatars/*)
const TESTIMONIALS = [
  {
    name: "Ava Thompson",
    role: "Community Lead, OpenHub",
    quote:
      "NexEvent handled ticketing and check-ins flawlessly. Our attendees loved the experience.",
    avatar: "/f3.png",
  },
  {
    name: "Liam Carter",
    role: "Founder, CraftWorks",
    quote:
      "Publishing events and tracking bookings was effortless. Highly recommend for growing teams.",
    avatar: "/m3.png",
  },
  {
    name: "Maya Patel",
    role: "Program Manager, StartLab",
    quote:
      "Mobile-friendly booking and secure auth made it simple for our audience to join.",
    avatar: "/f1.png",
  },
];

export default function Portfolio() {
  return (
    <main
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent Portfolio"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* 1) Hero */}
        <section className="py-16 sm:py-20">
          <header className="max-w-3xl mb-16">
            <h1
              className="
                text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Our Portfolio
            </h1>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Real events, real outcomes. Explore how teams used NexEvent to plan,
              promote, and run unforgettable experiences.
            </p>
          </header>

          {/* Optional hero illustration (swap assets) */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p
                className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                From conferences to concerts, NexEvent streamlines booking flows,
                capacity checks, and organizer collaboration—so you can focus on your audience.
              </p>
            </div>
            <div className="lg:col-span-5">
              {/* Light/Dark illustration swap */}
              <div className="block dark:hidden">
                <Image
                  src="/light3.png"
                  alt="Event highlight collage in light mode"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-black/5"
                  priority={false}
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src="/dark4.png"
                  alt="Event highlight collage in dark mode"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-2xl shadow-sm ring-1 ring-white/10"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2 & 3) Filter + Portfolio Grid */}
        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800">
          <PortfolioGallery items={ITEMS} categories={CATEGORIES} />
        </section>

        {/* 4) Client Testimonials */}
        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800">
          <header className="max-w-3xl">
            <h2
              className="
                text-xl sm:text-2xl lg:text-3xl font-semibold
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              What Clients Say
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              A few words from teams who trusted NexEvent to power their events.
            </p>
          </header>

          {/* CSS scroll-snap carousel on mobile, grid on desktop (no JS needed) */}
          <ul
            className="
              mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6
              md:[&>*]:snap-none
              overflow-x-auto md:overflow-visible
              snap-x snap-mandatory
              [-webkit-overflow-scrolling:touch]
              pb-2 md:pb-0
            "
            role="list"
            aria-live="polite"
          >
            {TESTIMONIALS.map((t, i) => (
              <li key={i} className="snap-start md:snap-auto min-w-[85%] sm:min-w-[70%] md:min-w-0">
                <TestimonialCard {...t} priority={i === 0} />
              </li>
            ))}
          </ul>
        </section>

        {/* 5) Call To Action */}
        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-slate-800">
          <div
            className="
              rounded-3xl border border-gray-200 dark:border-slate-800
              bg-white/70 dark:bg-slate-800/70 backdrop-blur
              p-6 sm:p-10 shadow-sm
              transition-all duration-500
              grid grid-cols-1 lg:grid-cols-12 gap-6 items-center
            "
          >
            <div className="lg:col-span-8">
              <h3
                className="
                  text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight
                  text-indigo-700 dark:text-indigo-300
                "
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Inspired? Let’s create your next event.
              </h3>
              <p
                className="mt-2 text-slate-600 dark:text-slate-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Head to the dashboard to publish your first event, or contact us for a tailored setup.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Link
                  href="/dashboard"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                    text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                    dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                    transition-all duration-500
                  "
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-label="Go to Dashboard"
                >
                  Create Event
                </Link>
                <Link
                  href="/contact"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                    text-indigo-700 bg-indigo-50 hover:bg-indigo-100
                    dark:text-indigo-300 dark:bg-slate-700 dark:hover:bg-slate-600
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                    dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-900
                    transition-all duration-500
                  "
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-label="Contact us"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="h-10" />
        </section>
      </div>
    </main>
  );
}
