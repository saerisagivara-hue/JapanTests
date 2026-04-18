import { LEVELS, getLessonsByLevel } from "@/lib/content";
import { href } from "@/lib/link-helpers";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Изучайте японский по видео и практикуйте JLPT N5–N1
            </h1>
            <p className="max-w-2xl text-pretty text-zinc-700 dark:text-zinc-200">
              Во время просмотра видео появляются вопросы на слух, упражнения на
              порядок слов и задания по кандзи. Интерфейс полностью на русском.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={href("/lesson/n5-cafe/")}
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              Открыть урок
            </a>
            <a
              href={href("/jlpt/N5/")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Пройти JLPT‑тест
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Уровни</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Нажмите на уровень, чтобы открыть видео‑уроки и упражнения.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((l) => {
            const levelLessons = getLessonsByLevel(l.id);
            return (
              <a
                key={l.id}
                href={href(`/levels/${l.id}/`)}
                className="group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
              >
                <div className="text-lg font-semibold">{l.id}</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {l.titleRu}
                </div>
                <div className="mt-3 text-sm text-zinc-700 dark:text-zinc-200">
                  {l.shortRu}
                </div>
                <div className="mt-2 text-xs text-zinc-500">
                  {levelLessons.length} видео‑уроков
                </div>
                <div className="mt-4 text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-50">
                  Перейти к урокам →
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-xl font-semibold tracking-tight">Как это работает</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/40">
            <div className="text-sm font-semibold">1) Смотрите видео</div>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Аниме/разговорные ролики по уровню.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/40">
            <div className="text-sm font-semibold">2) Отвечайте по ходу</div>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Вопросы автоматически появляются в нужный момент и ставят видео на
              паузу.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950/40">
            <div className="text-sm font-semibold">3) Закрепляйте JLPT‑тестом</div>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Мини‑тесты по разделам: лексика, грамматика, чтение, аудирование.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
