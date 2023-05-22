from app.db.db import database, users, persons, roles, select
from app.db.model import ResponseMessage, User, Register, Person, PersonUpdate, UserUpdate
from app.db.db_role_manager import find_by_name_role
from app.db.db_person_manager import register_person, delete_person, admin_only_update_person, update_person
from datetime import datetime, date
from passlib.context import CryptContext
from fastapi import HTTPException

# Encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

##################
async def admin_only_register_user(payload: Register):
    _username = await find_by_username(payload.username)
    if _username:
        raise HTTPException(status_code=400, detail="Username already exists!")
    try:
        date_start = datetime.strptime(payload.date_start, '%d-%m-%Y')
        date_end = datetime.strptime(payload.date_end, '%d-%m-%Y')
    except:
        raise HTTPException(status_code=400, detail="Wrong date format!")
   
    _role = await find_by_name_role(payload.role) 
    if not _role:
        raise HTTPException(status_code=404, detail="Role not found!")
    
    try:
        _person = Person (name=payload.name, date_start=date_start, date_end=date_end, 
                      phone_number=payload.phone_number, adress=payload.adress, website=payload.website)
        _person_id = await register_person(_person)
        password = pwd_context.hash(payload.password)
        _user = User(username = payload.username, password=password, roles_id=_role.id, source=payload.source, persons_id=_person_id)
        query = users.insert().values(**_user.dict())
        return await database.execute(query=query)
    except Exception as er:
        print (er)
        print("error in admin_only_register_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
####################
async def admin_only_update_user(payload: UserUpdate):
    _username = await find_by_username(payload.username)
    if not _username:
        raise HTTPException(status_code=404, detail="Account not found!")
    try:
        date_start = datetime.strptime(payload.date_start, '%d-%m-%Y')
        date_end = datetime.strptime(payload.date_end, '%d-%m-%Y')
    except:
        raise HTTPException(status_code=400, detail="Wrong date format!")
    
    _role = await find_by_name_role(payload.role) 
    if not _role:
        raise HTTPException(status_code=404, detail="Role not found!")
    
    try:
        _person = Person (name=payload.name, date_start=date_start, date_end=date_end, 
                      phone_number=payload.phone_number, adress=payload.adress, website=payload.website)
        await admin_only_update_person(_username.persons_id, _person)
    
        _user = User(username = payload.username, roles_id=_role.id, source=payload.source, persons_id=_username.persons_id)
        query = users.update().values(**_user.dict())
        return await database.execute(query=query)
    except:
        print("error in admin_only_update_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")

######################
async def update_user(username, payload: PersonUpdate):
    _username = await find_by_username(username)
    if not _username:
        raise HTTPException(status_code=404, detail="Account not found!")
    try:
        _person = PersonUpdate(name=payload.name, phone_number=payload.phone_number, adress=payload.adress, website=payload.website)
        return await update_person(_username.persons_id, _person)
    except:
        print("error in update_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")

 
#####################
async def find_by_username(username:str):
    try:
        query = select(users.c.username,
                       users.c.password,
                       users.c.persons_id,
                       users.c.roles_id,
                       users.c.source,
                       roles.c.role,
                       persons.c.date_end
                        ).join_from(users,roles).join_from(users,persons).where(users.c.username == username)
        return await database.fetch_one(query=query)
    except:
        print("error in find_by_username")
        raise HTTPException(status_code=500, detail="Internal Server Error")


#####################
async def admin_ony_delete_user(username: str):
    _user = await find_by_username (username)
    if not _user:
        raise HTTPException(status_code=404, detail="Account not found!")
    try:
        query = users.delete().where(users.c.username==username)
        await database.execute(query=query)
        return  await delete_person(_user.persons_id)
    except:
        print("error in admin_ony_delete_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")



#####################
async def update_password_user(username: str, old_password:str, new_password: str):
    _user = await find_by_username(username)
    if not _user:
        raise HTTPException(status_code=404, detail="Account not found!")
    if not pwd_context.verify(old_password, _user.password):
        raise HTTPException(status_code=400, detail="Wrong old password!")
    try:
        newPassword = pwd_context.hash(new_password)
        query = (
        users
        .update()
        .where(users.c.username == username)
        .values(password=newPassword)
    )
        return await database.execute(query=query)
    except:
        print("error in update_password_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")



#####################
async def admin_only_update_password_user(username: str, new_password: str):
    _user = await find_by_username(username)
    if not _user:
        raise HTTPException(status_code=404, detail="Account not found!")
    try:
        newPassword = pwd_context.hash(new_password)
        query = (
        users
        .update()
        .where(users.c.username == username)
        .values(password=newPassword)
    )
        return await database.execute(query=query)
    except:
        print("error in admin_only_update_password_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#####################

async def admin_only_get_all_user():
    try:
        query = select(users.c.username,
                        roles.c.role,
                        users.c.source,
                        persons.c.name, 
                        persons.c.website,
                        persons.c.phone_number,
                        persons.c.adress,
                        persons.c.date_start,
                        persons.c.date_end
                        ).join_from(users,roles).join_from(users,persons)
        return await database.fetch_all(query=query)
    except:
        print("error in admin_only_get_all_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")


#####################
async def admin_only_get_user(username: str):
    _username = await find_by_username(username)
    if not _username:
        raise HTTPException(status_code=404, detail="Account not found!")
    try:
        query = select(users.c.username,
                        roles.c.role,
                        users.c.source,
                        persons.c.name, 
                        persons.c.website,
                        persons.c.phone_number,
                        persons.c.adress,
                        persons.c.date_start,
                        persons.c.date_end
                        ).join_from(users,roles).join_from(users,persons).where(users.c.username == username)
        return await database.fetch_one(query=query)
    except:
        print("error in admin_only_get_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#####################
async def get_user(username: str):
    _username = await find_by_username(username)
    if not _username:
        raise HTTPException(status_code=404, detail="Account not found!")
    try:
        query = select(users.c.username,
                        persons.c.name, 
                        persons.c.website,
                        persons.c.phone_number,
                        persons.c.adress,
                        ).join_from(users,persons).where(users.c.username == username)
        return await database.fetch_one(query=query)
    except:
        print("error in get_user")
        raise HTTPException(status_code=500, detail="Internal Server Error")



