// JavaScript source code
class TentacleClass extends MonsterBaseClass {
    constructor(cooldown_length, x, y, scene) {
        super(cooldown_length, 5, x, y, "tentacle", scene);
        this.range = 3; //can attack enemies up to three tiles away
        this.sprite.isStatic(true);
        this.sprite.isSensor(true);
        this.is_attacking = false;
    }
    update() {
        super.update();
        if (this.is_attacking == false) {
            this.sprite.anims.play("idle", true);
        }
    }
    attack(enemy) {
        var attack_possible = this.attack_cooldown_calc();
        if (attack_possible) {
            this.is_attacking = true;
            enemy.take_damage(this.attack_damage);
            this.sprite.anims.play("tentacle_attack", false);
            this.reset = this.scene.time.addEvent({
                delay: 1500,
                callback: this.reset_timer,
            });
        }       
    }
    reset_timer() {
        this.is_attacking = false;
    }
}