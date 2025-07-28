from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List

from app.schemas.post_schema import PostCreate, PostOut, PostUpdate
from app.dependencies import get_db
from app.services import post_service as crud_post
from app.routers.user_router import get_current_user



router = APIRouter(prefix="/posts", tags=["Posts"])

# ✅ CREATE post
@router.post("/create", response_model=PostOut)
def create_post(
    post_data: PostCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    return crud_post.create_post(db, post_data, request.state.user_id)
# ✅ LIST all posts
@router.get("/all", response_model=List[PostOut])
def list_posts(db: Session = Depends(get_db)):
    return crud_post.get_all_posts(db)

# ✅ GET single post
@router.get("/{post_id}", response_model=PostOut)
def get_post(
    post_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    post = crud_post.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post  # 🔁 Just return the post, no update here!

# ✅ UPDATE post
@router.put("/{post_id}", response_model=PostOut)
def update_post(
    post_id: int,
    request: Request,
    post_data: PostUpdate,
    db: Session = Depends(get_db)
):
    post = crud_post.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.author_id != request.state.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")

    return crud_post.update_post(db, post, post_data)

# ✅ DELETE post
@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    request: Request,
    db: Session = Depends(get_db),
):
    post = crud_post.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.author_id != request.state.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")

    crud_post.delete_post(db, post)
    return {"message": "Post deleted successfully"}
