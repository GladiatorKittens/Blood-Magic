// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 960, //TODO - double and then set scale
    height: 540,
    pixelArt: true,

    physics: {
        default: "matter",
        matter: {
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
    scene: [StartScreen, Level_1]    //TODO - add to

}

var game = new Phaser.Game(config);

function upgrade_cost_calc(x) {
    //x is the level being upgraded to, y is cost
    //function is (x-10)(7/10y) = -1 * 8^2
    //function is a rectangular hyperbola
    y = Math.round(-640 / (7 * (x - 10)));
    return y;
}
function purchase_cost_calc(x) {
    //x is the troop number, y is the cost of the  troop
    //function is y = 9 x ^ (1/2)
    y = Math.round(Math.sqrt(x) * 9);
    return y;
}