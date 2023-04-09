const Player = require("../models/Player");

module.exports = {
    async createPlayer(req, res) {
        try {
            const dbPlayerData = await Player.create(req.body);
            res.json(dbPlayerData);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getPlayer(req, res) {
        try {
            const dbPlayerData = await Player.findOne({ _id: req.params.playerId });

            if(!dbPlayerData) {
                return res.status(404).json({ message: "No player with this id exists!"});
            }

            res.json(dbPlayerData);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}