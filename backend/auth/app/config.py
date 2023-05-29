import os

#URL_USERS = "http://localhost:8003"
#URL_HANS3D = "http://localhost:8000"
#URL_REDIS = "http://localhost:6379"

URL_REDIS = os.getenv('URL_REDIS')
URL_USERS = os.getenv('URL_USERS')
URL_HANS3D = os.getenv('URL_HANS3D')