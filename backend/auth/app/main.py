
from fastapi import FastAPI, APIRouter
from app.auth.model import PersonUpdate, Account
from app.api import authentication, users
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import uvicorn

router = APIRouter()
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["get", "post", "options"],
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory="/build", html=True))

async def get_data():
    # Your API logic here
    return {"message": "Hello, world!"}

app.include_router(authentication.router)
app.include_router(users.router)
