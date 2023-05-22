from pydantic import BaseModel
from typing import List, Optional

class InfoData(BaseModel):
    accountNo: str
    uploadTimeStr: str
    fileSize: str
    createTime: str
    name: str
    birthday: str
    phone: str
    sex: str
    status: bool
    downloadable: bool

class ResponseMessage(BaseModel):
    status: int
    message: str

class Account(BaseModel):
    accountNo: str
