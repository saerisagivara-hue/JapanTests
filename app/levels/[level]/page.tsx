import { notFound } from "next/navigation";
import { getLessonsByLevel, isJlptLevel, LEVELS, JLPT_LEVELS } from "@/lib/content";
import { getSeriesByLevel } from "@/lib/anime-series";
import { LevelPageClient } from "./LevelPageClient";

export function generateStaticParams() {
  return JLPT_LEVELS.map((level) => ({ level }));
}

export default async function LevelPage(
  props: { params: Promise<{ level: string }> },
) {
  const { level } = await props.params;

  if (!isJlptLevel(level)) notFound();

  const levelInfo = LEVELS.find((l) => l.id === level) ?? {
    id: level,
    titleRu: level,
    shortRu: "",
  };

  const lessons = getLessonsByLevel(level);
  const series = getSeriesByLevel(level);

  return (
    <LevelPageClient
      level={level}
      levelInfo={levelInfo}
      builtInLessons={lessons}
      animeSeries={series}
    />
  );
}
