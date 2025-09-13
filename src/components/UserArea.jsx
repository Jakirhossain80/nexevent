// components/UserArea.jsx
"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";

export default function UserArea() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />;

  if (!session?.user) {
    return (
      <div className="flex gap-2">
        <button onClick={()=>signIn()} className="px-3 py-1.5 rounded bg-gray-100">Login</button>
        <a href="/signup" className="px-3 py-1.5 rounded bg-indigo-600 text-white">Signup</a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Image
        src={session.user.image || "/avatar-placeholder.png"}
        alt={session.user.name || "User"}
        width={32} height={32} className="rounded-full"
      />
      <span className="text-sm">{session.user.name || session.user.email}</span>
      <button onClick={()=>signOut({ callbackUrl: "/" })} className="px-3 py-1.5 rounded bg-emerald-500 text-white">
        Logout
      </button>
    </div>
  );
}


