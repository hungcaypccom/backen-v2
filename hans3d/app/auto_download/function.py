
from app.db.db_account_manager import get_all_account
from app.db.db_infoData_manager import get_infoData_by_accountNo, add_infoData
from app.hans3d_server import Service

class Function:
    
    @staticmethod
    async def sync_infoData(account:str, timeout):
        getInfoData = await Service.getInfoData(account, timeout)
        infoDatas = getInfoData["data"]
        infoDataBase = await get_infoData_by_accountNo(account, 1, 1, False)
        if not infoDataBase:
            for infoData in infoDatas:
                print(infoData)
                data = {
                    "accountNo" : infoData["accountNo"], 
                    "uploadTimeStr" : infoData["uploadTimeStr"], 
                    "fileSize" : infoData["fileSize"], 
                    "createTime" : str(infoData["createTime"]), 
                    "name" : infoData["name"], 
                    "birthday" : infoData["birthday"], 
                    "phone" : infoData["phone"], 
                    "sex" : infoData["sex"],
                    "status": True,
                    "downloadable": False
                }
                await add_infoData(data)
        else:
            lastInfoData = (infoDatas[-1])
            if(lastInfoData["uploadTimeStr"]!=(infoDataBase[0])["uploadTimeStr"]): 
                dataUpdate = {
                    "accountNo" : lastInfoData["accountNo"], 
                    "uploadTimeStr" : lastInfoData["uploadTimeStr"], 
                    "fileSize" : lastInfoData["fileSize"], 
                    "createTime" : str(lastInfoData["createTime"]), 
                    "name" : lastInfoData["name"], 
                    "birthday" : lastInfoData["birthday"], 
                    "phone" : lastInfoData["phone"], 
                    "sex" : lastInfoData["sex"],
                    "status": False,
                    "downloadable": True
                }
                await add_infoData(dataUpdate)
            else:
                print (f'{account}: khong co data moi')
           

                  