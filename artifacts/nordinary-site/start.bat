@echo off
REM Always run from this folder so Vite finds index.html and vite.config.ts.
cd /d "%~dp0"

set PORT=5173
set BASE_PATH=/

echo.
echo  (n)ordinary site  ^>^>  http://localhost:%PORT%/
echo  Leave this window open while testing. Ctrl+C to stop.
echo.

where pnpm >nul 2>&1
if %ERRORLEVEL%==0 (
  pnpm dev
) else (
  call npm run dev
)
