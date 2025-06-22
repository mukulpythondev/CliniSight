import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clinisight');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

const cleanupDatabase = async () => {
    try {
        await connectDB();

        // Get the database connection
        const db = mongoose.connection.db;

        // Drop the old patient_id index if it exists
        try {
            await db.collection('patients').dropIndex('patient_id_1');
            console.log('🗑️  Dropped old patient_id index');
        } catch (error) {
            console.log('ℹ️  No patient_id index to drop (already removed)');
        }

        // Clear all collections
        await db.collection('patients').deleteMany({});
        console.log('🗑️  Cleared patients collection');
        
        await db.collection('records').deleteMany({});
        console.log('🗑️  Cleared records collection');
        
        await db.collection('doctors').deleteMany({});
        console.log('🗑️  Cleared doctors collection');

        console.log('\n🎉 Database cleanup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error cleaning database:', error);
        process.exit(1);
    }
};

cleanupDatabase(); 