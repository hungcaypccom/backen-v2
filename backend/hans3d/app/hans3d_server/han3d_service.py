
import aiohttp
from app.hans3d_server.config import Config
from app.hans3d_server.connect import Connect

class Service():
    
    paramLogin = {
            Config.params["loginPwd"] : Config.loginAccount["password"], 
            Config.params["accountNo"]: Config.loginAccount["account"],
            Config.params["accessSource"]: Config.loginAccount["accessSource"]
        }
    
    paramReset = {
            Config.params["initPwd"] : Config.loginAccount["password"], 
            Config.params["accountNo"]: Config.loginAccount["account"]  
        }

    @staticmethod
    async def login(timeout): 
        async with aiohttp.ClientSession() as session:
            resp = await Connect.fetch(session, Config.URL_login, Service.paramLogin, timeout)
            return resp

    @staticmethod
    async def reset(timeout):
        async with aiohttp.ClientSession() as session:
            return await Connect.fetch(session, Config.URL_reset, Service.paramReset, timeout)
        
    @staticmethod     
    async def getInfoData(account, timeout):
        param = {
            Config.params["accountNo"] : account
        }
        async with aiohttp.ClientSession() as session:
            return await Connect.fetch(session, Config.URL_getFileInfo, param, timeout)
         
    @staticmethod     
    async def download(uploadTimeStr, account, timeout):
        param = {
            Config.params["uploadTimeStr"] : uploadTimeStr,
            Config.params["accountNo"] : account,
        }
        async with aiohttp.ClientSession() as session:
            return await Connect.fetchDownload(session, Config.URL_download, param, uploadTimeStr, timeout)

    @staticmethod    
    async def takeCookies():
        await Connect.takeCookies()