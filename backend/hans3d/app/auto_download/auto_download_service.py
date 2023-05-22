from app.auto_download import function, config
from app.hans3d_server import Service
from app.db.db_infoData_manager import update_infoData, get_infoData_by_status
from app.db.db_account_manager import get_all_account
import asyncio


class AutoDownloadService:

    @staticmethod
    async def auto_login():
        status = await Service.login(config.timeout_request_data)
        try:
            if status["status"] != 200:
                await Service.reset(config.timeout_request_data)
                await Service.takeCookies()
                return await Service.login(config.timeout_request_data)
            return status
        except Exception as e:
            print("Error occurred in auto_login:", e)

    @staticmethod
    async def sync_infoData():
        try:
            accounts = await get_all_account()
            tasks = []
            for account in accounts:
                print(f'{account.accountNo}')
                task = asyncio.create_task(function.Function.sync_infoData(account.accountNo, config.timeout_request_data*len(accounts)))
                tasks.append(task)
            await asyncio.gather(*tasks)
        except Exception as e:
            print("Error occurred in sync_infoData:", e)


        
    @staticmethod
    async def download():
        try:
            downloads = await get_infoData_by_status(False)
            for download in downloads:
                print(download.uploadTimeStr)
                if await Service.download(download.uploadTimeStr, download.accountNo, config.timeout_download_data):
                    await update_infoData(download.uploadTimeStr, True, True)
        except Exception as e:
                print("Error occurred in download:", e)
   
            



            