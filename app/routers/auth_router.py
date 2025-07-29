from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from app.schemas.user_schema import UserOut, UserCreate, UserLogin
from app.core.security import verify_password, create_access_token
from app.services.user_service import get_user_by_email, create_user
from app.dependencies import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
       exisitng_user = get_user_by_email(db, user.email)

       if exisitng_user:
              raise HTTPException(status_code=400, detail="Email Already registered")
       
       db_user=create_user(db, user)
       return db_user

@router.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, user_data.email)

    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(data={"user_id": user.id})

    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,   # 🔐 use False in local dev if needed
        samesite="None",
        max_age=60 * 15,
        path="/"  
    )
    return response

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}