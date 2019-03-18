// JavaScript source code
class Button {
    constructor(x, y, image_path, on_click_function, scene) {
        this.x = x;
        this.y = y;

        this.image_path = image_path;
        this.on_click_function = on_click_function;
        this.scene = scene;
        this.image = this.scene.add.image(this.x, this.y, this.image_path);
        this.image.setInteractive();
        this.image.on("pointerdown", this.on_click_function, this.scene);
    }
}

class SpawnerButton {
    constructor(x, y, image_path, on_click_string, scene) {
        this.x = x;
        this.y = y;
        this.image_path = image_path;
        this.scene = scene;
        this.object = {};
        this.image = this.scene.add.image(this.x, this.y, this.image_path);

        this.on_click_function = on_click_string;
        this.on_click_arguments = [this.object, this.scene];

        this.image.on("pointerdown", window[this.on_click_function], this.scene);
        this.image.setInteractive();
        //console.log(window[this.on_click_function](this.on_click_arguments[0], this.on_click_arguments[1]));
    }
}