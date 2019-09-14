const mongoose = require("mongoose");

const expectatorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  urls: [
    {
      url: {
        type: String,
        required: true,
      },
      lastHash: String,
    },
  ],
});

module.exports = mongoose.model("Expectator", expectatorSchema);
