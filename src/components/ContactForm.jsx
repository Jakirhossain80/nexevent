"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

   
    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Thanks! We’ve received your message and will reply soon.",
      });
      e.currentTarget.reset();
    }, 900);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all duration-500"
      aria-label="Contact form"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 block w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500"
            placeholder="Your full name"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 block w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500"
            placeholder="you@example.com"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="mt-2 block w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500"
            placeholder="How can we help?"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="mt-2 block w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500"
            placeholder="Tell us about your event or question…"
            aria-required="true"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-5 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-500"
            aria-label="Submit contact form"
          >
            {status.type === "loading" ? "Sending…" : "Send Message"}
          </button>

          {status.message ? (
            <p
              className={`text-sm ${
                status.type === "success"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : status.type === "error"
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
              role={status.type === "error" ? "alert" : "status"}
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
