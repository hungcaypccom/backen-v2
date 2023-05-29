import os

#DATABASE_URL = 'postgresql://postgres:1234567890@localhost:5432/db_auth'
DATABASE_URL = os.getenv('DATABASE_URL')
datafolder = "datas"