// src/components/ui/Modal.jsx
"use client";
import { useEffect } from "react";

export default function Modal({ title = "", children, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl"
      >
        {title ? (
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100" style={{ fontFamily: "var(--font-poppins)" }}>
            {title}
          </h2>
        ) : null}
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
