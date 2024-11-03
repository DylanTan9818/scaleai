import aiohttp
import asyncio
from bs4 import BeautifulSoup
import json
import os
import logging
from typing import List, Dict
from openai import OpenAI
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NewsFetcher:
    def __init__(self):
        self.mediastack_key = settings.MEDIASTACK_KEY
        self.client = OpenAI(api_key=settings.OPENAI_KEY)
        self.base_url = "http://api.mediastack.com/v1/news"
        self.batch_size = 10
        
    async def fetch_news(self, sector: str = None) -> List[Dict]:
        """Fetch general news from MediaStack
        
        Args:
            sector (str, optional): Sector to filter news for. Defaults to None.
        """
        params = {
            'access_key': self.mediastack_key,
            'countries': 'my',
            'categories': 'general,technology,business,science',
            'limit': 100,
            'sort': 'published_desc',
            'languages': 'en',
        }

        async with aiohttp.ClientSession() as session:
            logger.info(f"Fetching news with params: {params}")
            async with session.get(self.base_url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    articles = data.get('data', [])
                    logger.info(f"Fetched {len(articles)} articles")
                    
                    # Log first article for debugging
                    if articles:
                        logger.info(f"Sample article: {articles[0].get('title')}")
                    
                    if sector:
                        filtered = await self.filter_by_sector(articles, sector)
                        logger.info(f"Filtered to {len(filtered)} articles for sector: {sector}")
                        return filtered
                    return articles
                else:
                    error_text = await response.text()
                    logger.error(f"API Error: Status {response.status}, Response: {error_text}")
                    return []

    async def filter_by_sector(self, articles: List[Dict], sector: str) -> List[Dict]:
        """Filter articles by sector impact using OpenAI"""
        filtered_articles = []
        batches = [articles[i:i + self.batch_size] for i in range(0, len(articles), self.batch_size)]

        for batch in batches:
            prompts = []
            for article in batch:
                prompt = f"""Analyze if this news is relevant to {sector} in Malaysia.

                Title: {article.get('title', '')}
                Description: {article.get('description', '')}

                Consider ANY of these:
                1. Directly about {sector} (e.g., farming, crops, livestock)
                2. Related industries (e.g., food production, rural development)
                3. Economic factors (e.g., prices, trade, markets)
                4. Government policies affecting {sector}
                5. Weather/climate impact on {sector}
                6. Technology in {sector}
                7. Import/export of {sector} products
                8. Rural communities and {sector}

                Return 'yes' if ANY connection to {sector}, even indirect. Otherwise 'no'."""
                prompts.append(prompt)

            try:
                logger.info(f"Processing batch of {len(batch)} articles")
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{
                        "role": "user", 
                        "content": "\n---\n".join(prompts)
                    }],
                    temperature=0.1  # Increased temperature for more flexible responses
                )

                results = response.choices[0].message.content.strip().split('\n')
                
                for article, result in zip(batch, results):
                    if result.strip().lower() == 'yes':
                        filtered_articles.append(article)
                        logger.info(f"Found relevant article: {article.get('title')}")

                await asyncio.sleep(1)
                
            except Exception as e:
                logger.error(f"Error in filtering batch: {str(e)}")
                continue

        logger.info(f"Found total of {len(filtered_articles)} relevant articles")
        return filtered_articles

    async def fetch_content(self, url: str, article: Dict) -> str:
        """Fetch full article content via web scraping"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    html = await response.text()

            soup = BeautifulSoup(html, 'html.parser')

            # Remove unwanted elements
            for element in soup.find_all(['script', 'style', 'nav', 'header', 'footer']):
                element.decompose()

            # Find main content
            content = ''
            article_content = soup.find(['article', 'main', '[class*="article"]', '[class*="content"]'])

            if article_content:
                paragraphs = article_content.find_all('p')
                content = ' '.join([p.get_text().strip() for p in paragraphs])

            return content or article.get('description', '')
        except Exception as e:
            logger.error(f"Error scraping content from {url}: {str(e)}")
            return article.get('description', '')

    async def process_articles(self, filtered_articles: List[Dict]) -> List[Dict]:
        """Process articles and fetch full content"""
        processed_articles = []
        for article in filtered_articles:
            if article.get('url'):
                content = await self.fetch_content(article['url'], article)
                if content:
                    processed_articles.append({
                        'title': article.get('title'),
                        'description': article.get('description'),
                        'content': content,
                        'source': article.get('source'),
                        'url': article.get('url'),
                        'published_at': article.get('published_at'),
                        'category': article.get('category')
                    })

        return processed_articles

    def save_to_json(self, articles: List[Dict], sector: str) -> str:
        """Save raw articles to JSON file"""
        filename = f"data/malaysia_{sector}_news.json"
        os.makedirs("data", exist_ok=True)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(articles, f, indent=2, ensure_ascii=False)
        
        return filename

fetcher = NewsFetcher()