// src/app/login/page.jsx
import { Suspense } from "react";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic"; // ensure fresh rendering for auth flows

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Log in — NexEvent",
  description: "Access your NexEvent account",
};

export default function LoginPage({ searchParams }) {
  // Pass callbackUrl down to the client form to avoid relying solely on useSearchParams
  const callbackUrl = searchParams?.callbackUrl || "/dashboard";

  return (
    <main
      className={`${poppins.variable} ${inter.variable} bg-gray-50 dark:bg-slate-900 transition-all duration-500 min-h-[70vh] w-full`}
    >
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-28">
        <h1
          className="text-3xl font-bold text-indigo-700 dark:text-indigo-400"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Welcome back
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Log in to manage events, attendees, and more.
        </p>

        <div className="mt-6">
          {/* Wrap in Suspense so the client form can safely read URL/search state without hydration hiccups */}
          <Suspense fallback={null}>
            <LoginForm initialCallbackUrl={callbackUrl} />
          </Suspense>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          New to NexEvent?{" "}
          <Link
            href="/signup"
            className="text-indigo-700 dark:text-indigo-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
