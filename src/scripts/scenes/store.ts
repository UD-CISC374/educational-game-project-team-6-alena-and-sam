import MainScene from "./mainScene";

export default class store extends Phaser.Scene {

    private background;
    private buyButton1;
    private buyButton2;
    private buyButton3;
    private buyButton4;
    private buyButton5;


    constructor() {
        super({ key: 'store' });
    }



    create() {

        this.add.text(20, 20, "Welcome to STORE");
        this.background = this.add.image(0, 0, "frogStore");
        this.background.setOrigin(0, 0);
        this.background.scale = 0.65;

        this.buyButton1 = this.add.image(80, 300, "buyButton");
        this.buyButton1.scale = 0.2;

        this.buyButton2 = this.add.image(600, 300, "buyButton");
        this.buyButton2.scale = 0.2;

        this.buyButton3 = this.add.image(80, 80, "buyButton");
        this.buyButton3.scale = 0.2;

        this.buyButton4 = this.add.image(400, 100, "buyButton");
        this.buyButton4.scale = 0.2;

        this.buyButton5 = this.add.image(600, 80, "buyButton");
        this.buyButton5.scale = 0.2;

        this.buyButton1.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.buyFrog(10, this, this.buyButton1) );
    }

    buyFrog(price, pointer, gameObject){
        this.events.emit("buyFrog1");
        this.scene.bringToTop('MainScene');    
        
    }


    update() {

    }
}