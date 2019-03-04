// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 960, //TODO - double and then set scale
    height: 540,
    pixelArt: true,

    physics: {
        default: "matter",
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            },
            debug: true,
            debugBodyColor: 0xffffff
        }
    },

    plugins: {
        scene: [{
            plugin: PhaserMatterCollisionPlugin,
            key: "matterCollision",
            mapping: "matterCollision"
        }]
    },
    scene: [StartScreen]    //TODO - change when using scene classes
    //    preload: preload,
    //    create: create,
    //    update: update
    //}

}

var game = new Phaser.Game(config);