from pydantic import BaseModel
from typing import Optional

class Notes(BaseModel):
    id : int
    title : str
    content : Optional[str] = None
    timestamp : True
