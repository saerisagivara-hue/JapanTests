"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Lesson } from "@/lib/content";
import { VideoLessonPlayer } from "@/components/VideoLessonPlayer";
import { GrammarCard } from "@/components/GrammarCard";
import { href } from "@/lib/link-helpers";

function WatchContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("id");

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) {
      setError("Не указан ID урока");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        let lessons: Lesson[] = [];

        if (typeof window !== "undefined" && window.electronAPI?.isElectron) {
          const raw = await window.electronAPI.userLessons.getAll();
          lessons = raw as Lesson[];
        } else {
          const raw = localStorage.getItem("jt.user-lessons.v1");
          if (raw) lessons = JSON.parse(raw) as Lesson[];
        }

        const found = lessons.find((l) => l.id === lessonId);
        if (found) {
          if (
            found.video.type === "local" &&
            found.video.src.startsWith("/user-video/") &&
            window.electronAPI?.isElectron
          ) {
            const stored = found as unknown as Record<string, unknown>;
            if (typeof stored.videoFilePath === "string") {
              await window.electronAPI.video.registerPath(lessonId!, stored.videoFilePath as string);
            }
          }
          setLesson(found);
        } else {
          setError("Урок не найден");
        }
      } catch {
        setError("Ошибка загрузки урока");
      }
      setLoading(false);
    }

    load();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100">
          {error ?? "Урок не найден"}
        </div>
        <a
          href={href("/")}
          className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          ← На главную
        </a>
      </div>
    );
  }

  const hasGrammar = lesson.grammarNotes && lesson.grammarNotes.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <a href={href("/")} className="hover:underline">Главная</a>
        <span>/</span>
        <a href={href(`/levels/${lesson.level}/`)} className="hover:underline">{lesson.level}</a>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50">{lesson.titleRu}</span>
      </div>

      <section className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {lesson.titleRu}
          </h1>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-900 dark:bg-blue-950/60 dark:text-blue-100">
            Моё видео
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          {lesson.descriptionRu}
        </p>
      </section>

      {hasGrammar ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <VideoLessonPlayer key={lesson.id} lesson={lesson} />
          </div>
          <aside className="space-y-4">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Грамматика из видео
            </div>
            {lesson.grammarNotes!.map((note, i) => (
              <GrammarCard key={i} note={note} />
            ))}
          </aside>
        </div>
      ) : (
        <VideoLessonPlayer key={lesson.id} lesson={lesson} />
      )}
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
        </div>
      }
    >
      <WatchContent />
    </Suspense>
  );
}
