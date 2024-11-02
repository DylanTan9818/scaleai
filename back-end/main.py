# First, import FastAPI and create the app instance
from fastapi import FastAPI
app = FastAPI()

# Then import and add middleware
from fastapi.middleware.cors import CORSMiddleware

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # NextJS default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define your routes
@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.get("/api/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

# Optional: for running directly with Python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)