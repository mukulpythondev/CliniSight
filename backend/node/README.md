# CliniSight Backend - Prototype

A simple health records management system for doctors to manage patients and their medical records.

## Features

- **Doctor Authentication**: Register and login for doctors
- **Patient Management**: Create, read, update, delete patients
- **Medical Records**: Create and manage patient medical records
- **Search**: Search patients by name, ID, or phone number

## Tech Stack

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/clinisight
   JWT_SECRET=your-secret-key
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new doctor
- `POST /api/v1/auth/login` - Login doctor
- `GET /api/v1/auth/me` - Get current user (protected)

### Patients
- `GET /api/v1/patients` - Get all patients (protected)
- `GET /api/v1/patients/search?query=...` - Search patients (protected)
- `GET /api/v1/patients/:id` - Get single patient (protected)
- `POST /api/v1/patients` - Create patient (protected)
- `PUT /api/v1/patients/:id` - Update patient (protected)
- `DELETE /api/v1/patients/:id` - Delete patient (protected)

### Records
- `GET /api/v1/records` - Get all records (protected)
- `GET /api/v1/records/patient/:patientId` - Get patient records (protected)
- `GET /api/v1/records/:id` - Get single record (protected)
- `POST /api/v1/records` - Create record (protected)
- `PUT /api/v1/records/:id` - Update record (protected)
- `DELETE /api/v1/records/:id` - Delete record (protected)

## Data Models

### Doctor
- name, email, password, speciality, license_number, hospital, phone

### Patient
- patient_id, name, phone, email, age, gender, address, blood_group

### Record
- patient_id, doctor_id, type, title, description, date, status, notes

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Next Steps

This is a prototype. You can extend it by adding:
- Input validation
- Error handling
- File uploads
- Advanced search
- Analytics
- Patient consent management 