import type { JLPTLevel } from "./content";

export interface SpeechWord {
  ja: string;
  reading: string;
  meaningRu: string;
}

const N5_WORDS: SpeechWord[] = [
  { ja: "おはようございます", reading: "おはようございます", meaningRu: "Доброе утро" },
  { ja: "こんにちは", reading: "こんにちは", meaningRu: "Здравствуйте / Добрый день" },
  { ja: "こんばんは", reading: "こんばんは", meaningRu: "Добрый вечер" },
  { ja: "ありがとうございます", reading: "ありがとうございます", meaningRu: "Спасибо" },
  { ja: "すみません", reading: "すみません", meaningRu: "Извините" },
  { ja: "いただきます", reading: "いただきます", meaningRu: "Приятного аппетита" },
  { ja: "ごちそうさまでした", reading: "ごちそうさまでした", meaningRu: "Спасибо за еду" },
  { ja: "水", reading: "みず", meaningRu: "Вода" },
  { ja: "学校", reading: "がっこう", meaningRu: "Школа" },
  { ja: "先生", reading: "せんせい", meaningRu: "Учитель" },
  { ja: "友達", reading: "ともだち", meaningRu: "Друг" },
  { ja: "食べます", reading: "たべます", meaningRu: "Есть / кушать" },
  { ja: "飲みます", reading: "のみます", meaningRu: "Пить" },
  { ja: "行きます", reading: "いきます", meaningRu: "Идти" },
  { ja: "大きい", reading: "おおきい", meaningRu: "Большой" },
  { ja: "小さい", reading: "ちいさい", meaningRu: "Маленький" },
  { ja: "今日", reading: "きょう", meaningRu: "Сегодня" },
  { ja: "明日", reading: "あした", meaningRu: "Завтра" },
  { ja: "猫", reading: "ねこ", meaningRu: "Кошка" },
  { ja: "犬", reading: "いぬ", meaningRu: "Собака" },
  { ja: "本", reading: "ほん", meaningRu: "Книга" },
  { ja: "電話", reading: "でんわ", meaningRu: "Телефон" },
  { ja: "日本語", reading: "にほんご", meaningRu: "Японский язык" },
  { ja: "お願いします", reading: "おねがいします", meaningRu: "Пожалуйста (просьба)" },
  { ja: "さようなら", reading: "さようなら", meaningRu: "До свидания" },
];

const N4_WORDS: SpeechWord[] = [
  { ja: "経験", reading: "けいけん", meaningRu: "Опыт" },
  { ja: "説明", reading: "せつめい", meaningRu: "Объяснение" },
  { ja: "準備", reading: "じゅんび", meaningRu: "Подготовка" },
  { ja: "紹介", reading: "しょうかい", meaningRu: "Представление / знакомство" },
  { ja: "約束", reading: "やくそく", meaningRu: "Обещание" },
  { ja: "趣味", reading: "しゅみ", meaningRu: "Хобби" },
  { ja: "連絡", reading: "れんらく", meaningRu: "Связь / контакт" },
  { ja: "出発", reading: "しゅっぱつ", meaningRu: "Отправление" },
  { ja: "到着", reading: "とうちゃく", meaningRu: "Прибытие" },
  { ja: "特別", reading: "とくべつ", meaningRu: "Особый" },
  { ja: "簡単", reading: "かんたん", meaningRu: "Простой" },
  { ja: "複雑", reading: "ふくざつ", meaningRu: "Сложный" },
  { ja: "遅れます", reading: "おくれます", meaningRu: "Опаздывать" },
  { ja: "届けます", reading: "とどけます", meaningRu: "Доставлять" },
  { ja: "申し込みます", reading: "もうしこみます", meaningRu: "Подавать заявку" },
  { ja: "頑張ります", reading: "がんばります", meaningRu: "Стараться" },
  { ja: "心配します", reading: "しんぱいします", meaningRu: "Беспокоиться" },
  { ja: "安全", reading: "あんぜん", meaningRu: "Безопасность" },
  { ja: "将来", reading: "しょうらい", meaningRu: "Будущее" },
  { ja: "最近", reading: "さいきん", meaningRu: "Недавно" },
];

const N3_WORDS: SpeechWord[] = [
  { ja: "影響", reading: "えいきょう", meaningRu: "Влияние" },
  { ja: "環境", reading: "かんきょう", meaningRu: "Окружающая среда" },
  { ja: "発展", reading: "はってん", meaningRu: "Развитие" },
  { ja: "技術", reading: "ぎじゅつ", meaningRu: "Технология / навык" },
  { ja: "情報", reading: "じょうほう", meaningRu: "Информация" },
  { ja: "交通", reading: "こうつう", meaningRu: "Транспорт" },
  { ja: "政治", reading: "せいじ", meaningRu: "Политика" },
  { ja: "経済", reading: "けいざい", meaningRu: "Экономика" },
  { ja: "伝統", reading: "でんとう", meaningRu: "Традиция" },
  { ja: "文化", reading: "ぶんか", meaningRu: "Культура" },
  { ja: "努力", reading: "どりょく", meaningRu: "Усилие" },
  { ja: "成功", reading: "せいこう", meaningRu: "Успех" },
  { ja: "失敗", reading: "しっぱい", meaningRu: "Неудача" },
  { ja: "必要", reading: "ひつよう", meaningRu: "Необходимый" },
  { ja: "可能", reading: "かのう", meaningRu: "Возможный" },
  { ja: "確認します", reading: "かくにんします", meaningRu: "Подтверждать" },
  { ja: "参加します", reading: "さんかします", meaningRu: "Участвовать" },
  { ja: "実現します", reading: "じつげんします", meaningRu: "Осуществлять" },
  { ja: "完成します", reading: "かんせいします", meaningRu: "Завершать" },
  { ja: "比較します", reading: "ひかくします", meaningRu: "Сравнивать" },
];

