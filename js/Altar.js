// JavaScript source code
class Altar{
    constructor(scene, x, y, health) {
        this.id = "Altar";
        this.health = this.max_health = health; //TODO - balance
        //creates the altars sprite, and sets its hitbox to a square. also sets its position
        this.sprite = scene.matter.add.sprite(0, 0, "Altar", 0).setBody({
            type: "rectangle",
            width: 23,
            height: 23
        }).setPosition(x, y);
        this.sprite.label = "Altar";
        this.scene = scene;
    }
    update() {                  //changes the frame of the altar to reflect how much health it has left
        //this could have been done using setTexture, but I didn't realise until I'd done it this way
        if (this.health >= this.max_health * 0.9) {
            this.sprite.anims.play("full", true);
        } else if (this.health >= this.max_health * 0.75) {
            this.sprite.anims.play("nearly_full", true);
        } else if (this.health >= this.max_health * 0.25) {
            this.sprite.anims.play("nearly_empty", true);
        } else {
            this.sprite.anims.play("empty", true);
        }
    }
    take_damage(damage) {       //subtracts any damage taken from the Altar's health and checks if it is destroyed
        this.health -= damage;
        if (this.health <= 0) {
            this.scene.health_text.setText("health: " + this.health);
            this.sprite.anims.play("empty", true);
            this.scene.input.enabled = false;
            this.scene.matter.pause();
            this.scene.scene.pause();
        }
    }
}