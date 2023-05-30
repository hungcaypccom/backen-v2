from fastapi import FastAPI, APIRouter
from app.db.db import metadata, database, engine
from app.db.models import InfoData, Account
<<<<<<< HEAD
from app.db.db_infoData_manager import add_infoData, update_infoData, delete_infoData, get_all_infoData, get_infoData_by_accountNo, get_total_by_accountNo
from app.db.db_account_manager import add_account, get_all_account, delete_account
=======


>>>>>>> origin/hung
from app.auto_download.auto_download_service import AutoDownloadService
from app.auto_download import config as AutoDownloadConfig
from app.api import service
import os
import asyncio

metadata.create_all(engine)

router = APIRouter
app = FastAPI()



async def auto_compare():
    while True:
        await AutoDownloadService.auto_login()
        await AutoDownloadService.sync_infoData()
        await asyncio.sleep(AutoDownloadConfig.interval_compare_infoData) 

async def auto_download():
    while True:
        await AutoDownloadService.download()
        await asyncio.sleep(AutoDownloadConfig.interval_download) 


@app.on_event("startup")
async def startup():
    await database.connect()
    task1 = asyncio.create_task(auto_compare())
    task2 = asyncio.create_task(auto_download())
    asyncio.gather(task1, task2)
    
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

<<<<<<< HEAD
@app.get("/")
async def index():
    return ("hello world") 

@app.post("/create")
async def create(payload: InfoData):
    id = await add_infoData(payload)
    return id

@app.post("/update")
async def create(uploadTimeStr: str, status: bool, downloadable: bool):
    result = await update_infoData(uploadTimeStr, status, downloadable)
    return result

@app.get("/get_all")
async def create():
    result = await get_all_infoData()
    return result

@app.get("/get_infodata_by_account")
async def create(accountNo: str, page: int, count: int, downloadable: bool):
    result = await get_infoData_by_accountNo(accountNo=accountNo, page=page, count=count, downloadable=downloadable)
    return result

@app.get("/get_total")
async def create(accountNo: str, downloadable: bool):
    result = await get_total_by_accountNo(accountNo=accountNo, downloadable=downloadable)
   
    return result


@app.post("/add_account")
async def create(payload: Account):
    result = await add_account(payload)
    return result

@app.get("/get_account")
async def create():
    result = await get_all_account()
    return result

@app.get("/login")
async def create():
    result = await AutoDownloadService.auto_login()
    return result


@app.get("/sygn")
async def create():
    result = await AutoDownloadService.sync_infoData()
    return result

@app.get("/download")
async def create():
    result = await AutoDownloadService.download()
    return result
=======












>>>>>>> origin/hung

@app.get("/os")
async def create():
    if os.path.exists('/Users/hungnguyenminh/Learning/Python/web_3dmed_backend_v2'):
        print("cos")
    result = await AutoDownloadService.download()
    return result

app.include_router(service.router)