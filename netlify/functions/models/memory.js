const mongoose = require("mongoose");
const Memory = require("../model/Memory"); 

const uri = "mongodb+srv://aswithakousi:aswithab1210A@cluster0.x1k85bm.mongodb.net/memory-scrapbook?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

// Function to connect to the MongoDB database
async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
}

// Netlify function handler
exports.handler = async (event) => {
  await connectToDatabase();

  // Handling the different HTTP methods
  switch (event.httpMethod) {
    case "GET":
      // Fetch all memories
      try {
        const memories = await Memory.find({});
        return {
          statusCode: 200,
          body: JSON.stringify(memories),
        };
      } catch (error) {
        console.error("Error fetching memories:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Error fetching memories" }),
        };
      }

    case "POST":
      // Add a new memory
      try {
        const { title, description, category, date } = JSON.parse(event.body);
        const newMemory = new Memory({ title, description, category, date });
        await newMemory.save();

        return {
          statusCode: 201,
          body: JSON.stringify(newMemory),
        };
      } catch (error) {
        console.error("Error adding memory:", error);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Error adding memory" }),
        };
      }

    case "DELETE":
      // Delete a memory by ID
      try {
        const { id } = event.pathParameters;
        await Memory.findByIdAndDelete(id);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Memory deleted" }),
        };
      } catch (error) {
        console.error("Error deleting memory:", error);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Error deleting memory" }),
        };
      }

    case "PUT":
      // Update a memory by ID
      try {
        const { id } = event.pathParameters;
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
        console.error("Error updating memory:", error);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Error updating memory" }),
        };
      }

    default:
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }
};
