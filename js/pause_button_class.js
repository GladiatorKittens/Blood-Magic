// JavaScript source code
class PausePlayButton {
    constructor(scene, x, y) {
        this.scene = scene;
        this.id = "Pause Button";
        this.state = pause_play_states.STOPPED
        this.sprite = scene.matter.add.sprite(0, 0, "Pause Play Button", 0).setBody({
            type: "rectangle",
            width: 32,
            height: 32
        }).setPosition(x, y);
        this.sprite.label = "Pause Button";
        this.sprite.setInteractive();
        this.sprite.on("pointerdown", this.on_click_function, this.scene);
    }
    on_click_function() {
        //TODO
    }
    update() {
        if (this.state = pause_play_states.PAUSED) {
            this.sprite.setTexture(0)
        } else if (this.state = pause_play_states.PLAYING) {
            this.sprite.setTexture(1)
        } else if (this.state = pause_play_states.STOPPED) {
            this.sprite.setTexture(2)
        } else{
            this.sprite.setTexture(3)
        }
    }
}
const pause_play_states = {
    PLAYING: "0",
    PAUSED: "1",
    STOPPED: "2"
}