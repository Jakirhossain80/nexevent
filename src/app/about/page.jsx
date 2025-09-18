import { FiUsers, FiCalendar, FiZap, FiShield } from "react-icons/fi";
// ✅ Import the client component directly — no `ssr:false`
import AboutContent from "./AboutContent";

export const metadata = {
  title: "About NexEvent — Plan, Promote, and Manage Events",
  description:
    "NexEvent is a modern full-stack platform that simplifies event creation, booking, and management. Built with Next.js, NextAuth, and MongoDB.",
  openGraph: {
    title: "About NexEvent",
    description:
      "A modern platform for effortless events—secure auth, booking flows, and a powerful dashboard.",
    type: "website",
  },
};

export default function AboutPage() {
  // Server component simply renders the client child
  return <AboutContent />;
}

