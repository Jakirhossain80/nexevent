export default function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-sm transition-all duration-500">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div
        className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {value}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
    </div>
  );
}
