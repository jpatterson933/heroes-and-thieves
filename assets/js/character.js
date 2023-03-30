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

  // eventlistener
  highlightCard(event) {
    // get the card element and toggle the highlight class
    const card = event.currentTarget;
    card.classList.toggle("highlight");
  }

  // display the card in the herolistwrapper
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
    characterCard.addEventListener('click', (event) => this.highlightCard(event));
    return characterCard;
  }

  // printHealth() {
  //   console.log(`${this.name} Health: ${this.health}`)
  // }

  healthLeft(defender) {
    const dtWrapper = $("#health-screen");
    const healthLeftMessage = `${defender.name} has ${defender.health} health left!`;
    this.listDisplay();
    dtWrapper.empty().append(healthLeftMessage);
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
    // console.log(`${this.name} charges ${opponent.name}`)
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
  };
  //-------------------ACTION SCREEN FUNCTION WRAPPER ---------------------------------------------------------------------------//

  isAlive() {
    if (this.health > 0) {
      return true;
    } else {
      return false;
    }
  }

  //health regen ability that happens every 5 seconds
  // this happens inside an interval and not actually in this method
  healthRegen() {
    this.health += 30;
  }
  //a superior character attack
  powerSlam(opponent) {
    opponent.health -= 1050
  }

  powerSlamDamageTaken(attacker, defender) {
    // this displays the damage taken onto the screen
    const dtWrapper = $("#attack-screen");
    // message that will be displayed onto the action screen
    const damageTakenMessage = `${attacker.name} Power Slammed ${defender.name} for ${attacker.attack} damage!`;
    // The ID on the html will be emptied .empty() each time before it displays the next attack message
    dtWrapper.empty().append(damageTakenMessage);
  };
}