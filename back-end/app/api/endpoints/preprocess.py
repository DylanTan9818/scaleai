from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List, Dict
import pandas as pd
from app.services.preprocess import preprocessor

router = APIRouter()

class SummaryItem(BaseModel):
    summarised_news: str
    category: str

class PreprocessResponse(BaseModel):
    status: str
    data: List[Dict[str, str]]

@router.post("/preprocess", response_model=PreprocessResponse)
async def preprocess_summaries(summaries: List[SummaryItem] = Body(...)):
    try:
        # Convert input to DataFrame
        df = pd.DataFrame([
            {
                'summarised_news': item.summarised_news,
                'category': item.category
            } for item in summaries
        ])
        
        # Apply preprocessing
        df['preprocessed_news'] = df['summarised_news'].apply(
            preprocessor.preprocess_text
        )
        
        return {
            "status": "success",
            "data": df.to_dict(orient='records')
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))