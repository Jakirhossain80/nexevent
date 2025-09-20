import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "NexEvent — Modern Event Management App",
  description: "Create, manage, and book events with ease.",
};

export default function RootLayout({ children, modal }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning              // ✅ prevents initial mismatch
      className={`${poppins.variable} ${inter.variable}`} // ✅ next-themes will add/remove "dark" here
    >
      <body
        className="
          antialiased min-h-screen flex flex-col
          bg-gray-50 text-slate-800
          dark:bg-slate-900 dark:text-slate-100
          transition-colors duration-500
        "
      >
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
