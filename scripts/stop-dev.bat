@echo off
echo Останавливаю процессы Node.js...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo Процессы Node.js завершены.
) else (
    echo Процессы Node.js не найдены или уже закрыты.
)
timeout /t 2 >nul
echo Готово. Теперь можно запустить: npm run dev
