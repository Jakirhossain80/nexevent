import PortfolioContent from "./PortfolioContent";

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
  // Server component renders a client child where AOS is initialized
  return (
    <PortfolioContent
      items={ITEMS}
      categories={CATEGORIES}
      testimonials={TESTIMONIALS}
    />
  );
}