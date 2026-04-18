/**
 * Build script: reads ASS subtitle files from the Beastars S1 folder,
 * parses them, generates questions + grammar, and writes lib/beastars-lessons.ts.
 *
 * Usage: node scripts/build-beastars-lessons.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { createRequire } from "module";

const BS_DIR = "C:\\Users\\saeri\\Downloads\\BEASTARS\\Season 1";

const EPISODE_TITLES = [
  { num: 1, titleRu: "Серия 1: Луна и чудовище", descRu: "Убийство травоядного животного растревожило академию Черритон. Подозрение пало на серого волка Легоши. Карликовый кролик Хару борется с издевательствами одноклассников." },
  { num: 2, titleRu: "Серия 2: Важные птицы", descRu: "Легоши обдумывает свои свирепые действия; ссора за завтраком расстраивает его ещё больше. Студенты театра готовятся к спектаклю." },
  { num: 3, titleRu: "Серия 3: Рождение волка", descRu: "Общение Хару и Легоши заканчивается крайне неловко. За два дня до представления школьная газета выясняет, что скрывает Луи." },
  { num: 4, titleRu: "Серия 4: Отдать всего себя", descRu: "Театральный кружок меняет актёрский состав после последнего спектакля. Вышедший на сцену, Легоши сталкивается с новым ведущим актёром и опасной проблемой." },
  { num: 5, titleRu: "Серия 5: У каждого своя правда", descRu: "После последнего выступления Легоши получает дурную славу из-за хаотичной, но успешной игры при поддержке Джека. У Хару и Луи происходит тайная встреча." },
  { num: 6, titleRu: "Серия 6: Сон или реальность?", descRu: "После очередного убийства травоядные попадают в кампус. В городе хищники театрального кружка оказываются в тенистом районе для взрослых мясоедов." },
  { num: 7, titleRu: "Серия 7: Что таится внутри", descRu: "Тайна любимого обеда Легоши разгадана. Хару вспоминает свою первую встречу с уязвимым Луи, у которого, однако, есть невеста." },
  { num: 8, titleRu: "Серия 8: Будто травинка между клыков", descRu: "Легоши предлагает сопроводить Хару домой; по дороге она пытается подружиться с ним, не подозревая о его вине. Джуно раскрывает карты." },
  { num: 9, titleRu: "Серия 9: В логово льва", descRu: "Луи вспоминает своё душераздирающее прошлое, Легоши даёт личную клятву, несмотря на противоречивые чувства. Тем временем хищники похищают Хару, чтобы скормить главарю Сисигуми." },
  { num: 10, titleRu: "Серия 10: Волк в овечьей шкуре", descRu: "Легоши рискует своей жизнью, чтобы найти Сисигуми. Друг помогает ему контролировать своего внутреннего зверя, чтобы он мог спасти Хару." },
  { num: 11, titleRu: "Серия 11: Навстречу неоновым огням", descRu: "Свирепый Легоши сеет хаос, чтобы спасти Хару, в то время как неизвестный союзник помогает им сбежать. Впоследствии происходят некоторые неловкие ситуации." },
  { num: 12, titleRu: "Серия 12: После бури", descRu: "Хару и Легоши возвращаются в школу после странной ночи. Поскольку фестиваль начинается, Джуно бросает вызов Хару за привязанность Легоши." },
];

const MKV_FILES = [
  "[Erai-raws] Beastars - 01 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 02 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 03 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 04 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 05 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 06 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 07 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 08 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 09 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 10 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 11 [1080p][Multiple Subtitle].mkv",
  "[Erai-raws] Beastars - 12 [1080p][Multiple Subtitle].mkv",
];

// --- ASS parser ---

function assTimeToSeconds(time) {
  // ASS format: H:MM:SS.CC (centiseconds)
  const [h, m, rest] = time.split(":");
  const [s, cs] = rest.split(".");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(cs) / 100;
}

function parseAss(assContent) {
  const subtitles = [];
  const lines = assContent.split(/\r?\n/);

  const SFX = /^（[^）]*）$/;
  const MUSIC = /^[♪～♩♫♬\s]+$/;
  const SPEAKER = /^（[^）]+）/;
  const ASS_TAGS = /\{[^}]*\}/g;
  const FURI = /([一-龥々〇]+)\(([ぁ-んァ-ヶー]+)\)/g;

  for (const line of lines) {
    if (!line.startsWith("Dialogue:")) continue;

    const commaIdx = [];
    let idx = 0;
    for (let c = 0; c < 9 && idx < line.length; c++) {
      idx = line.indexOf(",", idx);
      if (idx === -1) break;
      commaIdx.push(idx);
      idx++;
    }
    if (commaIdx.length < 9) continue;

    const startStr = line.substring(commaIdx[0] + 1, commaIdx[1]).trim();
    const endStr = line.substring(commaIdx[1] + 1, commaIdx[2]).trim();
    let text = line.substring(commaIdx[8] + 1).trim();

    // Remove ASS formatting tags
    text = text.replace(ASS_TAGS, "");
    // Replace \N with space
    text = text.replace(/\\N/g, " ").replace(/\\n/g, " ").trim();

    if (!text) continue;

    const cleaned = text.trim();
    if (SFX.test(cleaned) || MUSIC.test(cleaned)) continue;
    // Remove speaker tags like (テム)
    let ja = cleaned.replace(SPEAKER, "").trim();
    // Remove remaining parenthetical sound effects
    ja = ja.replace(/（[^）]*）/g, "").trim();
    if (!ja || MUSIC.test(ja)) continue;
    if (ja.length < 2) continue;

    let furigana = text.replace(FURI, "$2").replace(SPEAKER, "").replace(/（[^）]*）/g, "").trim();
    if (!furigana) furigana = ja;

    subtitles.push({
      startSec: Math.round(assTimeToSeconds(startStr) * 100) / 100,
      endSec: Math.round(assTimeToSeconds(endStr) * 100) / 100,
      ja,
      furigana,
    });
  }

  // Sort by start time and deduplicate overlapping
  subtitles.sort((a, b) => a.startSec - b.startSec);
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
  const prefix = `n1-bs-${String(epIdx + 1).padStart(2, "0")}`;
  const questions = [];
  let qNum = 0;

  const dialogueSubs = subtitles.filter(
    (s) => s.ja.length > 3 && !s.ja.startsWith("♪") && !/^[ぁ-ん～…！？、。]+$/.test(s.ja),
  );
  if (dialogueSubs.length === 0) return [];

  const duration = subtitles[subtitles.length - 1]?.endSec ?? 1400;
  const targetCount = 7;
  const step = Math.max(150, duration / (targetCount + 1));
  const used = new Set();

  function findSubNear(targetSec) {
    let best = null;
    let bestDist = Infinity;
    for (const s of dialogueSubs) {
      const dist = Math.abs(s.startSec - targetSec);
      if (dist < bestDist) { bestDist = dist; best = s; }
    }
    if (best && used.has(best.startSec)) {
      const idx = dialogueSubs.indexOf(best);
      for (let offset = 1; offset < 5; offset++) {
        const next = dialogueSubs[idx + offset];
        if (next && !used.has(next.startSec)) return next;
      }
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

const allFiles = readdirSync(BS_DIR);
const assFiles = allFiles
  .filter((f) => f.endsWith(".ass"))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d{2})/)?.[1] ?? "0");
    const numB = parseInt(b.match(/(\d{2})/)?.[1] ?? "0");
    return numA - numB;
  });

console.log(`Found ${assFiles.length} ASS files, ${MKV_FILES.length} MKV files`);

const lessons = [];

for (let i = 0; i < MKV_FILES.length; i++) {
  const epNum = i + 1;
  const epNumStr = String(epNum).padStart(2, "0");
  const assFile = assFiles.find((f) => f.includes(`- ${epNumStr} `));

  let subtitles = [];
  if (assFile) {
    const assPath = join(BS_DIR, assFile);
    const assContent = readFileSync(assPath, "utf-8");
    subtitles = parseAss(assContent);
  }

  const meta = EPISODE_TITLES[i] ?? {
    num: epNum,
    titleRu: `Серия ${epNum}: Выдающиеся звери`,
    descRu: `Серия ${epNum} аниме «Beastars».`,
  };

  const mkvFile = MKV_FILES[i];
  const questions = generateQuestions(subtitles, i);
  const grammarNotes = detectGrammar(subtitles);

  console.log(`Episode ${epNum}: ${subtitles.length} subtitles, ${questions.length} questions, ${grammarNotes.length} grammar`);

  lessons.push({
    id: `n1-bs-s01e${epNumStr}`,
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
ts += `/**\n * Auto-generated from Beastars S1 ASS subtitle files.\n */\n\n`;
ts += `export const BS_VIDEO_DIR = ${JSON.stringify(BS_DIR)};\n\n`;
ts += `export const BS_SERIES_TITLE = "Выдающиеся звери (Beastars)";\n`;
ts += `export const BS_SERIES_COVER = "/images/beastars-cover.jpg";\n\n`;
ts += `export const BS_LESSONS: (Lesson & { videoFileName: string })[] = [\n`;

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

const outPath = resolve(import.meta.dirname, "..", "lib", "beastars-lessons.ts");
writeFileSync(outPath, ts, "utf-8");
console.log(`\nWritten to ${outPath}`);
console.log(`Total: ${lessons.length} lessons`);
