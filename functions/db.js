// netlify/functions/db.js
const mongoose = require('mongoose');

let isConnected = false;  // Track the connection status

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw new Error('Database connection failed');
  }
};

module.exports = connectToDatabase;
