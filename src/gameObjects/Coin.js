import ASSETS from '../assets.js';

export default class Coin extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, ASSETS.spritesheet.tiles.key, 93);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.mapOffset = scene.getMapOffset();
        this.setPosition(this.mapOffset.x + (x * this.mapOffset.tileSize), this.mapOffset.y + (y * this.mapOffset.tileSize));
        this.setDepth(90);
        this.scene = scene;
    }

    collect ()
    {
        this.scene.updateScore(10);
        this.scene.removeItem(this);
    }
}