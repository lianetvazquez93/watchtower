const express = require("express");

const db = require("./lib/db");
const routes = require("./routes");
const config = require("./lib/config");

db.connect().catch(err => {
  console.log(err.message);
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
