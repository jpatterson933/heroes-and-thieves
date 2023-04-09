const router = require("express").Router();

const heroRoutes = require("./heroRoutes");
const characterTyperoutes= require("./characterTypeRoutes");
const itemRoutes = require("./itemRoutes");
const playerRoutes= require("./playerRoutes");

router.use("/heroes", heroRoutes);
router.use("/characterTypes", characterTyperoutes)
router.use("/items", itemRoutes);
router.use("/player", playerRoutes);

module.exports = router;