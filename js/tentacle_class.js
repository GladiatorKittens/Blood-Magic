// JavaScript source code
class TentacleClass extends MonsterBaseClass {
    constructor(cooldown_length, x, y, scene) {
        super(cooldown_length, x, y, 100, "tentacle", scene);
        console.log(scene);
        this.range = 3; //can attack enemies up to three tiles away
    }
    update() {
        super.update();
    }
}