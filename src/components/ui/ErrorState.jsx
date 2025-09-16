"use client";


import { useMemo, useState } from "react";
import { FiAlertTriangle, FiRefreshCw, FiChevronDown, FiClipboard, FiCheck } from "react-icons/fi";

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  error,                // optional: Error | unknown
  errorCode,           // optional: string
  onRetry,             // optional: () => void
  className = "",
  compact = false,     // if true: tighter spacing (e.g., inside cards/modals)
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const details = useMemo(() => {
    if (!error) return "";
    // Normalize error into a readable block
    if (error?.stack) return String(error.stack);
    if (error?.message) return String(error.message);
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return String(error);
    }
  }, [error]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        [
          `Title: ${title}`,
          `Message: ${message}`,
          errorCode ? `Code: ${errorCode}` : null,
          details ? `\nDetails:\n${details}` : null,
        ]
          .filter(Boolean)
          .join("\n")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  }

  return (
    <section
      role="alert"
      aria-live="polite"
      className={[
        "rounded-2xl border border-slate-200 dark:border-slate-800",
        "bg-white dark:bg-slate-900 shadow-sm",
        "transition-all duration-500",
        compact ? "p-4" : "p-6",
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className="
            mt-0.5 inline-flex items-center justify-center
            rounded-full p-2
            bg-rose-50 dark:bg-rose-900/20
            text-rose-700 dark:text-rose-300
          "
          aria-hidden="true"
        >
          <FiAlertTriangle size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <h2
            className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300" style={{ fontFamily: "var(--font-inter)" }}>
            {message}
          </p>

          {/* Optional meta row: error code, actions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {errorCode ? (
              <span
                className="
                  inline-flex items-center rounded-full
                  border border-slate-200 dark:border-slate-700
                  px-2.5 py-1 text-xs font-medium
                  text-slate-700 dark:text-slate-200
                  bg-slate-50 dark:bg-slate-800
                "
                title="Error code"
              >
                {errorCode}
              </span>
            ) : null}

            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="
                  inline-flex items-center gap-2
                  rounded-xl px-3 py-1.5 text-sm font-medium
                  text-white bg-indigo-600 hover:bg-indigo-700
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                "
                aria-label="Retry"
              >
                <FiRefreshCw className="shrink-0" />
                Retry
              </button>
            ) : null}

            {details ? (
              <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className="
                  inline-flex items-center gap-2
                  rounded-xl px-3 py-1.5 text-sm font-medium
                  text-slate-700 dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                "
                aria-expanded={open}
                aria-controls="error-details"
              >
                <FiChevronDown
                  className={[
                    "transition-transform duration-300",
                    open ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                />
                {open ? "Hide details" : "Show details"}
              </button>
            ) : null}

            {details ? (
              <button
                type="button"
                onClick={handleCopy}
                className="
                  inline-flex items-center gap-2
                  rounded-xl px-3 py-1.5 text-sm font-medium
                  text-slate-700 dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                "
                aria-label="Copy error details"
              >
                {copied ? <FiCheck className="text-emerald-500" /> : <FiClipboard />}
                {copied ? "Copied" : "Copy"}
              </button>
            ) : null}
          </div>

          {/* Collapsible technical details */}
          {details ? (
            <div
              id="error-details"
              className={[
                "overflow-hidden transition-[grid-template-rows,opacity] duration-300",
                open ? "opacity-100 grid-rows-[1fr]" : "opacity-0 grid-rows-[0fr]",
                "grid mt-3",
              ].join(" ")}
            >
              <pre
                className="
                  min-h-0 overflow-auto
                  rounded-xl border border-slate-200 dark:border-slate-800
                  bg-slate-50 dark:bg-slate-950/40
                  p-3 text-[12px] leading-relaxed
                  text-slate-800 dark:text-slate-200
                "
                style={{ fontFamily: "var(--font-inter)" }}
              >
{details}
              </pre>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
