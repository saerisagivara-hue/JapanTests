import type { LessonQuestion, SubtitleLine } from "./content";

const KANJI_RE = /[一-龥々〇]/;
const KANJI_COMPOUND_RE = /[一-龥々〇]{2,}/g;

function hasKanji(text: string): boolean {
  return KANJI_RE.test(text);
}

function extractKanjiCompounds(text: string): string[] {
  return text.match(KANJI_COMPOUND_RE) ?? [];
}

function shuffleArray<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function splitToWords(ja: string): string[] {
  const cleaned = ja
    .replace(/[。、！？…～♪「」『』（）\s]+/g, " ")
    .trim();
  const words = cleaned.split(/\s+/).filter((w) => w.length > 0);
  return words;
}

const GRAMMAR_PATTERNS: { pattern: RegExp; nameRu: string; explanationRu: string }[] = [
  { pattern: /ざるを得ない/, nameRu: "～ざるを得ない", explanationRu: "Вынужден, не могу не..." },
  { pattern: /ないわけにはいかない/, nameRu: "～ないわけにはいかない", explanationRu: "Не могу не сделать..." },
  { pattern: /にほかならない/, nameRu: "～にほかならない", explanationRu: "Не что иное как..." },
  { pattern: /をもって/, nameRu: "～をもって", explanationRu: "Посредством, с помощью..." },
  { pattern: /からして/, nameRu: "～からして", explanationRu: "Судя уже по..." },
  { pattern: /にもかかわらず/, nameRu: "～にもかかわらず", explanationRu: "Несмотря на..." },
  { pattern: /ものの/, nameRu: "～ものの", explanationRu: "Хотя и..., но..." },
  { pattern: /とはいえ/, nameRu: "～とはいえ", explanationRu: "Хотя и говорят, что..., но..." },
  { pattern: /に違いない/, nameRu: "～に違いない", explanationRu: "Несомненно, наверняка..." },
  { pattern: /わけがない/, nameRu: "～わけがない", explanationRu: "Не может быть, чтобы..." },
  { pattern: /っぱなし/, nameRu: "～っぱなし", explanationRu: "Оставить как есть (забыть/бросить)" },
  { pattern: /てたまらない/, nameRu: "～てたまらない", explanationRu: "Невыносимо, ужасно..." },
  { pattern: /てならない/, nameRu: "～てならない", explanationRu: "Не могу удержаться от..." },
  { pattern: /をきっかけに/, nameRu: "～をきっかけに", explanationRu: "Воспользовавшись случаем..." },
  { pattern: /どころか/, nameRu: "～どころか", explanationRu: "Не то чтобы..., даже..." },
  { pattern: /くせに/, nameRu: "～くせに", explanationRu: "Хотя (с упрёком)..." },
  { pattern: /だらけ/, nameRu: "～だらけ", explanationRu: "Весь в / полно (негатив)..." },
  { pattern: /っぽい/, nameRu: "～っぽい", explanationRu: "Похоже на..., -оватый" },
  { pattern: /てしまう|ちゃう|ちまう/, nameRu: "～てしまう", explanationRu: "Совершить до конца / к сожалению..." },
  { pattern: /なければならない|なきゃ/, nameRu: "～なければならない", explanationRu: "Должен, обязан..." },
  { pattern: /ようとする/, nameRu: "～ようとする", explanationRu: "Пытаться сделать..." },
  { pattern: /ことにする/, nameRu: "～ことにする", explanationRu: "Решить сделать..." },
  { pattern: /ことになる/, nameRu: "～ことになる", explanationRu: "Получается, что..., было решено..." },
  { pattern: /わけだ/, nameRu: "～わけだ", explanationRu: "Вот почему, значит..." },
  { pattern: /はずだ/, nameRu: "～はずだ", explanationRu: "Должно быть, по идее..." },
  { pattern: /べきだ/, nameRu: "～べきだ", explanationRu: "Следует, должен..." },
];

function findGrammarInLine(ja: string): { nameRu: string; explanationRu: string } | null {
  for (const g of GRAMMAR_PATTERNS) {
    if (g.pattern.test(ja)) return { nameRu: g.nameRu, explanationRu: g.explanationRu };
  }
  return null;
}

