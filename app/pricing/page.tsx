"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  async function handleCheckout(provider: "stripe" | "liqpay") {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setLoading(provider);

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });

      const data = await res.json();

      if (provider === "stripe" && data.url) {
        window.location.href = data.url;
      } else if (provider === "liqpay" && data.data) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://www.liqpay.ua/api/3/checkout";
        form.acceptCharset = "utf-8";

        const dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.value = data.data;
        form.appendChild(dataInput);

        const sigInput = document.createElement("input");
        sigInput.type = "hidden";
        sigInput.name = "signature";
        sigInput.value = data.signature;
        form.appendChild(sigInput);

        document.body.appendChild(form);
        form.submit();
      }
    } catch {
      alert("Ошибка при создании платежа. Попробуйте позже.");
    } finally {
      setLoading(null);
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md space-y-4 rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950/30">
          <div className="text-4xl">&#10003;</div>
          <h1 className="text-2xl font-semibold">Оплата прошла успешно!</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Теперь у вас есть полный доступ ко всем урокам.
          </p>
          <a
            href="/"
            className="inline-block rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950"
          >
            Перейти к урокам
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        {canceled && (
          <div className="rounded-lg bg-yellow-50 p-3 text-center text-sm text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400">
            Оплата отменена. Вы можете попробовать снова.
          </div>
        )}

        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Подписка на 日本語トレーナー
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Получите полный доступ ко всем уровням, урокам и упражнениям
            </p>
          </div>

          <div className="my-6 text-center">
            <div className="text-4xl font-bold">$1</div>
            <div className="text-sm text-zinc-500">в месяц</div>
          </div>

          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              Все уровни JLPT N5 — N1
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              125+ видео-уроков с аниме
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              Задания по ходу видео + грамматика
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              JLPT-тесты и практика
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              Genki аудио и упражнения
            </li>
          </ul>

          <div className="space-y-3">
            <button
              onClick={() => handleCheckout("stripe")}
              disabled={loading !== null}
              className="w-full rounded-lg bg-[#635bff] py-3 text-sm font-medium text-white hover:bg-[#5348d8] disabled:opacity-50 transition"
            >
              {loading === "stripe"
                ? "Перенаправление..."
                : "Оплатить картой (Visa / Mastercard)"}
            </button>

            <button
              onClick={() => handleCheckout("liqpay")}
              disabled={loading !== null}
              className="w-full rounded-lg bg-[#7ab72b] py-3 text-sm font-medium text-white hover:bg-[#6da024] disabled:opacity-50 transition"
            >
              {loading === "liqpay"
                ? "Перенаправление..."
                : "Оплатить через LiqPay (PrivatBank)"}
            </button>
          </div>

          {!user && (
            <p className="mt-4 text-center text-xs text-zinc-500">
              Для оплаты нужно{" "}
              <a href="/login" className="underline">
                войти или зарегистрироваться
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
