const sms = require("./sms");
const email = require("./email");

function send({ to, text, notificationMethod }) {
  let from;
  let notifier;
  if (notificationMethod === "sms") {
    from = "+49111111111";
    notifier = sms;
  } else {
    from = "info@watchtower.lgo";
    notifier = email;
  }
  notifier.send({ from, to, text });
}

module.exports = {
  send,
};
