export default function ServiceCard({ Icon, title, desc }) {
  return (
    <article
      className="
        h-full rounded-2xl border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        p-5 sm:p-6
        shadow-sm transition-all duration-500
        hover:-translate-y-0.5 hover:shadow-md
        focus-within:ring-2 focus-within:ring-indigo-600 dark:focus-within:ring-indigo-400
      "
    >
      <div className="flex items-start gap-4">
        <span
          className="
            inline-flex h-12 w-12 items-center justify-center
            rounded-xl bg-indigo-50 text-indigo-700
            dark:bg-slate-700 dark:text-indigo-200
            ring-1 ring-inset ring-indigo-100 dark:ring-slate-600
            transition-all duration-500
            shrink-0
          "
          aria-hidden="true"
        >
          <Icon size={22} />
        </span>

        <div className="flex-1 min-w-0">
          <h3
            className="text-base sm:text-lg font-semibold leading-snug"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {title}
          </h3>
          <p
            className="mt-1 text-sm sm:text-base text-slate-700 dark:text-slate-200"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}
