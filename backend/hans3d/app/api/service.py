from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.db.db_infoData_manager import update_infoData, get_infoData_by_accountNo, get_total_by_accountNo
from app.db.db_infoData_manager import get_total_infoData_by_downloadable, get_infoData_by_downloadable, get_total_infoData_by_status, get_infoData_by_status
from app.db.db_account_manager import add_account, get_all_account, delete_account
from app.client_download.client_download import client_download_file, client_delete_file
from app.db.models import Account

router = APIRouter(
    prefix="/api",
    tags=['info']  
)

@router.get("/get-infoData-by-accountNo")
async def info(accountNo: str, page: int, count: int, downloadable: bool):
    result = await get_infoData_by_accountNo(accountNo, page, count, downloadable)
    return result

@router.get("/get-total-infoData-by-accountNo")
async def info(username, downloadable:bool):
    result = await get_total_by_accountNo(username, downloadable)
    return result

@router.get("/get-total-infoData-by-downloadable")
async def info(downloadable: bool):
    result = await get_total_infoData_by_downloadable(downloadable)
    return result

@router.get("/get-infoData-by-downloadable")
async def info(downloadable: bool, page: int, count: int):
    result = await get_infoData_by_downloadable(downloadable, page, count)
    return result

@router.get("/get-total-infoData-by-status")
async def info(status: bool):
    result = await get_total_infoData_by_status(status)
    return result

@router.get("/get-infoData-by-status")
async def info(status: bool, page:int, count:int):
    result = await get_infoData_by_status(status, page, count)
    return result


@router.post("/update-infoData")
async def info(uploadTimeStr: str,status: bool ,downloadable: bool):
    result = await update_infoData(uploadTimeStr,status,downloadable)
    return result

############ client_download #########
@router.get("/download-file")
async def download(name, username):
    result = await client_download_file(name, username)
    return result

@router.post("/delete-file")
async def download(datalist: list[str], username):
    result = await client_delete_file(datalist, username)
    return result

############ account ######
@router.post("/add-account")
async def account(username: Account):
    result = await add_account(username)
    return result

@router.post("/delete-account")
async def account(username):
    result = await delete_account(username)
    return result

@router.get("/get-all-account")
async def account():
    result = await get_all_account()
    return result
