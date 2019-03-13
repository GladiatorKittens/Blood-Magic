// JavaScript source code
class LevelBaseClass extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.summon_menu_open = false;
        this.game_started = false;
        this.touchData = {};
        
    }
    preload() {
        this.load.spritesheet("Altar", "assets/art/Altar/altar_spritesheet.png", { frameWidth: 23, frameHeight: 23, margin: 1 });
        this.load.spritesheet("pause_play_button", "assets/art/Buttons/pause_play.png", {frameWidth: 32, frameHeight: 32, margin: 1});
        this.load.spritesheet("tentacle", "assets/art/Tentacle/tentacle_spritesheet.png", { frameWidth: 32, frameHeight: 32, margin: 1 });

        this.load.image('troop_button', 'assets/art/Buttons/troop_button.png');
        this.load.image("troop_background", "assets/art/UI/troop_menu_background.png");
    }
    create(scene, altar_x, altar_y, altar_health, x_array, y_array) {
        var collision_group = this.matter.world.nextCategory();
        this.menu_background = this.matter.add.image(800, 270, "troop_background")
        var summon_menu_button = new Button(920, 30, "troop_button", this.summoning_menu, this);
        var pause_button = new PausePlayButton(this, 70, 800); //as the puase button uses a spritesheet, it cant use the button class

        this.cat1 = this.matter.world.nextCategory();
        this.menu_background.setCollisionCategory(this.cat1);

        this.menu_background.setActive(false);
        this.menu_background.setVisible(false);
        this.menu_background.setScale(3, 2);
        var altar = new Altar(scene, altar_x, altar_y, altar_health);
        altar.sprite.setScale(2, 2);
        create_path(x_array, y_array);
        var tentacles = [];
    }
    update() {
    }
    summoning_menu() {
        var page_num = 0;
        var cat1 = this.cat1;
        if (this.summon_menu_open === false) {
            this.summon_menu_open = true;
            //this.menu_background.setActive(true);
            this.menu_background.setVisible(true);
            switch (page_num) {
                case 0:
                    var menu_tentacle = this.matter.add.sprite(0, 0, "tentacle", 0).setBody({
                        type: "rectangle",
                        width: 32,
                        height: 32
                    }).setPosition(600, 350).setScale(3,3);
                    menu_tentacle.label = "Menu Tentacle";
                    menu_tentacle.setInteractive();
                    menu_tentacle.setCollisionCategory(cat1);
                    menu_tentacle.setInteractive();
                    menu_tentacle.on("pointerdown", function (pointer) {
                        menu_tentacle.body.x = this.touchData.startX = pointer.x;
                        menu_tentacle.body.y = this.touchData.startY = pointer.y;         
                    }, this);
                    menu_tentacle.on("pointerup", function (pointer) {this.touchData.endX = pointer.x; this.touchData.endY = pointer.y; summon_tentacle(this)}, this);
            }
            //window = this.add.zone(x, y, 160, 530).setInteractive().setOrigin(0);//TODO - update numbers

        } else {
            this.summon_menu_open = false;
            this.menu_background.setActive(false);
            this.menu_background.setVisible(false);
        }
    }
}
function summon_tentacle(scene) {
    var tentacle = new MonsterBaseClass(3, scene.touchData.endX, scene.touchData.endY);

    tentacles.append(tentacle);
}