const N2_WORDS: SpeechWord[] = [
  { ja: "偶然", reading: "ぐうぜん", meaningRu: "Случайность" },
  { ja: "慎重", reading: "しんちょう", meaningRu: "Осторожный" },
  { ja: "矛盾", reading: "むじゅん", meaningRu: "Противоречие" },
  { ja: "曖昧", reading: "あいまい", meaningRu: "Неопределённый" },
  { ja: "抽象的", reading: "ちゅうしょうてき", meaningRu: "Абстрактный" },
  { ja: "具体的", reading: "ぐたいてき", meaningRu: "Конкретный" },
  { ja: "効率的", reading: "こうりつてき", meaningRu: "Эффективный" },
  { ja: "本質", reading: "ほんしつ", meaningRu: "Суть / сущность" },
  { ja: "傾向", reading: "けいこう", meaningRu: "Тенденция" },
  { ja: "状況", reading: "じょうきょう", meaningRu: "Ситуация" },
  { ja: "対応します", reading: "たいおうします", meaningRu: "Реагировать / справляться" },
  { ja: "把握します", reading: "はあくします", meaningRu: "Понимать / охватывать" },
  { ja: "分析します", reading: "ぶんせきします", meaningRu: "Анализировать" },
  { ja: "維持します", reading: "いじします", meaningRu: "Поддерживать" },
  { ja: "克服します", reading: "こくふくします", meaningRu: "Преодолевать" },
  { ja: "妥協", reading: "だきょう", meaningRu: "Компромисс" },
  { ja: "根拠", reading: "こんきょ", meaningRu: "Основание / довод" },
  { ja: "展開", reading: "てんかい", meaningRu: "Развёртывание" },
  { ja: "促進", reading: "そくしん", meaningRu: "Содействие" },
  { ja: "削減", reading: "さくげん", meaningRu: "Сокращение" },
];

const N1_WORDS: SpeechWord[] = [
  { ja: "恣意的", reading: "しいてき", meaningRu: "Произвольный" },
  { ja: "帰結", reading: "きけつ", meaningRu: "Следствие / вывод" },
  { ja: "斡旋", reading: "あっせん", meaningRu: "Посредничество" },
  { ja: "乖離", reading: "かいり", meaningRu: "Расхождение" },
  { ja: "享受", reading: "きょうじゅ", meaningRu: "Получение (благ)" },
  { ja: "逸脱", reading: "いつだつ", meaningRu: "Отклонение" },
  { ja: "憂慮", reading: "ゆうりょ", meaningRu: "Беспокойство / тревога" },
  { ja: "顕著", reading: "けんちょ", meaningRu: "Заметный / выраженный" },
  { ja: "脆弱", reading: "ぜいじゃく", meaningRu: "Уязвимый / хрупкий" },
  { ja: "暫定的", reading: "ざんていてき", meaningRu: "Временный / предварительный" },
  { ja: "遂行します", reading: "すいこうします", meaningRu: "Выполнять / осуществлять" },
  { ja: "払拭します", reading: "ふっしょくします", meaningRu: "Устранять / рассеивать" },
  { ja: "網羅します", reading: "もうらします", meaningRu: "Охватывать / включать всё" },
  { ja: "是正します", reading: "ぜせいします", meaningRu: "Исправлять / корректировать" },
  { ja: "堅持します", reading: "けんじします", meaningRu: "Твёрдо придерживаться" },
  { ja: "甚大", reading: "じんだい", meaningRu: "Огромный / колоссальный" },
  { ja: "懸念", reading: "けねん", meaningRu: "Опасение" },
  { ja: "辛辣", reading: "しんらつ", meaningRu: "Едкий / язвительный" },
  { ja: "精緻", reading: "せいち", meaningRu: "Тщательный / изысканный" },
  { ja: "顕在化します", reading: "けんざいかします", meaningRu: "Становиться явным" },
];

const WORD_BANKS: Record<string, SpeechWord[]> = {
  N5: N5_WORDS,
  N4: N4_WORDS,
  N3: N3_WORDS,
  N2: N2_WORDS,
  N1: N1_WORDS,
};

export function getSpeechWords(level: JLPTLevel): SpeechWord[] {
  return WORD_BANKS[level] ?? N5_WORDS;
}
