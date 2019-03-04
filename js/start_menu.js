// JavaScript source code
class StartScreen extends Phaser.Scene {
    constructor() {
        super();
        this.id = "StartScreen";
        //Add extra variables here
    }
    preload() {
        //load in assets for menu screen
    }
    create() {
        this.matter.world.setBounds();
        var start_hitbox = this.matter.add.rectangle(450, 250, 200, 50);
        var start_button = this.add.image(450, 250, "placeholder.png");
        start_button.setInteractive();
        start_button.on("pointerdown", function () { this.scene.start("Level_1") });//doesn't work due to this context
    }
    update() {

    }

}