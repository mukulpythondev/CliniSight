from fastapi import FastAPI
from pymongo import MongoClient
from bson.json_util import dumps
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import json

# Load environment variables from .env
load_dotenv()

app = FastAPI()

# Get MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

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

    return JSONResponse(content={
        "doctors": json.loads(dumps(doctors)),
        "patients": json.loads(dumps(patients)),
        "records": json.loads(dumps(records))
    })
