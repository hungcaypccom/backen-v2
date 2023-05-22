from app.db.models import Account
from app.db.db import database, account
from fastapi import HTTPException

async def add_account(payload: Account):
    try:
        query = account.insert().values(payload.dict())
        return await database.execute(query=query)
    except: 
        raise HTTPException (status_code=500, detail="Internal Server Error")
    
async def delete_account(id: int):
    query = account.delete().where(account.c.id==id)
    return await database.execute(query=query)

async def get_all_account():
    query = account.select()
    return await database.fetch_all(query=query)