// Step 1: Define the Player class
class Player {
    constructor(health, strength, attack) {
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    receiveDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

    isAlive() {
        return this.health > 0;
    }

    rollDie() {
        // Step 3: Implement rollDie method to simulate dice roll
        return Math.floor(Math.random() * 6) + 1;
    }
}

// Step 2: Define the MagicalArena class
class MagicalArena {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    fight() {
        let attacker = this.player1.health < this.player2.health ? this.player1 : this.player2;
        let defender = attacker === this.player1 ? this.player2 : this.player1;

        // Step 4: Implement the fight logic
        while (this.player1.isAlive() && this.player2.isAlive()) {
            const attackRoll = attacker.rollDie();
            const defenseRoll = defender.rollDie();

            const attackDamage = attackRoll * attacker.attack;
            const defenseDamage = defenseRoll * defender.strength;

            const damageDealt = Math.max(0, attackDamage - defenseDamage);
            defender.receiveDamage(damageDealt);

            console.log(`${attacker.constructor.name} attacks with a roll of ${attackRoll} causing ${attackDamage} damage.`);
            console.log(`${defender.constructor.name} defends with a roll of ${defenseRoll} blocking ${defenseDamage} damage.`);
            console.log(`${defender.constructor.name}'s health reduced to ${defender.health}\n`);

            // Step 5: Switch roles for the next turn
            [attacker, defender] = [defender, attacker];
        }

        console.log("Game Over!");
        console.log(this.player1.isAlive() ? `${this.player1.constructor.name} wins!` : `${this.player2.constructor.name} wins!`);
    }
}

// Step 6: Instantiate players and arena and start the fight
const playerA = new Player(50, 5, 10);
const playerB = new Player(100, 10, 5);

const arena = new MagicalArena(playerA, playerB);
arena.fight();
