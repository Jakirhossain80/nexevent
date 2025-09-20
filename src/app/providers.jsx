// app/providers.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

/**
 * - attribute="class": toggles class="dark" on <html>
 * - defaultTheme="system": start from OS theme
 * - enableSystem: allow system preference
 * - enableColorScheme: sets `color-scheme` for native UI
 * - storageKey: persist user’s choice
 * - disableTransitionOnChange: no color jank on toggle
 */
export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        enableColorScheme
        storageKey="nexevent-theme"
        disableTransitionOnChange
        themes={["light", "dark"]}      // optional but explicit
        value={{ light: "light", dark: "dark" }} // optional map
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
