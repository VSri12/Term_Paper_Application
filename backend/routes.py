from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from config import db

patients_collection = db["patients"]
doctors_collection = db["doctors"]
admins_collection = db["admins"]

def register_routes(app):

    # ✅ Patient Registration
    @app.route('/patient/register', methods=['POST'])
    @cross_origin(origins="http://localhost:3000")  # Allow React frontend
    def register_patient():
        data = request.json
        required_fields = ["name", "email", "age", "gender", "past_problems", "current_medications", "password"]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing fields!"}), 400

        if patients_collection.find_one({"email": data["email"]}):
            return jsonify({"error": "Email already registered!"}), 409

        data["password"] = generate_password_hash(data["password"])
        patients_collection.insert_one(data)

        return jsonify({"message": "Patient registered successfully!"}), 201

    # ✅ Patient Login
    @app.route('/patient/login', methods=['POST'])
    @cross_origin(origins="http://localhost:3000")
    def login_patient():
        data = request.json
        patient = patients_collection.find_one({"email": data["email"]})

        if patient and check_password_hash(patient["password"], data["password"]):
            return jsonify({
                "message": "Login successful!",
                "patient": {
                    "name": patient["name"],
                    "email": patient["email"],
                    "age": patient["age"],
                    "gender": patient["gender"],
                    "past_problems": patient["past_problems"],
                    "current_medications": patient["current_medications"]
                }
            }), 200

        return jsonify({"error": "Invalid credentials!"}), 401

    # ✅ Doctor Registration
    @app.route('/doctor/register', methods=['POST'])
    @cross_origin(origins="http://localhost:3000")
    def register_doctor():
        data = request.json
        required_fields = ["name", "email", "specialization", "experience", "password"]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing fields!"}), 400

        if doctors_collection.find_one({"email": data["email"]}):
            return jsonify({"error": "Email already registered!"}), 409

        data["password"] = generate_password_hash(data["password"])
        doctors_collection.insert_one(data)

        return jsonify({"message": "Doctor registered successfully!"}), 201

    # ✅ Doctor Login
    @app.route('/doctor/login', methods=['POST'])
    @cross_origin(origins="http://localhost:3000")
    def login_doctor():
        data = request.json
        doctor = doctors_collection.find_one({"email": data["email"]})

        if doctor and check_password_hash(doctor["password"], data["password"]):
            return jsonify({
                "message": "Login successful!",
                "doctor": {
                    "name": doctor["name"],
                    "email": doctor["email"],
                    "specialization": doctor["specialization"],
                    "experience": doctor["experience"]
                }
            }), 200

        return jsonify({"error": "Invalid credentials!"}), 401

    # ✅ Admin Registration
    @app.route('/admin/register', methods=['POST'])
    @cross_origin(origins="http://localhost:3000")
    def register_admin():
        data = request.json
        required_fields = ["name", "email", "password"]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing fields!"}), 400

        if admins_collection.find_one({"email": data["email"]}):
            return jsonify({"error": "Email already registered!"}), 409

        data["password"] = generate_password_hash(data["password"])
        admins_collection.insert_one(data)

        return jsonify({"message": "Admin registered successfully!"}), 201

    # ✅ Admin Login
    @app.route('/admin/login', methods=['POST'])
    @cross_origin(origins="http://localhost:3000")
    def login_admin():
        data = request.json
        admin = admins_collection.find_one({"email": data["email"]})

        if admin and check_password_hash(admin["password"], data["password"]):
            return jsonify({
                "message": "Login successful!",
                "admin": {
                    "name": admin["name"],
                    "email": admin["email"]
                }
            }), 200

        return jsonify({"error": "Invalid credentials!"}), 401
