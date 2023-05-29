from app.client_download import config
from pathlib import Path
from fastapi import HTTPException
import os
from app.db.db_infoData_manager import find_by_str, update_infoData
import aiofiles
from fastapi.responses import StreamingResponse, FileResponse, Response


async def client_download_file( name, username):
    print (name)
    print(username)
    path= Path(f'{config.datafolder}/{name}.zip')
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    else:
        info = await find_by_str(name)
        info_username = info.accountNo
        if info_username != username:
            raise HTTPException(
            status_code=403, detail="Can not delete other user's data"
        )
        else:
            return path
            #return (FileResponse(path, media_type="application/zip", filename=f'{name}.zip'))
            response = response(content, media_type="application/octet-stream")
            response.headers["Content-Disposition"] = f"attachment; filename={f'{name}.zip'}"
            return response

            """
            headers = {'Content-Disposition': 'attachment; filename="hung"'}
            #StreamingResponse.headers["Content-Disposition"] = f"attachment; filename={f'{name}.zip'}"
            return StreamingResponse(iterfile(), headers== headers, media_type='application/zip')"""

                
        #headers = {'Content-Disposition': 'attachment; filename="large_file.tar"'}
            #StreamingResponse.headers["Content-Disposition"] = f"attachment; filename={f'{name}.zip'}"   
        """response = StreamingResponse(content=chunk, media_type='application/zip')  
        response.headers["Content-Disposition"] = f"attachment; filename={f'{name}.zip'}"
        return response
        return StreamingResponse(iterfile(), headers=headers, media_type='application/x-tar')"""

        """content = path.read_bytes()
            response = Response(content, media_type="application/octet-stream")
            response.headers["Content-Disposition"] = f"attachment; filename={f'{name}.zip'}"
            return response"""

async def client_delete_file(names:list, username):
    print (names)
    print(username)
    message = []
    
    for name in names:
        print(name)
        path= Path(f'{config.datafolder}/{name}.zip')
        if not path.exists():
            added = {}
            added[f"{name}"] = "File not found!"
            message.append(added)
        else:
            info = await find_by_str(name)
            info_username = info.accountNo
            if info_username != username:
                raise HTTPException(
                status_code=403, detail="Can not delete other user's data"
                                    )
            else:
                await update_infoData(name, True, False)
                os.remove(path)
    if message:
        raise HTTPException(
                status_code=404, detail=message
                                    )
    