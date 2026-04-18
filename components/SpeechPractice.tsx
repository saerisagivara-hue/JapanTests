"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JLPTLevel } from "@/lib/content";
import { getSpeechWords, type SpeechWord } from "@/lib/speech-words";

type Result = "idle" | "listening" | "correct" | "incorrect" | "error";

function normalize(s: string): string {
  return s
    .replace(/[\s\u3000]+/g, "")
    .replace(/[。、！？.,!?]/g, "")
    .toLowerCase();
}

function pickRandom<T>(arr: T[], exclude?: T): T {
  if (arr.length <= 1) return arr[0];
  let pick: T;
  do {
    pick = arr[Math.floor(Math.random() * arr.length)];
  } while (pick === exclude && arr.length > 1);
  return pick;
}

export function SpeechPractice({ level }: { level: JLPTLevel }) {
  const words = getSpeechWords(level);
  const [current, setCurrent] = useState<SpeechWord>(() => pickRandom(words));
  const [result, setResult] = useState<Result>("idle");
  const [recognized, setRecognized] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    const SR = typeof window !== "undefined"
      ? (window as unknown as Record<string, unknown>).SpeechRecognition ?? (window as unknown as Record<string, unknown>).webkitSpeechRecognition
      : null;
    if (!SR) setSupported(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith("ja"));
    if (jaVoice) u.voice = jaVoice;
    window.speechSynthesis.speak(u);
  }, []);

  const nextWord = useCallback(() => {
    setCurrent((prev) => pickRandom(words, prev));
    setResult("idle");
    setRecognized("");
    setShowHint(false);
  }, [words]);

  const startListening = useCallback(() => {
    const SR = (window as unknown as Record<string, unknown>).SpeechRecognition ?? (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SR) return;

    setResult("listening");
    setRecognized("");

    const recognition = new (SR as new () => SpeechRecognition)();
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results[0];
      if (!results) return;

      let isMatch = false;
      const target = normalize(current.ja);
      const targetReading = normalize(current.reading);
      const transcripts: string[] = [];

      for (let i = 0; i < results.length; i++) {
        const t = results[i].transcript;
        transcripts.push(t);
        const n = normalize(t);
        if (n === target || n === targetReading) {
          isMatch = true;
          break;
        }
      }

      setRecognized(transcripts[0] || "");
      setTotal((p) => p + 1);
      if (isMatch) {
        setResult("correct");
        setCorrect((p) => p + 1);
        setStreak((p) => p + 1);
      } else {
        setResult("incorrect");
        setStreak(0);
      }
    };

    recognition.onerror = () => {
      setResult("error");
    };

    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    recognition.start();
  }, [current]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  useEffect(() => {
    return () => { stopListening(); window.speechSynthesis?.cancel(); };
  }, [stopListening]);

  if (!supported) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        Ваш браузер не поддерживает распознавание речи (Web Speech API). Попробуйте Chrome или Edge.
      </div>
    );
  }

  const resultColor =
    result === "correct"
      ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
      : result === "incorrect"
        ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950/40"
        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Практика речи — {level}
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Произнесите слово в микрофон. Всего: {total} · Верно: {correct}
              {streak > 1 && <span className="ml-2 text-emerald-600 dark:text-emerald-400">серия: {streak}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className={`rounded-3xl border p-8 shadow-sm transition-colors ${resultColor}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {current.ja}
            </div>
            <div className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
              {current.reading !== current.ja ? current.reading : ""}
            </div>
          </div>

          <button
            type="button"
            onClick={() => speak(current.ja)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            <span className="text-lg">🔊</span> Послушать произношение
          </button>

          {result === "listening" ? (
            <button
              type="button"
              onClick={stopListening}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-3xl text-white shadow-lg transition hover:bg-red-600"
            >
              <span className="h-6 w-6 animate-pulse rounded-sm bg-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={startListening}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-3xl text-white shadow-lg transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              🎤
            </button>
          )}

          {result === "listening" && (
            <div className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
              Слушаю...
            </div>
          )}

          {result === "correct" && (
            <div className="rounded-xl bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
              Правильно! «{recognized}»
            </div>
          )}

          {result === "incorrect" && (
            <div className="space-y-1 text-center">
              <div className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-900 dark:bg-red-900/40 dark:text-red-100">
                Не совпало. Вы сказали: «{recognized || "—"}»
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Ожидалось: {current.ja} ({current.reading})
              </div>
            </div>
          )}

          {result === "error" && (
            <div className="rounded-xl bg-amber-100 px-4 py-2 text-sm text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
              Ошибка распознавания. Проверьте доступ к микрофону.
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              {showHint ? "Скрыть перевод" : "Показать перевод"}
            </button>
            <button
              type="button"
              onClick={nextWord}
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              Следующее слово →
            </button>
          </div>

          {showHint && (
            <div className="rounded-xl bg-zinc-100 px-4 py-2 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {current.meaningRu}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
