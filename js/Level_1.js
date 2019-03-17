// JavaScript source code
class Level_1 extends LevelBaseClass{
    constructor() {
        super("Level_1", 100, 20);
        //extra
    }
    preload() {
        super.preload();
        //load in necessary assets
    }
    create() {
        super.create(this, 200);
    }
    update() {
        super.update();
        if (this.game_started === true) {
            //this.spawn_enemy = new Phaser.Time.TimerEvent([this.num_of_enemies], this.spawn_enemies, this, 3000);
            this.spawn_enemy = this.time.addEvent({
                delay: 3000,
                callback: this.spawn_enemies,
                args: [this.num_of_enemies],
                repeat: 20
            });
            var new_enemy = new EnemyBaseClass(this.x_array[0], this.y_array[0], 10, 5, 2, this, "picture.png");
            this.enemies_array.push(new_enemy);
            this.game_started = false; //prevents this if statement from running more than once
        }
    }
}