from app.db.models import InfoData, ResponseMessage
from app.db.db import database, infoData, func, select
from fastapi import HTTPException


async def add_infoData(payload: InfoData):
    query = infoData.insert().values(**payload)
    try:
        return await database.execute(query=query)
    except:
        print("Error when add_infoData")


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
    try:
        return await database.execute(query=query)
    except Exception as er:
        print(er)
        print("Error when update_infoData")


async def find_by_str(uploadTimeStr):
    query = infoData.select().where(infoData.c.uploadTimeStr==uploadTimeStr)
    try:
        return await database.fetch_one(query=query)
    except: 
        raise HTTPException (status_code=500, detail="Internal Server Error")

async def get_infoData_by_status_all(status:bool):
    query = infoData.select().where(infoData.c.status==status)
    return await database.fetch_all(query=query)     
    
async def get_total_infoData_by_status(status:bool):
    if not status:
        query = select(func.count(infoData.c.id)).where(infoData.c.status==status)
    else:
        query = select(func.count(infoData.c.id))
    try: 
        return await database.execute(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=500, detail="Get_total_infoData_by_status")
    
    
async def get_infoData_by_status(status:bool, page: int, count: int):
    skip = count * (page - 1) 
    if not status:
        query = infoData.select().where(infoData.c.status==status).order_by(infoData.c.id.desc()).offset(skip).limit(count)
    else:
        query = infoData.select().order_by(infoData.c.id.desc()).offset(skip).limit(count)
    try: 
        return await database.fetch_all(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=500, detail="Get_infoData_by_status")
    
    
async def get_total_infoData_by_downloadable(downloadable:bool):
    if downloadable:
        query = select(func.count(infoData.c.id)).where(infoData.c.downloadable==downloadable)
    else:
        query = select(func.count(infoData.c.id))
    try: 
        return await database.execute(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=500, detail="Get_total_infoData_by_downloadable")
    
    
async def get_infoData_by_downloadable(downloadable:bool, page: int, count: int):
    skip = count * (page - 1) 
    if  downloadable:
        query = infoData.select().where(infoData.c.downloadable==downloadable).order_by(infoData.c.id.desc()).offset(skip).limit(count)
    else:
        query = infoData.select().order_by(infoData.c.id.desc()).offset(skip).limit(count)
    try: 
        return await database.fetch_all(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=500, detail="Get_infoData_by_downloadable")
    
    
   
async def get_total_by_accountNo(accountNo: str, downloadable: bool):
    if downloadable:
        query = select(func.count(infoData.c.id)).where(infoData.c.accountNo==accountNo, infoData.c.downloadable==True)
    else:
        query = select(func.count(infoData.c.id)).where(infoData.c.accountNo==accountNo)
    try: 
        return await database.execute(query=query)
    except Exception as er:
        print(er)
        raise HTTPException(status_code=500, detail="Error when get infoData")
    

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
        raise HTTPException(status_code=500, detail="Error when get infoData")

    
