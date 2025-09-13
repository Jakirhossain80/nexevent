import Navbar from "@/components/Navbar";
import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import Providers from "./providers";

// Load Google Fonts
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
    url: "https://nexevent.com", // replace with your actual domain
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
    images: ["https://nexevent.com/twitter-image.png"], // replace with actual
    creator: "@YourTwitterHandle", // optional
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-500">
        <Providers>
          <Navbar />

          <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
