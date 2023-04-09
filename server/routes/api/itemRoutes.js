const router = require("express").Router();

const { createItem } = require("../../controllers/itemController");

router.route("/").post(createItem);

module.exports = router;