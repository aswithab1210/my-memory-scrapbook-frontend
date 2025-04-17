const mongoose = require("mongoose");
const Memory = require("../model/Memory");

const uri = "mongodb+srv://aswithakousi:aswithab1210A@cluster0.x1k85bm.mongodb.net/memory-scrapbook?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
}

exports.handler = async (event) => {
  await connectToDatabase();

  switch (event.httpMethod) {
    case "GET":
      try {
        const memories = await Memory.find({});
        return {
          statusCode: 200,
          body: JSON.stringify(memories),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Error fetching memories" }),
        };
      }

    case "POST":
      try {
        const { title, description, category, date } = JSON.parse(event.body);
        const newMemory = new Memory({ title, description, category, date });
        await newMemory.save();
        return {
          statusCode: 201,
          body: JSON.stringify(newMemory),
        };
      } catch (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Error adding memory" }),
        };
      }

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }
};
