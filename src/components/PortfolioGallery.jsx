"use client";

import { useMemo, useState } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import {
  FaGlobe,
  FaRegCalendarCheck,
  FaUsers,
  FaRegLightbulb,
} from "react-icons/fa";

// Local map from category key -> Icon component (safe on client)
const ICON_BY_KEY = {
  all: FaGlobe,
  conferences: FaRegCalendarCheck,
  weddings: FaUsers,
  concerts: FaRegLightbulb,
  corporate: FaGlobe,
};

export default function PortfolioGallery({ items = [], categories = [] }) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.category === active);
  }, [active, items]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {categories.map(({ key, label }) => {
          const selected = active === key;
          const Icon = ICON_BY_KEY[key] ?? FaGlobe;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={selected}
              className={`
                inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                ring-1 ring-inset
                focus:outline-none focus-visible:ring-2
                transition-all duration-500
                ${
                  selected
                    ? "bg-indigo-600 text-white ring-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-400"
                    : "bg-white text-slate-700 ring-gray-200 hover:bg-gray-100 focus-visible:ring-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700"
                }
              `}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <ul
        className="
          mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-4 sm:gap-6
        "
        role="list"
        aria-live="polite"
      >
        {filtered.map((item) => (
          <li key={item.id}>
            <PortfolioCard {...item} />
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p
          className="mt-6 text-sm text-slate-500 dark:text-slate-400"
          style={{ fontFamily: "var(--font-inter)" }}
          role="status"
        >
          No items found for this category.
        </p>
      )}
    </div>
  );
}
