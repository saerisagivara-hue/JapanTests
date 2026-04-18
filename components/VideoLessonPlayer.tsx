"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Lesson, LessonQuestion, SubtitleLine } from "@/lib/content";
import { QuestionModal } from "@/components/QuestionModal";
import { GroqKeyDialog } from "@/components/GroqKeyDialog";
import { getGroqKeyFromStorage, saveGroqKeyToStorage, transcribeVideoInBrowser } from "@/lib/auto-transcribe";
import { href } from "@/lib/link-helpers";

type QuestionOutcome = Record<string, { answered: true; correct: boolean }>;

export function VideoLessonPlayer({ lesson }: { lesson: Lesson }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isLocal = lesson.video.type === "local" || lesson.video.type === "remote";

  // ── Auto-transcription state ──
  const [autoSubs, setAutoSubs] = useState<SubtitleLine[]>([]);
  const [transcribing, setTranscribing] = useState(false);
  const [transcribeError, setTranscribeError] = useState<string | null>(null);
  const [showGroqKeyDialog, setShowGroqKeyDialog] = useState(false);
  const awaitingGroqKeyRef = useRef(false);
  const hasBuiltInSubs = lesson.subtitles.length > 0;
  const effectiveSubs = hasBuiltInSubs ? lesson.subtitles : autoSubs;

  useEffect(() => {
    const cached = localStorage.getItem(`jt.autoSubs.${lesson.id}`);
    if (cached) {
      try { setAutoSubs(JSON.parse(cached)); } catch { /* ignore */ }
    }
  }, [lesson.id]);

  const questions = useMemo(
    () => [...lesson.questions].sort((a, b) => a.atSec - b.atSec),
    [lesson.questions],
  );

  const storageKey = `jt.lesson.${lesson.id}.outcomes.v1`;
  const watchedStorageKey = `jt.lesson.${lesson.id}.watched.v1`;

  const [outcomes, setOutcomes] = useState<QuestionOutcome>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return {};
      return (JSON.parse(raw) as QuestionOutcome) ?? {};
    } catch {
      return {};
    }
  });

  const [watched, setWatched] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(watchedStorageKey) === "1";
    } catch {
      return false;
    }
  });

  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSubs, setShowSubs] = useState(true);
  const [playerReady, setPlayerReady] = useState(() => isLocal);
  const [localVideoFailed, setLocalVideoFailed] = useState(() => {
    if (typeof window === "undefined") return false;
    const isMkv = lesson.video.type === "remote" && lesson.video.src.endsWith(".mkv");
    if (!isMkv) return false;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
  });
  const [buffering, setBuffering] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState<string>(() => {
    if (lesson.video.type !== "remote") return lesson.video.type === "local" ? lesson.video.src : "";
    const inElectron = typeof window !== "undefined" && !!(window as unknown as { electronAPI?: { isElectron: boolean } }).electronAPI?.isElectron;
    if (inElectron) {
      const parts = lesson.video.src.split("/");
      const filename = parts[parts.length - 1];
      return "/local-video/" + filename;
    }
    return lesson.video.src;
  });
  const triedFallback = useRef(false);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(outcomes)); } catch { /* noop */ }
  }, [outcomes, storageKey]);

  const markWatched = useCallback(() => {
    setWatched(true);
    try { localStorage.setItem(watchedStorageKey, "1"); } catch { /* noop */ }
  }, [watchedStorageKey]);

  // ── YouTube setup ──
  useEffect(() => {
    if (isLocal) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(tag, first);

    const initPlayer = () => {
      if (!ytContainerRef.current) return;
      const start = lesson.video.type === "youtube" ? (lesson.video.startSec ?? 0) : 0;
      const end = lesson.video.type === "youtube" ? lesson.video.endSec : undefined;

      playerInstanceRef.current = new YT.Player(ytContainerRef.current, {
        videoId: lesson.video.type === "youtube" ? lesson.video.youtubeId : "",
        playerVars: {
          autoplay: 0, start, ...(end ? { end } : {}),
          cc_load_policy: 0, rel: 0, modestbranding: 1, hl: "ja",
        },
        events: { onReady: () => setPlayerReady(true) },
      });
    };

    (window as unknown as Record<string, unknown>).onYouTubeIframeAPIReady = initPlayer;
    if ((window as unknown as Record<string, unknown>).YT && typeof YT.Player === "function") {
      initPlayer();
    }

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isLocal, lesson.video]);

  // ── Local video time tracking ──
  const onLocalTimeUpdate = useCallback(() => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  }, []);

  // ── Mark lesson as watched near the end ──
  useEffect(() => {
    if (watched || currentTime <= 0.5) return;

    if (isLocal) {
      const d = videoRef.current?.duration;
      if (typeof d === "number" && Number.isFinite(d) && d > 2 && currentTime >= d - 1.5) {
        markWatched();
      }
      return;
    }

    if (!playerReady) return;
    const p = playerInstanceRef.current;
    const clipEnd =
      lesson.video.type === "youtube"
        ? (lesson.video.endSec ?? (p && typeof p.getDuration === "function" ? p.getDuration() : undefined))
        : undefined;
    if (typeof clipEnd === "number" && Number.isFinite(clipEnd) && clipEnd > 2 && currentTime >= clipEnd - 1.5) {
      markWatched();
    }
  }, [currentTime, isLocal, lesson.video, markWatched, playerReady, watched]);

  // ── YouTube time polling ──
  useEffect(() => {
    if (isLocal || !playerReady) return;
    timerRef.current = setInterval(() => {
      const p = playerInstanceRef.current;
      if (p && typeof p.getCurrentTime === "function") setCurrentTime(p.getCurrentTime());
    }, 300);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isLocal, playerReady]);

  // ── Pause / Play / Seek helpers ──
  const pausePlayer = useCallback(() => {
    if (isLocal) { videoRef.current?.pause(); return; }
    const p = playerInstanceRef.current;
    if (p && typeof p.pauseVideo === "function") p.pauseVideo();
  }, [isLocal]);

  const playPlayer = useCallback(() => {
    if (isLocal) { void videoRef.current?.play(); return; }
    const p = playerInstanceRef.current;
    if (p && typeof p.playVideo === "function") p.playVideo();
  }, [isLocal]);

  const seekTo = useCallback((sec: number) => {
    if (isLocal && videoRef.current) { videoRef.current.currentTime = sec; return; }
    const p = playerInstanceRef.current;
    if (p && typeof p.seekTo === "function") p.seekTo(sec, true);
  }, [isLocal]);

  // ── Trigger questions at timestamps ──
  const triggeredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (activeQuestionId) return;
    const next = questions.find((q) => {
      if (outcomes[q.id]?.answered) return false;
      if (triggeredRef.current.has(q.id)) return false;
      return currentTime >= q.atSec;
    });
    if (!next) return;
    triggeredRef.current.add(next.id);
    pausePlayer();
    setActiveQuestionId(next.id);
  }, [currentTime, activeQuestionId, questions, outcomes, pausePlayer]);

  const activeQuestion: LessonQuestion | null =
    activeQuestionId == null ? null : questions.find((q) => q.id === activeQuestionId) ?? null;

  const answeredCount = Object.keys(outcomes).length;
  const totalCount = questions.length;
  const correctCount = Object.values(outcomes).filter((o) => o.correct).length;

  const onDone = ({ questionId, isCorrect }: { questionId: string; isCorrect: boolean }) => {
    setOutcomes((prev) => ({ ...prev, [questionId]: { answered: true, correct: isCorrect } }));
    setActiveQuestionId(null);
    playPlayer();
  };

  const onSkip = (questionId: string) => {
    setOutcomes((prev) => ({ ...prev, [questionId]: { answered: true, correct: false } }));
    setActiveQuestionId(null);
    playPlayer();
  };

  const resetProgress = () => {
    setOutcomes({});
    setActiveQuestionId(null);
    triggeredRef.current.clear();
    try { localStorage.removeItem(storageKey); } catch { /* noop */ }
  };

  const activeSub: SubtitleLine | null = useMemo(() => {
    if (!showSubs || !effectiveSubs.length) return null;
    return effectiveSubs.find((s) => currentTime >= s.startSec && currentTime < s.endSec) ?? null;
  }, [currentTime, showSubs, effectiveSubs]);

  const isElectronEnv = typeof window !== "undefined" && !!window.electronAPI?.isElectron;

  const toggleFullscreen = useCallback(async () => {
    if (isElectronEnv) {
      const newState = await window.electronAPI!.window.toggleFullscreen();
      setIsFullscreen(newState);
    } else {
      const container = videoContainerRef.current;
      if (!container) return;
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [isElectronEnv]);

  // Track fullscreen changes (browser fallback)
  useEffect(() => {
    if (isElectronEnv) return;
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, [isElectronEnv]);

  const runAutoTranscribeWithKey = useCallback(
    async (groqKey: string) => {
      setTranscribing(true);
      setTranscribeError(null);

      try {
        if (isElectronEnv) {
          const videoSrc = "src" in lesson.video ? lesson.video.src : "";
          if (!videoSrc) { setTranscribeError("Нет пути к видеофайлу."); return; }

          let videoPath: string | null = null;
          if (videoSrc.startsWith("/user-video/")) {
            videoPath = await window.electronAPI!.autoTranscribe.resolveUserVideoPath(videoSrc.replace("/user-video/", ""));
          } else {
            const parts = videoSrc.split("/");
            const filename = decodeURIComponent(parts[parts.length - 1]);
            videoPath = await window.electronAPI!.autoTranscribe.resolveVideoPath(filename);
          }
          if (!videoPath) { setTranscribeError("Видеофайл не найден на диске."); return; }

          const result = await window.electronAPI!.autoTranscribe.run(videoPath, groqKey);
          if (result.error) {
            setTranscribeError(result.error);
          } else if (result.subtitles.length > 0) {
            setAutoSubs(result.subtitles);
            try { localStorage.setItem(`jt.autoSubs.${lesson.id}`, JSON.stringify(result.subtitles)); } catch {}
          } else {
            setTranscribeError("Речь не обнаружена.");
          }
        } else {
          const videoSrc = "src" in lesson.video ? lesson.video.src : "";
          if (!videoSrc) { setTranscribeError("Нет пути к видеофайлу."); return; }

          const resp = await fetch(videoSrc);
          if (!resp.ok) { setTranscribeError(`Не удалось загрузить видео: ${resp.status}`); return; }
          const blob = await resp.blob();
          const file = new File([blob], "video.mp4", { type: blob.type || "video/mp4" });

          const result = await transcribeVideoInBrowser(file, groqKey);
          if (result.error) {
            setTranscribeError(result.error);
          } else if (result.subtitles.length > 0) {
            setAutoSubs(result.subtitles);
            try { localStorage.setItem(`jt.autoSubs.${lesson.id}`, JSON.stringify(result.subtitles)); } catch {}
          } else {
            setTranscribeError("Речь не обнаружена.");
          }
        }
      } catch (err) {
        setTranscribeError(String(err));
      } finally {
        setTranscribing(false);
      }
    },
    [isElectronEnv, lesson.video, lesson.id],
  );

  const startAutoTranscribe = useCallback(async () => {
    if (transcribing) return;
    let groqKey: string | null = null;
    if (isElectronEnv) {
      groqKey = await window.electronAPI!.groqKey.get();
    } else {
      groqKey = getGroqKeyFromStorage();
    }
    if (!groqKey) {
      setShowGroqKeyDialog(true);
      return;
    }
    await runAutoTranscribeWithKey(groqKey);
  }, [isElectronEnv, transcribing, runAutoTranscribeWithKey]);

  // Auto-trigger transcription when video plays and has no subtitles
  const autoTranscribeTriggered = useRef(false);

  useEffect(() => {
    autoTranscribeTriggered.current = false;
    awaitingGroqKeyRef.current = false;
    setShowGroqKeyDialog(false);
  }, [lesson.id]);

  useEffect(() => {
    if (hasBuiltInSubs || autoSubs.length > 0 || transcribing) return;
    if (!isLocal) return;
    if (autoTranscribeTriggered.current) return;
    if (awaitingGroqKeyRef.current) return;

    void (async () => {
      let k: string | null = null;
      if (isElectronEnv) {
        k = await window.electronAPI!.groqKey.get();
      } else {
        k = getGroqKeyFromStorage();
      }
      if (!k) {
        awaitingGroqKeyRef.current = true;
        setShowGroqKeyDialog(true);
        return;
      }
      autoTranscribeTriggered.current = true;
      await runAutoTranscribeWithKey(k);
    })();
  }, [isElectronEnv, hasBuiltInSubs, autoSubs.length, transcribing, isLocal, runAutoTranscribeWithKey, lesson.id]);

  // Keyboard shortcut: Escape to exit fullscreen, F to toggle
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        toggleFullscreen();
      } else if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen, toggleFullscreen]);

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-black" : "space-y-4"}>
      <GroqKeyDialog
        open={showGroqKeyDialog}
        title="Ключ Groq для авто-субтитров"
        description="Введите бесплатный API-ключ Groq (Whisper) для автоматических субтитров. Бесплатно: console.groq.com/keys"
        onClose={() => {
          setShowGroqKeyDialog(false);
          awaitingGroqKeyRef.current = false;
          autoTranscribeTriggered.current = true;
        }}
        onSave={async (key) => {
          if (isElectronEnv) {
            await window.electronAPI!.groqKey.set(key);
          } else {
            saveGroqKeyToStorage(key);
          }
          setShowGroqKeyDialog(false);
          awaitingGroqKeyRef.current = false;
          autoTranscribeTriggered.current = true;
          await runAutoTranscribeWithKey(key);
        }}
      />
      <div className={[
        "flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between",
        isFullscreen ? "hidden" : "",
      ].join(" ")}>
        <div className="text-sm font-semibold">
          Прогресс: {answeredCount}/{totalCount} · верно: {correctCount}
          {watched ? <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100">Просмотрено</span> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowSubs((v) => !v)}
            className={[
              "inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition",
              showSubs
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                : "border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900",
            ].join(" ")}
          >
            {showSubs ? "Субтитры ВКЛ" : "Субтитры ВЫКЛ"}
          </button>
          {!hasBuiltInSubs && autoSubs.length === 0 && (
            transcribing ? (
              <span className="inline-flex h-10 items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 text-sm font-medium text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300 border-t-emerald-700" />
                Создаю субтитры...
              </span>
            ) : (
              <button
                type="button"
                onClick={startAutoTranscribe}
                className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-4 text-sm font-medium text-emerald-900 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-900/40"
              >
                Авто-субтитры
              </button>
            )
          )}
          <a
            href={href(`/levels/${lesson.level}/`)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            ← Назад к {lesson.level}
          </a>
          <button type="button" onClick={resetProgress}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Сбросить прогресс
          </button>
        </div>
      </div>

      {transcribeError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100">
          {transcribeError}
        </div>
      )}

      {resolvedSrc.endsWith(".mkv") && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-900 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100">
          Формат MKV — загрузка может занять время. Нажмите ▶ и подождите несколько секунд.
        </div>
      )}

      {!localVideoFailed ? (
        <div className={isFullscreen ? "h-full w-full" : ""}>
          <div
            ref={videoContainerRef}
            className={[
              "group relative overflow-hidden bg-black shadow-sm",
              isFullscreen
                ? "flex h-screen w-screen items-center justify-center"
                : "rounded-3xl border border-zinc-200 dark:border-zinc-800",
            ].join(" ")}
          >
            {isLocal ? (
              <>
                <video
                  ref={videoRef}
                  className={isFullscreen ? "h-full w-full object-contain" : "aspect-video w-full"}
                  controls
                  playsInline
                  preload="auto"
                  
                  onTimeUpdate={onLocalTimeUpdate}
                  onSeeked={onLocalTimeUpdate}
                  onPlay={() => { onLocalTimeUpdate(); setBuffering(false); }}
                  onWaiting={() => setBuffering(true)}
                  onCanPlay={() => setBuffering(false)}
                  onPlaying={() => setBuffering(false)}
                  onLoadStart={() => setBuffering(true)}
                  onLoadedData={() => setBuffering(false)}
                  onError={() => {
                    if (lesson.video.type === "remote" && !triedFallback.current) {
                      triedFallback.current = true;
                      setResolvedSrc(lesson.video.src);
                    } else {
                      setLocalVideoFailed(true);
                    }
                  }}
                >
                  <source src={resolvedSrc} type={resolvedSrc.endsWith(".mkv") ? "video/x-matroska" : "video/mp4"} />
                </video>
                {buffering && (
                  <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/40">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                      <span className="text-sm text-white/80">Загрузка видео…</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={isFullscreen ? "h-full w-full" : "aspect-video w-full"}>
                <div ref={ytContainerRef} className="h-full w-full" />
              </div>
            )}

            {activeSub && (
              <div className={[
                "pointer-events-none absolute inset-x-0 z-20 flex justify-center px-4",
                isFullscreen ? "bottom-20" : "bottom-16",
              ].join(" ")}>
                <div className="rounded-xl bg-black/80 px-5 py-2.5 text-center backdrop-blur-sm">
                  <div className={[
                    "font-semibold leading-relaxed text-white",
                    isFullscreen ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
                  ].join(" ")}>{activeSub.ja}</div>
                  <div className={[
                    "mt-0.5 text-emerald-300",
                    isFullscreen ? "text-base sm:text-lg" : "text-sm",
                  ].join(" ")}>{activeSub.furigana}</div>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
            {lesson.video.type === "remote" && lesson.video.src.endsWith(".mkv") ? (
              <>
                <p className="font-medium">Формат MKV не поддерживается на мобильных устройствах.</p>
                <p className="mt-1">Откройте это видео на компьютере или посмотрите на Archive.org:</p>
                <a
                  href={lesson.video.src.replace("/download/", "/details/").replace(/\/[^/]+$/, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white hover:bg-amber-700"
                >
                  Смотреть на Archive.org
                </a>
              </>
            ) : (
              <>Видеофайл недоступен на этом устройстве. Задания и субтитры доступны ниже — можно тренироваться без видео.</>
            )}
          </div>

          {questions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Задания ({answeredCount}/{totalCount})</h3>
                <button
                  type="button"
                  onClick={() => {
                    const next = questions.find((q) => !outcomes[q.id]?.answered);
                    if (next) { setActiveQuestionId(next.id); }
                  }}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                >
                  {answeredCount === 0 ? "Начать задания" : answeredCount < totalCount ? "Следующее задание" : "Все задания выполнены"}
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {questions.map((q, idx) => {
                  const done = outcomes[q.id]?.answered;
                  const correct = outcomes[q.id]?.correct;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => { if (!done) setActiveQuestionId(q.id); }}
                      disabled={!!done}
                      className={[
                        "rounded-xl border p-3 text-left text-sm transition",
                        done
                          ? correct
                            ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100"
                            : "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100"
                          : "cursor-pointer border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-zinc-600",
                      ].join(" ")}
                    >
                      <span className="font-medium">#{idx + 1}</span>{" "}
                      <span className="text-xs">{q.promptRu}</span>
                      {done && (
                        <span className="ml-1">{correct ? " ✓" : " ✗"}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {effectiveSubs.length > 0 && (
            <details className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
              <summary className="cursor-pointer p-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Субтитры ({effectiveSubs.length} фраз)
              </summary>
              <div className="max-h-80 space-y-1 overflow-y-auto px-4 pb-4">
                {effectiveSubs.map((sub, i) => (
                  <div key={i} className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-950/40">
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{sub.ja}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{sub.furigana}</div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {activeQuestion ? <QuestionModal question={activeQuestion} onDone={onDone} onSkip={onSkip} /> : null}
    </div>
  );
}

