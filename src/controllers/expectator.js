const Expectator = require("../models/expectator");

const create = async (req, res) => {
  try {
    let newExpectator = new Expectator({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      urls: req.body.urls,
      notificationMethod: req.body.notificationMethod,
    });
    await newExpectator.save();
    res.status(201).send("Expectator created");
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = {
  create,
};
