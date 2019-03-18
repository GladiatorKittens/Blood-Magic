// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 960, //TODO - double and then set scale
    height: 544,
    pixelArt: true,
    backgroundColor: "#3C0344",
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
    scene: [StartScreen, Level_1, pause_scene]    //TODO - add to

}

var game = new Phaser.Game(config);
var blood = 150;    //starting amount of currency the player has to spend

function upgrade_cost_calc(x) {
    //x is the level being upgraded to, y is cost
    //function is (x-10)(7/10y) = -1 * 8^2
    //function is a rectangular hyperbola - has an asymtope at 10
    if (x > 10) {
        return 200;
    }else if (x == 10) {
        y = 100;
    } else {
        y = Math.round(-640 / (7 * (x - 10)));
    }

    return y;
}
function purchase_cost_calc(x) {
    //x is the troop number, y is the cost of the  troop
    //function is y = 9 x ^ (1/2)
    y = Math.round(Math.sqrt(x) * 9);
    return y;
}
function create_path(x_array, y_array) { //x and y are arrays of values
    var path = [];
    var x = 1 / 960;
    for (var i = 0; i <= 1; i += x) {
        var px = Phaser.Math.Interpolation.CatmullRom(x_array, i);
        var py = Phaser.Math.Interpolation.CatmullRom(y_array, i);
        path.push({ x: px, y: py });
    }
    console.log(path);
    return path;

}
function create_anims() {
    const anims = this.anims;
    anims.create({
        key: "idle",
        frames: anims.generateFrameNumbers("tentacle", { start: 0, end: 2 }),
        frameRate: 2,
        yoyo: true,
        repeat: -1
    });
    anims.create({
        key: "full",
        frames: anims.generateFrameNumbers("Altar", { frames: [0] })
    });
    anims.create({
        key: "nearly_full",
        frames: anims.generateFrameNumbers("Altar", { frames: [1] })
    });
    anims.create({
        key: "half_full",
        frames: anims.generateFrameNumbers("Altar", { frames: [2] })
    });
    anims.create({
        key: "nearly_empty",
        frames: anims.generateFrameNumbers("Altar", { frames: [3] })
    });
    anims.create({
        key: "empty",
        frames: anims.generateFrameNumbers("Altar", { frames: [4] })
    });
    anims.create({
        key: "tentacle_attack",
        frames: anims.generateFrameNumbers("tentacle", { start: 2, end: 6 }),
        frameRate: 10,
        yoyo: true
    });
    console.log(this.anims)
}
