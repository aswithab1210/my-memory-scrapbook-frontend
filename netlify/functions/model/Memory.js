const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: String,
});

module.exports = mongoose.models.Memory || mongoose.model("Memory", memorySchema);
