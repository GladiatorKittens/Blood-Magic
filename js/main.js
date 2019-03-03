// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 64 * 8, //TODO - set up as neccessary
    height: 64 * 12,
    pixelArt: true,

    physics: {
        default: "matter",
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    plugins: {
        scene: [{
            plugin: PhaserMatterCollisionPlugin,
            key: "matterCollision",
            mapping: "matterCollision"
        }]
    },
    scene: {    //TODO - change when using scene classes
        preload: preload,
        create: create,
        update: update
    }

}

var game = new Phaser.Game(config);