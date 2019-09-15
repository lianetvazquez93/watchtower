const mongoose = require("mongoose");

const notifier = require("../lib/notifier");

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

historySchema.post("save", async function(doc) {
  const expectator = await this.model("Expectator").findById(doc.expectator);
  const to = expectator.notificationMethod === "sms" ? expectator.phoneNumber : expectator.email;
  notifier.send({
    to,
    text: `There are new changes in ${doc.url}`,
    notificationMethod: expectator.notificationMethod,
  });
});

module.exports = mongoose.model("History", historySchema);
