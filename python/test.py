import mysql.connector
import json
#loads json to python
#dumps python to json

x = {
  "name": "John",
  "age": 30,
  "city": "New York"
}
# convert into JSON:
y = json.dumps(x)

z=json.loads(y)

# the result is a JSON string:
#print(z['name'])




#print(json_obj[0]['displaySymbol'], json_obj[0]['currency'])





from dotenv import load_dotenv
from pathlib import Path
import os
load_dotenv()
env_path = Path('.')/'.env'


HOST = os.getenv('HOST')
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')
DB_DATABASE = os.getenv('DB_DATABASE')
db = mysql.connector.connect(
    host=HOST,
    user=DB_USER,
    password=DB_PASS,
    database=DB_DATABASE
)

#mycursor = db.cursor()
mycursor = db.cursor()
#mycursor.execute("CREATE DATABASE fred")


#pip install mysql-connector

#mycursor.execute('INSERT INTO persons (')



#db.commit()


mycursor.execute('CREATE TABLE stocks (symbol VARCHAR(20) PRIMARY KEY,description varchar(100),type varchar(100),currency varchar(10))')
#mycursor.execute('INSERT INTO stocks (symbol, description, type, currency) VALUES (%s, %s, %s, %s)', ('AAPL', 'APPLE', 'Technology', 'USD'))

#db.commit()




#sql ="INSERT INTO test (symbol, description, type, currency) VALUES (%s, %s, %s, %s)"
#val = ("John", "Highway 21", "John", "Highway 21")
#mycursor.execute(sql, val)

#db.commit()

#print(mycursor.rowcount, "record inserted.")
# 
# 
# 
file = '../backend/stocks.json'
json_data= open(file).read()
json_obj = json.loads(json_data)

for x in json_obj:
    symbol = (x['displaySymbol'])
    description =(x['description'])
    type =(x['type'])
    currency =(x['currency'])
    mycursor.execute('INSERT INTO stocks (symbol, description, type, currency) VALUES (%s, %s, %s, %s)', (symbol, description, type, currency))
    db.commit()


#for i in range(0, 3):
#    symbol = (json_obj[i]['displaySymbol'])
#    description =(json_obj[i]['description'])
#    type =(json_obj[i]['type'])
##    currency =(json_obj[i]['currency'])
#    mycursor.execute('INSERT INTO stocks (symbol, description, type, currency) VALUES (%s, %s, %s, %s)', (symbol, description, type, currency))
#    db.commit()
