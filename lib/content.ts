/*
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  ФАЙЛ КОНТЕНТА — ВСЕ УРОКИ, ВОПРОСЫ И ТЕСТЫ JLPT                 ║
 * ║                                                                    ║
 * ║  КАК РЕДАКТИРОВАТЬ:                                                ║
 * ║                                                                    ║
 * ║  1. Уроки — массивы N5_LESSONS, N4_LESSONS и т.д.                 ║
 * ║  2. JLPT-тесты — массив JLPT_TESTS                               ║
 * ║  3. Видео:                                                         ║
 * ║     • Локальное: { type: "local", src: "/videos/xxx.mp4" }        ║
 * ║     • YouTube:   { type: "youtube", youtubeId: "ID" }             ║
 * ║  4. Вопросы:                                                       ║
 * ║     • atSec — секунда, на которой видео остановится. ВАЖНО:        ║
 * ║       задание должно появляться ПОСЛЕ того, как прозвучала         ║
 * ║       релевантная фраза (atSec = endSec фразы + 1–2 сек буфер).    ║
 * ║     • kind: "listening_mcq" — выбор ответа                        ║
 * ║     • kind: "word_order" — расставить слова в порядке              ║
 * ║     • kind: "kanji_translate" — написать перевод кандзи            ║
 * ║  5. Субтитры (subtitles):                                          ║
 * ║     Формат:                                                        ║
 * ║     { startSec: 5, endSec: 9,                                     ║
 * ║       ja: "おひとりですか。",                                       ║
 * ║       furigana: "おひとり です か。" }                               ║
 * ║     ja — текст на японском (как в видео),                          ║
 * ║     furigana — чтение хираганой (расшифровка кандзи).              ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { N5_BATCH2 } from "./narezki-batch2-lessons";
import { N4_NEW } from "./narezki-custom-lessons";
import { N3N2_NEW } from "./n3n2-new-lessons";
import { NAREZKI_NEW } from "./narezki-new-lessons";
import { MHA_LESSONS } from "./mha-lessons";
import { BS_LESSONS } from "./beastars-lessons";
import { JJK_LESSONS } from "./jjk-lessons";
import { KNY_LESSONS } from "./kny-lessons";

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;
export type JLPTLevel = (typeof JLPT_LEVELS)[number];

export function isJlptLevel(value: string): value is JLPTLevel {
  return (JLPT_LEVELS as readonly string[]).includes(value);
}

export type LevelInfo = { id: JLPTLevel; titleRu: string; shortRu: string };

export const LEVELS: LevelInfo[] = [
  { id: "N5", titleRu: "N5 (начальный)", shortRu: "Азбуки, базовая лексика и простые диалоги." },
  { id: "N4", titleRu: "N4 (начальный+)", shortRu: "Больше кандзи, повседневные темы, базовые конструкции." },
  { id: "N3", titleRu: "N3 (средний)", shortRu: "Связная речь, тексты, грамматика уровня intermediate." },
  { id: "N2", titleRu: "N2 (выше среднего)", shortRu: "Новости/статьи, абстрактные темы, рабочий уровень." },
  { id: "N1", titleRu: "N1 (продвинутый)", shortRu: "Сложные тексты и быстрая речь, академические темы." },
];

// ─── Типы ───────────────────────────────────────────────────

type QB = { id: string; atSec: number; promptRu: string };

export type ListeningMcqQuestion = QB & {
  kind: "listening_mcq"; optionsRu: string[]; correctIndex: number; explanationRu?: string;
};
export type WordOrderQuestion = QB & {
  kind: "word_order"; words: string[]; correctOrder: number[]; explanationRu?: string;
};
export type KanjiTranslateQuestion = QB & {
  kind: "kanji_translate"; kanji: string; acceptedRu: string[]; hintRu?: string;
};
export type FillBlankQuestion = QB & {
  kind: "fill_blank";
  sentenceJa: string;
  blankIndex: number;
  acceptedAnswers: string[];
  explanationRu?: string;
};
export type NumberAudioQuestion = QB & {
  kind: "number_audio";
  audioText: string;
  acceptedAnswers: string[];
  explanationRu?: string;
};
export type DialogueAudioQuestion = QB & {
  kind: "dialogue_audio";
  dialogueLines: { speaker: string; ja: string }[];
  optionsRu: string[];
  correctIndex: number;
  explanationRu?: string;
};
export type LessonQuestion = ListeningMcqQuestion | WordOrderQuestion | KanjiTranslateQuestion | FillBlankQuestion | NumberAudioQuestion | DialogueAudioQuestion;

export type SubtitleLine = { startSec: number; endSec: number; ja: string; furigana: string };

export type VideoSource =
  | { type: "local"; src: string }
  | { type: "remote"; src: string }
  | { type: "youtube"; youtubeId: string; startSec?: number; endSec?: number };

export type GrammarNote = {
  titleJa: string;
  titleRu: string;
  level: string;
  structure: string;
  explanationRu: string;
  examples: { ja: string; furigana?: string; ru: string }[];
  tip?: string;
};

export type Lesson = {
  id: string; level: JLPTLevel; titleRu: string; descriptionRu: string;
  video: VideoSource;
  subtitles: SubtitleLine[];
  questions: LessonQuestion[];
  grammarNotes?: GrammarNote[];
};

// ═══════════════════════════════════════════════════════════════
//  N5 УРОКИ
//  Видео 1: Кафе (заказ напитков, размеры, оплата)
//  Видео 2: Диалог Маику и Канако (изучение японского, ました/ませんでした)
//  Видео 3: Конвейерные суши (еда, これ/それ/あれ, 一番)
//  Видео 4: Аниме Shirokuma Café (работа, дни недели, желания)
// ═══════════════════════════════════════════════════════════════

const N5_LESSONS: Lesson[] = [
  // ──────── Азбука: хирагана (первое видео в уровне) ────────
  {
    id: "n5-narezki-kana", level: "N5",
    titleRu: "Азбука: строки хираганы (быстрая проверка)",
    descriptionRu: "Мини‑ролик на закрепление: あいうえお / かきくけこ / さしすせそ / たちつてと / なにぬねの / はひふへほ / まみむめも / やゆよ / らりるれろ / わをん.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/narezki-05.mp4" },
    subtitles: [
      { startSec: 0, endSec: 7.4, ja: "あいうえお", furigana: "あ い う え お" },
      { startSec: 7.4, endSec: 11.7, ja: "かきくけこ / さしすせそ", furigana: "か き く け こ / さ し す せ そ" },
      { startSec: 11.7, endSec: 16.0, ja: "たちつてと / なにぬねの", furigana: "た ち つ て と / な に ぬ ね の" },
      { startSec: 16.0, endSec: 20.3, ja: "はひふへほ / まみむめも", furigana: "は ひ ふ へ ほ / ま み む め も" },
      { startSec: 20.4, endSec: 24.7, ja: "やゆよ / らりるれろ", furigana: "や ゆ よ / ら り る れ ろ" },
      { startSec: 24.7, endSec: 31.0, ja: "わをん", furigana: "わ を ん" },
    ],
    questions: [
      { id: "n5-kana-q01", kind: "listening_mcq", atSec: 8, promptRu: "Какой ряд хираганы идёт после あいうえお?", optionsRu: ["さしすせそ", "かきくけこ", "たちつてと", "なにぬねの"], correctIndex: 1 },
      { id: "n5-kana-q02", kind: "listening_mcq", atSec: 12, promptRu: "Как читается「し」?", optionsRu: ["chi", "shi", "si", "tsi"], correctIndex: 1 },
      { id: "n5-kana-q03", kind: "listening_mcq", atSec: 16, promptRu: "Как читается「つ」?", optionsRu: ["tu", "tsu", "su", "chu"], correctIndex: 1 },
      { id: "n5-kana-q04", kind: "listening_mcq", atSec: 20, promptRu: "Как читается「ふ」?", optionsRu: ["hu", "fu", "bu", "pu"], correctIndex: 1 },
      { id: "n5-kana-q05", kind: "listening_mcq", atSec: 25, promptRu: "Сколько строк в основной таблице хираганы (годзюон)?", optionsRu: ["5", "10", "15", "20"], correctIndex: 1, explanationRu: "10 рядов: あ, か, さ, た, な, は, ま, や, ら, わ." },
      { id: "n5-kana-q06", kind: "listening_mcq", atSec: 28, promptRu: "Что особенного в「を」?", optionsRu: ["Это гласная", "Используется только как частица", "Не существует", "Читается 'wo'"], correctIndex: 1, explanationRu: "を почти всегда используется только как частица прямого дополнения и произносится 'о'." },
    ],
    grammarNotes: [
      {
        titleJa: "は (частица)",
        titleRu: "Частица は — произношение «ва»",
        level: "N5",
        structure: "〔существительное〕＋ は ＋ …",
        explanationRu: "Хирагана「は」обычно читается как «ха», но когда она используется как частица (тема предложения), произносится «ва». Это одно из первых правил, которое нужно запомнить. Например, в「わたしは」частица は читается «ва», а не «ха». Не путайте с хираганой わ — это другой символ.",
        examples: [
          { ja: "わたしは学生です。", furigana: "わたし は がくせい です。", ru: "Я — студент. (は читается «ва»)" },
          { ja: "これはペンです。", furigana: "これ は ペン です。", ru: "Это — ручка. (は читается «ва»)" },
          { ja: "はなはきれいです。", furigana: "はな は きれい です。", ru: "Цветок красивый. (первое は = «ха» в слове, второе は = частица «ва»)" },
        ],
        tip: "Запомните: は как частица = «ва», は в составе слова = «ха». Аналогично: へ как частица = «э», а не «хэ».",
      },
      {
        titleJa: "長音（ちょうおん）",
        titleRu: "Долгие гласные в хирагане",
        level: "N5",
        structure: "あ段＋あ / い段＋い / う段＋う / え段＋い(え) / お段＋う(お)",
        explanationRu: "В хирагане долгие гласные обозначаются добавлением определённой буквы после слога. Для あ-ряда добавляют あ (おかあさん), для い-ряда — い (おにいさん), для う-ряда — う (くうき), для え-ряда — обычно い (せんせい), для お-ряда — обычно う (おとうさん). Долгота гласного меняет значение слова, поэтому это критически важно.",
        examples: [
          { ja: "おかあさん", furigana: "お か あ さ ん", ru: "Мама (долгое «а»: かあ)" },
          { ja: "おにいさん", furigana: "お に い さ ん", ru: "Старший брат (долгое «и»: にい)" },
          { ja: "おとうさん", furigana: "お と う さ ん", ru: "Папа (долгое «о»: とう)" },
        ],
        tip: "Сравните: おばさん (тётя) vs おばあさん (бабушка). Долгота гласного полностью меняет смысл!",
      },
      {
        titleJa: "を・ん",
        titleRu: "Особые хираганы: を и ん",
        level: "N5",
        structure: "〔существительное〕＋ を ＋ 〔глагол〕 / ん — носовой звук в конце слога",
        explanationRu: "「を」(читается «о») — используется почти исключительно как частица прямого дополнения. В современном японском を не встречается в начале слов. 「ん」— единственная хирагана, обозначающая согласный без гласного (носовой «н»). Она не может стоять в начале слова. Это две особые хираганы, которые завершают таблицу годзюон.",
        examples: [
          { ja: "パンを食べます。", furigana: "パン を たべます。", ru: "Ем хлеб. (を — частица объекта)" },
          { ja: "にほんごをべんきょうします。", furigana: "にほんご を べんきょう します。", ru: "Учу японский. (を — частица объекта)" },
          { ja: "にほん、さん、せんせい", furigana: "に ほ ん、さ ん、せ ん せ い", ru: "Япония, три, учитель (ん — носовой звук)" },
        ],
        tip: "を произносится как «о», но пишется отдельно от お. В ромадзи: を = wo (хотя звучит «о»). ん никогда не начинает слово.",
      },
    ],
  },

  // ──────── Песенка хираганы ────────
  {
    id: "n5-hiragana-song", level: "N5",
    titleRu: "Числа и счётчики (1–10)",
    descriptionRu: "Изучайте японские числа от 1 до 10, счётные суффиксы つ・本・匹 и базовый счёт через весёлую песню.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-hiragana-song.mp4" },
    subtitles: [
      { startSec: 0, endSec: 13, ja: "1,2,3,4,5,6,7,8,9,10", furigana: "1,2,3,4,5,6,7,8,9,10" },
      { startSec: 13, endSec: 20.9, ja: "1,2,3,4,5,6,7,8,9,10", furigana: "1,2,3,4,5,6,7,8,9,10" },
      { startSec: 20.9, endSec: 30.2, ja: "1つ2つ3つ", furigana: "1つ2つ3つ" },
      { startSec: 30.2, endSec: 35.9, ja: "4つ5つ6つ", furigana: "4つ5つ6つ" },
      { startSec: 35.9, endSec: 40.2, ja: "7つ8つ9つと", furigana: "7つ8つ9つと" },
      { startSec: 40.2, endSec: 43.5, ja: "1つください", furigana: "1つください" },
      { startSec: 43.5, endSec: 48.8, ja: "1本2本3本", furigana: "1本2本3本" },
      { startSec: 48.8, endSec: 54.5, ja: "4本 5本 6本", furigana: "4本 5本 6本" },
      { startSec: 54.5, endSec: 59.3, ja: "7本 8本 9本 10本", furigana: "7本 8本 9本 10本" },
      { startSec: 59.3, endSec: 62.1, ja: "1本ちょうだい", furigana: "1本ちょうだい" },
      { startSec: 62.1, endSec: 67.4, ja: "1匹 2匹 3匹", furigana: "1匹 2匹 3匹" },
      { startSec: 67.4, endSec: 72.7, ja: "4匹 5匹 6匹", furigana: "4匹 5匹 6匹" },
      { startSec: 72.7, endSec: 76.7, ja: "7匹 8匹 9匹", furigana: "7匹 8匹 9匹" },
      { startSec: 76.7, endSec: 79.2, ja: "1,2,3,4,5,6,7,8,9,10", furigana: "1,2,3,4,5,6,7,8,9,10" },
      { startSec: 79.2, endSec: 81.2, ja: "10匹", furigana: "10匹" },
      { startSec: 81.2, endSec: 89.7, ja: "1,2,3,4,5", furigana: "1,2,3,4,5" },
      { startSec: 89.7, endSec: 93.5, ja: "6,7,8,9,10", furigana: "6,7,8,9,10" },
      { startSec: 93.5, endSec: 97.5, ja: "1,2,3,4,5", furigana: "1,2,3,4,5" },
      { startSec: 97.5, endSec: 101.3, ja: "6,7,8,9,10", furigana: "6,7,8,9,10" },
      { startSec: 106.7, endSec: 136.7, ja: "ご視聴ありがとうございました", furigana: "ご視聴ありがとうございました" },
    ],
    questions: [
      { id: "n5-num-q01", kind: "listening_mcq", atSec: 15, promptRu: "Как читается число 4 по-японски (кунное чтение)?", optionsRu: ["し (shi)", "よん (yon)", "Оба варианта верны", "よ (yo)"], correctIndex: 2, explanationRu: "4 = し или よん. し избегают из-за созвучия со 死 (смерть), чаще используют よん." },
      { id: "n5-num-q02", kind: "listening_mcq", atSec: 32, promptRu: "Счётчик ～つ используется для:", optionsRu: ["Длинных предметов", "Общего счёта предметов", "Животных", "Людей"], correctIndex: 1, explanationRu: "～つ — универсальный счётчик для предметов (1つ, 2つ... 9つ, 10 — とお)." },
      { id: "n5-num-q03", kind: "listening_mcq", atSec: 45, promptRu: "Счётчик ～本（ほん）используется для:", optionsRu: ["Книг", "Длинных/цилиндрических предметов", "Плоских предметов", "Животных"], correctIndex: 1, explanationRu: "本 — для длинных предметов: ручки, бутылки, зонтики, деревья." },
      { id: "n5-num-q04", kind: "listening_mcq", atSec: 50, promptRu: "Как читается「3本」?", optionsRu: ["さんぼん", "さんほん", "さんぽん", "みほん"], correctIndex: 2, explanationRu: "3本 = さんぼん. Чтение 本 меняется: 1本(いっぽん), 2本(にほん), 3本(さんぼん)." },
      { id: "n5-num-q05", kind: "listening_mcq", atSec: 65, promptRu: "Счётчик ～匹（ひき）используется для:", optionsRu: ["Людей", "Мелких животных", "Книг", "Машин"], correctIndex: 1, explanationRu: "匹 — для мелких животных: кошки, собаки, рыбы, насекомые." },
      { id: "n5-num-q06", kind: "listening_mcq", atSec: 70, promptRu: "Как читается「6匹」?", optionsRu: ["ろくひき", "ろっぴき", "むひき", "むっぴき"], correctIndex: 1, explanationRu: "6匹 = ろっぴき. Чтение меняется: 1匹(いっぴき), 3匹(さんびき), 6匹(ろっぴき)." },
    ],
    grammarNotes: [
      {
        titleJa: "助数詞（じょすうし）",
        titleRu: "Счётные суффиксы (助数詞)",
        level: "N5",
        structure: "число + 助数詞",
        explanationRu: "В японском нельзя просто сказать «три кошки» — нужен счётный суффикс: 3匹の猫. Каждый суффикс используется для определённой категории предметов. Самые базовые: ～つ (универсальный), ～本 (длинные предметы), ～匹 (мелкие животные), ～人 (люди), ～枚 (плоские предметы).",
        examples: [
          { ja: "ペンを3本ください。", furigana: "ペン を さんぼん ください。", ru: "Дайте 3 ручки, пожалуйста." },
          { ja: "猫が2匹います。", furigana: "ねこ が にひき います。", ru: "Есть 2 кошки." },
          { ja: "りんごを5つ買いました。", furigana: "りんご を いつつ かいました。", ru: "Купил 5 яблок." },
        ],
        tip: "～つ работает для почти всего, если не знаете специальный счётчик. Но только до 9 (10 = とお).",
      },
    ],
  },

  // ──────── Песенка катаканы ────────
  {
    id: "n5-katakana-song", level: "N5",
    titleRu: "Песенка катаканы",
    descriptionRu: "Запоминайте катакану через песню! Весёлая мелодия поможет выучить все символы катаканы.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-katakana-song.mp4" },
    subtitles: [
      { startSec: 0, endSec: 6.1, ja: "アイウエオ", furigana: "アイウエオ" },
      { startSec: 30, endSec: 39.2, ja: "ラリルレロワオン 歌いましょう アイウエオ", furigana: "ラリルレロワオン 歌いましょう アイウエオ" },
      { startSec: 39.2, endSec: 43.1, ja: "カメラ", furigana: "カメラ" },
      { startSec: 43.1, endSec: 47.8, ja: "トイレ", furigana: "トイレ" },
      { startSec: 47.8, endSec: 57.8, ja: "アイウエオ 柿 クケコ サシ スセソ タチツテト", furigana: "アイウエオ 柿 クケコ サシ スセソ タチツテト" },
      { startSec: 57.8, endSec: 63.1, ja: "なみむねの はひくへほ", furigana: "なみむねの はひくへほ" },
      { startSec: 63.1, endSec: 67.5, ja: "まみむめも やゆよ", furigana: "まみむめも やゆよ" },
      { startSec: 67.5, endSec: 72.3, ja: "らりるれろわおん", furigana: "らりるれろわおん" },
      { startSec: 72.3, endSec: 77, ja: "うたいましょう あいうえお", furigana: "うたいましょう あいうえお" },
      { startSec: 77, endSec: 80.6, ja: "テニス", furigana: "テニス" },
      { startSec: 80.6, endSec: 85.3, ja: "ホテル", furigana: "ホテル" },
      { startSec: 87.8, endSec: 89.8, ja: "レモン", furigana: "レモン" },
      { startSec: 90.8, endSec: 97.8, ja: "あいうえお", furigana: "あいうえお" },
      { startSec: 98.6, endSec: 103.8, ja: "かきくけこ", furigana: "かきくけこ" },
      { startSec: 104.9, endSec: 107.8, ja: "さしすせそ", furigana: "さしすせそ" },
      { startSec: 109.6, endSec: 111.8, ja: "さちつてと", furigana: "さちつてと" },
      { startSec: 114.3, endSec: 116.8, ja: "なにぬねの", furigana: "なにぬねの" },
      { startSec: 117.8, endSec: 119.8, ja: "にぬねの", furigana: "にぬねの" },
      { startSec: 119.8, endSec: 121.8, ja: "はひふへほ", furigana: "はひふへほ" },
      { startSec: 121.8, endSec: 123.8, ja: "はひふへほ", furigana: "はひふへほ" },
      { startSec: 123.8, endSec: 125.8, ja: "まみむめも", furigana: "まみむめも" },
      { startSec: 125.8, endSec: 127.8, ja: "まみむめも", furigana: "まみむめも" },
      { startSec: 127.8, endSec: 129.8, ja: "やゆよ", furigana: "やゆよ" },
      { startSec: 129.8, endSec: 131.8, ja: "やゆよ", furigana: "やゆよ" },
      { startSec: 131.8, endSec: 133.8, ja: "やゆよ", furigana: "やゆよ" },
      { startSec: 133.8, endSec: 135.8, ja: "らりるれろ", furigana: "らりるれろ" },
      { startSec: 135.8, endSec: 137.8, ja: "らりるれろ", furigana: "らりるれろ" },
      { startSec: 137.8, endSec: 139.8, ja: "わおん", furigana: "わおん" },
      { startSec: 139.8, endSec: 141.8, ja: "わおん", furigana: "わおん" },
      { startSec: 141.8, endSec: 143.8, ja: "わおん", furigana: "わおん" },
      { startSec: 143.8, endSec: 156.2, ja: "イエーイアニメカラオケ", furigana: "イエーイアニメカラオケ" },
      { startSec: 156.2, endSec: 161.1, ja: "クリスマス", furigana: "クリスマス" },
      { startSec: 161.1, endSec: 166.6, ja: "アヒウエオ カキクケコ", furigana: "アヒウエオ カキクケコ" },
      { startSec: 166.6, endSec: 170.9, ja: "サシスセソ タチズテト", furigana: "サシスセソ タチズテト" },
      { startSec: 170.9, endSec: 180.4, ja: "なみむねの はひふへほ まみむねの やゆよ", furigana: "なみむねの はひふへほ まみむねの やゆよ" },
      { startSec: 180.4, endSec: 189.9, ja: "らりるれろ わおん うたいましょう あいうえお", furigana: "らりるれろ わおん うたいましょう あいうえお" },
      { startSec: 189.9, endSec: 204.4, ja: "かきくけこ かきくけこ", furigana: "かきくけこ かきくけこ" },
      { startSec: 204.4, endSec: 208.8, ja: "さしすせそ さじすせそ", furigana: "さしすせそ さじすせそ" },
      { startSec: 208.8, endSec: 213.8, ja: "たしすてと たじすてど", furigana: "たしすてと たじすてど" },
      { startSec: 213.8, endSec: 218.1, ja: "はひふへこ ばびるべこ", furigana: "はひふへこ ばびるべこ" },
      { startSec: 218.1, endSec: 227.6, ja: "ハヒフヘホ パリーフペポ 歌いましょう ガキグゲゴ", furigana: "ハヒフヘホ パリーフペポ 歌いましょう ガキグゲゴ" },
      { startSec: 227.6, endSec: 231.1, ja: "パス", furigana: "パス" },
      { startSec: 231.1, endSec: 236.1, ja: "パン", furigana: "パン" },
      { startSec: 236.1, endSec: 246.2, ja: "ガキグゲゴ ガキグゲゴ サシスセソ ザジズセソ", furigana: "ガキグゲゴ ガキグゲゴ サシスセソ ザジズセソ" },
      { startSec: 246.2, endSec: 251.5, ja: "たちつてと たちつてと", furigana: "たちつてと たちつてと" },
      { startSec: 251.5, endSec: 255.8, ja: "はひふへほ パリプペオ", furigana: "はひふへほ パリプペオ" },
      { startSec: 255.8, endSec: 260.8, ja: "はひふへほ パリプペオ", furigana: "はひふへほ パリプペオ" },
      { startSec: 260.8, endSec: 265.2, ja: "うたいましょう ガギグゲゴ", furigana: "うたいましょう ガギグゲゴ" },
      { startSec: 265.2, endSec: 268.9, ja: "テレビ", furigana: "テレビ" },
      { startSec: 268.9, endSec: 273.6, ja: "ピアノ", furigana: "ピアノ" },
      { startSec: 276.2, endSec: 278.2, ja: "ゴルフ", furigana: "ゴルフ" },
      { startSec: 284.2, endSec: 286.2, ja: "かきくけこ", furigana: "かきくけこ" },
      { startSec: 286.2, endSec: 288.2, ja: "かきくけこ", furigana: "かきくけこ" },
      { startSec: 288.2, endSec: 290.2, ja: "がきぐげご", furigana: "がきぐげご" },
      { startSec: 290.2, endSec: 292.2, ja: "がきぐげご", furigana: "がきぐげご" },
      { startSec: 292.2, endSec: 294.2, ja: "がきぐげご", furigana: "がきぐげご" },
      { startSec: 294.2, endSec: 307, ja: "さしすせそさしすせそさじずぜぞさじずでぞたちすてと", furigana: "さしすせそさしすせそさじずぜぞさじずでぞたちすてと" },
      { startSec: 307.6, endSec: 311.8, ja: "だじずでど", furigana: "だじずでど" },
      { startSec: 311.8, endSec: 315, ja: "はひふへほ", furigana: "はひふへほ" },
      { startSec: 315, endSec: 321.3, ja: "ばびぶべぼ", furigana: "ばびぶべぼ" },
      { startSec: 321.3, endSec: 323.7, ja: "はひふへほ", furigana: "はひふへほ" },
      { startSec: 323.7, endSec: 326.1, ja: "はひふへほ", furigana: "はひふへほ" },
      { startSec: 326.1, endSec: 328.4, ja: "パピプペポ", furigana: "パピプペポ" },
      { startSec: 328.4, endSec: 331.3, ja: "パピプペポ", furigana: "パピプペポ" },
      { startSec: 331.3, endSec: 340.8, ja: "パソコン", furigana: "パソコン" },
      { startSec: 340.8, endSec: 344.6, ja: "コンビニ", furigana: "コンビニ" },
      { startSec: 344.6, endSec: 349.5, ja: "プレゼント", furigana: "プレゼント" },
      { startSec: 349.5, endSec: 359.3, ja: "かきくけこ かきくけこ さしすせそ さじすせそ", furigana: "かきくけこ かきくけこ さしすせそ さじすせそ" },
      { startSec: 359.3, endSec: 368.7, ja: "たしすせそ さじすせそ はひふへこ パピプレボ", furigana: "たしすせそ さじすせそ はひふへこ パピプレボ" },
      { startSec: 368.7, endSec: 378, ja: "はひふへこ パピプレボ うたいましょ かきくけこ", furigana: "はひふへこ パピプレボ うたいましょ かきくけこ" },
      { startSec: 379.5, endSec: 387.3, ja: "にゃみゅみゅ", furigana: "にゃみゅみゅ" },
      { startSec: 387.3, endSec: 392.4, ja: "きゃきゅうきょん きゃきゅうきょん", furigana: "きゃきゅうきょん きゃきゅうきょん" },
      { startSec: 392.4, endSec: 397.1, ja: "しゃしゅうしょん じゃじゅうちょん", furigana: "しゃしゅうしょん じゃじゅうちょん" },
      { startSec: 397.1, endSec: 403.8, ja: "にゃみゅみゅ", furigana: "にゃみゅみゅ" },
      { startSec: 403.8, endSec: 419.1, ja: "シャツ", furigana: "シャツ" },
      { startSec: 419.1, endSec: 423.8, ja: "ジャム", furigana: "ジャム" },
      { startSec: 433.8, endSec: 435.8, ja: "先生の手首を縫ったら、 数字がаньとなり、", furigana: "先生の手首を縫ったら、 数字がаньとなり、" },
      { startSec: 435.8, endSec: 438.8, ja: "あとは Solと3つ分当たりしていきます。", furigana: "あとは Solと3つ分当たりしていきます。" },
      { startSec: 438.8, endSec: 441.9, ja: "実際、インの曲の編集さんが 初めてだと、", furigana: "実際、インの曲の編集さんが 初めてだと、" },
      { startSec: 441.9, endSec: 470, ja: "一 Century-Six milj奏を演じると、 私たちは感じて、そゅみょ りゃりゅりょ歌いましょう", furigana: "一 Century-Six milj奏を演じると、 私たちは感じて、そゅみょ りゃりゅりょ歌いましょう" },
      { startSec: 470, endSec: 471.7, ja: "ピャピュピョ", furigana: "ピャピュピョ" },
      { startSec: 471.7, endSec: 475.8, ja: "チャンス", furigana: "チャンス" },
      { startSec: 475.8, endSec: 480.9, ja: "キャンセル", furigana: "キャンセル" },
      { startSec: 480.9, endSec: 485.6, ja: "ピカチュウ", furigana: "ピカチュウ" },
      { startSec: 491.6, endSec: 492.2, ja: "キャキュキョ", furigana: "キャキュキョ" },
      { startSec: 492.2, endSec: 498.1, ja: "シャシュショ", furigana: "シャシュショ" },
      { startSec: 498.1, endSec: 507.5, ja: "にゃにゅにょ", furigana: "にゃにゅにょ" },
      { startSec: 507.5, endSec: 509.9, ja: "さひゅひょ", furigana: "さひゅひょ" },
      { startSec: 509.9, endSec: 516.1, ja: "にゃみゅみょ", furigana: "にゃみゅみょ" },
      { startSec: 516.1, endSec: 518.2, ja: "にゃにゅにょ", furigana: "にゃにゅにょ" },
      { startSec: 518.2, endSec: 519.3, ja: "やりよう", furigana: "やりよう" },
      { startSec: 519.3, endSec: 521.7, ja: "イエーイ", furigana: "イエーイ" },
      { startSec: 521.7, endSec: 527.9, ja: "キャラメル", furigana: "キャラメル" },
      { startSec: 527.9, endSec: 532.9, ja: "チャレンジ", furigana: "チャレンジ" },
      { startSec: 532.9, endSec: 537.3, ja: "ジョギング", furigana: "ジョギング" },
      { startSec: 537.3, endSec: 540, ja: "キャキュキョ", furigana: "キャキュキョ" },
      { startSec: 540, endSec: 542.5, ja: "キャキュキョ", furigana: "キャキュキョ" },
      { startSec: 542.5, endSec: 544.7, ja: "シャシュショ", furigana: "シャシュショ" },
      { startSec: 544.7, endSec: 547.1, ja: "ジャチュチョ", furigana: "ジャチュチョ" },
      { startSec: 577.1, endSec: 580.5, ja: "キャピチョ ミャミュミョ ヤリュリョ", furigana: "キャピチョ ミャミュミョ ヤリュリョ" },
      { startSec: 580.5, endSec: 584.7, ja: "歌いましょう キャキューキョ", furigana: "歌いましょう キャキューキョ" },
      { startSec: 600, endSec: 610.8, ja: "チャンネル登録をお願いいたします", furigana: "チャンネル登録をお願いいたします" },
    ],
    questions: [
      { id: "n5-kata-q01", kind: "listening_mcq", atSec: 250, promptRu: "Катакана используется в основном для:", optionsRu: ["Японских слов", "Иностранных слов и названий", "Грамматических частиц", "Глаголов"], correctIndex: 1 },
      { id: "n5-kata-q02", kind: "listening_mcq", atSec: 270, promptRu: "「ゴルフ」— это:", optionsRu: ["Гольф", "Волк", "Гонка", "Горка"], correctIndex: 0 },
      { id: "n5-kata-q03", kind: "listening_mcq", atSec: 340, promptRu: "「コンビニ」— это сокращение от:", optionsRu: ["Комбайн", "Конвейер", "Конвиниенс стор (convenience store)", "Коммуникация"], correctIndex: 2, explanationRu: "コンビニ от англ. convenience store — магазин у дома, работающий 24/7." },
      { id: "n5-kata-q04", kind: "listening_mcq", atSec: 350, promptRu: "「プレゼント」означает:", optionsRu: ["Презентация", "Подарок", "Президент", "Приз"], correctIndex: 1 },
      { id: "n5-kata-q05", kind: "listening_mcq", atSec: 420, promptRu: "Как записать «шатсу» (рубашка) катаканой?", optionsRu: ["シャツ", "サツ", "シヤツ", "ジャツ"], correctIndex: 0, explanationRu: "シャツ (shatsu) от англ. shirt. シャ — это комбинация ши+я (拗音)." },
      { id: "n5-kata-q06", kind: "listening_mcq", atSec: 475, promptRu: "「チャンス」означает:", optionsRu: ["Чай", "Танец", "Шанс", "Сдача"], correctIndex: 2 },
      { id: "n5-kata-q07", kind: "listening_mcq", atSec: 485, promptRu: "「ピカチュウ」записывается катаканой, потому что:", optionsRu: ["Это иностранное слово", "Это имя персонажа / звукоподражание", "Это глагол", "Это ошибка"], correctIndex: 1, explanationRu: "Катакана используется не только для иностранных слов, но и для имён персонажей, звукоподражаний и акцента." },
    ],
    grammarNotes: [
      {
        titleJa: "カタカナ",
        titleRu: "Катакана — когда использовать",
        level: "N5",
        structure: "Иностранные слова, имена, звукоподражания → カタカナ",
        explanationRu: "Катакана используется для: 1) иностранных заимствований (コーヒー, パソコン), 2) иностранных имён (マイク, アンナ), 3) звукоподражаний (ワンワン — гав-гав), 4) научных терминов, 5) для акцента/выделения (как курсив). Каждый символ катаканы имеет пару в хирагане: ア=あ, カ=か, サ=さ.",
        examples: [
          { ja: "パソコン", furigana: "パソコン", ru: "Компьютер (от personal computer)" },
          { ja: "キャラメル", furigana: "キャラメル", ru: "Карамель" },
          { ja: "ジョギング", furigana: "ジョギング", ru: "Джоггинг (бег)" },
        ],
        tip: "Длинные гласные в катакане обозначаются чертой ー: コーヒー (koohii), ケーキ (keeki).",
      },
      {
        titleJa: "拗音（ようおん）",
        titleRu: "Комбинированные звуки (拗音): キャ, シュ, チョ...",
        level: "N5",
        structure: "Большой символ + маленький ャ/ュ/ョ",
        explanationRu: "拗音 — это комбинированные звуки, где к основному символу добавляется маленький ャ, ュ или ョ. Например: キ+ャ=キャ (kya), シ+ュ=シュ (shu), チ+ョ=チョ (cho). Маленький символ пишется меньше обычного. Эти звуки очень важны для правильного произношения заимствованных слов.",
        examples: [
          { ja: "キャンセル", furigana: "キャンセル", ru: "Отмена (cancel)" },
          { ja: "シャツ", furigana: "シャツ", ru: "Рубашка (shirt)" },
          { ja: "チョコレート", furigana: "チョコレート", ru: "Шоколад (chocolate)" },
        ],
        tip: "Обратите внимание на размер: シヤ (ши-я, 2 слога) ≠ シャ (ша, 1 слог). Маленький ャ — это 拗音.",
      },
    ],
  },

  // ──────── ВИДЕО 1: КАФЕ — заказ, размеры, оплата ────────
  {
    id: "n5-cafe", level: "N5",
    titleRu: "В кафе: заказ напитков и оплата",
    descriptionRu: "Диалог в кафе: приветствие, выбор из меню, размеры S/M/L, оплата. Грамматика: お願いします, どちら/どれ, かしこまりました.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-cafe.mp4" },
    subtitles: [
      { startSec: 0, endSec: 8, ja: "いらっしゃいませ。おひとりですか？", furigana: "いらっしゃいませ。おひとり です か？" },
      { startSec: 8, endSec: 13, ja: "はい、こちらの席にどうぞ。", furigana: "はい、こちら の せき に どうぞ。" },
      { startSec: 13, endSec: 18, ja: "メニューがたくさんある。", furigana: "メニュー が たくさん ある。" },
      { startSec: 18, endSec: 22, ja: "ご注文はお決まりですか？", furigana: "ごちゅうもん は おきまり です か？" },
      { startSec: 22, endSec: 26, ja: "すいません。まだ決めてないです。", furigana: "すいません。まだ きめて ない です。" },
      { startSec: 26, endSec: 29, ja: "おすすめは何ですか？", furigana: "おすすめ は なん です か？" },
      { startSec: 29, endSec: 33, ja: "抹茶とコーヒーが人気です。", furigana: "まっちゃ と コーヒー が にんき です。" },
      { startSec: 33, endSec: 36, ja: "抹茶でお願いします。", furigana: "まっちゃ で おねがいします。" },
      { startSec: 36, endSec: 40, ja: "アイスとホットどちらにしますか？", furigana: "アイス と ホット どちら に します か？" },
      { startSec: 40, endSec: 43, ja: "アイスでお願いします。", furigana: "アイス で おねがいします。" },
      { startSec: 43, endSec: 49, ja: "サイズはS、M、Lのどれにしますか？", furigana: "サイズ は S、M、L の どれ に します か？" },
      { startSec: 49, endSec: 52, ja: "Lサイズでお願いします。", furigana: "L サイズ で おねがいします。" },
      { startSec: 53, endSec: 59, ja: "Lサイズはかなり大きいですが、大丈夫ですか？", furigana: "L サイズ は かなり おおきい です が、だいじょうぶ です か？" },
      { startSec: 59, endSec: 62, ja: "どれくらい大きいですか？", furigana: "どれくらい おおきい です か？" },
      { startSec: 62, endSec: 65, ja: "あれがLサイズです。", furigana: "あれ が L サイズ です。" },
      { startSec: 65, endSec: 68, ja: "すごく大きいですね。", furigana: "すごく おおきい です ね。" },
      { startSec: 68, endSec: 71, ja: "Sサイズでお願いします。", furigana: "S サイズ で おねがいします。" },
      { startSec: 71, endSec: 73, ja: "かしこまりました。", furigana: "かしこまりました。" },
      { startSec: 73, endSec: 77, ja: "少々お待ちください。", furigana: "しょうしょう おまちください。" },
      { startSec: 77, endSec: 80, ja: "お待たせいたしました。", furigana: "おまたせいたしました。" },
      { startSec: 80, endSec: 83, ja: "こちら抹茶になります。", furigana: "こちら まっちゃ に なります。" },
      { startSec: 83, endSec: 85, ja: "ありがとうございます。", furigana: "ありがとう ございます。" },
      { startSec: 85, endSec: 90, ja: "すいません。お会計をお願いします。", furigana: "すいません。おかいけい を おねがいします。" },
      { startSec: 90, endSec: 92, ja: "かしこまりました。", furigana: "かしこまりました。" },
      { startSec: 92, endSec: 96, ja: "合計500円になります。", furigana: "ごうけい ごひゃくえん に なります。" },
      { startSec: 96, endSec: 99, ja: "こちらでお願いします。", furigana: "こちら で おねがいします。" },
      { startSec: 101, endSec: 104, ja: "ありがとうございました。", furigana: "ありがとう ございました。" },
    ],
    /* atSec = ПОСЛЕ релевантной фразы (endSec + 1–2 сек) */
    questions: [
      { id: "c01", kind: "listening_mcq", atSec: 9, promptRu: "Что спрашивает продавец фразой「おひとりですか？」?", optionsRu: ["Вы голодны?", "Вы один?", "Что будете заказывать?", "У вас есть бронь?"], correctIndex: 1, explanationRu: "おひとり = один человек (вежливо), ですか = вопросительная частица." },
      { id: "c02", kind: "listening_mcq", atSec: 23, promptRu: "Что означает「ご注文はお決まりですか？」?", optionsRu: ["Вы готовы к оплате?", "Вы уже решили заказ?", "Вам нужно меню?", "Хотите десерт?"], correctIndex: 1, explanationRu: "ご注文 = заказ, お決まり = решено." },
      { id: "c03", kind: "word_order", atSec: 27, promptRu: "Соберите фразу из видео: «Ещё не решил.»", words: ["です", "決めてない", "まだ"], correctOrder: [2, 1, 0], explanationRu: "まだ決めてないです — ещё не решил." },
      { id: "c04", kind: "listening_mcq", atSec: 34, promptRu: "Что популярно в этом кафе, по словам продавца?", optionsRu: ["Чай и сок", "Матча и кофе", "Молоко и какао", "Вода и сок"], correctIndex: 1, explanationRu: "抹茶とコーヒーが人気です = Матча и кофе популярны." },
      { id: "c05", kind: "kanji_translate", atSec: 34, promptRu: "Переведите「人気」.", kanji: "人気", acceptedRu: ["популярный", "популярность", "популярно"] },
      { id: "c06", kind: "listening_mcq", atSec: 41, promptRu: "「どちらにしますか？」используют, когда выбирают из:", optionsRu: ["Одного варианта", "Двух вариантов", "Трёх и более", "Неважно сколько"], correctIndex: 1, explanationRu: "どちら = который из двух. Для 3+ используют どれ." },
      { id: "c07", kind: "listening_mcq", atSec: 50, promptRu: "「どれにしますか？」используют, когда выбирают из:", optionsRu: ["Одного", "Двух", "Трёх и более", "Неважно"], correctIndex: 2 },
      { id: "c08", kind: "word_order", atSec: 50, promptRu: "Соберите из видео: «Какой размер: S, M, L?»", words: ["しますか", "に", "どれ", "の", "S、M、L", "は", "サイズ"], correctOrder: [6, 5, 4, 3, 2, 1, 0], explanationRu: "サイズはS、M、Lのどれにしますか？" },
      { id: "c09", kind: "kanji_translate", atSec: 63, promptRu: "Переведите「大きい」.", kanji: "大きい", acceptedRu: ["большой", "крупный"] },
      { id: "c10", kind: "listening_mcq", atSec: 72, promptRu: "Какой размер в итоге заказал клиент?", optionsRu: ["L", "M", "S", "Отказался"], correctIndex: 2, explanationRu: "Сначала попросил L, увидел что слишком большой, и заказал S." },
      { id: "c11", kind: "listening_mcq", atSec: 74, promptRu: "Что означает「かしこまりました」?", optionsRu: ["Извините", "Понял (вежливо)", "Спасибо", "До свидания"], correctIndex: 1, explanationRu: "かしこまりました — вежливая форма 分かりました, используется в сфере обслуживания." },
      { id: "c12", kind: "word_order", atSec: 78, promptRu: "Соберите: «Подождите, пожалуйста.»", words: ["ください", "お待ち", "少々"], correctOrder: [2, 1, 0], explanationRu: "少々お待ちください。" },
      { id: "c13", kind: "kanji_translate", atSec: 91, promptRu: "Переведите「お会計」.", kanji: "会計", acceptedRu: ["счёт", "оплата", "расчёт", "чек"] },
      { id: "c14", kind: "listening_mcq", atSec: 97, promptRu: "Сколько стоил заказ?", optionsRu: ["300 иен", "500 иен", "1000 иен", "5500 иен"], correctIndex: 1, explanationRu: "合計500円 = итого 500 иен." },
      { id: "c15", kind: "kanji_translate", atSec: 97, promptRu: "Переведите「合計」.", kanji: "合計", acceptedRu: ["итого", "всего", "сумма"] },
      { id: "c16", kind: "word_order", atSec: 91, promptRu: "Соберите: «Счёт, пожалуйста.»", words: ["お願いします", "を", "お会計"], correctOrder: [2, 1, 0], explanationRu: "お会計をお願いします。" },
    ],
    grammarNotes: [
      {
        titleJa: "お願いします",
        titleRu: "Пожалуйста (вежливая просьба)",
        level: "N5",
        structure: "〔существительное〕＋で／を ＋ お願いします",
        explanationRu: "「お願いします」— универсальная вежливая формула просьбы. Дословно: «прошу вас». Используется при заказе в кафе, магазине, на работе — везде, где нужно что-то попросить. Перед ней ставится существительное с частицей で (выбор) или を (объект). Например, «抹茶でお願いします» = «Матчу, пожалуйста» (я выбираю матчу).",
        examples: [
          { ja: "抹茶でお願いします。", furigana: "まっちゃ で おねがいします。", ru: "Матчу, пожалуйста." },
          { ja: "お会計をお願いします。", furigana: "おかいけい を おねがいします。", ru: "Счёт, пожалуйста." },
          { ja: "Sサイズでお願いします。", furigana: "S サイズ で おねがいします。", ru: "Размер S, пожалуйста." },
          { ja: "こちらでお願いします。", furigana: "こちら で おねがいします。", ru: "Вот этим (оплачу), пожалуйста." },
        ],
        tip: "「で」 при заказе указывает на выбор из вариантов, а 「を」 — на конкретный объект просьбы.",
      },
      {
        titleJa: "どちら vs どれ",
        titleRu: "Который из двух / который из трёх и более",
        level: "N5",
        structure: "どちら（2 варианта）/ どれ（3+ вариантов）＋ にしますか",
        explanationRu: "「どちら」используется, когда выбирают из двух вариантов: «Лёд или горячий?». 「どれ」— когда вариантов три и больше: «S, M или L?». Оба слова сочетаются с «にしますか» (что выберете?). Это важное различие, которое часто встречается в повседневных ситуациях — в кафе, магазинах, ресторанах.",
        examples: [
          { ja: "アイスとホット、どちらにしますか？", furigana: "アイス と ホット、どちら に します か？", ru: "Лёд или горячий — что выберете?" },
          { ja: "S、M、Lのどれにしますか？", furigana: "S、M、L の どれ に します か？", ru: "S, M, L — какой выберете?" },
          { ja: "紅茶とコーヒー、どちらがいいですか？", furigana: "こうちゃ と コーヒー、どちら が いい です か？", ru: "Чай или кофе — что лучше?" },
        ],
        tip: "Запомните: どちら = 2 (「二」つ), どれ = 3+ (「たくさん」).",
      },
      {
        titleJa: "～をください",
        titleRu: "Дайте мне ~, пожалуйста",
        level: "N5",
        structure: "〔существительное〕＋ を ＋ ください",
        explanationRu: "「～をください」— вежливая просьба дать что-то. ください — форма от くださる (давать, уважительно). Перед ним ставится существительное с частицей を. Это одна из первых фраз, которую учат для повседневной жизни в Японии: в кафе, магазинах, ресторанах. Можно также использовать с указательными местоимениями: これをください = «дайте это».",
        examples: [
          { ja: "抹茶をください。", furigana: "まっちゃ を ください。", ru: "Матчу, пожалуйста." },
          { ja: "お水をください。", furigana: "おみず を ください。", ru: "Воды, пожалуйста." },
          { ja: "メニューをください。", furigana: "メニュー を ください。", ru: "Меню, пожалуйста." },
        ],
        tip: "ください = дайте конкретный предмет. お願いします = прошу (более широко, можно без を).",
      },
    ],
  },

  // ──────── ВИДЕО 2: МАИКУ И КАНАКО — ました/ませんでした, распорядок дня ────────
  {
    id: "n5-dialogue", level: "N5",
    titleRu: "Диалог: изучение японского, ました/ませんでした",
    descriptionRu: "Маику и Канако обсуждают учёбу. Грамматика: ました vs ませんでした, 毎日, 何時に. げんき гл. 3–4.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-dialogue.mp4" },
    subtitles: [
      { startSec: 13, endSec: 15, ja: "マイクさん、こんにちは。", furigana: "マイク さん、こんにちは。" },
      { startSec: 15, endSec: 17, ja: "こんにちは、カナコさん。", furigana: "こんにちは、カナコ さん。" },
      { startSec: 17, endSec: 20, ja: "今何をしていますか？", furigana: "いま なに を して います か？" },
      { startSec: 20, endSec: 23, ja: "日本語の勉強をしています。", furigana: "にほんご の べんきょう を して います。" },
      { startSec: 23, endSec: 26, ja: "昨日の宿題が難しかったです。", furigana: "きのう の しゅくだい が むずかしかった です。" },
      { startSec: 26, endSec: 31, ja: "そうですか？どの文法が難しかったですか？", furigana: "そう です か？ どの ぶんぽう が むずかしかった です か？" },
      { startSec: 31, endSec: 36, ja: "ましたとませんでしたの違いがまだよくわかりません。", furigana: "ました と ませんでした の ちがい が まだ よく わかりません。" },
      { startSec: 36, endSec: 41, ja: "例えば、私はパンを食べました。", furigana: "たとえば、わたし は パン を たべました。" },
      { startSec: 44, endSec: 48, ja: "私はパンを食べませんでした。", furigana: "わたし は パン を たべませんでした。" },
      { startSec: 53, endSec: 58, ja: "ではコーヒーを飲みました。", furigana: "では コーヒー を のみました。" },
      { startSec: 61, endSec: 64, ja: "コーヒーを飲みませんでした。", furigana: "コーヒー を のみませんでした。" },
      { startSec: 68, endSec: 72, ja: "そうそう、マイクさん上手ですね。", furigana: "そうそう、マイク さん じょうず です ね。" },
      { startSec: 72, endSec: 75, ja: "いえ、まだまだです。", furigana: "いえ、まだまだ です。" },
      { startSec: 75, endSec: 78, ja: "でも日本語はとても面白いです。", furigana: "でも にほんご は とても おもしろい です。" },
      { startSec: 79, endSec: 81, ja: "嬉しいです。", furigana: "うれしい です。" },
      { startSec: 81, endSec: 85, ja: "マイクさんは毎日日本語を勉強しますか？", furigana: "マイク さん は まいにち にほんご を べんきょう します か？" },
      { startSec: 86, endSec: 89, ja: "毎日一時間勉強します。", furigana: "まいにち いちじかん べんきょう します。" },
      { startSec: 89, endSec: 92, ja: "学校の後、家でも勉強します。", furigana: "がっこう の あと、いえ でも べんきょう します。" },
      { startSec: 94, endSec: 98, ja: "今日は何時に学校へ来ましたか？", furigana: "きょう は なんじ に がっこう へ きました か？" },
      { startSec: 98, endSec: 100, ja: "今日は八時に来ました。", furigana: "きょう は はちじ に きました。" },
      { startSec: 100, endSec: 104, ja: "先生に「おはようございます」と言いました。", furigana: "せんせい に おはようございます と いいました。" },
      { startSec: 104, endSec: 106, ja: "先生は優しいですか？", furigana: "せんせい は やさしい です か？" },
      { startSec: 106, endSec: 109, ja: "はい、とても優しいです。", furigana: "はい、とても やさしい です。" },
      { startSec: 109, endSec: 112, ja: "そして話すのがゆっくりです。", furigana: "そして はなす の が ゆっくり です。" },
    ],
    /* Правило: atSec должен быть ПОСЛЕ того, как прозвучала релевантная фраза (endSec + 1–2 сек). */
    questions: [
      { id: "d01", kind: "listening_mcq", atSec: 24, promptRu: "Что сейчас делает Маику? (из видео)", optionsRu: ["Смотрит аниме", "Учит японский", "Готовит еду", "Гуляет"], correctIndex: 1, explanationRu: "日本語の勉強をしています = Учу японский (сейчас)." },
      { id: "d02", kind: "listening_mcq", atSec: 27, promptRu: "Что было трудным для Маику? (из видео)", optionsRu: ["Кандзи", "Вчерашняя домашка", "Чтение", "Аудирование"], correctIndex: 1, explanationRu: "昨日の宿題が難しかったです = Вчерашнее домашнее задание было трудным." },
      { id: "d03", kind: "kanji_translate", atSec: 27, promptRu: "Переведите「宿題」(из видео).", kanji: "宿題", acceptedRu: ["домашнее задание", "домашка", "задание"] },
      { id: "d04", kind: "kanji_translate", atSec: 27, promptRu: "Переведите「難しい」.", kanji: "難しい", acceptedRu: ["трудный", "сложный"] },
      { id: "d05", kind: "listening_mcq", atSec: 37, promptRu: "Какую грамматику Маику не понимает? (из видео)", optionsRu: ["は и が", "ました и ませんでした", "て-форма", "Потенциальная форма"], correctIndex: 1, explanationRu: "ましたとませんでしたの違い = разница между ました и ませんでした." },
      { id: "d06", kind: "word_order", atSec: 42, promptRu: "Соберите фразу из видео: «Я ел хлеб.»", words: ["食べました", "を", "パン", "私は"], correctOrder: [3, 2, 1, 0], explanationRu: "私はパンを食べました。" },
      { id: "d07", kind: "word_order", atSec: 49, promptRu: "Соберите из видео: «Я не ел хлеб.»", words: ["食べませんでした", "を", "パン", "私は"], correctOrder: [3, 2, 1, 0], explanationRu: "私はパンを食べませんでした。" },
      { id: "d08", kind: "listening_mcq", atSec: 65, promptRu: "Как будет «Я пил кофе» по-японски? (из видео)", optionsRu: ["コーヒーを飲みませんでした", "コーヒーを飲みます", "コーヒーを飲みました", "コーヒーを飲みません"], correctIndex: 2 },
      { id: "d09", kind: "kanji_translate", atSec: 65, promptRu: "Переведите「飲む」(из видео).", kanji: "飲む", acceptedRu: ["пить"] },
      { id: "d10", kind: "listening_mcq", atSec: 80, promptRu: "Маику говорит, что японский язык:", optionsRu: ["Скучный", "Очень интересный", "Очень трудный", "Лёгкий"], correctIndex: 1, explanationRu: "日本語はとても面白いです = Японский очень интересный." },
      { id: "d11", kind: "kanji_translate", atSec: 80, promptRu: "Переведите「面白い」.", kanji: "面白い", acceptedRu: ["интересный", "забавный"] },
      { id: "d12", kind: "listening_mcq", atSec: 90, promptRu: "Сколько часов в день Маику учит японский? (из видео)", optionsRu: ["30 минут", "1 час", "2 часа", "3 часа"], correctIndex: 1, explanationRu: "毎日一時間勉強します = Каждый день учу 1 час." },
      { id: "d13", kind: "kanji_translate", atSec: 90, promptRu: "Переведите「毎日」.", kanji: "毎日", acceptedRu: ["каждый день", "ежедневно"] },
      { id: "d14", kind: "listening_mcq", atSec: 101, promptRu: "Во сколько Маику пришёл в школу? (из видео)", optionsRu: ["7 часов", "8 часов", "9 часов", "10 часов"], correctIndex: 1, explanationRu: "今日は八時に来ました = Сегодня пришёл в 8 часов." },
      { id: "d15", kind: "word_order", atSec: 101, promptRu: "Соберите из видео: «Сегодня пришёл в 8 часов.»", words: ["来ました", "に", "八時", "は", "今日"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "今日は八時に来ました。" },
      { id: "d16", kind: "listening_mcq", atSec: 110, promptRu: "Какой учитель у Маику? (из видео)", optionsRu: ["Строгий", "Добрый", "Весёлый", "Молодой"], correctIndex: 1, explanationRu: "とても優しいです = Очень добрый." },
      { id: "d17", kind: "kanji_translate", atSec: 110, promptRu: "Переведите「先生」.", kanji: "先生", acceptedRu: ["учитель", "преподаватель", "сэнсэй"] },
      { id: "d18", kind: "kanji_translate", atSec: 113, promptRu: "Переведите「優しい」.", kanji: "優しい", acceptedRu: ["добрый", "ласковый", "мягкий"] },
      { id: "d19", kind: "word_order", atSec: 113, promptRu: "Соберите из видео: «Учитель очень добрый.»", words: ["です", "優しい", "とても", "は", "先生"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "先生はとても優しいです。" },
      { id: "d20", kind: "listening_mcq", atSec: 116, promptRu: "Как учитель говорит? (из видео)", optionsRu: ["Быстро", "Медленно", "Громко", "Тихо"], correctIndex: 1, explanationRu: "話すのがゆっくりです = Говорит медленно." },
    ],
    grammarNotes: [
      {
        titleJa: "～ました / ～ませんでした",
        titleRu: "Прошедшее время (вежливая форма): утверждение и отрицание",
        level: "N5",
        structure: "〔глагол-ます основа〕＋ました（утверждение）/ ませんでした（отрицание）",
        explanationRu: "「～ました」— вежливая форма прошедшего времени глагола (утверждение). 「～ませんでした」— вежливое прошедшее отрицание. Чтобы образовать эти формы, берём основу глагола (ます-форма без ます) и добавляем ました или ませんでした. Например: 食べます → 食べました (ел) / 食べませんでした (не ел). Эта пара — одна из первых грамматических конструкций JLPT N5.",
        examples: [
          { ja: "私はパンを食べました。", furigana: "わたし は パン を たべました。", ru: "Я ел хлеб." },
          { ja: "私はパンを食べませんでした。", furigana: "わたし は パン を たべませんでした。", ru: "Я не ел хлеб." },
          { ja: "コーヒーを飲みました。", furigana: "コーヒー を のみました。", ru: "Я пил кофе." },
          { ja: "今日は八時に来ました。", furigana: "きょう は はちじ に きました。", ru: "Сегодня пришёл в 8 часов." },
          { ja: "昨日、勉強しませんでした。", furigana: "きのう、べんきょう しませんでした。", ru: "Вчера не учился." },
        ],
        tip: "Запомните пару: ました = «да, делал», ませんでした = «нет, не делал». Основа глагола не меняется — меняется только окончание.",
      },
      {
        titleJa: "～から（理由）",
        titleRu: "Причина: ～から (потому что)",
        level: "N5",
        structure: "〔предложение (простая/вежливая форма)〕＋ から、〔результат〕",
        explanationRu: "「から」после предложения означает «потому что / так как». Причина ставится перед から, а результат — после. Можно использовать как с вежливой формой (ですから, ますから), так и с простой (だから). Это одна из первых причинных конструкций N5. Не путайте с から в значении «из/от» (場所から = из места).",
        examples: [
          { ja: "日本語は面白いですから、毎日勉強します。", furigana: "にほんご は おもしろい です から、まいにち べんきょう します。", ru: "Японский интересный, поэтому учу каждый день." },
          { ja: "宿題が難しかったですから、時間がかかりました。", furigana: "しゅくだい が むずかしかった です から、じかん が かかりました。", ru: "Домашка была сложной, поэтому заняла время." },
          { ja: "先生は優しいですから、好きです。", furigana: "せんせい は やさしい です から、すき です。", ru: "Учитель добрый, поэтому он мне нравится." },
        ],
        tip: "から = причина идёт ПЕРЕД から. Порядок: [причина] + から + [результат]. В разговоре часто ставят から в конце: 「忙しいから。」(Потому что занят.)",
      },
      {
        titleJa: "何時に",
        titleRu: "Во сколько? — время с частицей に",
        level: "N5",
        structure: "〔время〕＋ に ＋ 〔глагол〕",
        explanationRu: "Частица「に」используется для указания точного времени действия: «во сколько», «в какой день». Вопрос: 何時に (なんじに) = «во сколько?». Ответ: 八時に来ました = «пришёл в 8 часов». Важно: に ставится после конкретного времени (3時に, 月曜日に), но НЕ ставится после 今日, 昨日, 毎日, 今 — эти слова используются без に.",
        examples: [
          { ja: "今日は何時に学校へ来ましたか？", furigana: "きょう は なんじ に がっこう へ きました か？", ru: "Во сколько сегодня пришёл в школу?" },
          { ja: "今日は八時に来ました。", furigana: "きょう は はちじ に きました。", ru: "Сегодня пришёл в 8 часов." },
          { ja: "毎日七時に起きます。", furigana: "まいにち しちじ に おきます。", ru: "Каждый день встаю в 7 часов." },
        ],
        tip: "に нужно после конкретного времени (三時に, 六月に), но НЕ нужно после 今日, 昨日, 明日, 毎日, 今. Запомните: если можно сказать «в/во», то нужно に.",
      },
    ],
  },

  // ──────── ВИДЕО 3: КОНВЕЙЕРНЫЕ СУШИ — еда, это/то, 一番 ────────
  {
    id: "n5-sushi", level: "N5",
    titleRu: "Конвейерные суши: еда и указательные местоимения",
    descriptionRu: "Поход в 回転寿司: これ/それ/あれ, названия блюд, いただきます/ごちそうさま, 一番 + прилагательное.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-sushi.mp4" },
    subtitles: [
      { startSec: 31, endSec: 34, ja: "ここは回転寿司です。", furigana: "ここ は かいてんずし です。" },
      { startSec: 36, endSec: 39, ja: "わー！すごい！", furigana: "わー！すごい！" },
      { startSec: 40, endSec: 44, ja: "みどりさん、日本へようこそ。", furigana: "みどり さん、にほん へ ようこそ。" },
      { startSec: 44, endSec: 49, ja: "乾杯！", furigana: "かんぱい！" },
      { startSec: 49, endSec: 53, ja: "みどりさん、これはマグロです。", furigana: "みどり さん、これ は マグロ です。" },
      { startSec: 53, endSec: 56, ja: "それはサーモンです。", furigana: "それ は サーモン です。" },
      { startSec: 56, endSec: 59, ja: "あれはいくらです。", furigana: "あれ は いくら です。" },
      { startSec: 60, endSec: 65, ja: "あ、それは何ですか？これですか？", furigana: "あ、それ は なん です か？ これ です か？" },
      { startSec: 65, endSec: 68, ja: "これはたこ焼きです。", furigana: "これ は たこやき です。" },
      { startSec: 68, endSec: 73, ja: "たこ焼きは寿司じゃありませんよ。", furigana: "たこやき は すし じゃ ありません よ。" },
      { startSec: 73, endSec: 77, ja: "はい、いただきます。", furigana: "はい、いただきます。" },
      { startSec: 78, endSec: 82, ja: "わー、とてもおいしいです。", furigana: "わー、とても おいしい です。" },
      { startSec: 82, endSec: 87, ja: "みどりさんはタコが好きですか？", furigana: "みどり さん は タコ が すき です か？" },
      { startSec: 90, endSec: 93, ja: "これはタコの寿司です。", furigana: "これ は タコ の すし です。" },
      { startSec: 104, endSec: 106, ja: "どうですか？", furigana: "どう です か？" },
      { startSec: 106, endSec: 109, ja: "日本人は寿司が好きです。", furigana: "にほんじん は すし が すき です。" },
      { startSec: 111, endSec: 113, ja: "全部おいしいです。", furigana: "ぜんぶ おいしい です。" },
      { startSec: 114, endSec: 118, ja: "でも、たこ焼きが一番おいしいです。", furigana: "でも、たこやき が いちばん おいしい です。" },
      { startSec: 125, endSec: 127, ja: "ごちそうさま。", furigana: "ごちそうさま。" },
      { startSec: 127, endSec: 131, ja: "ここのたこ焼きは最高です。", furigana: "ここ の たこやき は さいこう です。" },
    ],
    /* atSec = ПОСЛЕ релевантной фразы (endSec + 1–2 сек) */
    questions: [
      { id: "s01", kind: "listening_mcq", atSec: 35, promptRu: "Куда пришли герои? (из видео)", optionsRu: ["В обычный ресторан", "В конвейерные суши", "В кафе", "В магазин"], correctIndex: 1, explanationRu: "ここは回転寿司です = Это конвейерные суши." },
      { id: "s02", kind: "kanji_translate", atSec: 35, promptRu: "Переведите「回転寿司」.", kanji: "回転寿司", acceptedRu: ["конвейерные суши", "кайтэн-дзуси"] },
      { id: "s03", kind: "listening_mcq", atSec: 45, promptRu: "Что означает「日本へようこそ」? (из видео)", optionsRu: ["Добро пожаловать в Японию", "Я еду в Японию", "Это Япония", "Мне нравится Япония"], correctIndex: 0 },
      { id: "s04", kind: "listening_mcq", atSec: 54, promptRu: "Что говорящий показывает как «マグロ»? (из видео)", optionsRu: ["Лосось", "Тунец", "Угорь", "Осьминог"], correctIndex: 1, explanationRu: "マグロ = тунец." },
      { id: "s05", kind: "listening_mcq", atSec: 60, promptRu: "「それ」указывает на предмет:", optionsRu: ["Рядом с говорящим", "Рядом с собеседником", "Далеко от обоих", "Любой предмет"], correctIndex: 1, explanationRu: "これ = у меня, それ = у тебя, あれ = далеко от обоих." },
      { id: "s06", kind: "word_order", atSec: 60, promptRu: "Соберите из видео: «Вон то — икра.»", words: ["です", "いくら", "は", "あれ"], correctOrder: [3, 2, 1, 0], explanationRu: "あれはいくらです。" },
      { id: "s07", kind: "listening_mcq", atSec: 69, promptRu: "Что такое たこ焼き? (из видео)", optionsRu: ["Вид суши", "Шарики с осьминогом", "Рамен", "Онигири"], correctIndex: 1, explanationRu: "たこ焼き = такояки (шарики с осьминогом)." },
      { id: "s08", kind: "listening_mcq", atSec: 74, promptRu: "「じゃありません」— это:", optionsRu: ["Утверждение", "Вопрос", "Отрицание", "Прошедшее время"], correctIndex: 2, explanationRu: "じゃありません = отрицание от です." },
      { id: "s09", kind: "listening_mcq", atSec: 78, promptRu: "Когда говорят「いただきます」?", optionsRu: ["После еды", "Перед едой", "При входе", "На прощание"], correctIndex: 1 },
      { id: "s10", kind: "kanji_translate", atSec: 83, promptRu: "Переведите「おいしい」.", kanji: "おいしい", acceptedRu: ["вкусный", "вкусно"] },
      { id: "s11", kind: "listening_mcq", atSec: 88, promptRu: "О чём спрашивают Мидори? (из видео)", optionsRu: ["Любит ли она рыбу", "Любит ли она осьминога", "Любит ли она рис", "Любит ли она чай"], correctIndex: 1, explanationRu: "タコが好きですか = Вы любите осьминога?" },
      { id: "s12", kind: "word_order", atSec: 88, promptRu: "Соберите: «Вы любите осьминога?»", words: ["ですか", "好き", "が", "タコ", "は", "みどりさん"], correctOrder: [5, 4, 3, 2, 1, 0], explanationRu: "みどりさんはタコが好きですか？" },
      { id: "s13", kind: "listening_mcq", atSec: 107, promptRu: "「どうですか？」переводится как:", optionsRu: ["Что это?", "Почему?", "Как вам?", "Сколько стоит?"], correctIndex: 2 },
      { id: "s14", kind: "listening_mcq", atSec: 120, promptRu: "Что Мидори считает самым вкусным? (из видео)", optionsRu: ["Маグロ", "Сальмон", "Такояки", "Икра"], correctIndex: 2, explanationRu: "たこ焼きが一番おいしいです = Такояки — самое вкусное." },
      { id: "s15", kind: "word_order", atSec: 120, promptRu: "Соберите из видео: «Такояки — самое вкусное.»", words: ["です", "おいしい", "一番", "が", "たこ焼き"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "たこ焼きが一番おいしいです。" },
      { id: "s16", kind: "kanji_translate", atSec: 120, promptRu: "Переведите「一番」.", kanji: "一番", acceptedRu: ["самый", "номер один", "первый"] },
      { id: "s17", kind: "listening_mcq", atSec: 128, promptRu: "Когда говорят「ごちそうさま」?", optionsRu: ["Перед едой", "После еды", "При встрече", "При покупке"], correctIndex: 1 },
      { id: "s18", kind: "kanji_translate", atSec: 132, promptRu: "Переведите「最高」.", kanji: "最高", acceptedRu: ["лучший", "самый лучший", "наилучший", "высший"] },
      { id: "s19", kind: "listening_mcq", atSec: 132, promptRu: "「ここのたこ焼きは最高です」означает:", optionsRu: ["Здешние такояки — самые дорогие", "Здешние такояки — лучшие", "Такояки тут нет", "Такояки тут обычные"], correctIndex: 1 },
    ],
    grammarNotes: [
      {
        titleJa: "これ / それ / あれ",
        titleRu: "Указательные местоимения: это / то / вон то",
        level: "N5",
        structure: "これ（у меня）/ それ（у тебя）/ あれ（далеко от обоих）＋ は ＋ 〔сущ.〕＋ です",
        explanationRu: "「これ」указывает на предмет рядом с говорящим. 「それ」— на предмет рядом с собеседником. 「あれ」— на предмет далеко от обоих. Это базовая система указательных местоимений в японском (こ-そ-あ). Они часто используются в повседневных диалогах: в магазинах, ресторанах, при описании предметов.",
        examples: [
          { ja: "これはマグロです。", furigana: "これ は マグロ です。", ru: "Это (у меня) — тунец." },
          { ja: "それはサーモンです。", furigana: "それ は サーモン です。", ru: "То (у тебя) — лосось." },
          { ja: "あれはいくらです。", furigana: "あれ は いくら です。", ru: "Вон то — икра." },
          { ja: "これは何ですか？", furigana: "これ は なん です か？", ru: "Что это?" },
        ],
        tip: "Мнемоника: Ко (こ) = close (близко ко мне), Со (そ) = so-so (у тебя), А (あ) = afar (далеко).",
      },
      {
        titleJa: "一番 + прилагательное",
        titleRu: "Превосходная степень: самый + прилагательное",
        level: "N5",
        structure: "〔сущ.〕＋ が ＋ 一番 ＋ 〔прилагательное〕＋ です",
        explanationRu: "「一番」(いちばん) буквально означает «номер один». Ставится перед прилагательным и образует превосходную степень: «самый + прилагательное». Например, 一番おいしい = самый вкусный. Часто используется с частицей が для выделения предмета, который «самый».",
        examples: [
          { ja: "たこ焼きが一番おいしいです。", furigana: "たこやき が いちばん おいしい です。", ru: "Такояки — самое вкусное." },
          { ja: "日本語が一番面白いです。", furigana: "にほんご が いちばん おもしろい です。", ru: "Японский — самый интересный." },
          { ja: "富士山が一番高いです。", furigana: "ふじさん が いちばん たかい です。", ru: "Фудзи — самая высокая." },
          { ja: "何が一番好きですか？", furigana: "なに が いちばん すき です か？", ru: "Что вам нравится больше всего?" },
        ],
        tip: "一番 работает и с い-прилагательными, и с な-прилагательными: 一番きれい, 一番おいしい.",
      },
      {
        titleJa: "いただきます / ごちそうさま",
        titleRu: "Перед едой / после еды (этикет)",
        level: "N5",
        structure: "いただきます（перед едой）/ ごちそうさま（でした）（после еды）",
        explanationRu: "「いただきます」говорят перед едой — это благодарность за еду (буквально: «смиренно принимаю»). 「ごちそうさま（でした）」говорят после еды — благодарность за угощение (буквально: «это было пиршество»). Эти фразы обязательны в японском этикете и используются дома, в ресторанах, в гостях — всегда.",
        examples: [
          { ja: "はい、いただきます。", furigana: "はい、いただきます。", ru: "Ну, приступаю к еде." },
          { ja: "ごちそうさま。", furigana: "ごちそうさま。", ru: "Спасибо за угощение. (после еды)" },
          { ja: "ごちそうさまでした。とてもおいしかったです。", furigana: "ごちそうさま でした。とても おいしかった です。", ru: "Спасибо за угощение. Было очень вкусно." },
        ],
        tip: "いただきます = перед едой (всегда). ごちそうさま = после еды. でした добавляют для большей вежливости.",
      },
    ],
  },

  // ──────── ВИДЕО 4: АНИМЕ — работа, дни недели, желания ────────
  {
    id: "n5-anime", level: "N5",
    titleRu: "Аниме: работа, дни недели, ～たい/～たくない",
    descriptionRu: "Аниме Shirokuma Café: панда не хочет на подработку. Лексика: バイト, 週, 毎日. Грамматика: ～たくない, ～しようかな.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-anime.mp4" },
    subtitles: [
      { startSec: 6.5, endSec: 10.9, ja: "どうしたの？", furigana: "どう した の？" },
      { startSec: 19, endSec: 22, ja: "バイト行きたくないよ。", furigana: "バイト いきたくない よ。" },
      { startSec: 28.7, endSec: 30, ja: "またそれ。", furigana: "また それ。" },
      { startSec: 35.8, endSec: 40.3, ja: "本当に何もすることなくて、超退屈なんだもん。", furigana: "ほんとう に なにも する こと なくて、ちょう たいくつ なん だ もん。" },
      { startSec: 46.6, endSec: 50, ja: "パンダ君のバイトって週二日だよね。", furigana: "パンダ くん の バイト って しゅう ふつか だ よ ね。" },
      { startSec: 58.9, endSec: 61.5, ja: "週二日で文句言わないでよ。", furigana: "しゅう ふつか で もんく いわないで よ。" },
      { startSec: 68.5, endSec: 70.5, ja: "むしろ毎日行こうよ。", furigana: "むしろ まいにち いこう よ。" },
      { startSec: 76.7, endSec: 78.2, ja: "そうだね。", furigana: "そう だ ね。" },
      { startSec: 89.7, endSec: 94.7, ja: "週一日にしようかな。", furigana: "しゅう いちにち に しよう かな。" },
      { startSec: 101.7, endSec: 106.7, ja: "あ、減らすの？", furigana: "あ、へらす の？" },
      { startSec: 111.7, endSec: 114.7, ja: "いいな。", furigana: "いいな。" },
      { startSec: 118.7, endSec: 123.7, ja: "僕は仕事忙しくて、もう少し暇になりたい。", furigana: "ぼく は しごと いそがしくて、もう すこし ひま に なりたい。" },
      { startSec: 138.7, endSec: 141.7, ja: "たまには気分転換したいね。", furigana: "たま に は きぶん てんかん したい ね。" },
      { startSec: 149.7, endSec: 152.7, ja: "いいことを思いついちゃった。", furigana: "いい こと を おもいついちゃった。" },
      { startSec: 159.7, endSec: 163.7, ja: "なんですか？", furigana: "なん です か？" },
      { startSec: 167.7, endSec: 171.7, ja: "パンダ君、一日だけ入れ替わってみない？", furigana: "パンダ くん、いちにち だけ いれかわって みない？" },
      { startSec: 173.7, endSec: 177.7, ja: "いやいやいや、無理でしょ？", furigana: "いや いや いや、むり でしょ？" },
      { startSec: 213.7, endSec: 216.7, ja: "白くま君、変なこと言わないでよ。", furigana: "しろくま くん、へん な こと いわないで よ。" },
    ],
    /* atSec = ПОСЛЕ релевантной фразы (endSec + 1–2 сек) */
    questions: [
      { id: "a01", kind: "listening_mcq", atSec: 12, promptRu: "「どうしたの？」означает:", optionsRu: ["Что ты делаешь?", "Что случилось?", "Куда идёшь?", "Как дела?"], correctIndex: 1, explanationRu: "どうしたの = Что случилось?" },
      { id: "a02", kind: "listening_mcq", atSec: 23, promptRu: "Панда не хочет идти на: (из видео)", optionsRu: ["Школу", "Подработку", "Прогулку", "Тренировку"], correctIndex: 1, explanationRu: "バイト行きたくないよ = Не хочу идти на подработку." },
      { id: "a03", kind: "kanji_translate", atSec: 23, promptRu: "Что значит「バイト」?", kanji: "バイト", acceptedRu: ["подработка", "работа", "халтура"] },
      { id: "a04", kind: "listening_mcq", atSec: 23, promptRu: "「行きたくない」— это какая форма?", optionsRu: ["Хочу идти", "Не хочу идти", "Не могу идти", "Не буду идти"], correctIndex: 1, explanationRu: "～たい = хочу, ～たくない = не хочу." },
      { id: "a05", kind: "listening_mcq", atSec: 42, promptRu: "Почему Панда не хочет работать? (из видео)", optionsRu: ["Болен", "Скучно, нечего делать", "Устал", "Далеко ехать"], correctIndex: 1, explanationRu: "何もすることなくて超退屈 = Нечего делать, очень скучно." },
      { id: "a06", kind: "kanji_translate", atSec: 42, promptRu: "Переведите「退屈」.", kanji: "退屈", acceptedRu: ["скука", "скучно", "скучный"] },
      { id: "a07", kind: "listening_mcq", atSec: 53, promptRu: "Сколько дней в неделю Панда работает? (из видео)", optionsRu: ["1 день", "2 дня", "3 дня", "5 дней"], correctIndex: 1, explanationRu: "週二日 = 2 дня в неделю." },
      { id: "a08", kind: "word_order", atSec: 53, promptRu: "Соберите: «Подработка Панды — 2 дня в неделю, верно?»", words: ["だよね", "二日", "週", "って", "バイト", "の", "パンダ君"], correctOrder: [6, 5, 4, 3, 2, 1, 0], explanationRu: "パンダ君のバイトって週二日だよね。" },
      { id: "a09", kind: "listening_mcq", atSec: 64, promptRu: "「文句を言わないで」означает:", optionsRu: ["Скажи что-нибудь", "Не жалуйся", "Повтори ещё раз", "Продолжай"], correctIndex: 1, explanationRu: "文句言わないでよ = Не жалуйся!" },
      { id: "a10", kind: "listening_mcq", atSec: 73, promptRu: "Что предлагают Панде? (из видео)", optionsRu: ["Уволиться", "Ходить на работу каждый день", "Найти другую работу", "Спать больше"], correctIndex: 1, explanationRu: "むしろ毎日行こうよ = Лучше ходи каждый день!" },
      { id: "a11", kind: "kanji_translate", atSec: 73, promptRu: "Переведите「毎日」.", kanji: "毎日", acceptedRu: ["каждый день", "ежедневно"] },
      { id: "a12", kind: "listening_mcq", atSec: 97, promptRu: "Что хочет сделать Панда с расписанием? (из видео)", optionsRu: ["Работать каждый день", "Уменьшить до 1 дня", "Увеличить до 3 дней", "Бросить работу"], correctIndex: 1, explanationRu: "週一日にしようかな = Может, сократить до 1 дня в неделю." },
      { id: "a13", kind: "listening_mcq", atSec: 108, promptRu: "「減らす」означает:", optionsRu: ["Увеличить", "Уменьшить", "Оставить", "Изменить"], correctIndex: 1, explanationRu: "減らす = уменьшать, сокращать." },
      { id: "a14", kind: "kanji_translate", atSec: 125, promptRu: "Переведите「仕事」.", kanji: "仕事", acceptedRu: ["работа"] },
      { id: "a15", kind: "kanji_translate", atSec: 125, promptRu: "Переведите「忙しい」.", kanji: "忙しい", acceptedRu: ["занятой", "загруженный"] },
      { id: "a16", kind: "listening_mcq", atSec: 125, promptRu: "Что хочет Шрокума? (из видео)", optionsRu: ["Больше работы", "Больше свободного времени", "Новую работу", "Отпуск"], correctIndex: 1, explanationRu: "もう少し暇になりたい = Хочу быть чуть посвободнее." },
      { id: "a17", kind: "listening_mcq", atSec: 143, promptRu: "「気分転換」означает:", optionsRu: ["Плохое настроение", "Смена обстановки", "Ночная смена", "Каникулы"], correctIndex: 1 },
      { id: "a18", kind: "listening_mcq", atSec: 174, promptRu: "Что предлагает Шрокума Панде? (из видео)", optionsRu: ["Поехать на отдых", "Поменяться местами на 1 день", "Пойти вместе на работу", "Уволиться"], correctIndex: 1, explanationRu: "一日だけ入れ替わってみない = Давай на 1 день поменяемся?" },
      { id: "a19", kind: "listening_mcq", atSec: 180, promptRu: "Как Панда реагирует на предложение? (из видео)", optionsRu: ["Соглашается", "Говорит «невозможно»", "Радуется", "Молчит"], correctIndex: 1, explanationRu: "無理でしょ = Это же невозможно!" },
      { id: "a20", kind: "kanji_translate", atSec: 180, promptRu: "Переведите「無理」.", kanji: "無理", acceptedRu: ["невозможно", "нельзя", "невозможный"] },
    ],
    grammarNotes: [
      {
        titleJa: "～たい / ～たくない",
        titleRu: "Хочу делать / не хочу делать",
        level: "N5",
        structure: "〔глагол-ます основа〕＋ たい（хочу）/ たくない（не хочу）",
        explanationRu: "「～たい」выражает желание говорящего что-то сделать. Образуется от ます-основы глагола: 行きます → 行きたい (хочу пойти). Отрицание: 行きたくない (не хочу идти). Важно: эта форма используется только для собственных желаний (1-е лицо) или в вопросах. Для описания чужих желаний используют ～たがっている.",
        examples: [
          { ja: "バイト行きたくないよ。", furigana: "バイト いきたくない よ。", ru: "Не хочу идти на подработку." },
          { ja: "もう少し暇になりたい。", furigana: "もう すこし ひま に なりたい。", ru: "Хочу быть чуть посвободнее." },
          { ja: "気分転換したいね。", furigana: "きぶん てんかん したい ね。", ru: "Хочется сменить обстановку." },
          { ja: "日本に行きたいです。", furigana: "にほん に いきたい です。", ru: "Хочу поехать в Японию." },
          { ja: "今日は何も食べたくない。", furigana: "きょう は なにも たべたくない。", ru: "Сегодня ничего не хочу есть." },
        ],
        tip: "～たい спрягается как い-прилагательное: たい → たくない → たかった → たくなかった.",
      },
      {
        titleJa: "週〜日 / 曜日",
        titleRu: "Дни недели и счёт дней в неделе",
        level: "N5",
        structure: "週 ＋ 〔число〕＋ 日（にち）= … дней в неделю / 〔день〕＋ 曜日",
        explanationRu: "「週」(しゅう) означает «неделя». 週＋число＋日 = сколько дней в неделю: 週二日 (2 дня в неделю), 週一日 (1 день в неделю). Дни недели образуются по формуле: 〔элемент〕＋曜日: 月曜日 (понедельник), 火曜日 (вторник), 水曜日 (среда), 木曜日 (четверг), 金曜日 (пятница), 土曜日 (суббота), 日曜日 (воскресенье).",
        examples: [
          { ja: "パンダ君のバイトって週二日だよね。", furigana: "パンダ くん の バイト って しゅう ふつか だ よ ね。", ru: "Подработка Панды — 2 дня в неделю, да?" },
          { ja: "週一日にしようかな。", furigana: "しゅう いちにち に しよう かな。", ru: "Может, сделать 1 день в неделю." },
          { ja: "月曜日から金曜日まで働きます。", furigana: "げつようび から きんようび まで はたらきます。", ru: "Работаю с понедельника по пятницу." },
        ],
        tip: "Мнемоника дней недели: 月(луна)=пн, 火(огонь)=вт, 水(вода)=ср, 木(дерево)=чт, 金(золото)=пт, 土(земля)=сб, 日(солнце)=вс.",
      },
      {
        titleJa: "～しようかな",
        titleRu: "Может, сделаю… (размышление вслух)",
        level: "N5",
        structure: "〔глагол-волитивная форма〕＋ かな",
        explanationRu: "「～しようかな」выражает размышление вслух: «может, сделаю…», «а не сделать ли мне…». Образуется от волитивной формы глагола (意向形 / いこうけい) + かな. Для する → しよう, для 行く → 行こう. Частица かな добавляет оттенок неуверенности, раздумья. Используется в неформальной речи, когда человек думает вслух о своих планах.",
        examples: [
          { ja: "週一日にしようかな。", furigana: "しゅう いちにち に しよう かな。", ru: "Может, сделать 1 день в неделю…" },
          { ja: "今日は何を食べようかな。", furigana: "きょう は なに を たべよう かな。", ru: "Что бы сегодня поесть…" },
          { ja: "明日は映画を見ようかな。", furigana: "あした は えいが を みよう かな。", ru: "Может, завтра посмотрю фильм…" },
        ],
        tip: "～ようかな = думаю вслух для себя. ～ようか？ (без な) = предложение другому: «Может, сделаем?»",
      },
    ],
  },

  // ──────── ВИДЕО 5: МАГАЗИН — これをください, 温めますか, 大丈夫です, 袋, おはし ────────
  {
    id: "n5-shop", level: "N5",
    titleRu: "В магазине: покупки, これをください, 大丈夫です",
    descriptionRu: "Диалог в магазине: これをください, 温めますか, 袋/おはし, ～になります, 現金/クレジット, おつり.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-shop.mp4" },
    subtitles: [
      { startSec: 21, endSec: 23, ja: "いらっしゃいませ。", furigana: "いらっしゃいませ。" },
      { startSec: 23, endSec: 25, ja: "これをください。", furigana: "これ を ください。" },
      { startSec: 28.5, endSec: 30.5, ja: "こちら、温めますか？", furigana: "こちら、あたためます か？" },
      { startSec: 30.5, endSec: 33.5, ja: "あ、大丈夫です。", furigana: "あ、だいじょうぶ です。" },
      { startSec: 33.5, endSec: 36.5, ja: "袋はお付けしますか？", furigana: "ふくろ は おつけします か？" },
      { startSec: 36.5, endSec: 39.5, ja: "はい、お願いします。", furigana: "はい、おねがいします。" },
      { startSec: 39.5, endSec: 42.5, ja: "1枚、5円になります。", furigana: "いちまい、ごえん に なります。" },
      { startSec: 42.5, endSec: 45.5, ja: "おはしはお付けしますか？", furigana: "おはし は おつけします か？" },
      { startSec: 45.5, endSec: 48.5, ja: "はしは、いくらですか？", furigana: "はし は、いくら です か？" },
      { startSec: 48.5, endSec: 51.5, ja: "おはしは無料です。", furigana: "おはし は むりょう です。" },
      { startSec: 51.5, endSec: 54.5, ja: "では、お願いします。", furigana: "では、おねがいします。" },
      { startSec: 54.5, endSec: 58.5, ja: "2点で200円になります。", furigana: "にてん で にひゃくえん に なります。" },
      { startSec: 58.5, endSec: 62.5, ja: "クレジットでお支払いしますか？", furigana: "クレジット で おしはらいします か？" },
      { startSec: 62.5, endSec: 66.5, ja: "いえ、現金ではらいます。", furigana: "いえ、げんきん で はらいます。" },
      { startSec: 66.5, endSec: 69.5, ja: "500円でお願いします。", furigana: "ごひゃくえん で おねがいします。" },
      { startSec: 71.5, endSec: 76.5, ja: "300円のおつりとレシートになります。", furigana: "さんびゃくえん の おつり と レシート に なります。" },
      { startSec: 76.5, endSec: 79.5, ja: "ありがとうございました。", furigana: "ありがとう ございました。" },
    ],
    questions: [
      { id: "sh01", kind: "listening_mcq", atSec: 26, promptRu: "Что говорит клиент, прося товар? (из видео)", optionsRu: ["いくらですか", "これをください", "温めますか", "大丈夫です"], correctIndex: 1, explanationRu: "これをください = Дайте это, пожалуйста." },
      { id: "sh02", kind: "word_order", atSec: 26, promptRu: "Соберите из видео: «Дайте это, пожалуйста.»", words: ["ください", "を", "これ"], correctOrder: [2, 1, 0] },
      { id: "sh03", kind: "listening_mcq", atSec: 34, promptRu: "«温めますか» — о чём спрашивают?", optionsRu: ["Разогреть?", "Сумку нужна?", "Палочки?", "Оплата?"], correctIndex: 0 },
      { id: "sh04", kind: "listening_mcq", atSec: 34, promptRu: "Клиент отвечает «大丈夫です» на вопрос про разогрев. Это значит:", optionsRu: ["Да, пожалуйста", "Нет, не надо", "Не знаю", "Подождите"], correctIndex: 1, explanationRu: "大丈夫です здесь = вежливый отказ (не надо)." },
      { id: "sh05", kind: "kanji_translate", atSec: 37, promptRu: "Переведите「袋」.", kanji: "袋", acceptedRu: ["пакет", "сумка", "мешок"] },
      { id: "sh06", kind: "listening_mcq", atSec: 43, promptRu: "«1枚、5円» — что считают счётчиком 枚?", optionsRu: ["Напитки", "Листы, карточки, бумагу", "Фрукты", "Одежду"], correctIndex: 1, explanationRu: "枚 — для плоских предметов." },
      { id: "sh07", kind: "listening_mcq", atSec: 52, promptRu: "«おはしは無料です» — сколько стоят палочки?", optionsRu: ["5 иен", "200 иен", "Бесплатно", "500 иен"], correctIndex: 2, explanationRu: "無料 = бесплатно." },
      { id: "sh08", kind: "kanji_translate", atSec: 52, promptRu: "Переведите「無料」.", kanji: "無料", acceptedRu: ["бесплатно", "бесплатный"] },
      { id: "sh09", kind: "listening_mcq", atSec: 59, promptRu: "Сколько всего заплатил клиент? (из видео)", optionsRu: ["200 иен", "500 иен", "300 иен", "1000 иен"], correctIndex: 1 },
      { id: "sh10", kind: "listening_mcq", atSec: 67, promptRu: "Чем платит клиент? (из видео)", optionsRu: ["Картой", "Наличными", "Телефоном", "Чеком"], correctIndex: 1, explanationRu: "現金ではらいます = Плачу наличными." },
      { id: "sh11", kind: "kanji_translate", atSec: 67, promptRu: "Переведите「現金」.", kanji: "現金", acceptedRu: ["наличные", "наличные деньги"] },
      { id: "sh12", kind: "listening_mcq", atSec: 77, promptRu: "Сколько сдачи получил клиент? (из видео)", optionsRu: ["200 иен", "300 иен", "500 иен", "100 иен"], correctIndex: 1, explanationRu: "300円のおつり = Сдача 300 иен." },
      { id: "sh13", kind: "word_order", atSec: 77, promptRu: "Соберите: «Сдача и чек.»", words: ["になります", "と", "レシート", "の", "おつり", "三百円"], correctOrder: [5, 4, 3, 2, 1, 0], explanationRu: "三百円のおつりとレシートになります。" },
    ],
    grammarNotes: [
      {
        titleJa: "～をください",
        titleRu: "Дайте мне, пожалуйста",
        level: "N5",
        structure: "〔существительное〕＋ を ＋ ください",
        explanationRu: "「～をください」— вежливая просьба дать что-то. Буквально: «пожалуйста, дайте мне ~». Используется в магазинах, ресторанах, на рынке — везде, где вы просите конкретный предмет. Перед ください ставится существительное с частицей を. Это одна из самых полезных фраз для повседневной жизни в Японии.",
        examples: [
          { ja: "これをください。", furigana: "これ を ください。", ru: "Дайте это, пожалуйста." },
          { ja: "水をください。", furigana: "みず を ください。", ru: "Воды, пожалуйста." },
          { ja: "メニューをください。", furigana: "メニュー を ください。", ru: "Меню, пожалуйста." },
          { ja: "袋をください。", furigana: "ふくろ を ください。", ru: "Пакет, пожалуйста." },
        ],
        tip: "「ください」 — от глагола くださる (давать, вежливо). Не путайте с お願いします: ください = дайте предмет, お願いします = прошу (более широко).",
      },
      {
        titleJa: "～になります",
        titleRu: "Это будет… (вежливое объявление цены/итога)",
        level: "N5",
        structure: "〔сумма / предмет〕＋ になります",
        explanationRu: "「～になります」— вежливая форма, используемая в сфере обслуживания для объявления цены, сдачи или подачи заказа. Буквально: «становится ~», но на практике означает «это будет ~» или «вот ваш ~». Продавцы говорят «200円になります» (будет 200 иен) или «こちら抹茶になります» (вот ваша матча). Это кэйго (вежливый язык) сферы услуг.",
        examples: [
          { ja: "2点で200円になります。", furigana: "にてん で にひゃくえん に なります。", ru: "Два товара — 200 иен." },
          { ja: "1枚、5円になります。", furigana: "いちまい、ごえん に なります。", ru: "Один пакет — 5 иен." },
          { ja: "300円のおつりになります。", furigana: "さんびゃくえん の おつり に なります。", ru: "Сдача — 300 иен." },
          { ja: "こちら抹茶になります。", furigana: "こちら まっちゃ に なります。", ru: "Вот ваша матча." },
        ],
        tip: "になります в магазинах ≠ «становится». Это просто вежливый способ сказать «это будет / вот ваш».",
      },
      {
        titleJa: "いくらですか / ～円",
        titleRu: "Сколько стоит? / Цена в иенах",
        level: "N5",
        structure: "〔предмет〕＋ は ＋ いくらですか？ → 〔число〕＋ 円（えん）",
        explanationRu: "「いくらですか」— вопрос «сколько стоит?». Ответ содержит число + 円 (えん, иена). Числа: 100 = ひゃく, 200 = にひゃく, 300 = さんびゃく (озвончение!), 500 = ごひゃく, 1000 = せん. Эта конструкция необходима для любых покупок в Японии.",
        examples: [
          { ja: "はしは、いくらですか？", furigana: "はし は、いくら です か？", ru: "Сколько стоят палочки?" },
          { ja: "合計500円になります。", furigana: "ごうけい ごひゃくえん に なります。", ru: "Итого 500 иен." },
          { ja: "このTシャツはいくらですか？— 1000円です。", furigana: "この T シャツ は いくら です か？— せんえん です。", ru: "Сколько стоит эта футболка? — 1000 иен." },
        ],
        tip: "Озвончение в счёте: 300 = さんびゃく (не さんひゃく), 600 = ろっぴゃく, 800 = はっぴゃく. Запомните исключения!",
      },
    ],
  },

  // ──────── ВИДЕО 6: ПОДКАСТ — мой день (распорядок дня) ────────
  {
    id: "n5-podcast-day", level: "N5",
    titleRu: "Подкаст: мой вчерашний день",
    descriptionRu: "Рассказ о распорядке дня: 起きました, 読みました, 朝ごはん, 日本語のクラス, 晩ごはん.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-podcast-day.mp4" },
    subtitles: [
      { startSec: 6.4, endSec: 8.6, ja: "皆さん、こんにちは。", furigana: "みなさん、こんにちは。" },
      { startSec: 14, endSec: 20.8, ja: "このチャンネルは簡単な日本語で話すポッドキャストです。", furigana: "この チャンネル は かんたん な にほんご で はなす ポッドキャスト です。" },
      { startSec: 54.8, endSec: 61.4, ja: "昨日、私は朝8時に起きました。", furigana: "きのう、わたし は あさ はちじ に おきました。" },
      { startSec: 61.4, endSec: 67.2, ja: "それから、9時まで本を読みました。", furigana: "それから、くじ まで ほん を よみました。" },
      { startSec: 71.5, endSec: 76.9, ja: "特にビジネスの本が好きです。", furigana: "とくに ビジネス の ほん が すき です。" },
      { startSec: 76.9, endSec: 82.8, ja: "それから家で朝ごはんを食べました。", furigana: "それから いえ で あさごはん を たべました。" },
      { startSec: 82.8, endSec: 91.6, ja: "朝ごはんは、目玉焼きと納豆とごはんとお味噌汁でした。", furigana: "あさごはん は、めだまやき と なっとう と ごはん と おみそしる でした。" },
      { startSec: 91.6, endSec: 94.8, ja: "美味しかったです。", furigana: "おいしかった です。" },
      { startSec: 94.8, endSec: 99.4, ja: "それから、コーヒーを飲みました。", furigana: "それから、コーヒー を のみました。" },
      { startSec: 107.9, endSec: 117.6, ja: "それから、11時から12時まで日本語のクラスをしました。", furigana: "それから、じゅういちじ から じゅうにじ まで にほんご の クラス を しました。" },
      { startSec: 117.6, endSec: 122.5, ja: "私の学生はイタリア人です。", furigana: "わたし の がくせい は イタリアじん です。" },
      { startSec: 128.4, endSec: 132.8, ja: "毎日、日本語で話します。", furigana: "まいにち、にほんご で はなします。" },
      { startSec: 139.6, endSec: 142.7, ja: "レストランで食べました。", furigana: "レストラン で たべました。" },
      { startSec: 146.5, endSec: 154.8, ja: "午後4時に、スーパーへお肉と野菜を買いに行きました。", furigana: "ごご よじ に、スーパー へ おにく と やさい を かい に いきました。" },
      { startSec: 172.3, endSec: 177.9, ja: "クラスはとても楽しいです。", furigana: "クラス は とても たのしい です。" },
      { startSec: 177.9, endSec: 185.2, ja: "そして、晩ごはんに寿司を食べました。", furigana: "そして、ばんごはん に すし を たべました。" },
      { startSec: 185.2, endSec: 189.1, ja: "そしてビールを飲みました。", furigana: "そして ビール を のみました。" },
      { startSec: 195.6, endSec: 198.2, ja: "それから、寝ました。", furigana: "それから、ねました。" },
    ],
    questions: [
      { id: "pd01", kind: "listening_mcq", atSec: 62, promptRu: "Во сколько рассказчик встал? (из видео)", optionsRu: ["7 часов", "8 часов", "9 часов", "10 часов"], correctIndex: 1, explanationRu: "朝8時に起きました = Встал в 8 утра." },
      { id: "pd02", kind: "listening_mcq", atSec: 68, promptRu: "Что делал до 9 часов? (из видео)", optionsRu: ["Завтракал", "Читал книгу", "Пил кофе", "Учил японский"], correctIndex: 1, explanationRu: "9時まで本を読みました = Читал книгу до 9." },
      { id: "pd03", kind: "listening_mcq", atSec: 84, promptRu: "Где ел завтрак? (из видео)", optionsRu: ["В ресторане", "Дома", "В кафе", "В школе"], correctIndex: 1, explanationRu: "家で朝ごはんを食べました = Ел завтрак дома." },
      { id: "pd04", kind: "listening_mcq", atSec: 93, promptRu: "Что было на завтрак? (из видео)", optionsRu: ["Только кофе", "Омлет, натто, рис, мисо", "Суши", "Бутерброды"], correctIndex: 1 },
      { id: "pd05", kind: "kanji_translate", atSec: 93, promptRu: "Переведите「味噌汁」.", kanji: "味噌汁", acceptedRu: ["мисо-суп", "суп мисо"] },
      { id: "pd06", kind: "listening_mcq", atSec: 100, promptRu: "Что пил после завтрака? (из видео)", optionsRu: ["Чай", "Сок", "Кофе", "Воду"], correctIndex: 2 },
      { id: "pd07", kind: "listening_mcq", atSec: 119, promptRu: "Когда был урок японского? (из видео)", optionsRu: ["9–10", "11–12", "14–15", "19–20"], correctIndex: 1, explanationRu: "11時から12時まで = с 11 до 12." },
      { id: "pd08", kind: "listening_mcq", atSec: 124, promptRu: "Кто ученик рассказчика? (из видео)", optionsRu: ["Японец", "Американец", "Итальянец", "Кореец"], correctIndex: 2 },
      { id: "pd09", kind: "kanji_translate", atSec: 124, promptRu: "Переведите「学生」.", kanji: "学生", acceptedRu: ["студент", "ученик"] },
      { id: "pd10", kind: "listening_mcq", atSec: 144, promptRu: "Где ел обед? (из видео)", optionsRu: ["Дома", "В ресторане", "В школе", "В кафе"], correctIndex: 1 },
      { id: "pd11", kind: "listening_mcq", atSec: 156, promptRu: "Куда ходил за продуктами? (из видео)", optionsRu: ["На рынок", "В супермаркет", "В магазин одежды", "В аптеку"], correctIndex: 1 },
      { id: "pd12", kind: "listening_mcq", atSec: 179, promptRu: "Что ел на ужин? (из видео)", optionsRu: ["Рамен", "Суши", "Карри", "Удон"], correctIndex: 1 },
      { id: "pd13", kind: "listening_mcq", atSec: 189, promptRu: "Что пил вечером? (из видео)", optionsRu: ["Чай", "Кофе", "Пиво", "Саке"], correctIndex: 2 },
      { id: "pd14", kind: "word_order", atSec: 198, promptRu: "Соберите: «Потом лёг спать.»", words: ["寝ました", "それから"], correctOrder: [1, 0] },
    ],
    grammarNotes: [
      {
        titleJa: "～から～まで",
        titleRu: "От… до… (время, место)",
        level: "N5",
        structure: "〔начало〕＋ から ＋ 〔конец〕＋ まで",
        explanationRu: "「から」означает «от/с», а「まで」— «до». Вместе они образуют конструкцию «от ~ до ~», которая используется для обозначения временных и пространственных промежутков. Например: 11時から12時まで = с 11 до 12. Можно использовать から и まで по отдельности: 9時まで = до 9 часов.",
        examples: [
          { ja: "11時から12時まで日本語のクラスをしました。", furigana: "じゅういちじ から じゅうにじ まで にほんご の クラス を しました。", ru: "С 11 до 12 был урок японского." },
          { ja: "9時まで本を読みました。", furigana: "くじ まで ほん を よみました。", ru: "Читал книгу до 9 часов." },
          { ja: "月曜日から金曜日まで働きます。", furigana: "げつようび から きんようび まで はたらきます。", ru: "Работаю с понедельника по пятницу." },
          { ja: "東京から大阪まで3時間です。", furigana: "とうきょう から おおさか まで さんじかん です。", ru: "От Токио до Осаки — 3 часа." },
        ],
        tip: "から и まで можно использовать по отдельности. 「9時から」= «начиная с 9», 「5時まで」= «до 5 часов».",
      },
      {
        titleJa: "それから",
        titleRu: "Потом / после этого",
        level: "N5",
        structure: "〔предложение〕。それから、〔следующее действие〕。",
        explanationRu: "「それから」— связующее слово, означающее «потом», «после этого», «а затем». Используется для последовательного перечисления действий или событий. Очень часто встречается в рассказах о распорядке дня, путешествиях, рецептах. Ставится в начале нового предложения.",
        examples: [
          { ja: "それから、コーヒーを飲みました。", furigana: "それから、コーヒー を のみました。", ru: "Потом выпил кофе." },
          { ja: "それから家で朝ごはんを食べました。", furigana: "それから いえ で あさごはん を たべました。", ru: "Потом позавтракал дома." },
          { ja: "それから、寝ました。", furigana: "それから、ねました。", ru: "Потом лёг спать." },
          { ja: "宿題をしました。それから、テレビを見ました。", furigana: "しゅくだい を しました。それから、テレビ を みました。", ru: "Сделал домашку. Потом посмотрел телевизор." },
        ],
        tip: "Синонимы: そして (и, а также), その後 (после этого — чуть формальнее). それから — самый универсальный вариант.",
      },
      {
        titleJa: "～時に",
        titleRu: "В ~ часов (указание точного времени)",
        level: "N5",
        structure: "〔число〕＋ 時（じ）＋ に ＋ 〔глагол〕",
        explanationRu: "Частица「に」после времени указывает, когда происходит действие: «в ~ часов». 時 (じ) = час. Вопрос: 何時に (なんじに) = «во сколько?». Важно: に ставится после конкретного времени (8時に, 11時に), но НЕ ставится после 昨日, 今日, 毎日 — эти слова используются без に.",
        examples: [
          { ja: "朝8時に起きました。", furigana: "あさ はちじ に おきました。", ru: "Встал в 8 утра." },
          { ja: "午後4時にスーパーへ行きました。", furigana: "ごご よじ に スーパー へ いきました。", ru: "В 4 часа дня пошёл в супермаркет." },
          { ja: "何時に寝ましたか？— 11時に寝ました。", furigana: "なんじ に ねました か？— じゅういちじ に ねました。", ru: "Во сколько лёг спать? — В 11 часов." },
        ],
        tip: "4時 = よじ (не よんじ), 7時 = しちじ, 9時 = くじ (не きゅうじ). Запомните исключения в чтении часов!",
      },
    ],
  },

  // ──────── ВИДЕО 7: ПОДКАСТ — мой город (沼津) ────────
  {
    id: "n5-podcast-town", level: "N5",
    titleRu: "Подкаст: мой город — 沼津",
    descriptionRu: "Рассказ о городе Нумадзу: 静岡県, 新幹線, 魚, 富士山, ～くらい.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/n5-podcast-town.mp4" },
    subtitles: [
      { startSec: 47.2, endSec: 50.6, ja: "私の街は沼津です。", furigana: "わたし の まち は ぬまづ です。" },
      { startSec: 50.6, endSec: 54.6, ja: "沼津は静岡県にあります。", furigana: "ぬまづ は しずおかけん に あります。" },
      { startSec: 54.6, endSec: 60.2, ja: "東京から沼津まで2時間くらいです。", furigana: "とうきょう から ぬまづ まで にじかん くらい です。" },
      { startSec: 60.2, endSec: 68.1, ja: "東京から三島駅まで新幹線で1時間半くらいです。", furigana: "とうきょう から みしまえき まで しんかんせん で いちじかんはん くらい です。" },
      { startSec: 75.6, endSec: 79.3, ja: "沼津は静かな街です。", furigana: "ぬまづ は しずか な まち です。" },
      { startSec: 79.3, endSec: 83.5, ja: "綺麗な山と海があります。", furigana: "きれい な やま と うみ が あります。" },
      { startSec: 83.5, endSec: 87.4, ja: "沼津は魚が有名です。", furigana: "ぬまづ は さかな が ゆうめい です。" },
      { startSec: 87.4, endSec: 92.1, ja: "沼津の有名なところは沼津港です。", furigana: "ぬまづ の ゆうめい な ところ は ぬまづこう です。" },
      { startSec: 107.9, endSec: 114.3, ja: "ここで美味しい魚の料理を食べることができます。", furigana: "ここ で おいしい さかな の りょうり を たべる こと が できます。" },
      { startSec: 114.3, endSec: 118.6, ja: "私のおすすめは生しらすです。", furigana: "わたし の おすすめ は なま しらす です。" },
      { startSec: 141, endSec: 145.6, ja: "らららサンビーチは静かでとても綺麗なビーチです。", furigana: "ららら サン ビーチ は しずか で とても きれい な ビーチ です。" },
      { startSec: 145.6, endSec: 151, ja: "らららサンビーチから富士山が見えますよ。", furigana: "ららら サン ビーチ から ふじさん が みえます よ。" },
    ],
    questions: [
      { id: "pt01", kind: "listening_mcq", atSec: 52, promptRu: "Какой это город? (из видео)", optionsRu: ["Токио", "Киото", "Нумадзу", "Осака"], correctIndex: 2, explanationRu: "私の街は沼津です = Мой город — Нумадзу." },
      { id: "pt02", kind: "listening_mcq", atSec: 56, promptRu: "В какой префектуре Нумадзу? (из видео)", optionsRu: ["Токио", "Кансай", "Сидзуока", "Осака"], correctIndex: 2, explanationRu: "沼津は静岡県にあります." },
      { id: "pt03", kind: "kanji_translate", atSec: 56, promptRu: "Переведите「静岡県」.", kanji: "静岡県", acceptedRu: ["префектура Сидзуока", "Сидзуока"] },
      { id: "pt04", kind: "listening_mcq", atSec: 62, promptRu: "Сколько ехать из Токио до Нумадзу? (из видео)", optionsRu: ["1 час", "2 часа", "3 часа", "30 минут"], correctIndex: 1 },
      { id: "pt05", kind: "listening_mcq", atSec: 70, promptRu: "Чем едут из Токио до станции Мисима? (из видео)", optionsRu: ["Автобусом", "Электричкой", "Синкансэном", "Такси"], correctIndex: 2 },
      { id: "pt06", kind: "kanji_translate", atSec: 70, promptRu: "Переведите「新幹線」.", kanji: "新幹線", acceptedRu: ["синкансэн", "скоростной поезд"] },
      { id: "pt07", kind: "listening_mcq", atSec: 81, promptRu: "Какой город Нумадзу? (из видео)", optionsRu: ["Шумный", "Тихий", "Большой", "Далеко"], correctIndex: 1, explanationRu: "沼津は静かな街です." },
      { id: "pt08", kind: "listening_mcq", atSec: 88, promptRu: "Чем славится Нумадзу? (из видео)", optionsRu: ["Горами", "Рыбой", "Храмами", "Аниме"], correctIndex: 1, explanationRu: "沼津は魚が有名です." },
      { id: "pt09", kind: "listening_mcq", atSec: 93, promptRu: "Какое известное место в Нумадзу? (из видео)", optionsRu: ["Замок", "Порт", "Храм", "Парк"], correctIndex: 1, explanationRu: "沼津港 = порт Нумадзу." },
      { id: "pt10", kind: "listening_mcq", atSec: 120, promptRu: "Что рекомендует рассказчик попробовать? (из видео)", optionsRu: ["Суши", "Рамен", "Сырые мальки (сирасу)", "Тэмпура"], correctIndex: 2, explanationRu: "生しらす = сырые мальки сардины." },
      { id: "pt11", kind: "listening_mcq", atSec: 148, promptRu: "Что видно с пляжа らららサン? (из видео)", optionsRu: ["Токио Тауэр", "Фудзи", "Киото", "Море"], correctIndex: 1, explanationRu: "富士山が見えます = Видна гора Фудзи." },
      { id: "pt12", kind: "kanji_translate", atSec: 148, promptRu: "Переведите「富士山」.", kanji: "富士山", acceptedRu: ["гора Фудзи", "Фудзи"] },
      { id: "pt13", kind: "word_order", atSec: 82, promptRu: "Соберите: «Нумадзу — тихий город.»", words: ["です", "街", "静かな", "は", "沼津"], correctOrder: [4, 3, 2, 1, 0] },
    ],
    grammarNotes: [
      {
        titleJa: "～にあります",
        titleRu: "Находится в/на (местоположение неодушевлённых предметов)",
        level: "N5",
        structure: "〔место〕＋ に ＋ 〔предмет〕＋ が ＋ あります",
        explanationRu: "「～にあります」используется для указания местоположения неодушевлённых предметов. Частица に указывает на место, а あります — глагол существования для неживых объектов. Порядок: «Место に Предмет が あります» = «В месте есть предмет». Для людей и животных вместо あります используют います.",
        examples: [
          { ja: "沼津は静岡県にあります。", furigana: "ぬまづ は しずおかけん に あります。", ru: "Нумадзу находится в префектуре Сидзуока." },
          { ja: "綺麗な山と海があります。", furigana: "きれい な やま と うみ が あります。", ru: "Есть красивые горы и море." },
          { ja: "テーブルの上に本があります。", furigana: "テーブル の うえ に ほん が あります。", ru: "На столе есть книга." },
          { ja: "駅の近くにコンビニがあります。", furigana: "えき の ちかく に コンビニ が あります。", ru: "Рядом со станцией есть комбини." },
        ],
        tip: "あります = неживое (книги, здания, города). います = живое (люди, животные). Не путайте!",
      },
      {
        titleJa: "～くらい",
        titleRu: "Примерно / около",
        level: "N5",
        structure: "〔число / количество〕＋ くらい（≈ぐらい）",
        explanationRu: "「～くらい」(или ぐらい) означает «примерно», «около». Ставится после числа или количества, чтобы показать приблизительность. Например: 2時間くらい = примерно 2 часа. Формы くらい и ぐらい взаимозаменяемы, но ぐらい чуть разговорнее. Очень полезно при описании времени, расстояний, количества.",
        examples: [
          { ja: "東京から沼津まで2時間くらいです。", furigana: "とうきょう から ぬまづ まで にじかん くらい です。", ru: "От Токио до Нумадзу — примерно 2 часа." },
          { ja: "新幹線で1時間半くらいです。", furigana: "しんかんせん で いちじかんはん くらい です。", ru: "На синкансэне — примерно полтора часа." },
          { ja: "30分くらい待ちました。", furigana: "さんじゅっぷん くらい まちました。", ru: "Ждал примерно 30 минут." },
          { ja: "500円くらいです。", furigana: "ごひゃくえん くらい です。", ru: "Примерно 500 иен." },
        ],
        tip: "くらい и ぐらい — одно и то же. Выбирайте то, что легче произнести в контексте.",
      },
      {
        titleJa: "～があります / います",
        titleRu: "Есть / существует (неодуш. / одуш.)",
        level: "N5",
        structure: "〔место〕＋ に ＋ 〔предмет/существо〕＋ が ＋ あります（неодуш.）/ います（одуш.）",
        explanationRu: "「あります」используется для неодушевлённых предметов (горы, здания, магазины), а「います」— для одушевлённых (люди, животные). Место обозначается частицей に. Эта конструкция описывает существование или наличие чего-то/кого-то в определённом месте. Отрицание: ありません / いません.",
        examples: [
          { ja: "綺麗な山と海があります。", furigana: "きれい な やま と うみ が あります。", ru: "Есть красивые горы и море." },
          { ja: "駅の近くにコンビニがあります。", furigana: "えき の ちかく に コンビニ が あります。", ru: "Рядом со станцией есть комбини." },
          { ja: "公園に子供がいます。", furigana: "こうえん に こども が います。", ru: "В парке есть дети." },
        ],
        tip: "あります = неживое (本, 山, 店). います = живое (人, 猫, 鳥). Растения — あります (они не двигаются).",
      },
    ],
  },

  // ──────── Доп. нарезки (N5) — добавлено из Desktop\\narezki ────────
  {
    id: "n5-narezki-student", level: "N5",
    titleRu: "Мини‑диалог: студент и специальность",
    descriptionRu: "Короткое интервью: 留学生, 専攻, 大学, 二年生. Практика вопросов 〜ですか / 何ですか.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/narezki-01.mp4" },
    subtitles: [
      { startSec: 0, endSec: 2, ja: "留学生ですか？", furigana: "りゅうがくせい です か？" },
      { startSec: 2, endSec: 4, ja: "ええ！", furigana: "ええ！" },
      { startSec: 4, endSec: 7, ja: "アリゾナ大学の学生です！", furigana: "アリゾナ だいがく の がくせい です！" },
      { startSec: 7, endSec: 8.5, ja: "そうですか！", furigana: "そう です か！" },
      { startSec: 8.5, endSec: 10.5, ja: "専攻は何ですか？", furigana: "せんこう は なん です か？" },
      { startSec: 10.5, endSec: 12.5, ja: "日本語です！", furigana: "にほんご です！" },
      { startSec: 12.5, endSec: 15.5, ja: "今、二年生です！", furigana: "いま、にねんせい です！" },
    ],
    questions: [
      { id: "ns01", kind: "listening_mcq", atSec: 2.4, promptRu: "「留学生ですか？」— что спрашивают?", optionsRu: ["Вы преподаватель?", "Вы студент по обмену?", "Вы японец?", "Вы турист?"], correctIndex: 1, explanationRu: "留学生（りゅうがくせい）= студент, который учится за границей." },
      { id: "ns02", kind: "kanji_translate", atSec: 2.4, promptRu: "Переведите「留学生」.", kanji: "留学生", acceptedRu: ["студент по обмену", "иностранный студент", "студент-иностранец"] },
      { id: "ns03", kind: "word_order", atSec: 7.3, promptRu: "Соберите: «Я студент Аризонского университета.»", words: ["です", "学生", "の", "アリゾナ大学"], correctOrder: [3, 2, 1, 0], explanationRu: "アリゾナ大学の学生です。" },
      { id: "ns04", kind: "kanji_translate", atSec: 7.3, promptRu: "Переведите「大学」.", kanji: "大学", acceptedRu: ["университет", "вуз"] },
      { id: "ns05", kind: "kanji_translate", atSec: 7.3, promptRu: "Переведите「学生」.", kanji: "学生", acceptedRu: ["студент", "ученик"] },
      { id: "ns06", kind: "listening_mcq", atSec: 8.9, promptRu: "Грамматика: «そうですか» чаще означает:", optionsRu: ["Пожалуйста", "Понятно / вот как", "Извините", "До свидания"], correctIndex: 1 },
      { id: "ns07", kind: "listening_mcq", atSec: 10.9, promptRu: "«専攻は何ですか？」— это вопрос о:", optionsRu: ["Возрасте", "Специальности/мажоре", "Городе", "Работе"], correctIndex: 1, explanationRu: "専攻（せんこう）= специальность, major." },
      { id: "ns08", kind: "kanji_translate", atSec: 10.9, promptRu: "Переведите「専攻」.", kanji: "専攻", acceptedRu: ["специальность", "профиль", "мажор"] },
      { id: "ns09", kind: "word_order", atSec: 10.9, promptRu: "Соберите: «Какая у вас специальность?»", words: ["専攻", "は", "何", "ですか"], correctOrder: [0, 1, 2, 3], explanationRu: "専攻は何ですか？" },
      { id: "ns10", kind: "kanji_translate", atSec: 12.8, promptRu: "Переведите「日本語」.", kanji: "日本語", acceptedRu: ["японский язык", "японский"] },
      { id: "ns11", kind: "listening_mcq", atSec: 15.9, promptRu: "Что означает「二年生」?", optionsRu: ["Второй курс", "Два года", "Два человека", "Две книги"], correctIndex: 0, explanationRu: "二年生 = «второкурсник/2-й год обучения»." },
      { id: "ns12", kind: "kanji_translate", atSec: 15.9, promptRu: "Переведите「二年生」.", kanji: "二年生", acceptedRu: ["второй курс", "второкурсник", "2-й курс"] },
      { id: "ns13", kind: "kanji_translate", atSec: 15.9, promptRu: "Переведите「今」.", kanji: "今", acceptedRu: ["сейчас", "теперь"] },
      { id: "ns14", kind: "word_order", atSec: 15.9, promptRu: "Соберите: «Сейчас я на втором курсе.»", words: ["です", "二年生", "今"], correctOrder: [2, 1, 0], explanationRu: "今、二年生です。" },
    ],
    grammarNotes: [
      {
        titleJa: "～ですか",
        titleRu: "Вопрос с ですか (да/нет)",
        level: "N5",
        structure: "〔существительное / な-прилагательное〕＋ ですか？",
        explanationRu: "「～ですか」— базовая вопросительная конструкция. Чтобы задать вопрос типа «да/нет», достаточно добавить か в конце предложения с です. Интонация повышается к концу. Ответ: はい (да) или いいえ (нет). Это самый простой способ задать вопрос в японском языке.",
        examples: [
          { ja: "留学生ですか？", furigana: "りゅうがくせい です か？", ru: "Вы студент по обмену?" },
          { ja: "日本人ですか？", furigana: "にほんじん です か？", ru: "Вы японец?" },
          { ja: "学生ですか？", furigana: "がくせい です か？", ru: "Вы студент?" },
          { ja: "先生ですか？", furigana: "せんせい です か？", ru: "Вы учитель?" },
        ],
        tip: "В разговорной речи か иногда опускают, и вопрос передаётся только интонацией: 「学生？」",
      },
      {
        titleJa: "何ですか",
        titleRu: "Что это? / Что такое…?",
        level: "N5",
        structure: "〔тема〕＋ は ＋ 何ですか？",
        explanationRu: "「何ですか」(なんですか) — вопрос «что это?» или «что такое ~?». 何 (なに/なん) = «что». Перед です читается как なん. Используется для уточнения информации: «Какая у вас специальность?» = 専攻は何ですか？ Это один из самых частых вопросов в повседневном общении.",
        examples: [
          { ja: "専攻は何ですか？", furigana: "せんこう は なん です か？", ru: "Какая у вас специальность?" },
          { ja: "これは何ですか？", furigana: "これ は なん です か？", ru: "Что это?" },
          { ja: "お名前は何ですか？", furigana: "おなまえ は なん です か？", ru: "Как вас зовут?" },
          { ja: "趣味は何ですか？", furigana: "しゅみ は なん です か？", ru: "Какое у вас хобби?" },
        ],
        tip: "何 читается なに перед частицами (何が, 何を) и なん перед です, の, で (何ですか, 何の, 何で).",
      },
      {
        titleJa: "～を勉強しています",
        titleRu: "Изучаю ~ (текущее занятие)",
        level: "N5",
        structure: "〔предмет〕＋ を ＋ 勉強しています",
        explanationRu: "「～を勉強しています」— конструкция для описания того, что вы сейчас изучаете. 勉強する = учиться, заниматься. Форма ～しています указывает на продолжающееся действие или текущее состояние. Предмет изучения отмечается частицей を. Часто используется при знакомстве и рассказе о себе.",
        examples: [
          { ja: "日本語を勉強しています。", furigana: "にほんご を べんきょう して います。", ru: "Я изучаю японский язык." },
          { ja: "大学で経済学を勉強しています。", furigana: "だいがく で けいざいがく を べんきょう して います。", ru: "В университете изучаю экономику." },
          { ja: "毎日漢字を勉強しています。", furigana: "まいにち かんじ を べんきょう して います。", ru: "Каждый день учу кандзи." },
        ],
        tip: "勉強する = учить (что-то конкретное). 勉強になる = «это познавательно» (полезное выражение для разговора).",
      },
    ],
  },

  {
    id: "n5-narezki-body", level: "N5",
    titleRu: "Лексика: части тела и описания людей",
    descriptionRu: "Части тела: 顔, 体, 首, 肩, 腕, 手, 指, お腹, 足. Описание: 男/女, 背が高い/低い, 太っています/やせています.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/narezki-02.mp4" },
    subtitles: [
      { startSec: 0, endSec: 4, ja: "これは人です。", furigana: "これ は ひと です。" },
      { startSec: 4, endSec: 10, ja: "これは顔です。", furigana: "これ は かお です。" },
      { startSec: 10, endSec: 16, ja: "これは体です。", furigana: "これ は からだ です。" },
      { startSec: 16, endSec: 24, ja: "今から体を書きます。", furigana: "いま から からだ を かきます。" },
      { startSec: 24, endSec: 32, ja: "これは首です。", furigana: "これ は くび です。" },
      { startSec: 42, endSec: 51, ja: "これは肩です。", furigana: "これ は かた です。" },
      { startSec: 64, endSec: 71, ja: "これは腕です。", furigana: "これ は うで です。" },
      { startSec: 87, endSec: 97, ja: "これは手です。", furigana: "これ は て です。" },
      { startSec: 115, endSec: 121, ja: "これは私の手です。", furigana: "これ は わたし の て です。" },
      { startSec: 121, endSec: 132, ja: "右手。左手。両手。", furigana: "みぎて。ひだりて。りょうて。" },
      { startSec: 132, endSec: 147, ja: "指です。指が五本あります。", furigana: "ゆび です。ゆび が ごほん あります。" },
      { startSec: 147, endSec: 158, ja: "ここはお腹です。", furigana: "ここ は おなか です。" },
      { startSec: 158, endSec: 167, ja: "これは足です。", furigana: "これ は あし です。" },
      { startSec: 167, endSec: 183, ja: "この人は女の人です。男の人じゃありません。", furigana: "この ひと は おんな の ひと です。おとこ の ひと じゃ ありません。" },
      { startSec: 183, endSec: 209, ja: "この人は男の人です。女の人じゃありません。", furigana: "この ひと は おとこ の ひと です。おんな の ひと じゃ ありません。" },
      { startSec: 209, endSec: 222, ja: "この人は背が高いです。背が低くないです。", furigana: "この ひと は せ が たかい です。せ が ひくくない です。" },
      { startSec: 235, endSec: 247, ja: "この人は背が低いです。背が高くないです。", furigana: "この ひと は せ が ひくい です。せ が たかくない です。" },
      { startSec: 247, endSec: 260, ja: "この人は太っています。やせていません。", furigana: "この ひと は ふとって います。やせて いません。" },
      { startSec: 260, endSec: 271, ja: "この人はやせています。太っていません。", furigana: "この ひと は やせて います。ふとって いません。" },
      { startSec: 281, endSec: 304, ja: "今日は人の体を書きました。今日はこれでおしまい。またね。", furigana: "きょう は ひと の からだ を かきました。きょう は これ で おしまい。また ね。" },
    ],
    questions: [
      { id: "nb01", kind: "listening_mcq", atSec: 10.6, promptRu: "「顔」— это:", optionsRu: ["голова", "лицо", "рука", "нога"], correctIndex: 1 },
      { id: "nb02", kind: "kanji_translate", atSec: 10.6, promptRu: "Переведите「顔」.", kanji: "顔", acceptedRu: ["лицо"] },
      { id: "nb03", kind: "kanji_translate", atSec: 16.6, promptRu: "Переведите「体」.", kanji: "体", acceptedRu: ["тело"] },
      { id: "nb04", kind: "listening_mcq", atSec: 24.6, promptRu: "Грамматика: «今から〜します» означает:", optionsRu: ["Я уже сделал", "Я сейчас буду делать", "Я не буду делать", "Я делаю каждый день"], correctIndex: 1, explanationRu: "今から = с этого момента, сейчас; 〜します = буду делать (вежливо)." },
      { id: "nb05", kind: "kanji_translate", atSec: 32.6, promptRu: "Переведите「首」.", kanji: "首", acceptedRu: ["шея"] },
      { id: "nb06", kind: "kanji_translate", atSec: 51.6, promptRu: "Переведите「肩」.", kanji: "肩", acceptedRu: ["плечо"] },
      { id: "nb07", kind: "kanji_translate", atSec: 71.6, promptRu: "Переведите「腕」.", kanji: "腕", acceptedRu: ["рука", "предплечье"] },
      { id: "nb08", kind: "kanji_translate", atSec: 97.6, promptRu: "Переведите「手」.", kanji: "手", acceptedRu: ["рука", "кисть"] },
      { id: "nb09", kind: "kanji_translate", atSec: 132.6, promptRu: "Переведите「右手」.", kanji: "右手", acceptedRu: ["правая рука", "правая кисть"] },
      { id: "nb10", kind: "kanji_translate", atSec: 132.6, promptRu: "Переведите「左手」.", kanji: "左手", acceptedRu: ["левая рука", "левая кисть"] },
      { id: "nb11", kind: "kanji_translate", atSec: 132.6, promptRu: "Переведите「両手」.", kanji: "両手", acceptedRu: ["обе руки", "две руки"] },
      { id: "nb12", kind: "word_order", atSec: 147.6, promptRu: "Соберите: «Пальцев пять.»", words: ["あります", "五本", "が", "指"], correctOrder: [3, 2, 1, 0], explanationRu: "指が五本あります。" },
      { id: "nb13", kind: "kanji_translate", atSec: 147.6, promptRu: "Переведите「指」.", kanji: "指", acceptedRu: ["палец", "пальцы"] },
      { id: "nb14", kind: "kanji_translate", atSec: 147.6, promptRu: "Переведите「五本」.", kanji: "五本", acceptedRu: ["пять (штук)", "пять"] },
      { id: "nb15", kind: "kanji_translate", atSec: 158.6, promptRu: "Переведите「お腹」.", kanji: "腹", acceptedRu: ["живот"] },
      { id: "nb16", kind: "kanji_translate", atSec: 167.6, promptRu: "Переведите「足」.", kanji: "足", acceptedRu: ["нога", "ступня"] },
      { id: "nb17", kind: "listening_mcq", atSec: 183.6, promptRu: "Грамматика: «〜じゃありません» — это:", optionsRu: ["Прошедшее время", "Отрицание です (вежливо)", "Вопрос", "Повелительное"], correctIndex: 1 },
      { id: "nb18", kind: "kanji_translate", atSec: 183.6, promptRu: "Переведите「女の人」.", kanji: "女", acceptedRu: ["женщина", "женский"] },
      { id: "nb19", kind: "kanji_translate", atSec: 209.6, promptRu: "Переведите「男の人」.", kanji: "男", acceptedRu: ["мужчина", "мужской"] },
      { id: "nb20", kind: "listening_mcq", atSec: 222.6, promptRu: "«背が高いです» означает:", optionsRu: ["Низкий рост", "Высокий рост", "Толстый", "Худой"], correctIndex: 1 },
      { id: "nb21", kind: "listening_mcq", atSec: 260.6, promptRu: "«太っています» означает:", optionsRu: ["Худой", "Толстый/полный", "Высокий", "Молодой"], correctIndex: 1 },
      { id: "nb22", kind: "listening_mcq", atSec: 271.6, promptRu: "«やせています» означает:", optionsRu: ["Худой", "Толстый", "Красивый", "Старый"], correctIndex: 0 },
      { id: "nb23", kind: "word_order", atSec: 222.6, promptRu: "Соберите: «Этот человек высокий.»", words: ["です", "高い", "が", "背", "は", "この人"], correctOrder: [5, 4, 3, 2, 1, 0], explanationRu: "この人は背が高いです。" },
      { id: "nb24", kind: "word_order", atSec: 271.6, promptRu: "Соберите: «Этот человек не худой.»", words: ["いません", "やせて", "は", "この人"], correctOrder: [3, 2, 1, 0], explanationRu: "この人はやせていません。" },
    ],
    grammarNotes: [
      {
        titleJa: "これは～です",
        titleRu: "Это — … (базовое определение)",
        level: "N5",
        structure: "これ は ＋ 〔существительное〕＋ です",
        explanationRu: "「これは～です」— самая базовая конструкция японского языка: «Это — [что-то]». これ = это (предмет рядом с говорящим), は = тематическая частица, です = связка (есть/является). Используется для представления, определения и описания предметов. Это первая грамматика, которую учат на N5.",
        examples: [
          { ja: "これは人です。", furigana: "これ は ひと です。", ru: "Это — человек." },
          { ja: "これは顔です。", furigana: "これ は かお です。", ru: "Это — лицо." },
          { ja: "これは手です。", furigana: "これ は て です。", ru: "Это — рука." },
          { ja: "これは私の本です。", furigana: "これ は わたし の ほん です。", ru: "Это — моя книга." },
        ],
        tip: "Для «этот + существительное» используйте この: この人は先生です (Этот человек — учитель).",
      },
      {
        titleJa: "～じゃありません",
        titleRu: "Не является… (отрицание です)",
        level: "N5",
        structure: "〔существительное〕＋ じゃありません / ではありません",
        explanationRu: "「～じゃありません」— отрицательная форма です: «не является ~». じゃありません — разговорный вариант, ではありません — более формальный. Используется для отрицания: «Это не мужчина» = 男の人じゃありません. Прошедшее отрицание: じゃありませんでした.",
        examples: [
          { ja: "男の人じゃありません。", furigana: "おとこ の ひと じゃ ありません。", ru: "Это не мужчина." },
          { ja: "女の人じゃありません。", furigana: "おんな の ひと じゃ ありません。", ru: "Это не женщина." },
          { ja: "学生じゃありません。", furigana: "がくせい じゃ ありません。", ru: "Я не студент." },
          { ja: "これは寿司じゃありません。", furigana: "これ は すし じゃ ありません。", ru: "Это не суши." },
          { ja: "日本人ではありません。", furigana: "にほんじん では ありません。", ru: "Я не японец." },
        ],
        tip: "じゃありません = разговорный, ではありません = формальный. Смысл одинаковый.",
      },
      {
        titleJa: "～は何ですか",
        titleRu: "Что такое ~? (вопрос об определении)",
        level: "N5",
        structure: "〔тема〕＋ は ＋ 何（なん）＋ ですか？",
        explanationRu: "「～は何ですか」— универсальный вопрос «что такое ~?» или «что это?». Тема ставится перед は, а 何ですか задаёт вопрос. Используется для выяснения названий, определений, значений. В видео учитель указывает на части тела и спрашивает/объясняет: «これは手です» (Это — рука). Вопросная форма: «これは何ですか？» (Что это?).",
        examples: [
          { ja: "これは何ですか？— これは手です。", furigana: "これ は なん です か？— これ は て です。", ru: "Что это? — Это рука." },
          { ja: "お名前は何ですか？", furigana: "おなまえ は なん です か？", ru: "Как вас зовут?" },
          { ja: "趣味は何ですか？— 絵を描くことです。", furigana: "しゅみ は なん です か？— え を かく こと です。", ru: "Какое у вас хобби? — Рисование." },
        ],
        tip: "何 перед です читается なん (не なに). Перед が и を — なに: 何がありますか, 何を食べますか.",
      },
    ],
  },

  {
    id: "n5-narezki-boyfriend", level: "N5",
    titleRu: "История: «Хочу парня»",
    descriptionRu: "Лексика и грамматика: 欲しい, 好き, ～のが好き, ～たい, けど, 過去形 しました, 一緒に.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/narezki-04.mp4" },
    subtitles: [
      { startSec: 0, endSec: 9, ja: "レベルゼロ。彼氏が欲しい。", furigana: "レベル ゼロ。かれし が ほしい。" },
      { startSec: 9, endSec: 23, ja: "私はまゆです。絵を書くのが好きです。", furigana: "わたし は まゆ です。え を かく の が すき です。" },
      { startSec: 30, endSec: 37, ja: "ロマンチックだから、少女漫画が好きです。", furigana: "ロマンチック だから、しょうじょ まんが が すき です。" },
      { startSec: 37, endSec: 49, ja: "私は恋をしたいけど、彼氏がいません。", furigana: "わたし は こい を したい けど、かれし が いません。" },
      { startSec: 49, endSec: 54, ja: "彼氏が欲しいなぁ。", furigana: "かれし が ほしい なぁ。" },
      { startSec: 61, endSec: 65, ja: "あ、そうだ。", furigana: "あ、そう だ。" },
      { startSec: 70, endSec: 76, ja: "キラーン。彼氏を書きます。", furigana: "キラーン。かれし を かきます。" },
      { startSec: 98, endSec: 101, ja: "出来ました。", furigana: "できました。" },
      { startSec: 118, endSec: 126, ja: "だ、誰？ドキドキ。", furigana: "だ、だれ？ドキドキ。" },
      { startSec: 131, endSec: 134, ja: "彼氏だよ。", furigana: "かれし だ よ。" },
      { startSec: 143.4, endSec: 153.8, ja: "私たちはデートをしました。一緒に漫画を読みました。とても楽しかったです。", furigana: "わたしたち は デート を しました。いっしょ に まんが を よみました。とても たのしかった です。" },
      { startSec: 159.7, endSec: 164.7, ja: "でも、ある日、彼氏の絵に水が…。", furigana: "でも、あるひ、かれし の え に みず が…" },
      { startSec: 174, endSec: 176, ja: "私の彼氏ー！", furigana: "わたし の かれしー！" },
      { startSec: 199.2, endSec: 205.1, ja: "完成。もう一度書きます。", furigana: "かんせい。もう いちど かきます。" },
    ],
    questions: [
      { id: "bf01", kind: "listening_mcq", atSec: 10, promptRu: "«彼氏が欲しい» означает:", optionsRu: ["У меня есть парень", "Я хочу парня", "Я люблю парня", "Я не хочу парня"], correctIndex: 1, explanationRu: "欲しい = хотеть (что-то/кого-то)." },
      { id: "bf02", kind: "kanji_translate", atSec: 10, promptRu: "Переведите「彼氏」.", kanji: "彼氏", acceptedRu: ["парень", "бойфренд"] },
      { id: "bf03", kind: "listening_mcq", atSec: 24, promptRu: "Грамматика: «絵を書くのが好きです» — что любит делать героиня?", optionsRu: ["Петь", "Писать иероглифы", "Рисовать (рисунки)", "Готовить"], correctIndex: 2 },
      { id: "bf04", kind: "kanji_translate", atSec: 24, promptRu: "Переведите「絵」.", kanji: "絵", acceptedRu: ["рисунок", "картина"] },
      { id: "bf05", kind: "listening_mcq", atSec: 38, promptRu: "Грамматика: «〜のが好き» чаще используется, когда нравится:", optionsRu: ["Предмет (существительное)", "Действие (глагол)", "Только прилагательное", "Только частицы"], correctIndex: 1, explanationRu: "絵を書くのが好き = «нравится рисовать»." },
      { id: "bf06", kind: "kanji_translate", atSec: 38, promptRu: "Переведите「好き」.", kanji: "好き", acceptedRu: ["нравится", "люблю"] },
      { id: "bf07", kind: "kanji_translate", atSec: 38, promptRu: "Переведите「少女漫画」.", kanji: "少女漫画", acceptedRu: ["сёдзё-манга", "манга для девушек", "романтическая манга"] },
      { id: "bf08", kind: "listening_mcq", atSec: 50, promptRu: "Грамматика: «恋をしたい» — это:", optionsRu: ["Хочу учиться", "Хочу влюбиться", "Хочу спать", "Хочу работать"], correctIndex: 1 },
      { id: "bf09", kind: "kanji_translate", atSec: 50, promptRu: "Переведите「恋」.", kanji: "恋", acceptedRu: ["любовь", "влюблённость"] },
      { id: "bf10", kind: "listening_mcq", atSec: 55, promptRu: "Грамматика: «けど» ближе всего к:", optionsRu: ["и", "но/однако", "потому что", "поэтому"], correctIndex: 1 },
      { id: "bf11", kind: "word_order", atSec: 55, promptRu: "Соберите: «У меня нет парня.»", words: ["いません", "が", "彼氏", "私には"], correctOrder: [3, 2, 1, 0], explanationRu: "私には彼氏がいません。" },
      { id: "bf12", kind: "listening_mcq", atSec: 77, promptRu: "Грамматика: «〜をします» — это:", optionsRu: ["Вежливое настоящее/будущее", "Только прошедшее", "Только отрицание", "Приказ"], correctIndex: 0 },
      { id: "bf13", kind: "word_order", atSec: 102, promptRu: "Соберите: «Я нарисую парня.»", words: ["書きます", "を", "彼氏", "私は"], correctOrder: [3, 2, 1, 0], explanationRu: "私は彼氏を書きます。" },
      { id: "bf14", kind: "listening_mcq", atSec: 154, promptRu: "Грамматика: «一緒に» означает:", optionsRu: ["Сразу", "Вместе", "Потом", "Снаружи"], correctIndex: 1 },
      { id: "bf15", kind: "kanji_translate", atSec: 154, promptRu: "Переведите「一緒」.", kanji: "一緒", acceptedRu: ["вместе"] },
      { id: "bf16", kind: "listening_mcq", atSec: 154, promptRu: "Прошедшее: «デートをしました» — это:", optionsRu: ["Будут встречаться", "Сходили на свидание", "Не ходили", "Хотят сходить"], correctIndex: 1 },
      { id: "bf17", kind: "kanji_translate", atSec: 154, promptRu: "Переведите「楽しい」.", kanji: "楽しい", acceptedRu: ["весёлый", "приятный", "интересный"] },
      { id: "bf18", kind: "kanji_translate", atSec: 165, promptRu: "Переведите「水」.", kanji: "水", acceptedRu: ["вода"] },
      { id: "bf19", kind: "kanji_translate", atSec: 206, promptRu: "Переведите「完成」.", kanji: "完成", acceptedRu: ["готово", "завершение", "готовность"] },
      { id: "bf20", kind: "word_order", atSec: 206, promptRu: "Соберите: «Ещё раз нарисую.»", words: ["書きます", "もう一度"], correctOrder: [1, 0], explanationRu: "もう一度書きます。" },
    ],
    grammarNotes: [
      {
        titleJa: "～が欲しい",
        titleRu: "Хочу (что-то) — желание предмета",
        level: "N5",
        structure: "〔существительное〕＋ が ＋ 欲しい（ほしい）",
        explanationRu: "「～が欲しい」выражает желание иметь что-то (предмет, а не действие). 欲しい — い-прилагательное, означающее «желанный». Частица が отмечает объект желания. Используется только для своих желаний (1-е лицо) или в вопросах. Отрицание: 欲しくない. Прошедшее: 欲しかった.",
        examples: [
          { ja: "彼氏が欲しい。", furigana: "かれし が ほしい。", ru: "Хочу парня." },
          { ja: "新しいパソコンが欲しいです。", furigana: "あたらしい パソコン が ほしい です。", ru: "Хочу новый компьютер." },
          { ja: "何が欲しいですか？", furigana: "なに が ほしい です か？", ru: "Что вы хотите?" },
          { ja: "お金が欲しくないです。", furigana: "おかね が ほしくない です。", ru: "Не хочу денег." },
        ],
        tip: "欲しい = хочу ПРЕДМЕТ (сущ. が 欲しい). ～たい = хочу ДЕЛАТЬ (глагол + たい). Не путайте!",
      },
      {
        titleJa: "～のが好き",
        titleRu: "Нравится делать (что-то)",
        level: "N5",
        structure: "〔глагол-словарная форма〕＋ のが ＋ 好き（すき）です",
        explanationRu: "「～のが好きです」— конструкция для выражения «нравится делать что-то». Глагол в словарной форме + の превращает действие в существительное (номинализация). Затем добавляется が好きです. Например: 絵を書くのが好き = нравится рисовать. Это очень частая конструкция в повседневной речи.",
        examples: [
          { ja: "絵を書くのが好きです。", furigana: "え を かく の が すき です。", ru: "Мне нравится рисовать." },
          { ja: "音楽を聞くのが好きです。", furigana: "おんがく を きく の が すき です。", ru: "Мне нравится слушать музыку." },
          { ja: "料理を作るのが好きです。", furigana: "りょうり を つくる の が すき です。", ru: "Мне нравится готовить." },
          { ja: "本を読むのが好きです。", furigana: "ほん を よむ の が すき です。", ru: "Мне нравится читать книги." },
        ],
        tip: "の в этой конструкции = «то, что» (номинализатор). 書くの = «то, что рисую» → 書くのが好き = «нравится то, что рисую».",
      },
      {
        titleJa: "～が好きです",
        titleRu: "Нравится ~ / люблю ~",
        level: "N5",
        structure: "〔существительное〕＋ が ＋ 好き（すき）＋ です",
        explanationRu: "「～が好きです」— конструкция для выражения симпатии или любви к чему-то/кому-то. 好き — な-прилагательное, означающее «любимый, нравящийся». Объект симпатии отмечается частицей が. Отрицание: 好きじゃないです. Степень: 大好き (обожаю). Тема (кому нравится) отмечается は.",
        examples: [
          { ja: "少女漫画が好きです。", furigana: "しょうじょ まんが が すき です。", ru: "Мне нравится сёдзё-манга." },
          { ja: "猫が好きです。", furigana: "ねこ が すき です。", ru: "Я люблю кошек." },
          { ja: "日本の音楽が大好きです。", furigana: "にほん の おんがく が だいすき です。", ru: "Я обожаю японскую музыку." },
        ],
        tip: "好き использует が (не を): 猫が好き ✓, 猫を好き ✗. Для действий: ～のが好き (絵を書くのが好き).",
      },
    ],
  },

  {
    id: "n5-narezki-foxcrane", level: "N5",
    titleRu: "Сказка: лиса и журавль (〜ませんか / あります / 上・中)",
    descriptionRu: "Короткий рассказ: приглашение «〜ませんか», местоположение «〜にあります», лексика 皿/壺/肉, эмоции 困りました/笑いました.",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/narezki-06.mp4" },
    subtitles: [
      { startSec: 0, endSec: 2.8, ja: "ある日、きつねがつるに言いました。", furigana: "ある ひ、きつね が つる に いいました。" },
      { startSec: 2.8, endSec: 6.8, ja: "今日、僕の家で一緒にご飯を食べませんか？", furigana: "きょう、ぼく の いえ で いっしょ に ごはん を たべません か？" },
      { startSec: 6.8, endSec: 9.4, ja: "つるが、きつねの家に来ました。", furigana: "つる が、きつね の いえ に きました。" },
      { startSec: 9.4, endSec: 11.8, ja: "テーブルの上にお皿があります。", furigana: "テーブル の うえ に おさら が あります。" },
      { startSec: 11.8, endSec: 13.5, ja: "きつねが言いました。", furigana: "きつね が いいました。" },
      { startSec: 13.5, endSec: 15.6, ja: "さあ、食べましょう。", furigana: "さあ、たべましょう。" },
      { startSec: 15.6, endSec: 18.7, ja: "きつねはお皿のスープを飲みました。", furigana: "きつね は おさら の スープ を のみました。" },
      { startSec: 18.7, endSec: 19.8, ja: "おいしい。", furigana: "おいしい。" },
      { startSec: 19.8, endSec: 22.2, ja: "つるは困りました。", furigana: "つる は こまりました。" },
      { startSec: 22.2, endSec: 24.2, ja: "きつねは笑いました。", furigana: "きつね は わらいました。" },
      { startSec: 24.2, endSec: 27.2, ja: "次の日、つるがきつねに言いました。", furigana: "つぎ の ひ、つる が きつね に いいました。" },
      { startSec: 27.2, endSec: 33.1, ja: "昨日はありがと。今日は、私の家で一緒にご飯を食べませんか？", furigana: "きのう は ありがと。きょう は、わたし の いえ で いっしょ に ごはん を たべません か？" },
      { startSec: 33.1, endSec: 35.4, ja: "きつねがつるの家に来ました。", furigana: "きつね が つる の いえ に きました。" },
      { startSec: 35.4, endSec: 38.0, ja: "テーブルの上に、つぼがあります。", furigana: "テーブル の うえ に、つぼ が あります。" },
      { startSec: 38.0, endSec: 40.3, ja: "つぼの中に肉があります。", furigana: "つぼ の なか に にく が あります。" },
      { startSec: 40.3, endSec: 41.8, ja: "つるが言いました。", furigana: "つる が いいました。" },
      { startSec: 41.8, endSec: 43.9, ja: "さあ、食べましょう。", furigana: "さあ、たべましょう。" },
      { startSec: 43.9, endSec: 47.0, ja: "つるは、つぼの中の肉を食べました。", furigana: "つる は、つぼ の なか の にく を たべました。" },
      { startSec: 47.0, endSec: 48.7, ja: "ああ、おいしい。", furigana: "ああ、おいしい。" },
      { startSec: 48.7, endSec: 51.0, ja: "きつねは困りました。", furigana: "きつね は こまりました。" },
      { startSec: 51.0, endSec: 52.3, ja: "つるは笑いました。", furigana: "つる は わらいました。" },
    ],
    questions: [
      { id: "fc01", kind: "listening_mcq", atSec: 4, promptRu: "Кто кого приглашает в начале? (из видео)", optionsRu: ["Журавль приглашает лису", "Лиса приглашает журавля", "Они зовут третьего", "Никто никого не зовёт"], correctIndex: 1 },
      { id: "fc02", kind: "listening_mcq", atSec: 7, promptRu: "Грамматика: «食べませんか？」в контексте — это:", optionsRu: ["Отрицание «не ем»", "Приглашение «не хотите поесть?»", "Повеление «не ешь!»", "Прошедшее время"], correctIndex: 1, explanationRu: "〜ませんか = мягкое приглашение." },
      { id: "fc03", kind: "word_order", atSec: 7, promptRu: "Соберите: «Не хотите поесть вместе?»", words: ["食べませんか", "一緒に", "ご飯を"], correctOrder: [1, 2, 0], explanationRu: "一緒にご飯を食べませんか？" },
      { id: "fc04", kind: "kanji_translate", atSec: 12, promptRu: "Переведите「上」.", kanji: "上", acceptedRu: ["верх", "на", "сверху", "наверху"] },
      { id: "fc05", kind: "kanji_translate", atSec: 12, promptRu: "Переведите「皿」.", kanji: "皿", acceptedRu: ["тарелка", "блюдо"] },
      { id: "fc06", kind: "listening_mcq", atSec: 12, promptRu: "Грамматика: «〜にあります» — это про:", optionsRu: ["Место нахождения", "Прошедшее время", "Желание", "Запрет"], correctIndex: 0 },
      { id: "fc07", kind: "word_order", atSec: 12, promptRu: "Соберите: «На столе есть тарелка.»", words: ["あります", "に", "お皿", "テーブルの上"], correctOrder: [3, 1, 2, 0], explanationRu: "テーブルの上にお皿があります。" },
      { id: "fc08", kind: "listening_mcq", atSec: 19, promptRu: "Что пьёт лиса (きつね)?", optionsRu: ["Чай", "Суп", "Молоко", "Воду"], correctIndex: 1, explanationRu: "スープを飲みました = выпила суп." },
      { id: "fc09", kind: "kanji_translate", atSec: 24, promptRu: "Переведите「次の日」.", kanji: "次の日", acceptedRu: ["на следующий день", "следующий день"] },
      { id: "fc10", kind: "kanji_translate", atSec: 33, promptRu: "Переведите「昨日」.", kanji: "昨日", acceptedRu: ["вчера"] },
      { id: "fc11", kind: "listening_mcq", atSec: 22, promptRu: "Эмоция: «困りました» — это:", optionsRu: ["Обрадовался", "Растерялся/попал в затруднение", "Разозлился", "Уснул"], correctIndex: 1 },
      { id: "fc12", kind: "kanji_translate", atSec: 22, promptRu: "Переведите「困る」(форму 困りました).", kanji: "困る", acceptedRu: ["быть в затруднении", "затрудняться"] },
      { id: "fc13", kind: "kanji_translate", atSec: 24, promptRu: "Переведите「笑う」(форму 笑いました).", kanji: "笑う", acceptedRu: ["смеяться", "улыбаться"] },
      { id: "fc14", kind: "kanji_translate", atSec: 38, promptRu: "Переведите「中」.", kanji: "中", acceptedRu: ["внутри", "середина", "в"] },
      { id: "fc15", kind: "kanji_translate", atSec: 40, promptRu: "Переведите「肉」.", kanji: "肉", acceptedRu: ["мясо"] },
      { id: "fc16", kind: "listening_mcq", atSec: 40, promptRu: "Что стоит на столе у журавля? (из видео)", optionsRu: ["Тарелка", "Чашка", "Кувшин", "Горшок/кувшин (つぼ)"], correctIndex: 3 },
      { id: "fc17", kind: "word_order", atSec: 40, promptRu: "Соберите: «Внутри горшка есть мясо.»", words: ["あります", "に", "肉", "つぼの中"], correctOrder: [3, 1, 2, 0], explanationRu: "つぼの中に肉があります。" },
      { id: "fc18", kind: "listening_mcq", atSec: 49, promptRu: "Почему журавлю (つる) было трудно есть в первый день?", optionsRu: ["Не хотел есть", "Суп был в плоской тарелке", "Суп был слишком горячий", "Не было ложки"], correctIndex: 1, explanationRu: "С журавлиным клювом неудобно пить из плоской тарелки." },
      { id: "fc19", kind: "listening_mcq", atSec: 52, promptRu: "Почему лисе (きつね) было трудно есть во второй день?", optionsRu: ["Мясо было в горшке с узким горлом", "Мясо было сырое", "Еды не было", "Она на диете"], correctIndex: 0 },
      { id: "fc20", kind: "word_order", atSec: 48, promptRu: "Соберите: «Очень вкусно.»", words: ["おいしい", "とても"], correctOrder: [1, 0], explanationRu: "とてもおいしい。" },
    ],
    grammarNotes: [
      {
        titleJa: "～ませんか",
        titleRu: "Не хотите ли…? (вежливое приглашение)",
        level: "N5",
        structure: "〔глагол-ます основа〕＋ ませんか？",
        explanationRu: "「～ませんか」— вежливая форма приглашения или предложения. Буквально: «не сделаете ли?». Несмотря на отрицательную форму, это не отказ, а мягкое приглашение. Например: 食べませんか = «Не хотите поесть?» (= давайте поедим). Это более вежливо, чем ～ましょう (давайте), и часто используется при первом приглашении.",
        examples: [
          { ja: "一緒にご飯を食べませんか？", furigana: "いっしょ に ごはん を たべません か？", ru: "Не хотите вместе поесть?" },
          { ja: "映画を見ませんか？", furigana: "えいが を みません か？", ru: "Не хотите посмотреть фильм?" },
          { ja: "お茶を飲みませんか？", furigana: "おちゃ を のみません か？", ru: "Не хотите выпить чаю?" },
          { ja: "散歩しませんか？", furigana: "さんぽ しません か？", ru: "Не хотите прогуляться?" },
        ],
        tip: "～ませんか (приглашение, мягче) vs ～ましょう (давайте, решительнее). Оба — вежливые предложения.",
      },
      {
        titleJa: "～にあります",
        titleRu: "Находится в/на (местоположение)",
        level: "N5",
        structure: "〔место〕＋ に ＋ 〔предмет〕＋ が ＋ あります",
        explanationRu: "「～にあります」указывает на местоположение неодушевлённого предмета. Частица に обозначает место, あります — глагол существования для неживых объектов. В сказке: «テーブルの上にお皿があります» = «На столе есть тарелка». Позиционные слова: 上 (сверху), 中 (внутри), 下 (снизу), 前 (перед), 後ろ (за).",
        examples: [
          { ja: "テーブルの上にお皿があります。", furigana: "テーブル の うえ に おさら が あります。", ru: "На столе есть тарелка." },
          { ja: "つぼの中に肉があります。", furigana: "つぼ の なか に にく が あります。", ru: "Внутри горшка есть мясо." },
          { ja: "机の上に本があります。", furigana: "つくえ の うえ に ほん が あります。", ru: "На столе есть книга." },
          { ja: "かばんの中に財布があります。", furigana: "かばん の なか に さいふ が あります。", ru: "В сумке есть кошелёк." },
        ],
        tip: "Позиционные слова: 上（うえ）= на, 中（なか）= в, 下（した）= под, 前（まえ）= перед, 後ろ（うしろ）= за.",
      },
      {
        titleJa: "～ましょう",
        titleRu: "Давайте сделаем ~ (предложение)",
        level: "N5",
        structure: "〔глагол-ます основа〕＋ ましょう",
        explanationRu: "「～ましょう」— вежливая форма предложения совместного действия: «давайте сделаем ~». Образуется от ます-основы глагола: 食べます → 食べましょう (давайте поедим), 行きます → 行きましょう (давайте пойдём). Более решительная форма, чем ～ませんか. Часто используется, когда решение уже принято или говорящий уверен в согласии.",
        examples: [
          { ja: "さあ、食べましょう。", furigana: "さあ、たべましょう。", ru: "Ну, давайте есть." },
          { ja: "一緒に勉強しましょう。", furigana: "いっしょ に べんきょう しましょう。", ru: "Давайте вместе учиться." },
          { ja: "明日、映画を見ましょう。", furigana: "あした、えいが を みましょう。", ru: "Давайте завтра посмотрим фильм." },
        ],
        tip: "～ましょう = давайте (решительно). ～ませんか = не хотите ли? (мягче). Оба — вежливые предложения.",
      },
    ],
  },

  {
    id: "n5-narezki-ganbare", level: "N5",
    titleRu: "Мини‑клип: 頑張れ！",
    descriptionRu: "Короткая мотивационная фраза: 頑張れ Грамматика: 見る → 見える (потенциальная форма «видно»).",
    video: { type: "remote", src: "https://archive.org/download/japanese-trainer-narezki/narezki-07.mp4" },
    subtitles: [
      { startSec: 0, endSec: 2.0, ja: "お前の誓いもよく見える。", furigana: "おまえ の ちかい も よく みえる。" },
      { startSec: 4.2, endSec: 4.9, ja: "おはぁ…", furigana: "おはぁ…" },
      { startSec: 5.4, endSec: 7.1, ja: "頑張れ！頑張れ！", furigana: "がんばれ！がんばれ！" },
    ],
    questions: [
      { id: "gbq01", kind: "listening_mcq", atSec: 2.5, promptRu: "「誓い」в контексте — это:", optionsRu: ["обещание/клятва", "еда", "игра", "сон"], correctIndex: 0, explanationRu: "誓い（ちかい）= клятва, обещание." },
      { id: "gbq02", kind: "kanji_translate", atSec: 2.5, promptRu: "Переведите「誓い」.", kanji: "誓い", acceptedRu: ["клятва", "обещание"] },
      { id: "gbq03", kind: "listening_mcq", atSec: 6.2, promptRu: "「頑張れ！」чаще всего означает:", optionsRu: ["До свидания", "Держись! / Удачи!", "Спасибо", "Извини"], correctIndex: 1 },
      { id: "gbq04", kind: "kanji_translate", atSec: 6.2, promptRu: "Переведите「頑張る」(повел. 頑張れ).", kanji: "頑張る", acceptedRu: ["стараться", "держаться", "бороться"] },
      { id: "gbq05", kind: "word_order", atSec: 2.5, promptRu: "Соберите: «Твою клятву тоже хорошо видно.»", words: ["見える", "も", "よく", "お前の誓い"], correctOrder: [3, 1, 2, 0], explanationRu: "お前の誓いもよく見える。" },
    ],
    grammarNotes: [
      {
        titleJa: "見える",
        titleRu: "Быть видимым / виднеться",
        level: "N4",
        structure: "Существительное + が + 見える",
        explanationRu: "見える — непереходный глагол, означающий «быть видимым», «виднеться». Изначально это была форма от 見る, но сейчас это самостоятельный глагол. Объект, который видно, отмечается частицей が (не を). Используется, когда что-то видно само по себе, без усилий наблюдателя — в отличие от 見られる (потенциальная форма 見る), которая означает «иметь возможность посмотреть».",
        examples: [
          { ja: "お前の誓いもよく見える。", furigana: "おまえ の ちかい も よく みえる。", ru: "Твою клятву тоже хорошо видно." },
          { ja: "富士山が遠くからでもよく見える。", furigana: "ふじさん が とおく から でも よく みえる。", ru: "Фудзи хорошо видно даже издалека." },
          { ja: "雨がやんで、今でははっきりと見える。", furigana: "あめ が やんで、いま では はっきり と みえる。", ru: "Дождь прекратился, и теперь ясно видно." },
          { ja: "あの看板は大きいので、どこからでもよく見える。", furigana: "あの かんばん は おおきい ので、どこ から でも よく みえる。", ru: "Тот указатель большой, поэтому его видно отовсюду." },
          { ja: "田舎は明かりが少ないから星がよく見える。", furigana: "いなか は あかり が すくない から ほし が よく みえる。", ru: "В деревне мало света, поэтому звёзды хорошо видны." },
        ],
        tip: "見える = видно само по себе (непроизвольно). 見られる = можешь посмотреть (сознательно). Пример: 星が見える (звёзды видны) vs 映画が見られる (могу посмотреть фильм).",
      },
      {
        titleJa: "頑張れ（命令形）",
        titleRu: "Повелительная форма: 頑張れ！",
        level: "N4",
        structure: "〔глагол-словарная форма〕→ 命令形（めいれいけい）: う段 → え段",
        explanationRu: "「頑張れ」— повелительная форма (命令形) глагола 頑張る. Образование: для глаголов 1-й группы последний слог う-ряда меняется на え-ряд: 頑張る → 頑張れ, 行く → 行け, 飲む → 飲め. Для 2-й группы: 食べる → 食べろ. Повелительная форма звучит резко и прямо, поэтому используется в основном для подбадривания (頑張れ！), в спорте, в аниме и между близкими друзьями. В вежливой речи используют ～てください.",
        examples: [
          { ja: "頑張れ！頑張れ！", furigana: "がんばれ！がんばれ！", ru: "Давай! Держись!" },
          { ja: "早く行け！", furigana: "はやく いけ！", ru: "Быстро иди!" },
          { ja: "もっと食べろ！", furigana: "もっと たべろ！", ru: "Ешь ещё! (2-я группа: 食べる → 食べろ)" },
        ],
        tip: "頑張れ — одно из немногих слов в повелительной форме, которое звучит позитивно (подбадривание). Обычно 命令形 — грубая форма, избегайте её с незнакомыми людьми.",
      },
      {
        titleJa: "～ている",
        titleRu: "Длящееся состояние / действие в процессе",
        level: "N4",
        structure: "〔глагол て-форма〕＋ いる（います）",
        explanationRu: "「～ている」выражает: 1) действие в процессе (今、食べている = сейчас ем), 2) результативное состояние (窓が開いている = окно открыто), 3) привычку (毎日走っている = бегаю каждый день). В разговорной речи い часто опускается: ～ている → ～てる. В видео「よく見える」— это не ～ている, а отдельный глагол, но сама конструкция ～ている крайне важна для понимания японского.",
        examples: [
          { ja: "今、本を読んでいます。", furigana: "いま、ほん を よんで います。", ru: "Сейчас читаю книгу. (действие в процессе)" },
          { ja: "東京に住んでいます。", furigana: "とうきょう に すんで います。", ru: "Живу в Токио. (состояние)" },
          { ja: "毎朝コーヒーを飲んでいる。", furigana: "まいあさ コーヒー を のんでいる。", ru: "Каждое утро пью кофе. (привычка)" },
        ],
        tip: "～ている имеет 3 значения: процесс (食べている = ем сейчас), состояние (結婚している = женат), привычка (毎日走っている = бегаю). Контекст подскажет, какое именно.",
      },
    ],
  },

  ...N5_BATCH2,
  ...N4_NEW.filter((l) => l.level === "N5"),
  ...N3N2_NEW.filter((l) => l.level === "N5"),
  ...NAREZKI_NEW.filter((l) => l.level === "N5"),
];

