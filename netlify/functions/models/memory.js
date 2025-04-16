const mongoose = require("mongoose");
const Memory = require("../src/models/Memory"); // wherever your schema is saved

const uri = "mongodb+srv://aswithakousi:aswithab1210A@cluster0.x1k85bm.mongodb.net/memory-scrapbook?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
}

exports.handler = async (event) => {
  await connectToDatabase();

  if (event.httpMethod === "GET") {
    const memories = await Memory.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(memories),
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
