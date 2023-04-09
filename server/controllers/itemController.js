const Item = require("../models/Item");

module.exports = {
    async createItem(req, res) {
        try {
            const dbItemData = await Item.create(req.body);
            res.json(dbItemData);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}