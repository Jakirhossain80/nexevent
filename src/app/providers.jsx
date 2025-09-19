"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";


export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ThemeProvider
        attribute="class"           // adds/removes "dark" on <html>
        defaultTheme="system"       // "light" | "dark" | "system"
        enableSystem                // follow OS preference when "system"
        disableTransitionOnChange   // avoids color-jank during toggle
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
