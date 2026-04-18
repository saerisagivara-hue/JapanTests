/**
 * Build script: reads SRT files from the Jujutsu Kaisen folder, parses them,
 * generates questions + grammar, and writes lib/jjk-lessons.ts.
 *
 * Usage: node scripts/build-jjk-lessons.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { createRequire } from "module";

const JJK_DIR = "C:\\Users\\saeri\\Downloads\\[Erai-raws] Jujutsu Kaisen - 01 ~ 24 [1080p][Multiple Subtitle]";

const EPISODE_TITLES = [
  { num: 1, titleRu: "Серия 1: Рёгомэн", descRu: "Юдзи Итадори, школьник с невероятной физической силой, находит проклятый палец Рёмэн Сукуны. Чтобы спасти друзей от проклятий, Юдзи проглатывает палец и становится сосудом для Короля Проклятий." },
  { num: 2, titleRu: "Серия 2: Для себя самого", descRu: "Юдзи приговорён к смерти, но Годзё Сатору предлагает альтернативу: Юдзи поглотит все двадцать пальцев Сукуны, после чего будет казнён, уничтожив Сукуну окончательно." },
  { num: 3, titleRu: "Серия 3: Девушка из стали", descRu: "Юдзи начинает обучение в Токийской магической школе. Он знакомится с Мэгуми Фусигуро и Нобарой Кугисаки, вместе они отправляются на первое задание." },
  { num: 4, titleRu: "Серия 4: Проклятое чрево", descRu: "Команда первогодок отправляется в центр заключения, где обнаруживается проклятие особого класса. Юдзи сталкивается с врагом, превосходящим его силы." },
  { num: 5, titleRu: "Серия 5: Проклятие, рождённое проклятием", descRu: "Юдзи жертвует собой ради спасения друзей. Сукуна временно получает контроль над телом и устраивает разрушение." },
  { num: 6, titleRu: "Серия 6: После дождя", descRu: "Все считают Юдзи мёртвым. Годзё решает тренировать его в тайне, чтобы подготовить к будущим битвам. Фусигуро и Кугисаки справляются с потерей по-своему." },
  { num: 7, titleRu: "Серия 7: Нападение", descRu: "Юдзи тренируется под руководством Годзё и учится управлять проклятой энергией, осваивая технику расходящегося кулака." },
  { num: 8, titleRu: "Серия 8: Скука", descRu: "Маги-первогодки из Токио и Киото знакомятся друг с другом. Тодо Аой, маг из Киото, нападает на Фусигуро, проверяя его силу." },
  { num: 9, titleRu: "Серия 9: Маленький рыбак", descRu: "Юдзи продолжает тренировки и смотрит фильмы с Годзё. Нанами Кэнто, маг первого класса, расследует серию убийств, связанных с проклятиями." },
  { num: 10, titleRu: "Серия 10: Школа настоящих мужчин", descRu: "Нанами сражается с Махито, проклятием, способным менять форму души. Юдзи присоединяется к расследованию." },
  { num: 11, titleRu: "Серия 11: Стечение обстоятельств", descRu: "Юдзи сталкивается с Дзюнпэем Ёсино, школьником, ставшим жертвой буллинга. Махито манипулирует Дзюнпэем, используя его гнев." },
  { num: 12, titleRu: "Серия 12: Подвести черту", descRu: "Дзюнпэй нападает на школу. Юдзи пытается остановить его и спасти, но Махито вмешивается, превращая Дзюнпэя в проклятие." },
  { num: 13, titleRu: "Серия 13: Ёдзо и соломенная кукла", descRu: "Юдзи в ярости сражается с Махито. Нанами приходит на помощь. Махито раскрывает своё доменное расширение, но Сукуна внутри Юдзи не позволяет ему трогать свою душу." },
  { num: 14, titleRu: "Серия 14: Столичный магический колледж — совместный учебный фестиваль, групповая битва 0", descRu: "Начинается совместный учебный фестиваль Токийской и Киотской школ магии. Командные сражения первогодок — старт соревнований." },
  { num: 15, titleRu: "Серия 15: Столичный магический колледж — совместный учебный фестиваль, групповая битва 1", descRu: "Тодо Аой из Киото находит Юдзи и вступает с ним в бой, спрашивая о типе женщин. Неожиданно они начинают сражаться плечом к плечу." },
  { num: 16, titleRu: "Серия 16: Столичный магический колледж — совместный учебный фестиваль, групповая битва 2", descRu: "Фусигуро раскрывает новую технику призыва Сики. Битвы между командами обеих школ разгораются с новой силой." },
  { num: 17, titleRu: "Серия 17: Столичный магический колледж — совместный учебный фестиваль, групповая битва 3", descRu: "На фестиваль нападают проклятия особого класса под руководством Махито и его союзников. Маги обеих школ вынуждены объединиться." },
  { num: 18, titleRu: "Серия 18: Мудрец", descRu: "Годзё Сатору сражается с Дзёго, проклятием вулканического типа, демонстрируя абсолютную мощь «Безграничного» и «Доменного расширения: Бесконечная Пустота»." },
  { num: 19, titleRu: "Серия 19: Чёрная вспышка", descRu: "Юдзи осваивает Чёрную вспышку в бою с Ханами, проклятием-деревом. Тодо помогает ему, используя свою технику «Буги-Вуги»." },
  { num: 20, titleRu: "Серия 20: Нормальность", descRu: "Финальная битва с Ханами. Годзё возвращается и одним ударом изгоняет вторгшиеся проклятия. Фестиваль завершается бейсбольным матчем." },
  { num: 21, titleRu: "Серия 21: Столичный магический колледж — совместный учебный фестиваль, групповая битва 4", descRu: "Мэй Мэй и Ниэ-сан разбирают итоги фестиваля. Гэто Сугуру появляется перед Годзё, намекая на грядущие планы." },
  { num: 22, titleRu: "Серия 22: Дверь в источник", descRu: "Юдзи, Фусигуро и Нобара отправляются на новое задание. Они сталкиваются с братьями-проклятиями — носителями Смертоносной живописи Сукуны." },
  { num: 23, titleRu: "Серия 23: Железный занавес", descRu: "Битва с братьями обостряется. Фусигуро оказывается в смертельной опасности и впервые задумывается о том, чтобы призвать «Восьмизнаковного божественного генерала: Макору»." },
  { num: 24, titleRu: "Серия 24: Выполнение", descRu: "Финальная схватка с братьями-проклятиями завершается. Итадори, Фусигуро и Кугисаки завершают задание, укрепив свою связь как команда. Тем временем, Гэто и его союзники готовят план «Сибуйского инцидента»." },
];

const MKV_FILES = [
  "[Erai-raws] Jujutsu Kaisen - 01 [1080p][Multiple Subtitle][863939DC].mkv",
  "[Erai-raws] Jujutsu Kaisen - 02 [1080p][Multiple Subtitle][45E09A9F].mkv",
  "[Erai-raws] Jujutsu Kaisen - 03 [1080p][Multiple Subtitle][A5CC6B0B].mkv",
  "[Erai-raws] Jujutsu Kaisen - 04 [1080p][Multiple Subtitle][571BB239].mkv",
  "[Erai-raws] Jujutsu Kaisen - 05 [1080p][Multiple Subtitle][AB3367AF].mkv",
  "[Erai-raws] Jujutsu Kaisen - 06 [1080p][Multiple Subtitle][1B6A7B3D].mkv",
  "[Erai-raws] Jujutsu Kaisen - 07 [1080p][Multiple Subtitle][4080E6B2].mkv",
  "[Erai-raws] Jujutsu Kaisen - 08 [1080p][Multiple Subtitle][1FC915FD].mkv",
  "[Erai-raws] Jujutsu Kaisen - 09 [1080p][Multiple Subtitle][83B91911].mkv",
  "[Erai-raws] Jujutsu Kaisen - 10 [1080p][Multiple Subtitle][31C58BAF].mkv",
  "[Erai-raws] Jujutsu Kaisen - 11 [1080p][Multiple Subtitle][2AC102E7].mkv",
  "[Erai-raws] Jujutsu Kaisen - 12 [1080p][Multiple Subtitle][E1F81818].mkv",
  "[Erai-raws] Jujutsu Kaisen - 13 [1080p][Multiple Subtitle][183702A6].mkv",
  "[Erai-raws] Jujutsu Kaisen - 14 [1080p][Multiple Subtitle][FE7E2F8A].mkv",
  "[Erai-raws] Jujutsu Kaisen - 15 [1080p][Multiple Subtitle][41D7CF2E].mkv",
  "[Erai-raws] Jujutsu Kaisen - 16 [1080p][Multiple Subtitle][03112BD0].mkv",
  "[Erai-raws] Jujutsu Kaisen - 17 [1080p][Multiple Subtitle][66454BA2].mkv",
  "[Erai-raws] Jujutsu Kaisen - 18 [1080p][Multiple Subtitle][7EF3612C].mkv",
  "[Erai-raws] Jujutsu Kaisen - 19 [1080p][Multiple Subtitle][3A3220DB].mkv",
  "[Erai-raws] Jujutsu Kaisen - 20 [1080p][Multiple Subtitle][103B977A].mkv",
  "[Erai-raws] Jujutsu Kaisen - 21 [1080p][Multiple Subtitle][66880660].mkv",
  "[Erai-raws] Jujutsu Kaisen - 22 [1080p][Multiple Subtitle][B09A1796].mkv",
  "[Erai-raws] Jujutsu Kaisen - 23 [1080p][Multiple Subtitle][B6522C66].mkv",
  "[Erai-raws] Jujutsu Kaisen - 24 [1080p][Multiple Subtitle][A075D7EF].mkv",
];

// --- SRT parser ---

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
  const prefix = `n1-jjk-${String(epIdx + 1).padStart(2, "0")}`;
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

// --- Grammar detection (N1 only) ---

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

const allFiles = readdirSync(JJK_DIR);
const srtFiles = allFiles
  .filter((f) => f.endsWith(".srt"))
  .sort((a, b) => {
    const numA = parseInt(a.match(/- (\d{2})/)?.[1] ?? "0");
    const numB = parseInt(b.match(/- (\d{2})/)?.[1] ?? "0");
    return numA - numB;
  });

console.log(`Found ${srtFiles.length} SRT files, ${MKV_FILES.length} MKV files`);

const lessons = [];

for (let i = 0; i < MKV_FILES.length; i++) {
  const epNum = i + 1;
  const epNumStr = String(epNum).padStart(2, "0");
  const srtFile = srtFiles.find((f) => f.includes(`- ${epNumStr} `) || f.includes(`- ${epNumStr} END`));

  let subtitles = [];
  if (srtFile) {
    const srtPath = join(JJK_DIR, srtFile);
    const srtContent = readFileSync(srtPath, "utf-8");
    subtitles = parseSrt(srtContent);
  }

  const meta = EPISODE_TITLES[i] ?? {
    num: epNum,
    titleRu: `Серия ${epNum}: Магическая битва`,
    descRu: `Серия ${epNum} аниме «Jujutsu Kaisen».`,
  };

  const mkvFile = MKV_FILES[i];
  const questions = generateQuestions(subtitles, i);
  const grammarNotes = detectGrammar(subtitles);

  console.log(`Episode ${epNum}: ${subtitles.length} subtitles, ${questions.length} questions, ${grammarNotes.length} grammar`);

  lessons.push({
    id: `n1-jjk-s01e${epNumStr}`,
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
ts += `/**\n * Auto-generated from Jujutsu Kaisen SRT subtitle files.\n */\n\n`;
ts += `export const JJK_VIDEO_DIR = ${JSON.stringify(JJK_DIR)};\n\n`;
ts += `export const JJK_SERIES_TITLE = "Магическая битва (Jujutsu Kaisen)";\n`;
ts += `export const JJK_SERIES_COVER = "/images/jjk-cover.jpg";\n\n`;
ts += `export const JJK_LESSONS: (Lesson & { videoFileName: string })[] = [\n`;

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

const outPath = resolve(import.meta.dirname, "..", "lib", "jjk-lessons.ts");
writeFileSync(outPath, ts, "utf-8");
console.log(`\nWritten to ${outPath}`);
console.log(`Total: ${lessons.length} lessons`);
