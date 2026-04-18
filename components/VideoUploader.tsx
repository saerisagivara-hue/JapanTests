"use client";

import { useCallback, useRef, useState } from "react";
import type { Lesson, JLPTLevel, SubtitleLine, LessonQuestion, GrammarNote } from "@/lib/content";
import { parseSrtToSubtitles } from "@/lib/srt-parser";
import { generateQuestionsFromSubtitles } from "@/lib/question-generator";
import { detectGrammarInSubtitles } from "@/lib/grammar-database";
import { GroqKeyDialog } from "@/components/GroqKeyDialog";
import { getGroqKeyFromStorage, saveGroqKeyToStorage, transcribeVideoInBrowser } from "@/lib/auto-transcribe";

type Step =
  | "idle"
  | "transcribing"
  | "parsing_srt"
  | "generating_questions"
  | "generating_grammar"
  | "editing"
  | "saving"
  | "done"
  | "error";

interface Props {
  level: JLPTLevel;
  onSaved: (lesson: Lesson) => void;
  onCancel: () => void;
}

export function VideoUploader({ level, onSaved, onCancel }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [stepMessage, setStepMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [srtContent, setSrtContent] = useState<string | null>(null);
  const [srtFileName, setSrtFileName] = useState<string | null>(null);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtitles, setSubtitles] = useState<SubtitleLine[]>([]);
  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [grammarNotes, setGrammarNotes] = useState<GrammarNote[]>([]);
  const [mode, setMode] = useState<"local" | "youtube">("local");
  const [showGroqKeyDialog, setShowGroqKeyDialog] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const srtInputRef = useRef<HTMLInputElement>(null);
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | null>(null);

  const isElectronEnv = typeof window !== "undefined" && !!window.electronAPI?.isElectron;

  const handleVideoFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setTitle(file.name.replace(/\.[^.]+$/, ""));
    if (videoObjectUrl) URL.revokeObjectURL(videoObjectUrl);
    setVideoObjectUrl(URL.createObjectURL(file));
  }, [videoObjectUrl]);

  const handleSrtFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSrtFileName(file.name);
    const text = await file.text();
    setSrtContent(text);
  }, []);

  const selectVideoElectron = useCallback(async () => {
    if (!isElectronEnv) return;
    const filePath = await window.electronAPI!.video.selectFile({ type: "video" });
    if (!filePath) return;
    setVideoPath(filePath);
    setTitle(filePath.split(/[/\\]/).pop()?.replace(/\.[^.]+$/, "") ?? "video");
  }, [isElectronEnv]);

  const selectSrtElectron = useCallback(async () => {
    if (!isElectronEnv) return;
    const filePath = await window.electronAPI!.video.selectFile({ type: "srt" });
    if (!filePath) return;
    setSrtFileName(filePath.split(/[/\\]/).pop() ?? "subtitles.srt");
    const result = await window.electronAPI!.srt.readFile(filePath);
    if (result.error) {
      setError(`Ошибка чтения SRT: ${result.error}`);
      return;
    }
    setSrtContent(result.content);
  }, [isElectronEnv]);

  const hasVideo = mode === "local" ? !!(videoFile || videoPath) : !!youtubeUrl;

  const runGenerateRest = useCallback(async (parsedSubs: SubtitleLine[]) => {
    setSubtitles(parsedSubs);
    setStep("generating_questions");
    setStepMessage(`Генерация заданий из ${parsedSubs.length} субтитров...`);
    await tick();

    const genQuestions = generateQuestionsFromSubtitles(parsedSubs, {
      episodeIndex: Date.now() % 10000,
      targetCount: parsedSubs.length > 100 ? 10 : parsedSubs.length > 30 ? 7 : 5,
    });
    setQuestions(genQuestions);

    setStep("generating_grammar");
    setStepMessage("Анализ грамматики в субтитрах...");
    await tick();

    const notes = detectGrammarInSubtitles(parsedSubs);
    setGrammarNotes(notes);

    await delay(300);
    setStep("editing");
  }, []);

  const proceedWithTranscription = useCallback(
    async (groqKey: string) => {
      setStep("transcribing");
      setStepMessage("Автоматическое распознавание речи (Whisper)...");
      await tick();

      let parsedSubs: SubtitleLine[] = [];

      if (isElectronEnv && videoPath) {
        const result = await window.electronAPI!.autoTranscribe.run(videoPath, groqKey);
        if (!result.error && result.subtitles.length > 0) {
          parsedSubs = result.subtitles;
        } else {
          setStepMessage(
            result.error ? `Ошибка транскрипции: ${result.error}` : "Речь не обнаружена, продолжаю без субтитров...",
          );
          await delay(2000);
        }
      } else if (videoFile) {
        const result = await transcribeVideoInBrowser(videoFile, groqKey, (msg) => setStepMessage(msg));
        if (!result.error && result.subtitles.length > 0) {
          parsedSubs = result.subtitles;
        } else {
          setStepMessage(
            result.error ? `Ошибка транскрипции: ${result.error}` : "Речь не обнаружена, продолжаю без субтитров...",
          );
          await delay(2000);
        }
      }

      await runGenerateRest(parsedSubs);
    },
    [videoPath, videoFile, isElectronEnv, runGenerateRest],
  );

  const processVideo = useCallback(async () => {
    if (!hasVideo) return;
    setError(null);

    try {
      if (srtContent) {
        setStep("parsing_srt");
        setStepMessage("Обработка SRT-субтитров...");
        await tick();
        const parsedSubs = parseSrtToSubtitles(srtContent);
        await runGenerateRest(parsedSubs);
      } else if (isElectronEnv && videoPath) {
        const groqKey = await window.electronAPI!.groqKey.get();
        if (!groqKey) {
          setShowGroqKeyDialog(true);
          return;
        }
        await proceedWithTranscription(groqKey);
      } else if (videoFile) {
        const groqKey = getGroqKeyFromStorage();
        if (!groqKey) {
          setShowGroqKeyDialog(true);
          return;
        }
        await proceedWithTranscription(groqKey);
      } else {
        await runGenerateRest([]);
      }
    } catch (err) {
      setError(String(err));
      setStep("error");
    }
  }, [hasVideo, srtContent, isElectronEnv, videoPath, videoFile, runGenerateRest, proceedWithTranscription]);

  const saveLesson = useCallback(async () => {
    setStep("saving");
    try {
      const lessonId = `user-${level.toLowerCase()}-${Date.now()}`;

      let videoSource: Lesson["video"];

      if (mode === "youtube") {
        const ytMatch = youtubeUrl.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        );
        if (!ytMatch) {
          setError("Некорректная YouTube ссылка");
          setStep("error");
          return;
        }
        videoSource = { type: "youtube", youtubeId: ytMatch[1] };
      } else if (isElectronEnv && videoPath) {
        await window.electronAPI!.video.registerPath(lessonId, videoPath);
        videoSource = { type: "local", src: `/user-video/${lessonId}` };
      } else if (videoObjectUrl) {
        videoSource = { type: "local", src: videoObjectUrl };
      } else {
        setError("Видео не выбрано");
        setStep("error");
        return;
      }

      const lesson: Lesson = {
        id: lessonId,
        level,
        titleRu: title || "Пользовательский урок",
        descriptionRu: description || `Видео-урок: ${subtitles.length} субтитров, ${questions.length} заданий, ${grammarNotes.length} грамматических заметок.`,
        video: videoSource,
        subtitles,
        questions,
        grammarNotes: grammarNotes.length > 0 ? grammarNotes : undefined,
      };

      if (isElectronEnv) {
        await window.electronAPI!.userLessons.save(lesson);
      } else {
        const raw = localStorage.getItem("jt.user-lessons.v1");
        const existing: Lesson[] = raw ? JSON.parse(raw) : [];
        existing.push(lesson);
        localStorage.setItem("jt.user-lessons.v1", JSON.stringify(existing));
      }

      setStep("done");
      onSaved(lesson);
    } catch (err) {
      setError(String(err));
      setStep("error");
    }
  }, [mode, youtubeUrl, videoPath, videoObjectUrl, title, description, subtitles, questions, grammarNotes, level, isElectronEnv, onSaved]);

  const isProcessing = step === "transcribing" || step === "parsing_srt" || step === "generating_questions" || step === "generating_grammar";

  return (
    <div className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
      <GroqKeyDialog
        open={showGroqKeyDialog}
        title="Ключ Groq для авто-субтитров"
        description="Нужен бесплатный API-ключ Groq (Whisper). Регистрация без карты."
        showSkip
        skipLabel="Без субтитров"
        onClose={() => setShowGroqKeyDialog(false)}
        onSkip={async () => {
          setShowGroqKeyDialog(false);
          try {
            await runGenerateRest([]);
          } catch (err) {
            setError(String(err));
            setStep("error");
          }
        }}
        onSave={async (key) => {
          if (isElectronEnv) {
            await window.electronAPI!.groqKey.set(key);
          } else {
            saveGroqKeyToStorage(key);
          }
          setShowGroqKeyDialog(false);
          try {
            await proceedWithTranscription(key);
          } catch (err) {
            setError(String(err));
            setStep("error");
          }
        }}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Загрузить своё видео</h2>
        <button type="button" onClick={onCancel} className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
          Отмена
        </button>
      </div>

      <input ref={videoInputRef} type="file" accept="video/*,.mkv" className="hidden" onChange={handleVideoFileChange} />
      <input ref={srtInputRef} type="file" accept=".srt,.ass,.ssa,.vtt" className="hidden" onChange={handleSrtFileChange} />

      {step === "idle" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <button type="button" onClick={() => setMode("local")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === "local" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950" : "border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50"}`}>
              Локальный файл
            </button>
            <button type="button" onClick={() => setMode("youtube")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === "youtube" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950" : "border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50"}`}>
              YouTube ссылка
            </button>
          </div>

          {mode === "local" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => isElectronEnv ? selectVideoElectron() : videoInputRef.current?.click()}
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white">
                  Выбрать видео (MKV/MP4)
                </button>
                {(videoFile || videoPath) && (
                  <span className="truncate text-sm text-emerald-600 dark:text-emerald-400">
                    {videoFile?.name ?? videoPath?.split(/[/\\]/).pop()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => isElectronEnv ? selectSrtElectron() : srtInputRef.current?.click()}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900">
                  Субтитры (SRT) — необязательно
                </button>
                {srtFileName && (
                  <span className="truncate text-sm text-emerald-600 dark:text-emerald-400">{srtFileName}</span>
                )}
              </div>
              <div className="rounded-xl bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:bg-zinc-950/40 dark:text-zinc-400">
                {srtContent
                  ? "SRT-файл загружен. Субтитры, задания и грамматика будут сгенерированы автоматически."
                  : "Без SRT-файла урок будет создан без субтитров. Для лучшего результата загрузите SRT."}
              </div>
            </div>
          )}

          {mode === "youtube" && (
            <div className="space-y-3">
              <input type="text" placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-400" />
              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => isElectronEnv ? selectSrtElectron() : srtInputRef.current?.click()}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900">
                  Субтитры (SRT) — необязательно
                </button>
                {srtFileName && (
                  <span className="truncate text-sm text-emerald-600 dark:text-emerald-400">{srtFileName}</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <input type="text" placeholder="Название урока" value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-400" />
            <textarea placeholder="Описание (необязательно)" value={description}
              onChange={(e) => setDescription(e.target.value)} rows={2}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-400" />
          </div>

          <button type="button" onClick={processVideo} disabled={!hasVideo}
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white">
            Обработать и создать урок
          </button>
        </div>
      )}

      {/* Processing steps */}
      {isProcessing && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-950/40">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
            <span className="text-sm">{stepMessage}</span>
          </div>
          <div className="flex gap-2">
            {["parsing_srt", "transcribing", "generating_questions", "generating_grammar"].map((s, i) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${
                stepIndex(step) > i ? "bg-emerald-500" : stepIndex(step) === i ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700"
              }`} />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {step === "editing" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
            Готово! {subtitles.length > 0 ? `${subtitles.length} субтитров, ` : ""}
            {questions.length} заданий, {grammarNotes.length} грамматических заметок.
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {/* Subtitles */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">Субтитры ({subtitles.length})</div>
              <div className="mt-2 max-h-48 overflow-y-auto">
                {subtitles.length === 0 && <div className="py-1 text-xs text-zinc-400">Нет субтитров</div>}
                {subtitles.slice(0, 10).map((s, i) => (
                  <div key={i} className="border-b border-zinc-100 py-1 text-xs dark:border-zinc-800">
                    <span className="text-zinc-500">{fmtTime(s.startSec)}</span> {s.ja}
                  </div>
                ))}
                {subtitles.length > 10 && <div className="py-1 text-xs text-zinc-400">...и ещё {subtitles.length - 10}</div>}
              </div>
            </div>

            {/* Questions */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">Задания ({questions.length})</div>
              <div className="mt-2 max-h-48 overflow-y-auto">
                {questions.length === 0 && <div className="py-1 text-xs text-zinc-400">Нет заданий</div>}
                {questions.map((q) => (
                  <div key={q.id} className="border-b border-zinc-100 py-1 text-xs dark:border-zinc-800">
                    <span className="text-zinc-500">{fmtTime(q.atSec)}</span>{" "}
                    <span className="font-medium">{kindLabel(q.kind)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-sm font-semibold">Грамматика ({grammarNotes.length})</div>
              <div className="mt-2 max-h-48 overflow-y-auto">
                {grammarNotes.length === 0 && <div className="py-1 text-xs text-zinc-400">Нет грамматики</div>}
                {grammarNotes.map((n, i) => (
                  <div key={i} className="border-b border-zinc-100 py-1 text-xs dark:border-zinc-800">
                    <span className="font-medium">{n.titleJa}</span>
                    <div className="text-zinc-500">{n.titleRu}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={saveLesson}
              className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white">
              Сохранить урок
            </button>
            <button type="button" onClick={() => setStep("idle")}
              className="rounded-full border border-zinc-300 px-4 py-2.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
              Назад
            </button>
          </div>
        </div>
      )}

      {step === "saving" && (
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-950/40">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
          <span className="text-sm">Сохранение урока...</span>
        </div>
      )}

      {step === "done" && (
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
          Урок успешно создан! Он появится в списке уроков.
        </div>
      )}

      {step === "error" && error && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100">
            {error}
          </div>
          <button type="button" onClick={() => { setStep("idle"); setError(null); }}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}

function tick() { return new Promise((r) => setTimeout(r, 50)); }
function delay(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function stepIndex(s: string): number {
  const order = ["transcribing", "parsing_srt", "generating_questions", "generating_grammar"];
  const idx = order.indexOf(s);
  return idx >= 0 ? idx : -1;
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function kindLabel(kind: string): string {
  switch (kind) {
    case "listening_mcq": return "На слух";
    case "word_order": return "Порядок слов";
    case "kanji_translate": return "Кандзи";
    default: return "Задание";
  }
}
