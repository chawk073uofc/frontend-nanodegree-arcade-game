const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const COL_WIDTH = 101;
const ROW_HEIGHT = 83;
const PLAYER_ORIGIN_COL = 2;
const PLAYER_ORIGIN_ROW = 5;
const BUG_CENTER_OFFSET_X = 50;
const BUG_CENTER_OFFSET_Y = 110;
const BOY_CENTER_OFFSET_X = 50;
const BOY_CENTER_OFFSET_Y = 100;



class Entity {
    constructor(sprite, row) {
        this.sprite = sprite;
        this.row = row;
        this.x = 0;
        this.y = this.row * ROW_HEIGHT;
        this.center = [0,0];//x,y
        //this.center = 0;
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
        super('images/char-boy.png', PLAYER_ORIGIN_ROW);
        this.col = PLAYER_ORIGIN_COL;

    }

    /**
     * Update the player's position. Movements multiplied by the dt parameter
     * to ensure the game runs at the same speed on all computers.
     * @param dt
     */
    update(dt) {
        this.x = this.col * COL_WIDTH;
        this.y = this.row * ROW_HEIGHT;
        this.center = [this.x + BOY_CENTER_OFFSET_X, this.y + BOY_CENTER_OFFSET_Y];

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
 * Enemies our player must avoid.
 */
class Enemy extends Entity{
    constructor(row, speed) {
        super('images/enemy-bug.png', row);
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
        this.center = [this.x + BUG_CENTER_OFFSET_X, this.y + BUG_CENTER_OFFSET_Y];
        //console.log(this.center);
    };

    /**
     * Check if the the enemy is touching the player. todo
     */
    hasHitPlayer() {

    }
}

let player = new Player();
let allEnemies = [new Enemy(1, 'slow'),new Enemy(2,'medium'), new Enemy(3,'fast')];


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
    let enemy;
    for(enemy of allEnemies) {
        if(enemy.hasHitPlayer(enemy, player))
            player = new Player();
    }
}

/* This function does nothing but it could have been a good place to
 * handle game reset states - maybe a new game menu or a game over screen
 * those sorts of things. It's only called once by the init() method.
 */
function reset() {
    player = new Player();
}