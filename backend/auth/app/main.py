
from fastapi import FastAPI, APIRouter
from app.auth.model import PersonUpdate, Account
from app.api import authentication, users
from fastapi.middleware.cors import CORSMiddleware
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
    max_age=10,
)

app.include_router(authentication.router)
app.include_router(users.router)

