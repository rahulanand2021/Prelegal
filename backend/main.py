import pathlib

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import database
from auth import router as auth_router
from chat import ChatRequest, ChatResponse, get_ai_response
from documents import router as documents_router

load_dotenv(pathlib.Path(__file__).parent.parent / ".env")

app = FastAPI(title="Prelegal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

database.init()

app.include_router(auth_router)
app.include_router(documents_router)

STATIC_DIR = pathlib.Path(__file__).parent.parent / "frontend" / "out"


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/chat")
def chat(req: ChatRequest) -> ChatResponse:
    return get_ai_response(req.messages, req.current_data, req.document_type)


@app.get("/api/template")
def get_template(files: str) -> dict:
    templates_dir = (pathlib.Path(__file__).parent.parent / "templates").resolve()
    combined = ""
    for raw in files.split(","):
        filename = raw.strip()
        if not filename.startswith("templates/"):
            raise HTTPException(status_code=400, detail=f"Invalid path: {filename}")
        path = (pathlib.Path(__file__).parent.parent / filename).resolve()
        try:
            path.relative_to(templates_dir)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid path: {filename}")
        if not path.exists():
            raise HTTPException(status_code=404, detail=f"Not found: {filename}")
        combined += path.read_text(encoding="utf-8") + "\n\n---\n\n"
    return {"content": combined.strip()}


if STATIC_DIR.exists():
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
