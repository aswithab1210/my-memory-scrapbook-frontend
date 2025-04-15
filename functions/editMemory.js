// netlify/functions/editMemory.js
const connectToDatabase = require('./db');
const Memory = require('../../models/memory');

exports.handler = async function (event, context) {
  await connectToDatabase();

  const { id } = event.pathParameters;
  const { title, description, category, date } = JSON.parse(event.body);

  try {
    const updatedMemory = await Memory.findByIdAndUpdate(
      id,
      { title, description, category, date },
      { new: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updatedMemory),
    };
  } catch (error) {
    console.error('Error updating memory:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error updating memory' }),
    };
  }
};
