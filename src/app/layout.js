// src/app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { Poppins, Inter } from "next/font/google";

// Fonts (NexEvent: Poppins for headings, Inter for body)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

// SEO Metadata
export const metadata = {
  title: "NexEvent — Modern Event Management App",
  description:
    "NexEvent is a full-stack event management platform to create, manage, and book events with ease. Built with Next.js, MongoDB, and NextAuth.",
  keywords: [
    "NexEvent",
    "event management",
    "event booking",
    "Next.js app",
    "MERN stack",
    "NextAuth",
    "MongoDB",
  ],
  openGraph: {
    title: "NexEvent — Modern Event Management App",
    description:
      "Manage and book events seamlessly with NexEvent. Secure, fast, and responsive — powered by Next.js and MongoDB.",
    url: "https://nexevent-two.vercel.app/",
    siteName: "NexEvent",
    images: [
      {
        url: "https://i.ibb.co.com/DPg9G0nf/Nex-Event-Logo-Design.png",
        width: 1200,
        height: 630,
        alt: "NexEvent Event Management App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexEvent — Modern Event Management App",
    description:
      "NexEvent is a full-stack platform to create, manage, and book events. Modern, fast, and secure.",
    images: ["https://nexevent.com/twitter-image.png"], // replace with your actual image
    creator: "@YourTwitterHandle", // optional
  },
};

export default function RootLayout({ children, modal }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable}`}
    >
      <body
        className="
          antialiased min-h-screen flex flex-col
          bg-gray-50 text-slate-800
          dark:bg-slate-900 dark:text-slate-100
          transition-colors duration-500
        "
      >
        {/* Providers wraps Theme + Session (one ThemeProvider only, defined in app/providers.jsx) */}
        <Providers>
          <Navbar />

          <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Parallel route slot (e.g., @modal) */}
          {modal}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}

