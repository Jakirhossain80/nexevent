"use client";

import { useId, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Image from "next/image";
import { FiMail } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ loading: false, error: "", success: "" });
  const inputId = useId();

  // Initialize AOS on the client
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
      once: true, // animate once per element
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: false, error: "", success: "" });

    // Simple client-side validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setState({ loading: false, error: "Please enter a valid email address.", success: "" });
      return;
    }

    try {
      setState((s) => ({ ...s, loading: true }));

      // TODO: Replace this mock with your API call (e.g., /api/newsletter/subscribe)
      await new Promise((res) => setTimeout(res, 700));

      setState({ loading: false, error: "", success: "You're subscribed! Please check your inbox." });
      setEmail("");
    } catch (err) {
      setState({
        loading: false,
        error: "Something went wrong. Please try again.",
        success: "",
      });
    }
  };

  return (
    <section
      id="newsletter"
      className="
        relative overflow-hidden
        bg-gray-50 text-slate-800
        dark:bg-slate-900 dark:text-slate-100
        transition-all duration-500
      "
      aria-label="Newsletter subscription"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-12 items-center gap-8
            rounded-3xl border border-gray-200 dark:border-slate-800
            bg-white/70 dark:bg-slate-800/70 backdrop-blur
            p-6 sm:p-10 shadow-sm transition-all duration-500
          "
          data-aos="fade-up"
        >
          {/* Left: Heading + Form */}
          <div className="lg:col-span-7" data-aos="fade-right" data-aos-delay="80">
            <h2
              className="
                text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight
                text-indigo-700 dark:text-indigo-300
              "
              style={{ fontFamily: "var(--font-poppins)" }} // Poppins (headings)
            >
              Stay in the loop — subscribe to our newsletter
            </h2>
            <p
              className="mt-3 text-slate-600 dark:text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }} // Inter (body)
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Get product updates, tips, and upcoming event highlights delivered to your inbox.
              No spam, unsubscribe anytime.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6"
              noValidate
              aria-labelledby="newsletter-title"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1" data-aos="fade-up" data-aos-delay="240">
                  {/* Mail icon inside input */}
                  <span
                    className="
                      pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center
                      text-slate-500 dark:text-slate-400
                    "
                    aria-hidden="true"
                  >
                    <FiMail className="h-5 w-5" />
                  </span>

                  <input
                    id={inputId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="
                      w-full rounded-lg border
                      border-gray-200 bg-white pl-10 pr-4 py-3
                      text-sm sm:text-base
                      placeholder:text-slate-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-600
                      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100
                      dark:placeholder:text-slate-500 dark:focus:ring-indigo-400
                      transition-all duration-500
                    "
                    style={{ fontFamily: "var(--font-inter)" }}
                    aria-invalid={Boolean(state.error)}
                    aria-describedby="newsletter-help"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.loading}
                  className="
                    inline-flex items-center justify-center
                    rounded-lg px-5 py-3 text-sm sm:text-base font-medium
                    text-white bg-indigo-600 hover:bg-indigo-700
                    disabled:bg-indigo-600/60 disabled:cursor-not-allowed
                    active:scale-[0.98]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                    dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-800
                    shadow-sm hover:shadow-md
                    transition-all duration-500
                  "
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-label={state.loading ? "Subscribing…" : "Subscribe to newsletter"}
                  data-aos="zoom-in"
                  data-aos-delay="260"
                >
                  {state.loading ? "Subscribing…" : "Subscribe"}
                </button>
              </div>

              {/* Helper / status messages (a11y live region) */}
              <div
                id="newsletter-help"
                className="mt-3 min-h-[1.25rem]"
                aria-live="polite"
                style={{ fontFamily: "var(--font-inter)" }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {state.error && (
                  <p className="text-sm text-rose-600 dark:text-rose-400 transition-all duration-500">
                    {state.error}
                  </p>
                )}
                {state.success && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 transition-all duration-500">
                    {state.success}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right: Optional decorative illustration (swap assets) */}
          <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="120">
            {/* Light image */}
            <div className="block dark:hidden" data-aos="zoom-in" data-aos-delay="180">
              <Image
                src="/light4.png"
                alt="Newsletter illustration (light)"
                width={900}
                height={700}
                className="w-full h-auto rounded-2xl ring-1 ring-black/5 shadow-sm"
                priority={false}
              />
            </div>
            {/* Dark image */}
            <div className="hidden dark:block" data-aos="zoom-in" data-aos-delay="180">
              <Image
                src="/dark4.png"
                alt="Newsletter illustration (dark)"
                width={900}
                height={700}
                className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-sm"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 bottom-0 h-20
          bg-gradient-to-t from-indigo-100/50 to-transparent
          dark:from-indigo-900/20
          transition-all duration-500
        "
      />
    </section>
  );
}
