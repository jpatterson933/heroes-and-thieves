const Hero = require("../models/Hero");

module.exports = {
    async createHero(req, res) {
        try {
            const dbHeroData = await Hero.create(req.body);
            res.json(dbHeroData);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}