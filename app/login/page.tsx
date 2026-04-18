"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Проверьте почту — отправлено письмо для подтверждения.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        window.location.href = "/";
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "login" ? "Вход" : "Регистрация"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {mode === "login"
              ? "Войдите для доступа к урокам"
              : "Создайте аккаунт"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-zinc-400"
              placeholder="Минимум 6 символов"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-400">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            {loading
              ? "..."
              : mode === "login"
                ? "Войти"
                : "Зарегистрироваться"}
          </button>
        </form>

        <div className="text-center text-sm text-zinc-500">
          {mode === "login" ? (
            <>
              Нет аккаунта?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-zinc-900 underline dark:text-zinc-200"
              >
                Регистрация
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-zinc-900 underline dark:text-zinc-200"
              >
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