interface GenerateOptions {
  episodeIndex: number;
  targetCount?: number;
  intervalSec?: number;
}

export function generateQuestionsFromSubtitles(
  subtitles: SubtitleLine[],
  opts: GenerateOptions,
): LessonQuestion[] {
  const { episodeIndex, targetCount = 7, intervalSec = 150 } = opts;
  const questions: LessonQuestion[] = [];
  const prefix = `q-${episodeIndex}`;
  let qIdx = 0;

  const dialogueSubs = subtitles.filter(
    (s) => s.ja.length > 3 && !s.ja.startsWith("♪") && !/^[ぁ-ん～…！？、。]+$/.test(s.ja),
  );

  if (dialogueSubs.length === 0) return [];

  const duration = subtitles[subtitles.length - 1]?.endSec ?? 1400;
  const step = Math.max(intervalSec, duration / (targetCount + 1));

  const usedTimes = new Set<number>();

  function findSubNear(targetSec: number): SubtitleLine | null {
    let best: SubtitleLine | null = null;
    let bestDist = Infinity;
    for (const s of dialogueSubs) {
      const dist = Math.abs(s.startSec - targetSec);
      if (dist < bestDist) {
        bestDist = dist;
        best = s;
      }
    }
    if (best && usedTimes.has(best.startSec)) {
      const idx = dialogueSubs.indexOf(best);
      for (let offset = 1; offset < 5; offset++) {
        const next = dialogueSubs[idx + offset];
        if (next && !usedTimes.has(next.startSec)) return next;
      }
    }
    return best;
  }

  for (let t = step; t < duration && questions.length < targetCount; t += step) {
    const sub = findSubNear(t);
    if (!sub) continue;
    usedTimes.add(sub.startSec);

    const atSec = Math.round(sub.endSec + 1);
    const qType = questions.length % 3;

    if (qType === 0) {
      const compounds = extractKanjiCompounds(sub.ja);
      if (compounds.length > 0) {
        const kanji = compounds[0];
        questions.push({
          id: `${prefix}-q${String(++qIdx).padStart(2, "0")}`,
          kind: "kanji_translate",
          atSec,
          promptRu: `Переведите кандзи「${kanji}」из фразы「${sub.ja}」`,
          kanji,
          acceptedRu: ["(введите перевод)"],
        });
        continue;
      }
    }

    if (qType === 1) {
      const words = splitToWords(sub.ja);
      if (words.length >= 3 && words.length <= 8) {
        const shuffled = shuffleArray(words, episodeIndex * 1000 + qIdx);
        const correctOrder = shuffled.map((w) => words.indexOf(w));
        const inverseOrder = correctOrder.map((_, i) => shuffled.indexOf(words[i]));

        questions.push({
          id: `${prefix}-q${String(++qIdx).padStart(2, "0")}`,
          kind: "word_order",
          atSec,
          promptRu: `Соберите фразу в правильном порядке`,
          words: shuffled,
          correctOrder: inverseOrder,
        });
        continue;
      }
    }

    const grammar = findGrammarInLine(sub.ja);
    const promptRu = grammar
      ? `Грамматика ${grammar.nameRu}: что означает「${sub.ja}」?`
      : `Что означает фраза「${sub.ja}」?`;

    const correctAnswer = grammar
      ? grammar.explanationRu
      : "Послушайте фразу и переведите";

    const wrongAnswers = [
      "Это приветствие",
      "Выражение извинения",
      "Просьба о помощи",
      "Прощание",
      "Выражение благодарности",
      "Отказ",
    ];

    const seed = episodeIndex * 100 + qIdx;
    const shuffledWrong = shuffleArray(wrongAnswers, seed).slice(0, 3);
    const correctIdx = seed % 4;
    const options = [...shuffledWrong];
    options.splice(correctIdx, 0, correctAnswer);

    questions.push({
      id: `${prefix}-q${String(++qIdx).padStart(2, "0")}`,
      kind: "listening_mcq",
      atSec,
      promptRu,
      optionsRu: options,
      correctIndex: correctIdx,
      explanationRu: grammar ? `${grammar.nameRu}: ${grammar.explanationRu}` : undefined,
    });
  }

  return questions;
}
