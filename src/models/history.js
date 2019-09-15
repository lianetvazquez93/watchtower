const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  statusCode: Number,
  loadingTime: Number,
  url: String,
  expectator: {
    type: mongoose.Types.ObjectId,
    ref: "Expectator",
  },
  httpVersion: String,
});

module.exports = mongoose.model("History", historySchema);
