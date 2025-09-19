from pydantic import BaseModel, EmailStr
from typing import List, Optional


class ChatItem(BaseModel):
    role: str
    content: str


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: str
    name: str
    email: EmailStr
    chats: Optional[List[ChatItem]] = []


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChatRequest(BaseModel):
    userId: str
    message: str


def user_helper(user_doc: dict) -> dict:
    return {
        "id": str(user_doc.get("_id") or user_doc.get("id")),
        "name": user_doc.get("name"),
        "email": user_doc.get("email"),
        "chats": user_doc.get("chats", []),
    }
