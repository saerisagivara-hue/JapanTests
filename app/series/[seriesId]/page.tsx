import { notFound } from "next/navigation";
import { ANIME_SERIES, getSeriesById } from "@/lib/anime-series";
import { href } from "@/lib/link-helpers";

export function generateStaticParams() {
  return ANIME_SERIES.map((s) => ({ seriesId: s.id }));
}

export default async function SeriesPage(
  props: { params: Promise<{ seriesId: string }> },
) {
  const { seriesId } = await props.params;
  const series = getSeriesById(seriesId);

  if (!series) notFound();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <a href={href("/")} className="hover:underline">Главная</a>
        <span>/</span>
        <a href={href(`/levels/${series.level}/`)} className="hover:underline">{series.level}</a>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50">{series.titleRu}</span>
      </div>

      {/* Series banner */}
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-col md:flex-row">
          <div className="aspect-[3/4] w-full flex-shrink-0 md:w-64">
            <img
              src={series.coverImage}
              alt={series.titleRu}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="mb-2 inline-flex w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {series.level} · {series.totalEpisodes} серий
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">{series.titleRu}</h1>
            <p className="mt-3 max-w-xl text-sm text-zinc-700 dark:text-zinc-200">
              {series.descriptionRu}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span>Японские субтитры</span>
              <span>·</span>
              <span>Задания по ходу видео</span>
              <span>·</span>
              <span>Кандзи и грамматика</span>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes list */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Серии</h2>
        <div className="space-y-3">
          {series.episodes.map((ep, idx) => (
            <a
              key={ep.id}
              href={href(`/lesson/${ep.id}/`)}
              className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-lg font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold">{ep.titleRu}</div>
                <div className="mt-0.5 truncate text-sm text-zinc-600 dark:text-zinc-300">
                  {ep.descriptionRu}
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-1">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {ep.questions.length} заданий
                </span>
                <span className="rounded-full bg-zinc-50 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                  {ep.subtitles.length} субтитров
                </span>
              </div>
              <div className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                →
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
