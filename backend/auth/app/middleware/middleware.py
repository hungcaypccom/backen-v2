from fastapi import Request, HTTPException, Cookie
from app.auth.auth_repo import JWTRepo
from fastapi import Request
from app.db.redis import get_value



class Cookie_Auth(): 
    def __call__(self, request: Request):
        credentials = request.cookies.get("access_token")
        if credentials:
            token = JWTRepo(token = credentials).decode_access_token()
            return token
        else:
            raise HTTPException (
            status_code=401, detail="Missing authorization token"
            )
        
class CookieAuth_RefreshToken(): 
    async def __call__(self, request: Request):
        credentials = request.cookies.get("refresh_token")
        if credentials:
            token = JWTRepo(token = credentials).decode_refresh_token()
            rf_token_database = await get_value(token["username"])
            if rf_token_database == credentials:
                return token
            else:
                raise HTTPException (
                status_code=403, detail="Old refresh token!")
        else:
            raise HTTPException (
            status_code=401, detail= "Missing refresh token"
            )

class Cookie_Auth_Admin(): 
    def __call__(self, request: Request):
        credentials = request.cookies.get("access_token")
        if credentials:
            token = JWTRepo(token = credentials).decode_access_token()
            try:
                if token["role"] == "admin":
                    return token
                else:
                    raise HTTPException (
                    status_code=403, detail="Using user's token!"
                    )
            except:
                raise HTTPException (
                status_code=500, detail="Internal server error"
                )
        else:
            raise HTTPException (
            status_code=401, detail="Missing authorization token"
            )
        
