export default {
    // 'audio': {
    //     score: {
    //         key: 'sound',
    //         args: ['assets/sound.mp3', 'assets/sound.m4a', 'assets/sound.ogg']
    //     },
    // },
    // 'image': {
    //     spikes: {
    //         key: 'spikes',
    //         args: ['assets/spikes.png']
    //     },
    // },
    'spritesheet': {
        tiles: {
            key: 'tiles',
            args: ['assets/tiles.png', {
                frameWidth: 32,
                frameHeight: 32
            }]
        },
        characters: {
            key: 'characters',
            args: ['assets/characters.png', {
                frameWidth: 32,
                frameHeight: 32
            }]
        },
    },
    'tilemapTiledJSON': {
        map: {
            key: 'map',
            args: ['assets/tilemap.json']
        },
    }
};