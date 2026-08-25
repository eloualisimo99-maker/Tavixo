"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111F] px-6">
      <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#0D1826] p-8">

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00D9FF] text-xl font-black text-[#07111F]">
            T
          </div>

          <h1 className="mt-6 text-3xl font-black text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Connectez-vous à votre dashboard Tavixo.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="text-sm font-bold text-white/60">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-white/60">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
            />
          </div>

          {error && (
            <p className="text-sm font-bold text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#00D9FF] px-5 py-3 font-black text-[#07111F] transition hover:bg-[#45DEFF] disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

      </div>
    </main>
  );
}