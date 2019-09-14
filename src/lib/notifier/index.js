const sms = require("./sms");
const email = require("./email");
const config = require("../config");

function send({ from, to, text }) {
  const notifier = config.notifier === "sms" ? sms : email;
  notifier.send({ from, to, text });
}

module.exports = {
  send,
};
