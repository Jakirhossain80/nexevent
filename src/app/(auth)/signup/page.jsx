import { Poppins, Inter } from "next/font/google";
import SignUpForm from "@/components/SignUpForm";

const poppins = Poppins({ subsets: ["latin"], weight: ["600","700"], variable: "--font-poppins", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Sign up — NexEvent",
  description: "Create your NexEvent account",
};

export default function SignUpPage() {
  return (
    <main className={`${poppins.variable} ${inter.variable} bg-gray-50 dark:bg-slate-900 transition-all duration-500 min-h-[70vh] w-full`}>
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400" style={{ fontFamily: "var(--font-poppins)" }}>
          Create your account
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Join NexEvent to create and manage events.
        </p>

        <div className="mt-6">
          <SignUpForm />
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-700 dark:text-indigo-300 hover:underline">Log in</a>
        </p>
      </div>
    </main>
  );
}


