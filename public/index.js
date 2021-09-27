
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
  




  attackAdjustment(attackPower, opponentDefense) {

    let buffer = defenseBuffer(opponentDefense);
    // This randomizes our characters attack
    let attackAdjustment = buffer * (attackPower * (Math.random() + 0.6));
    return Math.round(attackAdjustment);
  }

  chargeDamageTaken(attacker, defender) {




    const dtWrapper = $("#action-screen");
    const damageTakenMessage =  `${attacker.name} has charged into ${defender.name} for ${attacker.attack} damage!`;
    dtWrapper.append(damageTakenMessage)

    console.log(`${attacker.name} has charged into ${defender.name} for ${attacker.attack} damage!`)
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

// hero (can do a list of heros)        //health, attack, defense
const jackStrom = new Character('JackStrom', 1000, 250, 75);
const devyBones = new Character('Devy Bones', 1180, 289, 45);

// console.log(jackStrom)
// for (let i = 0; i < jackStrom.length; i++){
//   console.log("test")
// }

const heroes = [jackStrom, devyBones]

// console.log(heroes[0].name)
//secondary characters
const nebula = new Character('Nubula', 1000, 50, 300);
const grant = new Character('GRANT', 1000, 160, 109)
//boss character
const ironGiant = new Character('Baby Iron Giant', 10000, 25, 0)

jackStrom.printHealth()
nebula.printHealth()

// funciton to display hero list - parameter will be the heroes list
const heroListWrapper = $("#hero-list-wrapper")
let characterCardList = (heroes, appendTo) => {

  // for loop to cycle through heroes
  for (let i = 0; i < heroes.length; i++) {
    // character card list - can be used for any characters
    characterCard = `
    <ul id="hero-card-details-wrapper">
      <li>${heroes[i].name}</li>
      <li>Health: ${heroes[i].health}</li>
      <li>Attack Strength: ${heroes[i].attack}</li>
      <li>Defense: ${heroes[i].defense}</li>
    </ul>
    `;
    appendTo.append(characterCard)
  }
};

// function to display individual characters (character, where to append card);
const heroCardDisplay = (character, appendTo) => {

    // character card list for any character
    card = `
    <div id="hero-card-wrapper">
      <h1>Hero Card</h1>
      <ul id="character-details">
        <li>${character.name}</li>
        <li>Health: ${character.health}</li>
        <li>Attack Strength: ${character.attack}</li>
        <li>Defense: ${character.defense}</li>
      </ul>
    </div>
    `;
    appendTo.append(card)
}


// displays our characters - first paramater is which character second parameter is where to append
characterCardList(heroes, heroListWrapper);

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

// our click set to false for appending our current hero card;
let _clicked = false;

// function for heros attack
attackButton.addEventListener("click", function () {

  // if statement that only allows one appendage on click
  if (!_clicked){
  
    const currentHeroCard = $("#current-hero-card");
    heroCardDisplay(jackStrom, currentHeroCard);
    // sets click to true after appendage
    _clicked = true;
  };

  if (!jackStrom.isAlive()) {
    console.log('You lose');
  } else if (!nebula.isAlive()){
    console.log(`You have defeated ${nebula.name}`)
  }
  else if (jackStrom.isAlive()) {

    
    /* take heros attack and run it through the attack adjustment function
       this randomizes our attack power to provide more variability */
    jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack, nebula.defense)
    jackStrom.charge(nebula);
    nebula.printHealth();
    nebula.chargeDamageTaken(jackStrom, nebula);
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
        jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack, grant.defense)

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
        jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack, ironGiant.defense)

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

// defense buffer that buffers attack based off of characters defense levels
const defenseBuffer = (defense) => {
  if (defense <= 0) {
    return 1.5;
  } else if (defense <= 100) {
    return 1;
  } else if (defense > 100 || defense <= 300) {
    return .9;
  }
  else if (defense > 300 || defense <= 500) {
    return .8;
  }
  else if (defense > 500 || defense <= 100) {
    return .7;
  }
}