// JavaScript source code
class StartScreen extends Phaser.Scene {
    constructor() {
        super("StartScreen");
        this.id = "StartScreen";
        //Add extra variables here
    }
    preload() {
        //load in assets for menu screen
        this.load.image('start_button', 'assets/art/Buttons/start_button.png');
    }
    create() {
        this.matter.world.setBounds();
        //creates a new instance of the button class, which takes in co-ordinates, image path, the function for on press and the context
        var start_button = new Button(450, 250, "start_button", function () { this.scene.start("Level_1")}, this);
        
    }
    update() {
    }

}