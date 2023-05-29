from fastapi import FastAPI, APIRouter
from app.db.db import metadata, database, engine
from app.db.models import InfoData, Account


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














@app.get("/os")
async def create():
    if os.path.exists('/Users/hungnguyenminh/Learning/Python/web_3dmed_backend_v2'):
        print("cos")
    result = await AutoDownloadService.download()
    return result

app.include_router(service.router)