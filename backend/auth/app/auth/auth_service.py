from app.auth.model import LoginSchema
from app.service.service_common import find_by_username
from datetime import date
from fastapi import HTTPException
from passlib.context import CryptContext
from app.auth.auth_repo import JWTRepo
from datetime import datetime
from app.db.redis import set_value


# Encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:

    @staticmethod
    async def logins_service(login: LoginSchema):
        _username = (await find_by_username(login.username)).json()
        if _username is not None:
            if datetime.strptime(_username["date_end"], '%Y-%m-%dT%H:%M:%S') < datetime.today():
               raise HTTPException(
                    status_code=403, detail="Account Expired!")
            if _username["role"] != "user":
                raise HTTPException(
                    status_code=403, detail="You are not User!")
            if not pwd_context.verify(login.password, _username["password"]):
                raise HTTPException(
                    status_code=400, detail="Invalid password")
            token = { "access_token": JWTRepo(data={"username": _username["username"], "role":_username["role"]}).generate_access_token()
                     , "refresh_token": JWTRepo(data={"username": _username["username"], "role":_username["role"]}).generate_refresh_token()
                    }
            await set_value(_username["username"], token["refresh_token"])
            return token
        raise HTTPException(status_code=404, detail="Username not Found")



    @staticmethod
    async def admin_only_logins_service(login: LoginSchema):
        _username = (await find_by_username(login.username)).json()
        if _username is not None:
            if datetime.strptime(_username["date_end"], '%Y-%m-%dT%H:%M:%S') < datetime.today():
               raise HTTPException(
                    status_code=403, detail= "Account Expired!")
            if (_username["role"] == "admin"):
                if not pwd_context.verify(login.password, _username['password']):
                    raise HTTPException(
                    status_code=400, detail="Invalid password")
                token = { "access_token": JWTRepo(data={"username": _username["username"], "role":_username["role"]}).generate_access_token()
                     , "refresh_token": JWTRepo(data={"username": _username["username"], "role":_username["role"]}).generate_refresh_token()
                    }
                await set_value(_username["username"], token["refresh_token"])
                return token
            raise HTTPException(status_code=403, detail="You are not Admin")
        raise HTTPException(status_code=404, detail="Username not Found")
    

    @staticmethod
    async def refresh_token(username, role):
        new_token = { "access_token": JWTRepo(data={"username": username, "role":role}).generate_access_token()
                    }
        return new_token


 
  