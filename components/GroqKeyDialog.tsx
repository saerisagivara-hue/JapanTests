"use client";

import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  showSkip?: boolean;
  skipLabel?: string;
  onSave: (key: string) => void | Promise<void>;
  onSkip?: () => void;
  onClose: () => void;
};

export function GroqKeyDialog({
  open,
  title = "Ключ Groq для авто-субтитров",
  description = "Бесплатный ключ: https://console.groq.com/keys (регистрация без карты).",
  showSkip = false,
  skipLabel = "Пропустить",
  onSave,
  onSkip,
  onClose,
}: Props) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setValue("");
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    const k = value.trim();
    if (!k) return;
    setSaving(true);
    try {
      await onSave(k);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="groq-key-title">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
        <h2 id="groq-key-title" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          Открыть console.groq.com →
        </a>
        <input
          type="password"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="gsk_..."
          className="mt-4 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-400"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!value.trim() || saving}
            onClick={() => void handleSave()}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            {saving ? "Сохранение…" : "Сохранить и продолжить"}
          </button>
          {showSkip && onSkip && (
            <button
              type="button"
              disabled={saving}
              onClick={onSkip}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              {skipLabel}
            </button>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
