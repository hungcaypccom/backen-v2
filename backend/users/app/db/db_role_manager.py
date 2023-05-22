from app.db.db import database, roles
from app.db.model import Role
from typing import List
from fastapi import HTTPException

async def register_role(payload: Role):
    try:
        query = roles.insert().values(**payload.dict())
        return await database.execute(query=query)
    except:
        print("error in register_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")

async def delete_role(role: str):
    try:
        query = roles.delete().where(roles.c.role==role)
        return await database.execute(query=query)
    except:
        print("error in delete_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")    
    
async def find_by_list_role(role1: List[str]):
    try:
        query =  roles.select().where(roles.c.role.in_(role1))
        return await database.fetch_all(query=query)
    except:
        print("error in find_by_list_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")    

async def get_all_role():
    try:
        query = roles.select()
        return await database.fetch_all(query=query)
    except:
        print("error in get_all_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")    

async def find_by_name_role(role:str):
    try:
        query = roles.select().where(roles.c.role==role)
        return await database.fetch_one(query=query)
    except:
        print("error in find_by_name_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")   

async def create_list_role(role_name: List[Role]):
    try:
        return await database.execute_many(roles.insert(),role_name)
    except:
        print("error in create_list_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")   
    

async def generate_role():
    try:
        _role = await find_by_list_role(["admin", "user"])
        if not _role:
            return await create_list_role(
                [{"role":"admin"}, {"role":"user"}])
    except:
        print("error in generate_role")
        raise HTTPException(status_code=500, detail="Internal Server Error")   
        