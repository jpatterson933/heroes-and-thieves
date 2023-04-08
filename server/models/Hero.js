const { Schema, model } = require("mongoose");

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
        }

    }
)

// initialize the model
const Hero = model('hero', heroSchema);

module.exports = Hero;
