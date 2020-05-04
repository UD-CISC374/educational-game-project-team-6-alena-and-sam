import MainScene from "./mainScene";


export default class winScene extends Phaser.Scene {

    private background;

    constructor() {
        super({ key: 'winScene' });
    }



    create() {
        this.background = this.add.image(0, 0, "winner");
        this.background.setOrigin(0, 0);
        this.background.scale = 1.3;
    }


    update() {
        
    }
}