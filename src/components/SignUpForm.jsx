"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useId } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const imageId = useId(); // added image field

  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // clean, one-time animations for a form
    });
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "idle", text: "" });

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const image = String(form.get("image") || "").trim(); // optional

    try {
      // 1) Create user in DB (send image if provided)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, image: image || null }),
      });
      const data = await res.json();

      if (!res.ok) {
        // show API error (e.g., 409 "User already exists")
        setMsg({ type: "error", text: data?.error || "Signup failed" });
        setLoading(false);
        return;
      }

      // 2) Auto login with NextAuth Credentials
      const r = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (r?.error) {
        setMsg({ type: "error", text: r.error });
        return;
      }

      setMsg({ type: "success", text: "Account created! Redirecting…" });
      router.push("/dashboard");
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all duration-500"
      aria-label="Sign up form"
      data-aos="fade-up"
    >
      <div data-aos="fade-up" data-aos-delay="80">
        <label htmlFor={nameId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Full name
        </label>
        <input
          id={nameId}
          name="name"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="140">
        <label htmlFor={emailId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* New: optional Image URL */}
      <div data-aos="fade-up" data-aos-delay="200">
        <label htmlFor={imageId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Image URL (optional)
        </label>
        <input
          id={imageId}
          type="url"
          name="image"
          placeholder="https://example.com/avatar.jpg"
          autoComplete="photo"
          className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="260">
        <label htmlFor={passId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
        </label>
        <input
          id={passId}
          type="password"
          name="password"
          required
          autoComplete="new-password"
          className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-5 py-3 text-sm font-medium transition-all duration-500"
        data-aos="zoom-in"
        data-aos-delay="320"
      >
        {loading ? "Creating account…" : "Sign up"}
      </button>

      {msg.text ? (
        <p
          className={`text-sm ${
            msg.type === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : msg.type === "error"
              ? "text-rose-600 dark:text-rose-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
          role={msg.type === "error" ? "alert" : "status"}
          data-aos={msg.type === "error" ? "fade-right" : "fade-left"}
          data-aos-delay="360"
        >
          {msg.text}
        </p>
      ) : null}
    </form>
  );
}
