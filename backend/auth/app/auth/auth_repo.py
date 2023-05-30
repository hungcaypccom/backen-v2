
from fastapi import Request, HTTPException, Cookie
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from jose import ExpiredSignatureError, JWTError
from datetime import datetime, timedelta
from typing import Optional

from app.auth.model import ResponseMessage
from jose.exceptions import ExpiredSignatureError, JWSError, JWTClaimsError
from app.auth.config import SECRET_KEY_ACCESS_TOKEN, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, ACCESS_TOKEN_EXPIRE_DAYS, ACCESS_TOKEN_EXPIRE_YEARS, ACCESS_TOKEN_EXPIRE_TYPE
from app.auth.config import REFRESH_TOKEN_EXPIRE_DAYS, REFRESH_TOKEN_EXPIRE_MINUTES,REFRESH_TOKEN_EXPIRE_TYPE,REFRESH_TOKEN_EXPIRE_YEARS,SECRET_KEY_REFRESH_TOKEN


class JWTRepo:

    def __init__(self, data: dict = {}, token: str = None):
        self.data = data
        self.token = token

    def generate_access_token(self, expires_delta: Optional[timedelta] = None):
        to_encode = self.data.copy()
        if expires_delta :
            expire = datetime.utcnow() + expires_delta
        elif ACCESS_TOKEN_EXPIRE_TYPE == "DAYS":
            expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
            to_encode.update({"exp": expire})
        elif ACCESS_TOKEN_EXPIRE_TYPE == "YEARS":
            expire = datetime.utcnow() + timedelta(year=ACCESS_TOKEN_EXPIRE_YEARS)
            to_encode.update({"exp": expire})
        elif ACCESS_TOKEN_EXPIRE_TYPE == "MINUTES":
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            to_encode.update({"exp": expire})
        else:
            to_encode.update()
        encode_jwt = jwt.encode(to_encode, SECRET_KEY_ACCESS_TOKEN, algorithm=ALGORITHM)
        return encode_jwt
    
    def generate_refresh_token(self, expires_delta: Optional[timedelta] = None):
        to_encode = self.data.copy()
        if expires_delta :
            expire = datetime.utcnow() + expires_delta
        elif REFRESH_TOKEN_EXPIRE_TYPE == "DAYS":
            expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
            to_encode.update({"exp": expire})
        elif REFRESH_TOKEN_EXPIRE_TYPE == "YEARS":
            expire = datetime.utcnow() + timedelta(year=REFRESH_TOKEN_EXPIRE_YEARS)
            to_encode.update({"exp": expire})
        elif REFRESH_TOKEN_EXPIRE_TYPE == "MINUTES":
            expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
            to_encode.update({"exp": expire})
        else:
            to_encode.update()
        encode_jwt = jwt.encode(to_encode, SECRET_KEY_REFRESH_TOKEN, algorithm=ALGORITHM)
        return encode_jwt

    def decode_access_token(self):
        try:
            decode_token = jwt.decode(
                self.token, SECRET_KEY_ACCESS_TOKEN, algorithms=[ALGORITHM])
            return decode_token #if decode_token["exp"] >= datetime.time() else None
        except ExpiredSignatureError:
            raise HTTPException(
                status_code=401, detail="Expired access token!")
        except JWTError:
            raise HTTPException(
                status_code=403, detail="Invalid authentication access token!")
        
    def decode_refresh_token(self):
        try:
            decode_token = jwt.decode(
                self.token, SECRET_KEY_REFRESH_TOKEN, algorithms=[ALGORITHM])
            return decode_token #if decode_token["exp"] >= datetime.time() else None
        except ExpiredSignatureError:
            raise HTTPException(
                status_code=401, detail="Expired refresh token!")
        except JWTError:
            raise HTTPException(
                status_code=403, detail="Invalid authentication refresh token!")

  