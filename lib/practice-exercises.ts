/*
 * Самостоятельные упражнения для хаба «Упражнения» — НЕ привязаны к видео.
 * Разделены по уровням N5–N1 и по типам: grammar, vocab, kanji, word_order.
 */

import type { JLPTLevel, LessonQuestion, ListeningMcqQuestion, WordOrderQuestion, KanjiTranslateQuestion, FillBlankQuestion, NumberAudioQuestion, DialogueAudioQuestion } from "./content";
import { EX_N5_GRAMMAR, EX_N5_VOCAB, EX_N5_KANJI, EX_N5_WORD_ORDER, EX_N5_FILL, EX_N5_NUMBERS, EX_N5_DIALOGUES, EX_N4_GRAMMAR, EX_N4_VOCAB, EX_N4_KANJI, EX_N4_WORD_ORDER, EX_N4_FILL, EX_N4_NUMBERS, EX_N4_DIALOGUES } from "./practice-exercises-expanded";
import { EX_N3_GRAMMAR, EX_N3_VOCAB, EX_N3_KANJI, EX_N3_WORD_ORDER, EX_N3_FILL, EX_N3_NUMBERS, EX_N3_DIALOGUES, EX_N2_GRAMMAR, EX_N2_VOCAB, EX_N2_KANJI, EX_N2_WORD_ORDER, EX_N2_FILL, EX_N2_NUMBERS, EX_N2_DIALOGUES, EX_N1_GRAMMAR, EX_N1_VOCAB, EX_N1_KANJI, EX_N1_WORD_ORDER, EX_N1_FILL, EX_N1_NUMBERS, EX_N1_DIALOGUES } from "./practice-exercises-expanded-upper";
import { ALL_GENKI_EXERCISES } from "./genki-exercises";

// ─── N5 ────────────────────────────────────────────────────────

const N5_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "pg5-g01", atSec: 0, kind: "listening_mcq", promptRu: "Какая частица обозначает тему предложения?", optionsRu: ["を", "は", "に", "で"], correctIndex: 1, explanationRu: "は (ва) — частица темы." },
  { id: "pg5-g02", atSec: 0, kind: "listening_mcq", promptRu: "Какая частица ставится перед глаголом для прямого дополнения?", optionsRu: ["は", "に", "を", "で"], correctIndex: 2 },
  { id: "pg5-g03", atSec: 0, kind: "listening_mcq", promptRu: "Отрицание от 行きます?", optionsRu: ["行きました", "行きません", "行かない", "行けます"], correctIndex: 1 },
  { id: "pg5-g04", atSec: 0, kind: "listening_mcq", promptRu: "Прошедшее от 食べます?", optionsRu: ["食べません", "食べました", "食べて", "食べる"], correctIndex: 1 },
  { id: "pg5-g05", atSec: 0, kind: "listening_mcq", promptRu: "Отрицание い-прилагательного 高い?", optionsRu: ["高いない", "高くない", "高いじゃない", "高ない"], correctIndex: 1 },
  { id: "pg5-g06", atSec: 0, kind: "listening_mcq", promptRu: "Для живых существ используется:", optionsRu: ["あります", "います", "できます", "なります"], correctIndex: 1 },
  { id: "pg5-g07", atSec: 0, kind: "listening_mcq", promptRu: "Для неживых предметов используется:", optionsRu: ["います", "あります", "します", "できます"], correctIndex: 1 },
  { id: "pg5-g08", atSec: 0, kind: "listening_mcq", promptRu: "Какая частица указывает место действия?", optionsRu: ["に", "で", "を", "が"], correctIndex: 1, explanationRu: "図書館で勉強する — で = где происходит действие." },
  { id: "pg5-g09", atSec: 0, kind: "listening_mcq", promptRu: "Какая частица указывает направление?", optionsRu: ["で", "に/へ", "は", "を"], correctIndex: 1 },
  { id: "pg5-g10", atSec: 0, kind: "listening_mcq", promptRu: "「猫が好きです」— какая частица перед 好き?", optionsRu: ["は", "を", "が", "に"], correctIndex: 2, explanationRu: "好き/嫌い/上手/下手 используют が." },
  { id: "pg5-g11", atSec: 0, kind: "listening_mcq", promptRu: "Прошлое отрицание от 飲みます?", optionsRu: ["飲みません", "飲みませんでした", "飲まなかった", "飲みました"], correctIndex: 1 },
  { id: "pg5-g12", atSec: 0, kind: "listening_mcq", promptRu: "きれい — это какой тип прилагательного?", optionsRu: ["い-прилаг.", "な-прилаг.", "Глагол", "Наречие"], correctIndex: 1, explanationRu: "きれい кончается на い, но это な-прилагательное (исключение)!" },
  { id: "pg5-g13", atSec: 0, kind: "listening_mcq", promptRu: "Прошедшее от おいしい?", optionsRu: ["おいしいだった", "おいしかった", "おいしくだった", "おいしいでした"], correctIndex: 1 },
  { id: "pg5-g14", atSec: 0, kind: "listening_mcq", promptRu: "Отрицание от な-прилагательного 静か?", optionsRu: ["静かくない", "静かない", "静かじゃない", "静くない"], correctIndex: 2 },
  { id: "pg5-g15", atSec: 0, kind: "listening_mcq", promptRu: "「私も学生です」— что означает も?", optionsRu: ["но", "и/тоже", "или", "только"], correctIndex: 1 },
  { id: "pg5-g16", atSec: 0, kind: "listening_mcq", promptRu: "ます-форма от する?", optionsRu: ["すります", "します", "さます", "しります"], correctIndex: 1 },
  { id: "pg5-g17", atSec: 0, kind: "listening_mcq", promptRu: "ます-форма от 来る (くる)?", optionsRu: ["くります", "きます", "こります", "くます"], correctIndex: 1 },
  { id: "pg5-g18", atSec: 0, kind: "listening_mcq", promptRu: "「食べませんか？」в контексте — это:", optionsRu: ["Отрицание «не ем»", "Приглашение «не хотите поесть?»", "Повеление «не ешь!»", "Прошедшее время"], correctIndex: 1 },
  { id: "pg5-g19", atSec: 0, kind: "listening_mcq", promptRu: "「〜じゃありません」— это:", optionsRu: ["Прошедшее время", "Отрицание です (вежливо)", "Вопрос", "Повелительное"], correctIndex: 1 },
  { id: "pg5-g20", atSec: 0, kind: "listening_mcq", promptRu: "Какой счётчик используют для плоских предметов (бумага, тарелки)?", optionsRu: ["本", "枚", "匹", "台"], correctIndex: 1 },
];

const N5_VOCAB: ListeningMcqQuestion[] = [
  { id: "pg5-v01", atSec: 0, kind: "listening_mcq", promptRu: "月曜日 — это какой день?", optionsRu: ["Вторник", "Понедельник", "Среда", "Воскресенье"], correctIndex: 1 },
  { id: "pg5-v02", atSec: 0, kind: "listening_mcq", promptRu: "水曜日 — это какой день?", optionsRu: ["Понедельник", "Четверг", "Среда", "Пятница"], correctIndex: 2 },
  { id: "pg5-v03", atSec: 0, kind: "listening_mcq", promptRu: "おはようございます — когда говорят?", optionsRu: ["Вечером", "Утром", "Ночью", "Днём"], correctIndex: 1 },
  { id: "pg5-v04", atSec: 0, kind: "listening_mcq", promptRu: "すみません означает:", optionsRu: ["Спасибо", "Извините", "Пожалуйста", "До свидания"], correctIndex: 1 },
  { id: "pg5-v05", atSec: 0, kind: "listening_mcq", promptRu: "いくらですか — вопрос о:", optionsRu: ["Времени", "Цене", "Месте", "Имени"], correctIndex: 1 },
  { id: "pg5-v06", atSec: 0, kind: "listening_mcq", promptRu: "いただきます — когда говорят?", optionsRu: ["После еды", "Перед едой", "При входе", "На прощание"], correctIndex: 1 },
  { id: "pg5-v07", atSec: 0, kind: "listening_mcq", promptRu: "ごちそうさまでした — когда говорят?", optionsRu: ["Перед едой", "После еды", "При встрече", "При покупке"], correctIndex: 1 },
  { id: "pg5-v08", atSec: 0, kind: "listening_mcq", promptRu: "何時ですか переводится как:", optionsRu: ["Какой день?", "Который час?", "Сколько стоит?", "Что это?"], correctIndex: 1 },
  { id: "pg5-v09", atSec: 0, kind: "listening_mcq", promptRu: "「電話」означает:", optionsRu: ["телевизор", "телефон", "компьютер", "радио"], correctIndex: 1 },
  { id: "pg5-v10", atSec: 0, kind: "listening_mcq", promptRu: "「友達」означает:", optionsRu: ["семья", "учитель", "друг", "сосед"], correctIndex: 2 },
  { id: "pg5-v11", atSec: 0, kind: "listening_mcq", promptRu: "「大丈夫です」чаще всего означает:", optionsRu: ["Спасибо", "Всё в порядке / Не надо", "Извините", "Пожалуйста"], correctIndex: 1 },
  { id: "pg5-v12", atSec: 0, kind: "listening_mcq", promptRu: "「かしこまりました」означает:", optionsRu: ["Извините", "Понял (вежливо)", "Спасибо", "До свидания"], correctIndex: 1 },
  { id: "pg5-v13", atSec: 0, kind: "listening_mcq", promptRu: "Как сказать «половина» (о времени, напр. 3:30)?", optionsRu: ["三時半", "三時十五分", "三時四十五分", "三十時"], correctIndex: 0 },
  { id: "pg5-v14", atSec: 0, kind: "listening_mcq", promptRu: "「頑張れ」означает:", optionsRu: ["Спасибо", "Держись / старайся!", "Извини", "Пора домой"], correctIndex: 1 },
  { id: "pg5-v15", atSec: 0, kind: "listening_mcq", promptRu: "「どうですか？」переводится как:", optionsRu: ["Что это?", "Почему?", "Как вам? / Ну как?", "Сколько стоит?"], correctIndex: 2 },
];

