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
    // this console logs the characters name and the characters health -- do I even need the print health function? Only logging to console.
    printHealth() {
      console.log(`${this.name} Health: ${this.health}`)
    }
  
    // here we are going to print health of person who has taken damage
  
    healthLeft(defender) {
      const dtWrapper = $("#health-screen");
      const healthLeftMessage = `${defender.name} has ${defender.health} health left!`;
      dtWrapper.empty().append(healthLeftMessage);
      console.log(`${defender.name} has ${defender.health} left!`)
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
      // this displays the damage taken onto the screen
      const dtWrapper = $("#attack-screen");
      // message that will be displayed onto the action screen
      const damageTakenMessage = `${attacker.name} has charged into ${defender.name} for ${attacker.attack} damage!`;
      // The ID on the html will be emptied each time before it displays the next attack message
      dtWrapper.empty().append(damageTakenMessage);
      // console loggin information - this was the basis for the game that was done first - console.log
      console.log(`${attacker.name} has charged into ${defender.name} for ${attacker.attack} damage!`)
    };
    //-------------------ACTION SCREEN FUNCTION WRAPPER ---------------------------------------------------------------------------//
  
  
    //this checks to see if our character is alive - returns a boolian of true character is alive or not
    isAlive() {
      if (this.health >= 0) {
        return true;
      }
      return false;
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
  