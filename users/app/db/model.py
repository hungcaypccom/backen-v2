from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date

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
    password: str
    role: str
    name:str
    date_start:str
    date_end:str
    phone_number:str
    adress:str
    website:str
    source: str


class User(BaseModel):

    username: str
    password: str
    roles_id: int
    source: str
    persons_id: int
 

class Person(BaseModel):

    name:str
    date_start:datetime
    date_end:datetime
    phone_number:str
    adress:str
    website:str

class PersonUpdate(BaseModel):

    name:str
    phone_number:str
    adress:str
    website:str
 
class ResponseMessage(BaseModel):
    detail: list

class Role(BaseModel):
    role: str
    
class Account(BaseModel):
    accountNo: str


class UpdatePassword(BaseModel):
    old_password: str
    new_password: str