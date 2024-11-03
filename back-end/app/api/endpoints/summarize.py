from fastapi import APIRouter, HTTPException
from typing import List, Dict
import json
import os
from app.services.summarizer import summarizer

router = APIRouter()

@router.post("/{sector}")
async def summarize_sector_news(sector: str):
    try:
        # Read sector news
        filename = f"data/malaysia_{sector}_news.json"
        with open(filename, 'r') as f:
            articles = json.load(f)

        # Summarize each article
        summarized_articles = []
        for article in articles:
            summary = await summarizer.summarize_article(article)
            summarized_articles.append({
                "summarised_news": summary,
                "category": sector,
                "original_content": article['content']
            })

        # Save summarized articles
        output_file = f"data/summarized_{sector}_news.json"
        with open(output_file, 'w') as f:
            json.dump(summarized_articles, f, indent=2)

        return {"status": "success", "count": len(summarized_articles)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))