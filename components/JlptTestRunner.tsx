"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { JLPTTest, JLPTTestQuestion } from "@/lib/content";

type AnswerMap = Record<string, number>;

function useJapaneseTTS() {
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.9;
    utter.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const jpVoice = voices.find(
      (v) => v.lang === "ja-JP" || v.lang.startsWith("ja"),
    );
    if (jpVoice) utter.voice = jpVoice;

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking };
}

export function JlptTestRunner({ test }: { test: JLPTTest }) {
  const questions = test.questions;

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const { speak, stop, speaking } = useJapaneseTTS();

  const current: JLPTTestQuestion | null = finished
    ? null
    : questions[index] ?? null;

  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    const correct = questions.reduce((acc, q) => {
      const a = answers[q.id];
      return acc + (a === q.correctIndex ? 1 : 0);
    }, 0);
    return { correct, total: questions.length };
  }, [answers, questions]);

  const percent =
    score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100);

  const setAnswer = (qId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const goNext = () => {
    stop();
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  };

  const goPrev = () => {
    stop();
    setIndex((i) => Math.max(0, i - 1));
  };

  const restart = () => {
    stop();
    setAnswers({});
    setIndex(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            Результат
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {score.correct}/{score.total} ({percent}%)
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={restart}
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              Пройти ещё раз
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="text-sm font-semibold">Разбор</div>
          <ol className="mt-4 space-y-3">
            {questions.map((q, i) => {
              const a = answers[q.id];
              const ok = a === q.correctIndex;
              return (
                <li key={q.id} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-medium">
                      {i + 1}. {q.section}
                    </div>
                    <div
                      className={[
                        "rounded-full px-2 py-0.5 text-xs",
                        ok
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100"
                          : "bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-100",
                      ].join(" ")}
                    >
                      {ok ? "Верно" : "Неверно"}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{q.promptRu}</div>
                  {q.audioText && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                      <button
                        type="button"
                        onClick={() => speak(q.audioText!)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Прослушать
                      </button>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        「{q.audioText}」
                      </span>
                    </div>
                  )}
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                    Ваш ответ:{" "}
                    <span className="font-medium">
                      {a == null ? "—" : q.optionsRu[a]}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
                    Правильный:{" "}
                    <span className="font-medium">
                      {q.optionsRu[q.correctIndex]}
                    </span>
                  </div>
                  {q.explanationRu ? (
                    <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                      {q.explanationRu}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
        В тесте пока нет вопросов.
      </div>
    );
  }

  const selected = answers[current.id] ?? null;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            Вопрос {index + 1} из {questions.length} • отвечено {answeredCount}
          </div>
          <div className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {current.section}
          </div>
        </div>

        {current.audioText && (
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => speak(current.audioText!)}
              disabled={speaking}
              className={[
                "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition",
                speaking
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-950/60",
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                {speaking ? (
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                ) : (
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                )}
              </svg>
              {speaking ? "Воспроизводится…" : "Прослушать аудио"}
            </button>
            {speaking && (
              <button
                type="button"
                onClick={stop}
                className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="mt-3 text-base font-semibold">{current.promptRu}</div>

        <div className="mt-4 space-y-2">
          {current.optionsRu.map((opt, idx) => {
            const active = selected === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setAnswer(current.id, idx)}
                className={[
                  "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                  active
                    ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                    : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
                ].join(" ")}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 disabled:opacity-50 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={selected == null}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            {index + 1 >= questions.length ? "Завершить" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
}

