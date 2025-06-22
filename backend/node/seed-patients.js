import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Patient } from './models/patient.model.js';

dotenv.config();

// Sample patient data with Indian names and realistic information
const samplePatients = [
    {
        name: "Priya Sharma",
        age: 32,
        gender: "female",
        phone: "+91-9876543212",
        email: "priya.sharma@email.com",
        address: "456 Indiranagar, Bangalore, Karnataka",
        blood_group: "O+",
        emergency_contact: {
            name: "Amit Sharma",
            phone: "+91-9876543213",
            relationship: "Husband"
        },
        medical_history: ["Asthma"],
        allergies: ["Dust", "Pollen"],
        current_medications: ["Salbutamol"]
    },
    {
        name: "Amit Patel",
        age: 28,
        gender: "male",
        phone: "+91-9876543214",
        email: "amit.patel@email.com",
        address: "789 Koramangala, Bangalore, Karnataka",
        blood_group: "A+",
        emergency_contact: {
            name: "Neha Patel",
            phone: "+91-9876543215",
            relationship: "Sister"
        },
        medical_history: [],
        allergies: [],
        current_medications: []
    },
    {
        name: "Neha Singh",
        age: 55,
        gender: "female",
        phone: "+91-9876543216",
        email: "neha.singh@email.com",
        address: "321 Whitefield, Bangalore, Karnataka",
        blood_group: "AB+",
        emergency_contact: {
            name: "Rahul Singh",
            phone: "+91-9876543217",
            relationship: "Son"
        },
        medical_history: ["Arthritis", "Hypertension"],
        allergies: ["Sulfa drugs"],
        current_medications: ["Ibuprofen", "Losartan"]
    },
    {
        name: "Vikram Malhotra",
        age: 38,
        gender: "male",
        phone: "+91-9876543218",
        email: "vikram.malhotra@email.com",
        address: "654 HSR Layout, Bangalore, Karnataka",
        blood_group: "B-",
        emergency_contact: {
            name: "Anjali Malhotra",
            phone: "+91-9876543219",
            relationship: "Wife"
        },
        medical_history: ["Migraine"],
        allergies: ["Nuts"],
        current_medications: ["Sumatriptan"]
    },
    {
        name: "Anjali Reddy",
        age: 42,
        gender: "female",
        phone: "+91-9876543220",
        email: "anjali.reddy@email.com",
        address: "987 JP Nagar, Bangalore, Karnataka",
        blood_group: "O-",
        emergency_contact: {
            name: "Suresh Reddy",
            phone: "+91-9876543221",
            relationship: "Husband"
        },
        medical_history: ["Hypothyroidism"],
        allergies: ["Shellfish"],
        current_medications: ["Levothyroxine"]
    },
    {
        name: "Suresh Iyer",
        age: 50,
        gender: "male",
        phone: "+91-9876543222",
        email: "suresh.iyer@email.com",
        address: "147 Banashankari, Bangalore, Karnataka",
        blood_group: "A-",
        emergency_contact: {
            name: "Lakshmi Iyer",
            phone: "+91-9876543223",
            relationship: "Wife"
        },
        medical_history: ["Diabetes", "Heart Disease"],
        allergies: ["Aspirin"],
        current_medications: ["Metformin", "Atorvastatin"]
    },
    {
        name: "Lakshmi Nair",
        age: 35,
        gender: "female",
        phone: "+91-9876543224",
        email: "lakshmi.nair@email.com",
        address: "258 Malleshwaram, Bangalore, Karnataka",
        blood_group: "B+",
        emergency_contact: {
            name: "Krishna Nair",
            phone: "+91-9876543225",
            relationship: "Brother"
        },
        medical_history: ["Depression"],
        allergies: [],
        current_medications: ["Sertraline"]
    },
    {
        name: "Krishna Menon",
        age: 29,
        gender: "male",
        phone: "+91-9876543226",
        email: "krishna.menon@email.com",
        address: "369 Basavanagudi, Bangalore, Karnataka",
        blood_group: "O+",
        emergency_contact: {
            name: "Radha Menon",
            phone: "+91-9876543227",
            relationship: "Mother"
        },
        medical_history: [],
        allergies: ["Latex"],
        current_medications: []
    },
    {
        name: "Radha Pillai",
        age: 48,
        gender: "female",
        phone: "+91-9876543228",
        email: "radha.pillai@email.com",
        address: "741 Jayanagar, Bangalore, Karnataka",
        blood_group: "AB-",
        emergency_contact: {
            name: "Ganesh Pillai",
            phone: "+91-9876543229",
            relationship: "Husband"
        },
        medical_history: ["Osteoporosis"],
        allergies: ["Milk"],
        current_medications: ["Calcium", "Vitamin D"]
    }
];

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clinisight');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

// Seed patients
const seedPatients = async () => {
    try {
        // Clear existing patients
        await Patient.deleteMany({});
        console.log('🗑️  Cleared existing patients');

        // Insert sample patients
        const patients = await Patient.insertMany(samplePatients);
        console.log(`✅ Successfully seeded ${patients.length} patients`);

        // Display the created patients
        console.log('\n📋 Created Patients:');
        patients.forEach(patient => {
            console.log(`- ${patient._id}: ${patient.name} (${patient.age} years, ${patient.gender})`);
        });

        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding patients:', error);
        process.exit(1);
    }
};

// Run the seeding
const runSeed = async () => {
    await connectDB();
    await seedPatients();
};

runSeed(); 