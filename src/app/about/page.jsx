import dynamic from "next/dynamic";
import { FiUsers, FiCalendar, FiZap, FiShield } from "react-icons/fi";

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

// 👇 Dynamically import the client component so AOS runs on the client only
const AboutContent = dynamic(() => import("./AboutContent"), {
  ssr: false,
  loading: () => null, // no visual change; preserves your current UX
});

export default function AboutPage() {
  return <AboutContent />;
}