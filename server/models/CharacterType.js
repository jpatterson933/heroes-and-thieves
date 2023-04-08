const { Schema, model } = require("mongoose");

const characterTypeSchema = new Schema(
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
        description: {
            type: String,
            required: true
        }

    }
)

// initialize the model
const CharacterType = model('characterType', characterTypeSchema);

module.exports = CharacterType;
