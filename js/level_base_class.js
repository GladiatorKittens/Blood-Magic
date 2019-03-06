// JavaScript source code
class LevelBaseClass extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.summon_menu_open = false;
        
    }
    preload() {
        this.load.spritesheet("Altar", "assets/art/Altar/altar_spritesheet.png", { frameWidth: 23, frameHeight: 23, margin: 1 });
    }
    create(scene, altar_x, altar_y, altar_health) {
        var collision_group = this.matter.world.nextCategory();
        var summon_menu_button = new Button(900, 20, "placeholder.png", this.summoning_menu, this);
        this.menu_background = this.matter.add.image(700, 20, "placeholder.png");
        this.menu_background.setActive(false);
        this.menu_background.setVisible(false);
        var Altar = new Altar(scene, altar_x, altar_y, altar_health);
    }
    update() {
    }
    summoning_menu() {
        //var x = 700;
        //var y = 20;
        if (this.summon_menu_open === false) {
            this.summon_menu_open = true;
            this.menu_background.setActive(true);
            this.menu_background.setVisible(true);
            //window = this.add.zone(x, y, 160, 530).setInteractive().setOrigin(0);//TODO - update numbers

        } else {
            this.summon_menu_open = false;
            this.menu_background.setActive(false);
            this.menu_background.setVisible(false);
        }

    }
}