// console.log(process.argv)

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

  attackAdjustment(attackPower /* second parameter should be opponenets defense */) {
    // This randomizes our characters attack
    let attackAdjustment = attackPower * (Math.random() + 0.6);
    return attackAdjustment;
  }

  damageTaken(opponent) {
    console.log(`Damage Taken: ${opponent.attack}`)
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

const heroCard = `
  <ul>
    <li>her name</li>
    <li>health</li>
  </ul>
`;



// hero (can do a list of heros)        //health, attack, defense
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

// Need to turn this into a use potion function where Jackstrom will regenerate health 5 times after using a postion
//jackStrom health regeneration happens every 5 seconds
const healthInterval = setInterval(() => {
  if (!jackStrom.isAlive()) {
    clearInterval(healthInterval)
  }
  jackStrom.healthRegen();
}, 5000);

// grab our attack button
const attackButton = document.getElementById("attack");
// console.log(attackButton)

// function for heros attack
attackButton.addEventListener("click",  function () {

  if (!jackStrom.isAlive() || !nebula.isAlive()) {
    console.log('NEXT FIGHT!');
  } else if (jackStrom.isAlive()){

    /* take heros attack and run it through the attack adjustment function
       this randomizes our attack power to provide more variability */
    jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack)
    jackStrom.charge(nebula);
    nebula.printHealth();
    nebula.damageTaken(jackStrom);

  }
  // Switch turns
  jackStromTurn = !jackStromTurn;
});

//first fight
// const turnInterval = setInterval(() => {
//   // If either character is not alive, end the game
//   if (!jackStrom.isAlive() || !nebula.isAlive()) {
//     clearInterval(turnInterval);
//     console.log('NEXT FIGHT!');
//   } else if (jackStromTurn) {

//     jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack)
//     jackStrom.charge(nebula);
//     nebula.printHealth();
//     nebula.damageTaken(jackStrom);
//   } else {
//     nebula.charge(jackStrom);
//     jackStrom.printHealth();
//   }

//   // Switch turns
//   jackStromTurn = !jackStromTurn;

// }, 4000);


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
        jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack)

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
        jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack)

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

