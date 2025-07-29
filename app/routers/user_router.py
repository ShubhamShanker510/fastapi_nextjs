from fastapi import APIRouter, Request, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.services.user_service import get_user_by_id
from app.dependencies import get_db

router = APIRouter(tags=["users"])

def get_current_user_id(request: Request):
    user_id = getattr(request.state, "user_id", None)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return user_id

@router.get("/profile")
def get_current_user(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    user_detail = get_user_by_id(db, user_id)
    if not user_detail:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user_detail.id,
        "username": user_detail.username,
        "email": user_detail.email,
    }