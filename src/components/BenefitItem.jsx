import { FaCheckCircle } from "react-icons/fa";

export default function BenefitItem({ text }) {
  return (
    <div
      className="
        rounded-2xl border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        p-4 sm:p-5
        transition-all duration-500 hover:shadow-md hover:-translate-y-0.5
        flex items-start gap-3
      "
    >
      <span
        className="
          mt-0.5 inline-flex h-6 w-6 items-center justify-center
          rounded-full bg-emerald-500/10 text-emerald-600
          dark:bg-emerald-400/10 dark:text-emerald-400
          transition-all duration-500 shrink-0
        "
        aria-hidden="true"
        title="Benefit"
      >
        <FaCheckCircle className="h-4 w-4" />
      </span>
      <p
        className="text-sm sm:text-base text-slate-700 dark:text-slate-200"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {text}
      </p>
    </div>
  );
}
