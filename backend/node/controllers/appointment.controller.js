import Appointment from '../models/appointment.js';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({
  apiKey: "AIzaSyBCH35myWjaxjnCd1GNCeCmYWgaz9EtMko"
});

export const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, disease, notes } = req.body;

    const prompt = `The patient is diagnosed with ${disease}. Based on common recovery or monitoring needs, how many days later should a follow-up appointment be scheduled? Reply with just the number of days like: 10`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const rawText = response.text.trim();
    const days = parseInt(rawText.match(/\d+/)?.[0], 10);

    if (isNaN(days)) {
      return res.status(400).json({
        success: false,
        message: "Gemini did not return a valid number of follow-up days."
      });
    }

    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + days);

    const newAppointment = new Appointment({
      patient,
      doctor,
      date: followUpDate,
      notes: `Gemini suggested follow-up for ${disease}. ${notes || ''}`,
      type: 'follow-up'
    });

    const saved = await newAppointment.save();
    res.status(201).json({ success: true, appointment: saved });

  } catch (error) {
    console.error('Gemini Appointment Error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
