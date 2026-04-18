import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";
import { AuthProvider } from "@/components/AuthProvider";

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
        <AuthProvider>
          <AppHeader />
          <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
