import pathlib

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

import database

app = FastAPI(title="Prelegal API")
database.init()

STATIC_DIR = pathlib.Path(__file__).parent.parent / "frontend" / "out"


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
