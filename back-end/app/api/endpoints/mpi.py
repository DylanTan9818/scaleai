from fastapi import APIRouter, HTTPException, Body, Depends, Request
from fastapi.responses import JSONResponse
from typing import List
import logging
from slowapi import Limiter
from slowapi.util import get_remote_address
from datetime import datetime
from pydantic import BaseModel, validator
from app.core.models import NewsItem, MPIResponse
from app.services.sentiment import analyze_sentiment
from app.services.mpi import calculate_mpi

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup rate limiting
limiter = Limiter(key_func=get_remote_address)

router = APIRouter()

class AnalyzeRequest(BaseModel):
    file_content: List[dict]
    
    @validator('file_content')
    def validate_content(cls, v):
        if not v:
            raise ValueError('Content cannot be empty')
        for item in v:
            if 'summarised_news' not in item or 'category' not in item:
                raise ValueError('Each item must contain summarised_news and category')
        return v

@router.post("/analyze-json", response_model=MPIResponse)
@limiter.limit("10/minute")
async def analyze_json_file(
    request: Request,
    analyze_request: AnalyzeRequest = Body(...),
    client_ip: str = Depends(get_remote_address)
):
    try:
        logger.info(f"Received analysis request from {client_ip}")
        start_time = datetime.now()

        # Validate and convert JSON data to NewsItem objects
        news_items = [
            NewsItem(
                text=item["summarised_news"],
                category=item["category"]
            ) for item in analyze_request.file_content
        ]
        
        # Analyze sentiment and calculate MPI
        sentiment_results = analyze_sentiment(news_items)
        response = calculate_mpi(news_items, sentiment_results)
        
        duration = (datetime.now() - start_time).total_seconds()
        logger.info(f"Analysis completed in {duration}s")

        # Convert response to dict and handle datetime serialization
        response_dict = response.dict()
        response_dict['timestamp'] = response_dict['timestamp'].isoformat()

        return JSONResponse(
            status_code=200,
            content=response_dict,
            headers={"X-Processing-Time": str(duration)}
        )

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))