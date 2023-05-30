import os
import httpx
from fastapi import HTTPException
from fastapi.responses import JSONResponse, FileResponse
from app.config import URL_HANS3D, URL_USERS


async def register_user(payload):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_USERS}/api/admin/admin-only-register-user", json=payload.dict())
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Register successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")


async def update_user(payload):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_USERS}/api/admin/admin-only-update-user", json=payload.dict())
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Update successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def delete_user(username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_USERS}/api/admin/admin-delete-user?username={username}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Delete successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")



async def update_password(username, password):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_USERS}/api/admin/admin-only-update-password-user?username={username}&new_password={password}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Update password successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def get_all_user():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_USERS}/api/admin/admin-only-get-all-user")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def get_user(username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_USERS}/api/admin/admin-only-get-user/{username}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
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
    


async def get_total_infoData_by_downloadable(downloadable:bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-total-infoData-by-downloadable?downloadable={downloadable}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    


async def get_infoData_by_downloadable(page: int, count: int, downloadable: bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-infoData-by-downloadable?downloadable={downloadable}&page={page}&count={count}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    


async def get_total_infoData_by_status(status:bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-total-infoData-by-status?status={status}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    


async def get_infoData_by_status(page: int, count: int, status: bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-infoData-by-status?status={status}&page={page}&count={count}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def update_infoData(uploadTimeStr: str, status: bool, downloadable: bool):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_HANS3D}/api/update-infoData?uploadTimeStr={uploadTimeStr}&status={status}&downloadable={downloadable}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Update successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    


async def add_hans3d_account(payload):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_HANS3D}/api/add-account", json=payload.dict())
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Added hans3d account successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def delete_hans3d_account(username):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{URL_HANS3D}/api/delete-account?username={username}")
        if response.status_code == 200:
            return JSONResponse(content={"detail":"Delete successfully"}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")
    

async def get_all_hans3d_account():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{URL_HANS3D}/api/get-all-account")
        if response.status_code == 200:
            return JSONResponse(content={"detail":response.json()}, status_code=200)
        else:
            return JSONResponse(content=response.json(), status_code=response.status_code)
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="Internal server error")