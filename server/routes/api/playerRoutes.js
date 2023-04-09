const router = require("express").Router();

const { createPlayer } = require("../../controllers/playerController");

router.route("/").post(createPlayer);

module.exports = router;