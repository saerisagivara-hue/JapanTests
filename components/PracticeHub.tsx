"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JLPTLevel, LessonQuestion } from "@/lib/content";
import { getAllPracticeCategories, getPracticeExercises, type PracticeCategory } from "@/lib/practice-exercises";
import { QuestionModal } from "@/components/QuestionModal";
import { SpeechPractice } from "@/components/SpeechPractice";
import { GENKI_LESSON_TITLES, getGenkiAudioByLesson } from "@/lib/genki-exercises";

type Session = {
  questions: LessonQuestion[];
  idx: number;
  results: Record<string, { correct: boolean }>;
  titleRu: string;
  category: PracticeCategory;
  variant: number;
};

function hashToUint32(input: string): number {
  // FNV-1a
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  const a = [...arr];
  let s = hashToUint32(seed) || 1;
  const rand = () => {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getVariantKey(level: JLPTLevel, category: PracticeCategory) {
  return `practice:variant:${level}:${category}`;
}

function readVariant(level: JLPTLevel, category: PracticeCategory): number {
  try {
    const raw = localStorage.getItem(getVariantKey(level, category));
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

function writeVariant(level: JLPTLevel, category: PracticeCategory, next: number) {
  try {
    localStorage.setItem(getVariantKey(level, category), String(Math.max(0, Math.floor(next))));
  } catch {
    // ignore
  }
}

const SESSION_SIZE: Record<PracticeCategory, number> = {
  grammar: 12,
  vocab: 12,
  kanji: 12,
  word_order: 10,
  fill_blank: 12,
  number_audio: 12,
  dialogue_audio: 8,
  genki: 10,
};

const CATEGORY_COLORS: Record<PracticeCategory, string> = {
  grammar: "border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600",
  vocab: "border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600",
  kanji: "border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600",
  word_order: "border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600",
  fill_blank: "border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600",
  number_audio: "border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600",
  dialogue_audio: "border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600",
  genki: "border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600",
};

const CATEGORY_ICONS: Record<PracticeCategory, string> = {
  grammar: "📝",
  vocab: "💬",
  kanji: "漢",
  word_order: "🔀",
  fill_blank: "✏️",
  number_audio: "🔢",
  dialogue_audio: "🎧",
  genki: "📖",
};

function BlobAudio({ src, className }: { src: string; className?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (blobUrl || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(new Blob([blob], { type: "audio/mpeg" }));
      setBlobUrl(url);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [src, blobUrl, loading]);

  useEffect(() => {
    if (blobUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [blobUrl]);

  useEffect(() => {
    const url = blobUrl;
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [blobUrl]);

  if (blobUrl) {
    return <audio ref={audioRef} controls src={blobUrl} className={className} />;
  }

  return (
    <button
      type="button"
      onClick={load}
      disabled={loading}
      className="inline-flex h-8 items-center gap-1.5 rounded-full bg-teal-600 px-3 text-xs font-medium text-white hover:bg-teal-700 disabled:opacity-60 dark:bg-teal-500 dark:hover:bg-teal-400 transition shrink-0"
    >
      {loading ? (
        <span className="animate-spin text-sm">⏳</span>
      ) : error ? (
        <>❌ Ошибка</>
      ) : (
        <>▶ Слушать</>
      )}
    </button>
  );
}

export function PracticeHub({ level }: { level: JLPTLevel }) {
  const [session, setSession] = useState<Session | null>(null);
  const [showSpeech, setShowSpeech] = useState(false);
  const [showGenki, setShowGenki] = useState(false);
  const [selectedGenkiLesson, setSelectedGenkiLesson] = useState<number | null>(null);

  const categories = getAllPracticeCategories(level);

  const startSession = (titleRu: string, category: PracticeCategory, opts?: { variant?: number }) => {
    const pool = getPracticeExercises(level, category);
    if (pool.length === 0) return;

    const currentVariant = opts?.variant ?? readVariant(level, category);
    const shuffledPool = seededShuffle(pool, `pool:${level}:${category}`);
    const size = SESSION_SIZE[category] ?? 12;
    const maxVariants = Math.max(1, Math.ceil(shuffledPool.length / size));
    const safeVariant = currentVariant % maxVariants;

    const start = safeVariant * size;
    const picked = shuffledPool.slice(start, start + size);
    const questions =
      picked.length > 0
        ? seededShuffle(picked, `set:${level}:${category}:${safeVariant}`)
        : seededShuffle(shuffledPool, `fallback:${level}:${category}`).slice(0, size);

    setSession({
      questions,
      idx: 0,
      results: {},
      titleRu,
      category,
      variant: safeVariant,
    });
  };


  const activeQ = session ? session.questions[session.idx] ?? null : null;

  const doneCount = session ? Object.keys(session.results).length : 0;
  const correctCount = session
    ? Object.values(session.results).filter((r) => r.correct).length
    : 0;

  const isPerfect = useMemo(() => {
    if (!session) return false;
    return (
      Object.keys(session.results).length === session.questions.length &&
      Object.values(session.results).every((r) => r.correct)
    );
  }, [session]);

  const finish = () => {
    if (session && session.idx >= session.questions.length && isPerfect) {
      writeVariant(level, session.category, session.variant + 1);
    }
    setSession(null);
  };

  const onDone = ({ questionId, isCorrect }: { questionId: string; isCorrect: boolean }) => {
    setSession((prev) => {
      if (!prev) return prev;
      const nextResults = { ...prev.results, [questionId]: { correct: isCorrect } };
      const nextIdx = prev.idx + 1;
      return { ...prev, results: nextResults, idx: nextIdx };
    });
  };

  const onSkip = (questionId: string) => onDone({ questionId, isCorrect: false });

  const totalExercises = categories.reduce((s, c) => s + c.count, 0);

  const externalLinks = [
    {
      href: "https://tadoku.org/japanese/en/free-books-en/",
      title: "Tadoku — бесплатные книги",
      description: "Бесплатные книги для чтения на японском по уровням. Идеально для практики чтения от начального до продвинутого уровня.",
      icon: "📚",
    },
    {
      href: "https://vacuum.name/japanese/hiragana-katakana",
      title: "Тренажёр хираганы и катаканы",
      description: "Интерактивный тренажёр для запоминания хираганы и катаканы. Практикуйте чтение и распознавание символов.",
      icon: "あ",
    },
    {
      href: "https://anisub.tv/anime/death-note/1#episode",
      title: "AniSub — аниме с японскими субтитрами",
      description: "Смотрите аниме в оригинале с японскими субтитрами. Отличный способ тренировать аудирование и чтение одновременно.",
      icon: "🎬",
    },
    {
      href: "https://9animetv.to/",
      title: "9Anime — аниме онлайн",
      description: "Ещё один сайт для просмотра аниме. Используйте японскую озвучку для погружения в язык.",
      icon: "📺",
    },
    {
      href: "https://oops-studio.com/japaneseverbconjugationpractice/quiz/perform/",
      title: "Тренажёр спряжения глаголов",
      description: "Практикуйте спряжение японских глаголов — формы て, た, ない, ます и другие. Квиз с мгновенной проверкой.",
      icon: "✏️",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="space-y-1">
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Упражнения — {level}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            Всего {totalExercises} заданий по {categories.length} категориям. Набор меняется только после идеального прохождения (все ответы верны).
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {categories.map(({ category, titleRu, count }) => {
          if (category === "genki") {
            return (
              <a
                key={category}
                href="http://pollmann.co/Genki/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900/40 ${CATEGORY_COLORS[category]}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{CATEGORY_ICONS[category]}</span>
                  <span className="text-base font-semibold">{titleRu}</span>
                </div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Упражнения по учебнику → pollmann.co/Genki
                </div>
              </a>
            );
          }
          return (
            <button
              key={category}
              type="button"
              onClick={() => startSession(titleRu, category)}
              disabled={count === 0}
              className={`rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-900/40 ${CATEGORY_COLORS[category]}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{CATEGORY_ICONS[category]}</span>
                <span className="text-base font-semibold">{titleRu}</span>
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {count} {count === 1 ? "задание" : count < 5 ? "задания" : "заданий"}
              </div>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowSpeech((v) => !v)}
          className={`rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900/40 ${
            showSpeech
              ? "border-sky-400 dark:border-sky-600"
              : "border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🎤</span>
            <span className="text-base font-semibold">Практика речи</span>
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Произнесите слово в микрофон
          </div>
        </button>
      </section>

      {showSpeech && <SpeechPractice level={level} />}

      {/* Genki Audio Section */}
      {(level === "N5" || level === "N4") && (
        <section className="rounded-3xl border-2 border-teal-200 bg-white p-6 shadow-sm dark:border-teal-800 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎧</span>
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Genki — аудио к учебнику</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Аудио к учебнику Genki 1 (2nd Edition). Выберите урок, чтобы прослушать диалоги, лексику и практику.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGenki((v) => !v)}
              className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition ${
                showGenki
                  ? "bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
                  : "border border-teal-300 text-teal-900 hover:bg-teal-50 dark:border-teal-700 dark:text-teal-100 dark:hover:bg-teal-950"
              }`}
            >
              {showGenki ? "Свернуть" : "Открыть уроки"}
            </button>
          </div>

          {showGenki && (
            <div className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {Object.entries(GENKI_LESSON_TITLES).map(([num, title]) => {
                  const lessonNum = Number(num);
                  const audioTracks = getGenkiAudioByLesson(lessonNum);
                  const isActive = selectedGenkiLesson === lessonNum;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          setSelectedGenkiLesson(null);
                        } else {
                          setSelectedGenkiLesson(lessonNum);
                        }
                      }}
                      className={`rounded-2xl border p-3 text-left text-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                        isActive
                          ? "border-teal-400 bg-teal-50 shadow-md dark:border-teal-600 dark:bg-teal-950/40"
                          : "border-zinc-200 bg-white hover:border-teal-300 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-teal-600"
                      }`}
                    >
                      <div className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</div>
                      <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {audioTracks.length} аудио
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedGenkiLesson !== null && (
                <div className="mt-4">
                  {(() => {
                    const tracks = getGenkiAudioByLesson(selectedGenkiLesson);
                    const lessonTitle = GENKI_LESSON_TITLES[selectedGenkiLesson] ?? `Урок ${selectedGenkiLesson}`;
                    if (tracks.length === 0) return null;
                    return (
                      <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 dark:border-teal-800 dark:bg-teal-950/30">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="text-sm font-semibold text-teal-900 dark:text-teal-100">
                            🎧 {lessonTitle}
                          </div>
                          <a
                            href={`http://pollmann.co/Genki/#lesson-${selectedGenkiLesson}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition"
                          >
                            Упражнения к уроку →
                          </a>
                        </div>
                        <div className="space-y-2">
                          {tracks.map((track) => (
                            <div key={track.trackId} className="flex items-center gap-3 rounded-xl bg-white p-2 dark:bg-zinc-900/60">
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{track.titleRu}</div>
                              </div>
                              <BlobAudio src={track.audioUrl} className="h-8 w-48 min-w-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {session && (
        <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold">
              Тренировка: {session.titleRu}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              Прогресс: {doneCount}/{session.questions.length} · верно: {correctCount}
            </div>
          </div>

          {session.idx >= session.questions.length ? (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100">
              <div className="font-medium">Готово!</div>
              <div className="mt-1">
                Верно: {correctCount} из {session.questions.length}.{" "}
                {isPerfect
                  ? "Идеально — следующий набор откроется автоматически."
                  : "Чтобы открыть новый набор, нужно ответить верно на все вопросы."}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {isPerfect ? (
                  <button
                    type="button"
                    onClick={() => {
                      const next = session.variant + 1;
                      writeVariant(level, session.category, next);
                      startSession(session.titleRu, session.category, { variant: next });
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    Следующий набор
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => startSession(session.titleRu, session.category, { variant: session.variant })}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
                >
                  Повторить этот набор
                </button>
                <button
                  type="button"
                  onClick={finish}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
                >
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              Вопросы открываются поверх страницы, как в видео‑уроках.
            </div>
          )}
        </section>
      )}

      {activeQ ? (
        <QuestionModal
          question={activeQ}
          onDone={onDone}
          onSkip={onSkip}
        />
      ) : null}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Полезные ресурсы
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{link.icon}</span>
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {link.title}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                {link.description}
              </p>
              <div className="mt-2 text-xs text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 truncate">
                {link.href}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
