
from fastapi import APIRouter,Depends,Security, Response, Body
from fastapi.responses import JSONResponse
from app.middleware.middleware import Cookie_Auth_Admin
from app.service.service_admin import get_all_user, get_user, register_user, update_password, delete_user, update_user
from app.service.service_admin import get_infoData_by_accountNo, get_infoData_by_downloadable, get_infoData_by_status,get_total_infoData_by_accountNo
from app.service.service_admin import get_total_infoData_by_downloadable, get_total_infoData_by_status, update_infoData, delete_file, download_file
from app.service.service_admin import add_hans3d_account, delete_hans3d_account, get_all_hans3d_account
from app.auth.model import Register, UserUpdate, Account

from app.middleware.middleware import Cookie_Auth_Admin

router = APIRouter(
    prefix="/admin",
    tags=['admin'],
    dependencies=[Depends(Cookie_Auth_Admin())]
)


@router.post("/register-user", response_model_exclude_none=True)
async def admin(request_body: Register):
    return await register_user(request_body)

@router.post("/update-user", response_model_exclude_none=True)
async def admin(request_body: UserUpdate):
    return await update_user(request_body)

@router.post("/delete-user", response_model_exclude_none=True)
async def admin(username: str):
    return await delete_user(username)


@router.post("/update-password", response_model_exclude_none=True)
async def admin(username, new_password):
     return await update_password(username, password=new_password )


@router.get("/get-all-user", response_model_exclude_none=True)
async def admin(credentials= Security(Cookie_Auth_Admin())):
    return await get_all_user()

@router.get("/get-user", response_model_exclude_none=True)
async def admin(username):
    return await get_user(username)



###############  infodata    ###########


@router.get("/get-infoData-by-accountNo", response_model_exclude_none=True)
async def info(username: str, page: int, count: int, downloadable: bool):
    return await get_infoData_by_accountNo(accountNo = username, page = page, count = count, downloadable = downloadable)

@router.get("/get-total-infoData-by-accountNo", response_model_exclude_none=True)
async def info(username: str, downloadable: bool):
    return await get_total_infoData_by_accountNo(username, downloadable)


@router.get("/get-infoData-by-downloadable", response_model_exclude_none=True)
async def info(page: int, count: int, downloadable: bool):
    return await get_infoData_by_downloadable(page, count, downloadable)

@router.get("/get-total-infoData-by-downloadable", response_model_exclude_none=True)
async def info(downloadable: bool):
    return await get_total_infoData_by_downloadable(downloadable)

@router.get("/get-infoData-by-status", response_model_exclude_none=True)
async def info(page: int, count: int, status: bool):
    return await get_infoData_by_status(page, count, status)

@router.get("/get-total-infoData-by-status", response_model_exclude_none=True)
async def info(status: bool):
    return await get_total_infoData_by_status(status)

@router.get("/download-file", response_model_exclude_none=True)
async def info(uploadTimeStr, username):
    return await download_file(uploadTimeStr, username)


@router.post("/delete-file", response_model_exclude_none=True)
async def info(username, data:list[str]):
    return await delete_file(username, data)

@router.post("/update-infoData", response_model_exclude_none=True)
async def info(uploadTimeStr: str ,status: bool, downloadable:bool):
    return await update_infoData(uploadTimeStr, status, downloadable)



################ hans3d account ######################


@router.post("/add-hans3d-account", response_model_exclude_none=True)
async def hans3d_account(payload: Account):
    return await add_hans3d_account(payload)

@router.post("/delete-hans3d-account", response_model_exclude_none=True)
async def hans3d_account(username):
    return await delete_hans3d_account(username)


@router.post("/get-all-hans3d-account", response_model_exclude_none=True)
async def hans3d_acoount():
    return await get_all_hans3d_account()


