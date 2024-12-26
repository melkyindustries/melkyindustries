//db.js
const mongoose = require('mongoose');
const { db } = require('./models/Product');

// MongoDB connection function
const connectDB = async () => {
  try {
    // Log the MongoDB URI for debugging purposes
    console.log('Mongo URI:', process.env.MONGO_URI);

    // Check if Mongo URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error('Mongo URI is not defined');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
