export default class news extends Phaser.Scene {

    private background;

    constructor() {
        super({ key: 'news' });
    }



    create() {
        this.add.text(20, 20, "Welcome to NEWS");
        this.background = this.add.image(0, 0, "stockCrashNews");
        this.background.setOrigin(0, 0);
        this.background.scale = 1.3;
    }

    update() {

    }
}