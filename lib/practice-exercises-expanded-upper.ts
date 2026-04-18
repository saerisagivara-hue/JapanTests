import type {
  ListeningMcqQuestion,
  WordOrderQuestion,
  KanjiTranslateQuestion,
  FillBlankQuestion,
  NumberAudioQuestion,
  DialogueAudioQuestion,
} from "./content";

// ╔══════════════════════════════════════════════════════════════════╗
// ║                         N3 EXERCISES                            ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── N3 Grammar (25) ────────────────────────────────────────────────

export const EX_N3_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "ex3-g01", atSec: 0, kind: "listening_mcq", promptRu: "「毎日運動するようにしています」— что выражает ようにする?", optionsRu: ["Стало так", "Стараюсь делать", "Решил сделать", "Должен сделать"], correctIndex: 1, explanationRu: "ようにする = стараться, прилагать усилия к чему-то." },
  { id: "ex3-g02", atSec: 0, kind: "listening_mcq", promptRu: "「日本語が話せるようになりました」— что значит ようになる?", optionsRu: ["Решил говорить", "Стараюсь говорить", "Стал уметь говорить", "Перестал говорить"], correctIndex: 2, explanationRu: "ようになる = стало так, что…; изменение состояния." },
  { id: "ex3-g03", atSec: 0, kind: "listening_mcq", promptRu: "「来月から毎朝走ることにしました」— что выражает ことにする?", optionsRu: ["Стало так", "Принял решение", "Надеюсь", "Должен"], correctIndex: 1, explanationRu: "ことにする = принять решение (по своей воле)." },
  { id: "ex3-g04", atSec: 0, kind: "listening_mcq", promptRu: "「来年から新しい制度になることになった」— что значит ことになる?", optionsRu: ["Я решил", "Так получилось / было решено", "Стараюсь", "Хочу"], correctIndex: 1, explanationRu: "ことになる = было решено (не по моей воле), так вышло." },
  { id: "ex3-g05", atSec: 0, kind: "listening_mcq", promptRu: "「あの人は怒りっぽい」— что выражает っぽい?", optionsRu: ["Немного", "Склонный к", "Как будто", "Точно"], correctIndex: 1, explanationRu: "っぽい = склонный к чему-то, ~оватый." },
  { id: "ex3-g06", atSec: 0, kind: "listening_mcq", promptRu: "「雨が降るみたいだ」— что значит みたい?", optionsRu: ["Точно пойдёт", "Похоже, что пойдёт", "Не пойдёт", "Хочу, чтобы пошёл"], correctIndex: 1, explanationRu: "みたい = похоже, что; выглядит как." },
  { id: "ex3-g07", atSec: 0, kind: "listening_mcq", promptRu: "「試験に合格するために毎日勉強する」— что выражает ために?", optionsRu: ["Несмотря на", "Ради цели", "Потому что", "Вместо"], correctIndex: 1, explanationRu: "ために = ради, для того чтобы (цель)." },
  { id: "ex3-g08", atSec: 0, kind: "listening_mcq", promptRu: "「聞こえるように大きい声で話してください」— что здесь значит ように?", optionsRu: ["Чтобы (было слышно)", "Потому что слышно", "Несмотря на то, что слышно", "Похоже, что слышно"], correctIndex: 0, explanationRu: "ように = чтобы (результат/состояние наступило)." },
  { id: "ex3-g09", atSec: 0, kind: "listening_mcq", promptRu: "「友達が駅まで送ってくれた」— что выражает てくれる?", optionsRu: ["Я сделал для друга", "Друг сделал для меня", "Мы вместе", "Я попросил"], correctIndex: 1, explanationRu: "てくれる = кто-то сделал для меня (благодарность)." },
  { id: "ex3-g10", atSec: 0, kind: "listening_mcq", promptRu: "「来年留学するつもりです」— что значит つもり?", optionsRu: ["Должен", "Намерен", "Был вынужден", "Случайно"], correctIndex: 1, explanationRu: "つもり = намерение, собираться делать." },
  { id: "ex3-g11", atSec: 0, kind: "listening_mcq", promptRu: "「彼は来るはずです」— что выражает はず?", optionsRu: ["Сомнение", "Ожидание/уверенность", "Приказ", "Просьба"], correctIndex: 1, explanationRu: "はず = должен, по идее (основано на логике/информации)." },
  { id: "ex3-g12", atSec: 0, kind: "listening_mcq", promptRu: "「甘いものばかり食べている」— что значит ばかり?", optionsRu: ["Только, всё время", "Иногда", "Никогда", "Немного"], correctIndex: 0, explanationRu: "ばかり = только, всё время (часто с оттенком критики)." },
  { id: "ex3-g13", atSec: 0, kind: "listening_mcq", promptRu: "「日本に来たばかりです」— что значит たばかり?", optionsRu: ["Давно приехал", "Только что приехал", "Ещё не приехал", "Собираюсь приехать"], correctIndex: 1, explanationRu: "たばかり = только что (сделал)." },
  { id: "ex3-g14", atSec: 0, kind: "listening_mcq", promptRu: "「今から出かけるところです」— что выражает ところ?", optionsRu: ["Уже вышел", "Как раз собираюсь выйти", "Не хочу выходить", "Вчера вышел"], correctIndex: 1, explanationRu: "Vるところ = как раз собираюсь (делать)." },
  { id: "ex3-g15", atSec: 0, kind: "listening_mcq", promptRu: "「朝ごはんを食べないで学校に行った」— что значит ないで?", optionsRu: ["Поел и пошёл", "Не поев, пошёл", "Пока ел", "Хочу поесть"], correctIndex: 1, explanationRu: "ないで = не делая (что-то), (сделал другое)." },
  { id: "ex3-g16", atSec: 0, kind: "listening_mcq", promptRu: "「辞書を使わずに読んだ」— что значит ずに?", optionsRu: ["Используя словарь", "Не используя словарь", "С помощью словаря", "Купив словарь"], correctIndex: 1, explanationRu: "ずに = не делая (= ないで, книжный стиль)." },
  { id: "ex3-g17", atSec: 0, kind: "listening_mcq", promptRu: "「彼は医者として働いている」— что значит として?", optionsRu: ["Вместо врача", "В качестве врача", "Кроме врача", "Рядом с врачом"], correctIndex: 1, explanationRu: "として = в качестве, в роли." },
  { id: "ex3-g18", atSec: 0, kind: "listening_mcq", promptRu: "「日本の文化について調べた」— что значит について?", optionsRu: ["Вопреки культуре", "О культуре / по теме культуры", "Без культуры", "Ради культуры"], correctIndex: 1, explanationRu: "について = о, касательно, по теме." },
  { id: "ex3-g19", atSec: 0, kind: "listening_mcq", promptRu: "「学生にとってこの本は難しい」— что значит にとって?", optionsRu: ["Для (с точки зрения)", "Вместо", "Несмотря на", "Благодаря"], correctIndex: 0, explanationRu: "にとって = для (с чьей-то точки зрения)." },
  { id: "ex3-g20", atSec: 0, kind: "listening_mcq", promptRu: "「名前さえ覚えていない」— что значит さえ?", optionsRu: ["Даже (имя не помню)", "Только имя помню", "Кроме имени", "Имя и фамилию"], correctIndex: 0, explanationRu: "さえ = даже (минимальный пример)." },
  { id: "ex3-g21", atSec: 0, kind: "listening_mcq", promptRu: "「お金さえあれば何でも買える」— что выражает さえ～ば?", optionsRu: ["Если хотя бы… то", "Без… нельзя", "Даже если нет", "Несмотря на"], correctIndex: 0, explanationRu: "さえ～ば = если хотя бы / достаточно, чтобы…" },
  { id: "ex3-g22", atSec: 0, kind: "listening_mcq", promptRu: "「たとえ雨が降っても行きます」— что значит たとえ～ても?", optionsRu: ["Если пойдёт дождь, не пойду", "Даже если пойдёт дождь, пойду", "Потому что дождь", "Когда дождь"], correctIndex: 1, explanationRu: "たとえ～ても = даже если…" },
  { id: "ex3-g23", atSec: 0, kind: "listening_mcq", promptRu: "「約束したから、行かないわけにはいかない」— что значит わけにはいかない?", optionsRu: ["Могу не идти", "Не могу не пойти", "Не хочу идти", "Пойду по желанию"], correctIndex: 1, explanationRu: "わけにはいかない = не могу себе позволить (не сделать)." },
  { id: "ex3-g24", atSec: 0, kind: "listening_mcq", promptRu: "「自分でやるしかない」— что значит しかない?", optionsRu: ["Не хочу делать", "Нет другого выбора, кроме как", "Можно не делать", "Лучше не делать"], correctIndex: 1, explanationRu: "しかない = нет другого выбора, кроме как…" },
  { id: "ex3-g25", atSec: 0, kind: "listening_mcq", promptRu: "「心配することはない」— что значит ことはない?", optionsRu: ["Нужно волноваться", "Нет необходимости волноваться", "Волнуюсь", "Всегда волнуюсь"], correctIndex: 1, explanationRu: "ことはない = нет необходимости делать." },
];

// ─── N3 Vocabulary (20) ─────────────────────────────────────────────

export const EX_N3_VOCAB: ListeningMcqQuestion[] = [
  { id: "ex3-v01", atSec: 0, kind: "listening_mcq", promptRu: "「悔しい」の意味は？", optionsRu: ["Стыдно", "Досадно / обидно", "Грустно", "Радостно"], correctIndex: 1, explanationRu: "悔しい（くやしい）= досадно, обидно." },
  { id: "ex3-v02", atSec: 0, kind: "listening_mcq", promptRu: "「懐かしい」の意味は？", optionsRu: ["Ностальгия", "Страх", "Злость", "Скука"], correctIndex: 0, explanationRu: "懐かしい（なつかしい）= ностальгический, по чему-то скучаю." },
  { id: "ex3-v03", atSec: 0, kind: "listening_mcq", promptRu: "「恥ずかしい」の意味は？", optionsRu: ["Весело", "Стыдно / смущён", "Обидно", "Страшно"], correctIndex: 1, explanationRu: "恥ずかしい（はずかしい）= стыдно, неловко." },
  { id: "ex3-v04", atSec: 0, kind: "listening_mcq", promptRu: "「会議」とは何ですか？", optionsRu: ["Командировка", "Совещание", "Отпуск", "Зарплата"], correctIndex: 1, explanationRu: "会議（かいぎ）= совещание, заседание." },
  { id: "ex3-v05", atSec: 0, kind: "listening_mcq", promptRu: "「出張」とは何ですか？", optionsRu: ["Командировка", "Отставка", "Повышение", "Собеседование"], correctIndex: 0, explanationRu: "出張（しゅっちょう）= командировка." },
  { id: "ex3-v06", atSec: 0, kind: "listening_mcq", promptRu: "「残業」の意味は？", optionsRu: ["Подработка", "Сверхурочная работа", "Увольнение", "Отпуск"], correctIndex: 1, explanationRu: "残業（ざんぎょう）= сверхурочная работа." },
  { id: "ex3-v07", atSec: 0, kind: "listening_mcq", promptRu: "「政治」の意味は？", optionsRu: ["Экономика", "Политика", "Образование", "Медицина"], correctIndex: 1, explanationRu: "政治（せいじ）= политика." },
  { id: "ex3-v08", atSec: 0, kind: "listening_mcq", promptRu: "「経済」の意味は？", optionsRu: ["Политика", "Технология", "Экономика", "Природа"], correctIndex: 2, explanationRu: "経済（けいざい）= экономика." },
  { id: "ex3-v09", atSec: 0, kind: "listening_mcq", promptRu: "「環境」の意味は？", optionsRu: ["Окружающая среда", "Традиция", "Религия", "Население"], correctIndex: 0, explanationRu: "環境（かんきょう）= окружающая среда." },
  { id: "ex3-v10", atSec: 0, kind: "listening_mcq", promptRu: "「地震」の意味は？", optionsRu: ["Тайфун", "Наводнение", "Землетрясение", "Извержение"], correctIndex: 2, explanationRu: "地震（じしん）= землетрясение." },
  { id: "ex3-v11", atSec: 0, kind: "listening_mcq", promptRu: "「台風」の意味は？", optionsRu: ["Землетрясение", "Тайфун", "Цунами", "Лавина"], correctIndex: 1, explanationRu: "台風（たいふう）= тайфун." },
  { id: "ex3-v12", atSec: 0, kind: "listening_mcq", promptRu: "「火山」の意味は？", optionsRu: ["Гора", "Озеро", "Вулкан", "Пустыня"], correctIndex: 2, explanationRu: "火山（かざん）= вулкан." },
  { id: "ex3-v13", atSec: 0, kind: "listening_mcq", promptRu: "「うらやましい」の意味は？", optionsRu: ["Жалко", "Завидно", "Странно", "Ужасно"], correctIndex: 1, explanationRu: "うらやましい = завидно." },
  { id: "ex3-v14", atSec: 0, kind: "listening_mcq", promptRu: "「がっかりする」の意味は？", optionsRu: ["Обрадоваться", "Разочароваться", "Удивиться", "Разозлиться"], correctIndex: 1, explanationRu: "がっかりする = разочароваться." },
  { id: "ex3-v15", atSec: 0, kind: "listening_mcq", promptRu: "「面接」の意味は？", optionsRu: ["Экзамен", "Собеседование", "Лекция", "Практика"], correctIndex: 1, explanationRu: "面接（めんせつ）= собеседование." },
  { id: "ex3-v16", atSec: 0, kind: "listening_mcq", promptRu: "「給料」の意味は？", optionsRu: ["Зарплата", "Налог", "Премия", "Долг"], correctIndex: 0, explanationRu: "給料（きゅうりょう）= зарплата." },
  { id: "ex3-v17", atSec: 0, kind: "listening_mcq", promptRu: "「人口」の意味は？", optionsRu: ["Вход", "Население", "Выход", "Площадь"], correctIndex: 1, explanationRu: "人口（じんこう）= население." },
  { id: "ex3-v18", atSec: 0, kind: "listening_mcq", promptRu: "「交通」の意味は？", optionsRu: ["Транспорт / движение", "Строительство", "Промышленность", "Торговля"], correctIndex: 0, explanationRu: "交通（こうつう）= транспорт, дорожное движение." },
  { id: "ex3-v19", atSec: 0, kind: "listening_mcq", promptRu: "「事故」の意味は？", optionsRu: ["Происшествие / авария", "Преступление", "Болезнь", "Праздник"], correctIndex: 0, explanationRu: "事故（じこ）= авария, несчастный случай." },
  { id: "ex3-v20", atSec: 0, kind: "listening_mcq", promptRu: "「景色」の意味は？", optionsRu: ["Погода", "Пейзаж / вид", "Карта", "Сувенир"], correctIndex: 1, explanationRu: "景色（けしき）= пейзаж, вид, ландшафт." },
];

