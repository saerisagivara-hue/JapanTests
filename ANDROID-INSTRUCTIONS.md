# Сборка приложения «Японский тренажёр»

## Платформы

| Платформа | Как собрать | Что нужно |
|-----------|-------------|-----------|
| **Android** | `npm run android` | Android Studio, Java 17 |
| **ПК (Windows)** | `npm run desktop` | Electron (уже в проекте) |
| **iPhone** | `npm run ios` | Mac + Xcode |

---

## Android: зачем нужен Android Studio

**Android Studio** нужен для:
1. **Компиляции** — превращает ваш веб-проект (HTML/JS) в APK/AAB
2. **Эмулятора** — тестирование на виртуальном устройстве без телефона
3. **Подключения устройства** — установка и отладка на реальном телефоне
4. **Подписи** — подпись приложения для публикации в Google Play

Без Android Studio собрать и запустить Android-приложение нельзя.

---

## Шаг 1: Установка компонентов

### 1.1 Java (JDK 17)
Android Studio требует Java 17. Обычно он ставится вместе со Studio, но можно проверить:

```powershell
java -version
```

Должно быть 17 или выше.

### 1.2 Android Studio
1. Откройте [developer.android.com/studio](https://developer.android.com/studio)
2. Скачайте и установите
3. При первом запуске: **SDK Manager** → установите **Android SDK** (API 34 или выше)

---

## Шаг 2: Подключение проекта к Android Studio

### 2.1 Сборка веб-части и синхронизация

В терминале можно запускать **из любой папки** (корень или japanese-trainer):

```powershell
cd "c:\Users\saeri\OneDrive\Desktop\Japanese exircisec"
npm run android
```

Или из папки проекта:
```powershell
cd "c:\Users\saeri\OneDrive\Desktop\Japanese exircisec\japanese-trainer"
npm run android
```

Команда `npm run android`:
1. Собирает приложение (`npm run build`)
2. Копирует папку `out/` в Android (`npx cap sync android`)
3. Открывает проект в Android Studio (`npx cap open android`)

### 2.2 Если Android Studio не открылся сам

1. Запустите Android Studio
2. **File → Open**
3. Выберите папку:
   ```
   c:\Users\saeri\OneDrive\Desktop\Japanese exircisec\japanese-trainer\android
   ```
4. Дождитесь синхронизации Gradle (внизу появится прогресс)

---

## Шаг 3: Запуск на устройстве

### Вариант A: Эмулятор (без телефона)

1. В Android Studio: **Tools → Device Manager**
2. **Create Device** → выберите смартфон (например, Pixel 7)
3. Выберите системный образ (API 34) и нажмите **Next → Finish**
4. Запустите эмулятор (▶️ рядом с устройством)
5. В Android Studio нажмите зелёную кнопку **Run** (▶️) или **Shift+F10**

### Вариант B: Реальный телефон

1. Включите **Режим разработчика** на телефоне:
   - **Настройки → О телефоне** → нажмите 7 раз на **Номер сборки**
2. Включите **Отладку по USB**:
   - **Настройки → Для разработчиков → Отладка по USB**
3. Подключите телефон по USB
4. В Android Studio выберите устройство в списке и нажмите **Run**

---

## Шаг 4: Сборка APK для установки

1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. После сборки появится ссылка **locate** — по ней найдёте `app-debug.apk`
3. Перекиньте APK на телефон и установите (или отправьте по почте/облаку)

Путь к APK:
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## Шаг 5: Важно при изменениях в коде

После любых изменений в React/Next.js нужно заново собрать и синхронизировать:

```powershell
cd "c:\Users\saeri\OneDrive\Desktop\Japanese exircisec\japanese-trainer"
npm run build
npx cap sync android
```

Затем в Android Studio нажмите **Run** снова.

---

## Краткая шпаргалка

| Действие | Команда |
|----------|---------|
| Сборка + открыть в Android Studio | `npm run android` |
| Только синхронизация (после build) | `npx cap sync android` |
| Десктоп (Windows) | `npm run desktop` |
| iOS (нужен Mac) | `npm run ios` |

---

## Если приложение не работает в Android

1. **Практика речи** — на Android распознавание может зависеть от Google. Используйте **ввод вручную** (поле под микрофоном).
2. **Чёрный экран** — проверьте логи в Android Studio: **View → Tool Windows → Logcat**.
3. **Ошибки сборки** — убедитесь, что установлен Android SDK API 34 и Java 17.
