export default class store extends Phaser.Scene {

    private background;

    constructor() {
        super({ key: 'store' });
    }



    create() {
        this.add.text(20, 20, "Welcome to STORE");
        this.background = this.add.image(0, 0, "frogStore");
        this.background.setOrigin(0, 0);
        this.background.scale = 0.65;
    }

    update() {

    }
}