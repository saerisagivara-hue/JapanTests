import type {
  ListeningMcqQuestion,
  WordOrderQuestion,
  KanjiTranslateQuestion,
  FillBlankQuestion,
  NumberAudioQuestion,
  DialogueAudioQuestion,
} from "./content";

// ═══════════════════════════════════════════════════════════════
//  N5 — ДОПОЛНИТЕЛЬНЫЕ УПРАЖНЕНИЯ
// ═══════════════════════════════════════════════════════════════

// ─── N5 Grammar (30) ──────────────────────────────────────────

export const EX_N5_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "ex5-g01", atSec: 0, kind: "listening_mcq", promptRu: "Какая て-форма у глагола 書く?", optionsRu: ["書いて", "書って", "書きて", "書して"], correctIndex: 0, explanationRu: "く → いて (書く → 書いて)." },
  { id: "ex5-g02", atSec: 0, kind: "listening_mcq", promptRu: "Какая て-форма у глагола 飲む?", optionsRu: ["飲みて", "飲んで", "飲って", "飲して"], correctIndex: 1, explanationRu: "む → んで (飲む → 飲んで)." },
  { id: "ex5-g03", atSec: 0, kind: "listening_mcq", promptRu: "「一緒に食べましょう」означает:", optionsRu: ["Не ешьте!", "Давайте поедим вместе", "Я не буду есть", "Можно поесть?"], correctIndex: 1, explanationRu: "～ましょう — приглашение к совместному действию." },
  { id: "ex5-g04", atSec: 0, kind: "listening_mcq", promptRu: "「九時から五時まで働きます」— что значит から…まで?", optionsRu: ["Потому что… поэтому", "От… до", "Если… то", "И… и"], correctIndex: 1, explanationRu: "から～まで = от… до (о времени/расстоянии)." },
  { id: "ex5-g05", atSec: 0, kind: "listening_mcq", promptRu: "「電車はバスより速いです」— что сравнивается?", optionsRu: ["Электричка быстрее автобуса", "Автобус быстрее электрички", "Они одинаковые", "Электричка дешевле"], correctIndex: 0, explanationRu: "A は B より ～ = A более ～, чем B." },
  { id: "ex5-g06", atSec: 0, kind: "listening_mcq", promptRu: "Какой счётчик используется для длинных предметов (карандаши, бутылки)?", optionsRu: ["匹", "本", "台", "冊"], correctIndex: 1, explanationRu: "本（ほん）— счётчик для длинных/цилиндрических предметов." },
  { id: "ex5-g07", atSec: 0, kind: "listening_mcq", promptRu: "Какой счётчик используется для мелких животных (кошки, собаки)?", optionsRu: ["本", "台", "匹", "冊"], correctIndex: 2, explanationRu: "匹（ひき）— счётчик для мелких животных." },
  { id: "ex5-g08", atSec: 0, kind: "listening_mcq", promptRu: "Какой счётчик используется для техники (машины, компьютеры)?", optionsRu: ["冊", "匹", "本", "台"], correctIndex: 3, explanationRu: "台（だい）— счётчик для машин и техники." },
  { id: "ex5-g09", atSec: 0, kind: "listening_mcq", promptRu: "Какой счётчик используется для книг и тетрадей?", optionsRu: ["冊", "本", "匹", "台"], correctIndex: 0, explanationRu: "冊（さつ）— счётчик для книг/тетрадей." },
  { id: "ex5-g10", atSec: 0, kind: "listening_mcq", promptRu: "「今、本を読んでいます」означает:", optionsRu: ["Я прочитал книгу", "Я сейчас читаю книгу", "Я не читаю книгу", "Я хочу читать книгу"], correctIndex: 1, explanationRu: "～ている = действие происходит прямо сейчас." },
  { id: "ex5-g11", atSec: 0, kind: "listening_mcq", promptRu: "「手を洗ってから食べます」означает:", optionsRu: ["Ем, потом мою руки", "Мою руки, потом ем", "Мою руки и ем одновременно", "Не ем"], correctIndex: 1, explanationRu: "～てから = после того как." },
  { id: "ex5-g12", atSec: 0, kind: "listening_mcq", promptRu: "「医者になりたいです」означает:", optionsRu: ["Я стал врачом", "Я хочу стать врачом", "Я врач", "Я не врач"], correctIndex: 1, explanationRu: "～になる = стать чем-то; ～たい = хотеть." },
  { id: "ex5-g13", atSec: 0, kind: "listening_mcq", promptRu: "「日本に行きたいです」означает:", optionsRu: ["Я был в Японии", "Я хочу поехать в Японию", "Я еду в Японию", "Я не хочу в Японию"], correctIndex: 1, explanationRu: "～たい = хотеть (о себе)." },
  { id: "ex5-g14", atSec: 0, kind: "listening_mcq", promptRu: "「彼女はケーキを食べたがっている」означает:", optionsRu: ["Она ест торт", "Она хочет съесть торт", "Она не хочет торт", "Она съела торт"], correctIndex: 1, explanationRu: "～がる — о желании третьего лица." },
  { id: "ex5-g15", atSec: 0, kind: "listening_mcq", promptRu: "「食べすぎました」означает:", optionsRu: ["Не поел", "Съел слишком много", "Хорошо поел", "Мало поел"], correctIndex: 1, explanationRu: "～すぎる = слишком много / чрезмерно." },
  { id: "ex5-g16", atSec: 0, kind: "listening_mcq", promptRu: "「薬を飲んだほうがいいです」означает:", optionsRu: ["Не надо пить лекарство", "Лучше выпить лекарство", "Лекарство не помогает", "Лекарство вкусное"], correctIndex: 1, explanationRu: "～ほうがいい = лучше бы сделать." },
  { id: "ex5-g17", atSec: 0, kind: "listening_mcq", promptRu: "「ここで写真を撮らないでください」означает:", optionsRu: ["Сфотографируйте здесь", "Не фотографируйте здесь", "Можно фотографировать", "Нужно фотографировать"], correctIndex: 1, explanationRu: "～ないでください = пожалуйста, не делайте." },
  { id: "ex5-g18", atSec: 0, kind: "listening_mcq", promptRu: "「行かなくてもいいです」означает:", optionsRu: ["Нужно идти", "Можно не идти", "Нельзя идти", "Хочу идти"], correctIndex: 1, explanationRu: "～なくてもいい = можно не делать." },
  { id: "ex5-g19", atSec: 0, kind: "listening_mcq", promptRu: "「窓を開けましょうか」означает:", optionsRu: ["Откройте окно!", "Окно открыто", "Может, мне открыть окно?", "Я закрыл окно"], correctIndex: 2, explanationRu: "～ましょうか = предложение помощи." },
  { id: "ex5-g20", atSec: 0, kind: "listening_mcq", promptRu: "「明日は雨だと思います」означает:", optionsRu: ["Завтра не будет дождя", "Думаю, завтра будет дождь", "Завтра точно дождь", "Вчера был дождь"], correctIndex: 1, explanationRu: "～と思います = я думаю, что…" },
  { id: "ex5-g21", atSec: 0, kind: "listening_mcq", promptRu: "「明日は晴れるでしょう」означает:", optionsRu: ["Завтра точно дождь", "Наверное, завтра будет ясно", "Завтра облачно", "Вчера было ясно"], correctIndex: 1, explanationRu: "～でしょう = наверное, скорее всего." },
  { id: "ex5-g22", atSec: 0, kind: "listening_mcq", promptRu: "「彼は来るかもしれません」означает:", optionsRu: ["Он точно придёт", "Он, возможно, придёт", "Он не придёт", "Он уже пришёл"], correctIndex: 1, explanationRu: "～かもしれません = возможно, может быть." },
  { id: "ex5-g23", atSec: 0, kind: "listening_mcq", promptRu: "「彼は今日来るはずです」означает:", optionsRu: ["Он не придёт", "Он должен прийти сегодня", "Он, может, придёт", "Он хочет прийти"], correctIndex: 1, explanationRu: "～はずです = должен, по идее." },
  { id: "ex5-g24", atSec: 0, kind: "listening_mcq", promptRu: "「おいしそうです」означает:", optionsRu: ["Это вкусно", "Говорят, вкусно", "Выглядит вкусно", "Было вкусно"], correctIndex: 2, explanationRu: "～そうです (от основы) = выглядит так, кажется." },
  { id: "ex5-g25", atSec: 0, kind: "listening_mcq", promptRu: "「毎日運動するようにしています」означает:", optionsRu: ["Я не занимаюсь спортом", "Стараюсь заниматься каждый день", "Я уже бросил спорт", "Я люблю спорт"], correctIndex: 1, explanationRu: "～ようにする = стараться делать." },
  { id: "ex5-g26", atSec: 0, kind: "listening_mcq", promptRu: "「日本語を話すことができます」означает:", optionsRu: ["Не умею говорить по-японски", "Умею говорить по-японски", "Учу японский", "Хочу выучить японский"], correctIndex: 1, explanationRu: "～ことができる = мочь, уметь." },
  { id: "ex5-g27", atSec: 0, kind: "listening_mcq", promptRu: "「寝る前に歯を磨きます」означает:", optionsRu: ["После сна чищу зубы", "Перед сном чищу зубы", "Не чищу зубы", "Чищу зубы во сне"], correctIndex: 1, explanationRu: "～前に = перед тем как." },
  { id: "ex5-g28", atSec: 0, kind: "listening_mcq", promptRu: "「食べた後で散歩します」означает:", optionsRu: ["Гуляю перед едой", "Гуляю после еды", "Ем на прогулке", "Не гуляю"], correctIndex: 1, explanationRu: "～後で = после того как." },
  { id: "ex5-g29", atSec: 0, kind: "listening_mcq", promptRu: "「日本にいた時、富士山を見ました」означает:", optionsRu: ["Хочу увидеть Фудзи", "Когда был в Японии, видел Фудзи", "Никогда не видел Фудзи", "Сейчас вижу Фудзи"], correctIndex: 1, explanationRu: "～時 = когда." },
  { id: "ex5-g30", atSec: 0, kind: "listening_mcq", promptRu: "「ニュースによると、明日は雪です」означает:", optionsRu: ["Я думаю, что снег", "По данным новостей, завтра снег", "Снега не будет", "Вчера был снег"], correctIndex: 1, explanationRu: "～によると = согласно, по данным." },
];

