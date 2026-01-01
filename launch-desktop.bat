@echo off
REM DivePlan Desktop App Launcher for Windows
REM Quick launcher script for the DivePlan desktop application

echo ==========================================
echo   DivePlan Desktop Application Launcher
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "release\" (
    echo Error: 'release' directory not found.
    echo Please make sure you're in the DivePlan project root directory.
    echo.
    echo Or build the desktop app first with:
    echo   pnpm run build:electron:win
    pause
    exit /b 1
)

REM Look for the portable exe
set "PORTABLE_EXE="
for /f "delims=" %%F in ('dir /b /s "release\DivePlan*.exe" 2^>nul ^| findstr /v "Uninstall" ^| findstr /v "Setup"') do (
    set "PORTABLE_EXE=%%F"
    goto :found
)

:found
if "%PORTABLE_EXE%"=="" (
    echo Error: No DivePlan executable found in release\ directory.
    echo.
    echo Please build the desktop app first with:
    echo   pnpm run build:electron:win
    pause
    exit /b 1
)

echo Found: %PORTABLE_EXE%
echo.
echo Launching DivePlan Desktop App...
echo.

REM Launch the app
start "" "%PORTABLE_EXE%"
