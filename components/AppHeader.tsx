import { LEVELS } from "@/lib/content";
import { href } from "@/lib/link-helpers";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/70">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3">
        <a href={href("/")} className="flex items-baseline gap-2">
          <span className="text-base font-semibold tracking-tight">
            日本語トレーナー
          </span>
          <span className="hidden text-xs text-zinc-500 sm:inline dark:text-zinc-400">
            N5–N1 • видео‑уроки • JLPT
          </span>
        </a>

        <nav className="hidden flex-wrap items-center gap-2 md:flex">
          {LEVELS.map((l) => (
            <a
              key={l.id}
              href={href(`/levels/${l.id}/`)}
              className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {l.id}
            </a>
          ))}
          <a
            href={href("/jlpt/N5/")}
            className="rounded-full bg-zinc-900 px-3 py-1 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            JLPT‑тест
          </a>
        </nav>

        <a href="https://t.me/Deil_Haja" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition">
          tg - @Deil_Haja
        </a>
      </div>
    </header>
  );
}
