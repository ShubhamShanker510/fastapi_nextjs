from fastapi import FastAPI
from app.routers import auth_router, posts_router, user_router
from app.db.session import engine
from contextlib import asynccontextmanager
from app.middleware.auth_middleware import AuthMiddleware
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        print("✅ Database connected successfully.")
    except Exception as e:
        print("❌ Database connection failed:", e)
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(AuthMiddleware)

# Apply CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Apply your custom auth middleware

# Routers
app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(posts_router.router, prefix="/api/v1")
app.include_router(user_router.router, prefix="/api/v1")
