import pathlib
from typing import Any

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

from document_registry import build_system_prompt

load_dotenv(pathlib.Path(__file__).parent.parent / ".env")

client = OpenAI()
MODEL = "gpt-5"


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    current_data: dict
    document_type: str


class ChatResponse(BaseModel):
    message: str
    fields: dict[str, Any]


def get_ai_response(messages: list[ChatMessage], current_data: dict, document_type: str) -> ChatResponse:
    system = build_system_prompt(document_type) + f"\nCurrent document state: {current_data}\n"
    openai_messages = [{"role": "system", "content": system}]
    openai_messages.extend({"role": m.role, "content": m.content} for m in messages)

    response = client.chat.completions.create(
        model=MODEL,
        messages=openai_messages,
        response_format={"type": "json_object"},
    )
    content = response.choices[0].message.content
    return ChatResponse.model_validate_json(content)
