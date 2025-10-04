"""
Space Biology Knowledge Engine - FastAPI Backend
Main API entry point
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from typing import List, Optional
import os

from app.routes.articles import router as articles_router
from app.routes.data_exploration import router as data_exploration_router
from app.routes.text_preprocessing import router as text_preprocessing_router
from app.config import settings

# Initialize FastAPI app
app = FastAPI(
    title="Space Biology Knowledge Engine API",
    description="API for searching and analyzing space biology research articles",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(articles_router, prefix="/api/v1", tags=["articles"])
app.include_router(data_exploration_router, prefix="/api/v1", tags=["data-exploration"])
app.include_router(text_preprocessing_router, prefix="/api/v1", tags=["text-preprocessing"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Space Biology Knowledge Engine API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "space-bio-api"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
