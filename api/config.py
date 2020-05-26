from prettyconf import config

DEBUG = config('DEBUG', cast=config.boolean)
SECRET_KEY = config('SECRET_KEY')

# MongoDB Settings
MONGODB_CONN_URI = config('MONGODB_CONN_URI')
MONGODB_DB_HOST = config('MONGODB_DB_HOST')
MONGODB_DB_PORT = config('MONGODB_DB_PORT', cast=int)
MONGODB_DB_NAME = config('MONGODB_DB_NAME')
MONGODB_DB_USER = config('MONGODB_DB_USER')
MONGODB_DB_PASS = config('MONGODB_DB_PASS')

# GraphQL Settings
GRAPHQL_ALLOW_UI = True if DEBUG else False
