from fastapi import FastAPI
from app.database import engine, Base
from routes import notes

Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Smart Notes API",
    description="CRUD Notes API with AI Explanation",
    version="1.0.0"
)

app.include_router(notes.router)

@app.get("/")
def root():
    return {"message": "Smart Notes API is running 🚀"}