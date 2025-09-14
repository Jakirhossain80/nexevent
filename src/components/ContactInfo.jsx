import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactInfo() {
  const items = [
    {
      icon: FaPhoneAlt,
      label: "Phone",
      value: "+880 1234-567890",
      href: "tel:+8801234567890",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "support@nexevent.app",
      href: "mailto:support@nexevent.app",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: "NexEvent HQ, Dhaka, Bangladesh",
      href: "https://maps.google.com/?q=NexEvent%20HQ%20Dhaka",
    },
    {
      icon: FaClock,
      label: "Working Hours",
      value: "Sun–Thu: 9:00–18:00 (GMT+6)",
      href: null,
    },
  ];

  return (
    <aside
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all duration-500"
      aria-label="Contact information"
    >
      <h2
        className="text-xl font-semibold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Contact Information
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Reach out via phone or email, or visit our office. We’re happy to help.
      </p>

      <ul className="mt-6 space-y-4">
        {items.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  className="text-sm text-indigo-700 hover:underline dark:text-indigo-300"
                >
                  {value}
                </a>
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-300">{value}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
