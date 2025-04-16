// netlify/functions/db.js
const mongoose = require('mongoose');

// Track connection status
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    // Connect to MongoDB using the URI from environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Set connection flag to true
    isConnected = true;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw new Error('Database connection failed');
  }
};

module.exports = connectToDatabase;
