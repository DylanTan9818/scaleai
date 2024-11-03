from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.services.news_fetcher import fetcher
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/fetch/{sector}")
async def fetch_sector_news(sector: str):
    """Fetch news for specific sector"""
    try:
        # Fetch and filter news
        articles = await fetcher.fetch_news(sector)
        
        # Process articles
        processed_articles = await fetcher.process_articles(articles)
        
        # Save to JSON file
        filename = fetcher.save_to_json(processed_articles, sector)
        
        return {
            "status": "success",
            "sector": sector,
            "count": len(processed_articles),
            "articles": processed_articles,
            "file": filename
        }
    except Exception as e:
        logger.error(f"Error fetching news: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cached/{sector}")
async def get_cached_news(sector: str):
    """Get cached news from JSON file"""
    try:
        with open(f"data/malaysia_{sector}_news.json", 'r') as f:
            articles = json.load(f)
        return {
            "status": "success",
            "sector": sector,
            "count": len(articles),
            "articles": articles
        }
    except FileNotFoundError:
        return {
            "status": "success",
            "sector": sector,
            "count": 0,
            "articles": []
        }