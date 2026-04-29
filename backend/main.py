import pathlib

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import database
from chat import ChatRequest, ChatResponse, get_ai_response

load_dotenv(pathlib.Path(__file__).parent.parent / ".env")

app = FastAPI(title="Prelegal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

database.init()

STATIC_DIR = pathlib.Path(__file__).parent.parent / "frontend" / "out"


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/chat")
def chat(req: ChatRequest) -> ChatResponse:
    return get_ai_response(req.messages, req.current_data)


if STATIC_DIR.exists():
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
