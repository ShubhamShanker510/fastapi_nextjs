from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.services.user_service import get_user_by_id
from app.dependencies import get_db

router = APIRouter(tags=["users"])

@router.get("/profile")
def get_current_user(request: Request, db: Session = Depends(get_db)):
    user_id = request.state.user_id
    user_detail = get_user_by_id(db, user_id)
    if not user_detail:
        return {"error": "User not found"}
    return {
        "name": user_detail.username,
        "email": user_detail.email,
    }