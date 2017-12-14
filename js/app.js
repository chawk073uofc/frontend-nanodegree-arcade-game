const PLAYER_ORIGIN_X = 2;
const PLAYER_ORIGIN_Y = 5;

class Entity {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    /**
     * Draw the entity on the screen.
     *
     */
    render() {
        console.log('render');
        ctx.drawImage(Resources.get(this.sprite), this.x * COL_WIDTH, this.y * ROW_WIDTH);
    };
}
/**
 * The player controlled by the user with the keyboard.
 */
class Player extends Entity{
    constructor() {
        super('images/char-boy.png', PLAYER_ORIGIN_X, PLAYER_ORIGIN_Y);
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
     * Handle input when user presses arrow key to move player.
     */
    handleInput(keyPressed){

    }
}
/**
 * Enemies our player must avoid.
 */
class Enemy extends Entity{
    constructor(x, y) {
        super('images/enemy-bug.png', x, y);
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

let player = new Player();
let allEnemies = [new Enemy(),new Enemy(), new Enemy()];


/**
 *  This listens for key presses and sends the keys to the Player.handleInput method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});