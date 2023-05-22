from sqlalchemy import (Column, Integer, MetaData, String, Table, Boolean, create_engine, ARRAY, func, select)
from databases import Database
import os

#DATABASE_URL = 'postgresql://postgres:1234567890@localhost:5431/hans3d'
DATABASE_URL = os.getenv('DATABASE_URL')

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
