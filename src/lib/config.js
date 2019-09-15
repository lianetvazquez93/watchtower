module.exports = {
  port: process.env.APP_PORT,
  dbUrl: process.env.DB_URL,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  sgApiKey: process.env.SENDGRID_API_KEY,
  spreadSheetId: process.env.SPREADSHEET_ID,
};
