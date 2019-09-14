const mongoose = require("mongoose");

const config = require("./config");

async function connect() {
  await mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

module.exports = {
  connect,
};
