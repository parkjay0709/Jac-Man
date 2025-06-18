import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    moveSpeed = 300; // time in milliseconds to move from one tile to another
    frameDuration = 0;
    accumulator = 0;
    target = { x: 0, y: 0 };

    constructor(scene, x, y)
    {
        super(scene, x, y, ASSETS.spritesheet.characters.key, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.mapOffset = scene.getMapOffset();
        this.target.x = this.mapOffset.x + (x * this.mapOffset.tileSize);
        this.target.y = this.mapOffset.y + (y * this.mapOffset.tileSize);
        this.setPosition(this.target.x, this.target.y);
        this.setCollideWorldBounds(true);
        this.setDepth(100);
        this.scene = scene;
        this.frameDuration = this.moveSpeed / this.mapOffset.tileSize;

        // set map boundaries
        this.mapLeft = this.mapOffset.x - (this.mapOffset.tileSize * 0.5);
        this.mapRight = this.mapOffset.x + (this.mapOffset.width * this.mapOffset.tileSize) - (this.mapOffset.tileSize * 0.5);
    }

    update (delta)
    {
        this.accumulator += delta;

        while (this.accumulator > this.frameDuration)
        {
            this.accumulator -= this.frameDuration;
            this.checkInput();
            this.move();
        }
    }

    checkInput ()
    {
        // check if player is at target position
        if (this.target.x === this.x && this.target.y === this.y)
        {
            const cursors = this.scene.cursors; // get cursors object from Game scene
            const leftKey = cursors.left.isDown;
            const rightKey = cursors.right.isDown;
            const upKey = cursors.up.isDown;
            const downKey = cursors.down.isDown;
            const spaceKey = cursors.space.isDown;

            const moveDirection = { x: 0, y: 0 }; // default move direction

            if (leftKey) moveDirection.x--;
            else if (rightKey) moveDirection.x++;
            else if (upKey) moveDirection.y--;
            else if (downKey) moveDirection.y++;

            // set next tile coordinates to move towards
            const nextPosition = {
                x: this.x + (moveDirection.x * this.mapOffset.tileSize),
                y: this.y + (moveDirection.y * this.mapOffset.tileSize)
            };

            // check if next tile to move towards is walkable
            const isWall = this.scene.getTileAt(nextPosition.x, nextPosition.y);
            if (isWall === -1)
            {
                // set target position to move towards
                this.target.x = nextPosition.x;
                this.target.y = nextPosition.y;
            }
        }
    }

    // move player towards target position
    move ()
    {
        if (this.x < this.target.x) {
            this.x ++;
            this.anims.play(ANIMATION.player.right.key, true);
        }
        else if (this.x > this.target.x) {
            this.x --;
            this.anims.play(ANIMATION.player.left.key, true);
        }
        if (this.y < this.target.y) {
            this.y ++;
            this.anims.play(ANIMATION.player.down.key, true);
        }
        else if (this.y > this.target.y) {
            this.y --;
            this.anims.play(ANIMATION.player.up.key, true);
        }

        // check if player has moved off screen
        if (this.x < this.mapLeft)
        {
            this.x = this.mapRight;
            this.target.x = this.mapRight - (this.mapOffset.tileSize * 0.5);
        }
        else if (this.x > this.mapRight)
        {
            this.x = this.mapLeft;
            this.target.x = this.mapLeft + (this.mapOffset.tileSize * 0.5);
        }
    }

    hit ()
    {
        this.destroy();
    }
}