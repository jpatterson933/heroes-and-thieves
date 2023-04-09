const router = require("express").Router();

const heroRoutes = require("./heroRoutes");
const characterTyperoutes= require("./characterTypeRoutes");
const itemRoutes = require("./itemRoutes")

router.use("/heroes", heroRoutes);
router.use("/characterTypes", characterTyperoutes)
router.use("/items", itemRoutes);

module.exports = router;