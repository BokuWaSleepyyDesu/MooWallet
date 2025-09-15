@echo off
cd /d "F:\Coding\MooWallet\Source Code\Backend"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload