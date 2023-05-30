from sqlalchemy import (Column, Integer, MetaData, String, Table
                        , Boolean, create_engine, ARRAY, func, select, ForeignKey, DateTime, Date)
from databases import Database
from pydantic import BaseModel
import os
from app.config import DATABASE_URL


engine = create_engine(DATABASE_URL)
metadata = MetaData()



users = Table(
    'users',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('username', String),
    Column('password', String),
    Column('source', String),
    Column('roles_id', ForeignKey('roles.id')),
    Column('persons_id', ForeignKey('persons.id')),
    Column('created_at', DateTime, default=func.now(), nullable=False),
    Column('modified_at', DateTime, default=func.now(),
                        onupdate=func.now(), nullable=False )
)


roles = Table(
    'roles',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('role', String),
    Column('created_at', DateTime, default=func.now(), nullable=False),
    Column('modified_at', DateTime, default=func.now(),
                        onupdate=func.now(), nullable=False )
)


persons = Table(
    'persons',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
    Column('date_start', DateTime, nullable=False ),
    Column('date_end', DateTime, nullable=False ),
    Column('phone_number', String),
    Column('adress', String),
    Column('website', String),
    Column('created_at', DateTime, default=func.now(), nullable=False),
    Column('modified_at', DateTime, default=func.now(),
                        onupdate=func.now(), nullable=False )
)

database = Database(DATABASE_URL)
