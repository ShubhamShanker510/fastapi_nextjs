#This file sets up the database connection for your FastAPI application. Think of it as creating a "bridge" between your Python code and PostgreSQL database.

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine=create_engine(settings.DATABASE_URL, future=True)
SessionLocal=sessionmaker(bind=engine, autoflush=False, autocommit=False)