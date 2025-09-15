@echo off
cd /d "./Source Code/Backend"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload