import {
  FiCalendar,
  FiBell,
  FiShield,
  FiLayout,
  FiLogIn,
  FiSmartphone,
} from "react-icons/fi";


const FEATURES = [
  {
    icon: FiCalendar,
    title: "Easy Event Booking",
    desc:
      "Create events with dates, capacity, pricing, and let attendees book in a simple flow.",
  },
  {
    icon: FiBell,
    title: "Real-time Notifications",
    desc:
      "Keep organizers and attendees informed with instant status updates and reminders.",
  },
  {
    icon: FiShield,
    title: "Secure Payments",
    desc:
      "Add payments later with robust security—designed for PCI-friendly integration.",
  },
  {
    icon: FiLayout,
    title: "Personalized Dashboard",
    desc:
      "Manage events, track bookings, and view insights in a clean, focused interface.",
  },
  {
    icon: FiLogIn,
    title: "Google & Email Auth",
    desc:
      "Fast, secure login with Google OAuth or email/password using NextAuth.",
  },
  {
    icon: FiSmartphone,
    title: "Mobile Friendly Design",
    desc:
      "Beautiful and accessible experience across phones, tablets, and desktops.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent features"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Section Title & Description */}
        <header className="max-w-3xl">
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
              text-indigo-700 dark:text-indigo-300
            "
            style={{ fontFamily: "var(--font-poppins)" }} // Poppins for headings
          >
            Powerful Features for Seamless Event Management
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} // Inter for body
          >
            NexEvent streamlines every step, from creating and promoting your event
            to handling bookings and tracking results—all in one modern, secure platform.
          </p>
        </header>

        {/* Features Grid */}
        <ul
          className="
            mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-6 lg:gap-8
          "
          role="list"
        >
          {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
            <li key={idx}>
              <article
                className="
                  h-full rounded-2xl border border-gray-200 bg-white
                  dark:border-slate-800 dark:bg-slate-800
                  p-5 sm:p-6
                  shadow-sm transition-all duration-500
                  hover:shadow-md hover:-translate-y-0.5
                  focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
                "
              >
                <div className="flex items-start gap-4">
                  {/* Icon badge (decorative) */}
                  <span
                    className="
                      inline-flex items-center justify-center
                      h-12 w-12 rounded-xl
                      bg-indigo-50 text-indigo-700
                      dark:bg-slate-700 dark:text-indigo-200
                      ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
                      transition-all duration-500
                      shrink-0
                    "
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </span>

                  <div className="flex-1 min-w-0">
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
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
