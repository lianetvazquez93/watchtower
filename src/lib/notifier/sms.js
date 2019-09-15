const config = require("../config");

const client = require("twilio")(config.twilioAccountSid, config.twilioAuthToken);

async function send({ from, to, text }) {
  await client.messages.create({ from, to, body: text });
}

module.exports = {
  send,
};
