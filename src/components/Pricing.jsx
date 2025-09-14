import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";


const PLANS = [
  {
    name: "Basic",
    price: "$0",
    period: "/mo",
    highlight: false,
    features: [
      "Create up to 3 events",
      "Email support",
      "Basic analytics",
      "Community access",
    ],
    ctaHref: "/signup",
    ctaText: "Get Started",
  },
  {
    name: "Standard",
    price: "$19",
    period: "/mo",
    highlight: true, // ← Most Popular
    features: [
      "Unlimited events",
      "Priority email support",
      "Advanced analytics",
      "Custom branding",
      "CSV export",
    ],
    ctaHref: "/signup",
    ctaText: "Start Standard",
  },
  {
    name: "Premium",
    price: "$49",
    period: "/mo",
    highlight: false,
    features: [
      "Everything in Standard",
      "Team roles & permissions",
      "Webhooks & API access",
      "SLA & dedicated support",
      "Early feature access",
    ],
    ctaHref: "/contact", // maybe enterprise contact
    ctaText: "Talk to Sales",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="NexEvent pricing plans"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        {/* Section Heading */}
        <header className="max-w-3xl">
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
              text-indigo-700 dark:text-indigo-300
            "
            style={{ fontFamily: "var(--font-poppins)" }} // Poppins (headings)
          >
            Our Pricing Plans
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }} // Inter (body)
          >
            Choose a plan that grows with your events. Upgrade anytime — all plans
            include fast performance, secure auth, and a modern dashboard.
          </p>
        </header>

        {/* Plans Grid */}
        <ul
          className="
            mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-6 lg:gap-8
          "
          role="list"
        >
          {PLANS.map((plan, idx) => (
            <li key={idx}>
              <article
                className={`
                  relative h-full rounded-2xl
                  border ${plan.highlight ? "border-indigo-300 dark:border-indigo-400/50" : "border-gray-200 dark:border-slate-800"}
                  bg-white dark:bg-slate-800
                  shadow-sm hover:shadow-md
                  transition-all duration-500
                  hover:-translate-y-0.5 hover:scale-[1.01]
                  ${plan.highlight ? "ring-1 ring-inset ring-indigo-200/70 dark:ring-indigo-400/20" : ""}
                `}
                aria-label={`${plan.name} plan`}
              >
                {/* Badge for Most Popular */}
                {plan.highlight && (
                  <div
                    className="
                      absolute -top-3 left-1/2 -translate-x-1/2
                      rounded-full px-3 py-1 text-xs font-medium
                      bg-indigo-600 text-white
                      shadow-sm
                    "
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Card content */}
                <div className="p-6 sm:p-7">
                  {/* Plan Header */}
                  <h3
                    className="text-lg sm:text-xl font-semibold"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {plan.name} Plan
                  </h3>

                  <div className="mt-2 flex items-baseline gap-1">
                    <span
                      className="text-3xl sm:text-4xl font-semibold text-indigo-700 dark:text-indigo-300"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-slate-500 dark:text-slate-400"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mt-5 space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="
                            mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center
                            rounded-full bg-emerald-500/10 text-emerald-600
                            dark:bg-emerald-400/10 dark:text-emerald-400
                            transition-all duration-500
                          "
                          aria-hidden="true"
                          title="Included"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                        </span>
                        <p
                          className="text-sm sm:text-base text-slate-700 dark:text-slate-200"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {f}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={plan.ctaHref}
                      aria-label={`${plan.ctaText} for ${plan.name} plan`}
                      className={`
                        inline-flex w-full items-center justify-center gap-2
                        rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                        transition-all duration-500
                        focus:outline-none focus-visible:ring-2
                        focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                        ${
                          plan.highlight
                            ? "text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400"
                            : "text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-slate-700 dark:hover:bg-slate-600 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400"
                        }
                      `}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {plan.ctaText}
                    </Link>
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
