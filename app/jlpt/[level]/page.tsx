import { notFound } from "next/navigation";
import { JlptTestRunner } from "@/components/JlptTestRunner";
import { getJlptTest, isJlptLevel, JLPT_LEVELS } from "@/lib/content";
import { href } from "@/lib/link-helpers";

export function generateStaticParams() {
  return JLPT_LEVELS.map((level) => ({ level }));
}

export default async function JlptLevelPage(
  props: { params: Promise<{ level: string }> },
) {
  const { level } = await props.params;
  if (!isJlptLevel(level)) notFound();

  const test = getJlptTest(level);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <a href={href("/")} className="hover:underline">
          Главная
        </a>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50">JLPT {level}</span>
      </div>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              JLPT‑тест {level}
            </h1>
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              {test
                ? `${test.titleRu} • ~${test.durationMin} мин`
                : "Пока нет теста для этого уровня."}
            </p>
          </div>

          <a
            href={href(`/levels/${level}/`)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Уроки {level}
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {JLPT_LEVELS.map((l) => (
            <a
              key={l}
              href={href(`/jlpt/${l}/`)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                l === level
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
            >
              {l}
            </a>
          ))}
        </div>
      </section>

      {test ? (
        <JlptTestRunner test={test} />
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200">
          Тест для {level} пока не добавлен.
        </div>
      )}
    </div>
  );
}
