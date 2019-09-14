const mongoose = require("mongoose");
const express = require("express");

const config = require("./lib/config");

mongoose.connect(config.dbUrl, { useNewUrlParser: true }).catch(err => {
  console.log(err.message);
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
