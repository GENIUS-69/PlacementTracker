@echo off
TITLE PPTracker Power Launcher
SETLOCAL

:: 1. Navigate to project folder
cd /d "c:\GENIUS 69\VS CODE\PROJECTS\PPTracker"

echo ==========================================
echo    🚀 STARTING PPTRACKER SYSTEM
echo ==========================================

:: 2. Start Database Connection (Checks if MongoDB service is running)
echo [1/3] Connecting to Database...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (echo    - MongoDB started successfully.) else (echo    - MongoDB already active.)

:: 3. Start Backend & Frontend
echo [2/3] Starting Node.js Backend and Vite Frontend...
:: Runs npm run dev in a separate hidden window so it stays alive
start /min "PPTracker_Servers" cmd /c "npm run dev"

:: 4. Wait for warm-up and open Browser
echo [3/3] Waiting for servers to initialize...
timeout /t 6 /nobreak > nul

echo.
echo ✅ ALL SYSTEMS GO! Opening Browser...
start http://localhost:5173

echo.
echo ------------------------------------------
echo APP IS RUNNING IN THE BACKGROUND
echo To stop the app, close the minimized terminal 
echo labeled "PPTracker_Servers" in your taskbar.
echo ------------------------------------------
timeout /t 5 > nul
exit
