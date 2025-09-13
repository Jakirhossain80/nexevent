"use client";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="px-4 py-2 rounded bg-indigo-600 text-white"
    >
      Continue with Google
    </button>
  );
}
