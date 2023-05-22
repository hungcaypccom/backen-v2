from pydantic import BaseModel

class ResponseMessage(BaseModel):
    status: int
    message: str


class LoginSchema(BaseModel):
    username: str
    password: str

class UpdatePassword(BaseModel):
    old_password: str
    new_password: str


class PersonUpdate(BaseModel):
    name:str
    phone_number:str
    adress:str
    website:str

class Account(BaseModel):
    accountNo: str
