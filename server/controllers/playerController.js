const Player = require("../models/Player");

module.exports = {
    async createPlayer(req, res) {
        try {
            const dbPlayerData = await Player.create(req.body);
            res.json(dbPlayerData);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}