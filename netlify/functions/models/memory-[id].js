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

  const { id } = event.pathParameters;

  switch (event.httpMethod) {
    case "PUT":
      try {
        const { title, description, category, date } = JSON.parse(event.body);
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
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Error updating memory" }),
        };
      }

    case "DELETE":
      try {
        await Memory.findByIdAndDelete(id);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Memory deleted" }),
        };
      } catch (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Error deleting memory" }),
        };
      }

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }
};
