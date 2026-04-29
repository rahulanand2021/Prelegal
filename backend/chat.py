import pathlib
from typing import Literal, Optional

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

load_dotenv(pathlib.Path(__file__).parent.parent / ".env")

client = OpenAI()
MODEL = "gpt-5"

SYSTEM_PROMPT = """You are a legal document assistant helping two parties draft a Mutual Non-Disclosure Agreement (NDA).

Collect these fields through friendly, conversational questions (1-2 questions at a time):

Agreement fields:
- purpose: How confidential information may be used (e.g. "Evaluating a potential partnership")
- effectiveDate: Agreement start date (YYYY-MM-DD)
- mndaTermType: "expires" if it lasts a fixed number of years, or "until_terminated"
- mndaTermYears: Number of years (only when mndaTermType is "expires")
- confidentialityTermType: "years" for a fixed period, or "perpetuity" for forever
- confidentialityTermYears: Number of years (only when confidentialityTermType is "years")
- governingLaw: Governing state, e.g. "Delaware"
- jurisdiction: Courts for disputes, e.g. "courts located in New Castle, DE"
- modifications: Any changes to standard terms; use empty string "" if none

Party 1 and Party 2 (collect the same fields for each):
- name: Full name of the signatory
- title: Job title
- company: Company name
- noticeAddress: Email or postal address for legal notices
- date: Signing date (YYYY-MM-DD)

Rules:
- Greet the user warmly and ask about the NDA's purpose to start
- Ask 1-2 questions at a time in a natural, helpful tone
- When the user provides values, confirm what you're setting and move to the next unfilled fields
- Focus on fields not yet filled in the current document state
- When all fields are collected, congratulate the user and confirm the document is complete

IMPORTANT: Respond ONLY with valid JSON — no markdown, no code fences — in exactly this format:
{
  "message": "your conversational response",
  "fields": {
    "purpose": null,
    "effectiveDate": null,
    "mndaTermType": null,
    "mndaTermYears": null,
    "confidentialityTermType": null,
    "confidentialityTermYears": null,
    "governingLaw": null,
    "jurisdiction": null,
    "modifications": null,
    "party1": null,
    "party2": null
  }
}

Set field values when the user provides them. Use null for fields not being updated this turn.
For party1/party2, provide an object with only the keys being updated, e.g.:
  "party1": {"name": "Alice Smith", "company": "Acme Inc"}
"""


class PartyUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    company: Optional[str] = None
    noticeAddress: Optional[str] = None
    date: Optional[str] = None


class NdaFieldUpdate(BaseModel):
    purpose: Optional[str] = None
    effectiveDate: Optional[str] = None
    mndaTermType: Optional[Literal["expires", "until_terminated"]] = None
    mndaTermYears: Optional[int] = None
    confidentialityTermType: Optional[Literal["years", "perpetuity"]] = None
    confidentialityTermYears: Optional[int] = None
    governingLaw: Optional[str] = None
    jurisdiction: Optional[str] = None
    modifications: Optional[str] = None
    party1: Optional[PartyUpdate] = None
    party2: Optional[PartyUpdate] = None


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    current_data: dict


class ChatResponse(BaseModel):
    message: str
    fields: NdaFieldUpdate


def get_ai_response(messages: list[ChatMessage], current_data: dict) -> ChatResponse:
    system = SYSTEM_PROMPT + f"\nCurrent document state: {current_data}\n"
    openai_messages = [{"role": "system", "content": system}]
    openai_messages.extend({"role": m.role, "content": m.content} for m in messages)

    response = client.chat.completions.create(
        model=MODEL,
        messages=openai_messages,
        response_format={"type": "json_object"},
    )
    content = response.choices[0].message.content
    return ChatResponse.model_validate_json(content)
