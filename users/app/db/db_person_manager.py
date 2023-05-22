from app.db.model import Person, PersonUpdate
from app.db.db import database, persons
from fastapi import HTTPException


async def register_person(payload: Person):
    try:
        query = persons.insert().values(**payload.dict())
        return await database.execute(query=query)
    except:
        print("error in register_person")
        raise HTTPException(status_code=500, detail="Internal Server Error")


async def delete_person(id: int):
    try:  
        query = persons.delete().where(persons.c.id==id)
        return await database.execute(query=query)
    except:
        print("error in delete_person")
        raise HTTPException(status_code=500, detail="Internal Server Error")



async def admin_only_update_person(id: int, payload: Person):
    try:
        query = (
        persons
        .update()
        .where(persons.c.id == id)
        .values(**payload.dict())
        )
        return await database.execute(query=query)
    except:
        print("error in admin_only_update_person")
        raise HTTPException(status_code=500, detail="Internal Server Error")

async def update_person(id: int, payload: PersonUpdate):
    try:
        query = (
        persons
        .update()
        .where(persons.c.id == id)
        .values(**payload.dict())
        )
        return await database.execute(query=query)
    except:
        print("error in update_person")
        raise HTTPException(status_code=500, detail="Internal Server Error")