import SuccessStoriesContent from "./SuccessStoriesContent";

export const metadata = {
  title: "Success Stories — NexEvent",
  description:
    "Inspiring success stories from events powered by NexEvent — measurable impact, delighted clients, and memorable experiences.",
};

// Stories
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

// Testimonials
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

// Metrics
const METRICS = [
  { icon: "FaUsers", label: "Attendees Engaged", value: "150K+" },
  { icon: "FaCalendarCheck", label: "Events Hosted", value: "1,200+" },
  { icon: "FaSmile", label: "Client Satisfaction", value: "96%" },
];

export default function Page() {
  return (
    <SuccessStoriesContent
      stories={STORIES}
      testimonials={TESTIMONIALS}
      metrics={METRICS}
    />
  );
}