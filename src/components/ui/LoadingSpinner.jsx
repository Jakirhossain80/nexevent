// src/components/ui/LoadingSpinner.jsx
"use client";

import React from "react";

const VARIANT_MAP = {
  indigo: "border-t-indigo-600",
  indigo700: "border-t-indigo-700",
  emerald: "border-t-emerald-500",
  slate: "border-t-slate-600",
  white: "border-t-white",
};

export default function LoadingSpinner({
  size = 24,            // px
  thickness = 3,        // px (spinner border width)
  label = "Loading…",
  showLabel = false,    // set true to show the label under the spinner
  variant = "indigo",   // 'indigo' | 'indigo700' | 'emerald' | 'slate' | 'white'
  overlay = false,      // dim the background and center spinner relative to nearest positioned parent
  fullscreen = false,   // cover entire viewport
  className = "",
  labelClassName = "",
  "aria-label": ariaLabel,
}) {
  const variantClass = VARIANT_MAP[variant] || VARIANT_MAP.indigo;

  const spinner = (
    <div
      className={[
        "inline-flex flex-col items-center justify-center gap-2",
        "text-slate-700 dark:text-slate-200",
        className,
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || label}
    >
      <div
        className={[
          "animate-spin rounded-full",
          "border-slate-300 dark:border-slate-700",
          variantClass,
        ].join(" ")}
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
          // Make only the top segment colored (others use neutral border via classes above)
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
      {showLabel ? (
        <span
          className={[
            "text-xs sm:text-sm",
            "text-slate-600 dark:text-slate-300",
            "transition-colors duration-500",
            labelClassName,
          ].join(" ")}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {label}
        </span>
      ) : (
        // keep a screen-reader label if not visually shown
        <span className="sr-only">{label}</span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div
        className="
          fixed inset-0 z-[60]
          flex items-center justify-center
          bg-white/70 dark:bg-slate-900/70
          backdrop-blur-sm
          transition-all duration-500
        "
      >
        {spinner}
      </div>
    );
  }

  if (overlay) {
    return (
      <div
        className="
          absolute inset-0 z-[50]
          flex items-center justify-center
          bg-white/60 dark:bg-slate-900/60
          backdrop-blur-[2px]
          transition-all duration-500
        "
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
