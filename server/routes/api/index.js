const router = require("express").Router();

const heroRoutes = require("./heroRoutes");

router.use("/heroes", heroRoutes);

module.exports = router;