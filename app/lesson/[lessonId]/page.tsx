import { notFound } from "next/navigation";
import { VideoLessonPlayer } from "@/components/VideoLessonPlayer";
import { GrammarCard } from "@/components/GrammarCard";
import { getLessonById, LESSONS } from "@/lib/content";
import { href } from "@/lib/link-helpers";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export default async function LessonPage(
  props: { params: Promise<{ lessonId: string }> },
) {
  const { lessonId } = await props.params;
  const lesson = getLessonById(lessonId);

  if (!lesson) notFound();

  const hasGrammar = lesson.grammarNotes && lesson.grammarNotes.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <a href={href("/")} className="hover:underline">
          Главная
        </a>
        <span>/</span>
        <a href={href(`/levels/${lesson.level}/`)} className="hover:underline">
          {lesson.level}
        </a>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50">{lesson.titleRu}</span>
      </div>

      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {lesson.titleRu}
        </h1>
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          {lesson.descriptionRu}
        </p>
      </section>

      <VideoLessonPlayer key={lesson.id} lesson={lesson} />

      {hasGrammar && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Грамматика из видео
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {lesson.grammarNotes!.map((note, i) => (
              <GrammarCard key={i} note={note} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
