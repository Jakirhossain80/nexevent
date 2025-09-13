"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function CredentialsSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      // Auto sign-in after signup
      await signIn("credentials", {
        email, password, callbackUrl: "/dashboard", redirect: true,
      });
    } else {
      alert(data.error || "Failed to sign up");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input className="input" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input className="input" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Create password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="btn btn-primary">Create account</button>
    </form>
  );
}
