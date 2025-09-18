"use client";

import { useId, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm({ initialCallbackUrl = "/dashboard" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  const emailId = useId();
  const passId = useId();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "idle", text: "" });

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").toLowerCase().trim();
    const password = String(form.get("password") || "");
    const callbackUrl = initialCallbackUrl || "/dashboard";

    try {
      // ✅ Let NextAuth handle the redirect so the session cookie is applied before navigation
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: true, // ← important for reliable redirect after setting cookies
      });

      // With redirect:true, NextAuth navigates away. The code below is a fallback.
      if (res?.error) {
        setLoading(false);
        setMsg({
          type: "error",
          text: res.error === "CredentialsSignin" ? "Invalid email or password." : res.error,
        });
        return;
      }

      setLoading(false);
      setMsg({ type: "success", text: "Logged in! Redirecting…" });
      router.replace(callbackUrl);
    } catch (err) {
      setLoading(false);
      setMsg({ type: "error", text: err?.message || "Something went wrong." });
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all duration-500">
      {/* If you want to surface query errors like ?error=CredentialsSignin, keep this lightweight hint */}
      {typeof window !== "undefined" &&
        window?.location?.search.includes("error=CredentialsSignin") &&
        !msg.text && (
          <p className="mb-3 text-sm text-rose-600 dark:text-rose-400" role="alert">
            Invalid email or password.
          </p>
        )}

      <form onSubmit={onSubmit} className="space-y-4" aria-label="Login form">
        <div>
          <label htmlFor={emailId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor={passId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Password
          </label>
          <input
            id={passId}
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-5 py-3 text-sm font-medium transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Log in"
        >
          {loading ? "Signing in…" : "Log in"}
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={() => signIn("google", { callbackUrl: initialCallbackUrl || "/dashboard" })}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 px-5 py-3 text-sm font-medium transition-all duration-500"
          aria-label="Continue with Google"
        >
          Continue with Google
        </button>
      </div>

      {msg.text ? (
        <p
          className={`mt-3 text-sm ${
            msg.type === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : msg.type === "error"
              ? "text-rose-600 dark:text-rose-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
          role={msg.type === "error" ? "alert" : "status"}
        >
          {msg.text}
        </p>
      ) : null}
    </div>
  );
}
