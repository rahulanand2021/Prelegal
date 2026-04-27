$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptDir\.."
docker compose up -d --build
Write-Host "Prelegal running at http://localhost:8000"
