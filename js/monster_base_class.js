// JavaScript source code
class MonsterBaseClass {
    constructor(cooldown_length, x, y, health, texture, scene) {
        console.log(scene);
        this.health = health;
        this.level = 1;
        this.scene = scene;
        this.upgrade_cost = upgrade_cost_calc(this.level);//function
        //this.on_cooldown = false;
        this.last_attack_time = 0;
        this.cooldown_length = cooldown_length;
        this.x = x;
        this.y = y;
        //this.sprite = scene.matter.add.sprite(x, y, texture, 0);    
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
            console.log("attack possible")
            this.last_attack_time = time;
            //attack goes in here
        }
    }
}