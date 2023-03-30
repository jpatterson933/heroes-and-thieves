//basic character class // tomorrow try and add a class for boss characters
class Character {
  //defense never used here
  constructor(id, name, health, attack, defense) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }
  // an event listener that will toggle the highlight class for our display cards.
  handleCardDisplayClick(event) {
    // get the card element and toggle the highlight class
    const card = event.currentTarget;
    card.classList.toggle("highlight");
  }

  // I want to display the hero in a card
  // the card will need to have a select function that highlights it when it is selected
  // the heros will be in an index, when the card is selected, the index number of the created hero, will be used to access the other functions
  listDisplay() {
    const characterCard = document.createElement('div');
    characterCard.classList.add('card');
    characterCard.setAttribute('data-hero-id', this.id);
    characterCard.innerHTML = `
        <h3>${this.name}</h3>
        <p>Health: ${this.health}</p>
        <p>Attack Strength: ${this.attack}</p>
        <p>Defense: ${this.defense}</p>
    `;
    characterCard.addEventListener('click', (event) => this.handleCardDisplayClick(event));
    return characterCard;
  }


  //print health when a person is damaged // is there a way to print damage taken?
  // this console logs the characters name and the characters health -- do I even need the print health function? Only logging to console.
  printHealth() {
    console.log(`${this.name} Health: ${this.health}`)
  }

  // here we are going to print health of person who has taken damage

  healthLeft(defender) {
    const dtWrapper = $("#health-screen");
    // const defenderHealth = this.health - 100;
    // console.log(defenderHealth, "defender health", defender)
    const healthLeftMessage = `${defender.name} has ${defender.health} health left!`;
    this.listDisplay();
    dtWrapper.empty().append(healthLeftMessage);
    // console.log(`${defender.name} has ${defender.health} left!`)
  }

  // our function to take into account defenders defense 
  attackAdjustment(attackPower, opponentDefense) {

    let buffer = defenseBuffer(opponentDefense);
    // This randomizes our characters attack
    let attackAdjustment = buffer * (attackPower * (Math.random() + 0.6));
    return Math.round(attackAdjustment);
  }

  // CHARGE ATTACK FOLLOWED BY CHARGE DAMAGE TAKEN BEING DISPLAYED ONTO ACTION SCREEN
  //a basic character attack - parameter is whoever is being attacked
  charge(opponent) {
    console.log(`${this.name} charges ${opponent.name}`)
    opponent.health -= this.attack;
  }

  //------------------ THIS FUNCTION IS THE ONLY FUNCTION WE HAVE PRINTING ONTO OUR ACTION SCREEN--------------------------------//
  chargeDamageTaken(attacker, defender) {
    const damage = attacker.attack;
    // this displays the damage taken onto the screen
    const dtWrapper = $("#attack-screen");
    // message that will be displayed onto the action screen
    const message = `${attacker.name} has charged into ${defender.name} for ${damage} damage!`;
    // The ID on the html will be emptied each time before it displays the next attack message
    dtWrapper.empty().append(message);
    // console loggin information - this was the basis for the game that was done first - console.log
    // console.log(`${attacker.name} has charged into ${defender.name} for ${attacker.attack} damage!`)
  };
  //-------------------ACTION SCREEN FUNCTION WRAPPER ---------------------------------------------------------------------------//


  // Add this method inside the Character class
  deathMessage() {
    const dtWrapper = $("#attack-screen");
    const message = `${this.name} is dead!`;
    dtWrapper.empty().append(message);

    setTimeout(() => {
      dtWrapper.empty();
    }, 3000);
  }

  isAlive() {
    if (this.health > 0) {
      return true;
    } else {
      this.deathMessage();
      return false;
    }
  }


  //health regen ability that happens every 5 seconds
  healthRegen() {
    // health regeneration - occurs automatically - should initiate by clicking power up or some type of health
    console.log(`${this.name} has regnerated 30 Health`)
    this.health += 30;
  }
  //a superior character attack
  powerSlam(opponent) {
    console.log(`${this.name} POWER SLAMS ${opponent.name}`)
    opponent.health -= 1050
  }

  powerSlamDamageTaken(attacker, defender) {
    // this displays the damage taken onto the screen
    const dtWrapper = $("#attack-screen");
    // message that will be displayed onto the action screen
    const damageTakenMessage = `${attacker.name} Power Slammed ${defender.name} for ${attacker.attack} damage!`;
    // The ID on the html will be emptied .empty() each time before it displays the next attack message
    dtWrapper.empty().append(damageTakenMessage);
    // console loggin information - this was the basis for the game that was done first - console.log
    console.log(`${attacker.name} has charged into ${defender.name} for ${attacker.attack} damage!`)
  };
}
