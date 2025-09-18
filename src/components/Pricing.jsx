"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Poppins, Inter } from "next/font/google";
import { FiCheck, FiZap, FiStar, FiShield } from "react-icons/fi";
import clsx from "clsx";

// Load project fonts (one-time per bundle) — these become CSS variables we can use in className
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const defaultPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    cadence: "/month",
    tagline: "Kickstart your first events",
    icon: <FiShield aria-hidden="true" />,
    featured: false,
    cta: { label: "Get Started", href: "/signup" },
    features: [
      "Create up to 3 events",
      "Basic analytics",
      "Community support",
      "Standard booking flow",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "$19",
    cadence: "/month",
    tagline: "Best for growing organizers",
    icon: <FiStar aria-hidden="true" />,
    // Highlight this plan as “Most Popular”
    featured: true,
    cta: { label: "Start Standard", href: "/signup?plan=standard" },
    features: [
      "Unlimited events",
      "Advanced analytics & exports",
      "Priority email support",
      "Discount codes & coupons",
      "Custom booking form fields",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49",
    cadence: "/month",
    tagline: "Scale with pro tools & support",
    icon: <FiZap aria-hidden="true" />,
    featured: false,
    cta: { label: "Go Premium", href: "/signup?plan=premium" },
    features: [
      "All Standard features",
      "Team roles & permissions",
      "Webhooks & API access",
      "SLA & dedicated success manager",
      "Priority chat support",
    ],
  },
];

export default function Pricing({ plans = defaultPlans }) {
  // Initialize AOS animations on client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once per element
    });
  }, []);

  return (
    <section
      aria-labelledby="pricing-heading"
      className={clsx(
        "w-full",
        poppins.variable,
        inter.variable,
        // Section background adapts to theme
        "bg-gray-50 dark:bg-slate-900 transition-all duration-500 w-full"
      )}
    >
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100"
            style={{ fontFamily: "var(--font-poppins)" }}
            data-aos="fade-up"
          >
            Our Pricing Plans
          </h2>
          <p
            className="mt-3 text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "var(--font-inter)" }}
            data-aos="fade-up"
            data-aos-delay="120"
          >
            Choose a plan that fits your event goals. Upgrade anytime as your audience grows.
          </p>
        </div>

        {/* Grid of plans */}
        {/* Mobile: stacked; Tablet: 2 columns; Desktop: 3 columns */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8 md:gap-x-12 lg:gap-x-24 ">
          {plans.map((plan, idx) => (
            <article
              key={plan.id}
              className={clsx(
                "relative rounded-2xl border overflow-hidden",
                // Card border adapts to theme
                "border-slate-200 dark:border-slate-800",
                // Smooth transitions & subtle hover elevation
                "bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-500",
                // Slight scale on hover for desktop
                "hover:scale-[1.01]"
              )}
              data-aos="fade-up"
              data-aos-delay={100 * (idx % 3)} // subtle stagger by column
            >
              {/* Featured Ribbon */}
              {plan.featured && (
                <div
                  className={clsx(
                    "absolute top-0 right-0 rounded-bl-2xl px-3 py-1 text-xs font-semibold",
                    "bg-emerald-500 text-white"
                  )}
                  aria-label="Most popular plan"
                  data-aos="zoom-in"
                  data-aos-delay={140 + 100 * (idx % 3)}
                >
                  Most Popular
                </div>
              )}

              {/* Card content */}
              <div className="p-6">
                {/* Icon & plan title */}
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "inline-flex items-center justify-center w-10 h-10 rounded-xl",
                      "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white"
                    )}
                    aria-hidden="true"
                    data-aos="zoom-in"
                    data-aos-delay={140 + 100 * (idx % 3)}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold text-slate-800 dark:text-slate-100"
                      style={{ fontFamily: "var(--font-poppins)" }}
                      data-aos="fade-up"
                      data-aos-delay={180 + 100 * (idx % 3)}
                    >
                      {plan.name}
                    </h3>
                    {plan.tagline && (
                      <p
                        className="text-sm text-slate-500 dark:text-slate-400"
                        style={{ fontFamily: "var(--font-inter)" }}
                        data-aos="fade-up"
                        data-aos-delay={210 + 100 * (idx % 3)}
                      >
                        {plan.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1" data-aos="fade-up" data-aos-delay={240 + 100 * (idx % 3)}>
                  <span
                    className={clsx(
                      "text-3xl font-extrabold",
                      plan.featured
                        ? "text-indigo-700 dark:text-indigo-300"
                        : "text-slate-800 dark:text-slate-100"
                    )}
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm text-slate-500 dark:text-slate-400"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {plan.cadence}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-2">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      data-aos="fade-up"
                      data-aos-delay={270 + i * 60 + 100 * (idx % 3)} // cascade features within each card
                    >
                      <FiCheck
                        className="mt-0.5 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <span
                        className="text-sm text-slate-700 dark:text-slate-300"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8" data-aos="zoom-in" data-aos-delay={270 + plan.features.length * 60 + 100 * (idx % 3)}>
                  <a
                    href={plan.cta?.href || "/signup"}
                    className={clsx(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus-visible:ring-2 transition-all duration-500",
                      plan.featured
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white focus-visible:ring-indigo-500"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 focus-visible:ring-slate-400"
                    )}
                    aria-label={`Select the ${plan.name} plan`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {plan.cta?.label || "Get Started"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Small note about billing or FAQs link (optional) */}
        <p
          className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
          data-aos="fade-up"
          data-aos-offset="120"
        >
          Prices shown in USD. You can change or cancel your plan anytime.
        </p>
      </div>
    </section>
  );
}
