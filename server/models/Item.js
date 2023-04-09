const { Schema, model } = require("mongoose");
// const characterType = require("./CharacterType");

const itemSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            max_length: 15,
        },
        itemType: {
            type: String,
            required: true,
            enum: ["potion", "weapon"]
        },
        description: {
            type: String,
            required: true,
            max_length: 255,
        },
        // type wil Map through,
        // values of Number
        // represent key value pairs with the keys being a string and the number being the value
        effect: {
            type: Map,
            of: Number,
            required: true,
        },
    }
)

// initialize the model
const Item = model('item', itemSchema);

module.exports = Item;
