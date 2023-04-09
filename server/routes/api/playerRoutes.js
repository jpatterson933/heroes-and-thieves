const router = require("express").Router();

const { 
    createPlayer,
    getPlayer
 } = require("../../controllers/playerController");

router.route("/").post(createPlayer);
router.route("/:playerId").get(getPlayer) // for a specific player, we can also have the put/update and delete routes here

module.exports = router;