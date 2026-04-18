import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: {
    default: "Японский тренажёр",
    template: "%s — Японский тренажёр",
  },
  description:
    "Уровни JLPT N5–N1: видео‑уроки с вопросами по ходу, упражнения на грамматику и кандзи, тесты JLPT.",
  applicationName: "Японский тренажёр",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Японский тренажёр",
  },
};

/**
 * Static export (output: "export") + App Router всё равно подключает клиентский runtime,
 * который пытается «мягко» навигировать (RSC / fetch). В Capacitor WebView этого
 * контента нет как у сервера Vercel — клики ломаются. Решение для MPA: одна
 * ранняя подписка (capture) переводит переходы по обычным <a href> в полную
 * загрузку страницы через location.assign — как у набора статических HTML.
 */
const STATIC_EXPORT_MPA_NAV = `
(function () {
  function internalLinkFromEvent(e) {
    var node = e.target;
    if (node && node.nodeType !== 1) node = node.parentElement;
    var a = node && node.closest ? node.closest("a[href]") : null;
    if (!a) return null;
    if (a.target && a.target !== "_self") return null;
    if (a.hasAttribute("download")) return null;
    var raw = a.getAttribute("href");
    if (!raw) return null;
    var c0 = raw.charCodeAt(0);
    if (c0 === 35 || raw.indexOf("javascript:") === 0 || raw.indexOf("mailto:") === 0 || raw.indexOf("tel:") === 0)
      return null;
    try {
      var u = new URL(a.href, window.location.href);
      if (u.origin !== window.location.origin) return null;
      return u;
    } catch (err) {
      return null;
    }
  }

  document.addEventListener(
    "click",
    function (e) {
      var u = internalLinkFromEvent(e);
      if (!u) return;
      var path = u.pathname + u.search + u.hash;
      if (path === window.location.pathname + window.location.search + window.location.hash) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.assign(path);
    },
    true
  );
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className="antialiased bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50"
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        <Script
          id="static-export-mpa-nav"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: STATIC_EXPORT_MPA_NAV }}
        />
        <AppHeader />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
