// JavaScript source code
class EnemyBaseClass {
    constructor(x, y, health, speed, damage, scene, texture) {
        this.health = health;
        this.move_speed = speed;
        this.x = x;
        this.y = y;
        this.pi = 0;
        this.damage = damage;
        this.sprite = scene.matter.add.sprite(0, 0, texture, 0);
    }
    update(path, altar) {
        //console.log();
        //this.x = path[this.pi].x;
        //this.y = path[this.pi].y;

        //this.pi++;

        //if (this.pi >= path.length) {
        //    this.attack(altar);
        //}
    }
    die() {

    }
    attack(altar) {
        altar.take_damage(this.damage);
    }
}