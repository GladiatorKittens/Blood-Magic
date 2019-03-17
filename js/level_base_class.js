// JavaScript source code
class LevelBaseClass extends Phaser.Scene {
    constructor(id, blood, max_enemies) {
        super(id);
        this.id = id;
        this.max_enemies = max_enemies;
        this.summon_menu_open = false;
        this.game_started = false;
        this.touchData = {};
        this.x_array = [];
        this.y_array = [];
        this.tentacles = [];
        this.altar_x = this.altar_y = 0;
        this.blood = blood;
        this.blood_text = "blood: " + this.blood;
        this.health_text = "health";
        this.enemies_array = [];
    }
    preload() {
        this.load.spritesheet("Altar", "assets/art/Altar/altar_spritesheet.png", { frameWidth: 23, frameHeight: 23, margin: 1 });
        this.load.spritesheet("pause_play_button", "assets/art/Buttons/pause_play.png", {frameWidth: 32, frameHeight: 32, margin: 1});
        this.load.spritesheet("tentacle", "assets/art/Tentacle/tentacle_spritesheet.png", { frameWidth: 32, frameHeight: 32, margin: 1 });

        this.load.image("tilesheet", "assets/level design/tilesheet.png");
        this.load.tilemapTiledJSON(this.id, ("assets/level design/" + this.id + ".json"));

        this.load.image("confirm_button", "assets/art/Buttons/confirm.png");
        this.load.image('troop_button', 'assets/art/Buttons/troop_button.png');
        this.load.image("troop_background", "assets/art/UI/troop_menu_background.png");
    }
    create(scene, altar_health) {
        //do not spawn anything before the tilemap due to layering (too lazy to set depth)
        this.create_tilemap();
        this.load_path_values();
        this.enemy_path = create_path(this.x_array, this.y_array);

        this.menu_background = this.matter.add.image(800, 270, "troop_background")
        var summon_menu_button = new Button(920, 30, "troop_button", this.summoning_menu, this);
        summon_menu_button.image.setScale(2, 2);

        this.pause_button = new PausePlayButton(this, 50, 500); //as the pause button uses a spritesheet, it cant use the button class
        this.pause_button.sprite.setScale(2, 2);

        this.menu_background.setStatic(true);
        this.menu_background.setSensor(true);
        this.menu_background.setActive(false);
        this.menu_background.setVisible(false);
        this.menu_background.setScale(3, 2);

        this.altar = new Altar(scene, this.altar_x, this.altar_y, altar_health);
        this.altar.sprite.setScale(2, 2);
        this.altar.sprite.setStatic(true);
        this.altar.sprite.body.isStatic = true;

        this.blood_text = this.add.text(20, 20, "blood: ", { fontSize: "32px", fill: "#fff" });
        this.health_text = this.add.text(300, 20, "health: ", { fontSize: "32px", fill: "#fff" });
    }  
    create_tilemap() {
        this.map = this.make.tilemap({ key: this.id });
        this.tileset = this.map.addTilesetImage("tilesheet", "tilesheet", 32, 32, 0, 1); //this is not working right now
        this.map.createStaticLayer("bg", this.tileset, 0, 0);
    }
    load_path_values() {
        this.map.findObject("objects", function (object) {
            if (object.type === "path") {
                this.x_array.push(object.x);
                this.y_array.push(object.y);
            }
        }, this)
        this.map.findObject("objects", function (object) {
            if (object.type === "Altar") {
                this.altar_x = object.x;
                this.altar_y = object.y;
            }
        }, this)
    }
    update() {
        this.blood_text.setText("blood: " + this.blood);
        this.health_text.setText("health: " + this.altar.health);
        this.pause_button.update();
        for (var i = 0; i < this.tentacles.length; i++) { this.tentacles[i].update(); }
        for (var i = 0; i < this.enemies_array.length; i++) { this.enemies_array[i].update(this.enemy_path, this.altar); };
    }
    summoning_menu() {
        var page_num = 0;
        if (this.summon_menu_open === false) {
            this.summon_menu_open = true;
            this.menu_background.setActive(true);
            this.menu_background.setVisible(true);
            switch (page_num) {
                case 0:
                    this.menu_tentacle = this.matter.add.sprite(0, 0, "tentacle", 0).setBody({
                        type: "rectangle",
                        width: 32,
                        height: 32
                    }).setPosition(800, 350).setScale(3, 3);
                    this.menu_tentacle.label = "Menu Tentacle";
                    this.menu_tentacle.setInteractive();
                    this.menu_tentacle.setSensor(true);

                    this.input.setDraggable(this.menu_tentacle);
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
                        this.confirm_button = new SpawnerButton(object.x, object.y, "confirm_button", "summon_tentacle", this, pointer);//can i have this return a value?
                    }, this);

                    //need to delete the original menu sprite
                    break;
            }

        } else {
            this.summon_menu_open = false;
            this.menu_background.setActive(false);
            this.menu_background.setVisible(false);
            this.menu_tentacle.destroy(); // this doesn't work as the tentacle has not been defined in this scope. But it needs removing here...
            
        }
    }
    spawn_enemies() {
        if (this.enemies_array.length <= 20) {
            var new_enemy = new EnemyBaseClass(this.x_array[0], this.y_array[0], 10, 5, 2, this, "picture.png");
            console.log("called")
            this.enemies_array.push(new_enemy);
        }
    }
}
function summon_tentacle(object, scene) {
    this.confirm_button.image.destroy();
    this.menu_tentacle.destroy();
    //before summon, check if player has the correct amount of blood
    var summon_cost = purchase_cost_calc(this.tentacles.length + 1);
    if (summon_cost < this.blood) {
        this.blood -= summon_cost;
        var tentacle = new TentacleClass(3, object.x, object.y, this); //needs to take in x and y of the menu sprite.
        tentacle.sprite.setScale(2, 2);
        
        tentacle.hit_box = this.matter.add.circle(tentacle.x + 10, tentacle.y + 10, 32 * 2.5);
        tentacle.hit_box.isSensor = true;
        this.tentacles.push(tentacle);
    }
}