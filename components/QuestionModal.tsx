"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  DialogueAudioQuestion,
  FillBlankQuestion,
  KanjiTranslateQuestion,
  LessonQuestion,
  ListeningMcqQuestion,
  NumberAudioQuestion,
  WordOrderQuestion,
} from "@/lib/content";

type DoneResult = { questionId: string; isCorrect: boolean };

function useTTS() {
  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const jp = voices.find((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));
    if (jp) utter.voice = jp;
    window.speechSynthesis.speak(utter);
  }, []);
  return speak;
}

export function QuestionModal({
  question,
  onDone,
  onSkip,
}: {
  question: LessonQuestion;
  onDone: (result: DoneResult) => void;
  onSkip: (questionId: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Задание
            </div>
            <div className="text-base font-semibold">{question.promptRu}</div>
          </div>
          <button
            type="button"
            onClick={() => onSkip(question.id)}
            className="shrink-0 rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Пропустить
          </button>
        </div>

        <div className="mt-4">
          {question.kind === "listening_mcq" ? (
            <ListeningMcq key={question.id} q={question} onDone={onDone} />
          ) : question.kind === "word_order" ? (
            <WordOrder key={question.id} q={question} onDone={onDone} />
          ) : question.kind === "fill_blank" ? (
            <FillBlank key={question.id} q={question} onDone={onDone} />
          ) : question.kind === "number_audio" ? (
            <NumberAudio key={question.id} q={question} onDone={onDone} />
          ) : question.kind === "dialogue_audio" ? (
            <DialogueAudio key={question.id} q={question} onDone={onDone} />
          ) : (
            <KanjiTranslate key={question.id} q={question} onDone={onDone} />
          )}
        </div>
      </div>
    </div>
  );
}

function ListeningMcq({
  q,
  onDone,
}: {
  q: ListeningMcqQuestion;
  onDone: (result: DoneResult) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = selected === q.correctIndex;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {q.optionsRu.map((opt, idx) => {
          const active = selected === idx;
          const disabled = checked;
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => setSelected(idx)}
              className={[
                "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                active
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                  : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
                disabled ? "opacity-90" : "",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {checked && (
        <div
          className={[
            "rounded-2xl border p-4 text-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
          ].join(" ")}
        >
          <div className="font-medium">
            {isCorrect ? "Верно." : "Неверно."}
          </div>
          <div className="mt-1 text-zinc-700 dark:text-zinc-200">
            Правильный ответ: {q.optionsRu[q.correctIndex]}
          </div>
          {q.explanationRu ? (
            <div className="mt-2 text-zinc-700 dark:text-zinc-200">
              {q.explanationRu}
            </div>
          ) : null}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={() => setChecked(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Проверить
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onDone({ questionId: q.id, isCorrect })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
}

function WordOrder({
  q,
  onDone,
}: {
  q: WordOrderQuestion;
  onDone: (result: DoneResult) => void;
}) {
  const shuffled = useMemo(() => {
    const seed = q.id;
    return q.words
      .map((w, i) => ({ w, i, k: hashToUint32(`${seed}:${i}:${w}`) }))
      .sort((a, b) => a.k - b.k);
  }, [q.id, q.words]);

  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const correct = q.correctOrder;
  const isCorrect =
    picked.length === correct.length &&
    picked.every((val, idx) => val === correct[idx]);

  const available = shuffled.filter((x) => !picked.includes(x.i));

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Ваш ответ
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {picked.length === 0 ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              Нажимайте слова снизу, чтобы собрать фразу.
            </div>
          ) : (
            picked.map((idx) => (
              <button
                key={idx}
                type="button"
                disabled={checked}
                onClick={() =>
                  setPicked((prev) => prev.filter((p) => p !== idx))
                }
                className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm text-zinc-900 hover:bg-zinc-50 disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                title="Нажмите, чтобы убрать"
              >
                {q.words[idx]}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Слова
        </div>
        <div className="flex flex-wrap gap-2">
          {available.map((x) => (
            <button
              key={x.i}
              type="button"
              disabled={checked}
              onClick={() => setPicked((prev) => [...prev, x.i])}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-900 hover:bg-zinc-50 disabled:opacity-70 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              {x.w}
            </button>
          ))}
        </div>
      </div>

      {checked && (
        <div
          className={[
            "rounded-2xl border p-4 text-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
          ].join(" ")}
        >
          <div className="font-medium">
            {isCorrect ? "Верно." : "Неверно."}
          </div>
          <div className="mt-1 text-zinc-700 dark:text-zinc-200">
            Правильный порядок:{" "}
            {q.correctOrder.map((i) => q.words[i]).join(" ")}
          </div>
          {q.explanationRu ? (
            <div className="mt-2 text-zinc-700 dark:text-zinc-200">
              {q.explanationRu}
            </div>
          ) : null}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {!checked ? (
          <>
            <button
              type="button"
              onClick={() => setPicked([])}
              className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Очистить
            </button>
            <button
              type="button"
              disabled={picked.length !== q.correctOrder.length}
              onClick={() => setChecked(true)}
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              Проверить
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => onDone({ questionId: q.id, isCorrect })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
}

function KanjiTranslate({
  q,
  onDone,
}: {
  q: KanjiTranslateQuestion;
  onDone: (result: DoneResult) => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const accepted = useMemo(
    () =>
      q.acceptedRu.map((x) => x.trim().toLowerCase().replaceAll("ё", "е")),
    [q.acceptedRu],
  );

  const normalized = value.trim().toLowerCase().replaceAll("ё", "е");
  const isCorrect = accepted.includes(normalized);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Кандзи
        </div>
        <div className="mt-1 text-3xl font-semibold tracking-tight">
          {q.kanji}
        </div>
        {q.hintRu ? (
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {q.hintRu}
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Перевод на русском</label>
        <input
          value={value}
          disabled={checked}
          onChange={(e) => setValue(e.target.value)}
          className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-100"
          placeholder="Например: студент"
        />
      </div>

      {checked && (
        <div
          className={[
            "rounded-2xl border p-4 text-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
          ].join(" ")}
        >
          <div className="font-medium">
            {isCorrect ? "Верно." : "Неверно."}
          </div>
          <div className="mt-1 text-zinc-700 dark:text-zinc-200">
            Принимаемые ответы: {q.acceptedRu.join(", ")}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={value.trim().length === 0}
            onClick={() => setChecked(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Проверить
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onDone({ questionId: q.id, isCorrect })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Fill-in-the-blank: вписать частицу / форму ─── */

function FillBlank({
  q,
  onDone,
}: {
  q: FillBlankQuestion;
  onDone: (result: DoneResult) => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const parts = q.sentenceJa.split("___");
  const normalized = value.trim().toLowerCase();
  const isCorrect = q.acceptedAnswers.some(
    (a) => a.trim().toLowerCase() === normalized,
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="text-lg leading-relaxed">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <input
                  value={value}
                  disabled={checked}
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                  className={[
                    "mx-1 inline-block w-24 border-b-2 bg-transparent px-1 text-center text-lg outline-none",
                    checked
                      ? isCorrect
                        ? "border-emerald-500 text-emerald-700 dark:text-emerald-300"
                        : "border-rose-500 text-rose-700 dark:text-rose-300"
                      : "border-zinc-400 focus:border-zinc-900 dark:border-zinc-600 dark:focus:border-zinc-100",
                  ].join(" ")}
                  placeholder="?"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && value.trim()) setChecked(true);
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {checked && (
        <div
          className={[
            "rounded-2xl border p-4 text-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
          ].join(" ")}
        >
          <div className="font-medium">{isCorrect ? "Верно!" : "Неверно."}</div>
          <div className="mt-1 text-zinc-700 dark:text-zinc-200">
            Правильный ответ: {q.acceptedAnswers[0]}
          </div>
          {q.explanationRu && (
            <div className="mt-2 text-zinc-700 dark:text-zinc-200">{q.explanationRu}</div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={!value.trim()}
            onClick={() => setChecked(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Проверить
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onDone({ questionId: q.id, isCorrect })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Number Audio: прослушать число и записать ─── */

function NumberAudio({
  q,
  onDone,
}: {
  q: NumberAudioQuestion;
  onDone: (result: DoneResult) => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [played, setPlayed] = useState(false);

  const normalized = value.trim().replace(/[\s\-\(\)]/g, "");
  const isCorrect = q.acceptedAnswers.some(
    (a) => a.trim().replace(/[\s\-\(\)]/g, "") === normalized,
  );

  const handlePlay = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const ttsText = q.audioText.includes("の") ? q.audioText.split("の").join("、") : q.audioText;
    const utter = new SpeechSynthesisUtterance(ttsText);
    utter.lang = "ja-JP";
    // Чуть медленнее для чисел/номеров — чтобы было разборчиво
    utter.rate = 0.65;
    utter.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const jp = voices.find((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));
    if (jp) utter.voice = jp;
    window.speechSynthesis.speak(utter);
    setPlayed(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md transition hover:bg-indigo-500 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.2 1.2 0 0 1-1.94.94L5.26 16H2.4A1.2 1.2 0 0 1 1.2 14.8V9.2A1.2 1.2 0 0 1 2.4 8h2.86l4.8-4.14a1.2 1.2 0 0 1 1.2-.17ZM15.95 7.05a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.607.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06Zm-2.12 2.12a.75.75 0 0 1 1.06 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.06Z"/>
          </svg>
        </button>
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          {played ? "Нажмите ещё раз, чтобы прослушать повторно" : "Нажмите, чтобы прослушать"}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ваш ответ</label>
        <input
          value={value}
          disabled={checked}
          onChange={(e) => setValue(e.target.value)}
          className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-center text-lg tracking-wider outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-100"
          placeholder="Введите число или номер"
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) setChecked(true);
          }}
        />
      </div>

      {checked && (
        <div
          className={[
            "rounded-2xl border p-4 text-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
          ].join(" ")}
        >
          <div className="font-medium">{isCorrect ? "Верно!" : "Неверно."}</div>
          <div className="mt-1 text-zinc-700 dark:text-zinc-200">
            Правильный ответ: {q.acceptedAnswers[0]}
          </div>
          <div className="mt-1 text-zinc-500 dark:text-zinc-400">
            Аудио: 「{q.audioText}」
          </div>
          {q.explanationRu && (
            <div className="mt-2 text-zinc-700 dark:text-zinc-200">{q.explanationRu}</div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={!value.trim()}
            onClick={() => setChecked(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Проверить
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onDone({ questionId: q.id, isCorrect })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Dialogue Audio: прослушать диалог и ответить ─── */

function DialogueAudio({
  q,
  onDone,
}: {
  q: DialogueAudioQuestion;
  onDone: (result: DoneResult) => void;
}) {
  const speak = useTTS();
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const isCorrect = selected === q.correctIndex;

  const handlePlayDialogue = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setPlaying(true);

    const lines = q.dialogueLines;
    let i = 0;
    const playNext = () => {
      if (i >= lines.length) {
        setPlaying(false);
        return;
      }
      const line = lines[i];
      const utter = new SpeechSynthesisUtterance(line.ja);
      utter.lang = "ja-JP";
      utter.rate = 0.75;
      const voices = window.speechSynthesis.getVoices();
      const jp = voices.filter((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));
      if (jp.length > 0) {
        utter.voice = jp[i % jp.length];
      }
      utter.onend = () => {
        i++;
        setTimeout(playNext, 400);
      };
      window.speechSynthesis.speak(utter);
    };
    playNext();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
        <button
          type="button"
          onClick={handlePlayDialogue}
          disabled={playing}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-md transition hover:bg-violet-500 active:scale-95 disabled:opacity-60"
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 animate-pulse">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.2 1.2 0 0 1-1.94.94L5.26 16H2.4A1.2 1.2 0 0 1 1.2 14.8V9.2A1.2 1.2 0 0 1 2.4 8h2.86l4.8-4.14a1.2 1.2 0 0 1 1.2-.17ZM15.95 7.05a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.607.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06Zm-2.12 2.12a.75.75 0 0 1 1.06 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.06Z"/>
            </svg>
          )}
        </button>
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          {playing ? "Воспроизводится диалог…" : "Прослушайте диалог"}
        </div>
      </div>

      {checked && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Текст диалога</div>
          {q.dialogueLines.map((line, i) => (
            <div key={i} className="text-sm leading-relaxed">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{line.speaker}:</span>{" "}
              <span className="text-zinc-900 dark:text-zinc-100">{line.ja}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {q.optionsRu.map((opt, idx) => {
          const active = selected === idx;
          const disabled = checked;
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => setSelected(idx)}
              className={[
                "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                active
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                  : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
                disabled ? "opacity-90" : "",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {checked && (
        <div
          className={[
            "rounded-2xl border p-4 text-sm",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100",
          ].join(" ")}
        >
          <div className="font-medium">{isCorrect ? "Верно!" : "Неверно."}</div>
          <div className="mt-1 text-zinc-700 dark:text-zinc-200">
            Правильный ответ: {q.optionsRu[q.correctIndex]}
          </div>
          {q.explanationRu && (
            <div className="mt-2 text-zinc-700 dark:text-zinc-200">{q.explanationRu}</div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={() => setChecked(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Проверить
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onDone({ questionId: q.id, isCorrect })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </div>
  );
}

function hashToUint32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

