@echo off
cd /d "./Source Code/WebApp/MooWallet"
setlocal enabledelayedexpansion

:: Get the current IPv4 address of the main network adapter
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /R /C:"IPv4 Address"') do (
    set ip=%%A
    :: Remove leading spaces
    set ip=!ip: =!
)

:: Path to your .env file
set ENV_FILE=.env

:: Create a temporary file
set TEMP_FILE=.env.tmp

:: Loop through the original .env file
for /f "usebackq delims=" %%L in ("%ENV_FILE%") do (
    set line=%%L
    :: Check if the line starts with VITE_API_URL
    echo !line! | findstr /b "VITE_API_URL=" >nul
    if !errorlevel! == 0 (
        echo VITE_API_URL=http://!ip!:8000>>"%TEMP_FILE%"
    ) else (
        echo !line!>>"%TEMP_FILE%"
    )
)

move /y "%TEMP_FILE%" "%ENV_FILE%"

echo Updated %ENV_FILE% with IP: !ip!
npm run dev -- --host 
pause
