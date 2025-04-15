// netlify/functions/addMemory.js
console.log('Current working directory:', __dirname);
const connectToDatabase = require('./db');
const Memory = require('./models/memory');  // Adjusted to the correct path

exports.handler = async function (event, context) {
  await connectToDatabase();

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ message: 'Only POST requests allowed' }),
    };
  }

  const { title, description, category, date } = JSON.parse(event.body);

  try {
    const newMemory = new Memory({ title, description, category, date });
    await newMemory.save();

    return {
      statusCode: 201,
      body: JSON.stringify(newMemory),
    };
  } catch (error) {
    console.error('Error adding memory:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error adding memory' }),
    };
  }
};