// ═══════════════════════════════════════════════════════════════
//  N4, N3, N2, N1 — пока краткие, расширяйте по аналогии
// ═══════════════════════════════════════════════════════════════

const N4_LESSONS: Lesson[] = [
  ...N4_NEW.filter((l) => l.level === "N4"),
  ...NAREZKI_NEW.filter((l) => l.level === "N4"),
];

const N3_LESSONS: Lesson[] = [
  ...N3N2_NEW.filter((l) => l.level === "N3"),
  ...NAREZKI_NEW.filter((l) => l.level === "N3"),
];

const N2_LESSONS: Lesson[] = [
  ...N3N2_NEW.filter((l) => l.level === "N2"),
  ...NAREZKI_NEW.filter((l) => l.level === "N2"),
];

const N1_LESSONS: Lesson[] = [...MHA_LESSONS, ...BS_LESSONS, ...JJK_LESSONS, ...KNY_LESSONS];

export const LESSONS: Lesson[] = [...N5_LESSONS, ...N4_LESSONS, ...N3_LESSONS, ...N2_LESSONS, ...N1_LESSONS];

/** Порядок уроков на странице уровня: от более простого к более сложному. */
const LESSON_SORT: Record<string, number> = {
  // N5: от базовых фраз к более сложным темам
  "n5-narezki-kana": 5,
  "n5-hiragana-song": 6,
  "n5-katakana-song": 7,
  "n5-narezki-student": 10,
  "n5-cafe": 20,
  "n5-dialogue": 30,
  "n5-narezki-location-prepositions": 35,
  "n5-narezki-breakfast": 40,
  "n5-narezki-tableware": 45,
  "n5-narezki-likes-dislikes": 50,
  "n5-narezki-stationery": 55,
  "n5-narezki-whats-in-my-bag": 60,
  "n5-narezki-housework": 65,
  "n5-shop": 70,
  "n5-sushi": 80,
  "n5-podcast-town": 90,
  "n5-podcast-day": 100,
  "n5-narezki-body": 110,
  "n5-narezki-foxcrane": 120,
  "n5-narezki-boyfriend": 130,
  "n5-anime": 140,
  "n5-narezki-self-introduction": 150,
  "n5-narezki-ganbare": 155,
  "n5-narezki-japanese-food": 165,
  "n5-narezki-time": 170,
  "n5-narezki-restaurant": 175,
  // N4: от мультфильмов к аниме
  "n4-lazy-plans": 30,
  "n4-spongebob": 40,
  "n4-big-city": 50,
  "n3-eminence-shadow": 60,
  "n4-chikawa-chaos": 70,
  "n4-narezki-frieren-magic": 80,
  "n4-narezki-phone-business": 90,
  "n5-weather-lesson": 37,
  // N3: от подкастов к аниме
  "n3-podcast-hobbies-cameras": 20,
  "n3-family-drama": 30,
  "n3-party-rush-cartoon": 40,
  "n3-nahida-song": 50,
  "n3-naruto-kakashi": 60,
  "n3-mha-battle-analysis": 70,
  "n3-anime-battle-lines": 80,
  "n3-narezki-mha-suneater": 100,
  // N2
  "n2-god-farewell": 20,
  "n2-neuvillette-furina": 25,
  "n2-shaman-king-flowers": 30,
  "n2-fantasy-protect-land": 40,
  "n2-narezki-beastars": 45,
  "n2-narezki-advanced-talk": 50,
  "n2-narezki-kny-uppermoons": 55,
  "n2-narezki-long-listening": 60,
  // N1: My Hero Academia S01
  "n1-mha-s01e01": 10,
  "n1-mha-s01e02": 20,
  "n1-mha-s01e03": 30,
  "n1-mha-s01e04": 40,
  "n1-mha-s01e05": 50,
  "n1-mha-s01e06": 60,
  "n1-mha-s01e07": 70,
  "n1-mha-s01e08": 80,
  "n1-mha-s01e09": 90,
  "n1-mha-s01e10": 100,
  "n1-mha-s01e11": 110,
  "n1-mha-s01e12": 120,
  "n1-mha-s01e13": 130,
  // Beastars S1
  "n1-bs-s01e01": 200,
  "n1-bs-s01e02": 210,
  "n1-bs-s01e03": 220,
  "n1-bs-s01e04": 230,
  "n1-bs-s01e05": 240,
  "n1-bs-s01e06": 250,
  "n1-bs-s01e07": 260,
  "n1-bs-s01e08": 270,
  "n1-bs-s01e09": 280,
  "n1-bs-s01e10": 290,
  "n1-bs-s01e11": 300,
  "n1-bs-s01e12": 310,
  "n1-kny-s01e01": 320,
  "n1-kny-s01e02": 330,
  "n1-kny-s01e03": 340,
  "n1-kny-s01e04": 350,
  "n1-kny-s01e05": 360,
  "n1-kny-s01e06": 370,
  "n1-kny-s01e07": 380,
  "n1-kny-s01e08": 390,
  "n1-kny-s01e09": 400,
  "n1-kny-s01e10": 410,
  "n1-kny-s01e11": 420,
  "n1-kny-s01e12": 430,
  "n1-kny-s01e13": 440,
  "n1-kny-s01e14": 450,
  "n1-kny-s01e15": 460,
  "n1-kny-s01e16": 470,
  "n1-kny-s01e17": 480,
  "n1-kny-s01e18": 490,
  "n1-kny-s01e19": 500,
  "n1-kny-s01e20": 510,
  "n1-kny-s01e21": 520,
  "n1-kny-s01e22": 530,
  "n1-kny-s01e23": 540,
  "n1-kny-s01e24": 550,
  "n1-kny-s01e25": 560,
  "n1-kny-s01e26": 570,
};

export function getLessonsByLevel(level: JLPTLevel): Lesson[] {
  return LESSONS.filter((l) => l.level === level)
    .sort((a, b) => (LESSON_SORT[a.id] ?? 500) - (LESSON_SORT[b.id] ?? 500));
}
export function getLessonById(lessonId: string): Lesson | undefined { return LESSONS.find((l) => l.id === lessonId); }

// ═══════════════════════════════════════════════════════════════
//  JLPT ТЕСТЫ
// ═══════════════════════════════════════════════════════════════

export type JLPTSectionRu = "Лексика" | "Грамматика" | "Чтение" | "Аудирование";

export type JLPTTestQuestion = {
  id: string; section: JLPTSectionRu; promptRu: string;
  optionsRu: string[]; correctIndex: number; explanationRu?: string;
  audioText?: string;
};

export type JLPTTest = { level: JLPTLevel; titleRu: string; durationMin: number; questions: JLPTTestQuestion[] };

export { FULL_JLPT_TESTS as JLPT_TESTS } from "./jlpt-tests";
import { FULL_JLPT_TESTS } from "./jlpt-tests";

export function getJlptTest(level: JLPTLevel): JLPTTest | undefined { return FULL_JLPT_TESTS.find((t) => t.level === level); }
