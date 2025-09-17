// src/app/(protected)/dashboard/@content/settings/page.jsx
"use client";

import Image from "next/image";

export default function SettingsPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      {/* Illustration */}
      <Image
        src="/under-construction.png" // 👉 put your image in public/under-construction.png
        alt="Under construction illustration"
        width={300}
        height={200}
        className="mb-6 select-none"
        priority
      />

      <h1
        className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Settings
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm max-w-md">
        The page is under construction. Stay tuned for upcoming features to
        manage your account, events, and preferences here.
      </p>
    </div>
  );
}
