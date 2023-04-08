const router = require("express").Router();

const { createCharacterType } = require("../../controllers/characterTypeController");

router.route("/").post(createCharacterType);

module.exports = router;