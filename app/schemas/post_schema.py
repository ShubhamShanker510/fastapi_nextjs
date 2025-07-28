from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    title: Optional[str] = None
    content: Optional[str] = None

class PostOut(PostBase):
    id: int
    created_at: datetime
    updated_at:datetime
    author_id: int

    class Config:
        orm_mode=True