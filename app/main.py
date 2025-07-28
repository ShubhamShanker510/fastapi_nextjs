from fastapi import FastAPI
from app.routers import auth_router, posts_router, user_router
from app.db.session import engine
from contextlib import asynccontextmanager
from app.middleware.auth_middleware import AuthMiddleware


@asynccontextmanager
async def lifespan(app):
    # Startup: Test DB connection
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        print("Database connected successfully.")
    except Exception as e:
        print("Database connection failed:", e)
    yield
    # (Optional) Add shutdown logic here

app = FastAPI(lifespan=lifespan)
app.add_middleware(AuthMiddleware)

app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(posts_router.router, prefix="/api/v1")
app.include_router(user_router.router, prefix="/api/v1")