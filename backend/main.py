from fastapi import FastAPI
from pymongo import MongoClient
from bson.json_util import dumps
from fastapi.responses import JSONResponse
import json

app = FastAPI()

# MongoDB URI
MONGO_URI = "mongodb+srv://clinisight:WySGSgkW8m0JvhCw@cluster0.p6w0nsx.mongodb.net/?retryWrites=true&w=majority"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["clinisight"]

# Collections
doctors_collection = db["doctors"]
patients_collection = db["patients"]
records_collection = db["records"]

@app.get("/")
def read_root():
    doctors = list(doctors_collection.find())
    patients = list(patients_collection.find())
    records = list(records_collection.find())

    # Use JSONResponse to return the result properly formatted
    return JSONResponse(content={
        "doctors": json.loads(dumps(doctors)),
        "patients": json.loads(dumps(patients)),
        "records": json.loads(dumps(records))
    })
