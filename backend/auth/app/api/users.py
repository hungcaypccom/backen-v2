from fastapi import APIRouter,Depends,Security, Response, Body
from fastapi.responses import JSONResponse
from app.middleware.middleware import Cookie_Auth
from fastapi import HTTPException


from app.service.service_users import get_user, update_user, update_password, get_infoData_by_accountNo, get_total_by_accountNo
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


@router.get("/get_total_by_username", response_model_exclude_none=True)
async def user( downloadable:bool, credentials= Security(Cookie_Auth())):
    return await get_total_by_accountNo(credentials["username"], downloadable)




"""@router.post("/download-file", response_model=ResponseSchema, response_model_exclude_none=True)
async def download_file(response: Response, uploadTimeStr: str = Body(...), credentials= Security(Cookie_Auth())):
    result = await client_download.client_download_file(response, uploadTimeStr, credentials["username"])
    return(result)
    return ResponseSchema(detail={"status":"Successfully", "message":"Successfully download file" }, result=result)

@router.get("/data-info-total-count",response_model=ResponseSchema, response_model_exclude_none=True)
async def data_info_total_count(downloadable:bool, credentials= Security(Cookie_Auth())):
    result = await info_data_service.InFoDataService.find_by_user_total_count(credentials['username'], downloadable)
    return ResponseSchema(detail={"status":"Successfully", "message":"Successfully got total count" }, result=result)
    
@router.get("/data-info-pagging",response_model=ResponseSchema, response_model_exclude_none=True)
async def data_info_pagging(downloadable:bool, page:int, count:int, credentials= Security(Cookie_Auth())):
    result = await info_data_service.InFoDataService.find_by_user_pagging(credentials['username'], page, count, downloadable)
    return ResponseSchema(detail={"status":"Successfully", "message":"Successfully got data" }, result=result)

@router.post("/delete-file", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_file(response: Response, datalist: list[str], credentials= Security(Cookie_Auth())):
    result = await client_download.client_delete_file(datalist, credentials["username"])
    return ResponseSchema(detail={"status":"Successfully", "message":"Successfully delete data" }, result=result)"""
