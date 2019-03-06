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
        //creates the animations for the altar
        const anims = scene.anims;
        anims.create({
            key: "full",
            frames: anims.generateFrameNumbers("Altar", { frames: [0] })
        });
        anims.create({
            key: "nearly_full",
            frames: anims.generateFrameNumbers("Altar", { frames: [1] })
        });
        anims.create({
            key: "half_full",
            frames: anims.generateFrameNumbers("Altar", { frames: [2] })
        });
        anims.create({
            key: "nearly_empty",
            frames: anims.generateFrameNumbers("Altar", { frames: [3] })
        });
        anims.create({
            key: "empty",
            frames: anims.generateFrameNumbers("Altar", { frames: [4] })
        });
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
            scene.input.enabled = false;
            scene.physics.pause();
        }
    }
}