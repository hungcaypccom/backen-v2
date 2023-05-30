from fastapi import FastAPI, APIRouter
from app.db.db import metadata, database, engine
<<<<<<< HEAD
from app.db.db_role_manager import register_role, find_by_name_role, generate_role
from app.db.db_user_manager import admin_only_register_user, update_password_user, admin_ony_delete_user, admin_only_get_user
from app.db.db_user_manager import admin_only_update_password_user, admin_only_update_user,update_user, get_user, admin_only_get_all_user
from app.api import  user, admin
from app.db.model import Register, Role, PersonUpdate, UserUpdate
=======
from app.db.db_role_manager import generate_role
from app.api import  user, admin
>>>>>>> origin/hung

metadata.create_all(engine)

app = FastAPI()
router = APIRouter
<<<<<<< HEAD
Role = Role(role="user")
=======

>>>>>>> origin/hung

@app.on_event("startup")
async def startup():
    await database.connect()
    await generate_role()
    
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

<<<<<<< HEAD

@app.post("/register-role")
async def create():
    id = await generate_role()
    return id

@app.post("/register-user")
async def create(payload: Register):
    id = await admin_only_register_user(payload)
    return id

@app.post("/update-user")
async def create(payload: UserUpdate):
    id = await admin_only_update_user(payload)
    return id


@app.post("/find_role")
async def create(role:str):
    id = await find_by_name_role(role)
    return id

@app.post("/delete-user")
async def create(username:str):
    id = await admin_ony_delete_user(username)
    return id

@app.post("/update-password")
async def create(username:str, old_password: str, new_password: str):
    id = await admin_only_update_password_user(username, new_password)
    return id


@app.post("/update-password-ad")
async def create(username:str, new_password: str):
    id = await admin_only_update_password_user(username, new_password)
    return id

@app.post("/update-person")
async def create(username, payload: PersonUpdate):
    id = await update_user(username ,payload)
    return id

@app.get("/get-user/{username}")
async def create(username):
    id = await get_user(username)
    return id

@app.get("/get-all")
async def create():
    id = await admin_only_get_all_user()
    return id

@app.get("/get-one")
async def create(username):
    id = await admin_only_get_user(username)
    return id



=======
>>>>>>> origin/hung
app.include_router(user.router)
app.include_router(admin.router)
