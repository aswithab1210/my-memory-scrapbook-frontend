const mongoose = require('mongoose');
const Memory = require('./models/memory'); // ✅ Corrected path

// Connect to DB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI);
};

// Handler
exports.handler = async function (event, context) {
  try {
    await connectDB();
    const memories = await Memory.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(memories),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};
