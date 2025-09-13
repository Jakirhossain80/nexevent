"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Avoids mismatch: render a neutral button without icon before mount
    return (
      <button
        aria-label="Toggle theme"
        className="rounded-full p-2 border border-gray-200 dark:border-slate-700"
      />
    );
  }

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-700 px-3 py-2
                 bg-white text-slate-700 hover:bg-gray-50
                 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
      <span className="text-sm">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
