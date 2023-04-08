const db = require("../config/connection");
const { Hero, CharacterType } = require("../models");

const characterTypeData = require("./characterType.json");
const heroData = require("./hero.json");

db.once("open", async () => {
    // empty databases
    await CharacterType.deleteMany({});
    await Hero.deleteMany({});
    // insert data into databases
    await CharacterType.insertMany(characterTypeData);
    await Hero.insertMany(heroData);
    console.log("Character types seeded!");
    process.exit(0);
})