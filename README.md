This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Запуск для разработки и просмотра правок:

```bash
npm run dev:open
```

Скрипт запускает сервер и через 5 секунд открывает http://localhost:3000 в браузере.

Или вручную:
```bash
npm run dev
```
Затем откройте [http://localhost:3000](http://localhost:3000) в браузере.

### HTTPS (для микрофона и Web Speech API)

Для работы микрофона (`getUserMedia`) нужен защищённый контекст (HTTPS или localhost). Обычный `http://localhost:3000` уже считается безопасным. Если всё же нужен HTTPS:

1. **Установите mkcert**
   - Windows: `choco install mkcert` или [скачать с GitHub](https://github.com/FiloSottile/mkcert/releases)

2. **Создайте сертификаты**
   ```bash
   mkcert -install
   npm run cert
   ```

3. **Запустите сервер с HTTPS**
   ```bash
   npm run dev:https
   ```

   Откройте [https://localhost:3000](https://localhost:3000)

## Сборка приложений (Android, iOS, ПК)

Проект настроен как приложение для Android, iPhone и Windows/macOS/Linux.

### Android (как открыть на телефоне)

1. Установите [Android Studio](https://developer.android.com/studio).
2. Подключите Android-устройство по USB (включите режим разработчика и отладку по USB) или используйте эмулятор.
3. В терминале из папки проекта выполните:
   ```bash
   npm run android
   ```
4. Откроется Android Studio. Выберите устройство вверху и нажмите зелёную кнопку **Run** (▶).
5. Приложение установится и запустится на телефоне/эмуляторе.
6. **Сборка APK для установки на другие устройства:** в Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. APK будет в `android/app/build/outputs/apk/` — скопируйте его на телефон и установите.

### iOS / iPhone (требуется Mac)

1. Установите Xcode из App Store (только на Mac).
2. В терминале из папки проекта:
   ```bash
   npm run ios
   ```
3. Откроется Xcode. Выберите симулятор iPhone (например, iPhone 15) или подключённый iPhone.
4. Нажмите **Run** (▶). Приложение установится на симулятор или телефон.
5. **Для публикации в App Store** нужна учётная запись Apple Developer.

### ПК (Windows / macOS / Linux)

Запуск десктопного приложения:

```bash
npm run desktop
```

**Если приложение не открывается на Windows:**
1. Убедитесь, что сборка прошла: `npm run build` (должна появиться папка `out/`).
2. Запустите из папки проекта в PowerShell или CMD:  
   `cd путь\к\japanese-trainer`  
   `npx electron electron/main.js`
3. Если окно мелькает и закрывается — откройте CMD, выполните команду и посмотрите текст ошибки.

Сборка установщика: используйте [electron-builder](https://www.electron.build/) при необходимости.

---

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
