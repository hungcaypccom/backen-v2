from fastapi import FastAPI, APIRouter
from app.auth.model import PersonUpdate, Account
from app.api import authentication, users
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter()
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authentication.router)
app.include_router(users.router)


