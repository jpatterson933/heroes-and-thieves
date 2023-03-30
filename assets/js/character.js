//basic character class // tomorrow try and add a class for boss characters
class Character {
  //defense never used here
  constructor(id, name, health, attack, defense) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.isSelected = false; // property to track selected state
    this.characterCard = null;
  }
  // set selected card to null
  static selectedCard = null;
  static selectedCharacter = null;

  // ------------- static methods ------------------//
  static appendHeroDisplayCard = async (hero) => {

    const characterDisplay = $("#hero-list-wrapper")

    // Find an existing display card with the same data-hero-id
    const existingCard = characterDisplay.find(`.card[data-hero-id="${hero.id}"]`);

    // If a display card exists, remove it
    if (existingCard.length) {
      existingCard.remove();
    }

    // Append a new display card
    const displayCard = hero.listDisplay();
    characterDisplay.append(displayCard);
  };

  static removeHeroDisplayCard = (hero) => {
    const characterDisplay = $("#hero-list-wrapper")

    // Find an existing display card with the same data-hero-id
    const existingDisplayCard = characterDisplay.find(`.card[data-hero-id="${hero.id}"]`);

    // If a display card exists, remove it
    if (existingDisplayCard.length) {
      existingDisplayCard.remove();
    }
  }

  // ------------- static methods ------------------//

  // eventlistener
  highlightCard(event) {
    // get the card element and toggle the highlight class
    const card = event.currentTarget;
    console.log(card, "card here")
    if (card === Character.selectedCard) {
      return; // do nothing
    }

    if (Character.selectedCard) {
      Character.selectedCard.classList.remove("main-card");
      Character.selectedCard.classList.remove("highlight");
      Character.selectedCharacter.isSelected = false;
    }
    // highlight this card and set it as the selected card
    card.classList.add("highlight");
    card.classList.add("main-card");
    this.isSelected = true;
    Character.selectedCard = card;
    Character.selectedCharacter = this;
  }
  // this will update the health of the person getting attacked
  // this method will be put onto the attacker instance
  updateHealth (opponent) {
    opponent.health -= this.attack;
    if(this.characterCard){
      const healthText = opponent.characterCard.querySelector('.health');
      if(healthText){
        healthText.textContent = `Health ${opponent.health}`;
      }
    }
  } 

  // display the card in the herolistwrapper
  listDisplay() {
    const characterCard = document.createElement('div');
    characterCard.classList.add('card');
    characterCard.setAttribute('data-hero-id', this.id);
    characterCard.innerHTML = `
        <h3>${this.name}</h3>
        <p class="health">Health: ${this.health}</p>
        <p>Attack Strength: ${this.attack}</p>
        <p>Defense: ${this.defense}</p>
    `;
    characterCard.addEventListener('click', (event) => this.highlightCard(event));
    this.characterCard = characterCard;
    return characterCard;
  }

  //------------------- ACTION SCREEN METHODS -------------------//

  chargeDamageTaken(attacker, defender) {
    const damage = attacker.attack;
    // this displays the damage taken onto the screen
    const screen = $("#attack-screen");
    // message that will be displayed onto the action screen
    const message = `${attacker.name} has charged into ${defender.name} for ${damage} damage!`;
    // The ID on the html will be emptied each time before it displays the next attack message
    screen.empty().append(message);
  };


  //---------------------HEALTH METHODS BELOW-----------------------//
  isAlive() {
    return (this.health >= 0) ? true : false;
  }

  //---------------------ATTACK METHODS BELOW-----------------------//
  basic(opponent) {
    opponent.health -= this.attack;
  }
}