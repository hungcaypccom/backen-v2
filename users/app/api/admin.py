from fastapi import APIRouter
from app.db.db_user_manager import admin_only_get_all_user, admin_only_get_user, admin_only_register_user, admin_only_update_password_user
from app.db.db_user_manager import admin_ony_delete_user, admin_only_update_user, find_by_username
from app.db.model import PersonUpdate, ResponseMessage
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/api/admin",
    tags=['admin']  
)

@router.get("/admin-only-get-user/{username}")
async def admin(username):
    result = await admin_only_get_user(username)
    return result

@router.get("/find-by-username/{username}")
async def admin(username):
    result = await find_by_username(username)
    return result

"""@router.post("/update-user/{username}")
async def user(username, payload: PersonUpdate):
    result = await update_user(username, payload)
    return result

@router.post("/update-password-user/{username}/{old_password}/{new_password}")
async def user(username:str, old_password: str, new_password: str):
    result = await update_password_user(username,old_password, new_password)
    return result"""