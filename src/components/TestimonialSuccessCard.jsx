import Image from "next/image";

export default function TestimonialSuccessCard({ t, StarIcon }) {
  const { name, role, avatar, quote, stars = 5 } = t;

  return (
    <blockquote
      className="h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition-all duration-500"
      aria-label={`Testimonial from ${name}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-emerald-500/30">
          <Image src={avatar} alt={`${name} avatar`} fill className="object-cover" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{role}</div>
        </div>
      </div>

      <p className="mt-3 text-slate-700 dark:text-slate-200">“{quote}”</p>

      <div className="mt-3 flex items-center gap-1" aria-label={`${stars} star rating`}>
        {Array.from({ length: stars }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4 text-emerald-500" aria-hidden="true" />
        ))}
      </div>
    </blockquote>
  );
}
