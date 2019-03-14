// JavaScript source code
class LevelBaseClass extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.summon_menu_open = false;
        this.game_started = false;
        this.touchData = {};
        this.x_array = [];
        this.y_array = [];
        this.tentacles = [];
    }
    preload() {
        this.load.spritesheet("Altar", "assets/art/Altar/altar_spritesheet.png", { frameWidth: 23, frameHeight: 23, margin: 1 });
        this.load.spritesheet("pause_play_button", "assets/art/Buttons/pause_play.png", {frameWidth: 32, frameHeight: 32, margin: 1});
        this.load.spritesheet("tentacle", "assets/art/Tentacle/tentacle_spritesheet.png", { frameWidth: 32, frameHeight: 32, margin: 1 });

        this.load.image("confirm_button", "assets/art/Buttons/confirm.png");
        this.load.image('troop_button', 'assets/art/Buttons/troop_button.png');
        this.load.image("troop_background", "assets/art/UI/troop_menu_background.png");
    }
    create(scene, altar_x, altar_y, altar_health) {
        this.menu_background = this.matter.add.image(800, 270, "troop_background")
        var summon_menu_button = new Button(920, 30, "troop_button", this.summoning_menu, this);
        summon_menu_button.image.setScale(2, 2);
        var pause_button = new PausePlayButton(this, 50, 500); //as the puase button uses a spritesheet, it cant use the button class
        pause_button.sprite.setScale(2, 2);
        this.menu_background.setStatic(true);
        this.menu_background.setSensor(true);
        this.menu_background.setActive(false);
        this.menu_background.setVisible(false);
        this.menu_background.setScale(3, 2);
        var altar = new Altar(scene, altar_x, altar_y, altar_health);
        altar.sprite.setScale(2, 2);
        altar.sprite.setStatic(true);
        altar.sprite.body.isStatic = true;
        //this.create_tilemap();
        //this.load_path_values();
        //create_path(x_array, y_array);
       
    }  
    create_tilemap() {
        this.map = this.make.tilemap({ key: this.id });
        this.tileset = this.map.addTilesetImage("tilesheet", "tilesheet");
        this.map.createStaticLayer("bg", tileset, 0, 0);
    }
    load_path_values() {

        this.map.findObject("obj", function (object) {
            if (object.type === "path") {
                x_array.append(object.x);
                y_array.append(object.y);
            }
        })
    }
    update() {
        
    }
    summoning_menu() {
        var page_num = 0;
        if (this.summon_menu_open === false) {
            this.summon_menu_open = true;
            this.menu_background.setActive(true);
            this.menu_background.setVisible(true);
            switch (page_num) {
                case 0:
                    var menu_tentacle = this.matter.add.sprite(0, 0, "tentacle", 0).setBody({
                        type: "rectangle",
                        width: 32,
                        height: 32
                    }).setPosition(800, 350).setScale(3, 3);
                    menu_tentacle.label = "Menu Tentacle";
                    menu_tentacle.setInteractive();
                    menu_tentacle.setSensor(true);

                    this.input.setDraggable(menu_tentacle);
                    this.input.on("dragstart", function (pointer) {
                        this.menu_background.setActive(false);        
                        this.menu_background.setVisible(false);
                    }, this);
                    this.input.on("drag", function (pointer, object, drag_x, drag_y) {
                        object.x = drag_x;
                        object.y = drag_y;
                    });
                    this.input.on("dragend", function (pointer, object) {
                        //here is where the confirmation of placement goes
                        var confirm_button = new SpawnerButton(400, 400, "confirm_button", summon_tentacle, this, pointer);//can i have this return a value?
                        menu_tentacle.destroy(); // we don't want this to destroy until after the player has hit the confirm button. This destroys it too soon
                    }, this);

                    //need to delete the original menu sprite
                    break;
            }

        } else {
            this.summon_menu_open = false;
            this.menu_background.setActive(false);
            this.menu_background.setVisible(false);
            //menu_tentacle.destroy(); // this doesn't work as the tentacle has not been defined in this scope. But it needs removing here...
        }
    }
}
function summon_tentacle(object, scene) {
    //the monster class is saying scene is undefined, but it's defined heres
    var tentacle = new TentacleClass(3, object.x, object.y, scene); //needs to take in x and y of the menu sprite.
    //tentacles.append(tentacle);

}