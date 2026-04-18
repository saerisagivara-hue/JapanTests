/**
 * Build script: reads SRT files from the Kimetsu no Yaiba folder, parses them,
 * generates questions, and writes lib/kny-lessons.ts.
 *
 * Usage: node scripts/build-kny-lessons.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { createRequire } from "module";

const KNY_DIR = "C:\\Users\\saeri\\Downloads\\[Erai-raws] Kimetsu no Yaiba - 01 ~ 26 [1080p][HEVC][Multiple Subtitle]";

const EPISODE_TITLES = [
  { num: 1, titleRu: "Серия 1: Жестокость", descRu: "Танджиро Камадо — добрый юноша, который живёт с семьёй в горах и продаёт уголь. Однажды, вернувшись домой, он обнаруживает, что его семья убита демоном. Единственная выжившая — его сестра Нэдзуко, которая превратилась в демона." },
  { num: 2, titleRu: "Серия 2: Наставник Саконджи Урокодаки", descRu: "Танджиро встречает охотника на демонов Гию Томиоку, который направляет его к своему бывшему наставнику Саконджи Урокодаки. Начинается суровая тренировка." },
  { num: 3, titleRu: "Серия 3: Сабито и Макомо", descRu: "Танджиро продолжает тренировки под руководством Урокодаки. Духи Сабито и Макомо помогают ему овладеть техникой водного дыхания." },
  { num: 4, titleRu: "Серия 4: Финальный отбор", descRu: "Танджиро отправляется на финальный отбор, где молодые мечники должны выжить семь дней на горе, кишащей демонами." },
  { num: 5, titleRu: "Серия 5: Свой собственный меч", descRu: "Танджиро получает свой первый меч от кузнеца и отправляется на первое задание — в город, где пропадают молодые девушки." },
  { num: 6, titleRu: "Серия 6: Демон в связке Киёси Мурата", descRu: "Танджиро сражается с демоном, который разделяется на части. Он использует своё обоняние, чтобы найти основное тело врага." },
  { num: 7, titleRu: "Серия 7: Демон Мурата", descRu: "Танджиро продолжает борьбу с демонами на болотах и завершает своё первое задание. Он узнаёт о Кидзуки — сильнейших демонах Кибуцудзи Мудзана." },
  { num: 8, titleRu: "Серия 8: Запах очарующей крови", descRu: "Танджиро получает новое задание. Вместе с охотником Казуми он ищет демона, похищающего девушек по ночам." },
  { num: 9, titleRu: "Серия 9: Тэмари и стрелы", descRu: "На Танджиро нападают два могущественных демона, подчиняющиеся Кибуцудзи Мудзану. Танджиро ведёт отчаянную битву." },
  { num: 10, titleRu: "Серия 10: Вместе навечно", descRu: "Танджиро побеждает демонов-стрел с помощью Нэдзуко и Тамаё. Становится ясно, что победить Мудзана можно, объединив усилия." },
  { num: 11, titleRu: "Серия 11: Дом с барабаном", descRu: "Танджиро встречает трусливого Дзэницу Агацуму и попадает в вращающийся дом демона-барабанщика Кёгая." },
  { num: 12, titleRu: "Серия 12: Кабан в маске", descRu: "Танджиро сражается с Кёгаем, а во второй половине дома бушует Иноскэ Хашибира — дикий охотник в маске кабана." },
  { num: 13, titleRu: "Серия 13: Что-то более важное, чем жизнь", descRu: "Танджиро побеждает Кёгая, проявив уважение к его искусству. Иноскэ вызывает Танджиро на бой, и Дзэницу впервые показывает свою молниеносную технику." },
  { num: 14, titleRu: "Серия 14: Дом в доме", descRu: "Танджиро, Дзэницу и Иноскэ получают совместное задание на горе Нотагумо, где охотники пропадают в паучьей паутине." },
  { num: 15, titleRu: "Серия 15: Горе Нотагумо", descRu: "На горе Нотагумо команда сталкивается с семьёй демонов-пауков. Иноскэ и Танджиро разделяются для борьбы с разными врагами." },
  { num: 16, titleRu: "Серия 16: Кто-то другой атакует", descRu: "Дзэницу подвергается атаке паучьего яда. Танджиро и Иноскэ находят демона-мать семьи пауков." },
  { num: 17, titleRu: "Серия 17: Ты должен стать клинком", descRu: "Танджиро сражается с Руи, Нижней Пятёркой Кидзуки, и проигрывает. Нэдзуко пробуждает кровавую технику, чтобы спасти брата." },
  { num: 18, titleRu: "Серия 18: Фальшивые узы", descRu: "Танджиро вспоминает танец своего отца — «Хиноками Кагура» — и раскрывает новую технику. Гию прибывает и спасает их." },
  { num: 19, titleRu: "Серия 19: Хиноками", descRu: "Танджиро комбинирует дыхание воды и огненный танец отца. Нэдзуко использует свою кровавую технику. Гию побеждает Руи." },
  { num: 20, titleRu: "Серия 20: Претенциозный союз", descRu: "Танджиро и Нэдзуко задержаны охотниками. Их доставляют на суд столпов-хасира, которые решают их судьбу." },
  { num: 21, titleRu: "Серия 21: Против правил", descRu: "Столпы требуют казни Танджиро и Нэдзуко. Глава клана Убуяшики вступается за них и предлагает дать им шанс." },
  { num: 22, titleRu: "Серия 22: Хозяин", descRu: "Убуяшики убеждает столпов. Танджиро, Дзэницу и Иноскэ начинают реабилитационную тренировку у поместья бабочек." },
  { num: 23, titleRu: "Серия 23: Собрание столпов-хасира", descRu: "Тренировка в поместье бабочек Синобу Кочо. Танджиро учится полному постоянному дыханию." },
  { num: 24, titleRu: "Серия 24: Реабилитационная тренировка", descRu: "Танджиро осваивает полное постоянное дыхание. Между тем, Мудзан собирает Нижних Кидзуки и устраивает кровавую расправу." },
  { num: 25, titleRu: "Серия 25: Преследователи", descRu: "Танджиро, Дзэницу, Иноскэ и столп пламени Рэнгоку садятся в поезд Мугэн. Начинается миссия против Нижней Единицы." },
  { num: 26, titleRu: "Серия 26: Новая миссия", descRu: "Завершение первого сезона. Танджиро и его друзья отправляются на новую миссию, готовые к новым испытаниям." },
];

const MKV_FILES = [
  "[Erai-raws] Kimetsu no Yaiba - 01 [1080p][HEVC][95AC736C].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 02 [1080p][HEVC][DAC40433].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 03 [1080p][HEVC][846022E3].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 04 [1080p][HEVC][A4AF13C0].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 05 [1080p][HEVC][68585199].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 06 [1080p][HEVC][65A976C0].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 07 [1080p][HEVC][3FDB7136].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 08 [1080p][HEVC][C3563CC0].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 09 [1080p][HEVC][11CF9FC7].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 10 [1080p][HEVC][549EA6E2].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 11 [1080p][HEVC][E4168B8D].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 12 [1080p][HEVC][8C58F91F].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 13 [1080p][HEVC][2B4E3D55].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 14 [1080p][HEVC][840B36BE].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 15 [1080p][HEVC][3E62A9A7].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 16 [1080p][HEVC][B882E834].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 17 [1080p][HEVC][2306EC8B].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 18 [1080p][HEVC][2095C8DA].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 19 [1080p][HEVC][FB1D831E].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 20 [1080p][HEVC][ABDB7E7A].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 21 [1080p][HEVC][8F9242A3].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 22 [1080p][HEVC][C146CF99].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 23 [1080p][HEVC][1301EB8C].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 24 [1080p][HEVC][8C166865].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 25 [1080p][HEVC][CA19719E].mkv",
  "[Erai-raws] Kimetsu no Yaiba - 26 [1080p][HEVC][31CF53D6].mkv",
];

// --- SRT parser ---

function timeToSeconds(time) {
  const [h, m, rest] = time.split(":");
  const [s, ms] = rest.split(",");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
}

function parseSrt(srt) {
  const normalized = srt.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/^\uFEFF/, "").trim();
  const blocks = normalized.split(/\n\n+/);
  const subtitles = [];

  const SFX = /^（[^）]*）$/;
  const MUSIC = /^[♪～♩♫♬\s]+$/;
  const SPEAKER = /^（[^）]+）/;
  const FURI = /([一-龥々〇]+)\(([ぁ-んァ-ヶー]+)\)/g;

  for (const block of blocks) {
    const lines = block.split("\n");
    if (lines.length < 2) continue;
    const idx = parseInt(lines[0].trim());
    if (isNaN(idx)) continue;
    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;
    const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
    const timeIdx = lines.indexOf(timeLine);
    let text = lines.slice(timeIdx + 1).join("\n").trim();
    if (!text) continue;

    const cleaned = text.replace(/\n/g, "");
    if (SFX.test(cleaned) || MUSIC.test(cleaned)) continue;

    if (text.includes("\n")) {
      const parts = text.split("\n");
      if (SFX.test(parts[0].trim())) text = parts.slice(1).join("\n");
    }

    let ja = text.replace(SPEAKER, "").replace(/\n/g, " ").trim();
    if (!ja || MUSIC.test(ja)) continue;

    let furigana = text.replace(FURI, "$2").replace(SPEAKER, "").replace(/\n/g, " ").trim();
    if (!furigana) furigana = ja;

    subtitles.push({
      startSec: Math.round(timeToSeconds(startStr) * 100) / 100,
      endSec: Math.round(timeToSeconds(endStr) * 100) / 100,
      ja,
      furigana,
    });
  }
  return subtitles;
}

// --- Question generator ---

const KANJI_COMPOUND = /[一-龥々〇]{2,}/g;

function shuffleArray(arr, seed) {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateQuestions(subtitles, epIdx) {
  const prefix = `n1-kny-${String(epIdx + 1).padStart(2, "0")}`;
  const questions = [];
  let qNum = 0;

  const dialogueSubs = subtitles.filter(
    (s) => s.ja.length > 3 && !s.ja.startsWith("♪") && !/^[ぁ-ん～…！？、。]+$/.test(s.ja),
  );
  if (dialogueSubs.length === 0) return [];

  const duration = subtitles[subtitles.length - 1]?.endSec ?? 1400;
  const targetCount = 7;
  const step = Math.max(120, duration / (targetCount + 1));
  const used = new Set();

  function findSubNear(targetSec) {
    let best = null, bestDist = Infinity;
    for (const s of dialogueSubs) {
      const d = Math.abs(s.startSec - targetSec);
      if (d < bestDist && !used.has(s.startSec)) { bestDist = d; best = s; }
    }
    return best;
  }

  for (let t = step; t < duration && questions.length < targetCount; t += step) {
    const sub = findSubNear(t);
    if (!sub) continue;
    used.add(sub.startSec);
    const atSec = Math.round(sub.endSec + 1);
    const qType = questions.length % 3;

    if (qType === 0) {
      const compounds = sub.ja.match(KANJI_COMPOUND) ?? [];
      if (compounds.length > 0) {
        questions.push({
          id: `${prefix}-q${String(++qNum).padStart(2, "0")}`,
          kind: "kanji_translate",
          atSec,
          promptRu: `Переведите кандзи「${compounds[0]}」из фразы「${sub.ja}」`,
          kanji: compounds[0],
          acceptedRu: ["(введите перевод)"],
        });
        continue;
      }
    }

    if (qType === 1) {
      const words = sub.ja.replace(/[。、！？…～♪「」『』（）\s]+/g, " ").trim().split(/\s+/).filter(Boolean);
      if (words.length >= 3 && words.length <= 8) {
        const shuffled = shuffleArray(words, epIdx * 1000 + qNum);
        const correctOrder = shuffled.map((_, i) => shuffled.indexOf(words[i]));
        questions.push({
          id: `${prefix}-q${String(++qNum).padStart(2, "0")}`,
          kind: "word_order",
          atSec,
          promptRu: `Соберите фразу в правильном порядке`,
          words: shuffled,
          correctOrder,
        });
        continue;
      }
    }

    const wrongAnswers = ["Это приветствие", "Выражение извинения", "Просьба о помощи", "Прощание", "Выражение благодарности", "Отказ"];
    const seed = epIdx * 100 + qNum;
    const shuffledWrong = shuffleArray(wrongAnswers, seed).slice(0, 3);
    const correctIdx = seed % 4;
    const options = [...shuffledWrong];
    options.splice(correctIdx, 0, "Послушайте фразу и переведите");

    questions.push({
      id: `${prefix}-q${String(++qNum).padStart(2, "0")}`,
      kind: "listening_mcq",
      atSec,
      promptRu: `Что означает фраза「${sub.ja}」?`,
      optionsRu: options,
      correctIndex: correctIdx,
    });
  }

  return questions;
}

// --- Grammar detection ---

const require = createRequire(import.meta.url);
const GRAMMAR_PATTERNS = require("./n1-grammar-patterns.cjs");

function detectGrammar(subtitles) {
  const found = new Map();
  for (const sub of subtitles) {
    if (sub.ja.length < 4) continue;
    for (const gp of GRAMMAR_PATTERNS) {
      if (gp.pattern.test(sub.ja)) {
        if (!found.has(gp.titleJa)) {
          found.set(gp.titleJa, { ...gp, examples: [] });
        }
        const entry = found.get(gp.titleJa);
        if (entry.examples.length < 3) {
          entry.examples.push(sub);
        }
      }
    }
  }

  const notes = [];
  for (const [, data] of found) {
    notes.push({
      titleJa: data.titleJa,
      titleRu: data.titleRu,
      level: "N1",
      structure: data.structure,
      explanationRu: data.explanationRu,
      examples: data.examples.map((ex) => ({
        ja: ex.ja,
        furigana: ex.furigana,
        ru: `(из видео, ${Math.floor(ex.startSec / 60)}:${String(Math.floor(ex.startSec % 60)).padStart(2, "0")})`,
      })),
      tip: data.tip,
    });
  }

  return notes.slice(0, 8);
}

// --- Main ---

const allFiles = readdirSync(KNY_DIR);
const srtFiles = allFiles
  .filter((f) => f.endsWith(".srt"))
  .sort((a, b) => {
    const numA = parseInt(a.match(/E(\d+)/)?.[1] ?? "0");
    const numB = parseInt(b.match(/E(\d+)/)?.[1] ?? "0");
    return numA - numB;
  });

console.log(`Found ${srtFiles.length} SRT files, ${MKV_FILES.length} MKV files`);

const lessons = [];

for (let i = 0; i < MKV_FILES.length; i++) {
  const epNum = i + 1;
  const epTag = `E${String(epNum).padStart(2, "0")}`;
  const srtFile = srtFiles.find((f) => f.includes(epTag));

  let subtitles = [];
  if (srtFile) {
    const srtPath = join(KNY_DIR, srtFile);
    const srtContent = readFileSync(srtPath, "utf-8");
    subtitles = parseSrt(srtContent);
  }

  const meta = EPISODE_TITLES[i] ?? {
    num: epNum,
    titleRu: `Серия ${epNum}: Клинок, рассекающий демонов`,
    descRu: `Серия ${epNum} аниме «Kimetsu no Yaiba».`,
  };

  const mkvFile = MKV_FILES[i];
  const questions = generateQuestions(subtitles, i);
  const grammarNotes = detectGrammar(subtitles);

  console.log(`Episode ${i + 1}: ${subtitles.length} subtitles, ${questions.length} questions, ${grammarNotes.length} grammar`);

  lessons.push({
    id: `n1-kny-s01e${String(i + 1).padStart(2, "0")}`,
    level: "N1",
    titleRu: meta.titleRu,
    descriptionRu: meta.descRu,
    videoFileName: mkvFile,
    subtitles,
    questions,
    grammarNotes,
  });
}

// Generate TypeScript file
let ts = `import type { Lesson } from "./content";\n\n`;
ts += `/**\n * Auto-generated from Kimetsu no Yaiba SRT files.\n */\n\n`;
ts += `export const KNY_VIDEO_DIR = ${JSON.stringify(KNY_DIR)};\n\n`;
ts += `export const KNY_SERIES_TITLE = "Клинок, рассекающий демонов (Kimetsu no Yaiba)";\n`;
ts += `export const KNY_SERIES_COVER = "/images/kny.jpg";\n\n`;
ts += `export const KNY_LESSONS: (Lesson & { videoFileName: string })[] = [\n`;

for (const lesson of lessons) {
  ts += `  {\n`;
  ts += `    id: ${JSON.stringify(lesson.id)},\n`;
  ts += `    level: "N1",\n`;
  ts += `    titleRu: ${JSON.stringify(lesson.titleRu)},\n`;
  ts += `    descriptionRu: ${JSON.stringify(lesson.descriptionRu)},\n`;
  ts += `    videoFileName: ${JSON.stringify(lesson.videoFileName)},\n`;
  ts += `    video: { type: "local", src: "/local-video/${encodeURIComponent(lesson.videoFileName)}" },\n`;
  ts += `    subtitles: [\n`;
  for (const s of lesson.subtitles) {
    ts += `      { startSec: ${s.startSec}, endSec: ${s.endSec}, ja: ${JSON.stringify(s.ja)}, furigana: ${JSON.stringify(s.furigana)} },\n`;
  }
  ts += `    ],\n`;
  ts += `    questions: [\n`;
  for (const q of lesson.questions) {
    ts += `      ${JSON.stringify(q)},\n`;
  }
  ts += `    ],\n`;
  if (lesson.grammarNotes && lesson.grammarNotes.length > 0) {
    ts += `    grammarNotes: [\n`;
    for (const g of lesson.grammarNotes) {
      ts += `      ${JSON.stringify(g)},\n`;
    }
    ts += `    ],\n`;
  }
  ts += `  },\n`;
}

ts += `];\n`;

const outPath = resolve(import.meta.dirname, "..", "lib", "kny-lessons.ts");
writeFileSync(outPath, ts, "utf-8");
console.log(`\nWritten to ${outPath}`);
console.log(`Total: ${lessons.length} lessons`);
