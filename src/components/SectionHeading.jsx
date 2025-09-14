export default function SectionHeading({ eyebrow, title, subtitle, Icon }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-emerald-500" aria-hidden="true" /> : null}
        <span className="uppercase tracking-wide text-xs font-semibold text-emerald-500">
          {eyebrow}
        </span>
      </div>
      <h2
        className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
