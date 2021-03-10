console.log(process.argv)

class Character {
    constructor (name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    printStats() {
        console.log(`${this.name} has ${this.health} health left`)
    }
    defend () {
        if (this.attack > this.defense) {
            this.health -= 1;
        }
    }
}

jackStrom = new Character ('jackStrom', 1000, 250, 75)

jackStrom.printStats()