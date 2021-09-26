console.log(process.argv)

//basic character class // tomorrow try and add a class for boss characters
class Character {
  //defense never used here
  constructor(name, health, attack, defense) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }
  //print health when a person is damaged // is there a way to print damage taken?
  // this console logs the characters name and the characters health
  printHealth() {

    
    console.log(`${this.name} Health: ${this.health}`)
  }

  damageTaken (opponent) {
    console.log( `Damage Taken: ${opponent.attack}`)
  }


  //this checks to see if our character is alive - returns a boolian of true character is alive or not
  isAlive() {
    if (this.health >= 0) {
      return true;
    }
    return false;
  }
  //a basic character attack
  charge(opponent) {
    console.log(`${this.name} charges ${opponent.name}`)
    opponent.health -= this.attack;
  }
  //jackstorm has a health regen ability that happens every 5 seconds
  healthRegen() {
    console.log(`${this.name} has regnerated 30 Health`)
    this.health += 30;
  }
  //2nd Tier Attack
  powerSlam(opponent) {
    console.log(`${this.name} POWER SLAMS ${opponent.name}`)
    opponent.health -= 1050
  }
}
//ability to recover health slowly         //health, attack, defense
const jackStrom = new Character('JackStrom', 1000, 250, 75);

//secondary characters
const nebula = new Character('nubula', 1000, 50, 300);
const grant = new Character('GRANT', 1000, 160, 109)
//boss character
const ironGiant = new Character('Baby Iron Giant', 10000, 25, 0)


jackStrom.printHealth()
nebula.printHealth()

//defines jackstrom's turn
let jackStromTurn = true;

//HOW DO I STOP JACKSTROM FROM REGENERATING HEALTH!!?!?!?
//jackStrom health regeneration happens every 5 seconds
const healthInterval = setInterval(() => {
  if (!jackStrom.isAlive()) {
    clearInterval(healthInterval)
  }
  jackStrom.healthRegen();
}, 5000);

//first fight
const turnInterval = setInterval(() => {
  // If either character is not alive, end the game
  if (!jackStrom.isAlive() || !nebula.isAlive()) {
    clearInterval(turnInterval);
    console.log('NEXT FIGHT!');
  } else if (jackStromTurn) {
    jackStrom.charge(nebula);
    nebula.printHealth();
    nebula.damageTaken(jackStrom)
  } else {
    nebula.charge(jackStrom);
    jackStrom.printHealth();
  }

  // Switch turns
  jackStromTurn = !jackStromTurn;

}, 10000);


grant.printHealth()

//we know nebula is going to lose so we set up the next fight and rig the system
//so we can say in this when nebular is ! alive excuted next fight
const nextTurnInterval = setInterval(() => {
  if (!nebula.isAlive()) {
    clearInterval(nextTurnInterval);

    const turnInterval = setInterval(() => {
      // If either character is not alive, end the game
      if (!jackStrom.isAlive() || !grant.isAlive()) {
        clearInterval(turnInterval);
        console.log('BOSS FIGHT!');
      } else if (jackStromTurn) {
        jackStrom.charge(grant);
        grant.printHealth();
      } else {
        grant.charge(jackStrom);
        jackStrom.printHealth();
      }

      // Switch turns
      jackStromTurn = !jackStromTurn;

    }, 1000);
  }
},
);

//boss fight
const levelOneBossFight = setInterval(() => {
  if (!grant.isAlive() || !jackStrom.isAlive() || !ironGiant.isAlive()) {
    clearInterval(levelOneBossFight);


    const turnInterval = setInterval(() => {
      if (!jackStrom.isAlive() || !ironGiant.isAlive()) {
        clearInterval(turnInterval);
        console.log(`Game Over ${jackStrom.name} IS THE CHAMPION!`);
      } else if (jackStromTurn) {
        jackStrom.powerSlam(ironGiant);
        ironGiant.printHealth();
      } else {
        ironGiant.charge(jackStrom);
        jackStrom.printHealth();
      }

      // Switch turns
      jackStromTurn = !jackStromTurn;

    }, 3000);
  }

}, 1000);

