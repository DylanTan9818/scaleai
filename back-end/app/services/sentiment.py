from transformers import pipeline
import torch
import json
from typing import List
from app.core.models import NewsItem

class SentimentAnalyzer:
    def __init__(self):
        # Check if GPU is available
        self.device = 0 if torch.cuda.is_available() else -1
        # Initialize the sentiment analysis pipeline
        self.pipe = pipeline(
            "text-classification", 
            model="mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis",
            device=self.device
        )

    def analyze_sentiment(self, news_items: List[NewsItem]) -> List[dict]:
        results = []
        for item in news_items:
            # Analyze preprocessed text
            sentiment = self.pipe(item.text)[0]
            results.append({
                'label': sentiment['label'],
                'score': sentiment['score']
            })
        return results

# Create a global instance
sentiment_analyzer = SentimentAnalyzer()

def analyze_sentiment(news_items: List[NewsItem]) -> List[dict]:
    return sentiment_analyzer.analyze_sentiment(news_items)