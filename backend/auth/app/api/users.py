from fastapi import APIRouter,Depends,Security, Response, Body
from fastapi.responses import JSONResponse
from app.middleware.middleware import Cookie_Auth



from app.service.service_users import get_user, update_user, update_password, get_infoData_by_accountNo, get_total_infoData_by_accountNo, download_file, delete_file
from app.auth.model import PersonUpdate, UpdatePassword


router = APIRouter(
    prefix="/api/users",
    tags=['user'],
    dependencies=[Depends(Cookie_Auth())]
)


@router.get("/get-user", response_model_exclude_none=True)
async def user(credentials= Security(Cookie_Auth())):
    return await get_user(credentials["username"])


@router.post("/update-user",  response_model_exclude_none=True)
async def user(request_body: PersonUpdate, credentials= Security(Cookie_Auth())):
    return await update_user(credentials["username"], request_body)


@router.post("/update-password", response_model_exclude_none=True)
async def user(request_body: UpdatePassword, credentials= Security(Cookie_Auth())):
    return await update_password(request_body, credentials["username"])

@router.get("/get-infoData-by-username", response_model_exclude_none=True)
async def user(page: int, count: int, downloadable: bool, credentials= Security(Cookie_Auth())):
    return await get_infoData_by_accountNo(credentials["username"], page, count, downloadable)


@router.get("/get-total-infoData-by-accountNo", response_model_exclude_none=True)
async def user( downloadable:bool, credentials= Security(Cookie_Auth())):
    return await get_total_infoData_by_accountNo(credentials["username"], downloadable)


@router.get("/download-file", response_model_exclude_none=True)
async def user(uploadTimeStr: str, credentials= Security(Cookie_Auth())):
    return await download_file(uploadTimeStr, credentials["username"])

@router.post("/delete-file", response_model_exclude_none=True)
async def user(data: list[str], credentials= Security(Cookie_Auth())):
    return await delete_file(credentials["username"], data)




