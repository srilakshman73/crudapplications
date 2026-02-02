@echo off
echo Starting Employee Management System...

cd server
if not exist .env (
    echo [WARNING] .env file not found in server directory!
    echo Please create one with your DB credentials.
    pause
    exit /b
)

start "Backend Server" cmd /k "npm run dev"
cd ../client
start "Frontend Server" cmd /k "npm run dev"

echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause
