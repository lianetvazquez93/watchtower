const config = require("../config");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.sgApiKey);

async function send({ from, to, text }) {
  sgMail.send({ from, to, text, subject: "You have a new alert!" });
}

module.exports = {
  send,
};
