import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";

// Import routes
import doctorRoutes from "./routes/doctor.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import recordsRoutes from "./routes/records.routes.js";

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "success",
        message: "CliniSight API is running",
        timestamp: new Date().toISOString()
    });
});

// API Routes
const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/doctor`, doctorRoutes);
app.use(`${API_VERSION}/patients`, patientRoutes);
app.use(`${API_VERSION}/records`, recordsRoutes);

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to CliniSight API",
        version: "1.0.0",
        health: `${req.protocol}://${req.get('host')}/health`
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 CliniSight API Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;