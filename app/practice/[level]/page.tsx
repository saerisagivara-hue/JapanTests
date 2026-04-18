import { notFound } from "next/navigation";
import { isJlptLevel, JLPT_LEVELS, LEVELS } from "@/lib/content";
import { PracticeHub } from "@/components/PracticeHub";
import { href } from "@/lib/link-helpers";

export function generateStaticParams() {
  return JLPT_LEVELS.map((level) => ({ level }));
}

export default async function PracticeLevelPage(
  props: { params: Promise<{ level: string }> },
) {
  const { level } = await props.params;
  if (!isJlptLevel(level)) notFound();

  const info = LEVELS.find((l) => l.id === level);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <a href={href("/")} className="hover:underline">
          Главная
        </a>
        <span>/</span>
        <a href={href(`/levels/${level}/`)} className="hover:underline">
          {level}
        </a>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50">Упражнения</span>
      </div>

      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Упражнения {level}
        </h1>
        {info?.shortRu ? (
          <p className="text-sm text-zinc-700 dark:text-zinc-200">
            {info.shortRu}
          </p>
        ) : null}
      </section>

      <PracticeHub level={level} />
    </div>
  );
}
