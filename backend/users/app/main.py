from fastapi import FastAPI, APIRouter
from app.db.db import metadata, database, engine
from app.db.db_role_manager import generate_role
from app.api import  user, admin

metadata.create_all(engine)

app = FastAPI()
router = APIRouter


@app.on_event("startup")
async def startup():
    await database.connect()
    await generate_role()
    
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(user.router)
app.include_router(admin.router)
