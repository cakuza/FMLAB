@echo off
setlocal EnableDelayedExpansion

cd /d "%~dp0"

set "NPM_CMD="

where npm >nul 2>nul
if not errorlevel 1 set "NPM_CMD=npm"

if "%NPM_CMD%"=="" if exist "%ProgramFiles%\nodejs\npm.cmd" (
  set "NPM_CMD=%ProgramFiles%\nodejs\npm.cmd"
)

if "%NPM_CMD%"=="" if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" (
  set "NPM_CMD=%ProgramFiles(x86)%\nodejs\npm.cmd"
)

if "%NPM_CMD%"=="" (
  echo.
  echo Node.js / npm bulunamadi.
  echo Bu proje calismak icin Node.js LTS ister.
  echo.
  where winget >nul 2>nul
  if errorlevel 1 (
    echo Otomatik kurulum icin winget bulunamadi.
    echo Lutfen Node.js LTS kur: https://nodejs.org/
    echo Kurulumdan sonra bu dosyaya tekrar cift tikla.
    echo.
    pause
    exit /b 1
  )

  set /p INSTALL_NODE="Node.js LTS otomatik kurulsun mu? [E/H]: "
  if /i not "!INSTALL_NODE!"=="E" (
    echo.
    echo Kurulum iptal edildi.
    echo Node.js LTS kur: https://nodejs.org/
    echo.
    pause
    exit /b 1
  )

  echo.
  echo Node.js LTS kuruluyor...
  echo.
  winget install OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements
  if errorlevel 1 (
    echo.
    echo Node.js otomatik kurulum basarisiz oldu.
    echo Lutfen elle kur: https://nodejs.org/
    echo.
    pause
    exit /b 1
  )

  if exist "%ProgramFiles%\nodejs\npm.cmd" (
    set "NPM_CMD=%ProgramFiles%\nodejs\npm.cmd"
  ) else if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" (
    set "NPM_CMD=%ProgramFiles(x86)%\nodejs\npm.cmd"
  ) else (
    echo.
    echo Kurulum tamamlanmis olabilir ama npm bu pencerede bulunamadi.
    echo Lutfen bu pencereyi kapatip dosyaya tekrar cift tikla.
    echo.
    pause
    exit /b 1
  )
)

if not exist "node_modules" (
  echo.
  echo Ilk kurulum yapiliyor: npm install
  echo.
  call "%NPM_CMD%" install
  if errorlevel 1 (
    echo.
    echo Kurulum basarisiz oldu.
    pause
    exit /b 1
  )
)

echo.
echo FM26 Staff & Training Tools baslatiliyor...
echo Tarayici aciliyor: http://localhost:3000
echo.

start "" "http://localhost:3000"
call "%NPM_CMD%" run dev

pause
