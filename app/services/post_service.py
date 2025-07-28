# crud logic method for post
from sqlalchemy.orm import Session
from app.models.post_model import Post
from app.schemas.post_schema import PostCreate, PostUpdate

def create_post(db: Session, data: PostCreate, user_id: int) -> Post:
    post=Post(**data.model_dump(), author_id=user_id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_post(db: Session, post_id: int) -> Post | None:
    return db.query(Post).filter(Post.id == post_id).first()

def get_all_posts(db: Session) -> list[Post]:
    return db.query(Post).order_by(Post.created_at.desc()).all()

def update_post(db: Session, post: Post, data: PostUpdate) -> Post:
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(post, key, value)

    db.commit()
    db.refresh(post)
    return post

def delete_post(db: Session, post: Post):
    db.delete(post)
    db.commit()



