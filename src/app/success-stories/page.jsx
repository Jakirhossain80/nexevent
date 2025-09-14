import Image from "next/image";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";

// Icons
import { FaQuoteLeft, FaStar, FaUsers, FaCalendarCheck, FaSmile } from "react-icons/fa";

// Reusable components (code-splitting)
import SectionHeading from "@/components/SectionHeading";
import StoryCard from "@/components/StoryCard";
import TestimonialCard from "@/components/TestimonialSuccessCard";
import MetricCard from "@/components/MetricCard";

// Fonts (NexEvent: Poppins for headings, Inter for body)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Success Stories — NexEvent",
  description:
    "Inspiring success stories from events powered by NexEvent — measurable impact, delighted clients, and memorable experiences.",
};

const STORIES = [
  {
    id: 1,
    image: "/light1.png",
    title: "Global Tech Summit",
    blurb:
      "Scaled to 5K+ attendees with seamless check-ins and real-time agenda updates. Engagement up 38% YoY.",
    client: "FutureWave Inc.",
    alt: "Crowd at a global tech summit with stage lighting",
  },
  {
    id: 2,
    image: "/dark1.png",
    title: "Startup Demo Day",
    blurb:
      "Managed 40+ live demos with slot allocation and feedback capture. 12 startups secured investor follow-ups.",
    client: "LaunchPad VC",
    alt: "Founders pitching at a startup demo day",
  },
  {
    id: 3,
    image: "/dark2.png",
    title: "Healthcare Innovation Forum",
    blurb:
      "HIPAA-aware registration and role-based access. Satisfaction score reached 4.8/5 across sessions.",
    client: "MedForward",
    alt: "Panel discussion with healthcare professionals",
  },
  {
    id: 4,
    image: "/light2.png",
    title: "City Music Fest",
    blurb:
      "Multi-stage scheduling and crowd flow heatmaps. Reduced entry wait time by 52% on day two.",
    client: "CityArts Council",
    alt: "Outdoor music festival stage and audience",
  },
  {
    id: 5,
    image: "/dark3.png",
    title: "University Career Fair",
    blurb:
      "Smart matchmaking connected 700+ students to 120 employers. 1,900 interviews booked in-app.",
    client: "Northbridge University",
    alt: "Students meeting recruiters at career fair booths",
  },
  {
    id: 6,
    image: "/light3.png",
    title: "Community Leadership Conference",
    blurb:
      "Volunteer coordination and multilingual agendas. Attendance grew 2.3× with targeted reminders.",
    client: "Community Alliance",
    alt: "Community leaders networking at a conference",
  },
];

const TESTIMONIALS = [
  {
    name: "Aisha Rahman",
    role: "Program Director, MedForward",
    avatar: "/f1.png",
    quote:
      "NexEvent streamlined our complex breakout schedule and attendee permissions. Our NPS jumped from 48 to 72 in one edition.",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "Founder, LaunchPad VC",
    avatar: "/m1.png",
    quote:
      "Demos ran like clockwork. The built-in feedback forms gave us investor-ready analytics the next morning.",
    stars: 5,
  },
  {
    name: "Sara Al-Harbi",
    role: "Operations Lead, CityArts Council",
    avatar: "/m2.png",
    quote:
      "Ticket scanning was lightning fast, and the live announcements feature saved our team multiple times.",
    stars: 4,
  },
];

const METRICS = [
  { icon: FaUsers, label: "Attendees Engaged", value: "150K+" },
  { icon: FaCalendarCheck, label: "Events Hosted", value: "1,200+" },
  { icon: FaSmile, label: "Client Satisfaction", value: "96%" },
];

export default function SuccessStoriesPage() {
  return (
    <main
      className={`${inter.variable} ${poppins.variable} bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500`}
      aria-label="Success Stories main content"
    >
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="mx-auto max-w-[1080px] py-20">
          <header className="text-center">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-700 dark:text-indigo-400"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Success Stories
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Real events. Real impact. See how teams use NexEvent to plan, run, and scale unforgettable experiences.
            </p>
          </header>
        </div>
      </section>

      {/* Story Highlights Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-[1680px]">
          <SectionHeading
            eyebrow="Highlights"
            title="Proven Outcomes Across Industries"
            subtitle="From summits to festivals, NexEvent adapts to your format and scale."
          />

          <div
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Success story cards"
          >
            {STORIES.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Clients Say"
            subtitle="Trusted by organizers who value reliability, speed, and insights."
            Icon={FaQuoteLeft}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} t={t} StarIcon={FaStar} />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Impact"
            title="Measured Results"
            subtitle="Metrics that matter to your team and your stakeholders."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {METRICS.map((m) => (
              <MetricCard key={m.label} icon={m.icon} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/70 p-6 sm:p-8 text-center shadow-sm transition-all duration-500">
            <h2
              className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Ready to create your own success story?
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Start a new event in minutes or talk to our team for a personalized walkthrough.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/create-event"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-500"
                aria-label="Create a new event"
              >
                Create Event
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-500"
                aria-label="Contact NexEvent team"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative (accessibly hidden) */}
      <span className="sr-only">
        Colors follow NexEvent palette: Indigo (primary), Emerald (accent), Gray/Slate backgrounds.
      </span>
    </main>
  );
}
