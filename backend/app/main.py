from fastapi import FastAPI
from app.database import engine, Base
from routes import notes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Smart Notes API",
    description="CRUD Notes API with AI Explanation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
#__init__.py


app.include_router(notes.router)

@app.get("/")
def root():
    return {"message": "Smart Notes API is running 🚀"}