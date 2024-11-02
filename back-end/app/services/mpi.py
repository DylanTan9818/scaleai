from app.core.models import NewsItem, MPIResponse, SentimentResult
from typing import List, Dict
from datetime import datetime

def calculate_mpi_score(sentiment_results: List[dict]) -> float:
    """Calculate MPI score from sentiment results."""
    sentiment_scores = []
    for result in sentiment_results:
        score = 1 if result['label'] == 'positive' else (-1 if result['label'] == 'negative' else 0)
        sentiment_scores.append(score)
    
    total_score = sum(sentiment_scores)
    max_score = len(sentiment_scores)
    min_score = -len(sentiment_scores)
    return ((total_score - min_score) / (max_score - min_score)) * 100

def calculate_mpi(news_items: List[NewsItem], sentiment_results: List[dict]) -> MPIResponse:
    """Calculate MPI and create response."""
    mpi_score = calculate_mpi_score(sentiment_results)
    
    # Calculate sentiment breakdown
    sentiment_breakdown = {
        'positive': sum(1 for r in sentiment_results if r['label'] == 'positive'),
        'negative': sum(1 for r in sentiment_results if r['label'] == 'negative'),
        'neutral': sum(1 for r in sentiment_results if r['label'] == 'neutral')
    }
    
    # Create detailed results
    analyzed_items = []
    for item, sentiment in zip(news_items, sentiment_results):
        analyzed_items.append(SentimentResult(
            text=item.text,
            category=item.category,
            sentiment=sentiment['label'],
            confidence=sentiment['score']
        ))
    
    return MPIResponse(
        mpi_score=round(mpi_score, 2),
        sentiment_breakdown=sentiment_breakdown,
        analyzed_items=analyzed_items,
        timestamp=datetime.now()
    )