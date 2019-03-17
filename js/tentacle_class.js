// JavaScript source code
class TentacleClass extends MonsterBaseClass {
    constructor(cooldown_length, x, y, scene) {
        super(cooldown_length, x, y, 100, "tentacle", scene);
        this.range = 3; //can attack enemies up to three tiles away
        const anims = scene.anims;
        anims.create({
            key: "idle",
            frames: anims.generateFrameNumbers("tentacle", { start: 0, end: 2 }),
            frameRate: 2,
            yoyo: true,
            repeat: -1
        });
    }
    update() {
        super.update();
        this.sprite.anims.play("idle", true);
    }
}