const router = require("express").Router();

const heroRoutes = require("./heroRoutes");
const characterTyperoutes= require("./characterTypeRoutes");

router.use("/heroes", heroRoutes);
router.use("/characterTypes", characterTyperoutes)

module.exports = router;