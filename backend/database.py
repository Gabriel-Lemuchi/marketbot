import os
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME", "supermarket_chatbot")

if not MONGODB_URL:
    raise ValueError("❌ MONGODB_URL não definido no .env")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DB_NAME]

def get_users_collection():
    return db["users"]

def to_object_id(id_str: str) -> ObjectId:
    return ObjectId(id_str)

def doc_to_dict(doc: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if not doc:
        return None
    out = dict(doc)
    if "_id" in out:
        out["id"] = str(out["_id"])
        del out["_id"]
    return out

async def test_connection():
    try:
        await db.command("ping")
        print("✅ Conectado ao MongoDB com sucesso!")
    except Exception as e:
        print("❌ Erro ao conectar no MongoDB:", e)
