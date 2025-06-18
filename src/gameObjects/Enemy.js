import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite
{
    moveSpeed = 300; // time in milliseconds to move from one tile to another
    frameDuration = 0;
    accumulator = 0;
    direction = { x: 0, y: 0 };
    target = { x: 0, y: 0 };
    targetPrev = { x: 0, y: 0 };

    constructor(scene, x, y)
    {
        super(scene, x, y, ASSETS.spritesheet.characters.key, 49);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.mapOffset = scene.getMapOffset();
        this.target.x = this.mapOffset.x + (x * this.mapOffset.tileSize);
        this.target.y = this.mapOffset.y + (y * this.mapOffset.tileSize);
        this.targetPrev.x = this.target.x;
        this.targetPrev.y = this.target.y;
        this.setPosition(this.target.x, this.target.y - this.mapOffset.tileSize);
        this.setCollideWorldBounds(true);
        this.setDepth(100);
        this.scene = scene;
        this.direction.x = Math.round(Math.random()) === 0 ? -1 : 1;
        this.frameDuration = this.moveSpeed / this.mapOffset.tileSize;

        this.mapLeft = this.mapOffset.x - (this.mapOffset.tileSize * 0.5);
        this.mapRight = this.mapOffset.x + (this.mapOffset.width * this.mapOffset.tileSize) - (this.mapOffset.tileSize * 0.5);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.accumulator += delta;

        while (this.accumulator > this.frameDuration)
        {
            this.accumulator -= this.frameDuration;
            this.checkPosition();
            this.move();
        }
    }

    checkPosition ()
    {
        // check if enemy is at target position
        if (this.target.x === this.x && this.target.y === this.y)
        {
            const left = this.x - this.mapOffset.tileSize;
            const right = this.x + this.mapOffset.tileSize;
            const top = this.y - this.mapOffset.tileSize;
            const bottom = this.y + this.mapOffset.tileSize;

            // check left
            const leftPosition = { x: left, y: this.y };
            const tileLeft = this.scene.getTileAt(leftPosition.x, leftPosition.y);

            // check right
            const rightPosition = { x: right, y: this.y };
            const tileRight = this.scene.getTileAt(rightPosition.x, rightPosition.y);

            // check top
            const topPosition = { x: this.x, y: top };
            const tileTop = this.scene.getTileAt(topPosition.x, topPosition.y);

            // check bottom
            const bottomPosition = { x: this.x, y: bottom };
            const tileBottom = this.scene.getTileAt(bottomPosition.x, bottomPosition.y);

            const nextTargets = []; // list of possible next targets

            // moving left
            if (this.direction.x === -1)
            {
                if (tileLeft === -1) nextTargets.push(leftPosition, leftPosition, leftPosition, leftPosition);
                if (tileTop === -1) nextTargets.push(topPosition);
                if (tileBottom === -1) nextTargets.push(bottomPosition);
            }
            // moving right
            else if (this.direction.x === 1)
            {
                if (tileRight === -1) nextTargets.push(rightPosition, rightPosition, rightPosition, rightPosition);
                if (tileTop === -1) nextTargets.push(topPosition);
                if (tileBottom === -1) nextTargets.push(bottomPosition);
            }
            // moving up
            else if (this.direction.y === -1)
            {
                if (tileTop === -1) nextTargets.push(topPosition, topPosition, topPosition, topPosition);
                if (tileLeft === -1) nextTargets.push(leftPosition);
                if (tileRight === -1) nextTargets.push(rightPosition);
            }
            // moving down
            else if (this.direction.y === 1)
            {
                if (tileBottom === -1) nextTargets.push(bottomPosition, bottomPosition, bottomPosition, bottomPosition);
                if (tileLeft === -1) nextTargets.push(leftPosition);
                if (tileRight === -1) nextTargets.push(rightPosition);
            }

            this.changeDirection(nextTargets);
        }
    }

    changeDirection (nextTargets)
    {
        const randomDirection = Phaser.Math.RND.weightedPick(nextTargets); // prioritize moving in the same direction
        this.target.x = randomDirection.x;
        this.target.y = randomDirection.y;

        if (this.x < this.target.x) this.direction.x = 1;
        else if (this.x > this.target.x) this.direction.x = -1;
        else this.direction.x = 0;
        if (this.y < this.target.y) this.direction.y = 1;
        else if (this.y > this.target.y) this.direction.y = -1;
        else this.direction.y = 0;
    }

    // move enemy towards target position
    move ()
    {
        if (this.x < this.target.x)
        {
            this.x++;
            this.anims.play(ANIMATION.enemy.right.key, true);
        }
        else if (this.x > this.target.x)
        {
            this.x--;
            this.anims.play(ANIMATION.enemy.left.key, true);
        }
        if (this.y < this.target.y)
        {
            this.y++;
            this.anims.play(ANIMATION.enemy.down.key, true);
        }
        else if (this.y > this.target.y)
        {
            this.y--;
            this.anims.play(ANIMATION.enemy.up.key, true);
        }

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
}