// JavaScript source code
class EnemyBaseClass extends Phaser.Physics.Matter.Sprite{
    constructor(x, y, health, damage, scene, texture) {
        console.log(scene);
        super(scene, x, y, texture, 0);
        this.body.isSensor = true;
        this.body.sprite = this;
        this.health = health;
        this.x = x;
        this.y = y;
        this.pi = 0;
        this.damage = damage;
        //this.sprite = scene.matter.add.sprite(0, 0, texture, 0);
        //this.sprite.body.isSensor = true;
        //this.scene = scene;
    }
    update(path, altar) {
        this.x = path[this.pi].x;
        this.y = path[this.pi].y;
        this.x = this.x;
        this.y = this.y;
        this.pi++;

        if (this.pi >= path.length) {
            this.attack(altar);
            this.die();
        }
    }
    take_damage(monster_damage) {
        this.health -= monster_damage;
        if (this.health <= 0) {
            this.die();
        }
    }
    die() {
        /*var temp;
        for (var i = 0; i <= this.scene.
        ; i++) {
            if (this.scene.enemies_array[i] === this) {
                temp = i;
            }
        }
        this.scene.enemies_array.splice(temp, 1);
        this.scene.blood += 2;
        this.sprite.destroy();*/
        this.setActive(false);
    }
    attack(altar) {
        altar.take_damage(this.damage);
    }
}