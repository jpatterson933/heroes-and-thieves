const router = require("express").Router();

const { createHero } = require("../../controllers/heroController");

router.route("/").post(createHero);

module.exports = router;