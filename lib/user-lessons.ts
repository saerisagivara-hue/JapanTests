"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lesson } from "./content";

const LS_KEY = "jt.user-lessons.v1";

function isElectron(): boolean {
  return typeof window !== "undefined" && !!window.electronAPI?.isElectron;
}

export function useUserLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      if (isElectron()) {
        const raw = await window.electronAPI!.userLessons.getAll();
        setLessons(raw as Lesson[]);
      } else {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) setLessons(JSON.parse(raw) as Lesson[]);
      }
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const saveLesson = useCallback(
    async (lesson: Lesson) => {
      if (isElectron()) {
        await window.electronAPI!.userLessons.save(lesson);
      } else {
        const current = [...lessons];
        const idx = current.findIndex((l) => l.id === lesson.id);
        if (idx >= 0) current[idx] = lesson;
        else current.push(lesson);
        localStorage.setItem(LS_KEY, JSON.stringify(current));
      }
      await reload();
    },
    [lessons, reload],
  );

  const deleteLesson = useCallback(
    async (lessonId: string) => {
      if (isElectron()) {
        await window.electronAPI!.userLessons.delete(lessonId);
      } else {
        const current = lessons.filter((l) => l.id !== lessonId);
        localStorage.setItem(LS_KEY, JSON.stringify(current));
      }
      await reload();
    },
    [lessons, reload],
  );

  return { lessons, loading, saveLesson, deleteLesson, reload };
}
