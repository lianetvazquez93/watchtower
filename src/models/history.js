const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  statusCode: Number,
  loadingTime: Number,
  url: String,
});

module.exports = mongoose.model("History", historySchema);
