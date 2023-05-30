from fastapi import APIRouter
from app.db.db_user_manager import admin_only_get_all_user, admin_only_get_user, admin_only_register_user, admin_only_update_password_user
from app.db.db_user_manager import admin_ony_delete_user, admin_only_update_user, find_by_username
<<<<<<< HEAD
from app.db.model import PersonUpdate, ResponseMessage
=======
from app.db.db_role_manager import register_role, delete_role, get_all_role
from app.db.model import  Register, UserUpdate, Role
>>>>>>> origin/hung
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/api/admin",
    tags=['admin']  
)

<<<<<<< HEAD
=======
@router.post("/admin-only-register-user")
async def admin(payload: Register):
    result = await admin_only_register_user(payload)
    return result

@router.post("/admin-only-update-user")
async def admin(payload: UserUpdate):
    result = await admin_only_update_user(payload)
    return result

@router.post("/admin-delete-user")
async def admin(username:str):
    result = await admin_ony_delete_user(username)
    return result

@router.post("/admin-only-update-password-user")
async def admin(username: str, new_password: str):
    result = await admin_only_update_password_user(username, new_password)
    return result

@router.post("/admin-only-register-role")
async def admin(payload: Role):
    result = await register_role(payload)
    return result

@router.post("/admin-only-delete-role")
async def admin(role: str):
    result = await delete_role(role)
    return result

@router.get("/admin-only-get-all-role")
async def admin():
    result = await get_all_role()
    return result

>>>>>>> origin/hung
@router.get("/admin-only-get-user/{username}")
async def admin(username):
    result = await admin_only_get_user(username)
    return result

<<<<<<< HEAD
=======
@router.get("/admin-only-get-all-user")
async def admin():
    result = await admin_only_get_all_user()
    return result

>>>>>>> origin/hung
@router.get("/find-by-username/{username}")
async def admin(username):
    result = await find_by_username(username)
    return result

<<<<<<< HEAD
"""@router.post("/update-user/{username}")
async def user(username, payload: PersonUpdate):
    result = await update_user(username, payload)
    return result

@router.post("/update-password-user/{username}/{old_password}/{new_password}")
async def user(username:str, old_password: str, new_password: str):
    result = await update_password_user(username,old_password, new_password)
    return result"""
=======
>>>>>>> origin/hung
