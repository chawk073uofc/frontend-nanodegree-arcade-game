const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const COL_WIDTH = 101;
const ROW_HEIGHT = 83;
const PLAYER_ORIGIN_COL = 2;
const PLAYER_ORIGIN_ROW = 5;

//Used for collision detection
const ENEMY_CENTER_OFFSET_X = 50;
const ENEMY_CENTER_OFFSET_Y = 110;
const PLAYER_CENTER_OFFSET_X = 50;
const PLAYER_CENTER_OFFSET_Y = 100;
const MIN_DISTANCE = 80;

/**
 * Represents mobile elements of the game (player and enemies).
 */
class Entity {
    constructor(sprite, row) {
        this.sprite = sprite;
        this.row = row;
        this.x;
        this.y = this.row * ROW_HEIGHT;
        this.center = [0,0];//[x_px,y_px]
    }

    /**
     * Draw the entity on the screen.
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

/**
 * The player controlled by the user with the keyboard.
 */
class Player extends Entity {
    constructor() {
        super('images/lucky.png', PLAYER_ORIGIN_ROW);
        this.col = PLAYER_ORIGIN_COL;
        this.x = this.col * COL_WIDTH;
    }

    /**
     * Update the player's position. Movements multiplied by the dt parameter
     * to ensure the game runs at the same speed on all computers.
     * @param dt
     */
    update(dt) {
        this.x = this.col * COL_WIDTH;
        this.y = this.row * ROW_HEIGHT;
        this.center = [this.x + PLAYER_CENTER_OFFSET_X, this.y + PLAYER_CENTER_OFFSET_Y];

    };

    /**
     * Handle input when user presses arrow key to move player.
     */
    handleInput(keyPressed) {
        try {
            switch (keyPressed) {
                case 'down':
                    if (this.row < 5)
                        this.row++;
                    else
                        throw new Error("Out of bounds");
                    break;
                case 'right':
                    if (this.col < 4)
                        this.col++;
                    else
                        throw new Error("Out of bounds");
                    break;
                case 'up':
                    if (this.row > 0)
                        this.row--;
                    else
                        throw new Error("Out of bounds");
                    break;
                case 'left':
                    if (this.col > 0)
                        this.col--;
                    else
                        throw new Error("Out of bounds");
                    break;
                default:
                    throw new Error("Invalid move");
                    break;
            }

        }
        catch (e) {
            console.error(e);
        }

    }
}
/**
 * Enemies the player must avoid.
 */
class Enemy extends Entity{
    constructor(row, speed) {
        super('images/kitty.png', row);
        this.x = 0;
        this.speed = speed;
        this.SLOW_DELTA_PX = 20;
        this.MEDIUM_DELTA_PX = 50;
        this.FAST_DELTA_PX = 100;
      }

    /**
     * Update the enemy's position. Movements multiplied by the dt parameter
     * to ensure the game runs at the same speed on all computers.
     * @param dt
     */
    update(dt) {
        //check if enemy has reached the end of the canvas
        if(this.x > CANVAS_WIDTH)
            this.x = 0;
        //todo set rand row
        switch (this.speed){
            case 'slow':
                this.x += (this.SLOW_DELTA_PX * dt);
                break;
            case 'medium':
                this.x += (this.MEDIUM_DELTA_PX * dt);
                break;
            case 'fast':
                this.x += (this.FAST_DELTA_PX * dt);
                break;
        }
        this.center = [this.x + ENEMY_CENTER_OFFSET_X, this.y + ENEMY_CENTER_OFFSET_Y];
    };

    /**
     * Check if the the enemy is touching the player. todo
     */
    hasHitPlayer() {
        const distance = Math.hypot(this.x - player.x, this.y - player.y);
        return distance < MIN_DISTANCE;
    }
}

/**
 *  This listens for key presses and sends the keys to the Player.handleInput method.
 */
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Check if the player character has reached the water and return him to the starting position if so.
 */
function checkWinCondition() {
    if(player.y === 0) {
        reset();
    }
}

/**
 * Check for collisions between enemies and player.
 */
function checkCollisions() {
    for(let enemy of allEnemies) {
        if(enemy.hasHitPlayer())
            reset();
    }
}

/**
 * Reset player position after win or collision.
 */
function reset() {
    player = new Player();
}

let player = new Player();
let allEnemies = [new Enemy(1, 'slow'),new Enemy(2,'medium'), new Enemy(3,'fast')];