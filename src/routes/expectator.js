const { Router } = require("express");

const expectatorController = require("../controllers/expectator");

const router = Router();

router.post("/", expectatorController.create);

module.exports = router;
