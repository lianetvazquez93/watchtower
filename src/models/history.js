const mongoose = require("mongoose");

const notifier = require("../lib/notifier");
const sheet = require("../lib/sheets");

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
  await notifier.send({
    to,
    text: `There are new changes in ${doc.url}`,
    notificationMethod: expectator.notificationMethod,
  });
  await sheet.addRow({
    Id: doc.id,
    url: doc.url,
    statusCode: doc.statusCode,
    loadingTime: doc.loadingTime,
    httpVersion: doc.httpVersion,
    expectatorId: doc.expectator,
  });
});

module.exports = mongoose.model("History", historySchema);
