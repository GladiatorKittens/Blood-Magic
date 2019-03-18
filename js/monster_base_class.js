// JavaScript source code
class MonsterBaseClass {
    constructor(cooldown_length, attack, x, y, texture, scene) {
        this.level = 1;
        this.scene = scene;
        this.upgrade_cost = upgrade_cost_calc(this.level);//function
        this.last_attack_time = 0;
        this.cooldown_length = cooldown_length;
        this.attack_damage = attack;
        this.x = x;
        this.y = y;
        this.sprite = scene.matter.add.sprite(x, y, texture, 0);    
        //this.sprite.setScale(2, 2);
    };
    update() {

    }
    attack_cooldown_calc() {
        var time = new Date();
        time = time.getTime();
        //check if the attack is on cooldown
        var time_diff = time - this.last_attack_time;
        if (time_diff > this.cooldown_length) {
            this.last_attack_time = time;
            return true;
            //attack goes in here
        } else {
            return false;
        }
    }
}