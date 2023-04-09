const db = require("../config/connection");
const { Hero, CharacterType, Item, Player } = require("../models");

const characterTypeData = require("./characterType.json");
const heroData = require("./hero.json");
const itemData = require("./item.json");
const playerData = require("./player.json");

db.once("open", async () => {
    // empty databases
    await CharacterType.deleteMany({});
    await Hero.deleteMany({});
    await Item.deleteMany({});
    await Player.deleteMany({});
    // insert data into databases
    await CharacterType.insertMany(characterTypeData);
    await Hero.insertMany(heroData);
    await Item.insertMany(itemData)
    await Player.insertMany(playerData);
    console.log("Character types seeded!");
    process.exit(0);
})