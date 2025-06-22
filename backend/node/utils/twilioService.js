import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

/**
 * Send verification code to patient's phone number
 * @param {string} phoneNumber - Patient's phone number
 * @param {string} patientName - Patient's name
 * @param {string} doctorName - Doctor's name
 * @returns {Promise} - Twilio verification response
 */
export const sendVerificationCode = async (phoneNumber, patientName, doctorName) => {
  try {

    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: phoneNumber,
        channel: 'sms'
      });
    
    console.log(`Verification sent to ${patientName} (${phoneNumber}), status: ${verification.status}`);
    return verification;
  } catch (error) {
    console.error('❌ Error sending verification:', error);
    console.error('Error details:', error.message);
    console.error('Error code:', error.code);
    throw error;
  }
};

/**
 * Verify code sent to patient's phone number
 * @param {string} phoneNumber - Patient's phone number
 * @param {string} code - Verification code
 * @returns {Promise} - Twilio verification check response
 */
export const verifyCode = async (phoneNumber, code) => {
  try {
    const verification_check = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code
      });
    
    console.log(`Verification check for ${phoneNumber}, status: ${verification_check.status}`);
    return verification_check;
  } catch (error) {
    console.error('❌ Error verifying code:', error);
    throw error;
  }
}; 