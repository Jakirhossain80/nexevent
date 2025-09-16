"use client";

import React from "react";


export function ButtonSpinner({
  size = 16,
  thickness = 2,
  variant = "white", // for primary indigo buttons, white spinner reads best
  className = "",
  "aria-label": ariaLabel = "Loading…",
}) {
  const variantClass = VARIANT_MAP[variant] || VARIANT_MAP.white;
  return (
    <span
      className={["inline-flex items-center", className].join(" ")}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <span
        className={[
          "animate-spin rounded-full align-[-0.125em]",
          "border-white/40",
          variantClass,
        ].join(" ")}
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </span>
  );
}