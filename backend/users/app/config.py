import os

#DATABASE_URL = 'postgresql://postgres:1234567890@localhost:5431/db_hans'
DATABASE_URL = os.getenv('AUTH_URL')