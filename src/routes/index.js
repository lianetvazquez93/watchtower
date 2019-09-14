const { Router } = require("express");

const expectatorRoutes = require("./expectator");

const router = Router();

router.use("/expectators", expectatorRoutes);

module.exports = router;
