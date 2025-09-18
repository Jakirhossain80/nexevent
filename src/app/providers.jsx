"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";


export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"              // adds "class" to <html> for theme
        defaultTheme="system"          // default: follow OS setting
        enableSystem                   // allow system preference
        disableTransitionOnChange      // avoid flicker when switching
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

