# database table called "posts" for storing blog posts

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.base import Base

class Post(Base):
    __tablename__="posts"

    id=Column(Integer, primary_key=True, index=True)
    title=Column(String(255), nullable=False)
    content=Column(Text, nullable=False)
    created_at=Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at=Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    author_id=Column(Integer, ForeignKey("users.id"), nullable=False)
    author=relationship("User", back_populates="posts")