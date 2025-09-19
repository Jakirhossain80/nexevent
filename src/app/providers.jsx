"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";


export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"           // ✅ adds/removes "dark" class on <html>
        defaultTheme="system"       // can be "light", "dark", or "system"
        enableSystem                // follow OS preference if "system"
        disableTransitionOnChange   // avoids flicker/jank when switching
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
