import json

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

import database
from auth import CurrentUser

router = APIRouter(prefix="/api/documents")


class SaveRequest(BaseModel):
    doc_id: int | None = None
    doc_type: str
    doc_name: str
    fields: dict


@router.get("")
def list_documents(user_id: CurrentUser) -> list:
    conn = database.get_conn()
    rows = conn.execute(
        "SELECT id, doc_type, doc_name, fields_json, updated_at "
        "FROM documents WHERE user_id = ? ORDER BY updated_at DESC",
        (user_id,),
    ).fetchall()
    conn.close()
    result = []
    for r in rows:
        item = dict(r)
        item["fields"] = json.loads(item.pop("fields_json"))
        result.append(item)
    return result


@router.post("")
def save_document(req: SaveRequest, user_id: CurrentUser) -> dict:
    fields_json = json.dumps(req.fields)
    conn = database.get_conn()
    if req.doc_id is not None:
        row = conn.execute(
            "SELECT id FROM documents WHERE id = ? AND user_id = ?",
            (req.doc_id, user_id),
        ).fetchone()
        if not row:
            conn.close()
            raise HTTPException(status_code=404, detail="Document not found")
        conn.execute(
            "UPDATE documents SET doc_name = ?, fields_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (req.doc_name, fields_json, req.doc_id),
        )
        conn.commit()
        conn.close()
        return {"id": req.doc_id}
    cursor = conn.execute(
        "INSERT INTO documents (user_id, doc_type, doc_name, fields_json) VALUES (?, ?, ?, ?)",
        (user_id, req.doc_type, req.doc_name, fields_json),
    )
    doc_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"id": doc_id}


@router.get("/{doc_id}")
def get_document(doc_id: int, user_id: CurrentUser) -> dict:
    conn = database.get_conn()
    row = conn.execute(
        "SELECT id, doc_type, doc_name, fields_json, created_at, updated_at "
        "FROM documents WHERE id = ? AND user_id = ?",
        (doc_id, user_id),
    ).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Document not found")
    data = dict(row)
    data["fields"] = json.loads(data.pop("fields_json"))
    return data
