#This creates the base class for all your database models (tables). It's like creating a "template" that all your database tables will inherit from.

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass