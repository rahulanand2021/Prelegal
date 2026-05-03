import secrets
import sqlite3
from typing import Annotated

import bcrypt
from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel

import database

router = APIRouter(prefix="/api/auth")


class AuthRequest(BaseModel):
    email: str
    password: str


def _hash(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def _verify(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())


def _create_session(user_id: int) -> str:
    token = secrets.token_hex(32)
    conn = database.get_conn()
    conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user_id))
    conn.commit()
    conn.close()
    return token


def get_current_user(authorization: Annotated[str | None, Header()] = None) -> int:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization[7:]
    conn = database.get_conn()
    row = conn.execute("SELECT user_id FROM sessions WHERE token = ?", (token,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    return int(row["user_id"])


CurrentUser = Annotated[int, Depends(get_current_user)]


@router.post("/signup")
def signup(req: AuthRequest) -> dict:
    token = secrets.token_hex(32)
    conn = database.get_conn()
    try:
        cursor = conn.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (req.email, _hash(req.password)),
        )
        user_id = cursor.lastrowid
        conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user_id))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=409, detail="Email already registered")
    conn.close()
    return {"token": token, "email": req.email}


@router.post("/signin")
def signin(req: AuthRequest) -> dict:
    conn = database.get_conn()
    row = conn.execute("SELECT id, password_hash FROM users WHERE email = ?", (req.email,)).fetchone()
    conn.close()
    if not row or not _verify(req.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"token": _create_session(int(row["id"])), "email": req.email}


@router.post("/signout")
def signout(authorization: Annotated[str | None, Header()] = None) -> dict:
    if authorization and authorization.startswith("Bearer "):
        token = authorization[7:]
        conn = database.get_conn()
        conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()
    return {"ok": True}
