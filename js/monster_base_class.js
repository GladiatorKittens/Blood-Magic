// JavaScript source code
class MonsterBaseClass {
    constructor(cooldown_length) {
        this.health = health;
        this.attack_speed = attack_speed;
        this.level = 1;
        this.upgrade_cost = upgrade_cost_calc(this.level);//function
        //this.on_cooldown = false;
        this.last_attack_time = 0;
        this.cooldown_length = cooldown_length;
    };
    update() {

    }
    attack() {
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