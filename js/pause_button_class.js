// JavaScript source code
class PausePlayButton {
    constructor(scene, opposite_scene, x, y) {
        this.scene = scene;
        this.opposite_scene = opposite_scene;
        this.id = "Pause Button";      
        this.sprite = scene.matter.add.sprite(x, y, "pause_play_button", 2);
        this.sprite.label = "Pause Button";
        this.sprite.setInteractive();
        if (this.opposite_scene != "pause_scene") {
            this.state = pause_play_states.PAUSED;
        } else {
            this.state = pause_play_states.STOPPED;
        }
        this.sprite.on("pointerdown", this.on_click_function, this.scene);
    };
    on_click_function() {
        switch (this.pause_button.state) {
            case pause_play_states.PLAYING:
                this.pause_button.state = pause_play_states.PAUSED;
                ////this is where the game will pause.
                //this.scene.start("pause_scene");
                //this.scene.pause();
                break;
            case pause_play_states.PAUSED:
                this.pause_button.state = pause_play_states.PLAYING;
                //this.scene.resume("Level_1");
                //this.scene.stop();
                break;
            case pause_play_states.STOPPED:
                this.pause_button.state = pause_play_states.PLAYING;
                this.pause_button.scene.game_started = true;
                break;
        }
    };
    update() {
        //the texture of the sprite is not changings
        if (this.state === pause_play_states.PAUSED) {
            this.sprite.setFrame(0)
        } else if (this.state === pause_play_states.PLAYING) {
            this.sprite.setFrame(1)
        } else if (this.state === pause_play_states.STOPPED) {
            this.sprite.setFrame(2)
        } else{
            this.sprite.setFrame(3)
        }
    };
}
const pause_play_states = {
    PLAYING: "0",
    PAUSED: "1",
    STOPPED: "2"
}