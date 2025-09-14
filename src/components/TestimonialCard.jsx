import Image from "next/image";

export default function TestimonialCard({ name, role, quote, avatar, priority = false }) {
  return (
    <article
      className="
        relative h-full
        rounded-2xl border border-gray-200 bg-white
        dark:border-slate-800 dark:bg-slate-800
        p-6 sm:p-7
        shadow-sm hover:shadow-md
        transition-all duration-500
      "
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
          <Image
            src={avatar}
            alt={`${name} avatar`}
            fill
            sizes="56px"
            className="object-cover"
            priority={priority}
          />
        </div>
        <div className="min-w-0">
          <h3
            className="text-base font-semibold truncate"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {name}
          </h3>
          <p
            className="text-sm text-slate-500 dark:text-slate-400 truncate"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {role}
          </p>
        </div>
      </div>

      <p
        className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-200"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        “{quote}”
      </p>
    </article>
  );
}
