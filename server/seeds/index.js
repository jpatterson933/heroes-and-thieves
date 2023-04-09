const db = require("../config/connection");
const { Hero, CharacterType, Item } = require("../models");

const characterTypeData = require("./characterType.json");
const heroData = require("./hero.json");
const itemData = require("./item.json");

db.once("open", async () => {
    // empty databases
    await CharacterType.deleteMany({});
    await Hero.deleteMany({});
    await Item.deleteMany({});
    // insert data into databases
    await CharacterType.insertMany(characterTypeData);
    await Hero.insertMany(heroData);
    await Item.insertMany(itemData)
    console.log("Character types seeded!");
    process.exit(0);
})