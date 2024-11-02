from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class NewsItem(BaseModel):
    text: str
    category: str
    source: Optional[str] = None
    timestamp: Optional[datetime] = None

class SentimentResult(BaseModel):
    text: str
    category: str
    sentiment: str
    confidence: float

class MPIResponse(BaseModel):
    mpi_score: float
    sentiment_breakdown: Dict[str, int]
    analyzed_items: List[SentimentResult]
    timestamp: datetime
    
class SummaryItem(BaseModel):
    summarised_news: str
    category: str

class PreprocessedItem(BaseModel):
    summarised_news: str
    category: str
    preprocessed_news: str

class PreprocessResponse(BaseModel):
    status: str
    data: List[PreprocessedItem]