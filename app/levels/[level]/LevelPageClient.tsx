"use client";

import type { JLPTLevel, Lesson, LevelInfo } from "@/lib/content";
import type { AnimeSeries } from "@/lib/anime-series";
import { href } from "@/lib/link-helpers";

interface Props {
  level: JLPTLevel;
  levelInfo: LevelInfo;
  builtInLessons: Lesson[];
  animeSeries: AnimeSeries[];
}

export function LevelPageClient({ level, levelInfo, builtInLessons, animeSeries }: Props) {
  const seriesPrefixes = animeSeries.map((s) => `n1-${s.id.replace(/-s\d+$/, "")}-`);
  const nonSeriesLessons = builtInLessons.filter(
    (l) => !seriesPrefixes.some((prefix) => l.id.startsWith(prefix)),
  );

  return (
    <div className="space-y-8">
      {/* Level header */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{level}</h1>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">{levelInfo.titleRu}</div>
            <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-200">{levelInfo.shortRu}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={href(`/jlpt/${level}/`)} className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white">
              JLPT‑тест {level}
            </a>
            <a href={href(`/practice/${level}/`)} className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900">
              Упражнения →
            </a>
          </div>
        </div>
      </section>

      {/* Anime series cards */}
      {animeSeries.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Аниме</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {animeSeries.map((series) => (
              <a
                key={series.id}
                href={href(`/series/${series.id}/`)}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={series.coverImage}
                    alt={series.titleRu}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="text-lg font-semibold">{series.titleRu}</div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {series.totalEpisodes} серий · Сезон 1
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-700 dark:text-zinc-200">
                    {series.descriptionRu}
                  </p>
                  <div className="mt-3 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-50">
                    Смотреть →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Individual lessons */}
      {nonSeriesLessons.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {animeSeries.length > 0 ? "Другие уроки" : "Уроки‑видео"}
            </h2>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">{nonSeriesLessons.length} шт.</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {nonSeriesLessons.map((lesson) => (
              <div key={lesson.id} className="group relative">
                <a
                  href={href(`/lesson/${lesson.id}/`)}
                  className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-base font-semibold">{lesson.titleRu}</div>
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {lesson.questions.length > 0 ? `${lesson.questions.length} заданий` : "Видео"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{lesson.descriptionRu}</p>
                  <div className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-50">
                    {lesson.questions.length > 0 ? "Смотреть и тренироваться →" : "Смотреть →"}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {nonSeriesLessons.length === 0 && animeSeries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200">
          Пока нет уроков для {level}.
        </div>
      )}
    </div>
  );
}
