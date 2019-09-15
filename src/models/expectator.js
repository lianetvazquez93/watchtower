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
  notificationMethod: {
    type: String,
    required: true,
    enum: ["sms", "email"],
  },
});

expectatorSchema.pre("save", async function(next) {
  for await (let obj of this.urls) {
    const { hash } = await utils.pipeline(obj.url);
    obj.lastHash = hash;
  }
  next();
});

module.exports = mongoose.model("Expectator", expectatorSchema);