// ─── N5 Vocab (25) ────────────────────────────────────────────

export const EX_N5_VOCAB: ListeningMcqQuestion[] = [
  { id: "ex5-v01", atSec: 0, kind: "listening_mcq", promptRu: "「春」означает:", optionsRu: ["лето", "весна", "осень", "зима"], correctIndex: 1, explanationRu: "春（はる）= весна." },
  { id: "ex5-v02", atSec: 0, kind: "listening_mcq", promptRu: "「夏」означает:", optionsRu: ["весна", "осень", "зима", "лето"], correctIndex: 3, explanationRu: "夏（なつ）= лето." },
  { id: "ex5-v03", atSec: 0, kind: "listening_mcq", promptRu: "「秋」означает:", optionsRu: ["зима", "весна", "осень", "лето"], correctIndex: 2, explanationRu: "秋（あき）= осень." },
  { id: "ex5-v04", atSec: 0, kind: "listening_mcq", promptRu: "「冬」означает:", optionsRu: ["осень", "лето", "весна", "зима"], correctIndex: 3, explanationRu: "冬（ふゆ）= зима." },
  { id: "ex5-v05", atSec: 0, kind: "listening_mcq", promptRu: "「赤」означает какой цвет?", optionsRu: ["синий", "красный", "жёлтый", "зелёный"], correctIndex: 1, explanationRu: "赤（あか）= красный." },
  { id: "ex5-v06", atSec: 0, kind: "listening_mcq", promptRu: "「青」означает какой цвет?", optionsRu: ["красный", "белый", "синий/голубой", "чёрный"], correctIndex: 2, explanationRu: "青（あお）= синий/голубой." },
  { id: "ex5-v07", atSec: 0, kind: "listening_mcq", promptRu: "「黄色」означает какой цвет?", optionsRu: ["зелёный", "жёлтый", "белый", "красный"], correctIndex: 1, explanationRu: "黄色（きいろ）= жёлтый." },
  { id: "ex5-v08", atSec: 0, kind: "listening_mcq", promptRu: "「緑」означает какой цвет?", optionsRu: ["синий", "чёрный", "белый", "зелёный"], correctIndex: 3, explanationRu: "緑（みどり）= зелёный." },
  { id: "ex5-v09", atSec: 0, kind: "listening_mcq", promptRu: "「頭」означает какую часть тела?", optionsRu: ["рука", "нога", "голова", "глаз"], correctIndex: 2, explanationRu: "頭（あたま）= голова." },
  { id: "ex5-v10", atSec: 0, kind: "listening_mcq", promptRu: "「目」означает какую часть тела?", optionsRu: ["ухо", "глаз", "рот", "нос"], correctIndex: 1, explanationRu: "目（め）= глаз." },
  { id: "ex5-v11", atSec: 0, kind: "listening_mcq", promptRu: "「耳」означает какую часть тела?", optionsRu: ["ухо", "рот", "нос", "рука"], correctIndex: 0, explanationRu: "耳（みみ）= ухо." },
  { id: "ex5-v12", atSec: 0, kind: "listening_mcq", promptRu: "「口」означает какую часть тела?", optionsRu: ["нога", "глаз", "рот", "ухо"], correctIndex: 2, explanationRu: "口（くち）= рот." },
  { id: "ex5-v13", atSec: 0, kind: "listening_mcq", promptRu: "「父」означает:", optionsRu: ["мать", "отец", "старший брат", "младший брат"], correctIndex: 1, explanationRu: "父（ちち）= отец (скромная форма)." },
  { id: "ex5-v14", atSec: 0, kind: "listening_mcq", promptRu: "「母」означает:", optionsRu: ["отец", "старшая сестра", "мать", "младшая сестра"], correctIndex: 2, explanationRu: "母（はは）= мать (скромная форма)." },
  { id: "ex5-v15", atSec: 0, kind: "listening_mcq", promptRu: "「兄」означает:", optionsRu: ["младший брат", "старший брат", "старшая сестра", "отец"], correctIndex: 1, explanationRu: "兄（あに）= старший брат." },
  { id: "ex5-v16", atSec: 0, kind: "listening_mcq", promptRu: "「姉」означает:", optionsRu: ["мать", "младшая сестра", "старшая сестра", "старший брат"], correctIndex: 2, explanationRu: "姉（あね）= старшая сестра." },
  { id: "ex5-v17", atSec: 0, kind: "listening_mcq", promptRu: "「弟」означает:", optionsRu: ["старший брат", "младший брат", "отец", "младшая сестра"], correctIndex: 1, explanationRu: "弟（おとうと）= младший брат." },
  { id: "ex5-v18", atSec: 0, kind: "listening_mcq", promptRu: "「妹」означает:", optionsRu: ["старшая сестра", "мать", "младшая сестра", "старший брат"], correctIndex: 2, explanationRu: "妹（いもうと）= младшая сестра." },
  { id: "ex5-v19", atSec: 0, kind: "listening_mcq", promptRu: "「シャツ」означает:", optionsRu: ["брюки", "рубашка", "обувь", "шляпа"], correctIndex: 1, explanationRu: "シャツ = рубашка." },
  { id: "ex5-v20", atSec: 0, kind: "listening_mcq", promptRu: "「ズボン」означает:", optionsRu: ["рубашка", "юбка", "брюки", "обувь"], correctIndex: 2, explanationRu: "ズボン = брюки." },
  { id: "ex5-v21", atSec: 0, kind: "listening_mcq", promptRu: "「靴」означает:", optionsRu: ["перчатки", "шляпа", "рубашка", "обувь/ботинки"], correctIndex: 3, explanationRu: "靴（くつ）= обувь." },
  { id: "ex5-v22", atSec: 0, kind: "listening_mcq", promptRu: "「電車」означает:", optionsRu: ["автобус", "электричка/поезд", "самолёт", "велосипед"], correctIndex: 1, explanationRu: "電車（でんしゃ）= электричка/поезд." },
  { id: "ex5-v23", atSec: 0, kind: "listening_mcq", promptRu: "「飛行機」означает:", optionsRu: ["поезд", "автобус", "самолёт", "корабль"], correctIndex: 2, explanationRu: "飛行機（ひこうき）= самолёт." },
  { id: "ex5-v24", atSec: 0, kind: "listening_mcq", promptRu: "「教室」означает:", optionsRu: ["библиотека", "столовая", "класс/аудитория", "спортзал"], correctIndex: 2, explanationRu: "教室（きょうしつ）= класс/аудитория." },
  { id: "ex5-v25", atSec: 0, kind: "listening_mcq", promptRu: "「黒板」означает:", optionsRu: ["парта", "доска (школьная)", "стул", "окно"], correctIndex: 1, explanationRu: "黒板（こくばん）= школьная доска." },
];

// ─── N5 Kanji (30) ────────────────────────────────────────────

