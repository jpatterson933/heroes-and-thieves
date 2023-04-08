const { Schema, model } = require("mongoose");

const characterTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            max_length: 15,
        },

    }
)

// initialize the model
const CharacterType = model('characterType', characterTypeSchema);

module.exports = CharacterType;
