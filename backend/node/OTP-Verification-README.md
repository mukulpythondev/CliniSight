# CliniSight Backend: Twilio Verify OTP for Patient Data Access

This backend module secures patient data by requiring doctors to obtain a One-Time Password (OTP) from the patient (sent via Twilio Verify service) before accessing sensitive records.

## Features
- **OTP via Twilio Verify**: When a doctor requests access to a patient's records, a verification code is sent to the patient's registered phone number using Twilio Verify service.
- **Doctor-Patient Authorization**: The doctor must enter the verification code (received from the patient) to gain access.
- **Enforced Access Control**: Doctors are **BLOCKED** from accessing patient records until OTP is verified.
- **Twilio Verify Service**: Uses Twilio's secure verification service instead of direct SMS.
- **OTP Expiry**: Verification codes expire after 10 minutes and can only be used once.
- **No Frontend Required**: All operations are via backend API.

---

## Setup

1. **Install Dependencies**
   ```bash
   npm install twilio
   ```

2. **Environment Variables**
   Add the following to your `.env` file:
   ```env
   TWILIO_ACCOUNT_SID=secret
   TWILIO_AUTH_TOKEN=secret
   TWILIO_VERIFY_SERVICE_SID=secret
   ```

3. **Twilio Verify Service Setup**
   - Log into your Twilio Console
   - Go to **Verify** → **Services**
   - Create a new Verify service or use an existing one
   - Copy the **Service SID** and add it to your `.env` file

4. **Ensure Patient Phone Numbers**
   - Each patient in the database must have a valid phone number in the `phone` field.

---

## API Endpoints

### 1. Generate Verification Code (Send to Patient)
**POST** `/api/v1/otp/generate`

- **Headers:**
  - `Authorization: Bearer <doctor_jwt_token>`
- **Body:**
  ```json
  {
    "patient_id": "<patient_object_id>"
  }
  ```
- **Response:**
  - `200 OK` if verification code sent successfully
  - `400/500` on error

### 2. Verify Code (Doctor Submits Code)
**POST** `/api/v1/otp/verify`

- **Headers:**
  - `Authorization: Bearer <doctor_jwt_token>`
- **Body:**
  ```json
  {
    "patient_id": "<patient_object_id>",
    "otp": "123456"
  }
  ```
- **Response:**
  - `200 OK` if verification code is valid and access is granted
  - `400/500` on error

### 3. Protected Patient Records (Requires OTP Verification)
**GET** `/api/v1/records/patient/:patientId`
**POST** `/api/v1/records`

- **Headers:**
  - `Authorization: Bearer <doctor_jwt_token>`
- **Response if OTP not verified:**
  ```json
  {
    "success": false,
    "message": "OTP verification required to access patient records",
    "error": "OTP_REQUIRED",
    "data": {
      "patient_id": "<patient_id>",
      "message": "Please generate and verify OTP to access this patient's records"
    }
  }
  ```

---

## How It Works (Enforced Restriction)

1. **Doctor tries to access patient records** → **BLOCKED** (403 Forbidden)
2. **Doctor generates OTP** → Verification code sent to patient's phone
3. **Patient shares verification code** with doctor (in person or via call)
4. **Doctor submits verification code** → Twilio Verify validates the code
5. **If approved** → Access granted for that doctor-patient session
6. **Doctor can now access records** → Success (200 OK)

## Security Enforcement

The system uses middleware (`requireOTPVerification`) that:
- **Intercepts all patient-specific requests** to `/api/v1/records/patient/:patientId` and `/api/v1/records` (POST)
- **Checks database** for verified OTP between doctor and patient
- **Blocks access** (403 Forbidden) if no verified OTP exists
- **Allows access** only after successful OTP verification

## Example Workflow

```bash
# 1. Doctor tries to access patient records (BLOCKED)
GET /api/v1/records/patient/id
# Response: 403 Forbidden - "OTP verification required"

# 2. Doctor generates OTP
POST /api/v1/otp/generate
{
  "patient_id": "id"
}
# Response: 200 OK - "Verification code sent to patient's phone"

# 3. Patient receives SMS with verification code
# Patient shares code with doctor

# 4. Doctor verifies OTP
POST /api/v1/otp/verify
{
  "patient_id": "id",
  "otp": "123456"
}
# Response: 200 OK - "Verification successful. Access granted."

# 5. Doctor can now access patient records
GET /api/v1/records/patient/id
# Response: 200 OK - Patient records data
```

---

## Security Notes
- **Enforced Restriction**: Doctors cannot access patient records without OTP verification
- **Verification codes** are managed by Twilio Verify service (more secure than custom OTPs)
- **Codes expire** after 10 minutes and can only be used once
- **Only the doctor** who generated the verification can verify it for that patient
- **All verification attempts** are logged in the database and Twilio console

---

## Example `.env`
```
TWILIO_ACCOUNT_SID=secret
TWILIO_AUTH_TOKEN=secret
TWILIO_VERIFY_SERVICE_SID=secret
```

---

## Twilio Verify Service Benefits
- **Built-in security**: Twilio handles code generation and validation
- **Rate limiting**: Prevents abuse and spam
- **Multiple channels**: Can send via SMS, voice, email, etc.
- **Compliance**: Meets security standards for healthcare applications

---

## Questions?
Contact the backend maintainer or check the [Twilio Verify documentation](https://www.twilio.com/docs/verify) for setup help. 