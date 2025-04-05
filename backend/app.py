from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Correct MongoDB Atlas Connection String
MONGO_URI = "mongodb+srv://admin:admin@mentalhealth.wgm76.mongodb.net/?retryWrites=true&w=majority&appName=MentalHealth"

try:
    # Initialize MongoDB Client
    client = MongoClient(MONGO_URI)
    db = client["MentalHealth"]  # Select Database
    patients_collection = db["patient"]  # Select Collection

    # Test connection
    client.admin.command("ping")
    print("✅ Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"❌ Connection failed: {e}")

@app.route("/")
def home():
    return jsonify({"message": "Welcome to Mental Health API"})

@app.route("/patients", methods=["GET"])
def get_patients():
    patients = list(patients_collection.find({}, {"_id": 0}))  # Convert cursor to list, exclude _id
    return jsonify(patients)

if __name__ == "__main__":
    app.run(debug=True)
