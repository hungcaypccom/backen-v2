from fastapi import APIRouter,  Cookie, Depends
from fastapi.responses import Response

from fastapi.responses import JSONResponse
from app.auth.model import LoginSchema
from app.auth.auth_service import AuthService
from app.middleware.middleware import CookieAuth_RefreshToken
from fastapi import Security


router = APIRouter(prefix="/api/auth", tags=['Authentication'], 
                    )



@router.post("/login", response_model_exclude_none=True)
async def login_user(requset_body: LoginSchema, responses : Response):
    token = await AuthService.logins_service(requset_body)
    responses = JSONResponse(content={"detail":"Login successfully!"}, status_code=200, headers=token)
    responses.set_cookie(key="access_token", value=token["access_token"], samesite=None)
    responses.set_cookie(key="refresh_token", value=token["refresh_token"], samesite=None)
    return responses

@router.post("/admin", response_model_exclude_none=True)
async def login_admin(requset_body: LoginSchema, responses: Response):
    token = await AuthService.admin_only_logins_service(requset_body)
    responses = JSONResponse(content={"detail":"Login successfully!"}, status_code=200, headers=token)
    responses.set_cookie(key="access_token", value=token["access_token"], samesite=None)
    responses.set_cookie(key="refresh_token", value=token["refresh_token"], samesite=None)
    return responses

@router.post("/refresh-token", response_model_exclude_none=True)
async def refresh_token( responses: Response, credentials= Security(CookieAuth_RefreshToken())):
    token = await AuthService.refresh_token(credentials["username"],credentials["role"])
    responses = JSONResponse(content={"detail":"Refresh token successfully!"}, status_code=200, headers=token)
    responses.set_cookie(key="access_token", value=token["access_token"], samesite=None)
    return responses

