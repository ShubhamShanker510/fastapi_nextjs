from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.security import decode_access_token


EXEMPT_PATHS = [
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/posts/all",
    "/openapi.json",
    "/docs",
    "/docs/oauth2-redirect",
    "/redoc"
]


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path.rstrip("/")
        print("🔥 PATH RECEIVED:", repr(path))
        if path in EXEMPT_PATHS:
            return await call_next(request)
        
        token = request.cookies.get("access_token")

        if not token:
            return JSONResponse(
                status_code=401,
                content={"message": "Access token is missing"}
            )

        payload = decode_access_token(token)

        if not payload or not payload.get("user_id"):
            return JSONResponse(
                status_code=401,
                content={"message": "Invalid or expired token"}
            )
        print("payload: ", payload)

        # Attach user_id to the request state for downstream use
        request.state.user_id = payload.get("user_id")

        # Token is valid, proceed to the route
        response = await call_next(request)
        return response