from app.api.endpoints.mpi import router as mpi_router
from app.api.endpoints.health import router as health_router
from app.api.endpoints.preprocess import router as preprocess_router
from app.api.endpoints.news import router as news_router
from app.api.endpoints.summarize import router as summarize_router

__all__ = [
    "mpi_router",
    "health_router",
    "preprocess_router",
    "news_router",
    "summarize_router"
]