export const EX_N5_KANJI: KanjiTranslateQuestion[] = [
  { id: "ex5-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「車」.", kanji: "車", acceptedRu: ["машина", "автомобиль"] },
  { id: "ex5-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「魚」.", kanji: "魚", acceptedRu: ["рыба"] },
  { id: "ex5-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「新しい」.", kanji: "新しい", acceptedRu: ["новый"] },
  { id: "ex5-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「古い」.", kanji: "古い", acceptedRu: ["старый"] },
  { id: "ex5-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「長い」.", kanji: "長い", acceptedRu: ["длинный", "долгий"] },
  { id: "ex5-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「短い」.", kanji: "短い", acceptedRu: ["короткий"] },
  { id: "ex5-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「白い」.", kanji: "白い", acceptedRu: ["белый"] },
  { id: "ex5-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「黒い」.", kanji: "黒い", acceptedRu: ["чёрный", "черный"] },
  { id: "ex5-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「赤い」.", kanji: "赤い", acceptedRu: ["красный"] },
  { id: "ex5-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「青い」.", kanji: "青い", acceptedRu: ["синий", "голубой"] },
  { id: "ex5-k11", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「安い」.", kanji: "安い", acceptedRu: ["дешёвый", "дешевый", "недорогой"] },
  { id: "ex5-k12", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「重い」.", kanji: "重い", acceptedRu: ["тяжёлый", "тяжелый"] },
  { id: "ex5-k13", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「軽い」.", kanji: "軽い", acceptedRu: ["лёгкий", "легкий"] },
  { id: "ex5-k14", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「近い」.", kanji: "近い", acceptedRu: ["близкий", "ближний"] },
  { id: "ex5-k15", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「遠い」.", kanji: "遠い", acceptedRu: ["далёкий", "далекий"] },
  { id: "ex5-k16", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「早い」.", kanji: "早い", acceptedRu: ["ранний", "быстрый"] },
  { id: "ex5-k17", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「多い」.", kanji: "多い", acceptedRu: ["много", "многочисленный"] },
  { id: "ex5-k18", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「少ない」.", kanji: "少ない", acceptedRu: ["мало", "немногочисленный"] },
  { id: "ex5-k19", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「出る」.", kanji: "出る", acceptedRu: ["выходить", "выйти"] },
  { id: "ex5-k20", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「入る」.", kanji: "入る", acceptedRu: ["входить", "войти"] },
  { id: "ex5-k21", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「立つ」.", kanji: "立つ", acceptedRu: ["стоять", "встать"] },
  { id: "ex5-k22", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「上」.", kanji: "上", acceptedRu: ["верх", "наверху", "над"] },
  { id: "ex5-k23", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「下」.", kanji: "下", acceptedRu: ["низ", "внизу", "под"] },
  { id: "ex5-k24", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「右」.", kanji: "右", acceptedRu: ["правый", "право", "направо"] },
  { id: "ex5-k25", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「左」.", kanji: "左", acceptedRu: ["левый", "лево", "налево"] },
  { id: "ex5-k26", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「中」.", kanji: "中", acceptedRu: ["середина", "внутри", "средний"] },
  { id: "ex5-k27", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「外」.", kanji: "外", acceptedRu: ["снаружи", "за пределами", "вне"] },
  { id: "ex5-k28", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「前」.", kanji: "前", acceptedRu: ["перед", "впереди", "до"] },
  { id: "ex5-k29", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「後ろ」.", kanji: "後ろ", acceptedRu: ["сзади", "позади", "зад"] },
  { id: "ex5-k30", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「春」.", kanji: "春", acceptedRu: ["весна"] },
];

// ─── N5 Word Order (20) ───────────────────────────────────────

export const EX_N5_WORD_ORDER: WordOrderQuestion[] = [
  { id: "ex5-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Этот торт выглядит вкусным.»", words: ["おいしそうです", "ケーキは", "この"], correctOrder: [2, 1, 0] },
  { id: "ex5-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Перед сном чищу зубы.»", words: ["磨きます", "を", "歯", "前に", "寝る"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я хочу поехать в Японию.»", words: ["行きたいです", "に", "日本", "私は"], correctOrder: [3, 2, 1, 0] },
  { id: "ex5-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Поезд быстрее автобуса.»", words: ["速いです", "より", "バス", "は", "電車"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «Работаю с 9 до 5.»", words: ["働きます", "まで", "五時", "から", "九時"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Давайте вместе пойдём!»", words: ["行きましょう", "一緒に"], correctOrder: [1, 0] },
  { id: "ex5-w07", atSec: 0, kind: "word_order", promptRu: "Соберите: «У меня 3 карандаша.»", words: ["あります", "が", "三本", "えんぴつ", "私には"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w08", atSec: 0, kind: "word_order", promptRu: "Соберите: «Сейчас читаю книгу.»", words: ["読んでいます", "を", "本", "今"], correctOrder: [3, 2, 1, 0] },
  { id: "ex5-w09", atSec: 0, kind: "word_order", promptRu: "Соберите: «Помыл руки, потом поел.»", words: ["食べました", "てから", "洗っ", "を", "手"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w10", atSec: 0, kind: "word_order", promptRu: "Соберите: «Пожалуйста, не курите здесь.»", words: ["ください", "ないで", "吸わ", "で", "ここ"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w11", atSec: 0, kind: "word_order", promptRu: "Соберите: «Думаю, завтра будет дождь.»", words: ["と思います", "雨だ", "明日は"], correctOrder: [2, 1, 0] },
  { id: "ex5-w12", atSec: 0, kind: "word_order", promptRu: "Соберите: «Возможно, он придёт.»", words: ["かもしれません", "来る", "彼は"], correctOrder: [2, 1, 0] },
  { id: "ex5-w13", atSec: 0, kind: "word_order", promptRu: "Соберите: «Может, мне открыть окно?»", words: ["ましょうか", "開け", "を", "窓"], correctOrder: [3, 2, 1, 0] },
  { id: "ex5-w14", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я съел слишком много.»", words: ["しまいました", "食べすぎて"], correctOrder: [1, 0] },
  { id: "ex5-w15", atSec: 0, kind: "word_order", promptRu: "Соберите: «Лучше выпить лекарство.»", words: ["ほうがいいです", "飲んだ", "を", "薬"], correctOrder: [3, 2, 1, 0] },
  { id: "ex5-w16", atSec: 0, kind: "word_order", promptRu: "Соберите: «Умею говорить по-японски.»", words: ["できます", "ことが", "話す", "を", "日本語"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex5-w17", atSec: 0, kind: "word_order", promptRu: "Соберите: «Он должен прийти сегодня.»", words: ["はずです", "来る", "今日", "彼は"], correctOrder: [3, 2, 1, 0] },
  { id: "ex5-w18", atSec: 0, kind: "word_order", promptRu: "Соберите: «Гуляю после еды.»", words: ["散歩します", "後で", "食べた"], correctOrder: [2, 1, 0] },
  { id: "ex5-w19", atSec: 0, kind: "word_order", promptRu: "Соберите: «Можно не идти.»", words: ["いいです", "も", "行かなくて"], correctOrder: [2, 1, 0] },
  { id: "ex5-w20", atSec: 0, kind: "word_order", promptRu: "Соберите: «По новостям, завтра снег.»", words: ["雪です", "明日は", "によると", "ニュース"], correctOrder: [3, 2, 1, 0] },
];

// ─── N5 Fill (20) ─────────────────────────────────────────────

export const EX_N5_FILL: FillBlankQuestion[] = [
  { id: "ex5-f01", atSec: 0, kind: "fill_blank", promptRu: "Впишите て-форму: 書く →", sentenceJa: "名前を___ください。", blankIndex: 0, acceptedAnswers: ["書いて"], explanationRu: "く → いて (書く → 書いて)." },
  { id: "ex5-f02", atSec: 0, kind: "fill_blank", promptRu: "Впишите те-форму: 待つ →", sentenceJa: "ちょっと___ください。", blankIndex: 0, acceptedAnswers: ["待って"], explanationRu: "つ → って (待つ → 待って)." },
  { id: "ex5-f03", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Давайте пойдём вместе.» 一緒に行き___", sentenceJa: "一緒に行き___。", blankIndex: 0, acceptedAnswers: ["ましょう"], explanationRu: "～ましょう = давайте." },
  { id: "ex5-f04", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: «С 8 утра ___5 вечера.» 朝八時___", sentenceJa: "朝八時___夕方五時まで。", blankIndex: 0, acceptedAnswers: ["から"], explanationRu: "から = от/с." },
  { id: "ex5-f05", atSec: 0, kind: "fill_blank", promptRu: "Впишите счётчик: 3 книги → 三___", sentenceJa: "本が三___あります。", blankIndex: 0, acceptedAnswers: ["冊", "さつ"], explanationRu: "冊（さつ）— счётчик для книг." },
  { id: "ex5-f06", atSec: 0, kind: "fill_blank", promptRu: "Впишите счётчик: 2 кошки → 二___", sentenceJa: "猫が二___います。", blankIndex: 0, acceptedAnswers: ["匹", "ひき"], explanationRu: "匹（ひき）— счётчик для мелких животных." },
  { id: "ex5-f07", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Сейчас смотрю телевизор.» テレビを見て___。", sentenceJa: "今、テレビを見て___。", blankIndex: 0, acceptedAnswers: ["います", "いる"], explanationRu: "～ている = длящееся действие." },
  { id: "ex5-f08", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Поем, потом пойду.» 食べ___行きます。", sentenceJa: "食べ___行きます。", blankIndex: 0, acceptedAnswers: ["てから"], explanationRu: "～てから = после того как." },
  { id: "ex5-f09", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Хочу пить воду.» 水が飲み___です。", sentenceJa: "水が飲み___です。", blankIndex: 0, acceptedAnswers: ["たい"], explanationRu: "～たい = хотеть." },
  { id: "ex5-f10", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Съел слишком много.» 食べ___ました。", sentenceJa: "食べ___ました。", blankIndex: 0, acceptedAnswers: ["すぎ"], explanationRu: "～すぎる = чрезмерно." },
  { id: "ex5-f11", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Лучше отдохнуть.» 休んだ___がいいです。", sentenceJa: "休んだ___がいいです。", blankIndex: 0, acceptedAnswers: ["ほう"], explanationRu: "～ほうがいい = лучше бы." },
  { id: "ex5-f12", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Не входите, пожалуйста.» 入ら___ください。", sentenceJa: "入ら___ください。", blankIndex: 0, acceptedAnswers: ["ないで"], explanationRu: "～ないでください = не делайте." },
  { id: "ex5-f13", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Можно не идти.» 行かなくて___いいです。", sentenceJa: "行かなくて___いいです。", blankIndex: 0, acceptedAnswers: ["も"], explanationRu: "～なくてもいい = можно не делать." },
  { id: "ex5-f14", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Выглядит дорогим.» 高___です。", sentenceJa: "高___です。", blankIndex: 0, acceptedAnswers: ["そう"], explanationRu: "～そう = выглядит так." },
  { id: "ex5-f15", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Могу плавать.» 泳ぐ___ができます。", sentenceJa: "泳ぐ___ができます。", blankIndex: 0, acceptedAnswers: ["こと"], explanationRu: "～ことができる = уметь/мочь." },
  { id: "ex5-f16", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Перед сном.» 寝る___に。", sentenceJa: "寝る___に歯を磨きます。", blankIndex: 0, acceptedAnswers: ["前"], explanationRu: "～前に = перед." },
  { id: "ex5-f17", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «После еды.» 食べた___で。", sentenceJa: "食べた___で散歩します。", blankIndex: 0, acceptedAnswers: ["後", "あと"], explanationRu: "～後で = после." },
  { id: "ex5-f18", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Думаю, что завтра ясно.» 晴れる___思います。", sentenceJa: "明日は晴れる___思います。", blankIndex: 0, acceptedAnswers: ["と"], explanationRu: "～と思います = думаю, что." },
  { id: "ex5-f19", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Может быть, пойдёт дождь.» 雨が降る___しれません。", sentenceJa: "雨が降る___しれません。", blankIndex: 0, acceptedAnswers: ["かも"], explanationRu: "～かもしれません = может быть." },
  { id: "ex5-f20", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Согласно прогнозу.» 予報___よると。", sentenceJa: "予報___よると、明日は雨です。", blankIndex: 0, acceptedAnswers: ["に"], explanationRu: "～によると = согласно." },
];

// ─── N5 Numbers (15) ──────────────────────────────────────────

export const EX_N5_NUMBERS: NumberAudioQuestion[] = [
  { id: "ex5-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "いちがつついたち", acceptedAnswers: ["1月1日", "01.01", "1.1"], explanationRu: "一月一日 = 1 января." },
  { id: "ex5-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "さんがつみっか", acceptedAnswers: ["3月3日", "03.03", "3.3"], explanationRu: "三月三日 = 3 марта." },
  { id: "ex5-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "ごがついつか", acceptedAnswers: ["5月5日", "05.05", "5.5"], explanationRu: "五月五日 = 5 мая." },
  { id: "ex5-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "しちがつなのか", acceptedAnswers: ["7月7日", "07.07", "7.7"], explanationRu: "七月七日 = 7 июля." },
  { id: "ex5-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "じゅうにがつにじゅうよっか", acceptedAnswers: ["12月24日", "12.24", "24.12"], explanationRu: "十二月二十四日 = 24 декабря." },
  { id: "ex5-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт и запишите: сколько карандашей?", audioText: "えんぴつがさんぼん", acceptedAnswers: ["3本", "3"], explanationRu: "三本 = 3 штуки (длинных предмета)." },
  { id: "ex5-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт и запишите: сколько кошек?", audioText: "ねこがにひき", acceptedAnswers: ["2匹", "2"], explanationRu: "二匹 = 2 (мелких животных)." },
  { id: "ex5-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт и запишите: сколько машин?", audioText: "くるまがよんだい", acceptedAnswers: ["4台", "4"], explanationRu: "四台 = 4 (техники)." },
  { id: "ex5-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт и запишите: сколько книг?", audioText: "ほんがごさつ", acceptedAnswers: ["5冊", "5"], explanationRu: "五冊 = 5 книг." },
  { id: "ex5-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "くがつよっか", acceptedAnswers: ["9月4日", "09.04", "9.4"], explanationRu: "九月四日 = 4 сентября." },
  { id: "ex5-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "はちがつじゅうごにち", acceptedAnswers: ["8月15日", "08.15", "8.15"], explanationRu: "八月十五日 = 15 августа." },
  { id: "ex5-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт: сколько бутылок?", audioText: "ペットボトルがろっぽん", acceptedAnswers: ["6本", "6"], explanationRu: "六本 = 6 штук (длинных/цилиндрических)." },
  { id: "ex5-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт: сколько собак?", audioText: "いぬがさんびき", acceptedAnswers: ["3匹", "3"], explanationRu: "三匹 = 3 (мелких животных), び → び for さん." },
  { id: "ex5-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "じゅういちがつにじゅうさんにち", acceptedAnswers: ["11月23日", "11.23", "23.11"], explanationRu: "十一月二十三日 = 23 ноября." },
  { id: "ex5-n15", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт: сколько тетрадей?", audioText: "ノートがはっさつ", acceptedAnswers: ["8冊", "8"], explanationRu: "八冊 = 8 тетрадей/книг." },
];

// ─── N5 Dialogues (20) ────────────────────────────────────────

export const EX_N5_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "ex5-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что покупает клиент?",
    dialogueLines: [
      { speaker: "店員", ja: "いらっしゃいませ。何がよろしいですか。" },
      { speaker: "客", ja: "このシャツをください。" },
    ],
    optionsRu: ["Брюки", "Рубашку", "Шляпу", "Обувь"],
    correctIndex: 1,
    explanationRu: "シャツ = рубашка.",
  },
  {
    id: "ex5-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Сколько стоит рубашка?",
    dialogueLines: [
      { speaker: "客", ja: "このシャツはいくらですか。" },
      { speaker: "店員", ja: "二千円です。" },
    ],
    optionsRu: ["1000 иен", "2000 иен", "3000 иен", "5000 иен"],
    correctIndex: 1,
    explanationRu: "二千円 = 2000 иен.",
  },
  {
    id: "ex5-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какой предмет сейчас у школьника?",
    dialogueLines: [
      { speaker: "先生", ja: "今は何の授業ですか。" },
      { speaker: "学生", ja: "今は数学です。" },
    ],
    optionsRu: ["Японский язык", "Математика", "Физкультура", "Английский"],
    correctIndex: 1,
    explanationRu: "数学 = математика.",
  },
  {
    id: "ex5-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что заказал клиент в ресторане?",
    dialogueLines: [
      { speaker: "店員", ja: "ご注文はお決まりですか。" },
      { speaker: "客", ja: "ラーメンと餃子をお願いします。" },
    ],
    optionsRu: ["Суши и темпуру", "Рамен и гёдза", "Рис и мисо-суп", "Карри и салат"],
    correctIndex: 1,
    explanationRu: "ラーメンと餃子 = рамен и гёдза.",
  },
  {
    id: "ex5-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что болит у пациента?",
    dialogueLines: [
      { speaker: "医者", ja: "どうしましたか。" },
      { speaker: "患者", ja: "頭が痛いです。" },
    ],
    optionsRu: ["Живот", "Голова", "Горло", "Нога"],
    correctIndex: 1,
    explanationRu: "頭が痛い = голова болит.",
  },
  {
    id: "ex5-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какое сейчас время года?",
    dialogueLines: [
      { speaker: "A", ja: "今、何の季節ですか。" },
      { speaker: "B", ja: "今は春です。桜がきれいですよ。" },
    ],
    optionsRu: ["Лето", "Осень", "Зима", "Весна"],
    correctIndex: 3,
    explanationRu: "春 = весна, 桜 = сакура.",
  },
  {
    id: "ex5-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Как отец добирается на работу?",
    dialogueLines: [
      { speaker: "子供", ja: "お父さんはどうやって会社に行きますか。" },
      { speaker: "母", ja: "お父さんは電車で行きますよ。" },
    ],
    optionsRu: ["На машине", "Пешком", "На поезде", "На автобусе"],
    correctIndex: 2,
    explanationRu: "電車で = на поезде.",
  },
  {
    id: "ex5-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что мама просит ребёнка сделать?",
    dialogueLines: [
      { speaker: "母", ja: "手を洗ってからご飯を食べてね。" },
      { speaker: "子供", ja: "はーい。" },
    ],
    optionsRu: ["Убрать комнату", "Помыть руки перед едой", "Сделать домашнее задание", "Пойти в ванную"],
    correctIndex: 1,
    explanationRu: "手を洗ってから = после того как помоешь руки.",
  },
  {
    id: "ex5-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что хочет купить клиент?",
    dialogueLines: [
      { speaker: "客", ja: "すみません、黒い靴はありますか。" },
      { speaker: "店員", ja: "はい、こちらにございます。" },
    ],
    optionsRu: ["Белые кроссовки", "Чёрные ботинки", "Красные сандалии", "Синие туфли"],
    correctIndex: 1,
    explanationRu: "黒い靴 = чёрная обувь/ботинки.",
  },
  {
    id: "ex5-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Кто младшая сестра?",
    dialogueLines: [
      { speaker: "A", ja: "あの女の子はだれですか。" },
      { speaker: "B", ja: "私の妹です。今、中学生です。" },
    ],
    optionsRu: ["Дочь", "Младшая сестра", "Старшая сестра", "Подруга"],
    correctIndex: 1,
    explanationRu: "妹 = младшая сестра.",
  },
  {
    id: "ex5-d11", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какого цвета сумка?",
    dialogueLines: [
      { speaker: "A", ja: "そのかばんは何色ですか。" },
      { speaker: "B", ja: "赤いかばんです。" },
    ],
    optionsRu: ["Синяя", "Белая", "Красная", "Зелёная"],
    correctIndex: 2,
    explanationRu: "赤い = красный.",
  },
  {
    id: "ex5-d12", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что хочет есть ребёнок?",
    dialogueLines: [
      { speaker: "母", ja: "晩ご飯は何がいい？" },
      { speaker: "子供", ja: "カレーが食べたい！" },
    ],
    optionsRu: ["Рамен", "Суши", "Карри", "Рис"],
    correctIndex: 2,
    explanationRu: "カレーが食べたい = хочу карри.",
  },
  {
    id: "ex5-d13", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Куда едет семья летом?",
    dialogueLines: [
      { speaker: "A", ja: "夏休みはどこへ行きますか。" },
      { speaker: "B", ja: "家族で海に行きます。" },
    ],
    optionsRu: ["В горы", "На море", "В Токио", "Никуда"],
    correctIndex: 1,
    explanationRu: "海 = море.",
  },
  {
    id: "ex5-d14", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. На чём ученик ездит в школу?",
    dialogueLines: [
      { speaker: "先生", ja: "学校にはどうやって来ますか。" },
      { speaker: "学生", ja: "自転車で来ます。" },
    ],
    optionsRu: ["Пешком", "На автобусе", "На велосипеде", "На машине"],
    correctIndex: 2,
    explanationRu: "自転車 = велосипед.",
  },
  {
    id: "ex5-d15", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Какую температуру измерили?",
    dialogueLines: [
      { speaker: "看護師", ja: "熱を測りましょう。" },
      { speaker: "患者", ja: "三十八度です。" },
    ],
    optionsRu: ["36 градусов", "37 градусов", "38 градусов", "39 градусов"],
    correctIndex: 2,
    explanationRu: "三十八度 = 38 градусов.",
  },
  {
    id: "ex5-d16", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что стоит на доске?",
    dialogueLines: [
      { speaker: "学生", ja: "先生、黒板に何が書いてありますか。" },
      { speaker: "先生", ja: "今日の漢字テストの範囲です。" },
    ],
    optionsRu: ["Расписание уроков", "Объём теста по кандзи", "Домашнее задание", "Объявление"],
    correctIndex: 1,
    explanationRu: "漢字テストの範囲 = объём теста по кандзи.",
  },
  {
    id: "ex5-d17", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что брат делает сейчас?",
    dialogueLines: [
      { speaker: "A", ja: "弟は今何をしていますか。" },
      { speaker: "B", ja: "弟は部屋でゲームをしています。" },
    ],
    optionsRu: ["Читает", "Спит", "Играет в игру", "Учится"],
    correctIndex: 2,
    explanationRu: "ゲームをしています = играет в игру.",
  },
  {
    id: "ex5-d18", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Сколько зонтов покупает клиент?",
    dialogueLines: [
      { speaker: "客", ja: "かさを二本ください。" },
      { speaker: "店員", ja: "はい、二本ですね。千円です。" },
    ],
    optionsRu: ["1", "2", "3", "4"],
    correctIndex: 1,
    explanationRu: "二本 = 2 штуки (длинных предмета).",
  },
  {
    id: "ex5-d19", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Куда нужно свернуть?",
    dialogueLines: [
      { speaker: "A", ja: "すみません、駅はどこですか。" },
      { speaker: "B", ja: "まっすぐ行って、右に曲がってください。" },
    ],
    optionsRu: ["Налево", "Направо", "Прямо", "Назад"],
    correctIndex: 1,
    explanationRu: "右に曲がって = поверните направо.",
  },
  {
    id: "ex5-d20", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Где стоит стул?",
    dialogueLines: [
      { speaker: "A", ja: "椅子はどこにありますか。" },
      { speaker: "B", ja: "机の前にあります。" },
    ],
    optionsRu: ["За столом", "Перед столом", "На столе", "Под столом"],
    correctIndex: 1,
    explanationRu: "机の前 = перед столом.",
  },
];

// ═══════════════════════════════════════════════════════════════
//  N4 — ДОПОЛНИТЕЛЬНЫЕ УПРАЖНЕНИЯ
// ═══════════════════════════════════════════════════════════════

// ─── N4 Grammar (25) ──────────────────────────────────────────

export const EX_N4_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "ex4-g01", atSec: 0, kind: "listening_mcq", promptRu: "「母に野菜を食べさせられました」означает:", optionsRu: ["Я заставил маму есть овощи", "Мама заставила меня есть овощи", "Я ел овощи сам", "Мама не ела овощи"], correctIndex: 1, explanationRu: "～させられる — побудительно-страдательный залог." },
  { id: "ex4-g02", atSec: 0, kind: "listening_mcq", promptRu: "「先生が学生に本を読ませました」означает:", optionsRu: ["Учитель прочитал книгу", "Учитель заставил студента читать книгу", "Студент прочитал книгу учителю", "Студент заставил учителя"], correctIndex: 1, explanationRu: "～させる — побудительный залог (каузатив)." },
  { id: "ex4-g03", atSec: 0, kind: "listening_mcq", promptRu: "「弟にケーキを食べられました」означает:", optionsRu: ["Я дал брату торт", "Брат съел мой торт (мне в ущерб)", "Я ел торт с братом", "Брат не ел торт"], correctIndex: 1, explanationRu: "Страдательный залог с оттенком ущерба (迷惑の受身)." },
  { id: "ex4-g04", atSec: 0, kind: "listening_mcq", promptRu: "「雨に降られました」означает:", optionsRu: ["Дождь шёл", "Я попал под дождь (мне в ущерб)", "Дождь закончился", "Я люблю дождь"], correctIndex: 1, explanationRu: "Пассив неудобства: 降られる." },
  { id: "ex4-g05", atSec: 0, kind: "listening_mcq", promptRu: "「安ければ買います」означает:", optionsRu: ["Куплю, потому что дёшево", "Если будет дёшево, куплю", "Не куплю", "Было дёшево, купил"], correctIndex: 1, explanationRu: "～ば — условие (い-прилагательное: い→ければ)." },
  { id: "ex4-g06", atSec: 0, kind: "listening_mcq", promptRu: "「暇だったら遊びに来てください」означает:", optionsRu: ["Вы заняты, не приходите", "Если будете свободны, приходите в гости", "Вы заняты, поэтому пришли", "Не приходите"], correctIndex: 1, explanationRu: "～たら — условие «если»." },
  { id: "ex4-g07", atSec: 0, kind: "listening_mcq", promptRu: "「ボタンを押すと、ドアが開きます」означает:", optionsRu: ["Если нажать кнопку, дверь откроется", "Дверь закрыта", "Кнопка сломана", "Нажмите дверь"], correctIndex: 0, explanationRu: "～と — условие естественного следствия." },
  { id: "ex4-g08", atSec: 0, kind: "listening_mcq", promptRu: "「あなたなら、できると思います」означает:", optionsRu: ["Ты не сможешь", "Если это ты, думаю, сможешь", "Я смогу", "Никто не сможет"], correctIndex: 1, explanationRu: "～なら — условие «если речь идёт о тебе»." },
  { id: "ex4-g09", atSec: 0, kind: "listening_mcq", promptRu: "「来年、日本に行こうと思っています」означает:", optionsRu: ["Я был в Японии", "Думаю поехать в Японию в следующем году", "Не поеду в Японию", "Был в Японии в прошлом году"], correctIndex: 1, explanationRu: "волитив + と思っている = собираюсь." },
  { id: "ex4-g10", atSec: 0, kind: "listening_mcq", promptRu: "「財布を忘れてしまいました」означает:", optionsRu: ["Нашёл кошелёк", "К сожалению, забыл кошелёк", "Купил кошелёк", "Отдал кошелёк"], correctIndex: 1, explanationRu: "～てしまう — завершение с оттенком сожаления." },
  { id: "ex4-g11", atSec: 0, kind: "listening_mcq", promptRu: "「子供たちが走っていく」означает:", optionsRu: ["Дети бежали сюда", "Дети убегают (от говорящего)", "Дети стояли", "Дети сидели"], correctIndex: 1, explanationRu: "～ていく — действие, удаляющееся от говорящего." },
  { id: "ex4-g12", atSec: 0, kind: "listening_mcq", promptRu: "「雨が降ってきました」означает:", optionsRu: ["Дождь закончился", "Начался дождь (приближается к говорящему)", "Дождь шёл давно", "Дождя не было"], correctIndex: 1, explanationRu: "～てくる — начало изменения, приближение." },
  { id: "ex4-g13", atSec: 0, kind: "listening_mcq", promptRu: "「野菜を食べるようにしています」означает:", optionsRu: ["Не ем овощи", "Стараюсь есть овощи", "Перестал есть овощи", "Люблю овощи"], correctIndex: 1, explanationRu: "～ようにする = стараться делать." },
  { id: "ex4-g14", atSec: 0, kind: "listening_mcq", promptRu: "「日本語が話せるようになりました」означает:", optionsRu: ["Всегда умел говорить", "Стал уметь говорить по-японски", "Разучился говорить", "Хочу научиться"], correctIndex: 1, explanationRu: "～ようになる = стало так, что (изменение способности)." },
  { id: "ex4-g15", atSec: 0, kind: "listening_mcq", promptRu: "「来年、留学することにしました」означает:", optionsRu: ["Не поеду учиться", "Решил поехать учиться за рубеж", "Думаю, может быть поеду", "Учился за рубежом раньше"], correctIndex: 1, explanationRu: "～ことにする = решить (самостоятельно)." },
  { id: "ex4-g16", atSec: 0, kind: "listening_mcq", promptRu: "「試合が中止になりました」означает:", optionsRu: ["Матч начался", "Матч отменили", "Матч перенесли", "Матч выиграли"], correctIndex: 1, explanationRu: "～ことになる / ～になる = стало так, что (внешнее решение)." },
  { id: "ex4-g17", atSec: 0, kind: "listening_mcq", promptRu: "「先生の話によると、テストは来週だそうです」означает:", optionsRu: ["Тест сегодня", "По словам учителя, тест на следующей неделе", "Тест отменён", "Учитель не знает"], correctIndex: 1, explanationRu: "～そうだ (伝聞) = говорят, что." },
  { id: "ex4-g18", atSec: 0, kind: "listening_mcq", promptRu: "「あの人は日本人らしいです」означает:", optionsRu: ["Он точно японец", "Похоже, он японец", "Он не японец", "Он хочет быть японцем"], correctIndex: 1, explanationRu: "～らしい = по-видимому, похоже." },
  { id: "ex4-g19", atSec: 0, kind: "listening_mcq", promptRu: "「食べたばかりです」означает:", optionsRu: ["Давно ел", "Только что поел", "Ещё не ел", "Хочу есть"], correctIndex: 1, explanationRu: "～ばかり = только что." },
  { id: "ex4-g20", atSec: 0, kind: "listening_mcq", promptRu: "「今、出かけるところです」означает:", optionsRu: ["Только что вернулся", "Как раз собираюсь выйти", "Уже ушёл", "Не выйду"], correctIndex: 1, explanationRu: "～ところ = в момент/на грани (действия)." },
  { id: "ex4-g21", atSec: 0, kind: "listening_mcq", promptRu: "「子供を早く寝させます」означает:", optionsRu: ["Ребёнок не спит", "Укладываю ребёнка спать рано", "Ребёнок заставляет меня спать", "Ребёнок встаёт рано"], correctIndex: 1, explanationRu: "～させる — каузатив: заставлять/позволять." },
  { id: "ex4-g22", atSec: 0, kind: "listening_mcq", promptRu: "「友達に名前を呼ばれました」означает:", optionsRu: ["Я позвал друга", "Друг позвал меня по имени", "Я забыл имя друга", "Друг забыл моё имя"], correctIndex: 1, explanationRu: "～られる — пассив (呼ぶ → 呼ばれる)." },
  { id: "ex4-g23", atSec: 0, kind: "listening_mcq", promptRu: "「暑ければ窓を開けてください」— какое условие использовано?", optionsRu: ["～たら", "～と", "～ば", "～なら"], correctIndex: 2, explanationRu: "～ば — условная форма." },
  { id: "ex4-g24", atSec: 0, kind: "listening_mcq", promptRu: "「全部食べてしまった」означает:", optionsRu: ["Не доел", "Съел всё (до конца)", "Начал есть", "Не стал есть"], correctIndex: 1, explanationRu: "～てしまう — полное завершение." },
  { id: "ex4-g25", atSec: 0, kind: "listening_mcq", promptRu: "「天気がだんだん寒くなってきました」означает:", optionsRu: ["Стало жарко", "Постепенно стало холодать", "Всегда холодно", "Скоро станет жарко"], correctIndex: 1, explanationRu: "～てくる — постепенное изменение до настоящего момента." },
];

// ─── N4 Vocab (20) ────────────────────────────────────────────

export const EX_N4_VOCAB: ListeningMcqQuestion[] = [
  { id: "ex4-v01", atSec: 0, kind: "listening_mcq", promptRu: "「文化」означает:", optionsRu: ["природа", "культура", "наука", "история"], correctIndex: 1, explanationRu: "文化（ぶんか）= культура." },
  { id: "ex4-v02", atSec: 0, kind: "listening_mcq", promptRu: "「社会」означает:", optionsRu: ["компания", "общество", "правительство", "семья"], correctIndex: 1, explanationRu: "社会（しゃかい）= общество." },
  { id: "ex4-v03", atSec: 0, kind: "listening_mcq", promptRu: "「交通」означает:", optionsRu: ["общение", "торговля", "транспорт/движение", "связь"], correctIndex: 2, explanationRu: "交通（こうつう）= транспорт, движение." },
  { id: "ex4-v04", atSec: 0, kind: "listening_mcq", promptRu: "「生活」означает:", optionsRu: ["жизнь/быт", "работа", "учёба", "отдых"], correctIndex: 0, explanationRu: "生活（せいかつ）= жизнь, быт." },
  { id: "ex4-v05", atSec: 0, kind: "listening_mcq", promptRu: "「安全」означает:", optionsRu: ["опасность", "безопасность", "правило", "осторожность"], correctIndex: 1, explanationRu: "安全（あんぜん）= безопасность." },
  { id: "ex4-v06", atSec: 0, kind: "listening_mcq", promptRu: "「危険」означает:", optionsRu: ["безопасность", "осторожность", "опасность", "запрет"], correctIndex: 2, explanationRu: "危険（きけん）= опасность." },
  { id: "ex4-v07", atSec: 0, kind: "listening_mcq", promptRu: "「景色」означает:", optionsRu: ["вид/пейзаж", "здание", "фотография", "карта"], correctIndex: 0, explanationRu: "景色（けしき）= вид, пейзаж." },
  { id: "ex4-v08", atSec: 0, kind: "listening_mcq", promptRu: "「連絡」означает:", optionsRu: ["прощание", "встреча", "контакт/связь", "отмена"], correctIndex: 2, explanationRu: "連絡（れんらく）= связь, контакт." },
  { id: "ex4-v09", atSec: 0, kind: "listening_mcq", promptRu: "「相談」означает:", optionsRu: ["жалоба", "консультация/совет", "ссора", "сплетня"], correctIndex: 1, explanationRu: "相談（そうだん）= консультация, совет." },
  { id: "ex4-v10", atSec: 0, kind: "listening_mcq", promptRu: "「出発」означает:", optionsRu: ["прибытие", "отправление", "остановка", "пересадка"], correctIndex: 1, explanationRu: "出発（しゅっぱつ）= отправление." },
  { id: "ex4-v11", atSec: 0, kind: "listening_mcq", promptRu: "「到着」означает:", optionsRu: ["отправление", "прибытие", "опоздание", "отмена"], correctIndex: 1, explanationRu: "到着（とうちゃく）= прибытие." },
  { id: "ex4-v12", atSec: 0, kind: "listening_mcq", promptRu: "「普通」означает:", optionsRu: ["особенный", "обычный", "странный", "быстрый"], correctIndex: 1, explanationRu: "普通（ふつう）= обычный." },
  { id: "ex4-v13", atSec: 0, kind: "listening_mcq", promptRu: "「特別」означает:", optionsRu: ["обычный", "особенный/специальный", "простой", "нормальный"], correctIndex: 1, explanationRu: "特別（とくべつ）= особенный, специальный." },
  { id: "ex4-v14", atSec: 0, kind: "listening_mcq", promptRu: "「理由」означает:", optionsRu: ["цель", "причина", "результат", "условие"], correctIndex: 1, explanationRu: "理由（りゆう）= причина." },
  { id: "ex4-v15", atSec: 0, kind: "listening_mcq", promptRu: "「用意」означает:", optionsRu: ["уборка", "подготовка", "покупка", "объяснение"], correctIndex: 1, explanationRu: "用意（ようい）= подготовка." },
  { id: "ex4-v16", atSec: 0, kind: "listening_mcq", promptRu: "「注意」означает:", optionsRu: ["внимание/осторожность", "правило", "разрешение", "запрет"], correctIndex: 0, explanationRu: "注意（ちゅうい）= внимание, осторожность." },
  { id: "ex4-v17", atSec: 0, kind: "listening_mcq", promptRu: "「失敗」означает:", optionsRu: ["успех", "неудача", "попытка", "практика"], correctIndex: 1, explanationRu: "失敗（しっぱい）= неудача, провал." },
  { id: "ex4-v18", atSec: 0, kind: "listening_mcq", promptRu: "「成功」означает:", optionsRu: ["провал", "практика", "успех", "мечта"], correctIndex: 2, explanationRu: "成功（せいこう）= успех." },
  { id: "ex4-v19", atSec: 0, kind: "listening_mcq", promptRu: "「紹介」означает:", optionsRu: ["приветствие", "представление/знакомство", "прощание", "извинение"], correctIndex: 1, explanationRu: "紹介（しょうかい）= представление, знакомство." },
  { id: "ex4-v20", atSec: 0, kind: "listening_mcq", promptRu: "「卒業」означает:", optionsRu: ["поступление", "окончание (учебы)", "перевод", "каникулы"], correctIndex: 1, explanationRu: "卒業（そつぎょう）= окончание учёбы." },
];

// ─── N4 Kanji (20) ────────────────────────────────────────────

export const EX_N4_KANJI: KanjiTranslateQuestion[] = [
  { id: "ex4-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「教育」.", kanji: "教育", acceptedRu: ["образование", "воспитание"] },
  { id: "ex4-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「政治」.", kanji: "政治", acceptedRu: ["политика"] },
  { id: "ex4-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「経済」.", kanji: "経済", acceptedRu: ["экономика"] },
  { id: "ex4-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「研究」.", kanji: "研究", acceptedRu: ["исследование", "изучение"] },
  { id: "ex4-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「会議」.", kanji: "会議", acceptedRu: ["собрание", "совещание", "конференция"] },
  { id: "ex4-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「事故」.", kanji: "事故", acceptedRu: ["авария", "несчастный случай", "происшествие"] },
  { id: "ex4-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「引っ越し」.", kanji: "引っ越し", acceptedRu: ["переезд"] },
  { id: "ex4-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「受付」.", kanji: "受付", acceptedRu: ["регистратура", "приёмная", "ресепшн"] },
  { id: "ex4-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「習慣」.", kanji: "習慣", acceptedRu: ["привычка", "обычай"] },
  { id: "ex4-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「歴史」.", kanji: "歴史", acceptedRu: ["история"] },
  { id: "ex4-k11", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「建物」.", kanji: "建物", acceptedRu: ["здание", "строение"] },
  { id: "ex4-k12", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「届ける」.", kanji: "届ける", acceptedRu: ["доставить", "доставлять", "подать"] },
  { id: "ex4-k13", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「届く」.", kanji: "届く", acceptedRu: ["дойти", "прийти", "доставлено"] },
  { id: "ex4-k14", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「集める」.", kanji: "集める", acceptedRu: ["собирать"] },
  { id: "ex4-k15", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「決める」.", kanji: "決める", acceptedRu: ["решить", "решать", "определить"] },
  { id: "ex4-k16", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「伝える」.", kanji: "伝える", acceptedRu: ["передать", "сообщить"] },
  { id: "ex4-k17", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「育てる」.", kanji: "育てる", acceptedRu: ["растить", "воспитывать", "выращивать"] },
  { id: "ex4-k18", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「増える」.", kanji: "増える", acceptedRu: ["увеличиваться", "расти", "прибавляться"] },
  { id: "ex4-k19", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「減る」.", kanji: "減る", acceptedRu: ["уменьшаться", "убывать", "сокращаться"] },
  { id: "ex4-k20", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「比べる」.", kanji: "比べる", acceptedRu: ["сравнивать", "сравнить"] },
];

// ─── N4 Word Order (15) ───────────────────────────────────────

export const EX_N4_WORD_ORDER: WordOrderQuestion[] = [
  { id: "ex4-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Мама заставила меня есть овощи.»", words: ["食べさせました", "を", "野菜", "に", "母は", "私"], correctOrder: [4, 5, 3, 2, 1, 0] },
  { id: "ex4-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Мне наступили на ногу в поезде.» (пассив)", words: ["踏まれました", "を", "足", "で", "電車"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex4-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Если дёшево, куплю.»", words: ["買います", "安ければ"], correctOrder: [1, 0] },
  { id: "ex4-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Если нажать кнопку, дверь откроется.»", words: ["開きます", "が", "ドア", "と", "押す", "を", "ボタン"], correctOrder: [6, 5, 4, 3, 2, 1, 0] },
  { id: "ex4-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я забыл кошелёк.» (てしまう)", words: ["しまいました", "忘れて", "を", "財布"], correctOrder: [3, 2, 1, 0] },
  { id: "ex4-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Дождь начался.» (てくる)", words: ["きました", "降って", "が", "雨"], correctOrder: [3, 2, 1, 0] },
  { id: "ex4-w07", atSec: 0, kind: "word_order", promptRu: "Соберите: «Стараюсь заниматься каждый день.»", words: ["しています", "ように", "運動する", "毎日"], correctOrder: [3, 2, 1, 0] },
  { id: "ex4-w08", atSec: 0, kind: "word_order", promptRu: "Соберите: «Стал уметь говорить по-японски.»", words: ["なりました", "ように", "話せる", "が", "日本語"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex4-w09", atSec: 0, kind: "word_order", promptRu: "Соберите: «Решил поехать на учёбу.»", words: ["しました", "ことに", "留学する"], correctOrder: [2, 1, 0] },
  { id: "ex4-w10", atSec: 0, kind: "word_order", promptRu: "Соберите: «Говорят, завтра тест.»", words: ["そうです", "だ", "テスト", "は", "明日"], correctOrder: [4, 3, 2, 1, 0] },
  { id: "ex4-w11", atSec: 0, kind: "word_order", promptRu: "Соберите: «Похоже, он японец.»", words: ["らしいです", "日本人", "は", "あの人"], correctOrder: [3, 2, 1, 0] },
  { id: "ex4-w12", atSec: 0, kind: "word_order", promptRu: "Соберите: «Только что приехал.»", words: ["ばかりです", "着いた"], correctOrder: [1, 0] },
  { id: "ex4-w13", atSec: 0, kind: "word_order", promptRu: "Соберите: «Как раз собираюсь выходить.»", words: ["ところです", "出かける", "今"], correctOrder: [2, 1, 0] },
  { id: "ex4-w14", atSec: 0, kind: "word_order", promptRu: "Соберите: «Если это ты, сможешь.»", words: ["と思います", "できる", "なら", "あなた"], correctOrder: [3, 2, 1, 0] },
  { id: "ex4-w15", atSec: 0, kind: "word_order", promptRu: "Соберите: «Постепенно стало холодно.»", words: ["なってきました", "寒く", "だんだん"], correctOrder: [2, 1, 0] },
];

// ─── N4 Fill (15) ─────────────────────────────────────────────

export const EX_N4_FILL: FillBlankQuestion[] = [
  { id: "ex4-f01", atSec: 0, kind: "fill_blank", promptRu: "Впишите каузатив: 食べる →「子供に野菜を___」", sentenceJa: "子供に野菜を___。", blankIndex: 0, acceptedAnswers: ["食べさせる", "食べさせます", "食べさせた", "食べさせました"], explanationRu: "食べる → 食べさせる (каузатив)." },
  { id: "ex4-f02", atSec: 0, kind: "fill_blank", promptRu: "Впишите пассив: 呼ぶ →「友達に___」", sentenceJa: "友達に名前を___。", blankIndex: 0, acceptedAnswers: ["呼ばれた", "呼ばれました"], explanationRu: "呼ぶ → 呼ばれる (пассив)." },
  { id: "ex4-f03", atSec: 0, kind: "fill_blank", promptRu: "Впишите условие ば: 高い →「___買いません。」", sentenceJa: "___買いません。", blankIndex: 0, acceptedAnswers: ["高ければ"], explanationRu: "高い → 高ければ (условие ～ば)." },
  { id: "ex4-f04", atSec: 0, kind: "fill_blank", promptRu: "Впишите условие たら: 暇 →「___遊びに来てください。」", sentenceJa: "___遊びに来てください。", blankIndex: 0, acceptedAnswers: ["暇だったら", "暇でしたら"], explanationRu: "暇 → 暇だったら (условие ～たら)." },
  { id: "ex4-f05", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Забыл кошелёк.» (てしまう) 財布を忘れて___。", sentenceJa: "財布を忘れて___。", blankIndex: 0, acceptedAnswers: ["しまいました", "しまった"], explanationRu: "～てしまう = к сожалению (завершение)." },
  { id: "ex4-f06", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Дождь начался.» 雨が降って___。", sentenceJa: "雨が降って___。", blankIndex: 0, acceptedAnswers: ["きました", "きた"], explanationRu: "～てくる — начало изменения." },
  { id: "ex4-f07", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Стараюсь рано ложиться.» 早く寝る___にしています。", sentenceJa: "早く寝る___にしています。", blankIndex: 0, acceptedAnswers: ["よう"], explanationRu: "～ようにする = стараться." },
  { id: "ex4-f08", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Стал уметь плавать.» 泳げる___になりました。", sentenceJa: "泳げる___になりました。", blankIndex: 0, acceptedAnswers: ["よう"], explanationRu: "～ようになる = стало так, что." },
  { id: "ex4-f09", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Решил бросить курить.» タバコをやめる___にしました。", sentenceJa: "タバコをやめる___にしました。", blankIndex: 0, acceptedAnswers: ["こと"], explanationRu: "～ことにする = решить." },
  { id: "ex4-f10", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Говорят, дёшево.» 安い___です。(伝聞)", sentenceJa: "あの店は安い___です。", blankIndex: 0, acceptedAnswers: ["そう", "らしい"], explanationRu: "～そうだ / ～らしい (伝聞)." },
  { id: "ex4-f11", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Похоже, он студент.» 学生___です。", sentenceJa: "あの人は学生___です。", blankIndex: 0, acceptedAnswers: ["らしい"], explanationRu: "～らしい = по-видимому." },
  { id: "ex4-f12", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Только что проснулся.» 起きた___です。", sentenceJa: "今、起きた___です。", blankIndex: 0, acceptedAnswers: ["ばかり"], explanationRu: "～ばかり = только что." },
  { id: "ex4-f13", atSec: 0, kind: "fill_blank", promptRu: "Впишите: «Как раз ем.» 今、食べている___です。", sentenceJa: "今、食べている___です。", blankIndex: 0, acceptedAnswers: ["ところ"], explanationRu: "～ているところ = как раз в процессе." },
  { id: "ex4-f14", atSec: 0, kind: "fill_blank", promptRu: "Впишите каузатив: 行く →「子供を学校に___」", sentenceJa: "子供を学校に___。", blankIndex: 0, acceptedAnswers: ["行かせる", "行かせます", "行かせた", "行かせました"], explanationRu: "行く → 行かせる (каузатив)." },
  { id: "ex4-f15", atSec: 0, kind: "fill_blank", promptRu: "Впишите пассив: 踏む →「足を___」", sentenceJa: "電車で足を___。", blankIndex: 0, acceptedAnswers: ["踏まれた", "踏まれました"], explanationRu: "踏む → 踏まれる (пассив)." },
];

// ─── N4 Numbers (15) ──────────────────────────────────────────

export const EX_N4_NUMBERS: NumberAudioQuestion[] = [
  { id: "ex4-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "にせんにじゅうろくねんしがつじゅうはちにち", acceptedAnswers: ["2026年4月18日", "2026.04.18", "18.04.2026"], explanationRu: "二千二十六年四月十八日 = 18 апреля 2026." },
  { id: "ex4-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт: сколько человек?", audioText: "ごにん", acceptedAnswers: ["5人", "5"], explanationRu: "五人 = 5 человек." },
  { id: "ex4-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте счёт: сколько раз?", audioText: "さんかい", acceptedAnswers: ["3回", "3"], explanationRu: "三回 = 3 раза." },
  { id: "ex4-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте возраст.", audioText: "にじゅうはっさい", acceptedAnswers: ["28歳", "28"], explanationRu: "二十八歳 = 28 лет." },
  { id: "ex4-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте: сколько этажей?", audioText: "じゅっかい", acceptedAnswers: ["10階", "10"], explanationRu: "十階 = 10-й этаж." },
  { id: "ex4-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите: сколько минут?", audioText: "よんじゅうごふん", acceptedAnswers: ["45分", "45"], explanationRu: "四十五分 = 45 минут." },
  { id: "ex4-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "さんまんにせんひゃく", acceptedAnswers: ["32100"], explanationRu: "三万二千百 = 32100." },
  { id: "ex4-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте: сколько страниц?", audioText: "にひゃくごじゅうろくページ", acceptedAnswers: ["256ページ", "256"], explanationRu: "二百五十六ページ = 256 страниц." },
  { id: "ex4-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "ろくがつむいか", acceptedAnswers: ["6月6日", "06.06", "6.6"], explanationRu: "六月六日 = 6 июня." },
  { id: "ex4-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте дату и запишите.", audioText: "じゅうがつはつか", acceptedAnswers: ["10月20日", "10.20", "20.10"], explanationRu: "十月二十日 = 20 октября." },
  { id: "ex4-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте: сколько штук (общий счётчик)?", audioText: "ななつ", acceptedAnswers: ["7つ", "7"], explanationRu: "七つ = 7 штук." },
  { id: "ex4-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "きゅうまんはっせん", acceptedAnswers: ["98000"], explanationRu: "九万八千 = 98000." },
  { id: "ex4-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте: какой день недели?", audioText: "もくようび", acceptedAnswers: ["木曜日", "четверг"], explanationRu: "木曜日 = четверг." },
  { id: "ex4-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте время и запишите.", audioText: "ごぜんじゅういちじにじゅっぷん", acceptedAnswers: ["11:20", "11時20分"], explanationRu: "午前十一時二十分 = 11:20 утра." },
  { id: "ex4-n15", atSec: 0, kind: "number_audio", promptRu: "Прослушайте: сколько месяцев?", audioText: "ろっかげつ", acceptedAnswers: ["6ヶ月", "6か月", "6"], explanationRu: "六ヶ月 = 6 месяцев." },
];

// ─── N4 Dialogues (15) ────────────────────────────────────────

export const EX_N4_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "ex4-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что мама заставила ребёнка делать?",
    dialogueLines: [
      { speaker: "子供", ja: "今日、母にピアノを練習させられた。" },
      { speaker: "友達", ja: "大変だったね。" },
    ],
    optionsRu: ["Убирать комнату", "Практиковать пианино", "Делать уроки", "Мыть посуду"],
    correctIndex: 1,
    explanationRu: "ピアノを練習させられた = заставили практиковать пианино.",
  },
  {
    id: "ex4-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что случилось?",
    dialogueLines: [
      { speaker: "A", ja: "どうしたの？顔色が悪いよ。" },
      { speaker: "B", ja: "電車で足を踏まれたんだ。" },
    ],
    optionsRu: ["Потерял телефон", "В поезде наступили на ногу", "Заболел", "Упал"],
    correctIndex: 1,
    explanationRu: "足を踏まれた = наступили на ногу (пассив).",
  },
  {
    id: "ex4-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что произойдёт, если нажать кнопку?",
    dialogueLines: [
      { speaker: "A", ja: "このボタンを押すとどうなりますか。" },
      { speaker: "B", ja: "押すと、電気がつきます。" },
    ],
    optionsRu: ["Дверь откроется", "Свет включится", "Вода пойдёт", "Музыка заиграет"],
    correctIndex: 1,
    explanationRu: "電気がつきます = свет включится.",
  },
  {
    id: "ex4-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что произошло с кошельком?",
    dialogueLines: [
      { speaker: "A", ja: "大変！財布をなくしてしまった！" },
      { speaker: "B", ja: "えっ、どこでなくしたの？" },
    ],
    optionsRu: ["Забыл дома", "Потерял кошелёк", "Украли сумку", "Порвался карман"],
    correctIndex: 1,
    explanationRu: "なくしてしまった = потерял (てしまう — с сожалением).",
  },
  {
    id: "ex4-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что человек научился делать?",
    dialogueLines: [
      { speaker: "A", ja: "日本に来て、何ができるようになりましたか。" },
      { speaker: "B", ja: "漢字が読めるようになりました。" },
    ],
    optionsRu: ["Готовить суши", "Читать кандзи", "Плавать", "Кататься на лыжах"],
    correctIndex: 1,
    explanationRu: "読めるようになった = стал уметь читать.",
  },
  {
    id: "ex4-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что решил сделать человек?",
    dialogueLines: [
      { speaker: "A", ja: "最近太ったので、ダイエットすることにしました。" },
      { speaker: "B", ja: "頑張ってね！" },
    ],
    optionsRu: ["Начать бегать", "Сесть на диету", "Бросить курить", "Сменить работу"],
    correctIndex: 1,
    explanationRu: "ダイエットすることにした = решил сесть на диету.",
  },
  {
    id: "ex4-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что сказали про погоду?",
    dialogueLines: [
      { speaker: "A", ja: "天気予報を見た？" },
      { speaker: "B", ja: "うん、週末は台風が来るそうだよ。" },
    ],
    optionsRu: ["Будет ясно", "Придёт тайфун", "Будет снег", "Жарко будет"],
    correctIndex: 1,
    explanationRu: "台風が来るそう = говорят, придёт тайфун.",
  },
  {
    id: "ex4-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что думает B о новом учителе?",
    dialogueLines: [
      { speaker: "A", ja: "新しい先生はどんな人？" },
      { speaker: "B", ja: "優しい人らしいよ。" },
    ],
    optionsRu: ["Строгий", "Добрый, по-видимому", "Молодой", "Скучный"],
    correctIndex: 1,
    explanationRu: "優しい人らしい = по-видимому, добрый человек.",
  },
  {
    id: "ex4-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Когда человек поел?",
    dialogueLines: [
      { speaker: "A", ja: "お昼ご飯はもう食べた？" },
      { speaker: "B", ja: "うん、今食べたばかりだよ。" },
    ],
    optionsRu: ["Ещё не ел", "Только что поел", "Давно поел", "Не будет есть"],
    correctIndex: 1,
    explanationRu: "食べたばかり = только что поел.",
  },
  {
    id: "ex4-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что человек как раз делает?",
    dialogueLines: [
      { speaker: "A", ja: "もしもし、今大丈夫？" },
      { speaker: "B", ja: "ごめん、今ちょうどお風呂に入るところなんだ。" },
    ],
    optionsRu: ["Готовит еду", "Как раз собирается в ванную", "Смотрит телевизор", "Уже спит"],
    correctIndex: 1,
    explanationRu: "入るところ = как раз собирается.",
  },
  {
    id: "ex4-d11", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что стало с ценами?",
    dialogueLines: [
      { speaker: "A", ja: "最近、物価がどんどん上がっていくね。" },
      { speaker: "B", ja: "本当だね。生活が大変だ。" },
    ],
    optionsRu: ["Цены снижаются", "Цены растут", "Цены не изменились", "Цены стабильны"],
    correctIndex: 1,
    explanationRu: "上がっていく = растут (и далее удаляются во времени).",
  },
  {
    id: "ex4-d12", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Если будет свободное время, что сделает B?",
    dialogueLines: [
      { speaker: "A", ja: "来週の土曜日、暇だったら映画に行かない？" },
      { speaker: "B", ja: "暇だったら行きたい！" },
    ],
    optionsRu: ["Пойдёт на работу", "Пойдёт в кино", "Останется дома", "Поедет в путешествие"],
    correctIndex: 1,
    explanationRu: "暇だったら行きたい = если будет свободен, хочет пойти.",
  },
  {
    id: "ex4-d13", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что учитель попросил сделать?",
    dialogueLines: [
      { speaker: "先生", ja: "教科書の50ページを開いてください。" },
      { speaker: "学生", ja: "はい、開きました。" },
    ],
    optionsRu: ["Закрыть учебник", "Открыть страницу 50", "Прочитать вслух", "Написать эссе"],
    correctIndex: 1,
    explanationRu: "50ページを開いて = откройте страницу 50.",
  },
  {
    id: "ex4-d14", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Почему B извиняется?",
    dialogueLines: [
      { speaker: "A", ja: "明日のパーティー来られる？" },
      { speaker: "B", ja: "ごめん、仕事が残っていて行けないんだ。" },
    ],
    optionsRu: ["Болеет", "Осталась работа", "Уезжает", "Не хочет"],
    correctIndex: 1,
    explanationRu: "仕事が残っていて = осталась работа.",
  },
  {
    id: "ex4-d15", atSec: 0, kind: "dialogue_audio",
    promptRu: "Прослушайте диалог. Что постепенно изменилось?",
    dialogueLines: [
      { speaker: "A", ja: "日本の生活はどう？" },
      { speaker: "B", ja: "最初は大変だったけど、だんだん慣れてきました。" },
    ],
    optionsRu: ["Стало хуже", "Постепенно привык", "Совсем не привык", "Сразу привык"],
    correctIndex: 1,
    explanationRu: "だんだん慣れてきた = постепенно привык (～てくる).",
  },
];
