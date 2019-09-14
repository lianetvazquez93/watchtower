module.exports = {
  port: process.env.APP_PORT,
  notifier: process.env.NOTIFIER,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  sgApiKey: process.env.SENDGRID_API_KEY,
};
