import os
import httpx
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from app.config import URL_HANS3D, URL_USERS


async def find_by_username(username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_USERS}/api/user/find-by-username/{username}")
        if response.status_code == 200:
            return response
        else:
            return JSONResponse(content={"detail":response.json()}, status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")