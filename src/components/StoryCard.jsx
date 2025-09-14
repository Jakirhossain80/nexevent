import Image from "next/image";

export default function StoryCard({ story }) {
  const { image, title, blurb, client, alt } = story;

  return (
    <article
      className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-500 focus-within:ring-2 focus-within:ring-indigo-500"
      tabIndex={0}
      aria-label={`${title} success story`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-5">
        <h3
          className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-1"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {blurb}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {client}
          </span>
          <span className="text-xs rounded-full bg-indigo-50 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300 px-3 py-1">
            Success
          </span>
        </div>
      </div>
    </article>
  );
}
