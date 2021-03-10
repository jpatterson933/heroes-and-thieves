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

    isAlive () {
        if (this.health >= 0) {
            return true;
        }   
        return false;
    }

    attack (opponent) {
        opponent.health -= this.strength
    }
}

const jackStrom = new Character ('jackStrom', 1000, 250, 75);
const nebula = new Character ('nubula', 3000, 50, 300);



jackStrom.printStats()
nebula.printStats()

jackStrom.attack(nebula)
nebula.printStats()
