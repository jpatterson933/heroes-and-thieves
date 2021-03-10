console.log(process.argv)

class Character {
    constructor (name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    printHealth() {
        console.log(`${this.name} Health: ${this.health}`)
    }

    isAlive () {
        if (this.health >= 0) {
            return true;
        }   
        return false;
    }

    charge (opponent) {
        console.log(`${this.name} charges ${opponent.name}`)
        opponent.health -= this.attack;
    }

    healthRegen () {
        this.health += 5000;
    }

    powerSlam (opponent) {
        console.log(`${this.name} POWER SLAMS ${opponent.name}`)
        opponent.health -=1000
    }

    
}
//ability to recover health slowly                                //health, attack, defense
const jackStrom = new Character ('JackStrom', 1000, 250, 75);
const nebula = new Character ('nubula', 1000, 50, 300);

const grant = new Character ('GRANT', 1000, 160, 109)
const ironGiant = new Character('Baby Iron Giant', 10000, 25, 0)


jackStrom.printHealth()
nebula.printHealth()

let jackStromTurn = true;



const turnInterval = setInterval(() => {
    // If either character is not alive, end the game
    if (!jackStrom.isAlive() || !nebula.isAlive()) {
      clearInterval(turnInterval);
      console.log('NEXT FIGHT!');
    } else if (jackStromTurn) {
      jackStrom.charge(nebula);
      nebula.printHealth();
    } else {
      nebula.charge(jackStrom);
      jackStrom.printHealth();
    }
  
    // Switch turns
    jackStromTurn = !jackStromTurn;
    
}, 500);

//const for nebula to generate health but she never does// maybe change this to jackstrom a small increment over time
const healthInterval = setInterval(() => {
    if (!jackStrom.isAlive() || !nebula.isAlive()) {
        clearInterval(healthInterval);
    } 
    nebula.healthRegen();
    
}, 10000);



  //we know nebula is going to lose so we set up the next fight and rig the system

  grant.printHealth()

  const nextTurnInterval = setInterval(() => {
      if (!nebula.isAlive()) {
          clearInterval(nextTurnInterval);

          const turnInterval = setInterval(() => {
            // If either character is not alive, end the game
            if (!jackStrom.isAlive() || !grant.isAlive()) {
              clearInterval(turnInterval);
              console.log('BOSS FIGHT!');
              jackStrom.printHealth()
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

const levelOneBossFight = setInterval(() => {
    if(!grant.isAlive()) {
        clearInterval(levelOneBossFight);

        const turnInterval = setInterval(() => {
            if (!jackStrom.isAlive() || !ironGiant.isAlive()) {
                clearInterval(turnInterval);
                console.log(`Game Over ${jackStrom.name} lost!`);
                jackStrom.printHealth()
              } else if (jackStromTurn) {
                jackStrom.powerSlam(ironGiant);
                ironGiant.printHealth();
              } else {
                ironGiant.charge(jackStrom);
                jackStrom.printHealth();
              }
            
              // Switch turns
              jackStromTurn = !jackStromTurn;
            
        }, 500);
    }
    
},);

  