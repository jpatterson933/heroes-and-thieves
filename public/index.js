// hero (can do a list of heros)        //health, attack, defense
const jackStrom = new Character(1, 'JackStrom', 1000, 250, 75);
const devyBones = new Character(2, 'Devy Bones', 1180, 289, 45);

// heroes put into an array for looping purposes
const heroes = [jackStrom, devyBones]

//secondary characters
const nebula = new Character(3, 'Nebula', 1000, 50, 300);
const grant = new Character(4, 'GRANT', 1000, 160, 109)
//boss characters
const ironGiant = new Character(5, 'Baby Iron Giant', 10000, 25, 0)

let appendHeroDisplayCard = async (hero, appendTo) => {
  // Find an existing display card with the same data-hero-id
  const existingDisplayCard = appendTo.find(`.card[data-hero-id="${hero.id}"]`);

  // If a display card exists, remove it
  if (existingDisplayCard.length) {
    existingDisplayCard.remove();
  }

  // Append a new display card
  const displayCard = hero.listDisplay();
  appendTo.append(displayCard);
};

let removeHeroDisplayCard = (hero, appendTo) => {
    // Find an existing display card with the same data-hero-id
    const existingDisplayCard = appendTo.find(`.card[data-hero-id="${hero.id}"]`);

    // If a display card exists, remove it
    if (existingDisplayCard.length) {
      existingDisplayCard.remove();
    }


}



// top banner that holds are heros, we use the appendHeroDisplayCard to show heros
const heroListWrapper = $("#hero-list-wrapper")
// displays our characters - first paramater is which character second parameter is where to append
appendHeroDisplayCard(jackStrom, heroListWrapper);
appendHeroDisplayCard(nebula, heroListWrapper)

//defines jackstrom's turn - ultimately this is the players turn to click
let jackStromTurn = true;

const attackMain = () => {

  // grab our attack button
  const attackButton = document.getElementById("attack");

  // our click set to false for appending our current hero card;
  let _clicked = false;
  // we should add multiple buttons for different attacks - think pokemonesque
  // function for heroes attack - OUR CARD DISPLAY FUNTIONS ARE IN HERE AS WELL AS 
  attackButton.addEventListener("click", function () {
    // if statement that only allows one appendage on click
    if (!_clicked) {
      _clicked = true;
    };

    // if statement that determins if our hero is alive
    if (!jackStrom.isAlive()) {
      console.log('You lose');
    } else if (!nebula.isAlive()) {
      console.log(`You have defeated ${nebula.name}`)
      removeHeroDisplayCard(nebula, heroListWrapper)
      appendHeroDisplayCard(grant, heroListWrapper)
    } else if (jackStrom.isAlive()) {
      /* take heros attack and run it through the attack adjustment function
      this randomizes our attack power to provide more variability */
      jackStrom.attack = jackStrom.attackAdjustment(jackStrom.attack, nebula.defense)
      appendHeroDisplayCard(jackStrom, heroListWrapper)
      jackStrom.charge(nebula);
      // nebula.printHealth();
      appendHeroDisplayCard(nebula, heroListWrapper)
      // this is where we are printing out on screen the amount of damage taken by the attacker
      nebula.chargeDamageTaken(jackStrom, nebula);
      // this is the amount of health left by the defender
      // nebula.healthLeft(nebula);
      appendHeroDisplayCard(nebula, heroListWrapper)
    }
    // Switch turns
    jackStromTurn = !jackStromTurn;
  });

}

attackMain()

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
        appendHeroDisplayCard(jackStrom, heroListWrapper)
        jackStrom.charge(grant);
        grant.chargeDamageTaken(jackStrom, grant)
        appendHeroDisplayCard(grant, heroListWrapper)
        grant.printHealth();
      } else {
        grant.charge(jackStrom);
        appendHeroDisplayCard(jackStrom, heroListWrapper);
        jackStrom.printHealth();
      }

      // Switch turns
      jackStromTurn = !jackStromTurn;

    }, 1000);
  }
},
);

//boss fight - ONLY EXISTS IN THE CONSOLE
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