const { Schema, model } = require("mongoose");
const characterType = require("./CharacterType");

const heroSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            max_length: 15,
        },
        attackStrength: {
            type: Number,
            required: true,
            max_length: 10,
        },
        defensiveStrength: {
            type: Number,
            required: true,
            max_length: 15,
        },
        characterType: {
            type: String, // we set the character type by the characterType _id
            required: true
        }

    }
)

// initialize the model
const Hero = model('hero', heroSchema);

module.exports = Hero;
