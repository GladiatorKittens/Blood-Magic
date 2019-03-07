// JavaScript source code
class Level_1 extends LevelBaseClass{
    constructor() {
        super("Level_1");
        //extra
    }
    preload() {
        super.preload();
        //load in necessary assets
    }
    create() {
        super.create(this, 200, 200, 200, [20,10], [10,20]);//fill in arrays with path
    }
    update() {
        super.update();
    }
}