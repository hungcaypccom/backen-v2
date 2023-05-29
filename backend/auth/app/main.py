from fastapi import FastAPI, APIRouter
from app.api import authentication, users, admin
from fastapi.middleware.cors import CORSMiddleware
from app.auth.model import Register

payload = Register(
    username="admin",
    password="admin",
    role="admin",
    name="admin",
    date_start="01-01-2023",
    date_end="01-01-2100",
    phone_number="0849770889",
    adress="3dmed",
    website="3dmed",
    source="3dmed"
)

router = APIRouter()
app = FastAPI()


origins = ["http://14.179.6.181",
           "http://127.0.0.1:5500",
           "http://14.179.6.181:53221",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await admin.register_user(payload)
  

app.include_router(authentication.router)
app.include_router(users.router)
app.include_router(admin.router)


