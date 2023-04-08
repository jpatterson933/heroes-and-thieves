const db = require("../config/connection");
const { Hero, CharacterType } = require("../models");

const characterTypeData = require("./characterType.json");
const heroData = require("./hero.json");

db.once("open", async () => {
    await CharacterType.deleteMany({});
    await Hero.deleteMany({});

    const characterTypes = await CharacterType.insertMany(characterTypeData);
    const heroes = await Hero.insertMany(heroData);
    console.log("Character types seeded!");
    process.exit(0);
})