"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"      // adds/removes 'dark' on <html>
      defaultTheme="system"  // 'light' | 'dark' | 'system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}


