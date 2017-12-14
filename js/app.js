const PLAYER_ORIGIN = 0;
/**
 * Enemies our player must avoid.
 */
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.location;
    }

    /**
     * Update the enemy's position. Movements multiplied by the dt parameter
     * to ensure the game runs at the same speed on all computers.
     * @param dt
     */
    update(dt) {
        console.log('update');

    };

    /**
     * Draw the enemy on the screen.
     */
    render() {
        console.log('render');
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
 * The player controlled by the user with the keyboard.
 */
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.location = PLAYER_ORIGIN;
    }

    /**
     * Update the player's position. Movements multiplied by the dt parameter
     * to ensure the game runs at the same speed on all computers.
     * @param dt
     */
    update(dt) {
        console.log('update');
    };

    /**
     * Draw the player on the screen.
     */
    render() {
        console.log('render');
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    /**
     * Handle input when user presses arrow key to move player.
     */
    handleInput(keyPressed){

    }
}

let player = new Player();
let allEnemies = [new Enemy(),new Enemy(), new Enemy()];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
