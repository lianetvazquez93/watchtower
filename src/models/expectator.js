const mongoose = require("mongoose");

const utils = require("../lib/utils");

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
      lastHash: {
        type: String,
        default: null,
      },
    },
  ],
});

expectatorSchema.pre("save", async function(next) {
  for await (let obj of this.urls) {
    obj.lastHash = await utils.pipeline(obj.url);
  }
  next();
});

module.exports = mongoose.model("Expectator", expectatorSchema);
