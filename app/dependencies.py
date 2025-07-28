from sqlalchemy.orm import Session
from app.db.session import SessionLocal # usual way to connect to the database (usually postgreSQL, SQLite)
from typing import Generator

def get_db() -> Generator[Session, None, None]:
    db=SessionLocal() # opens a new database connection
    try:
        yield db # Give it to whoever ask for it (like your route)
    finally:
        db.close() # After route is done close the connections


# Advantage of using like this to avoid memory leaks or open connection