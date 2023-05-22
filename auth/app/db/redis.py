import redis
import os

URL_REDIS = os.getenv('URL_REDIS')
r = redis.Redis(host=URL_REDIS, port=6379, db=0)

async def set_value(key:str, value:str):
    try:
        return r.set(key, value)
    except Exception as er:
        print(er)

async def get_value(key:str):
    try:
        return (r.get(key)).decode()
    except Exception as er:
        print(er)

