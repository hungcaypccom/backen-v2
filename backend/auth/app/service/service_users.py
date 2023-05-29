
import httpx
from fastapi import HTTPException
from fastapi.responses import JSONResponse, FileResponse
from app.config import URL_HANS3D, URL_USERS



async def get_user(username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_USERS}/api/user/get-user/{username}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")


async def find_by_username(username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_USERS}/api/user/find-by-username/{username}")
        if response.status_code == 200:
            return response
            return JSONResponse({"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def update_user(username: str, payload):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_USERS}/api/user/update-user/{username}", json=payload.dict())
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Update user successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")



async def update_password(payload, username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_USERS}/api/user/update-password-user/{username}" , json=payload.dict())
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Update password successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def get_infoData_by_accountNo(accountNo: str, page: int, count: int, downloadable: bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-infoData-by-accountNo?accountNo={accountNo}&page={page}&count={count}&downloadable={downloadable}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    
    
async def get_total_infoData_by_accountNo(username: str, downloadable:bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-total-infoData-by-accountNo?username={username}&downloadable={downloadable}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def download_file(uploadTimeStr: str, username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/download-file?name={uploadTimeStr}&username={username}")
        if response.status_code == 200:
            try:
                return (FileResponse(response.json(), media_type="application/zip", filename=f'{uploadTimeStr}.zip', status_code=200))
                #return response.iter_raw()
            except Exception as er:
                print(er)
                raise HTTPException(status_code=500, detail="Internal server error")
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def delete_file(username, data: list[str]):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_HANS3D}/api/delete-file?username={username}", json=data)
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Delete successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    