from fastapi import APIRouter, HTTPException
from typing import List
from app.core.models import NewsItem, MPIResponse
from app.services.sentiment import analyze_sentiment
from app.services.mpi import calculate_mpi

router = APIRouter()

@router.post("/calculate", response_model=MPIResponse)
async def calculate_market_performance(news_items: List[NewsItem]):
    try:
        sentiment_results = analyze_sentiment(news_items)
        response = calculate_mpi(news_items, sentiment_results)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_mpi_history():
    try:
        return {
            "history": [
                {"date": "2024-03-01", "score": 85.5},
                {"date": "2024-02-01", "score": 82.3},
                {"date": "2024-01-01", "score": 78.9}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/category/{category}")
async def get_category_analysis(category: str):
    try:
        return {
            "category": category,
            "score": 87.2,
            "trend": "upward",
            "recent_news": [
                "Positive development in tech sector",
                "New investments in infrastructure"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))