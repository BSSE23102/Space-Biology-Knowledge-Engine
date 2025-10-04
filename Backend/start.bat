@echo off

REM Space Biology Knowledge Engine - Windows Startup Script

echo 🚀 Starting Space Biology Knowledge Engine...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if we're in the Backend directory
if not exist "requirements.txt" (
    echo ❌ Please run this script from the Backend directory.
    pause
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist ".venv" (
    echo 📦 Creating virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call .venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Create data directory
echo 📁 Creating data directory...
if not exist "data" mkdir data

REM Create logs directory
echo 📁 Creating logs directory...
if not exist "logs" mkdir logs

REM Check if dataset exists
if not exist "..\Research\datasets\SB_publication_PMC.csv" (
    echo ⚠️  Dataset not found. Please ensure SB_publication_PMC.csv is in Research\datasets\
    echo    You can download it from PMC or use your own dataset.
)

REM Start the API server
echo 🌐 Starting API server...
echo    API will be available at: http://localhost:8000
echo    Documentation: http://localhost:8000/docs
echo    Health check: http://localhost:8000/health
echo.
echo Press Ctrl+C to stop the server
echo.

python -m app.main

pause
