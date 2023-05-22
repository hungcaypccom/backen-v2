from app.db.models import InfoData, ResponseMessage
from app.db.db import database, infoData, func, select
from fastapi import HTTPException

async def add_infoData(payload: InfoData):
    query = infoData.insert().values(**payload)
    return await database.execute(query=query)

async def delete_infoData(id: int):
    query = infoData.delete().where(infoData.c.id==id)
    return await database.execute(query=query)

async def update_infoData(uploadTimeStr:str, status: bool, downloadable: bool):
    query = (
        infoData
        .update()
        .where(infoData.c.uploadTimeStr == uploadTimeStr)
        .values(status = status, downloadable = downloadable)
    )
    return await database.execute(query=query)

async def get_all_infoData():
    query = infoData.select().order_by(infoData.c.id.desc())
    return await database.fetch_all(query=query)

async def get_infoData_by_status(status:bool):
    query = infoData.select().where(infoData.c.status==status)
    return await database.fetch_all(query=query)

async def get_total_by_accountNo(accountNo: str, downloadable: bool):
    if downloadable:
        query = select(func.count(infoData.c.id)).where(infoData.c.accountNo==accountNo, infoData.c.downloadable==True)
    else:
        query = select(func.count(infoData.c.id)).where(infoData.c.accountNo==accountNo)
    try: 
        return await database.execute(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=400, detail="Error when get infoData")

async def get_infoData_by_accountNo(accountNo: str, page: int, count: int, downloadable: bool):
    skip = count * (page - 1) 
    if downloadable:
        query = infoData.select().where(infoData.c.accountNo==accountNo, infoData.c.downloadable==True).order_by(infoData.c.id.desc()).offset(skip).limit(count)
    else:
        query = infoData.select().where(infoData.c.accountNo==accountNo).order_by(infoData.c.id.desc()).offset(skip).limit(count)
    try: 
        return await database.fetch_all(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=400, detail="Error when get infoData")

    
