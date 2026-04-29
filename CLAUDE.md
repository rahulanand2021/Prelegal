# Prelegal Project

## Overview

This is a SaaS product to allow users to draft legal agreements based on templates in the templates directory.
The user can carry out AI chat in order to establish what document they want and how to fill in the fields.
The available documents are covered in the catalog.json file in the project root, included here:

@catalog.json

The current implementation has a working Docker-packaged foundation with a fake login screen and the Mutual NDA creator on the platform page. Full AI chat, multi-document support, real authentication, and document persistence are not yet implemented.

## Development process

When instructed to build a feature:
1. Use your Atlassian tools to read the feature instructions from Jira
2. Develop the feature - do not skip any step from the feature-dev 7 step process
3. Thoroughly test the feature with unit tests and integration tests and fix any issues
4. Submit a PR using your github tools

## AI design

When writing code to make calls to LLMs, use your cerebras skill to call LLM via OpenAI SDK to the `gpt-5` model with OPENAI as the inference provider. You should use Structured Outputs so that you can interpret the results and populate fields in the legal document.

There is an OPENAI_API_KEY in the .env file in the project root.

## Technical design

The entire project should be packaged into a Docker container.  
The backend should be in backend/ and be a uv project, using FastAPI.  
The frontend should be in frontend/  
The database should use SQLLite and be created from scratch each time the Docker container is brought up, allowing for a users table with sign up and sign in.  
The frontend is statically built (Next.js `output: export`) and served by FastAPI from `frontend/out/`.  
There should be scripts in scripts/ for:  

```bash
# Mac
scripts/start-mac.sh    # Start
scripts/stop-mac.sh     # Stop

# Linux
scripts/start-linux.sh
scripts/stop-linux.sh

# Windows
scripts/start-windows.ps1
scripts/stop-windows.ps1
```
Backend available at http://localhost:8000

## Color Scheme
- Accent Yellow: `#ecad0a`
- Blue Primary: `#209dd7`
- Purple Secondary: `#753991` (submit buttons)
- Dark Navy: `#032147` (headings)
- Gray Text: `#888888`

## Implementation Status (as of PL-4)

**Done:**
- Docker multi-stage build: Node.js builds Next.js static export; Python/FastAPI serves it
- `docker-compose.yml` and start/stop scripts for Mac, Linux, Windows
- FastAPI backend (`backend/`) as a `uv` project; serves static frontend from `frontend/out/`
- SQLite DB initialized on startup with a `users` table (email, created_at)
- Login/signup UI at `/` — fake auth only (stores email in `localStorage`, no password validation)
- Platform page at `/platform` — session-gated (redirects to `/` if no `localStorage` entry); currently shows Mutual NDA creator only
- `/api/health` endpoint

**Done (PL-5):**
- AI chat panel replaces the left-panel form (`frontend/components/NdaChat.tsx`)
- FastAPI `/api/chat` endpoint calls OpenAI `gpt-5` with `response_format: json_object`
- AI greets the user, asks about all NDA fields (including both parties), and updates the live preview in real time
- Structured JSON response `{message, fields}` allows partial field updates per turn
- Full conversation history sent each turn so the AI has context across the conversation

**Not yet done:**
- Real authentication (password hashing, JWT/session tokens, DB lookup)
- Support for document types beyond Mutual NDA
- Document persistence (saving/loading drafted agreements)