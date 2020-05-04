import MainScene from "./mainScene";


export default class store extends Phaser.Scene {

    private background;
    private buyButton1;
    private buyButton2;
    private buyButton3;
    private buyButton4;
    private buyButton5;
    private exitSign;
    private checkingText;
    private Checking;
    private frogCount;


    constructor() {
        super({ key: 'store' });
    }



    create() {
        this.Checking = 90;
        this.frogCount = 0;

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

        this.exitSign = this.add.image(30, 30, "exitSign");
        this.exitSign.scale = 0.15;

        this.buyButton1.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.buyFrog(25000, this, this.buyButton1) );

        this.buyButton2.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.buyFrog(50000, this, this.buyButton2) );

        this.buyButton3.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.buyFrog(50, this, this.buyButton3) );

        this.buyButton4.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.buyFrog(500, this, this.buyButton4) );

        this.buyButton5.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.buyFrog(5000, this, this.buyButton5) );

        this.exitSign.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.exit(this, this.exit) );

        this.checkingText = this.add.text(525, 20, "Checking: $" + 90);
        this.scene.get("MainScene").events.on("updateChecking", this.updateChecking, this);
    }

    buyFrog(price, pointer, gameObject){
        if(this.Checking>=price){
            this.events.emit("buyFrog1", price);  
            this.Checking -= price;
            this.checkingText.text = "Checking: $" + this.Checking;
            this.frogCount+=1;
            if(this.frogCount == 5){
                this.win();
            }

            gameObject.destroy();
        }
    }

    exit(pointer, gameObject){
        this.scene.bringToTop('MainScene');    
        this.scene.sleep("store");
        this.scene.wake("MainScene");
    }

    updateChecking(data){
        this.Checking = data;
        this.checkingText.text = "Checking: $" + data;
    }


    win(){
        this.scene.bringToTop("winScene");
        this.scene.sleep("store");
        this.scene.wake("winScene");

    }

    update() {
        
    }
}