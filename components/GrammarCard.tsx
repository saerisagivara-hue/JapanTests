"use client";

import { useState } from "react";
import type { GrammarNote } from "@/lib/content";

export function GrammarCard({ note }: { note: GrammarNote }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-white shadow-sm dark:border-indigo-900/50 dark:from-indigo-950/30 dark:to-zinc-900/40">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
              {note.titleJa}
            </span>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              {note.level}
            </span>
          </div>
          <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            {note.titleRu}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-5 w-5 shrink-0 text-indigo-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-indigo-100 px-4 pb-5 pt-4 dark:border-indigo-900/40">
          <div className="rounded-xl bg-indigo-100/60 px-3 py-2 dark:bg-indigo-950/40">
            <div className="text-xs font-medium uppercase tracking-wide text-indigo-500 dark:text-indigo-400">
              Структура
            </div>
            <div className="mt-1 font-mono text-sm font-semibold text-indigo-800 dark:text-indigo-200">
              {note.structure}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {note.explanationRu}
          </p>

          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Примеры
            </div>
            {note.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-950/40"
              >
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {ex.ja}
                </div>
                {ex.furigana && (
                  <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {ex.furigana}
                  </div>
                )}
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {ex.ru}
                </div>
              </div>
            ))}
          </div>

          {note.tip && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 dark:border-amber-900/50 dark:bg-amber-950/30">
              <div className="text-xs font-medium text-amber-700 dark:text-amber-400">
                💡 Подсказка
              </div>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                {note.tip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
