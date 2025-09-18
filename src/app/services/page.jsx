import { FaCalendarCheck, FaUsers, FaTicketAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";
import ServicesContent from "./ServicesContent";

export const metadata = {
  title: "Our Services — NexEvent",
  description:
    "Discover NexEvent services: event creation & management, booking & ticketing, collaboration tools, and analytics & insights. Built with Next.js for speed and reliability.",
  openGraph: {
    title: "Our Services — NexEvent",
    description:
      "Everything you need to plan, promote, and manage events efficiently.",
    type: "website",
  },
};

export default function Services() {
  // Server component simply renders the client child (where AOS runs)
  return <ServicesContent />;
}