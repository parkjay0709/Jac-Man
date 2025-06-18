import ASSETS from './assets.js';

export default {
    player:
    {
        left: {
            key: 'player-left',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 0, 4, 8 ] },
            repeat: 0
        },
        down:
        {
            key: 'player-down',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 1, 5, 9 ] },
            repeat: 0
        },
        up:
        {
            key: 'player-up',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 2, 6, 10 ] },
            repeat: 0
        },
        right:
        {
            key: 'player-right',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 3, 7, 11 ] },
            repeat: 0
        },
    },
    enemy: {
        left:
        {
            key: 'enemy-left',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 48, 52, 56 ] },
            repeat: 0
        },
        down:
        {
            key: 'enemy-down',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 49, 53, 57 ] },
            repeat: 0
        },
        up:
        {
            key: 'enemy-up',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 50, 54, 58 ] },
            repeat: 0
        },
        right:
        {
            key: 'enemy-right',
            texture: ASSETS.spritesheet.characters.key,
            frameRate: 10,
            config: { frames: [ 51, 55, 59 ] },
            repeat: 0
        },
    }
};