// ─── N3 Kanji (20) ──────────────────────────────────────────────────

export const EX_N3_KANJI: KanjiTranslateQuestion[] = [
  { id: "ex3-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「政治」.", kanji: "政治", acceptedRu: ["политика"], hintRu: "せいじ" },
  { id: "ex3-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「経済」.", kanji: "経済", acceptedRu: ["экономика"], hintRu: "けいざい" },
  { id: "ex3-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「環境」.", kanji: "環境", acceptedRu: ["окружающая среда", "среда"], hintRu: "かんきょう" },
  { id: "ex3-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「研究」.", kanji: "研究", acceptedRu: ["исследование", "изучение"], hintRu: "けんきゅう" },
  { id: "ex3-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「教育」.", kanji: "教育", acceptedRu: ["образование", "воспитание"], hintRu: "きょういく" },
  { id: "ex3-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「交通」.", kanji: "交通", acceptedRu: ["транспорт", "движение", "дорожное движение"], hintRu: "こうつう" },
  { id: "ex3-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「産業」.", kanji: "産業", acceptedRu: ["промышленность", "индустрия"], hintRu: "さんぎょう" },
  { id: "ex3-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「技術」.", kanji: "技術", acceptedRu: ["технология", "техника", "мастерство"], hintRu: "ぎじゅつ" },
  { id: "ex3-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「発展」.", kanji: "発展", acceptedRu: ["развитие"], hintRu: "はってん" },
  { id: "ex3-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「社会」.", kanji: "社会", acceptedRu: ["общество"], hintRu: "しゃかい" },
  { id: "ex3-k11", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「文化」.", kanji: "文化", acceptedRu: ["культура"], hintRu: "ぶんか" },
  { id: "ex3-k12", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「伝統」.", kanji: "伝統", acceptedRu: ["традиция", "традиции"], hintRu: "でんとう" },
  { id: "ex3-k13", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「歴史」.", kanji: "歴史", acceptedRu: ["история"], hintRu: "れきし" },
  { id: "ex3-k14", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「建築」.", kanji: "建築", acceptedRu: ["архитектура", "строительство"], hintRu: "けんちく" },
  { id: "ex3-k15", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「農業」.", kanji: "農業", acceptedRu: ["сельское хозяйство", "земледелие"], hintRu: "のうぎょう" },
  { id: "ex3-k16", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「貿易」.", kanji: "貿易", acceptedRu: ["торговля", "внешняя торговля"], hintRu: "ぼうえき" },
  { id: "ex3-k17", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「輸出」.", kanji: "輸出", acceptedRu: ["экспорт", "вывоз"], hintRu: "ゆしゅつ" },
  { id: "ex3-k18", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「輸入」.", kanji: "輸入", acceptedRu: ["импорт", "ввоз"], hintRu: "ゆにゅう" },
  { id: "ex3-k19", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「製品」.", kanji: "製品", acceptedRu: ["продукция", "изделие", "продукт"], hintRu: "せいひん" },
  { id: "ex3-k20", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「工場」.", kanji: "工場", acceptedRu: ["завод", "фабрика"], hintRu: "こうじょう" },
];

// ─── N3 Word Order (15) ─────────────────────────────────────────────

export const EX_N3_WORD_ORDER: WordOrderQuestion[] = [
  { id: "ex3-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я стараюсь каждый день заниматься спортом.»", words: ["しています", "ようにー", "毎日", "運動する", "ー"], correctOrder: [2, 3, 1, 0], explanationRu: "毎日運動するようにしています。" },
  { id: "ex3-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я стал уметь говорить по-японски.»", words: ["ようになりました", "が", "話せる", "日本語"], correctOrder: [3, 1, 2, 0], explanationRu: "日本語が話せるようになりました。" },
  { id: "ex3-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я решил бросить курить.»", words: ["ことにしました", "を", "タバコ", "やめる"], correctOrder: [2, 1, 3, 0], explanationRu: "タバコをやめることにしました。" },
  { id: "ex3-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Было решено, что офис переезжает.»", words: ["ことになった", "が", "事務所", "移転する"], correctOrder: [2, 1, 3, 0], explanationRu: "事務所が移転することになった。" },
  { id: "ex3-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «Он похож на ребёнка (инфантильный).»", words: ["っぽい", "は", "彼", "子供"], correctOrder: [2, 1, 3, 0], explanationRu: "彼は子供っぽい。" },
  { id: "ex3-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Чтобы сдать экзамен, учусь каждый день.»", words: ["勉強する", "ために", "合格する", "毎日", "試験に"], correctOrder: [4, 2, 1, 3, 0], explanationRu: "試験に合格するために毎日勉強する。" },
  { id: "ex3-w07", atSec: 0, kind: "word_order", promptRu: "Соберите: «Друг проводил меня до станции.»", words: ["くれた", "まで", "送って", "が", "友達", "駅"], correctOrder: [4, 3, 5, 1, 2, 0], explanationRu: "友達が駅まで送ってくれた。" },
  { id: "ex3-w08", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я только что приехал в Японию.»", words: ["ばかりです", "に", "来た", "日本"], correctOrder: [3, 1, 2, 0], explanationRu: "日本に来たばかりです。" },
  { id: "ex3-w09", atSec: 0, kind: "word_order", promptRu: "Соберите: «Я сейчас как раз собираюсь выходить.»", words: ["ところです", "出かける", "から", "今"], correctOrder: [3, 2, 1, 0], explanationRu: "今から出かけるところです。" },
  { id: "ex3-w10", atSec: 0, kind: "word_order", promptRu: "Соберите: «Он работает в качестве врача.»", words: ["働いている", "として", "は", "彼", "医者"], correctOrder: [3, 2, 4, 1, 0], explanationRu: "彼は医者として働いている。" },
  { id: "ex3-w11", atSec: 0, kind: "word_order", promptRu: "Соберите: «Для студентов эта книга трудная.»", words: ["難しい", "は", "にとって", "この本", "学生"], correctOrder: [4, 2, 3, 1, 0], explanationRu: "学生にとってこの本は難しい。" },
  { id: "ex3-w12", atSec: 0, kind: "word_order", promptRu: "Соберите: «Даже если пойдёт дождь, пойду.»", words: ["行きます", "ても", "降っ", "雨が", "たとえ"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "たとえ雨が降っても行きます。" },
  { id: "ex3-w13", atSec: 0, kind: "word_order", promptRu: "Соберите: «Нет другого выбора, кроме как делать самому.»", words: ["しかない", "やる", "で", "自分"], correctOrder: [3, 2, 1, 0], explanationRu: "自分でやるしかない。" },
  { id: "ex3-w14", atSec: 0, kind: "word_order", promptRu: "Соберите: «Пошёл в школу, не позавтракав.»", words: ["行った", "に", "食べないで", "学校", "朝ごはんを"], correctOrder: [4, 2, 3, 1, 0], explanationRu: "朝ごはんを食べないで学校に行った。" },
  { id: "ex3-w15", atSec: 0, kind: "word_order", promptRu: "Соберите: «Если хотя бы деньги есть, можно всё купить.»", words: ["買える", "何でも", "あれば", "さえ", "お金"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "お金さえあれば何でも買える。" },
];

// ─── N3 Fill-in-the-Blank (15) ──────────────────────────────────────

export const EX_N3_FILL: FillBlankQuestion[] = [
  { id: "ex3-f01", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 毎日野菜を食べる___しています。(стараюсь)", sentenceJa: "毎日野菜を食べる___しています。", blankIndex: 0, acceptedAnswers: ["ように"], explanationRu: "ようにする = стараться делать." },
  { id: "ex3-f02", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 漢字が読める___なりました。(стал уметь)", sentenceJa: "漢字が読める___なりました。", blankIndex: 0, acceptedAnswers: ["ように"], explanationRu: "ようになる = стало так, что… (изменение)." },
  { id: "ex3-f03", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: ダイエットする___にしました。(решил)", sentenceJa: "ダイエットする___にしました。", blankIndex: 0, acceptedAnswers: ["こと"], explanationRu: "ことにする = решить (по своей воле)." },
  { id: "ex3-f04", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 転勤する___になった。(было решено)", sentenceJa: "転勤する___になった。", blankIndex: 0, acceptedAnswers: ["こと"], explanationRu: "ことになる = было решено (не мной)." },
  { id: "ex3-f05", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: あの映画は子供___。(~оватый, для детей)", sentenceJa: "あの映画は子供___。", blankIndex: 0, acceptedAnswers: ["っぽい"], explanationRu: "っぽい = ~оватый, похожий на." },
  { id: "ex3-f06", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 留学する___勉強しています。(для того чтобы)", sentenceJa: "留学する___勉強しています。", blankIndex: 0, acceptedAnswers: ["ために"], explanationRu: "ために = для того чтобы (цель)." },
  { id: "ex3-f07", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 先生が説明して___。(сделал для меня)", sentenceJa: "先生が説明して___。", blankIndex: 0, acceptedAnswers: ["くれた", "くれました"], explanationRu: "てくれる = кто-то сделал для меня." },
  { id: "ex3-f08", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 来年結婚する___です。(намерен)", sentenceJa: "来年結婚する___です。", blankIndex: 0, acceptedAnswers: ["つもり"], explanationRu: "つもり = намерение." },
  { id: "ex3-f09", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 彼女は来る___です。(должна, по идее)", sentenceJa: "彼女は来る___です。", blankIndex: 0, acceptedAnswers: ["はず"], explanationRu: "はず = должен (по расчёту/логике)." },
  { id: "ex3-f10", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: ゲーム___している。(только и делает)", sentenceJa: "ゲーム___している。", blankIndex: 0, acceptedAnswers: ["ばかり"], explanationRu: "ばかり = только, всё время." },
  { id: "ex3-f11", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 日本の歴史___調べた。(о, по теме)", sentenceJa: "日本の歴史___調べた。", blankIndex: 0, acceptedAnswers: ["について"], explanationRu: "について = о, касательно." },
  { id: "ex3-f12", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 外国人___この漢字は難しい。(с точки зрения)", sentenceJa: "外国人___この漢字は難しい。", blankIndex: 0, acceptedAnswers: ["にとって"], explanationRu: "にとって = для (с точки зрения)." },
  { id: "ex3-f13", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 名前___知らない。(даже)", sentenceJa: "名前___知らない。", blankIndex: 0, acceptedAnswers: ["さえ"], explanationRu: "さえ = даже." },
  { id: "ex3-f14", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 辞書を使わ___読んだ。(не используя)", sentenceJa: "辞書を使わ___読んだ。", blankIndex: 0, acceptedAnswers: ["ずに"], explanationRu: "ずに = не делая (книжн.)." },
  { id: "ex3-f15", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 心配する___ない。(нет необходимости)", sentenceJa: "心配する___ない。", blankIndex: 0, acceptedAnswers: ["ことは"], explanationRu: "ことはない = нет необходимости." },
];

// ─── N3 Numbers (15) ────────────────────────────────────────────────

export const EX_N3_NUMBERS: NumberAudioQuestion[] = [
  { id: "ex3-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте процент и запишите.", audioText: "にじゅうごパーセント", acceptedAnswers: ["25%", "25パーセント"], explanationRu: "25% = にじゅうごパーセント." },
  { id: "ex3-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте процент и запишите.", audioText: "はちじゅうパーセント", acceptedAnswers: ["80%", "80パーセント"], explanationRu: "80% = はちじゅうパーセント." },
  { id: "ex3-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте год и запишите.", audioText: "せんきゅうひゃくきゅうじゅうはちねん", acceptedAnswers: ["1998年", "1998"], explanationRu: "千九百九十八年 = 1998 год." },
  { id: "ex3-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте год и запишите.", audioText: "にせんにじゅうごねん", acceptedAnswers: ["2025年", "2025"], explanationRu: "二千二十五年 = 2025 год." },
  { id: "ex3-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте большое число и запишите.", audioText: "さんまんごせん", acceptedAnswers: ["35000", "3万5千", "三万五千"], explanationRu: "三万五千 = 35 000." },
  { id: "ex3-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте большое число и запишите.", audioText: "じゅうまん", acceptedAnswers: ["100000", "10万", "十万"], explanationRu: "十万 = 100 000." },
  { id: "ex3-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте процент и запишите.", audioText: "ごじゅうにてんさんパーセント", acceptedAnswers: ["52.3%", "52.3パーセント"], explanationRu: "52.3% = ごじゅうにてんさんパーセント." },
  { id: "ex3-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "にひゃくまん", acceptedAnswers: ["2000000", "200万", "二百万"], explanationRu: "二百万 = 2 000 000." },
  { id: "ex3-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте год и запишите.", audioText: "にせんねん", acceptedAnswers: ["2000年", "2000"], explanationRu: "二千年 = 2000 год." },
  { id: "ex3-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "ろくじゅうななまんにせん", acceptedAnswers: ["672000", "67万2千", "六十七万二千"], explanationRu: "六十七万二千 = 672 000." },
  { id: "ex3-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте процент и запишите.", audioText: "じゅっパーセント", acceptedAnswers: ["10%", "10パーセント"], explanationRu: "10% = じゅっパーセント." },
  { id: "ex3-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте год и запишите.", audioText: "せんはっぴゃくろくじゅうはちねん", acceptedAnswers: ["1868年", "1868"], explanationRu: "千八百六十八年 = 1868 год (Реставрация Мэйдзи)." },
  { id: "ex3-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "よんじゅうごまんえん", acceptedAnswers: ["45万円", "450000円", "450000"], explanationRu: "四十五万円 = 450 000 иен." },
  { id: "ex3-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте процент и запишите.", audioText: "きゅうじゅうきゅうてんきゅうパーセント", acceptedAnswers: ["99.9%", "99.9パーセント"], explanationRu: "99.9% = きゅうじゅうきゅうてんきゅうパーセント." },
  { id: "ex3-n15", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "いちおく", acceptedAnswers: ["1億", "100000000", "一億"], explanationRu: "一億 = 100 000 000 (сто миллионов)." },
];

// ─── N3 Dialogues (15) ──────────────────────────────────────────────

export const EX_N3_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "ex3-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём просит сотрудник начальника?",
    dialogueLines: [
      { speaker: "社員", ja: "部長、来週の月曜日にお休みをいただけませんか。" },
      { speaker: "部長", ja: "理由は何ですか。" },
      { speaker: "社員", ja: "引っ越しの手続きがありまして。" },
    ],
    optionsRu: ["Повышение зарплаты", "Выходной в понедельник", "Командировка", "Перевод в другой отдел"],
    correctIndex: 1,
    explanationRu: "お休みをいただけませんか = нельзя ли получить выходной.",
  },
  {
    id: "ex3-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Почему мужчина опоздал?",
    dialogueLines: [
      { speaker: "女", ja: "遅かったね。何かあったの？" },
      { speaker: "男", ja: "電車が事故で止まっちゃって。" },
    ],
    optionsRu: ["Проспал", "Электричка остановилась из-за аварии", "Забыл вещи", "Заблудился"],
    correctIndex: 1,
    explanationRu: "事故で止まった = остановилась из-за аварии.",
  },
  {
    id: "ex3-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что девушка решила делать?",
    dialogueLines: [
      { speaker: "男", ja: "来月から何か始めるの？" },
      { speaker: "女", ja: "うん、ジムに通うことにしたの。" },
    ],
    optionsRu: ["Учить английский", "Ходить в спортзал", "Переехать", "Поменять работу"],
    correctIndex: 1,
    explanationRu: "ジムに通うことにした = решила ходить в спортзал.",
  },
  {
    id: "ex3-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что случилось с погодой?",
    dialogueLines: [
      { speaker: "女", ja: "今日は台風が来るみたいだよ。" },
      { speaker: "男", ja: "じゃあ、早く帰ったほうがいいね。" },
    ],
    optionsRu: ["Будет снег", "Будет тайфун", "Будет жарко", "Будет землетрясение"],
    correctIndex: 1,
    explanationRu: "台風が来るみたい = похоже, придёт тайфун.",
  },
  {
    id: "ex3-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что женщина попросила мужчину сделать?",
    dialogueLines: [
      { speaker: "女", ja: "ちょっとこの荷物を持ってもらえませんか。" },
      { speaker: "男", ja: "もちろん、いいですよ。" },
    ],
    optionsRu: ["Купить еду", "Поднять багаж", "Подержать вещи", "Отнести письмо"],
    correctIndex: 2,
    explanationRu: "荷物を持ってもらえませんか = не могли бы подержать вещи.",
  },
  {
    id: "ex3-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что мужчина собирается делать в отпуске?",
    dialogueLines: [
      { speaker: "女", ja: "休みの間、何をするつもり？" },
      { speaker: "男", ja: "温泉に行くつもりだよ。" },
    ],
    optionsRu: ["Работать из дома", "Поехать на горячие источники", "Спать весь день", "Путешествовать за границу"],
    correctIndex: 1,
    explanationRu: "温泉に行くつもり = собираюсь поехать на горячие источники.",
  },
  {
    id: "ex3-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Почему женщина расстроена?",
    dialogueLines: [
      { speaker: "男", ja: "どうしたの？元気がないね。" },
      { speaker: "女", ja: "試験に落ちちゃったの。悔しい。" },
    ],
    optionsRu: ["Потеряла кошелёк", "Провалила экзамен", "Поругалась с другом", "Заболела"],
    correctIndex: 1,
    explanationRu: "試験に落ちた = провалила экзамен. 悔しい = обидно/досадно.",
  },
  {
    id: "ex3-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём они договорились?",
    dialogueLines: [
      { speaker: "男", ja: "今度の日曜日、映画を見に行かない？" },
      { speaker: "女", ja: "いいね！じゃあ、駅の前で待ち合わせしよう。" },
    ],
    optionsRu: ["Пойти за покупками", "Посмотреть кино", "Поужинать вместе", "Заняться спортом"],
    correctIndex: 1,
    explanationRu: "映画を見に行く = пойти посмотреть кино.",
  },
  {
    id: "ex3-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что должен принести мужчина?",
    dialogueLines: [
      { speaker: "女", ja: "明日のパーティーに何か持ってきてくれる？" },
      { speaker: "男", ja: "じゃあ、飲み物を持っていくよ。" },
    ],
    optionsRu: ["Еду", "Напитки", "Подарок", "Цветы"],
    correctIndex: 1,
    explanationRu: "飲み物を持っていく = принесу напитки.",
  },
  {
    id: "ex3-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что случилось у соседа?",
    dialogueLines: [
      { speaker: "女", ja: "隣の家、引っ越したみたいだね。" },
      { speaker: "男", ja: "本当だ。トラックが来てたもんね。" },
    ],
    optionsRu: ["Делают ремонт", "Переехали", "Устроили вечеринку", "Открыли магазин"],
    correctIndex: 1,
    explanationRu: "引っ越したみたい = похоже, переехали.",
  },
  {
    id: "ex3-d11", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что произошло с мужчиной?",
    dialogueLines: [
      { speaker: "女", ja: "大丈夫？顔色が悪いよ。" },
      { speaker: "男", ja: "昨日から熱があるんだ。でも薬を飲んだから大丈夫。" },
    ],
    optionsRu: ["Не выспался", "У него температура", "Порезался", "Болит зуб"],
    correctIndex: 1,
    explanationRu: "熱がある = есть температура.",
  },
  {
    id: "ex3-d12", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую сверхурочную работу упоминает женщина?",
    dialogueLines: [
      { speaker: "男", ja: "最近忙しいの？" },
      { speaker: "女", ja: "うん、毎日残業ばかりで疲れた。" },
    ],
    optionsRu: ["Командировки", "Сверхурочная работа каждый день", "Ночные смены", "Подработка"],
    correctIndex: 1,
    explanationRu: "残業ばかり = одни сверхурочные.",
  },
  {
    id: "ex3-d13", atSec: 0, kind: "dialogue_audio",
    promptRu: "Куда женщина ездила в командировку?",
    dialogueLines: [
      { speaker: "男", ja: "出張はどうだった？" },
      { speaker: "女", ja: "大阪に行ったんだけど、すごく楽しかった。" },
    ],
    optionsRu: ["В Токио", "В Осаку", "В Киото", "На Хоккайдо"],
    correctIndex: 1,
    explanationRu: "大阪に行った = ездила в Осаку.",
  },
  {
    id: "ex3-d14", atSec: 0, kind: "dialogue_audio",
    promptRu: "Почему мужчина ностальгирует?",
    dialogueLines: [
      { speaker: "女", ja: "この写真、懐かしいでしょう？" },
      { speaker: "男", ja: "うん、大学時代を思い出すよ。" },
    ],
    optionsRu: ["Вспомнил детство", "Вспомнил университет", "Вспомнил путешествие", "Вспомнил школу"],
    correctIndex: 1,
    explanationRu: "大学時代を思い出す = вспоминаю студенческие годы.",
  },
  {
    id: "ex3-d15", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что девушка думает о землетрясении?",
    dialogueLines: [
      { speaker: "男", ja: "昨日の地震、大きかったね。" },
      { speaker: "女", ja: "うん、怖かった。でも被害はなかったみたい。" },
    ],
    optionsRu: ["Были разрушения", "Было страшно, но ущерба не было", "Она не почувствовала", "Эвакуировалась"],
    correctIndex: 1,
    explanationRu: "怖かった = было страшно. 被害はなかった = ущерба не было.",
  },
];

// ╔══════════════════════════════════════════════════════════════════╗
// ║                         N2 EXERCISES                            ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── N2 Grammar (25) ────────────────────────────────────────────────

export const EX_N2_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "ex2-g01", atSec: 0, kind: "listening_mcq", promptRu: "「この工事は三年にわたって行われた」— что значит にわたって?", optionsRu: ["Вместо", "На протяжении", "Вопреки", "Около"], correctIndex: 1, explanationRu: "にわたって = на протяжении, охватывая (период/область)." },
  { id: "ex2-g02", atSec: 0, kind: "listening_mcq", promptRu: "「上司に対して失礼な態度を取った」— что значит に対して?", optionsRu: ["По отношению к", "Вместо", "Несмотря на", "Благодаря"], correctIndex: 0, explanationRu: "に対して = по отношению к." },
  { id: "ex2-g03", atSec: 0, kind: "listening_mcq", promptRu: "「春から夏にかけて雨が多い」— что значит にかけて?", optionsRu: ["От… до (период)", "Вместо", "После", "Против"], correctIndex: 0, explanationRu: "にかけて = от… до… (не чёткие границы)." },
  { id: "ex2-g04", atSec: 0, kind: "listening_mcq", promptRu: "「インターネットを通じて情報を得る」— что значит を通じて?", optionsRu: ["Через / посредством", "Без", "Вопреки", "Вместо"], correctIndex: 0, explanationRu: "を通じて = через, посредством." },
  { id: "ex2-g05", atSec: 0, kind: "listening_mcq", promptRu: "「年齢を問わず参加できる」— что значит を問わず?", optionsRu: ["Независимо от", "Из-за", "Только при", "По причине"], correctIndex: 0, explanationRu: "を問わず = независимо от, вне зависимости от." },
  { id: "ex2-g06", atSec: 0, kind: "listening_mcq", promptRu: "「高いと知っているものの、買ってしまった」— что значит ものの?", optionsRu: ["Потому что", "Хотя / несмотря на то что", "Если", "Поэтому"], correctIndex: 1, explanationRu: "ものの = хотя, несмотря на то что." },
  { id: "ex2-g07", atSec: 0, kind: "listening_mcq", promptRu: "「知っているくせに教えてくれない」— что значит くせに?", optionsRu: ["Хотя (с упрёком)", "Потому что", "Без", "Несмотря на"], correctIndex: 0, explanationRu: "くせに = хотя (с оттенком недовольства/упрёка)." },
  { id: "ex2-g08", atSec: 0, kind: "listening_mcq", promptRu: "「約束した以上、守らなければならない」— что значит 以上?", optionsRu: ["Пока", "Раз уж / коль скоро", "Вместо", "Более чем"], correctIndex: 1, explanationRu: "以上 = раз уж, коль скоро (обязательство)." },
  { id: "ex2-g09", atSec: 0, kind: "listening_mcq", promptRu: "「知っている限り、彼は嘘をつかない」— что значит 限り?", optionsRu: ["Насколько (мне известно)", "Всегда", "Никогда", "Кроме"], correctIndex: 0, explanationRu: "限り = насколько, пока." },
  { id: "ex2-g10", atSec: 0, kind: "listening_mcq", promptRu: "「手伝うどころか、邪魔をした」— что значит どころか?", optionsRu: ["Не то что… а наоборот", "Поэтому", "Хотя", "Кроме того"], correctIndex: 0, explanationRu: "どころか = не то чтобы… наоборот." },
  { id: "ex2-g11", atSec: 0, kind: "listening_mcq", promptRu: "「日本語ばかりか、中国語も話せる」— что значит ばかりか?", optionsRu: ["Только", "Не только… но и", "Вместо", "Без"], correctIndex: 1, explanationRu: "ばかりか = не только… но и." },
  { id: "ex2-g12", atSec: 0, kind: "listening_mcq", promptRu: "「会員に限り、割引があります」— что значит に限り?", optionsRu: ["Только для / исключительно", "Кроме", "Без", "Несмотря на"], correctIndex: 0, explanationRu: "に限り = только для, ограничено." },
  { id: "ex2-g13", atSec: 0, kind: "listening_mcq", promptRu: "「そんなことを言おうものなら、怒られる」— что значит ものなら?", optionsRu: ["Если бы (попробовал)", "Потому что", "Хотя", "Если вдруг"], correctIndex: 0, explanationRu: "ものなら = если бы (попробовал), то…" },
  { id: "ex2-g14", atSec: 0, kind: "listening_mcq", promptRu: "「行けないことはないが、遠い」— что значит ないことはない?", optionsRu: ["Нельзя", "Не то чтобы нельзя / можно, но…", "Определённо нельзя", "Обязательно"], correctIndex: 1, explanationRu: "ないことはない = не то чтобы нельзя (двойное отрицание)." },
  { id: "ex2-g15", atSec: 0, kind: "listening_mcq", promptRu: "「大地震が起きかねない」— что значит かねない?", optionsRu: ["Не может случиться", "Может (к сожалению) случиться", "Уже случилось", "Не случится"], correctIndex: 1, explanationRu: "かねない = есть риск, что… (негативная возможность)." },
  { id: "ex2-g16", atSec: 0, kind: "listening_mcq", promptRu: "「その提案には賛成しかねます」— что значит かねる?", optionsRu: ["С радостью соглашусь", "Затрудняюсь / не могу (вежл. отказ)", "Полностью согласен", "Частично согласен"], correctIndex: 1, explanationRu: "かねる = затрудняюсь, не могу (вежливый отказ)." },
  { id: "ex2-g17", atSec: 0, kind: "listening_mcq", promptRu: "「行かざるを得ない」— что значит ざるを得ない?", optionsRu: ["Не обязан идти", "Вынужден идти", "Хочу идти", "Не хочу идти"], correctIndex: 1, explanationRu: "ざるを得ない = вынужден, не могу не (делать)." },
  { id: "ex2-g18", atSec: 0, kind: "listening_mcq", promptRu: "「冗談抜きにして、真剣に話そう」— что значит 抜きにして?", optionsRu: ["С шутками", "Без (шуток) / опуская", "Вместе с", "Благодаря"], correctIndex: 1, explanationRu: "抜きにして = без, исключая." },
  { id: "ex2-g19", atSec: 0, kind: "listening_mcq", promptRu: "「努力の結果にほかならない」— что значит にほかならない?", optionsRu: ["Не что иное, как", "Несмотря на", "Без", "Кроме"], correctIndex: 0, explanationRu: "にほかならない = не что иное, как; именно." },
  { id: "ex2-g20", atSec: 0, kind: "listening_mcq", promptRu: "「二度とそんなことはするまい」— что значит まい?", optionsRu: ["Сделаю снова", "Не сделаю больше (решимость)", "Может быть, сделаю", "Хочу сделать"], correctIndex: 1, explanationRu: "まい = не буду / вряд ли (отрицательная решимость/предположение)." },
  { id: "ex2-g21", atSec: 0, kind: "listening_mcq", promptRu: "「ドアを開けっぱなしにしないで」— что значит っぱなし?", optionsRu: ["Оставлять (в состоянии)", "Закрывать", "Пытаться", "Случайно"], correctIndex: 0, explanationRu: "っぱなし = оставлять (как есть, без изменения)." },
  { id: "ex2-g22", atSec: 0, kind: "listening_mcq", promptRu: "「どうしようもない状況だ」— что значит ようがない?", optionsRu: ["Нет способа (сделать)", "Легко сделать", "Нужно сделать", "Хочу сделать"], correctIndex: 0, explanationRu: "ようがない / ようもない = нет способа, невозможно." },
  { id: "ex2-g23", atSec: 0, kind: "listening_mcq", promptRu: "「あの日以来、会ったきり連絡がない」— что значит きり?", optionsRu: ["С тех пор как (и больше не)", "Часто", "Всегда", "Иногда"], correctIndex: 0, explanationRu: "きり = с тех пор (и больше ничего не происходило)." },
  { id: "ex2-g24", atSec: 0, kind: "listening_mcq", promptRu: "「聞いたところ、来月から値上げするらしい」— что значит たところ?", optionsRu: ["Когда (сделал, то выяснилось)", "Вместо", "До того как", "Без"], correctIndex: 0, explanationRu: "たところ = когда (сделал), то выяснилось/оказалось." },
  { id: "ex2-g25", atSec: 0, kind: "listening_mcq", promptRu: "「言い方を変えようもない」— что значит ようもない?", optionsRu: ["Есть способ изменить", "Нет никакого способа изменить", "Легко изменить", "Нужно изменить"], correctIndex: 1, explanationRu: "ようもない = совершенно нет способа (усиление ようがない)." },
];

// ─── N2 Vocabulary (20) ─────────────────────────────────────────────

export const EX_N2_VOCAB: ListeningMcqQuestion[] = [
  { id: "ex2-v01", atSec: 0, kind: "listening_mcq", promptRu: "「議論」の意味は？", optionsRu: ["Дискуссия", "Прибыль", "Обещание", "Отчёт"], correctIndex: 0, explanationRu: "議論（ぎろん）= дискуссия, обсуждение." },
  { id: "ex2-v02", atSec: 0, kind: "listening_mcq", promptRu: "「提案」の意味は？", optionsRu: ["Критика", "Предложение", "Жалоба", "Просьба"], correctIndex: 1, explanationRu: "提案（ていあん）= предложение (деловое)." },
  { id: "ex2-v03", atSec: 0, kind: "listening_mcq", promptRu: "「効率」の意味は？", optionsRu: ["Эффективность", "Прибыль", "Размер", "Расход"], correctIndex: 0, explanationRu: "効率（こうりつ）= эффективность." },
  { id: "ex2-v04", atSec: 0, kind: "listening_mcq", promptRu: "「方針」の意味は？", optionsRu: ["Курс / политика (действий)", "Результат", "Средство", "Причина"], correctIndex: 0, explanationRu: "方針（ほうしん）= курс, направление политики." },
  { id: "ex2-v05", atSec: 0, kind: "listening_mcq", promptRu: "「実績」の意味は？", optionsRu: ["Достижение / результаты", "Теория", "Надежда", "Провал"], correctIndex: 0, explanationRu: "実績（じっせき）= реальные достижения, послужной список." },
  { id: "ex2-v06", atSec: 0, kind: "listening_mcq", promptRu: "「把握する」の意味は？", optionsRu: ["Понимать / держать под контролем", "Отказывать", "Соглашаться", "Извиняться"], correctIndex: 0, explanationRu: "把握する（はあくする）= понимать ситуацию, охватывать." },
  { id: "ex2-v07", atSec: 0, kind: "listening_mcq", promptRu: "「交渉」の意味は？", optionsRu: ["Переговоры", "Поездка", "Презентация", "Увольнение"], correctIndex: 0, explanationRu: "交渉（こうしょう）= переговоры." },
  { id: "ex2-v08", atSec: 0, kind: "listening_mcq", promptRu: "「妥当」の意味は？", optionsRu: ["Чрезмерный", "Уместный / разумный", "Устаревший", "Случайный"], correctIndex: 1, explanationRu: "妥当（だとう）= уместный, надлежащий." },
  { id: "ex2-v09", atSec: 0, kind: "listening_mcq", promptRu: "「見解」の意味は？", optionsRu: ["Мнение / точка зрения", "Внешний вид", "Структура", "Документ"], correctIndex: 0, explanationRu: "見解（けんかい）= мнение, точка зрения (формальн.)." },
  { id: "ex2-v10", atSec: 0, kind: "listening_mcq", promptRu: "「検討する」の意味は？", optionsRu: ["Рассмотреть / изучить", "Отклонить", "Утвердить", "Отменить"], correctIndex: 0, explanationRu: "検討する（けんとうする）= рассмотреть, обдумать." },
  { id: "ex2-v11", atSec: 0, kind: "listening_mcq", promptRu: "「貢献する」の意味は？", optionsRu: ["Вносить вклад", "Мешать", "Осуждать", "Избегать"], correctIndex: 0, explanationRu: "貢献する（こうけんする）= вносить вклад." },
  { id: "ex2-v12", atSec: 0, kind: "listening_mcq", promptRu: "「指摘する」の意味は？", optionsRu: ["Указывать (на проблему)", "Одобрять", "Скрывать", "Хвалить"], correctIndex: 0, explanationRu: "指摘する（してきする）= указывать, отмечать." },
  { id: "ex2-v13", atSec: 0, kind: "listening_mcq", promptRu: "「前提」の意味は？", optionsRu: ["Предпосылка / условие", "Результат", "Заключение", "Пример"], correctIndex: 0, explanationRu: "前提（ぜんてい）= предпосылка, основное условие." },
  { id: "ex2-v14", atSec: 0, kind: "listening_mcq", promptRu: "「分析する」の意味は？", optionsRu: ["Анализировать", "Синтезировать", "Упрощать", "Игнорировать"], correctIndex: 0, explanationRu: "分析する（ぶんせきする）= анализировать." },
  { id: "ex2-v15", atSec: 0, kind: "listening_mcq", promptRu: "「根拠」の意味は？", optionsRu: ["Основание / довод", "Пример", "Следствие", "Гипотеза"], correctIndex: 0, explanationRu: "根拠（こんきょ）= основание, довод." },
  { id: "ex2-v16", atSec: 0, kind: "listening_mcq", promptRu: "「膨大」の意味は？", optionsRu: ["Огромный / колоссальный", "Мизерный", "Точный", "Средний"], correctIndex: 0, explanationRu: "膨大（ぼうだい）= огромный, колоссальный." },
  { id: "ex2-v17", atSec: 0, kind: "listening_mcq", promptRu: "「対策」の意味は？", optionsRu: ["Меры / контрмеры", "Причина", "Проблема", "Условие"], correctIndex: 0, explanationRu: "対策（たいさく）= меры, контрмеры." },
  { id: "ex2-v18", atSec: 0, kind: "listening_mcq", promptRu: "「傾向」の意味は？", optionsRu: ["Тенденция", "Факт", "Исключение", "Прецедент"], correctIndex: 0, explanationRu: "傾向（けいこう）= тенденция, склонность." },
  { id: "ex2-v19", atSec: 0, kind: "listening_mcq", promptRu: "「妨げる」の意味は？", optionsRu: ["Помогать", "Препятствовать", "Ускорять", "Соглашаться"], correctIndex: 1, explanationRu: "妨げる（さまたげる）= препятствовать, мешать." },
  { id: "ex2-v20", atSec: 0, kind: "listening_mcq", promptRu: "「促す」の意味は？", optionsRu: ["Замедлять", "Побуждать / содействовать", "Запрещать", "Отменять"], correctIndex: 1, explanationRu: "促す（うながす）= побуждать, стимулировать." },
];

// ─── N2 Kanji (20) ──────────────────────────────────────────────────

export const EX_N2_KANJI: KanjiTranslateQuestion[] = [
  { id: "ex2-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「解決」.", kanji: "解決", acceptedRu: ["решение", "разрешение"], hintRu: "かいけつ" },
  { id: "ex2-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「提案」.", kanji: "提案", acceptedRu: ["предложение"], hintRu: "ていあん" },
  { id: "ex2-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「効率」.", kanji: "効率", acceptedRu: ["эффективность"], hintRu: "こうりつ" },
  { id: "ex2-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「構造」.", kanji: "構造", acceptedRu: ["структура", "конструкция"], hintRu: "こうぞう" },
  { id: "ex2-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「現象」.", kanji: "現象", acceptedRu: ["явление", "феномен"], hintRu: "げんしょう" },
  { id: "ex2-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「状態」.", kanji: "状態", acceptedRu: ["состояние", "положение"], hintRu: "じょうたい" },
  { id: "ex2-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「報告」.", kanji: "報告", acceptedRu: ["отчёт", "доклад", "рапорт"], hintRu: "ほうこく" },
  { id: "ex2-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「供給」.", kanji: "供給", acceptedRu: ["снабжение", "поставка", "предложение"], hintRu: "きょうきゅう" },
  { id: "ex2-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「需要」.", kanji: "需要", acceptedRu: ["спрос", "потребность"], hintRu: "じゅよう" },
  { id: "ex2-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「維持」.", kanji: "維持", acceptedRu: ["поддержание", "сохранение"], hintRu: "いじ" },
  { id: "ex2-k11", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「展開」.", kanji: "展開", acceptedRu: ["развёртывание", "развитие"], hintRu: "てんかい" },
  { id: "ex2-k12", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「実施」.", kanji: "実施", acceptedRu: ["проведение", "осуществление", "реализация"], hintRu: "じっし" },
  { id: "ex2-k13", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「規模」.", kanji: "規模", acceptedRu: ["масштаб", "размер"], hintRu: "きぼ" },
  { id: "ex2-k14", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「成果」.", kanji: "成果", acceptedRu: ["результат", "достижение", "плоды"], hintRu: "せいか" },
  { id: "ex2-k15", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「対象」.", kanji: "対象", acceptedRu: ["объект", "предмет", "целевая аудитория"], hintRu: "たいしょう" },
  { id: "ex2-k16", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「基盤」.", kanji: "基盤", acceptedRu: ["основа", "база", "фундамент"], hintRu: "きばん" },
  { id: "ex2-k17", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「手段」.", kanji: "手段", acceptedRu: ["средство", "способ", "метод"], hintRu: "しゅだん" },
  { id: "ex2-k18", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「措置」.", kanji: "措置", acceptedRu: ["мера", "меры", "действие"], hintRu: "そち" },
  { id: "ex2-k19", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「傾向」.", kanji: "傾向", acceptedRu: ["тенденция", "склонность"], hintRu: "けいこう" },
  { id: "ex2-k20", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「要因」.", kanji: "要因", acceptedRu: ["фактор", "причина"], hintRu: "よういん" },
];

// ─── N2 Word Order (15) ─────────────────────────────────────────────

export const EX_N2_WORD_ORDER: WordOrderQuestion[] = [
  { id: "ex2-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Этот проект длился три года.»", words: ["行われた", "にわたって", "この工事は", "三年"], correctOrder: [2, 3, 1, 0], explanationRu: "この工事は三年にわたって行われた。" },
  { id: "ex2-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Независимо от возраста, можно участвовать.»", words: ["参加できる", "を問わず", "年齢"], correctOrder: [2, 1, 0], explanationRu: "年齢を問わず参加できる。" },
  { id: "ex2-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Хотя знал, что дорого, купил.»", words: ["買ってしまった", "ものの", "と知っている", "高い"], correctOrder: [3, 2, 1, 0], explanationRu: "高いと知っているものの、買ってしまった。" },
  { id: "ex2-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Раз уж пообещал, нужно сдержать.»", words: ["守らなければならない", "以上", "約束した"], correctOrder: [2, 1, 0], explanationRu: "約束した以上、守らなければならない。" },
  { id: "ex2-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «Не то что помог — наоборот, помешал.»", words: ["邪魔をした", "どころか", "手伝う"], correctOrder: [2, 1, 0], explanationRu: "手伝うどころか、邪魔をした。" },
  { id: "ex2-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Не только японский, но и китайский знает.»", words: ["話せる", "も", "中国語", "ばかりか", "日本語"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "日本語ばかりか、中国語も話せる。" },
  { id: "ex2-w07", atSec: 0, kind: "word_order", promptRu: "Соберите: «Это не что иное, как результат усилий.»", words: ["にほかならない", "の結果", "努力"], correctOrder: [2, 1, 0], explanationRu: "努力の結果にほかならない。" },
  { id: "ex2-w08", atSec: 0, kind: "word_order", promptRu: "Соберите: «Больше никогда так не сделаю.»", words: ["するまい", "ことは", "そんな", "二度と"], correctOrder: [3, 2, 1, 0], explanationRu: "二度とそんなことはするまい。" },
  { id: "ex2-w09", atSec: 0, kind: "word_order", promptRu: "Соберите: «Не закрывай дверь оставленной открытой.»", words: ["しないで", "にー", "開けっぱなし", "ドアを"], correctOrder: [3, 2, 1, 0], explanationRu: "ドアを開けっぱなしにしないで。" },
  { id: "ex2-w10", atSec: 0, kind: "word_order", promptRu: "Соберите: «Вынужден идти.»", words: ["を得ない", "行か", "ざる"], correctOrder: [1, 2, 0], explanationRu: "行かざるを得ない。" },
  { id: "ex2-w11", atSec: 0, kind: "word_order", promptRu: "Соберите: «Есть риск большого землетрясения.»", words: ["かねない", "が", "大地震", "起き"], correctOrder: [2, 1, 3, 0], explanationRu: "大地震が起きかねない。" },
  { id: "ex2-w12", atSec: 0, kind: "word_order", promptRu: "Соберите: «Давайте поговорим серьёзно, без шуток.»", words: ["話そう", "真剣に", "抜きにして", "冗談"], correctOrder: [3, 2, 1, 0], explanationRu: "冗談抜きにして、真剣に話そう。" },
  { id: "ex2-w13", atSec: 0, kind: "word_order", promptRu: "Соберите: «Насколько мне известно, он не врёт.»", words: ["嘘をつかない", "限り", "知っている", "彼は"], correctOrder: [2, 1, 3, 0], explanationRu: "知っている限り、彼は嘘をつかない。" },
  { id: "ex2-w14", atSec: 0, kind: "word_order", promptRu: "Соберите: «С тех пор как встретились, связи нет.»", words: ["連絡がない", "きり", "会った", "以来"], correctOrder: [3, 2, 1, 0], explanationRu: "以来、会ったきり連絡がない。" },
  { id: "ex2-w15", atSec: 0, kind: "word_order", promptRu: "Соберите: «Через интернет получают информацию.»", words: ["得る", "を", "情報", "を通じて", "インターネット"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "インターネットを通じて情報を得る。" },
];

// ─── N2 Fill-in-the-Blank (15) ──────────────────────────────────────

export const EX_N2_FILL: FillBlankQuestion[] = [
  { id: "ex2-f01", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: この研究は十年___行われた。(на протяжении)", sentenceJa: "この研究は十年___行われた。", blankIndex: 0, acceptedAnswers: ["にわたって"], explanationRu: "にわたって = на протяжении." },
  { id: "ex2-f02", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 後輩___厳しく言った。(по отношению к)", sentenceJa: "後輩___厳しく言った。", blankIndex: 0, acceptedAnswers: ["に対して"], explanationRu: "に対して = по отношению к." },
  { id: "ex2-f03", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 性別___応募できる。(независимо от)", sentenceJa: "性別___応募できる。", blankIndex: 0, acceptedAnswers: ["を問わず"], explanationRu: "を問わず = независимо от." },
  { id: "ex2-f04", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 高いと思った___、買った。(хотя)", sentenceJa: "高いと思った___、買った。", blankIndex: 0, acceptedAnswers: ["ものの"], explanationRu: "ものの = хотя, несмотря на." },
  { id: "ex2-f05", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 知っている___教えない。(хотя — с упрёком)", sentenceJa: "知っている___教えない。", blankIndex: 0, acceptedAnswers: ["くせに"], explanationRu: "くせに = хотя (упрёк)." },
  { id: "ex2-f06", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 引き受けた___、最後までやる。(раз уж)", sentenceJa: "引き受けた___、最後までやる。", blankIndex: 0, acceptedAnswers: ["以上", "以上は"], explanationRu: "以上 = раз уж." },
  { id: "ex2-f07", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 休む___邪魔をした。(не то что… а наоборот)", sentenceJa: "休む___邪魔をした。", blankIndex: 0, acceptedAnswers: ["どころか"], explanationRu: "どころか = не то чтобы… наоборот." },
  { id: "ex2-f08", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 会員___割引あり。(только для)", sentenceJa: "会員___割引あり。", blankIndex: 0, acceptedAnswers: ["に限り"], explanationRu: "に限り = только для." },
  { id: "ex2-f09", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 事故が起き___。(есть риск)", sentenceJa: "事故が起き___。", blankIndex: 0, acceptedAnswers: ["かねない"], explanationRu: "かねない = есть риск, что…" },
  { id: "ex2-f10", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 賛成し___。(затрудняюсь — вежл. отказ)", sentenceJa: "賛成し___。", blankIndex: 0, acceptedAnswers: ["かねます"], explanationRu: "かねる = затрудняюсь (вежл. отказ)." },
  { id: "ex2-f11", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 出席せ___を得ない。(вынужден)", sentenceJa: "出席せ___を得ない。", blankIndex: 0, acceptedAnswers: ["ざる"], explanationRu: "ざるを得ない = вынужден." },
  { id: "ex2-f12", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 努力の結果に___。(не что иное, как)", sentenceJa: "努力の結果に___。", blankIndex: 0, acceptedAnswers: ["ほかならない"], explanationRu: "にほかならない = не что иное, как." },
  { id: "ex2-f13", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 二度とする___。(не сделаю)", sentenceJa: "二度とする___。", blankIndex: 0, acceptedAnswers: ["まい"], explanationRu: "まい = не буду (решимость)." },
  { id: "ex2-f14", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: エアコンをつけ___にしないで。(оставлять включённым)", sentenceJa: "エアコンをつけ___にしないで。", blankIndex: 0, acceptedAnswers: ["っぱなし"], explanationRu: "っぱなし = оставлять (как есть)." },
  { id: "ex2-f15", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 調べた___、もう売り切れだった。(когда проверил, оказалось)", sentenceJa: "調べた___、もう売り切れだった。", blankIndex: 0, acceptedAnswers: ["ところ"], explanationRu: "たところ = когда (сделал), оказалось." },
];

// ─── N2 Numbers (15) ────────────────────────────────────────────────

export const EX_N2_NUMBERS: NumberAudioQuestion[] = [
  { id: "ex2-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте статистику и запишите число.", audioText: "やく さんじゅうろくパーセント", acceptedAnswers: ["約36%", "36%"], explanationRu: "約36% = приблизительно 36%." },
  { id: "ex2-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "にひゃくごじゅうまんにん", acceptedAnswers: ["250万人", "2500000人", "2500000"], explanationRu: "二百五十万人 = 2 500 000 человек." },
  { id: "ex2-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите сумму.", audioText: "さんぜんにひゃくおくえん", acceptedAnswers: ["3200億円", "320000000000円"], explanationRu: "三千二百億円 = 320 миллиардов иен." },
  { id: "ex2-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте статистику и запишите.", audioText: "ろくじゅうはちてんごパーセント", acceptedAnswers: ["68.5%", "68.5パーセント"], explanationRu: "68.5% = ろくじゅうはちてんごパーセント." },
  { id: "ex2-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "いちおくにせんまんにん", acceptedAnswers: ["1億2000万人", "1億2千万人", "120000000"], explanationRu: "一億二千万人 ≈ население Японии." },
  { id: "ex2-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте число и запишите.", audioText: "ろっぴゃくまんだい", acceptedAnswers: ["600万台", "6000000台"], explanationRu: "六百万台 = 6 миллионов единиц (техники)." },
  { id: "ex2-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте статистику и запишите.", audioText: "やく じゅうにてんさんパーセントげんしょう", acceptedAnswers: ["約12.3%減少", "12.3%減少", "12.3%"], explanationRu: "約12.3%減少 = снижение примерно на 12.3%." },
  { id: "ex2-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "ごせんおくドル", acceptedAnswers: ["5000億ドル", "500000000000ドル"], explanationRu: "五千億ドル = 500 миллиардов долларов." },
  { id: "ex2-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите год.", audioText: "にせんじゅうはちねんど", acceptedAnswers: ["2018年度", "2018"], explanationRu: "二千十八年度 = 2018 финансовый год." },
  { id: "ex2-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите число.", audioText: "はっせんまんけん", acceptedAnswers: ["8000万件", "80000000件"], explanationRu: "八千万件 = 80 миллионов случаев." },
  { id: "ex2-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "さんじゅうよんてんななパーセント", acceptedAnswers: ["34.7%", "34.7パーセント"], explanationRu: "34.7%." },
  { id: "ex2-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "よんじゅっちょうえん", acceptedAnswers: ["40兆円", "40000000000000円"], explanationRu: "四十兆円 = 40 триллионов иен." },
  { id: "ex2-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "やく さんびゃくろくじゅうまんにん", acceptedAnswers: ["約360万人", "360万人", "3600000"], explanationRu: "約三百六十万人 = примерно 3 600 000 человек." },
  { id: "ex2-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "ごじゅういちてんにパーセント", acceptedAnswers: ["51.2%", "51.2パーセント"], explanationRu: "51.2%." },
  { id: "ex2-n15", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "じゅうごおくにん", acceptedAnswers: ["15億人", "1500000000人"], explanationRu: "十五億人 = 1.5 миллиарда человек." },
];

// ─── N2 Dialogues (15) ──────────────────────────────────────────────

export const EX_N2_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "ex2-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что начальник попросил подчинённого?",
    dialogueLines: [
      { speaker: "部長", ja: "田中くん、来週の会議の資料を準備してもらえるかな。" },
      { speaker: "田中", ja: "はい、金曜日までにお渡しします。" },
    ],
    optionsRu: ["Провести встречу", "Подготовить материалы для совещания", "Отменить совещание", "Перенести встречу"],
    correctIndex: 1,
    explanationRu: "会議の資料を準備する = подготовить материалы для совещания.",
  },
  {
    id: "ex2-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "Почему проект задерживается?",
    dialogueLines: [
      { speaker: "社員A", ja: "このプロジェクト、予定より遅れていますね。" },
      { speaker: "社員B", ja: "クライアントからの仕様変更が多くて、対応に時間がかかっているんです。" },
    ],
    optionsRu: ["Нехватка бюджета", "Частые изменения требований клиента", "Болезнь сотрудников", "Технические проблемы"],
    correctIndex: 1,
    explanationRu: "仕様変更が多い = много изменений в спецификации.",
  },
  {
    id: "ex2-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какое решение предлагает женщина?",
    dialogueLines: [
      { speaker: "男", ja: "売り上げが落ちているんですが、どうしましょう。" },
      { speaker: "女", ja: "まずは市場分析をした上で、新しい戦略を検討しましょう。" },
    ],
    optionsRu: ["Снизить цены", "Провести анализ рынка и рассмотреть стратегию", "Уволить сотрудников", "Ничего не менять"],
    correctIndex: 1,
    explanationRu: "市場分析をした上で新しい戦略を検討する.",
  },
  {
    id: "ex2-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём договорились на переговорах?",
    dialogueLines: [
      { speaker: "A社", ja: "納期を一週間延ばしていただけませんか。" },
      { speaker: "B社", ja: "品質を維持する前提であれば、問題ありません。" },
    ],
    optionsRu: ["Снизить цену", "Продлить срок на неделю при сохранении качества", "Отменить заказ", "Увеличить объём"],
    correctIndex: 1,
    explanationRu: "納期を延ばす + 品質を維持する前提 = продлить срок при сохранении качества.",
  },
  {
    id: "ex2-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что обсуждают коллеги?",
    dialogueLines: [
      { speaker: "女", ja: "新入社員の研修プログラム、見直すべきじゃないですか。" },
      { speaker: "男", ja: "そうですね。現場の声を踏まえて改善しましょう。" },
    ],
    optionsRu: ["Увольнение новичков", "Пересмотр программы обучения", "Повышение зарплат", "Новый офис"],
    correctIndex: 1,
    explanationRu: "研修プログラムを見直す = пересмотреть программу обучения.",
  },
  {
    id: "ex2-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую проблему описывает докладчик?",
    dialogueLines: [
      { speaker: "報告者", ja: "今期の利益は前年比で15%減少しました。" },
      { speaker: "上司", ja: "原因の分析と対策を早急にまとめてください。" },
    ],
    optionsRu: ["Рост прибыли", "Падение прибыли на 15%", "Увеличение штата", "Новый проект"],
    correctIndex: 1,
    explanationRu: "利益は15%減少 = прибыль снизилась на 15%.",
  },
  {
    id: "ex2-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Почему клиент недоволен?",
    dialogueLines: [
      { speaker: "客", ja: "先月注文した商品がまだ届いていないのですが。" },
      { speaker: "社員", ja: "大変申し訳ございません。すぐに確認いたします。" },
    ],
    optionsRu: ["Товар повреждён", "Товар не доставлен", "Цена выросла", "Не тот товар"],
    correctIndex: 1,
    explanationRu: "商品がまだ届いていない = товар ещё не доставлен.",
  },
  {
    id: "ex2-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что предлагает мужчина для повышения эффективности?",
    dialogueLines: [
      { speaker: "女", ja: "業務の効率が悪いと思いませんか。" },
      { speaker: "男", ja: "会議の回数を減らして、メールで済むことはメールにしましょう。" },
    ],
    optionsRu: ["Нанять больше людей", "Сократить совещания и использовать почту", "Купить новое ПО", "Увеличить рабочие часы"],
    correctIndex: 1,
    explanationRu: "会議を減らしてメールにする = сократить совещания и использовать почту.",
  },
  {
    id: "ex2-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что сообщает представитель компании?",
    dialogueLines: [
      { speaker: "広報", ja: "弊社は来年度から海外展開を本格化させます。" },
      { speaker: "記者", ja: "具体的にはどの地域を対象にされますか。" },
    ],
    optionsRu: ["Сокращение штата", "Полномасштабный выход на зарубежный рынок", "Слияние с другой компанией", "Закрытие филиалов"],
    correctIndex: 1,
    explanationRu: "海外展開を本格化 = полномасштабный выход за рубеж.",
  },
  {
    id: "ex2-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какое условие ставит профессор?",
    dialogueLines: [
      { speaker: "学生", ja: "論文の提出期限を延ばしていただけませんか。" },
      { speaker: "教授", ja: "参考文献リストを先に提出する限り、一週間延ばしましょう。" },
    ],
    optionsRu: ["Сдать черновик", "Сначала сдать список литературы", "Переписать введение", "Прийти на консультацию"],
    correctIndex: 1,
    explanationRu: "参考文献リストを先に提出する限り = при условии, что список литературы будет сдан раньше.",
  },
  {
    id: "ex2-d11", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём докладывает аналитик?",
    dialogueLines: [
      { speaker: "分析者", ja: "若者のテレビ離れが加速しています。動画配信サービスへの移行が要因と考えられます。" },
      { speaker: "上司", ja: "なるほど。詳しいデータを出してください。" },
    ],
    optionsRu: ["Рост продаж ТВ", "Молодёжь уходит от ТВ к стримингу", "Новый ТВ-канал", "Рост рекламы"],
    correctIndex: 1,
    explanationRu: "テレビ離れ + 動画配信への移行 = уход от ТВ к стримингу.",
  },
  {
    id: "ex2-d12", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что решили сделать с расписанием?",
    dialogueLines: [
      { speaker: "社員A", ja: "今のスケジュールでは無理があります。" },
      { speaker: "社員B", ja: "では、優先順位を見直して、重要なタスクに集中しましょう。" },
    ],
    optionsRu: ["Отменить всё", "Пересмотреть приоритеты и сосредоточиться на важном", "Нанять фрилансеров", "Работать сверхурочно"],
    correctIndex: 1,
    explanationRu: "優先順位を見直して重要なタスクに集中 = пересмотреть приоритеты.",
  },
  {
    id: "ex2-d13", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что профессор думает о студенческой работе?",
    dialogueLines: [
      { speaker: "教授", ja: "内容は悪くないが、根拠が弱い。もっとデータを集めなさい。" },
      { speaker: "学生", ja: "分かりました。調査を追加します。" },
    ],
    optionsRu: ["Отлично написано", "Содержание неплохое, но недостаточно данных", "Нужно переписать", "Тема неинтересна"],
    correctIndex: 1,
    explanationRu: "内容は悪くないが根拠が弱い = содержание неплохое, но доказательства слабые.",
  },
  {
    id: "ex2-d14", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую тенденцию обсуждают?",
    dialogueLines: [
      { speaker: "A", ja: "少子高齢化の影響で、労働力不足が深刻化しています。" },
      { speaker: "B", ja: "外国人労働者の受け入れを拡大せざるを得ないでしょう。" },
    ],
    optionsRu: ["Рост рождаемости", "Нехватка рабочей силы из-за старения населения", "Безработица молодёжи", "Перенаселение"],
    correctIndex: 1,
    explanationRu: "少子高齢化 + 労働力不足 = нехватка рабочей силы из-за старения населения.",
  },
  {
    id: "ex2-d15", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что просит клиент?",
    dialogueLines: [
      { speaker: "客", ja: "契約内容を変更したいのですが、手続きはどうなりますか。" },
      { speaker: "担当", ja: "書面での申請が必要です。フォームをお送りしますね。" },
    ],
    optionsRu: ["Расторгнуть договор", "Изменить условия договора", "Продлить договор", "Заключить новый договор"],
    correctIndex: 1,
    explanationRu: "契約内容を変更したい = хочет изменить условия договора.",
  },
];

// ╔══════════════════════════════════════════════════════════════════╗
// ║                         N1 EXERCISES                            ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── N1 Grammar (25) ────────────────────────────────────────────────

export const EX_N1_GRAMMAR: ListeningMcqQuestion[] = [
  { id: "ex1-g01", atSec: 0, kind: "listening_mcq", promptRu: "「困難をものともせずに前進した」— что значит をものともせずに?", optionsRu: ["Из-за трудностей", "Не считаясь с трудностями", "Благодаря трудностям", "Избегая трудности"], correctIndex: 1, explanationRu: "をものともせずに = не считаясь с, невзирая на." },
  { id: "ex1-g02", atSec: 0, kind: "listening_mcq", promptRu: "「一瞬たりとも油断できない」— что значит たりとも?", optionsRu: ["Даже (ни на секунду)", "Иногда", "Обычно", "Часто"], correctIndex: 0, explanationRu: "たりとも = даже, ни на (минимальную единицу)." },
  { id: "ex1-g03", atSec: 0, kind: "listening_mcq", promptRu: "「その映画は観客を感動させずにはおかない」— что значит ずにはおかない?", optionsRu: ["Не может не (вызвать)", "Может не вызвать", "Не хочет вызывать", "Иногда вызывает"], correctIndex: 0, explanationRu: "ずにはおかない = не может не, неизбежно (вызовет)." },
  { id: "ex1-g04", atSec: 0, kind: "listening_mcq", promptRu: "「見るともなく窓の外を見ていた」— что значит ともなく?", optionsRu: ["Внимательно", "Без определённого намерения", "Специально", "С интересом"], correctIndex: 1, explanationRu: "ともなく = без определённого намерения, машинально." },
  { id: "ex1-g05", atSec: 0, kind: "listening_mcq", promptRu: "「彼の成功は想像にかたくない」— что значит にかたくない?", optionsRu: ["Трудно представить", "Нетрудно представить", "Невозможно", "Неожиданно"], correctIndex: 1, explanationRu: "にかたくない = нетрудно (представить, понять)." },
  { id: "ex1-g06", atSec: 0, kind: "listening_mcq", promptRu: "「周囲の反対をよそに、彼は計画を進めた」— что значит をよそに?", optionsRu: ["Благодаря", "Игнорируя / не обращая внимания на", "Из-за", "В соответствии с"], correctIndex: 1, explanationRu: "をよそに = игнорируя, не обращая внимания на." },
  { id: "ex1-g07", atSec: 0, kind: "listening_mcq", promptRu: "「東京公演を皮切りに全国ツアーが始まった」— что значит を皮切りに?", optionsRu: ["Начиная с", "Заканчивая", "Кроме", "Вместо"], correctIndex: 0, explanationRu: "を皮切りに = начиная с (первого мероприятия)." },
  { id: "ex1-g08", atSec: 0, kind: "listening_mcq", promptRu: "「兄にひきかえ、弟は真面目だ」— что значит にひきかえ?", optionsRu: ["Так же как", "В отличие от / в противоположность", "Благодаря", "Подобно"], correctIndex: 1, explanationRu: "にひきかえ = в отличие от, в противоположность." },
  { id: "ex1-g09", atSec: 0, kind: "listening_mcq", promptRu: "「教育はとりもなおさず国の未来である」— что значит とりもなおさず?", optionsRu: ["Это и есть / не что иное, как", "Это не", "Возможно", "Иногда"], correctIndex: 0, explanationRu: "とりもなおさず = не что иное, как; это и есть." },
  { id: "ex1-g10", atSec: 0, kind: "listening_mcq", promptRu: "「京都ならではの風景だ」— что значит ならではの?", optionsRu: ["Присущий только (Киото)", "Несмотря на", "Кроме", "Без"], correctIndex: 0, explanationRu: "ならではの = присущий только, возможный только для." },
  { id: "ex1-g11", atSec: 0, kind: "listening_mcq", promptRu: "「彼の態度は失礼極まりない」— что значит 極まりない?", optionsRu: ["Немного", "Крайне / чрезвычайно", "Совсем не", "Слегка"], correctIndex: 1, explanationRu: "極まりない = крайне, в высшей степени." },
  { id: "ex1-g12", atSec: 0, kind: "listening_mcq", promptRu: "「住民は立ち退きを余儀なくされた」— что значит を余儀なくされる?", optionsRu: ["Добровольно", "Быть вынужденным", "С радостью", "Отказаться"], correctIndex: 1, explanationRu: "を余儀なくされる = быть вынужденным (против воли)." },
  { id: "ex1-g13", atSec: 0, kind: "listening_mcq", promptRu: "「勝利せんがために全力を尽くした」— что значит んがため?", optionsRu: ["Ради / с целью (книжн.)", "Несмотря на", "Вместо", "Без"], correctIndex: 0, explanationRu: "んがため = ради, с целью (архаичный/книжный стиль)." },
  { id: "ex1-g14", atSec: 0, kind: "listening_mcq", promptRu: "「家族あっての幸せだ」— что значит あっての?", optionsRu: ["Без семьи", "Только благодаря семье", "Вопреки семье", "Кроме семьи"], correctIndex: 1, explanationRu: "あっての = только благодаря, невозможно без." },
  { id: "ex1-g15", atSec: 0, kind: "listening_mcq", promptRu: "「やれないものでもない」— что значит ないものでもない?", optionsRu: ["Совершенно невозможно", "Не то чтобы невозможно", "Точно возможно", "Запрещено"], correctIndex: 1, explanationRu: "ないものでもない = не то чтобы невозможно (есть шанс)." },
  { id: "ex1-g16", atSec: 0, kind: "listening_mcq", promptRu: "「人気歌手のコンサートとあって、チケットはすぐ売り切れた」— что значит とあって?", optionsRu: ["Поскольку / ввиду того что", "Несмотря на", "Если", "Без"], correctIndex: 0, explanationRu: "とあって = поскольку, ввиду особых обстоятельств." },
  { id: "ex1-g17", atSec: 0, kind: "listening_mcq", promptRu: "「結局、謝らずじまいだった」— что значит ずじまい?", optionsRu: ["Извинился", "Так и не (извинился)", "Хотел извиниться", "Извинился дважды"], correctIndex: 1, explanationRu: "ずじまい = так и не (сделал до конца)." },
  { id: "ex1-g18", atSec: 0, kind: "listening_mcq", promptRu: "「仕事のかたわら、ボランティア活動をしている」— что значит かたわら?", optionsRu: ["Вместо работы", "Наряду с работой / помимо", "Из-за работы", "После работы"], correctIndex: 1, explanationRu: "かたわら = наряду с, помимо (основного дела)." },
  { id: "ex1-g19", atSec: 0, kind: "listening_mcq", promptRu: "「去年にもまして今年は忙しい」— что значит にもまして?", optionsRu: ["Меньше, чем", "Ещё больше, чем", "Так же, как", "Вместо"], correctIndex: 1, explanationRu: "にもまして = ещё больше/сильнее, чем." },
  { id: "ex1-g20", atSec: 0, kind: "listening_mcq", promptRu: "「散歩がてら買い物に行った」— что значит がてら?", optionsRu: ["Заодно с / по пути", "Вместо", "Несмотря на", "После"], correctIndex: 0, explanationRu: "がてら = заодно, по ходу дела." },
  { id: "ex1-g21", atSec: 0, kind: "listening_mcq", promptRu: "「反対の声をものともせずに改革を進めた」— что выражает をものともせずに в данном контексте?", optionsRu: ["Уступил давлению", "Невзирая на протесты, продвигал реформы", "Из-за протестов остановил", "Согласился с критикой"], correctIndex: 1, explanationRu: "をものともせずに = невзирая на (преграды)." },
  { id: "ex1-g22", atSec: 0, kind: "listening_mcq", promptRu: "「被害は想像を絶するものだった」— что значит を絶する?", optionsRu: ["В пределах воображения", "Превосходящий (воображение)", "Легко представить", "Незначительный"], correctIndex: 1, explanationRu: "を絶する = превосходящий, выходящий за рамки." },
  { id: "ex1-g23", atSec: 0, kind: "listening_mcq", promptRu: "「この伝統は何世紀にもわたって受け継がれてきた」— что значит にもわたって?", optionsRu: ["На протяжении (многих веков)", "Кроме", "Вместо", "Из-за"], correctIndex: 0, explanationRu: "にもわたって = на протяжении (усиление)." },
  { id: "ex1-g24", atSec: 0, kind: "listening_mcq", promptRu: "「彼女の演技は観客を魅了せずにはおかなかった」— что выражает ずにはおかなかった?", optionsRu: ["Не смогла очаровать", "Не могла не очаровать", "Хотела очаровать", "Случайно очаровала"], correctIndex: 1, explanationRu: "ずにはおかない = неизбежно (очаровала)." },
  { id: "ex1-g25", atSec: 0, kind: "listening_mcq", promptRu: "「彼の功績なくしては今の成功はなかった」— что значит なくしては?", optionsRu: ["Благодаря", "Без (этого было бы невозможно)", "Несмотря на", "Вместо"], correctIndex: 1, explanationRu: "なくしては = без (чего-то не было бы результата)." },
];

// ─── N1 Vocabulary (20) ─────────────────────────────────────────────

export const EX_N1_VOCAB: ListeningMcqQuestion[] = [
  { id: "ex1-v01", atSec: 0, kind: "listening_mcq", promptRu: "「克服」の意味は？", optionsRu: ["Преодоление", "Поражение", "Уступка", "Отступление"], correctIndex: 0, explanationRu: "克服（こくふく）= преодоление." },
  { id: "ex1-v02", atSec: 0, kind: "listening_mcq", promptRu: "「衰退」の意味は？", optionsRu: ["Расцвет", "Упадок", "Расширение", "Стабильность"], correctIndex: 1, explanationRu: "衰退（すいたい）= упадок, деградация." },
  { id: "ex1-v03", atSec: 0, kind: "listening_mcq", promptRu: "「拒絶」の意味は？", optionsRu: ["Принятие", "Отвержение", "Одобрение", "Сомнение"], correctIndex: 1, explanationRu: "拒絶（きょぜつ）= отвержение, категорический отказ." },
  { id: "ex1-v04", atSec: 0, kind: "listening_mcq", promptRu: "「抽象」の意味は？", optionsRu: ["Конкретный", "Абстрактный", "Реальный", "Простой"], correctIndex: 1, explanationRu: "抽象（ちゅうしょう）= абстракция, отвлечённость." },
  { id: "ex1-v05", atSec: 0, kind: "listening_mcq", promptRu: "「概念」の意味は？", optionsRu: ["Понятие / концепция", "Деталь", "Факт", "Пример"], correctIndex: 0, explanationRu: "概念（がいねん）= понятие, концепция." },
  { id: "ex1-v06", atSec: 0, kind: "listening_mcq", promptRu: "「肯定」の意味は？", optionsRu: ["Утверждение / одобрение", "Отрицание", "Сомнение", "Критика"], correctIndex: 0, explanationRu: "肯定（こうてい）= утверждение, одобрение." },
  { id: "ex1-v07", atSec: 0, kind: "listening_mcq", promptRu: "「否定」の意味は？", optionsRu: ["Утверждение", "Отрицание", "Согласие", "Восхищение"], correctIndex: 1, explanationRu: "否定（ひてい）= отрицание." },
  { id: "ex1-v08", atSec: 0, kind: "listening_mcq", promptRu: "「排除」の意味は？", optionsRu: ["Включение", "Исключение / устранение", "Добавление", "Объединение"], correctIndex: 1, explanationRu: "排除（はいじょ）= исключение, устранение." },
  { id: "ex1-v09", atSec: 0, kind: "listening_mcq", promptRu: "「促進」の意味は？", optionsRu: ["Замедление", "Содействие / стимулирование", "Запрет", "Ограничение"], correctIndex: 1, explanationRu: "促進（そくしん）= содействие, стимулирование." },
  { id: "ex1-v10", atSec: 0, kind: "listening_mcq", promptRu: "「抑制」の意味は？", optionsRu: ["Стимулирование", "Подавление / сдерживание", "Расширение", "Поддержка"], correctIndex: 1, explanationRu: "抑制（よくせい）= подавление, сдерживание." },
  { id: "ex1-v11", atSec: 0, kind: "listening_mcq", promptRu: "「妥協」の意味は？", optionsRu: ["Компромисс", "Конфликт", "Победа", "Поражение"], correctIndex: 0, explanationRu: "妥協（だきょう）= компромисс." },
  { id: "ex1-v12", atSec: 0, kind: "listening_mcq", promptRu: "「繁栄」の意味は？", optionsRu: ["Процветание", "Упадок", "Застой", "Кризис"], correctIndex: 0, explanationRu: "繁栄（はんえい）= процветание." },
  { id: "ex1-v13", atSec: 0, kind: "listening_mcq", promptRu: "「衝突」の意味は？", optionsRu: ["Столкновение / конфликт", "Соглашение", "Сотрудничество", "Отступление"], correctIndex: 0, explanationRu: "衝突（しょうとつ）= столкновение, конфликт." },
  { id: "ex1-v14", atSec: 0, kind: "listening_mcq", promptRu: "「摩擦」の意味は？", optionsRu: ["Гармония", "Трение / разногласие", "Единство", "Поддержка"], correctIndex: 1, explanationRu: "摩擦（まさつ）= трение, разногласие." },
  { id: "ex1-v15", atSec: 0, kind: "listening_mcq", promptRu: "「搾取」の意味は？", optionsRu: ["Эксплуатация", "Пожертвование", "Защита", "Уважение"], correctIndex: 0, explanationRu: "搾取（さくしゅ）= эксплуатация, выжимание." },
  { id: "ex1-v16", atSec: 0, kind: "listening_mcq", promptRu: "「浸透」の意味は？", optionsRu: ["Проникновение / распространение", "Отталкивание", "Сжатие", "Изоляция"], correctIndex: 0, explanationRu: "浸透（しんとう）= проникновение, распространение." },
  { id: "ex1-v17", atSec: 0, kind: "listening_mcq", promptRu: "「膨張」の意味は？", optionsRu: ["Сжатие", "Расширение / раздувание", "Уменьшение", "Стабильность"], correctIndex: 1, explanationRu: "膨張（ぼうちょう）= расширение, раздувание." },
  { id: "ex1-v18", atSec: 0, kind: "listening_mcq", promptRu: "「侵略」の意味は？", optionsRu: ["Защита", "Вторжение / агрессия", "Отступление", "Мир"], correctIndex: 1, explanationRu: "侵略（しんりゃく）= вторжение, агрессия." },
  { id: "ex1-v19", atSec: 0, kind: "listening_mcq", promptRu: "「崩壊」の意味は？", optionsRu: ["Строительство", "Крах / распад", "Восстановление", "Укрепление"], correctIndex: 1, explanationRu: "崩壊（ほうかい）= крах, распад, разрушение." },
  { id: "ex1-v20", atSec: 0, kind: "listening_mcq", promptRu: "「慰謝」の意味は？", optionsRu: ["Утешение / компенсация", "Обвинение", "Наказание", "Оскорбление"], correctIndex: 0, explanationRu: "慰謝（いしゃ）= утешение, моральная компенсация." },
];

// ─── N1 Kanji (20) ──────────────────────────────────────────────────

export const EX_N1_KANJI: KanjiTranslateQuestion[] = [
  { id: "ex1-k01", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「克服」.", kanji: "克服", acceptedRu: ["преодоление"], hintRu: "こくふく" },
  { id: "ex1-k02", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「衰退」.", kanji: "衰退", acceptedRu: ["упадок", "деградация"], hintRu: "すいたい" },
  { id: "ex1-k03", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「拒絶」.", kanji: "拒絶", acceptedRu: ["отвержение", "отказ"], hintRu: "きょぜつ" },
  { id: "ex1-k04", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「慰謝」.", kanji: "慰謝", acceptedRu: ["утешение", "компенсация"], hintRu: "いしゃ" },
  { id: "ex1-k05", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「抽象」.", kanji: "抽象", acceptedRu: ["абстракция", "абстрактный"], hintRu: "ちゅうしょう" },
  { id: "ex1-k06", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「概念」.", kanji: "概念", acceptedRu: ["понятие", "концепция"], hintRu: "がいねん" },
  { id: "ex1-k07", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「肯定」.", kanji: "肯定", acceptedRu: ["утверждение", "одобрение"], hintRu: "こうてい" },
  { id: "ex1-k08", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「否定」.", kanji: "否定", acceptedRu: ["отрицание"], hintRu: "ひてい" },
  { id: "ex1-k09", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「排除」.", kanji: "排除", acceptedRu: ["исключение", "устранение"], hintRu: "はいじょ" },
  { id: "ex1-k10", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「促進」.", kanji: "促進", acceptedRu: ["содействие", "стимулирование"], hintRu: "そくしん" },
  { id: "ex1-k11", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「抑制」.", kanji: "抑制", acceptedRu: ["подавление", "сдерживание"], hintRu: "よくせい" },
  { id: "ex1-k12", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「妥協」.", kanji: "妥協", acceptedRu: ["компромисс"], hintRu: "だきょう" },
  { id: "ex1-k13", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「繁栄」.", kanji: "繁栄", acceptedRu: ["процветание"], hintRu: "はんえい" },
  { id: "ex1-k14", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「衝突」.", kanji: "衝突", acceptedRu: ["столкновение", "конфликт"], hintRu: "しょうとつ" },
  { id: "ex1-k15", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「摩擦」.", kanji: "摩擦", acceptedRu: ["трение", "разногласие"], hintRu: "まさつ" },
  { id: "ex1-k16", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「搾取」.", kanji: "搾取", acceptedRu: ["эксплуатация"], hintRu: "さくしゅ" },
  { id: "ex1-k17", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「浸透」.", kanji: "浸透", acceptedRu: ["проникновение", "распространение"], hintRu: "しんとう" },
  { id: "ex1-k18", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「膨張」.", kanji: "膨張", acceptedRu: ["расширение", "раздувание"], hintRu: "ぼうちょう" },
  { id: "ex1-k19", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「侵略」.", kanji: "侵略", acceptedRu: ["вторжение", "агрессия"], hintRu: "しんりゃく" },
  { id: "ex1-k20", atSec: 0, kind: "kanji_translate", promptRu: "Переведите「崩壊」.", kanji: "崩壊", acceptedRu: ["крах", "распад", "разрушение"], hintRu: "ほうかい" },
];

// ─── N1 Word Order (15) ─────────────────────────────────────────────

export const EX_N1_WORD_ORDER: WordOrderQuestion[] = [
  { id: "ex1-w01", atSec: 0, kind: "word_order", promptRu: "Соберите: «Невзирая на трудности, продвигался вперёд.»", words: ["前進した", "をものともせずに", "困難"], correctOrder: [2, 1, 0], explanationRu: "困難をものともせずに前進した。" },
  { id: "ex1-w02", atSec: 0, kind: "word_order", promptRu: "Соберите: «Ни на секунду нельзя ослабить бдительность.»", words: ["油断できない", "たりとも", "一瞬"], correctOrder: [2, 1, 0], explanationRu: "一瞬たりとも油断できない。" },
  { id: "ex1-w03", atSec: 0, kind: "word_order", promptRu: "Соберите: «Пейзаж, присущий только Киото.»", words: ["風景だ", "ならではの", "京都"], correctOrder: [2, 1, 0], explanationRu: "京都ならではの風景だ。" },
  { id: "ex1-w04", atSec: 0, kind: "word_order", promptRu: "Соберите: «Начиная с токийского концерта, начался тур.»", words: ["始まった", "が", "全国ツアー", "を皮切りに", "東京公演"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "東京公演を皮切りに全国ツアーが始まった。" },
  { id: "ex1-w05", atSec: 0, kind: "word_order", promptRu: "Соберите: «В отличие от брата, младший серьёзный.»", words: ["真面目だ", "は", "弟", "にひきかえ", "兄"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "兄にひきかえ、弟は真面目だ。" },
  { id: "ex1-w06", atSec: 0, kind: "word_order", promptRu: "Соберите: «Его отношение крайне невежливо.»", words: ["極まりない", "は", "失礼", "彼の態度"], correctOrder: [3, 1, 2, 0], explanationRu: "彼の態度は失礼極まりない。" },
  { id: "ex1-w07", atSec: 0, kind: "word_order", promptRu: "Соберите: «Жители были вынуждены выселиться.»", words: ["を余儀なくされた", "は", "住民", "立ち退き"], correctOrder: [2, 1, 3, 0], explanationRu: "住民は立ち退きを余儀なくされた。" },
  { id: "ex1-w08", atSec: 0, kind: "word_order", promptRu: "Соберите: «Счастье только благодаря семье.»", words: ["幸せだ", "あっての", "家族"], correctOrder: [2, 1, 0], explanationRu: "家族あっての幸せだ。" },
  { id: "ex1-w09", atSec: 0, kind: "word_order", promptRu: "Соберите: «Так и не извинился.»", words: ["だった", "ずじまい", "結局、謝ら"], correctOrder: [2, 1, 0], explanationRu: "結局、謝らずじまいだった。" },
  { id: "ex1-w10", atSec: 0, kind: "word_order", promptRu: "Соберите: «Наряду с работой занимается волонтёрством.»", words: ["している", "ボランティア活動を", "かたわら", "仕事の"], correctOrder: [3, 2, 1, 0], explanationRu: "仕事のかたわら、ボランティア活動をしている。" },
  { id: "ex1-w11", atSec: 0, kind: "word_order", promptRu: "Соберите: «По пути на прогулку зашёл за покупками.»", words: ["行った", "に", "買い物", "がてら", "散歩"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "散歩がてら買い物に行った。" },
  { id: "ex1-w12", atSec: 0, kind: "word_order", promptRu: "Соберите: «Этот год ещё более загруженный, чем прошлый.»", words: ["忙しい", "は", "今年", "にもまして", "去年"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "去年にもまして今年は忙しい。" },
  { id: "ex1-w13", atSec: 0, kind: "word_order", promptRu: "Соберите: «Образование — это не что иное, как будущее страны.»", words: ["である", "国の未来", "とりもなおさず", "教育は"], correctOrder: [3, 2, 1, 0], explanationRu: "教育はとりもなおさず国の未来である。" },
  { id: "ex1-w14", atSec: 0, kind: "word_order", promptRu: "Соберите: «Игнорируя оппозицию, он продвигал план.»", words: ["進めた", "を", "計画", "をよそに", "反対"], correctOrder: [4, 3, 2, 1, 0], explanationRu: "反対をよそに計画を進めた。" },
  { id: "ex1-w15", atSec: 0, kind: "word_order", promptRu: "Соберите: «Его успех нетрудно представить.»", words: ["にかたくない", "は", "彼の成功", "想像"], correctOrder: [2, 1, 3, 0], explanationRu: "彼の成功は想像にかたくない。" },
];

// ─── N1 Fill-in-the-Blank (15) ──────────────────────────────────────

export const EX_N1_FILL: FillBlankQuestion[] = [
  { id: "ex1-f01", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 困難___前進した。(невзирая на)", sentenceJa: "困難___前進した。", blankIndex: 0, acceptedAnswers: ["をものともせずに"], explanationRu: "をものともせずに = невзирая на." },
  { id: "ex1-f02", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 一瞬___油断できない。(даже ни на)", sentenceJa: "一瞬___油断できない。", blankIndex: 0, acceptedAnswers: ["たりとも"], explanationRu: "たりとも = даже (ни на)." },
  { id: "ex1-f03", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 感動させ___。(не может не)", sentenceJa: "観客を感動させ___。", blankIndex: 0, acceptedAnswers: ["ずにはおかない"], explanationRu: "ずにはおかない = не может не (сделать)." },
  { id: "ex1-f04", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 見る___窓の外を見ていた。(без намерения)", sentenceJa: "見る___窓の外を見ていた。", blankIndex: 0, acceptedAnswers: ["ともなく"], explanationRu: "ともなく = без определённого намерения." },
  { id: "ex1-f05", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 想像___。(нетрудно)", sentenceJa: "彼の成功は想像___。", blankIndex: 0, acceptedAnswers: ["にかたくない"], explanationRu: "にかたくない = нетрудно (представить)." },
  { id: "ex1-f06", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 反対___計画を進めた。(игнорируя)", sentenceJa: "周囲の反対___計画を進めた。", blankIndex: 0, acceptedAnswers: ["をよそに"], explanationRu: "をよそに = игнорируя." },
  { id: "ex1-f07", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 東京公演___全国ツアーが始まった。(начиная с)", sentenceJa: "東京公演___全国ツアーが始まった。", blankIndex: 0, acceptedAnswers: ["を皮切りに"], explanationRu: "を皮切りに = начиная с." },
  { id: "ex1-f08", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 京都___風景だ。(присущий только)", sentenceJa: "京都___風景だ。", blankIndex: 0, acceptedAnswers: ["ならではの"], explanationRu: "ならではの = присущий только." },
  { id: "ex1-f09", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 失礼___。(крайне)", sentenceJa: "彼の態度は失礼___。", blankIndex: 0, acceptedAnswers: ["極まりない"], explanationRu: "極まりない = крайне, в высшей степени." },
  { id: "ex1-f10", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 立ち退き___された。(быть вынужденным)", sentenceJa: "住民は立ち退き___された。", blankIndex: 0, acceptedAnswers: ["を余儀なく"], explanationRu: "を余儀なくされる = быть вынужденным." },
  { id: "ex1-f11", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 家族___幸せだ。(только благодаря)", sentenceJa: "家族___幸せだ。", blankIndex: 0, acceptedAnswers: ["あっての"], explanationRu: "あっての = только благодаря." },
  { id: "ex1-f12", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 結局、謝ら___だった。(так и не)", sentenceJa: "結局、謝ら___だった。", blankIndex: 0, acceptedAnswers: ["ずじまい"], explanationRu: "ずじまい = так и не (сделал)." },
  { id: "ex1-f13", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 仕事の___ボランティアをしている。(наряду с)", sentenceJa: "仕事の___ボランティア活動をしている。", blankIndex: 0, acceptedAnswers: ["かたわら"], explanationRu: "かたわら = наряду с." },
  { id: "ex1-f14", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 去年___今年は忙しい。(ещё больше, чем)", sentenceJa: "去年___今年は忙しい。", blankIndex: 0, acceptedAnswers: ["にもまして"], explanationRu: "にもまして = ещё больше, чем." },
  { id: "ex1-f15", atSec: 0, kind: "fill_blank", promptRu: "Вставьте: 散歩___買い物に行った。(заодно)", sentenceJa: "散歩___買い物に行った。", blankIndex: 0, acceptedAnswers: ["がてら"], explanationRu: "がてら = заодно, по ходу дела." },
];

// ─── N1 Numbers (15) ────────────────────────────────────────────────

export const EX_N1_NUMBERS: NumberAudioQuestion[] = [
  { id: "ex1-n01", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите число.", audioText: "やく ひゃくさんじゅうおくドル", acceptedAnswers: ["約130億ドル", "130億ドル", "13000000000ドル"], explanationRu: "約百三十億ドル = примерно 13 миллиардов долларов." },
  { id: "ex1-n02", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "にじゅうさんちょうえん", acceptedAnswers: ["23兆円", "23000000000000円"], explanationRu: "二十三兆円 = 23 триллиона иен." },
  { id: "ex1-n03", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "れいてんぜろさんパーセント", acceptedAnswers: ["0.03%", "0.03パーセント"], explanationRu: "0.03%." },
  { id: "ex1-n04", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "やく ななじゅうはちおくにん", acceptedAnswers: ["約78億人", "78億人", "7800000000"], explanationRu: "約七十八億人 = примерно 7.8 миллиарда человек (население Земли)." },
  { id: "ex1-n05", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "ごひゃくろくじゅうななちょうえん", acceptedAnswers: ["567兆円", "567000000000000円"], explanationRu: "五百六十七兆円 = 567 триллионов иен." },
  { id: "ex1-n06", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "さんじゅうはちてんにパーセントぞう", acceptedAnswers: ["38.2%増", "38.2%"], explanationRu: "38.2%増 = рост на 38.2%." },
  { id: "ex1-n07", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "やく いっちょうにせんおくえん", acceptedAnswers: ["約1兆2000億円", "約1兆2千億円", "1200000000000"], explanationRu: "約一兆二千億円 = примерно 1.2 триллиона иен." },
  { id: "ex1-n08", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "さんぜんまんけん", acceptedAnswers: ["3000万件", "30000000件"], explanationRu: "三千万件 = 30 миллионов случаев." },
  { id: "ex1-n09", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "ごてんきゅうパーセントげんしょう", acceptedAnswers: ["5.9%減少", "5.9%"], explanationRu: "5.9%減少 = снижение на 5.9%." },
  { id: "ex1-n10", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "にせんにじゅうろくねんど", acceptedAnswers: ["2026年度", "2026"], explanationRu: "二千二十六年度 = 2026 финансовый год." },
  { id: "ex1-n11", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "よんひゃくごじゅうまんへいほうキロメートル", acceptedAnswers: ["450万平方キロメートル", "450万km²", "4500000km²"], explanationRu: "四百五十万平方キロメートル." },
  { id: "ex1-n12", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "やく さんびゃくはちじゅうおくドル", acceptedAnswers: ["約380億ドル", "380億ドル", "38000000000ドル"], explanationRu: "約三百八十億ドル = примерно 38 миллиардов долларов." },
  { id: "ex1-n13", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите процент.", audioText: "ろくじゅうななてんはちパーセント", acceptedAnswers: ["67.8%", "67.8パーセント"], explanationRu: "67.8%." },
  { id: "ex1-n14", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "にじゅうごおくにん", acceptedAnswers: ["25億人", "2500000000人"], explanationRu: "二十五億人 = 2.5 миллиарда человек." },
  { id: "ex1-n15", atSec: 0, kind: "number_audio", promptRu: "Прослушайте и запишите.", audioText: "いちおくにせんさんびゃくよんじゅうごまんろくせんななひゃくはちじゅうきゅうにん", acceptedAnswers: ["1億2345万6789人", "123456789人", "123456789"], explanationRu: "一億二千三百四十五万六千七百八十九人 = 123 456 789 человек." },
];

// ─── N1 Dialogues (15) ──────────────────────────────────────────────

export const EX_N1_DIALOGUES: DialogueAudioQuestion[] = [
  {
    id: "ex1-d01", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую позицию занимает министр?",
    dialogueLines: [
      { speaker: "記者", ja: "今回の政策変更について、大臣のお考えをお聞かせください。" },
      { speaker: "大臣", ja: "長期的な視点に立ち、持続可能な社会の実現を目指しております。" },
    ],
    optionsRu: ["Краткосрочные реформы", "Долгосрочный курс на устойчивое общество", "Отмена реформ", "Немедленные изменения"],
    correctIndex: 1,
    explanationRu: "長期的な視点 + 持続可能な社会 = долгосрочный курс на устойчивое общество.",
  },
  {
    id: "ex1-d02", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём спорят учёные?",
    dialogueLines: [
      { speaker: "研究者A", ja: "この理論は実験データと矛盾しています。" },
      { speaker: "研究者B", ja: "しかし、既存のモデルでは説明できない現象がある以上、新たな仮説を検討すべきです。" },
    ],
    optionsRu: ["Теория подтверждена", "Теория противоречит данным, нужна новая гипотеза", "Оба согласны", "Данные не важны"],
    correctIndex: 1,
    explanationRu: "矛盾 + 新たな仮説を検討すべき = противоречие, нужна новая гипотеза.",
  },
  {
    id: "ex1-d03", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что предлагает руководитель?",
    dialogueLines: [
      { speaker: "社長", ja: "海外市場への進出は、もはや避けて通れない課題です。" },
      { speaker: "役員", ja: "リスクを最小限に抑えつつ、段階的に展開してはいかがでしょうか。" },
    ],
    optionsRu: ["Полностью отказаться", "Поэтапный выход с минимизацией рисков", "Немедленная экспансия", "Сосредоточиться на внутреннем рынке"],
    correctIndex: 1,
    explanationRu: "リスクを最小限 + 段階的に展開 = поэтапный выход с минимизацией рисков.",
  },
  {
    id: "ex1-d04", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую проблему обсуждают на конференции?",
    dialogueLines: [
      { speaker: "専門家", ja: "地球温暖化の影響は、もはや想像を絶するレベルに達しています。" },
      { speaker: "司会", ja: "具体的にはどのような対策が求められていますか。" },
    ],
    optionsRu: ["Экономический кризис", "Глобальное потепление вышло за рамки воображения", "Падение рождаемости", "Технический прогресс"],
    correctIndex: 1,
    explanationRu: "地球温暖化 + 想像を絶する = глобальное потепление превосходит воображение.",
  },
  {
    id: "ex1-d05", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что профессор говорит о диссертации?",
    dialogueLines: [
      { speaker: "教授", ja: "論文の論旨は明確だが、先行研究の分析が不十分と言わざるを得ない。" },
      { speaker: "院生", ja: "承知しました。先行研究をさらに掘り下げます。" },
    ],
    optionsRu: ["Всё отлично", "Тезис ясен, но анализ предшествующих работ недостаточен", "Тема неуместна", "Нужно сменить руководителя"],
    correctIndex: 1,
    explanationRu: "論旨は明確 + 先行研究が不十分 = тезис ясен, но анализ предшествующих работ слаб.",
  },
  {
    id: "ex1-d06", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём предупреждает дипломат?",
    dialogueLines: [
      { speaker: "外交官", ja: "両国間の摩擦が衝突に発展しかねない状況です。" },
      { speaker: "記者", ja: "外交的な解決の見通しはありますか。" },
    ],
    optionsRu: ["Отношения улучшаются", "Трения могут перерасти в конфликт", "Война уже началась", "Всё стабильно"],
    correctIndex: 1,
    explanationRu: "摩擦が衝突に発展しかねない = трения рискуют перерасти в конфликт.",
  },
  {
    id: "ex1-d07", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что обсуждают на совете директоров?",
    dialogueLines: [
      { speaker: "取締役A", ja: "この合併案は、我が社の存続あっての判断です。" },
      { speaker: "取締役B", ja: "従業員の雇用を維持する前提で進めるべきです。" },
    ],
    optionsRu: ["Увольнение всех", "Слияние ради выживания с сохранением рабочих мест", "Закрытие компании", "Расширение штата"],
    correctIndex: 1,
    explanationRu: "存続あっての判断 + 雇用維持 = слияние для выживания с сохранением занятости.",
  },
  {
    id: "ex1-d08", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую оценку даёт критик?",
    dialogueLines: [
      { speaker: "批評家", ja: "この作品は、表現の自由の概念を根底から覆すものだ。" },
      { speaker: "司会", ja: "つまり、従来の枠組みを超えていると？" },
    ],
    optionsRu: ["Банальная работа", "Переворачивает понятие свободы выражения", "Технически слабая", "Копия другого произведения"],
    correctIndex: 1,
    explanationRu: "概念を根底から覆す = переворачивает понятие с основания.",
  },
  {
    id: "ex1-d09", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что аналитик говорит об экономике?",
    dialogueLines: [
      { speaker: "アナリスト", ja: "財政赤字の膨張を抑制しなければ、経済の崩壊は避けられません。" },
      { speaker: "記者", ja: "具体的にどのような措置が必要ですか。" },
    ],
    optionsRu: ["Экономика растёт", "Без сдерживания дефицита экономика рухнет", "Дефицит не опасен", "Инфляция снижается"],
    correctIndex: 1,
    explanationRu: "財政赤字の膨張を抑制 + 崩壊は避けられない = без сдерживания дефицита — крах.",
  },
  {
    id: "ex1-d10", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём договорились стороны?",
    dialogueLines: [
      { speaker: "A国代表", ja: "互いの妥協なくしては、この問題の解決はありえません。" },
      { speaker: "B国代表", ja: "おっしゃる通りです。建設的な対話を続けましょう。" },
    ],
    optionsRu: ["Одна сторона уступила", "Без взаимного компромисса решение невозможно", "Переговоры провалились", "Конфликт обострился"],
    correctIndex: 1,
    explanationRu: "妥協なくしては解決はありえない = без компромисса решение невозможно.",
  },
  {
    id: "ex1-d11", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что историк описывает?",
    dialogueLines: [
      { speaker: "歴史家", ja: "帝国の繁栄は、周辺諸国の搾取の上に成り立っていました。" },
      { speaker: "学生", ja: "つまり、繁栄の裏には犠牲があったということですね。" },
    ],
    optionsRu: ["Империя мирно развивалась", "Процветание основывалось на эксплуатации", "Соседние страны помогали добровольно", "Империя была бедной"],
    correctIndex: 1,
    explanationRu: "繁栄 + 搾取の上に成り立つ = процветание основывалось на эксплуатации.",
  },
  {
    id: "ex1-d12", atSec: 0, kind: "dialogue_audio",
    promptRu: "Что сообщает представитель правительства?",
    dialogueLines: [
      { speaker: "政府代表", ja: "少子化対策を本格化させんがため、新たな予算を計上しました。" },
      { speaker: "記者", ja: "具体的な施策を教えてください。" },
    ],
    optionsRu: ["Бюджет сокращён", "Выделен бюджет для мер по рождаемости", "Проблема не существует", "Меры отменены"],
    correctIndex: 1,
    explanationRu: "少子化対策 + 新たな予算 = бюджет для мер по борьбе с падением рождаемости.",
  },
  {
    id: "ex1-d13", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какую мысль выражает философ?",
    dialogueLines: [
      { speaker: "哲学者", ja: "否定と肯定は、対立するものではなく、相互に補完し合う概念です。" },
      { speaker: "学生", ja: "弁証法的な考え方ですね。" },
    ],
    optionsRu: ["Они противоположны", "Отрицание и утверждение дополняют друг друга", "Отрицание важнее", "Утверждение не нужно"],
    correctIndex: 1,
    explanationRu: "否定と肯定 + 相互に補完 = отрицание и утверждение дополняют друг друга.",
  },
  {
    id: "ex1-d14", atSec: 0, kind: "dialogue_audio",
    promptRu: "О чём предупреждает эксперт по безопасности?",
    dialogueLines: [
      { speaker: "専門家", ja: "サイバー攻撃の浸透は、国家安全保障を脅かすレベルに達しています。" },
      { speaker: "政治家", ja: "排除するための具体的な手段はありますか。" },
    ],
    optionsRu: ["Кибератаки безвредны", "Кибератаки угрожают национальной безопасности", "Защита достаточна", "Проблема решена"],
    correctIndex: 1,
    explanationRu: "サイバー攻撃の浸透 + 国家安全保障を脅かす = кибератаки угрожают нацбезопасности.",
  },
  {
    id: "ex1-d15", atSec: 0, kind: "dialogue_audio",
    promptRu: "Какой вывод делает социолог?",
    dialogueLines: [
      { speaker: "社会学者", ja: "格差の拡大は、社会の崩壊を招きかねない深刻な問題です。" },
      { speaker: "司会", ja: "その克服に向けて何が必要でしょうか。" },
    ],
    optionsRu: ["Неравенство несущественно", "Рост неравенства может привести к распаду общества", "Общество стабильно", "Неравенство снижается"],
    correctIndex: 1,
    explanationRu: "格差の拡大 + 崩壊を招きかねない = рост неравенства рискует привести к распаду.",
  },
];
