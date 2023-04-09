const { Schema, model } = require("mongoose");

const Hero = require("./Hero");
const Item = require("./Item");

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        min_length: 6,
        max_length: 21,
    },
    heroes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Hero",
        },
    ],
    inventory: [
        {
            type: String,
            ref: "Item",
        },
    ],
});

const Player = model("Player", playerSchema);
module.exports = Player;