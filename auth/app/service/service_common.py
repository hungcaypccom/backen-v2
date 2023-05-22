"""import os
import httpx
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from app.auth.model import Account

URL_USERS = os.getenv('URL_HANS3D')

async def add_account(payload: Account):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.poset(f"http://localhost:8003/add_account", json=payload.dict())
        if response.status_code == 200:
            return JSONResponse(content=response.json(), status_code=200)
        else:ß
            return JSONResponse(response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")"""
    