const N5_KANJI: KanjiTranslateQuestion[] = [
  { id: "pg5-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「水」.", kanji: "水", acceptedRu: ["вода"] },
  { id: "pg5-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「山」.", kanji: "山", acceptedRu: ["гора"] },
  { id: "pg5-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「大きい」.", kanji: "大きい", acceptedRu: ["большой", "крупный"] },
  { id: "pg5-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「小さい」.", kanji: "小さい", acceptedRu: ["маленький", "мелкий"] },
  { id: "pg5-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「先生」.", kanji: "先生", acceptedRu: ["учитель", "преподаватель", "сэнсэй"] },
  { id: "pg5-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「学校」.", kanji: "学校", acceptedRu: ["школа"] },
  { id: "pg5-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「今日」.", kanji: "今日", acceptedRu: ["сегодня"] },
  { id: "pg5-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「明日」.", kanji: "明日", acceptedRu: ["завтра"] },
  { id: "pg5-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「昨日」.", kanji: "昨日", acceptedRu: ["вчера"] },
  { id: "pg5-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「食べる」.", kanji: "食べる", acceptedRu: ["есть", "кушать"] },
  { id: "pg5-k11", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「飲む」.", kanji: "飲む", acceptedRu: ["пить"] },
  { id: "pg5-k12", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「読む」.", kanji: "読む", acceptedRu: ["читать"] },
  { id: "pg5-k13", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「書く」.", kanji: "書く", acceptedRu: ["писать"] },
  { id: "pg5-k14", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「話す」.", kanji: "話す", acceptedRu: ["говорить", "разговаривать"] },
  { id: "pg5-k15", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「毎日」.", kanji: "毎日", acceptedRu: ["каждый день", "ежедневно"] },
  { id: "pg5-k16", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「人」.", kanji: "人", acceptedRu: ["человек", "люди"] },
  { id: "pg5-k17", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「日本語」.", kanji: "日本語", acceptedRu: ["японский язык", "японский"] },
  { id: "pg5-k18", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「猫」.", kanji: "猫", acceptedRu: ["кошка", "кот"] },
  { id: "pg5-k19", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「犬」.", kanji: "犬", acceptedRu: ["собака", "пёс"] },
  { id: "pg5-k20", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「花」.", kanji: "花", acceptedRu: ["цветок", "цветы"] },
];

const N5_WORD_ORDER: WordOrderQuestion[] = [
  { id: "pg5-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я ем рис.»", words: ["食べます", "を", "ご飯", "私は"], correctOrder: [3, 2, 1, 0] },
  { id: "pg5-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я учусь в библиотеке.»", words: ["勉強します", "で", "図書館", "私は"], correctOrder: [3, 2, 1, 0] },
  { id: "pg5-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я иду в школу.»", words: ["行きます", "に", "学校", "私は"], correctOrder: [3, 2, 1, 0] },
  { id: "pg5-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Это что?»", words: ["ですか", "は", "これ", "何"], correctOrder: [2, 1, 3, 0] },
  { id: "pg5-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «Сейчас 3 часа.»", words: ["です", "三時", "今"], correctOrder: [2, 1, 0] },
  { id: "pg5-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я тоже студент.»", words: ["です", "学生", "も", "私"], correctOrder: [3, 2, 1, 0] },
  { id: "pg5-w07", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я встаю в 7 утра.»", words: ["起きます", "に", "七時", "毎朝"], correctOrder: [3, 2, 1, 0] },
  { id: "pg5-w08", atSec: 0, kind: "word_order", promptRu: "Соберите: «Где находится банк?»", words: ["ありますか", "は", "銀行", "どこに"], correctOrder: [2, 1, 3, 0] },
  { id: "pg5-w09", atSec: 0, kind: "word_order", promptRu: "Соберите: «Потом лёг спать.»", words: ["寝ました", "それから"], correctOrder: [1, 0] },
  { id: "pg5-w10", atSec: 0, kind: "word_order", promptRu: "Соберите: «Счёт, пожалуйста.»", words: ["お願いします", "を", "お会計"], correctOrder: [2, 1, 0] },
  { id: "pg5-w11", atSec: 0, kind: "word_order", promptRu: "Соберите: «Мама хорошо готовит.»", words: ["上手です", "が", "料理", "は", "母"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "pg5-w12", atSec: 0, kind: "word_order", promptRu: "Соберите: «В комнате есть кошка.»", words: ["います", "が", "猫", "に", "部屋"], correctOrder: [4, 3, 2, 1, 0] },
];

// ─── N4 ────────────────────────────────────────────────────────

const N4_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "pg4-g01", atSec: 0, kind: "listening_mcq", promptRu: "Потенциальная форма от 食べる?", optionsRu: ["食べられる", "食べれる", "食べます", "食べない"], correctIndex: 0 },
  { id: "pg4-g02", atSec: 0, kind: "listening_mcq", promptRu: "Потенциальная форма от 書く?", optionsRu: ["書かれる", "書ける", "書きます", "書くれる"], correctIndex: 1 },
  { id: "pg4-g03", atSec: 0, kind: "listening_mcq", promptRu: "先生に褒められました означает:", optionsRu: ["Я похвалил учителя", "Учитель похвалил меня (пассив)", "Учитель рассердился", "Я извинился"], correctIndex: 1 },
  { id: "pg4-g04", atSec: 0, kind: "listening_mcq", promptRu: "時間があったら означает:", optionsRu: ["Если будет время", "Когда было время", "Потому что есть время", "Нет времени"], correctIndex: 0 },
  { id: "pg4-g05", atSec: 0, kind: "listening_mcq", promptRu: "「～てもいいですか」означает:", optionsRu: ["Нельзя", "Можно ли…?", "Нужно", "Не хочу"], correctIndex: 1 },
  { id: "pg4-g06", atSec: 0, kind: "listening_mcq", promptRu: "「～なければなりません」означает:", optionsRu: ["Не нужно", "Должен / обязан", "Хочу", "Могу"], correctIndex: 1 },
  { id: "pg4-g07", atSec: 0, kind: "listening_mcq", promptRu: "「食べてから行きます」означает:", optionsRu: ["Пойду, не поев", "Поем, а потом пойду", "Пойду есть", "Ел, пока шёл"], correctIndex: 1 },
  { id: "pg4-g08", atSec: 0, kind: "listening_mcq", promptRu: "「～ながら」означает:", optionsRu: ["После того как", "Одновременно / делая…", "Вместо", "Потому что"], correctIndex: 1 },
  { id: "pg4-g09", atSec: 0, kind: "listening_mcq", promptRu: "「明日は雨だそうです」означает:", optionsRu: ["Завтра точно дождь", "Говорят, завтра дождь", "Завтра не будет дождя", "Хочу дождь"], correctIndex: 1 },
  { id: "pg4-g10", atSec: 0, kind: "listening_mcq", promptRu: "「映画を見るつもりです」означает:", optionsRu: ["Я посмотрел фильм", "Собираюсь смотреть фильм", "Не хочу смотреть", "Могу посмотреть"], correctIndex: 1 },
  { id: "pg4-g11", atSec: 0, kind: "listening_mcq", promptRu: "「雨が降りそうです」означает:", optionsRu: ["Дождь идёт", "Похоже, пойдёт дождь", "Дождь закончился", "Дождя не будет"], correctIndex: 1 },
  { id: "pg4-g12", atSec: 0, kind: "listening_mcq", promptRu: "「高くても買います」означает:", optionsRu: ["Не куплю, если дорого", "Куплю, даже если дорого", "Дёшево, поэтому куплю", "Не знаю цену"], correctIndex: 1 },
];

const N4_VOCAB: ListeningMcqQuestion[] = [
  { id: "pg4-v01", atSec: 0, kind: "listening_mcq", promptRu: "「経験」означает:", optionsRu: ["знание", "опыт", "работа", "учёба"], correctIndex: 1 },
  { id: "pg4-v02", atSec: 0, kind: "listening_mcq", promptRu: "「趣味」означает:", optionsRu: ["работа", "хобби", "еда", "спорт"], correctIndex: 1 },
  { id: "pg4-v03", atSec: 0, kind: "listening_mcq", promptRu: "「予定」означает:", optionsRu: ["прошлое", "план/расписание", "мечта", "проблема"], correctIndex: 1 },
  { id: "pg4-v04", atSec: 0, kind: "listening_mcq", promptRu: "「お久しぶりです」означает:", optionsRu: ["Приятно познакомиться", "Давно не виделись", "Извините", "Спасибо"], correctIndex: 1 },
  { id: "pg4-v05", atSec: 0, kind: "listening_mcq", promptRu: "「遅れてすみません」означает:", optionsRu: ["Спасибо за ожидание", "Извините за опоздание", "Я не опоздал", "Пожалуйста, подождите"], correctIndex: 1 },
  { id: "pg4-v06", atSec: 0, kind: "listening_mcq", promptRu: "「残念」означает:", optionsRu: ["радость", "жаль/досадно", "удивление", "злость"], correctIndex: 1 },
  { id: "pg4-v07", atSec: 0, kind: "listening_mcq", promptRu: "「将来」означает:", optionsRu: ["прошлое", "настоящее", "будущее", "вчера"], correctIndex: 2 },
  { id: "pg4-v08", atSec: 0, kind: "listening_mcq", promptRu: "「約束」означает:", optionsRu: ["обещание/договорённость", "секрет", "подарок", "проблема"], correctIndex: 0 },
];

const N4_KANJI: KanjiTranslateQuestion[] = [
  { id: "pg4-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「漢字」.", kanji: "漢字", acceptedRu: ["кандзи", "иероглифы"] },
  { id: "pg4-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「時間」.", kanji: "時間", acceptedRu: ["время"] },
  { id: "pg4-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「旅行」.", kanji: "旅行", acceptedRu: ["путешествие", "поездка"] },
  { id: "pg4-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「病気」.", kanji: "病気", acceptedRu: ["болезнь"] },
  { id: "pg4-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「運動」.", kanji: "運動", acceptedRu: ["спорт", "упражнения", "физкультура"] },
  { id: "pg4-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「映画」.", kanji: "映画", acceptedRu: ["фильм", "кино"] },
  { id: "pg4-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「音楽」.", kanji: "音楽", acceptedRu: ["музыка"] },
  { id: "pg4-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「天気」.", kanji: "天気", acceptedRu: ["погода"] },
  { id: "pg4-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「問題」.", kanji: "問題", acceptedRu: ["проблема", "вопрос", "задача"] },
  { id: "pg4-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「練習」.", kanji: "練習", acceptedRu: ["практика", "тренировка", "упражнение"] },
];

const N4_WORD_ORDER: WordOrderQuestion[] = [
  { id: "pg4-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я могу читать кандзи.»", words: ["読めます", "が", "漢字"], correctOrder: [2, 1, 0] },
  { id: "pg4-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Если будет время, пойдём.»", words: ["行こう", "時間が", "あったら"], correctOrder: [1, 2, 0] },
  { id: "pg4-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Меня похвалил учитель.» (пассив)", words: ["褒められました", "に", "先生"], correctOrder: [2, 1, 0] },
  { id: "pg4-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Поем, а потом пойду.»", words: ["行きます", "食べてから"], correctOrder: [1, 0] },
  { id: "pg4-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «Собираюсь смотреть фильм.»", words: ["つもりです", "見る", "を", "映画"], correctOrder: [3, 2, 1, 0] },
  { id: "pg4-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Слушая музыку, учусь.»", words: ["勉強します", "聞きながら", "を", "音楽"], correctOrder: [3, 2, 1, 0] },
];

// ─── N3 ────────────────────────────────────────────────────────

const N3_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "pg3-g01", atSec: 0, kind: "listening_mcq", promptRu: "「旅行に行こうと思っています」означает:", optionsRu: ["Я решил поехать", "Думаю поехать", "Не поеду", "Уже поехал"], correctIndex: 1 },
  { id: "pg3-g02", atSec: 0, kind: "listening_mcq", promptRu: "「〜ことにする」означает:", optionsRu: ["Решить (сделать)", "Забыть", "Не мочь", "Бояться"], correctIndex: 0 },
  { id: "pg3-g03", atSec: 0, kind: "listening_mcq", promptRu: "「壊れたらしいです」означает:", optionsRu: ["Точно сломался", "По-видимому, сломался", "Не сломался", "Хочу сломать"], correctIndex: 1 },
  { id: "pg3-g04", atSec: 0, kind: "listening_mcq", promptRu: "「見たことがありません」означает:", optionsRu: ["Видел", "Никогда не видел", "Хочу увидеть", "Вижу сейчас"], correctIndex: 1 },
  { id: "pg3-g05", atSec: 0, kind: "listening_mcq", promptRu: "「〜ていない → 〜てない」— это:", optionsRu: ["Вежливая форма", "Разговорное сокращение", "Кансайский диалект", "Ошибка"], correctIndex: 1 },
  { id: "pg3-g06", atSec: 0, kind: "listening_mcq", promptRu: "「誰も〜ない」означает:", optionsRu: ["Кто-то делает", "Никто не делает", "Все делают", "Всегда делает"], correctIndex: 1 },
  { id: "pg3-g07", atSec: 0, kind: "listening_mcq", promptRu: "「だからこそ」означает:", optionsRu: ["Несмотря на это", "Именно поэтому", "Наоборот", "Кстати"], correctIndex: 1 },
  { id: "pg3-g08", atSec: 0, kind: "listening_mcq", promptRu: "「〜わけではない」означает:", optionsRu: ["Именно так", "Не то чтобы…", "Обязательно", "Конечно"], correctIndex: 1 },
  { id: "pg3-g09", atSec: 0, kind: "listening_mcq", promptRu: "「どこへ行っても」означает:", optionsRu: ["Куда бы ни пошёл", "Никуда не пойду", "Пойду домой", "Куда идёшь?"], correctIndex: 0 },
  { id: "pg3-g10", atSec: 0, kind: "listening_mcq", promptRu: "「早ければ早いほどいい」означает:", optionsRu: ["Не спеши", "Чем раньше, тем лучше", "Уже поздно", "Рано утром"], correctIndex: 1 },
];

const N3_VOCAB: ListeningMcqQuestion[] = [
  { id: "pg3-v01", atSec: 0, kind: "listening_mcq", promptRu: "「俺」— это:", optionsRu: ["Очень вежливое «я»", "Разговорное «я» (мужское)", "«ты»", "«он»"], correctIndex: 1 },
  { id: "pg3-v02", atSec: 0, kind: "listening_mcq", promptRu: "「結局」означает:", optionsRu: ["Сначала", "В конечном счёте", "Может быть", "Наоборот"], correctIndex: 1 },
  { id: "pg3-v03", atSec: 0, kind: "listening_mcq", promptRu: "「失礼ですが」означает:", optionsRu: ["Спасибо", "При всём уважении / извините, но…", "Пожалуйста", "Конечно"], correctIndex: 1 },
  { id: "pg3-v04", atSec: 0, kind: "listening_mcq", promptRu: "「残念ですができません」означает:", optionsRu: ["С удовольствием", "К сожалению, не могу", "Обязательно сделаю", "Попробую"], correctIndex: 1 },
  { id: "pg3-v05", atSec: 0, kind: "listening_mcq", promptRu: "「正直に言うと」означает:", optionsRu: ["Врать", "Честно говоря", "Молчать", "Шутить"], correctIndex: 1 },
];

const N3_KANJI: KanjiTranslateQuestion[] = [
  { id: "pg3-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「世界」.", kanji: "世界", acceptedRu: ["мир", "вселенная"] },
  { id: "pg3-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「経験」.", kanji: "経験", acceptedRu: ["опыт"] },
  { id: "pg3-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「意見」.", kanji: "意見", acceptedRu: ["мнение"] },
  { id: "pg3-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「状況」.", kanji: "状況", acceptedRu: ["ситуация", "обстоятельства", "положение"] },
  { id: "pg3-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「結果」.", kanji: "結果", acceptedRu: ["результат", "итог"] },
  { id: "pg3-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「関係」.", kanji: "関係", acceptedRu: ["отношения", "связь"] },
  { id: "pg3-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「説明」.", kanji: "説明", acceptedRu: ["объяснение"] },
  { id: "pg3-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「準備」.", kanji: "準備", acceptedRu: ["подготовка", "приготовление"] },
];

const N3_WORD_ORDER: WordOrderQuestion[] = [
  { id: "pg3-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Никогда не был в Японии.»", words: ["ありません", "が", "こと", "行った", "に", "日本"], correctOrder: [5, 4, 3, 2, 1, 0] },
  { id: "pg3-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Чем раньше, тем лучше.»", words: ["いい", "ほど", "早い", "早ければ"], correctOrder: [3, 2, 1, 0] },
  { id: "pg3-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Куда бы ни пошёл, везде люди.»", words: ["います", "人が", "行っても", "どこへ"], correctOrder: [3, 2, 1, 0] },
  { id: "pg3-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Честно говоря, не знаю.»", words: ["わかりません", "正直に言うと"], correctOrder: [1, 0] },
];

// ─── N2 ────────────────────────────────────────────────────────

const N2_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "pg2-g01", atSec: 0, kind: "listening_mcq", promptRu: "「〜にもかかわらず」означает:", optionsRu: ["Благодаря", "Несмотря на", "Из-за", "Вместо"], correctIndex: 1 },
  { id: "pg2-g02", atSec: 0, kind: "listening_mcq", promptRu: "「〜に伴って」означает:", optionsRu: ["Вместо", "Сопровождаясь / вместе с", "Без", "Против"], correctIndex: 1 },
  { id: "pg2-g03", atSec: 0, kind: "listening_mcq", promptRu: "「したがって」означает:", optionsRu: ["Однако", "Следовательно", "Например", "Кстати"], correctIndex: 1 },
  { id: "pg2-g04", atSec: 0, kind: "listening_mcq", promptRu: "「つまり」означает:", optionsRu: ["Наоборот", "Другими словами", "Кроме того", "Сначала"], correctIndex: 1 },
  { id: "pg2-g05", atSec: 0, kind: "listening_mcq", promptRu: "「仕方ありません」означает:", optionsRu: ["Отлично", "Ничего не поделаешь", "Не знаю", "Не хочу"], correctIndex: 1 },
  { id: "pg2-g06", atSec: 0, kind: "listening_mcq", promptRu: "「〜一方で」означает:", optionsRu: ["Только", "С другой стороны", "Всегда", "Никогда"], correctIndex: 1 },
  { id: "pg2-g07", atSec: 0, kind: "listening_mcq", promptRu: "「必要に応じて」означает:", optionsRu: ["Всегда", "При необходимости", "Никогда", "Обязательно"], correctIndex: 1 },
  { id: "pg2-g08", atSec: 0, kind: "listening_mcq", promptRu: "「できる限り」означает:", optionsRu: ["Невозможно", "По возможности / насколько возможно", "Обязательно", "Никогда"], correctIndex: 1 },
];

const N2_VOCAB: ListeningMcqQuestion[] = [
  { id: "pg2-v01", atSec: 0, kind: "listening_mcq", promptRu: "「むしろ」означает:", optionsRu: ["Конечно", "Скорее / в большей степени", "Никогда", "Иногда"], correctIndex: 1 },
  { id: "pg2-v02", atSec: 0, kind: "listening_mcq", promptRu: "「少なくとも」означает:", optionsRu: ["Много", "По меньшей мере", "Ничего", "Всё"], correctIndex: 1 },
  { id: "pg2-v03", atSec: 0, kind: "listening_mcq", promptRu: "「その通りです」означает:", optionsRu: ["Неправильно", "Именно так", "Не знаю", "Может быть"], correctIndex: 1 },
  { id: "pg2-v04", atSec: 0, kind: "listening_mcq", promptRu: "「ある程度」означает:", optionsRu: ["Полностью", "В известной мере / до некоторой степени", "Совсем нет", "Абсолютно"], correctIndex: 1 },
];

const N2_KANJI: KanjiTranslateQuestion[] = [
  { id: "pg2-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「自己紹介」.", kanji: "自己紹介", acceptedRu: ["самопрезентация", "представление себя"] },
  { id: "pg2-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「詳細」.", kanji: "詳細", acceptedRu: ["подробности", "детали"] },
  { id: "pg2-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「原則」.", kanji: "原則", acceptedRu: ["принцип", "правило"] },
  { id: "pg2-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「条件」.", kanji: "条件", acceptedRu: ["условие", "условия"] },
  { id: "pg2-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「影響」.", kanji: "影響", acceptedRu: ["влияние", "воздействие"] },
  { id: "pg2-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「対策」.", kanji: "対策", acceptedRu: ["меры", "контрмеры", "мера"] },
];

const N2_WORD_ORDER: WordOrderQuestion[] = [
  { id: "pg2-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Несмотря на дождь, пошёл.»", words: ["行きました", "にもかかわらず", "雨"], correctOrder: [2, 1, 0] },
  { id: "pg2-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Следовательно, нужно изменить.»", words: ["必要です", "変える", "したがって"], correctOrder: [2, 1, 0] },
  { id: "pg2-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «По возможности быстро.»", words: ["早く", "できる限り"], correctOrder: [1, 0] },
];

// ─── N1 ────────────────────────────────────────────────────────

const N1_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "pg1-g01", atSec: 0, kind: "listening_mcq", promptRu: "「いかなる事情であれ」означает:", optionsRu: ["Какие бы обстоятельства ни были", "Без обстоятельств", "Из-за обстоятельств", "Лёгкие обстоятельства"], correctIndex: 0 },
  { id: "pg1-g02", atSec: 0, kind: "listening_mcq", promptRu: "「とはいえ」означает:", optionsRu: ["Конечно", "Тем не менее", "Поэтому", "Например"], correctIndex: 1 },
  { id: "pg1-g03", atSec: 0, kind: "listening_mcq", promptRu: "「やむを得ず」означает:", optionsRu: ["С удовольствием", "Вынужденно / в силу обстоятельств", "По желанию", "Случайно"], correctIndex: 1 },
  { id: "pg1-g04", atSec: 0, kind: "listening_mcq", promptRu: "「そればかりか」означает:", optionsRu: ["Только это", "Более того", "Меньше", "Вместо"], correctIndex: 1 },
  { id: "pg1-g05", atSec: 0, kind: "listening_mcq", promptRu: "「何としても」означает:", optionsRu: ["Ничего", "Во что бы то ни стало", "Может быть", "Не нужно"], correctIndex: 1 },
  { id: "pg1-g06", atSec: 0, kind: "listening_mcq", promptRu: "「いずれにせよ」означает:", optionsRu: ["Никогда", "Как бы то ни было", "Только так", "Раньше"], correctIndex: 1 },
  { id: "pg1-g07", atSec: 0, kind: "listening_mcq", promptRu: "「のみならず」означает:", optionsRu: ["Только", "Не только… (но и)", "Кроме", "Без"], correctIndex: 1 },
  { id: "pg1-g08", atSec: 0, kind: "listening_mcq", promptRu: "「〜に則って」означает:", optionsRu: ["Против", "В соответствии с", "Без", "Вместо"], correctIndex: 1 },
];

const N1_VOCAB: ListeningMcqQuestion[] = [
  { id: "pg1-v01", atSec: 0, kind: "listening_mcq", promptRu: "「奇跡」означает:", optionsRu: ["катастрофа", "чудо", "ошибка", "план"], correctIndex: 1 },
  { id: "pg1-v02", atSec: 0, kind: "listening_mcq", promptRu: "「補足」означает:", optionsRu: ["удаление", "дополнение", "замена", "сокращение"], correctIndex: 1 },
  { id: "pg1-v03", atSec: 0, kind: "listening_mcq", promptRu: "「厳密に」означает:", optionsRu: ["примерно", "строго", "легко", "быстро"], correctIndex: 1 },
  { id: "pg1-v04", atSec: 0, kind: "listening_mcq", promptRu: "「本質的」означает:", optionsRu: ["поверхностный", "по существу / сущностный", "временный", "случайный"], correctIndex: 1 },
];

const N1_KANJI: KanjiTranslateQuestion[] = [
  { id: "pg1-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「困難」.", kanji: "困難", acceptedRu: ["трудность", "трудности", "сложность"] },
  { id: "pg1-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「奇跡」.", kanji: "奇跡", acceptedRu: ["чудо"] },
  { id: "pg1-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「矛盾」.", kanji: "矛盾", acceptedRu: ["противоречие"] },
  { id: "pg1-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「偏見」.", kanji: "偏見", acceptedRu: ["предрассудок", "предубеждение"] },
  { id: "pg1-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「責任」.", kanji: "責任", acceptedRu: ["ответственность"] },
  { id: "pg1-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「犠牲」.", kanji: "犠牲", acceptedRu: ["жертва"] },
];

const N1_WORD_ORDER: WordOrderQuestion[] = [
  { id: "pg1-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Как бы то ни было, нужно решить.»", words: ["決めなければならない", "いずれにせよ"], correctOrder: [1, 0] },
  { id: "pg1-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Во что бы то ни стало добьюсь.»", words: ["成し遂げる", "何としても"], correctOrder: [1, 0] },
  { id: "pg1-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «В соответствии с правилами.»", words: ["則って", "に", "規則"], correctOrder: [2, 1, 0] },
];

// ─── Fill-in-the-blank (вписать частицу / форму) ──────────────

const N5_FILL: FillBlankQuestion[] = [
  { id: "pg5-f01", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Я иду ___ школу.»", sentenceJa: "私は学校___行きます。", blankIndex: 0, acceptedAnswers: ["に", "へ"], explanationRu: "に / へ — частица направления." },
  { id: "pg5-f02", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Я ем ___ рис.»", sentenceJa: "私はご飯___食べます。", blankIndex: 0, acceptedAnswers: ["を"], explanationRu: "を — частица прямого дополнения." },
  { id: "pg5-f03", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Кошка ___ любит.»", sentenceJa: "猫___好きです。", blankIndex: 0, acceptedAnswers: ["が"], explanationRu: "好き/嫌い используют が." },
  { id: "pg5-f04", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Учусь ___ библиотеке.»", sentenceJa: "図書館___勉強します。", blankIndex: 0, acceptedAnswers: ["で"], explanationRu: "で — частица места действия." },
  { id: "pg5-f05", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Это ___ книга Танаки.»", sentenceJa: "これは田中さん___本です。", blankIndex: 0, acceptedAnswers: ["の"], explanationRu: "の — притяжательная частица." },
  { id: "pg5-f06", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Я ___ студент.»", sentenceJa: "私___学生です。", blankIndex: 0, acceptedAnswers: ["は"], explanationRu: "は — частица темы." },
  { id: "pg5-f07", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Друг ___ тоже студент.»", sentenceJa: "友達___学生です。", blankIndex: 0, acceptedAnswers: ["も"], explanationRu: "も — тоже." },
  { id: "pg5-f08", atSec: 0, kind: "fill_blank", promptRu: "Впишите форму: отрицание от 飲みます →", sentenceJa: "お酒は___。", blankIndex: 0, acceptedAnswers: ["飲みません"], explanationRu: "ます → ません (отрицание)." },
  { id: "pg5-f09", atSec: 0, kind: "fill_blank", promptRu: "Впишите форму: прошедшее от 食べます →", sentenceJa: "昨日すしを___。", blankIndex: 0, acceptedAnswers: ["食べました"], explanationRu: "ます → ました (прошедшее)." },
  { id: "pg5-f10", atSec: 0, kind: "fill_blank", promptRu: "Впишите форму: отрицание い-прилагательного 高い →", sentenceJa: "この本は___。", blankIndex: 0, acceptedAnswers: ["高くない", "高くないです", "高くありません"], explanationRu: "い → くない." },
  { id: "pg5-f11", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Встречаемся ___ 3 часа.»", sentenceJa: "三時___会いましょう。", blankIndex: 0, acceptedAnswers: ["に"], explanationRu: "に — частица времени." },
  { id: "pg5-f12", atSec: 0, kind: "fill_blank", promptRu: "Впишите форму: прошедшее от おいしい →", sentenceJa: "ラーメンは___。", blankIndex: 0, acceptedAnswers: ["おいしかった", "おいしかったです"], explanationRu: "い → かった." },
  { id: "pg5-f13", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Из Токио ___ Осаки.»", sentenceJa: "東京___大阪まで。", blankIndex: 0, acceptedAnswers: ["から"], explanationRu: "から — от/из." },
  { id: "pg5-f14", atSec: 0, kind: "fill_blank", promptRu: "Впишите форму: отрицание な-прилагательного 静か →", sentenceJa: "ここは___。", blankIndex: 0, acceptedAnswers: ["静かじゃない", "静かじゃないです", "静かじゃありません", "静かではありません"], explanationRu: "な-прилаг. + じゃない." },
  { id: "pg5-f15", atSec: 0, kind: "fill_blank", promptRu: "Вставьте частицу: «Что ___ пьёте?»", sentenceJa: "何___飲みますか。", blankIndex: 0, acceptedAnswers: ["を"], explanationRu: "を — прямое дополнение." },
];

const N4_FILL: FillBlankQuestion[] = [
  { id: "pg4-f01", atSec: 0, kind: "fill_blank", promptRu: "Впишите потенциальную форму: 食べる →", sentenceJa: "日本語で注文が___。", blankIndex: 0, acceptedAnswers: ["食べられる", "食べられます"], explanationRu: "る-глагол: る → られる." },
  { id: "pg4-f02", atSec: 0, kind: "fill_blank", promptRu: "Впишите потенциальную форму: 書く →", sentenceJa: "漢字が___。", blankIndex: 0, acceptedAnswers: ["書ける", "書けます"], explanationRu: "う-глагол: く → ける." },
  { id: "pg4-f03", atSec: 0, kind: "fill_blank", promptRu: "Впишите て-форму: 読む →", sentenceJa: "本を___ください。", blankIndex: 0, acceptedAnswers: ["読んで"], explanationRu: "む → んで." },
  { id: "pg4-f04", atSec: 0, kind: "fill_blank", promptRu: "Впишите て-форму: 行く →", sentenceJa: "学校に___ください。", blankIndex: 0, acceptedAnswers: ["行って"], explanationRu: "く → って (исключение: 行く)." },
  { id: "pg4-f05", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: «Если будет время…» 時間が___", sentenceJa: "時間が___、行きます。", blankIndex: 0, acceptedAnswers: ["あったら", "あれば"], explanationRu: "たら / ば — условие." },
  { id: "pg4-f06", atSec: 0, kind: "fill_blank", promptRu: "Впишите пассив: 食べる →", sentenceJa: "ケーキを弟に___。", blankIndex: 0, acceptedAnswers: ["食べられた", "食べられました"], explanationRu: "る → られる (пассив)." },
  { id: "pg4-f07", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Должен сделать» → しなければ___", sentenceJa: "宿題をしなければ___。", blankIndex: 0, acceptedAnswers: ["なりません", "ならない"], explanationRu: "～なければならない = должен." },
  { id: "pg4-f08", atSec: 0, kind: "fill_blank", promptRu: "Впишите て-форму: 待つ →", sentenceJa: "ここで___ください。", blankIndex: 0, acceptedAnswers: ["待って"], explanationRu: "つ → って." },
  { id: "pg4-f09", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Похоже, пойдёт дождь.» 雨が降り___です。", sentenceJa: "雨が降り___です。", blankIndex: 0, acceptedAnswers: ["そう"], explanationRu: "～そうです — выглядит так, что…" },
  { id: "pg4-f10", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Говорят, вкусно.» おいしい___です。", sentenceJa: "おいしい___です。", blankIndex: 0, acceptedAnswers: ["そう", "らしい"], explanationRu: "～そうです / ～らしいです — передача информации." },
];

const N3_FILL: FillBlankQuestion[] = [
  { id: "pg3-f01", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Думаю поехать.» 行こう___思っています。", sentenceJa: "旅行に行こう___思っています。", blankIndex: 0, acceptedAnswers: ["と"], explanationRu: "～ようと思う — думаю сделать." },
  { id: "pg3-f02", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Решил бросить.» やめること___した。", sentenceJa: "タバコをやめること___した。", blankIndex: 0, acceptedAnswers: ["に"], explanationRu: "～ことにする — решить." },
  { id: "pg3-f03", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Никогда не видел.» 見た___がありません。", sentenceJa: "富士山を見た___がありません。", blankIndex: 0, acceptedAnswers: ["こと"], explanationRu: "～たことがある — иметь опыт." },
  { id: "pg3-f04", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Куда бы ни пошёл…» どこへ行___", sentenceJa: "どこへ行___、人がいます。", blankIndex: 0, acceptedAnswers: ["っても"], explanationRu: "～ても — даже если." },
  { id: "pg3-f05", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Не то чтобы не нравится.» 嫌い___わけではない。", sentenceJa: "嫌い___わけではない。", blankIndex: 0, acceptedAnswers: ["な", "だ"], explanationRu: "～わけではない — не то чтобы." },
  { id: "pg3-f06", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «По-видимому, сломался.» 壊れた___です。", sentenceJa: "壊れた___です。", blankIndex: 0, acceptedAnswers: ["らしい"], explanationRu: "～らしい — по-видимому." },
  { id: "pg3-f07", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Чем раньше, тем лучше.» 早ければ早い___いい。", sentenceJa: "早ければ早い___いい。", blankIndex: 0, acceptedAnswers: ["ほど"], explanationRu: "～ば～ほど — чем…, тем…" },
  { id: "pg3-f08", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Именно поэтому.» だから___", sentenceJa: "だから___頑張ります。", blankIndex: 0, acceptedAnswers: ["こそ"], explanationRu: "だからこそ — именно поэтому." },
];

const N2_FILL: FillBlankQuestion[] = [
  { id: "pg2-f01", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Несмотря на дождь.» 雨___かかわらず", sentenceJa: "雨にも___行きました。", blankIndex: 0, acceptedAnswers: ["かかわらず"], explanationRu: "～にもかかわらず — несмотря на." },
  { id: "pg2-f02", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «С другой стороны.» 一方___", sentenceJa: "便利な一方___、危険もある。", blankIndex: 0, acceptedAnswers: ["で"], explanationRu: "～一方で — с другой стороны." },
  { id: "pg2-f03", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «По возможности.» できる___", sentenceJa: "できる___早く来てください。", blankIndex: 0, acceptedAnswers: ["限り", "かぎり"], explanationRu: "できる限り — по возможности." },
  { id: "pg2-f04", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «При необходимости.» 必要に___て", sentenceJa: "必要に___て対応します。", blankIndex: 0, acceptedAnswers: ["応じ"], explanationRu: "必要に応じて — при необходимости." },
  { id: "pg2-f05", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Другими словами.»", sentenceJa: "___、失敗したということです。", blankIndex: 0, acceptedAnswers: ["つまり"], explanationRu: "つまり — другими словами." },
  { id: "pg2-f06", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Следовательно.»", sentenceJa: "___、計画を変更します。", blankIndex: 0, acceptedAnswers: ["したがって"], explanationRu: "したがって — следовательно." },
];

const N1_FILL: FillBlankQuestion[] = [
  { id: "pg1-f01", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Какие бы обстоятельства ни были.» いかなる事情で___", sentenceJa: "いかなる事情で___、許されない。", blankIndex: 0, acceptedAnswers: ["あれ"], explanationRu: "～であれ — какой бы ни." },
  { id: "pg1-f02", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Тем не менее.»", sentenceJa: "___、努力は必要だ。", blankIndex: 0, acceptedAnswers: ["とはいえ"], explanationRu: "とはいえ — тем не менее." },
  { id: "pg1-f03", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Не только… но и.» のみ___ず", sentenceJa: "日本のみ___ず、世界中で人気だ。", blankIndex: 0, acceptedAnswers: ["なら"], explanationRu: "のみならず — не только." },
  { id: "pg1-f04", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «В соответствии с.» 規則に___て", sentenceJa: "規則に___て行動する。", blankIndex: 0, acceptedAnswers: ["則っ", "のっとっ"], explanationRu: "～に則って — в соответствии с." },
  { id: "pg1-f05", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Во что бы то ни стало.»", sentenceJa: "___成功させる。", blankIndex: 0, acceptedAnswers: ["何としても"], explanationRu: "何としても — во что бы то ни стало." },
];

// ─── Number Audio (числа и телефоны) ──────────────────────────

const N5_NUMBERS: NumberAudioQuestion[] = [
  { id: "pg5-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "さん", acceptedAnswers: ["3"], explanationRu: "さん = 3" },
  { id: "pg5-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "じゅうに", acceptedAnswers: ["12"], explanationRu: "じゅうに = 12" },
  { id: "pg5-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "にじゅうご", acceptedAnswers: ["25"], explanationRu: "にじゅうご = 25" },
  { id: "pg5-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "ひゃく", acceptedAnswers: ["100"], explanationRu: "ひゃく = 100" },
  { id: "pg5-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "さんびゃくよんじゅうに", acceptedAnswers: ["342"], explanationRu: "さんびゃくよんじゅうに = 342" },
  { id: "pg5-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "せん", acceptedAnswers: ["1000"], explanationRu: "せん = 1000" },
  { id: "pg5-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "にせんはっぴゃく", acceptedAnswers: ["2800"], explanationRu: "にせんはっぴゃく = 2800" },
  { id: "pg5-n16", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "よん", acceptedAnswers: ["4"], explanationRu: "よん = 4" },
  { id: "pg5-n17", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "しち", acceptedAnswers: ["7"], explanationRu: "しち = 7" },
  { id: "pg5-n18", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "きゅうじゅうきゅう", acceptedAnswers: ["99"], explanationRu: "きゅうじゅうきゅう = 99" },
  { id: "pg5-n19", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "よんひゃく", acceptedAnswers: ["400"], explanationRu: "よんひゃく = 400" },
  { id: "pg5-n20", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "はっぴゃく", acceptedAnswers: ["800"], explanationRu: "はっぴゃく = 800" },
  { id: "pg5-n21", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите.", audioText: "ごごしちじ", acceptedAnswers: ["7:00", "19:00"], explanationRu: "午後七時 = 7 вечера" },
  { id: "pg5-n22", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите.", audioText: "ごぜんろくじじゅっぷん", acceptedAnswers: ["6:10", "06:10"], explanationRu: "午前六時十分 = 6:10 утра" },
  { id: "pg5-n23", atSec: 0, kind: "number_audio", promptRu: "Прослушайте цену и запишите цифрами (в иенах).", audioText: "さんぜんえん", acceptedAnswers: ["3000"], explanationRu: "三千円 = 3000 иен" },
  { id: "pg5-n24", atSec: 0, kind: "number_audio", promptRu: "Прослушайте цену и запишите цифрами (в иенах).", audioText: "よんまんえん", acceptedAnswers: ["40000"], explanationRu: "四万円 = 40000 иен" },
  { id: "pg5-n25", atSec: 0, kind: "number_audio", promptRu: "Прослушайте телефонный номер и запишите.", audioText: "ぜろはちぜろのいちにさんよんのごろくななはち", acceptedAnswers: ["080-1234-5678", "08012345678"], explanationRu: "080-1234-5678" },
  { id: "pg5-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте телефонный номер и запишите.", audioText: "ぜろさんぜろのさんごろくよんのいちななはちに", acceptedAnswers: ["030-3564-1782", "03035641782"], explanationRu: "030-3564-1782" },
  { id: "pg5-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте телефонный номер и запишите.", audioText: "にーよんよんのいちぜろきゅうご", acceptedAnswers: ["244-1095", "2441095"], explanationRu: "244-1095" },
  { id: "pg5-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте телефонный номер и запишите.", audioText: "さんろくはちのなないちにぜろ", acceptedAnswers: ["368-7120", "3687120"], explanationRu: "368-7120" },
  { id: "pg5-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите (например: 3:30).", audioText: "ごぜんくじはん", acceptedAnswers: ["9:30", "09:30"], explanationRu: "午前九時半 = 9:30 утра" },
  { id: "pg5-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите.", audioText: "ごごさんじじゅうごふん", acceptedAnswers: ["3:15", "15:15"], explanationRu: "午後三時十五分 = 3:15 дня" },
  { id: "pg5-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте цену и запишите цифрами (в иенах).", audioText: "にひゃくごじゅうえん", acceptedAnswers: ["250"], explanationRu: "にひゃくごじゅうえん = 250 иен" },
  { id: "pg5-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте цену и запишите цифрами.", audioText: "せんにひゃくえん", acceptedAnswers: ["1200"], explanationRu: "せんにひゃくえん = 1200 иен" },
  { id: "pg5-n15", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите цифрами.", audioText: "ろっぴゃくななじゅうはち", acceptedAnswers: ["678"], explanationRu: "ろっぴゃくななじゅうはち = 678" },
];

const N4_NUMBERS: NumberAudioQuestion[] = [
  { id: "pg4-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "いちまんにせん", acceptedAnswers: ["12000"], explanationRu: "一万二千 = 12000" },
  { id: "pg4-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "さんまんごせんえん", acceptedAnswers: ["35000"], explanationRu: "三万五千円 = 35000" },
  { id: "pg4-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите дату (ДД.ММ).", audioText: "しがつとおか", acceptedAnswers: ["10.04", "04.10", "4月10日"], explanationRu: "四月十日 = 10 апреля" },
  { id: "pg4-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите дату.", audioText: "じゅうにがつにじゅうごにち", acceptedAnswers: ["25.12", "12.25", "12月25日"], explanationRu: "十二月二十五日 = 25 декабря" },
  { id: "pg4-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте телефонный номер.", audioText: "ぜろきゅうぜろのはちさんにいちのよんごろくなな", acceptedAnswers: ["090-8321-4567", "09083214567"], explanationRu: "090-8321-4567" },
  { id: "pg4-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "はちまんよんせんさんびゃく", acceptedAnswers: ["84300"], explanationRu: "八万四千三百 = 84300" },
  { id: "pg4-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите.", audioText: "じゅうにじよんじゅうごふん", acceptedAnswers: ["12:45"], explanationRu: "十二時四十五分 = 12:45" },
  { id: "pg4-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "ろくまんななせんはっぴゃくきゅうじゅう", acceptedAnswers: ["67890"], explanationRu: "六万七千八百九十 = 67890" },
  { id: "pg4-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "にじゅうまん", acceptedAnswers: ["200000"], explanationRu: "二十万 = 200,000" },
  { id: "pg4-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "よんじゅうごまんろくせん", acceptedAnswers: ["456000"], explanationRu: "四十五万六千 = 456,000" },
  { id: "pg4-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте цену и запишите.", audioText: "いちまんきゅうせんえん", acceptedAnswers: ["19000"], explanationRu: "一万九千円 = 19,000" },
  { id: "pg4-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите дату.", audioText: "にがつはつか", acceptedAnswers: ["20.02", "02.20", "2月20日"], explanationRu: "二月二十日 = 20 февраля" },
  { id: "pg4-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите.", audioText: "ごごはちじはん", acceptedAnswers: ["8:30", "20:30"], explanationRu: "午後八時半 = 8:30 вечера" },
  { id: "pg4-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте телефонный номер.", audioText: "ぜろきゅうぜろのににににのさんさんさんさん", acceptedAnswers: ["090-2222-3333", "09022223333"], explanationRu: "090-2222-3333" },
];

const N3_NUMBERS: NumberAudioQuestion[] = [
  { id: "pg3-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "じゅうにまんさんぜんよんひゃくごじゅうろく", acceptedAnswers: ["123456"], explanationRu: "十二万三千四百五十六 = 123,456" },
  { id: "pg3-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "ひゃくまん", acceptedAnswers: ["1000000"], explanationRu: "百万 = 1,000,000" },
  { id: "pg3-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "にじゅうごパーセント", acceptedAnswers: ["25%", "25"], explanationRu: "25パーセント = 25%" },
  { id: "pg3-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "さんてんいちよん", acceptedAnswers: ["3.14"], explanationRu: "三点一四 = 3.14" },
  { id: "pg3-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите год.", audioText: "にせんにじゅうろくねん", acceptedAnswers: ["2026", "2026年"], explanationRu: "二千二十六年 = 2026 год" },
  { id: "pg3-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите число.", audioText: "さんじゅうにまんごせん", acceptedAnswers: ["325000"], explanationRu: "三十二万五千 = 325,000" },
  { id: "pg3-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите число.", audioText: "ごひゃくまんにせん", acceptedAnswers: ["5002000"], explanationRu: "五百万二千 = 5,002,000" },
  { id: "pg3-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите дробь.", audioText: "にてんご", acceptedAnswers: ["2.5"], explanationRu: "二点五 = 2.5" },
  { id: "pg3-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите дату.", audioText: "さんがつみっか", acceptedAnswers: ["03.03", "3月3日", "3.3"], explanationRu: "三月三日 = 3 марта" },
  { id: "pg3-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "はちじゅうパーセント", acceptedAnswers: ["80%", "80"], explanationRu: "80パーセント = 80%" },
];

// ─── Dialogue Audio (диалоги) ─────────────────────────────────

const N5_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "pg5-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Где находится Такеши?",
    dialogueLines: [
      { speaker: "A", ja: "たけしさんはどこですか。" },
      { speaker: "B", ja: "たけしさんは図書館です。" },
    ],
    optionsRu: ["В школе", "В библиотеке", "Дома", "В магазине"],
    correctIndex: 1,
    explanationRu: "図書館 = библиотека.",
  },
  {
    id: "pg5-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что заказал клиент?",
    dialogueLines: [
      { speaker: "店員", ja: "いらっしゃいませ。ご注文は？" },
      { speaker: "客", ja: "コーヒーをお願いします。" },
    ],
    optionsRu: ["Чай", "Кофе", "Воду", "Сок"],
    correctIndex: 1,
    explanationRu: "コーヒー = кофе.",
  },
  {
    id: "pg5-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Чей это зонт?",
    dialogueLines: [
      { speaker: "A", ja: "これはだれのかさですか。" },
      { speaker: "B", ja: "それは田中さんのかさです。" },
    ],
    optionsRu: ["Мой", "Танаки", "Учителя", "Ничей"],
    correctIndex: 1,
    explanationRu: "田中さんの = Танаки.",
  },
  {
    id: "pg5-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Когда встреча?",
    dialogueLines: [
      { speaker: "A", ja: "会議は何時ですか。" },
      { speaker: "B", ja: "三時です。" },
    ],
    optionsRu: ["В 2 часа", "В 3 часа", "В 4 часа", "В 5 часов"],
    correctIndex: 1,
    explanationRu: "三時 = 3 часа.",
  },
  {
    id: "pg5-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Сколько стоит?",
    dialogueLines: [
      { speaker: "客", ja: "すみません、これはいくらですか。" },
      { speaker: "店員", ja: "五百円です。" },
    ],
    optionsRu: ["300 иен", "500 иен", "800 иен", "1000 иен"],
    correctIndex: 1,
    explanationRu: "五百円 = 500 иен.",
  },
  {
    id: "pg5-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Откуда студент?",
    dialogueLines: [
      { speaker: "先生", ja: "どこから来ましたか。" },
      { speaker: "学生", ja: "ロシアから来ました。" },
    ],
    optionsRu: ["Из Китая", "Из Америки", "Из России", "Из Кореи"],
    correctIndex: 2,
    explanationRu: "ロシア = Россия.",
  },
  {
    id: "pg5-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что есть в комнате?",
    dialogueLines: [
      { speaker: "A", ja: "部屋に何がありますか。" },
      { speaker: "B", ja: "テーブルといすがあります。" },
    ],
    optionsRu: ["Кровать и шкаф", "Стол и стул", "Телевизор и диван", "Ничего"],
    correctIndex: 1,
    explanationRu: "テーブルといす = стол и стул.",
  },
  {
    id: "pg5-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Куда идёт человек?",
    dialogueLines: [
      { speaker: "A", ja: "どこへ行きますか。" },
      { speaker: "B", ja: "スーパーへ行きます。" },
    ],
    optionsRu: ["В школу", "В больницу", "В супермаркет", "На работу"],
    correctIndex: 2,
    explanationRu: "スーパー = супермаркет.",
  },
  {
    id: "pg5-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что хочет человек?",
    dialogueLines: [
      { speaker: "A", ja: "何がほしいですか。" },
      { speaker: "B", ja: "水がほしいです。" },
    ],
    optionsRu: ["Еду", "Воду", "Книгу", "Билет"],
    correctIndex: 1,
    explanationRu: "水 = вода.",
  },
  {
    id: "pg5-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что нравится человеку?",
    dialogueLines: [
      { speaker: "A", ja: "何が好きですか。" },
      { speaker: "B", ja: "アニメが好きです。" },
    ],
    optionsRu: ["Футбол", "Аниме", "Музыка", "Кулинария"],
    correctIndex: 1,
    explanationRu: "アニメ = аниме.",
  },
  {
    id: "pg5-d11", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что будет дальше?",
    dialogueLines: [
      { speaker: "A", ja: "まず、宿題をします。" },
      { speaker: "B", ja: "それから、寝ます。" },
    ],
    optionsRu: ["Пойдёт гулять", "Ляжет спать", "Будет есть", "Пойдёт на работу"],
    correctIndex: 1,
    explanationRu: "それから = затем.",
  },
  {
    id: "pg5-d12", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Кого нет дома?",
    dialogueLines: [
      { speaker: "A", ja: "お母さんはいますか。" },
      { speaker: "B", ja: "すみません。今、いません。" },
    ],
    optionsRu: ["Брата", "Маму", "Друга", "Учителя"],
    correctIndex: 1,
    explanationRu: "今、いません = сейчас нет.",
  },
  {
    id: "pg5-d13", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что за предмет?",
    dialogueLines: [
      { speaker: "A", ja: "それは何ですか。" },
      { speaker: "B", ja: "これは辞書です。" },
    ],
    optionsRu: ["Пенал", "Словарь", "Телефон", "Ключ"],
    correctIndex: 1,
    explanationRu: "辞書 = словарь.",
  },
  {
    id: "pg5-d14", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какой рост у человека?",
    dialogueLines: [
      { speaker: "A", ja: "背が高いですか。" },
      { speaker: "B", ja: "はい、背が高いです。" },
    ],
    optionsRu: ["Высокий", "Низкий", "Полный", "Худой"],
    correctIndex: 0,
    explanationRu: "背が高い = высокий рост.",
  },
];

const N4_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "pg4-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что собирается делать человек?",
    dialogueLines: [
      { speaker: "A", ja: "週末は何をするつもりですか。" },
      { speaker: "B", ja: "映画を見るつもりです。" },
    ],
    optionsRu: ["Читать книгу", "Смотреть фильм", "Гулять", "Работать"],
    correctIndex: 1,
    explanationRu: "映画を見るつもり = собираюсь смотреть фильм.",
  },
  {
    id: "pg4-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Почему человек опоздал?",
    dialogueLines: [
      { speaker: "A", ja: "どうして遅れましたか。" },
      { speaker: "B", ja: "電車が遅れたからです。" },
    ],
    optionsRu: ["Проспал", "Поезд опоздал", "Заблудился", "Забыл"],
    correctIndex: 1,
    explanationRu: "電車が遅れた = поезд опоздал.",
  },
  {
    id: "pg4-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Можно ли фотографировать?",
    dialogueLines: [
      { speaker: "客", ja: "写真を撮ってもいいですか。" },
      { speaker: "店員", ja: "すみません、撮ってはいけません。" },
    ],
    optionsRu: ["Да, можно", "Нет, нельзя", "Только снаружи", "Только с разрешения"],
    correctIndex: 1,
    explanationRu: "撮ってはいけません = нельзя фотографировать.",
  },
  {
    id: "pg4-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что делал человек, пока ехал?",
    dialogueLines: [
      { speaker: "A", ja: "電車の中で何をしていましたか。" },
      { speaker: "B", ja: "音楽を聞きながら本を読んでいました。" },
    ],
    optionsRu: ["Спал", "Слушал музыку и читал", "Смотрел видео", "Разговаривал"],
    correctIndex: 1,
    explanationRu: "聞きながら読んで = слушая, читал.",
  },
  {
    id: "pg4-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какая завтра погода?",
    dialogueLines: [
      { speaker: "A", ja: "明日の天気はどうですか。" },
      { speaker: "B", ja: "明日は雨だそうです。" },
    ],
    optionsRu: ["Солнечно", "Облачно", "Дождь", "Снег"],
    correctIndex: 2,
    explanationRu: "雨だそうです = говорят, дождь.",
  },
  {
    id: "pg4-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что должен сделать студент?",
    dialogueLines: [
      { speaker: "先生", ja: "明日までにレポートを出さなければなりません。" },
      { speaker: "学生", ja: "はい、わかりました。" },
    ],
    optionsRu: ["Купить учебник", "Сдать отчёт до завтра", "Прийти раньше", "Позвонить"],
    correctIndex: 1,
    explanationRu: "レポートを出さなければなりません = должен сдать отчёт.",
  },
  {
    id: "pg4-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что нельзя делать в библиотеке?",
    dialogueLines: [
      { speaker: "A", ja: "図書館で電話してもいいですか。" },
      { speaker: "B", ja: "すみません、電話してはいけません。" },
    ],
    optionsRu: ["Читать", "Говорить по телефону", "Писать", "Учиться"],
    correctIndex: 1,
    explanationRu: "～てはいけません = нельзя.",
  },
  {
    id: "pg4-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что человек будет делать после еды?",
    dialogueLines: [
      { speaker: "A", ja: "食べてから何をしますか。" },
      { speaker: "B", ja: "食べてから、買い物に行きます。" },
    ],
    optionsRu: ["Пойдёт спать", "Пойдёт за покупками", "Пойдёт домой", "Будет учиться"],
    correctIndex: 1,
    explanationRu: "買い物に行きます = пойду за покупками.",
  },
  {
    id: "pg4-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что хочет сделать человек в выходные?",
    dialogueLines: [
      { speaker: "A", ja: "今週末、旅行に行きたいんですが。" },
      { speaker: "B", ja: "いいですね。どこに行きますか。" },
    ],
    optionsRu: ["Учиться", "Поехать в путешествие", "Работать", "Смотреть телевизор"],
    correctIndex: 1,
    explanationRu: "旅行に行きたい = хочу поехать в путешествие.",
  },
  {
    id: "pg4-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что человек умеет делать?",
    dialogueLines: [
      { speaker: "A", ja: "日本語で説明できますか。" },
      { speaker: "B", ja: "はい、少し説明できます。" },
    ],
    optionsRu: ["Не умеет", "Может объяснить немного", "Может идеально", "Не хочет"],
    correctIndex: 1,
    explanationRu: "説明できます = могу объяснить.",
  },
];

const N3_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "pg3-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что решил сделать человек?",
    dialogueLines: [
      { speaker: "A", ja: "来年どうするの？" },
      { speaker: "B", ja: "日本に留学することにした。" },
    ],
    optionsRu: ["Устроиться на работу", "Поехать учиться в Японию", "Остаться дома", "Путешествовать"],
    correctIndex: 1,
    explanationRu: "留学することにした = решил поехать на учёбу.",
  },
  {
    id: "pg3-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Был ли человек в Киото?",
    dialogueLines: [
      { speaker: "A", ja: "京都に行ったことがありますか。" },
      { speaker: "B", ja: "いいえ、まだ行ったことがありません。" },
    ],
    optionsRu: ["Да, был", "Нет, не был", "Был давно", "Собирается"],
    correctIndex: 1,
    explanationRu: "行ったことがありません = никогда не был.",
  },
  {
    id: "pg3-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Почему человек не может прийти?",
    dialogueLines: [
      { speaker: "A", ja: "土曜日のパーティーに来られますか。" },
      { speaker: "B", ja: "残念ですが、仕事があるので行けません。" },
    ],
    optionsRu: ["Болеет", "Есть работа", "Уезжает", "Не хочет"],
    correctIndex: 1,
    explanationRu: "仕事があるので = потому что есть работа.",
  },
  {
    id: "pg3-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что случилось с компьютером?",
    dialogueLines: [
      { speaker: "A", ja: "パソコンどうしたの？" },
      { speaker: "B", ja: "壊れたらしいんだ。修理に出すよ。" },
    ],
    optionsRu: ["Потерял", "Сломался", "Украли", "Продал"],
    correctIndex: 1,
    explanationRu: "壊れたらしい = по-видимому, сломался.",
  },
];

const N2_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "pg2-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какова позиция говорящего?",
    dialogueLines: [
      { speaker: "A", ja: "この計画についてどう思いますか。" },
      { speaker: "B", ja: "便利な一方で、コストが高すぎると思います。" },
    ],
    optionsRu: ["Полностью за", "Есть плюсы, но дорого", "Полностью против", "Безразлично"],
    correctIndex: 1,
    explanationRu: "一方で = с другой стороны; コストが高すぎる = слишком дорого.",
  },
  {
    id: "pg2-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что нужно сделать?",
    dialogueLines: [
      { speaker: "部長", ja: "この件は、できる限り早く対応してください。" },
      { speaker: "社員", ja: "はい、すぐに取りかかります。" },
    ],
    optionsRu: ["Подождать", "Решить как можно скорее", "Отменить", "Передать другому"],
    correctIndex: 1,
    explanationRu: "できる限り早く = как можно скорее.",
  },
  {
    id: "pg2-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Пойдёт ли человек на мероприятие?",
    dialogueLines: [
      { speaker: "A", ja: "明日のイベント、行く？" },
      { speaker: "B", ja: "雨にもかかわらず、行くつもりだよ。" },
    ],
    optionsRu: ["Нет, из-за дождя", "Да, несмотря на дождь", "Ещё не решил", "Зависит от погоды"],
    correctIndex: 1,
    explanationRu: "にもかかわらず = несмотря на.",
  },
  {
    id: "pg2-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что предлагает начальник?",
    dialogueLines: [
      { speaker: "上司", ja: "必要に応じて、方法を変えましょう。" },
      { speaker: "部下", ja: "わかりました。状況を見て判断します。" },
    ],
    optionsRu: ["Ничего не менять", "Менять подход при необходимости", "Отменить проект", "Ждать указаний"],
    correctIndex: 1,
    explanationRu: "必要に応じて = при необходимости.",
  },
  {
    id: "pg2-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что делает говорящий?",
    dialogueLines: [
      { speaker: "A", ja: "この件はつまり、時間が足りないということです。" },
      { speaker: "B", ja: "なるほど。では予定を見直しましょう。" },
    ],
    optionsRu: ["Извиняется", "Перефразирует/объясняет суть", "Отказывается", "Шутит"],
    correctIndex: 1,
    explanationRu: "つまり = другими словами.",
  },
  {
    id: "pg2-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что они решили сделать?",
    dialogueLines: [
      { speaker: "A", ja: "コストが高いので、したがって計画を変更します。" },
      { speaker: "B", ja: "了解です。新しい案を作ります。" },
    ],
    optionsRu: ["Оставить план", "Изменить план", "Закрыть проект", "Увеличить бюджет"],
    correctIndex: 1,
    explanationRu: "したがって = следовательно.",
  },
];

const N1_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "pg1-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какова позиция компании?",
    dialogueLines: [
      { speaker: "記者", ja: "今回の件について、コメントをお願いします。" },
      { speaker: "広報", ja: "いかなる事情であれ、弊社の方針は変わりません。" },
    ],
    optionsRu: ["Изменят политику", "Политика не изменится", "Пока не решили", "Извинятся"],
    correctIndex: 1,
    explanationRu: "いかなる事情であれ = какие бы обстоятельства ни были.",
  },
  {
    id: "pg1-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что думает говорящий?",
    dialogueLines: [
      { speaker: "A", ja: "この問題は簡単だと思いますか。" },
      { speaker: "B", ja: "とはいえ、慎重に進めるべきだと思います。" },
    ],
    optionsRu: ["Проблема простая", "Нужно действовать осторожно", "Не стоит заниматься", "Уже решена"],
    correctIndex: 1,
    explanationRu: "とはいえ = тем не менее; 慎重に = осторожно.",
  },
  {
    id: "pg1-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что подчёркивает говорящий?",
    dialogueLines: [
      { speaker: "A", ja: "結果はどうでしたか。" },
      { speaker: "B", ja: "何としても、期限内に終わらせるべきだと考えています。" },
    ],
    optionsRu: ["Неважно", "Любой ценой уложиться в срок", "Можно отложить", "Нужно отменить"],
    correctIndex: 1,
    explanationRu: "何としても = во что бы то ни стало.",
  },
  {
    id: "pg1-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какую структуру использует говорящий?",
    dialogueLines: [
      { speaker: "A", ja: "この方針は適切ですか。" },
      { speaker: "B", ja: "いかなる事情であれ、守るべきです。" },
    ],
    optionsRu: ["Условие", "Какие бы обстоятельства ни были", "Причина", "Цель"],
    correctIndex: 1,
    explanationRu: "いかなる事情であれ = какие бы обстоятельства ни были.",
  },
];

// ─── Export ────────────────────────────────────────────────────

export type PracticeCategory = "grammar" | "vocab" | "kanji" | "word_order" | "fill_blank" | "number_audio" | "dialogue_audio" | "genki";

const BANK: Record<JLPTLevel, Record<PracticeCategory, LessonQuestion[]>> = {
  N5: {
    grammar: [...N5_GRAMMAR, ...EX_N5_GRAMMAR],
    vocab: [...N5_VOCAB, ...EX_N5_VOCAB],
    kanji: [...N5_KANJI, ...EX_N5_KANJI],
    word_order: [...N5_WORD_ORDER, ...EX_N5_WORD_ORDER],
    fill_blank: [...N5_FILL, ...EX_N5_FILL],
    number_audio: [...N5_NUMBERS, ...EX_N5_NUMBERS],
    dialogue_audio: [...N5_DIALOGUES, ...EX_N5_DIALOGUES],
    genki: ALL_GENKI_EXERCISES,
  },
  N4: {
    grammar: [...N4_GRAMMAR, ...EX_N4_GRAMMAR],
    vocab: [...N4_VOCAB, ...EX_N4_VOCAB],
    kanji: [...N4_KANJI, ...EX_N4_KANJI],
    word_order: [...N4_WORD_ORDER, ...EX_N4_WORD_ORDER],
    fill_blank: [...N4_FILL, ...EX_N4_FILL],
    number_audio: [...N4_NUMBERS, ...EX_N4_NUMBERS],
    dialogue_audio: [...N4_DIALOGUES, ...EX_N4_DIALOGUES],
    genki: ALL_GENKI_EXERCISES,
  },
  N3: {
    grammar: [...N3_GRAMMAR, ...EX_N3_GRAMMAR],
    vocab: [...N3_VOCAB, ...EX_N3_VOCAB],
    kanji: [...N3_KANJI, ...EX_N3_KANJI],
    word_order: [...N3_WORD_ORDER, ...EX_N3_WORD_ORDER],
    fill_blank: [...N3_FILL, ...EX_N3_FILL],
    number_audio: [...N3_NUMBERS, ...EX_N3_NUMBERS],
    dialogue_audio: [...N3_DIALOGUES, ...EX_N3_DIALOGUES],
    genki: [],
  },
  N2: {
    grammar: [...N2_GRAMMAR, ...EX_N2_GRAMMAR],
    vocab: [...N2_VOCAB, ...EX_N2_VOCAB],
    kanji: [...N2_KANJI, ...EX_N2_KANJI],
    word_order: [...N2_WORD_ORDER, ...EX_N2_WORD_ORDER],
    fill_blank: [...N2_FILL, ...EX_N2_FILL],
    number_audio: [...N3_NUMBERS, ...EX_N2_NUMBERS],
    dialogue_audio: [...N2_DIALOGUES, ...EX_N2_DIALOGUES],
    genki: [],
  },
  N1: {
    grammar: [...N1_GRAMMAR, ...EX_N1_GRAMMAR],
    vocab: [...N1_VOCAB, ...EX_N1_VOCAB],
    kanji: [...N1_KANJI, ...EX_N1_KANJI],
    word_order: [...N1_WORD_ORDER, ...EX_N1_WORD_ORDER],
    fill_blank: [...N1_FILL, ...EX_N1_FILL],
    number_audio: [...N3_NUMBERS, ...EX_N1_NUMBERS],
    dialogue_audio: [...N1_DIALOGUES, ...EX_N1_DIALOGUES],
    genki: [],
  },
};

export function getPracticeExercises(level: JLPTLevel, category: PracticeCategory): LessonQuestion[] {
  return BANK[level]?.[category] ?? [];
}

export function getAllPracticeCategories(level: JLPTLevel): { category: PracticeCategory; titleRu: string; count: number }[] {
  const cats: { category: PracticeCategory; titleRu: string; count: number }[] = [
    { category: "grammar", titleRu: "Грамматика", count: (BANK[level]?.grammar ?? []).length },
    { category: "vocab", titleRu: "Слова и фразы", count: (BANK[level]?.vocab ?? []).length },
    { category: "kanji", titleRu: "Кандзи", count: (BANK[level]?.kanji ?? []).length },
    { category: "word_order", titleRu: "Порядок слов", count: (BANK[level]?.word_order ?? []).length },
    { category: "fill_blank", titleRu: "Впиши ответ", count: (BANK[level]?.fill_blank ?? []).length },
    { category: "number_audio", titleRu: "Числа на слух", count: (BANK[level]?.number_audio ?? []).length },
    { category: "dialogue_audio", titleRu: "Аудио-диалоги", count: (BANK[level]?.dialogue_audio ?? []).length },
  ];
  const genkiCount = (BANK[level]?.genki ?? []).length;
  if (genkiCount > 0) {
    cats.push({ category: "genki", titleRu: "Genki (учебник)", count: genkiCount });
  }
  return cats;
}
