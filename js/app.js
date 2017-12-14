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
    };

    /**
     * Handle input when user presses arrow key to move player.
     */
    handleInput(keyPressed){
        console.log(keyPressed);//debug
        try {
            switch (keyPressed) {
                case 'down':
                    if (this.y < 5)
                        this.y++;
                    else
                        throw new Error("Out of bounds");
                    break;
                case 'right':
                    if (this.x < 4)
                        this.x++;
                    else
                        throw new Error("Out of bounds");
                    break;
                case 'up':
                    if (this.y > 0)
                        this.y--;
                    else
                        throw new Error("Out of bounds");
                    break;
                case 'left':
                    if (this.x > 0)
                        this.x--;
                    else
                        throw new Error("Out of bounds");
                    break;
                default:
                        throw new Error("Invalid move");
                    break;
            }
        }
        catch(e) {
            console.error(e);
        }
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

    };
}

let player = new Player();
let allEnemies = [new Enemy(0,1),new Enemy(0,2), new Enemy(0,3)];


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