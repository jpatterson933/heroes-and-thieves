const CharacterType = require("../models/CharacterType");

module.exports = {
    async createCharacterType(req, res) {
        try {
            const dbCharacterTypeData = await CharacterType.create(req.body);
            res.json(dbCharacterTypeData);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}