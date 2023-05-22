
#config for API form hans's server

class Config:

    URL_login = "http://47.243.175.209:8080/EX-PRO/accLogin"
    URL_reset = "http://47.243.175.209:8080/EX-PRO/resetPwd"
    URL_getFileInfo = "http://47.243.175.209:8080/EX-PRO/api/file/getFileInfos"
    URL_download = "http://47.243.175.209:8080/EX-PRO/api/file/download"
    URL_cookies = "http://47.243.175.209:8080/EX-PRO"

    params = {
    "loginPwd": "loginPwd",
    "accountNo": "accountNo",
    "accessSource": "accessSource",
    "initPwd": "initPwd",
    "uploadTimeStr": "uploadTimeStr"
    }

# account to logging
    loginAccount = {
        "account": "994985849",
        "password": "d33314f30983215c29c2af0c1bcd2b43",
        "accessSource": "pc"
    }

# indicating the path to storge data downloaded, must be same with the config file of client_download module
    datafolder = "/Users/hungnguyenminh/Learning/Python/datas"
