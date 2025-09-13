"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function CredentialsLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    // NextAuth handles redirect and session
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
      redirect: true,
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input className="input" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
}
