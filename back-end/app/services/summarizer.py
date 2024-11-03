from openai import OpenAI
from typing import List, Dict
import json
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class NewsSummarizer:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_KEY)

    async def summarize_article(self, article: Dict) -> str:
        try:
            prompt = f"""
            Summarize this news article in 2-3 concise sentences. Focus on key points and impact:
            
            Title: {article['title']}
            Content: {article['content']}
            """

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.5,
                max_tokens=150
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error summarizing article: {str(e)}")
            return article['description']

summarizer = NewsSummarizer()