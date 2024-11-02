from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "MPI Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    ALLOWED_ORIGINS: List[str] = ["*"]
    MODEL_NAME: str = "mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis"

    class Config:
        env_file = ".env"

settings = Settings()