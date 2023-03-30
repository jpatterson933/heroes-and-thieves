// --------------------------- //id, name, health, attack, defense
const jackStrom = new Character(1, 'JackStrom', 1000, 250, 75);
const nebula = new Character(2, 'Nebula', 1000, 50, 300);
const grant = new Character(3, 'Grant', 1500, 60, 120);




// top banner that holds are heros, we use the appendHeroDisplayCard to show heros
// displays our characters - first paramater is which character second parameter is where to append
Character.appendHeroDisplayCard(jackStrom);
Character.appendHeroDisplayCard(nebula)



const basicAttack = (userAttacker, computerDefender) => {

  // grab our attack button
  const attackButton = document.getElementById("attack");
  // our click set to false 
  let _clicked = false;
  // we should add multiple buttons for different attacks - think pokemonesque
  // function for heroes attack - OUR CARD DISPLAY FUNTIONS ARE IN HERE AS WELL AS 
  attackButton.addEventListener("click", function () {
    // if statement that only allows one appendage on click
    if (!_clicked) {
      _clicked = true;
    };
    console.log(computerDefender.isAlive())

    if (computerDefender.health <= 0) {
      // this works if no interval trigger
      Character.removeHeroDisplayCard(computerDefender)
      // Character.appendHeroDisplayCard(grant)

    } else if (userAttacker.isAlive()) {
      userAttacker.updateHealth(computerDefender)

      // userAttacker.basic(computerDefender);
      // console.log(test, "test")
      // this is where we are printing out on screen the amount of damage taken by the attacker
      computerDefender.chargeDamageTaken(userAttacker, computerDefender);
      // this is the amount of health left by the defender
      Character.appendHeroDisplayCard(computerDefender)
    }

  });

}
// global if -> continue game if main hero is still alive
if (jackStrom.isAlive()) {
  //defines jackstrom's turn - ultimately this is the players turn to click
  let jackStromTurn = true;
  //main attack button function

  basicAttack(jackStrom, nebula)


}