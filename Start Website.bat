@echo off
title Wedding Creation Pokhara - website
cd /d "%~dp0"
if not exist node_modules (
  echo Installing for the first time, please wait...
  call npm install
)
echo.
echo  Website starting... it will open in your browser.
echo  Keep this window open while you use the site. Close it to stop.
echo.
start "" http://localhost:5173
call npx vite --port 5173
pause
