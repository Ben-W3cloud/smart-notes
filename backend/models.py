from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# For creating/updating notes (input from user)
class NoteCreate(BaseModel):
    title: str
    content: Optional[str] = None


# For returning data from API (output)
class NoteResponse(BaseModel):
    id: int
    title: str
    content: Optional[str]
    timestamp: datetime