from sqlalchemy import (Column, Integer, MetaData, String, Table, Boolean, create_engine, ARRAY, func, select)
from databases import Database
from app.config import DATABASE_URL


engine = create_engine(DATABASE_URL)
metadata = MetaData()

infoData = Table(
    'hans3d',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('accountNo', String),
    Column('uploadTimeStr', String),
    Column('fileSize', String),
    Column('createTime', String), 
    Column('name', String),
    Column('birthday', String), 
    Column('phone', String),
    Column('sex', String), 
    Column('status', Boolean, default=True),
    Column('downloadable', Boolean, default=False)
)

account = Table(
    'account',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('accountNo', String),
)

database = Database(DATABASE_URL)
