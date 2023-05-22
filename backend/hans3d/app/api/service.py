from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.db.db_infoData_manager import update_infoData, get_all_infoData, get_infoData_by_accountNo, get_infoData_by_status, get_total_by_accountNo
from app.db.db_account_manager import add_account, get_all_account
from app.db.models import Account

router = APIRouter(
    prefix="/api",
    tags=['info']  
)

@router.get("/get-infoData-by-accountNo")
async def info(accountNo: str, page: int, count: int, downloadable: bool):
    result = await get_infoData_by_accountNo(accountNo, page, count, downloadable)
    return result

@router.get("/get-total-by-accountNo")
async def info(username, downloadable:bool):
    result = await get_total_by_accountNo(username, downloadable)
    return result

@router.post("/add-account")
async def info(username: Account):
    result = await add_account(username)
    return result

