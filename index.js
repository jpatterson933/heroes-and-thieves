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

    charge (opponent) {
        opponent.health -= this.attack;
    }

    healthRegen () {
        this.health += 5000;
    }
}

const jackStrom = new Character ('jackStrom', 1000, 250, 75);
const nebula = new Character ('nubula', 3000, 50, 300);



jackStrom.printStats()
nebula.printStats()

let jackStromTurn = true;

const turnInterval = setInterval(() => {
    // If either character is not alive, end the game
    if (!jackStrom.isAlive() || !nebula.isAlive()) {
      clearInterval(turnInterval);
      console.log('Game over!');
    } else if (jackStromTurn) {
      jackStrom.charge(nebula);
      nebula.printStats();
    } else {
      nebula.charge(jackStrom);
      jackStrom.printStats();
    }
  
    // Switch turns
    jackStromTurn = !jackStromTurn;
  }, 200);

  const healthInterval = setInterval(() => {
      if (!jackStrom.isAlive() || !nebula.isAlive()) {
          clearInterval(healthInterval);
      } 

      nebula.healthRegen();
  }, 2000);