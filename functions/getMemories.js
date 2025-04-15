// netlify/functions/getMemories.js
const connectToDatabase = require('./db');
const Memory = require('../models/memory');

exports.handler = async function (event, context) {
  await connectToDatabase();

  try {
    const memories = await Memory.find();
    return {
      statusCode: 200,
      body: JSON.stringify(memories),
    };
  } catch (error) {
    console.error('Error fetching memories:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error fetching memories' }),
    };
  }
};
