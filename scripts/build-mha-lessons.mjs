/**
 * Build script: reads SRT files from the MHA folder, parses them,
 * generates questions, and writes lib/mha-lessons.ts.
 *
 * Usage: node scripts/build-mha-lessons.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { createRequire } from "module";

const MHA_DIR = "C:\\Users\\saeri\\Downloads\\[FLE] Boku no Hero Academia - S01v2 (BD 1080p HEVC Opus) [Dual Audio]";

const EPISODE_TITLES = [
  { num: 1, titleRu: "Серия 1: Идзуку Мидория — Начало", descRu: "В мире, где большая часть населения одарена особыми силами, известных как «Причуды», Идзуку Мидория, молодой мальчик, который всегда мечтал стать героем, не имеет своей причуды. Однажды на него нападает злодей и его спасает Всемогущий, самый известный герой и кумир его детства." },
  { num: 2, titleRu: "Серия 2: Что нужно, чтобы стать героем", descRu: "Идзуку обнаруживает, что истинная форма Всемогущего это хилый, изможденный человек, который перенёс сильную травму несколько лет назад от могучего злодея. Всемогущий говорит Идзуку сдаться и сосредоточиться на другой, более реалистичной мечте. В печали Идзуку отправляется домой, но неожиданно становится свидетелем того, как на его одноклассника и вовсе хулигана Кацуки Бакуго нападает злодей. В тот момент, когда ни один из героев не смог помочь Кацуки, не подумав, Идзуку бросается на того самого злодея." },
  { num: 3, titleRu: "Серия 3: Рёв мышц", descRu: "После всех событий, Всемогущий говорит Идзуку, что его причуда Один за всех не обычна и передается она от человека к человеку. Так случилось, что Всемогущий теперь считает, что Идзуку достоин быть его наследником, но сейчас, если передать причуду, то тело хилого Идзуку просто разорвёт. Поэтому, Всемогущий тренирует десять месяцев Идзуку, чтобы он стал достойным сосудом, который сможет выдержать причуду." },
  { num: 4, titleRu: "Серия 4: Стартовая линия", descRu: "После получения от Всемогущего причуды, Идзуку пришло время для участия в отборочных экзаменах в престижную Академию для героев U.A. (далее Юэй). Однако, в ходе практического экзамена, Идзуку боится потерпеть неудачу, но его партнёрша оказывается в опасности и он спешит её спасти." },
  { num: 5, titleRu: "Серия 5: То, что я могу сделать сейчас", descRu: "Это первый день Идзуку как студента Юэй. Тем не менее, его учитель Сота Айдзава решает провести физический тест, чтобы оценить, как студенты используют свои причуды. Айдзава-сан угрожает худшему студенту по статистике изгнанием, и Идзуку обнаруживает себя в затруднительном положении, поскольку он до сих пор не научился контролировать свою причуду должным образом." },
  { num: 6, titleRu: "Серия 6: Ярость, ты, чёртов кретин", descRu: "Теперь надев свои костюмы героев, студенты были объединены в команды по двое и отправлены на тренировочную битву, чтобы проверить свои боевые способности. Идзуку в паре с Отяко Ураракой, девушкой, которой он помог во время вступительных экзаменов, которая также становится его другом, к его радости. Тем не менее, и к своему ужасу, один из его противников Бакуго, который всегда насмехался над Идзуку за его обычность, и теперь тот злится на героя." },
  { num: 7, titleRu: "Серия 7: Деку против Каччана", descRu: "Тренировочный бой продолжается, Идзуку едва сдерживает разрушительные нападения Бакуго, оставшаяся Отяко сталкивается с другим противником — Тэнья Идой. Идзуку кажется, не остается никакого выбора, кроме как использовать его причуду против Бакуго в попытке победить его, пока он не придумает идею получше." },
  { num: 8, titleRu: "Серия 8: Линия старта Бакуго", descRu: "После поражения против Идзуку в тренировочном бою, Бакуго наблюдает за остальными своими одноклассниками в действии и понимает, что ему всё ещё предстоит пройти долгий путь, чтобы стать сильнее своих сверстников. После восстановления от травм, Идзуку пытается подбодрить его, рассказав свою тайну тайны. В то же время, новости, что Всемогущий преподает в Юэй доходят до злодеев." },
  { num: 9, titleRu: "Серия 9: Да, просто сделай всё возможное, Ида!", descRu: "Идзуку выбран в качестве президента (старосты) класса, к его удивлению, всё заканчивается тем, что он отказывается от позиции в пользу Ида, также друзья находят Иду более подходящим для этой должности. Затем студенты переходят на другое поле упражнений, но до того, как они начнутся, орды злодеев внезапно появляются перед ними." },
  { num: 10, titleRu: "Серия 10: Встреча с неизвестным", descRu: "Злодеи используют свои силы, чтобы рассеять студентов по территории, дабы привлечь Всемогущего в ловушку. Идзуку окружили на лодке вместе со своими одноклассниками Цую Асуи и Минору Минэтой, но после того, как они рассказывают больше о своих силах друг другу, Идзуку приходит мысль как выбраться из ситуации, в то время как Иду выбирают оставшиеся, чтобы тот позвал на помощь." },
  { num: 11, titleRu: "Серия 11: Конец Игры", descRu: "Студенты борются за свою жизнь против Злодеев, в то время как Иде удаётся бежать с помощью своих друзей. После того, как злодеи узнают, что Ида предупредит других учителей, которые придут, чтобы остановить их, лидер злодеев Томура Сигараки решает убить Идзуку и его друзей просто для того, что бы сделать больно Всемогущему. Прежде чем они успевают хоть что-то сделать, Всемогущий сам появляется пред ними." },
  { num: 12, titleRu: "Серия 12: Всемогущий", descRu: "Сигараки использует своё секретное оружие, мульти-причудного монстра под названием Ному против Всемогущего, который держится до того, пока Идзуку и некоторые другие студенты прибывают, чтобы помочь ему, но у Всемогущего осталось мало времени, чтобы победить существо и защитить школу, прежде чем его способность разрядится." },
  { num: 13, titleRu: "Серия 13: В каждом из наших сердец", descRu: "Несмотря на то, что Всемогущий победил Ному, у него не осталось сил и он стал беззащитен против Сигараки, но Идзуку сумел затормозить противника на достаточно долгое время, для того, чтобы пришли другие учителя и заставить его отступить. После того, как оставшиеся Злодеи были захвачены, а студенты — спасены, Всемогущий поблагодарил Идзуку за спасение его жизни. Тем временем, Сигараки рассказывает своему хозяину о предположении, что их вражда против героев только начинается." },
];

const MKV_FILES = [
  "[FLE] Boku no Hero Academia - S01E01v2 (BD 1080p HEVC Opus) [Dual Audio] [7A762FFD].mkv",
  "[FLE] Boku no Hero Academia - S01E02v2 (BD 1080p HEVC Opus) [Dual Audio] [B4C2275E].mkv",
  "[FLE] Boku no Hero Academia - S01E03v2 (BD 1080p HEVC Opus) [Dual Audio] [BDFE2C4D].mkv",
  "[FLE] Boku no Hero Academia - S01E04v2 (BD 1080p HEVC Opus) [Dual Audio] [4B21CE25].mkv",
  "[FLE] Boku no Hero Academia - S01E05v2 (BD 1080p HEVC Opus) [Dual Audio] [A734F5C5].mkv",
  "[FLE] Boku no Hero Academia - S01E06v2 (BD 1080p HEVC Opus) [Dual Audio] [CAAAF88F].mkv",
  "[FLE] Boku no Hero Academia - S01E07v2 (BD 1080p HEVC Opus) [Dual Audio] [A27C530D].mkv",
  "[FLE] Boku no Hero Academia - S01E08v2 (BD 1080p HEVC Opus) [Dual Audio] [137647BA].mkv",
  "[FLE] Boku no Hero Academia - S01E09v2 (BD 1080p HEVC Opus) [Dual Audio] [40CCF765].mkv",
  "[FLE] Boku no Hero Academia - S01E10v2 (BD 1080p HEVC Opus) [Dual Audio] [1127D171].mkv",
  "[FLE] Boku no Hero Academia - S01E11v2 (BD 1080p HEVC Opus) [Dual Audio] [469FE176].mkv",
  "[FLE] Boku no Hero Academia - S01E12v2 (BD 1080p HEVC Opus) [Dual Audio] [78E975AD].mkv",
  "[FLE] Boku no Hero Academia - S01E13v2 (BD 1080p HEVC Opus) [Dual Audio] [135E11FE].mkv",
];

// --- SRT parser (duplicated from lib to avoid TS compilation) ---

function timeToSeconds(time) {
  const [h, m, rest] = time.split(":");
  const [s, ms] = rest.split(",");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
}

function parseSrt(srt) {
  const normalized = srt.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
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

// --- Question generator (simplified) ---

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
  const prefix = `n1-mha-${String(epIdx + 1).padStart(2, "0")}`;
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

const allFiles = readdirSync(MHA_DIR);
const srtFiles = allFiles
  .filter((f) => f.endsWith(".srt"))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d{3})/)?.[1] ?? "0");
    const numB = parseInt(b.match(/(\d{3})/)?.[1] ?? "0");
    return numA - numB;
  });

console.log(`Found ${srtFiles.length} SRT files, ${MKV_FILES.length} MKV files`);

const lessons = [];

for (let i = 0; i < MKV_FILES.length; i++) {
  const epNum = i + 1;
  const epNumStr = String(epNum).padStart(3, "0");
  const srtFile = srtFiles.find((f) => f.includes(epNumStr));

  let subtitles = [];
  if (srtFile) {
    const srtPath = join(MHA_DIR, srtFile);
    const srtContent = readFileSync(srtPath, "utf-8");
    subtitles = parseSrt(srtContent);
  }

  const meta = EPISODE_TITLES[i] ?? {
    num: epNum,
    titleRu: `Серия ${epNum}: Моя геройская академия`,
    descRu: `Серия ${epNum} аниме «Boku no Hero Academia».`,
  };

  const mkvFile = MKV_FILES[i];
  const questions = generateQuestions(subtitles, i);
  const grammarNotes = detectGrammar(subtitles);

  console.log(`Episode ${i + 1}: ${subtitles.length} subtitles, ${questions.length} questions, ${grammarNotes.length} grammar`);

  lessons.push({
    id: `n1-mha-s01e${String(i + 1).padStart(2, "0")}`,
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
ts += `/**\n * Auto-generated from MHA SRT files.\n * Video files are served from the original folder via Electron.\n */\n\n`;
ts += `export const MHA_VIDEO_DIR = ${JSON.stringify(MHA_DIR)};\n\n`;
ts += `export const MHA_SERIES_TITLE = "Моя геройская академия";\n`;
ts += `export const MHA_SERIES_COVER = "/images/mha-cover.jpg";\n\n`;
ts += `export const MHA_LESSONS: (Lesson & { videoFileName: string })[] = [\n`;

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

const outPath = resolve(import.meta.dirname, "..", "lib", "mha-lessons.ts");
writeFileSync(outPath, ts, "utf-8");
console.log(`\nWritten to ${outPath}`);
console.log(`Total: ${lessons.length} lessons`);
