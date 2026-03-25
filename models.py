from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Notes(BaseModel):
    id : int
    title : str
    content : Optional[str] = None
    timestamp : datetime
