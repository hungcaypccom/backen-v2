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

class Register(BaseModel):

    username: str
    password: str
    role: str
    name:str
    date_start:str
    date_end:str
    phone_number:str
    adress:str
    website:str
    source: str

class UserUpdate(BaseModel):

    username: str
    role: str
    name:str
    date_start:str
    date_end:str
    phone_number:str
    adress:str
    website:str
    source: str

class Account(BaseModel):
    accountNo: str
