const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MongoDB connection string (MONGODB_URL) is missing in .env file!");
        }

        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // 30 seconds
        });

        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

module.exports = dbConnect;
