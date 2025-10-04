"""
Article API routes
"""

from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
import time
from app.models.article import (
    Article, ArticleCreate, ArticleUpdate, ArticleSearchRequest, 
    ArticleSearchResponse, SimilarityResult
)
from app.services.article_service import ArticleService
from app.database.db import db_manager

router = APIRouter()

# Dependency to get article service
def get_article_service():
    return ArticleService(db_manager)

@router.get("/articles", response_model=List[Article])
async def get_articles(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    article_service: ArticleService = Depends(get_article_service)
):
    """Get all articles with pagination"""
    try:
        articles = await article_service.get_all_articles(limit=limit, offset=offset)
        return articles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/articles/{article_id}", response_model=Article)
async def get_article(
    article_id: int,
    article_service: ArticleService = Depends(get_article_service)
):
    """Get a specific article by ID"""
    try:
        article = await article_service.get_article_by_id(article_id)
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        return article
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/articles", response_model=Article)
async def create_article(
    article: ArticleCreate,
    article_service: ArticleService = Depends(get_article_service)
):
    """Create a new article"""
    try:
        new_article = await article_service.create_article(article)
        return new_article
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/articles/{article_id}", response_model=Article)
async def update_article(
    article_id: int,
    article_update: ArticleUpdate,
    article_service: ArticleService = Depends(get_article_service)
):
    """Update an article"""
    try:
        updated_article = await article_service.update_article(article_id, article_update)
        if not updated_article:
            raise HTTPException(status_code=404, detail="Article not found")
        return updated_article
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/articles/{article_id}")
async def delete_article(
    article_id: int,
    article_service: ArticleService = Depends(get_article_service)
):
    """Delete an article"""
    try:
        success = await article_service.delete_article(article_id)
        if not success:
            raise HTTPException(status_code=404, detail="Article not found")
        return {"message": "Article deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/articles/search", response_model=ArticleSearchResponse)
async def search_articles(
    q: str = Query(..., description="Search query"),
    limit: int = Query(10, ge=1, le=100),
    similarity_threshold: Optional[float] = Query(None, ge=0.0, le=1.0),
    article_service: ArticleService = Depends(get_article_service)
):
    """Search articles by keyword"""
    try:
        start_time = time.time()
        
        # Create search request
        search_request = ArticleSearchRequest(
            query=q,
            limit=limit,
            similarity_threshold=similarity_threshold
        )
        
        # Perform search
        articles = await article_service.search_articles(search_request)
        
        search_time = (time.time() - start_time) * 1000  # Convert to milliseconds
        
        return ArticleSearchResponse(
            articles=articles,
            total_count=len(articles),
            query=q,
            search_time_ms=search_time
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/articles/similarity/{article_id}", response_model=List[SimilarityResult])
async def get_similar_articles(
    article_id: int,
    limit: int = Query(5, ge=1, le=20),
    threshold: float = Query(0.7, ge=0.0, le=1.0),
    article_service: ArticleService = Depends(get_article_service)
):
    """Get similar articles based on content similarity"""
    try:
        similar_articles = await article_service.find_similar_articles(
            article_id, limit=limit, threshold=threshold
        )
        return similar_articles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/articles/topic/{topic_id}", response_model=List[Article])
async def get_articles_by_topic(
    topic_id: int,
    limit: int = Query(10, ge=1, le=100),
    article_service: ArticleService = Depends(get_article_service)
):
    """Get articles by topic/cluster"""
    try:
        articles = await article_service.get_articles_by_topic(topic_id, limit=limit)
        return articles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/articles/stats")
async def get_article_stats(
    article_service: ArticleService = Depends(get_article_service)
):
    """Get article statistics"""
    try:
        stats = await article_service.get_article_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
