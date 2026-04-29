#!/bin/bash
set -e
cd "$(dirname "$0")/.."
docker compose down
pid=$(lsof -ti :8000 2>/dev/null)
[ -n "$pid" ] && kill -9 $pid
