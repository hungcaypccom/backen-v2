from fastapi import APIRouter

from app.db.db_user_manager import update_password_user
from app.db.db_user_manager import update_user, get_user, find_by_username
from app.db.model import PersonUpdate, ResponseMessage, UpdatePassword
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/api/user",
    tags=['user']  
)

@router.get("/get-user/{username}")
async def user(username):
    result = await get_user(username)
    return result

@router.get("/find-by-username/{username}")
async def admin(username):
    result = await find_by_username(username)
    return result

@router.post("/update-user/{username}")
async def user(username, payload: PersonUpdate):
    result = await update_user(username, payload)
    return result

@router.post("/update-password-user/{username}")
async def user(username:str, payload: UpdatePassword):
    result = await update_password_user(username, payload.old_password, payload.new_password)
    return result