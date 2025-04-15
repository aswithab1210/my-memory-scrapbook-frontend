// netlify/functions/deleteMemory.js
const connectToDatabase = require('./db');
const Memory = require('../../models/memory');

exports.handler = async function (event, context) {
  await connectToDatabase();

  const { id } = event.pathParameters;

  try {
    await Memory.findByIdAndDelete(id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory deleted' }),
    };
  } catch (error) {
    console.error('Error deleting memory:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error deleting memory' }),
    };
  }
};
