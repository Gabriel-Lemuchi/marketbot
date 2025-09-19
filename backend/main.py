from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from bson import ObjectId

from database import get_users_collection
from models import UserCreate, LoginRequest, ChatRequest
from intents import get_bot_response

# -----------------------------
# Configuração
# -----------------------------
app = FastAPI()
users = get_users_collection()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Rotas
# -----------------------------

@app.post("/api/v1/user/signup")
async def signup(data: UserCreate):
    existing = await users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = pwd_context.hash(data.password)
    new_user = {"name": data.name, "email": data.email, "password": hashed_pw, "chats": []}
    result = await users.insert_one(new_user)
    return {"id": str(result.inserted_id), "name": data.name, "email": data.email}


@app.post("/api/v1/user/login")
async def login(data: LoginRequest):
    user = await users.find_one({"email": data.email})
    if not user or not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"id": str(user["_id"]), "name": user["name"], "email": user["email"]}


@app.get("/api/v1/user/auth-status")
async def auth_status():
    return {"status": "not_authenticated"}

@app.post("/api/v1/chat/new")
async def chat(data: ChatRequest):
    user = await users.find_one({"_id": ObjectId(data.userId)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    response = get_bot_response(data.message)

    await users.update_one({"_id": ObjectId(data.userId)}, {"$push": {"chats": {"role": "user", "content": data.message}}})
    await users.update_one({"_id": ObjectId(data.userId)}, {"$push": {"chats": {"role": "assistant", "content": response}}})

    updated_user = await users.find_one({"_id": ObjectId(data.userId)})
    return {"chats": updated_user.get("chats", [])}

@app.get("/api/v1/chat/history/{user_id}")
async def get_history(user_id: str):
    user = await users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"chats": user.get("chats", [])}
