#!/bin/bash

# Space Biology Knowledge Engine - Startup Script

echo "🚀 Starting Space Biology Knowledge Engine..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if we're in the Backend directory
if [ ! -f "requirements.txt" ]; then
    echo "❌ Please run this script from the Backend directory."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create data directory
echo "📁 Creating data directory..."
mkdir -p data

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Check if dataset exists
if [ ! -f "../Research/datasets/SB_publication_PMC.csv" ]; then
    echo "⚠️  Dataset not found. Please ensure SB_publication_PMC.csv is in Research/datasets/"
    echo "   You can download it from PMC or use your own dataset."
fi

# Start the API server
echo "🌐 Starting API server..."
echo "   API will be available at: http://localhost:8000"
echo "   Documentation: http://localhost:8000/docs"
echo "   Health check: http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python -m app.main
