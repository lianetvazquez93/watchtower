const GoogleSpreadsheet = require("google-spreadsheet");

const config = require("./config");
const { promisify } = require("util");
const credentials = require("../../.secret/credentials.json");

const sheet = new GoogleSpreadsheet(config.spreadSheetId);

async function addRow(data) {
  await promisify(sheet.useServiceAccountAuth)(credentials);
  await promisify(sheet.addRow)(1, data);
}

module.exports = {
  addRow,
};
