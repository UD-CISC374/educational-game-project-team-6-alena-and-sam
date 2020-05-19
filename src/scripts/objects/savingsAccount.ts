import news from "../scenes/news";

export default class SavingsAccount extends Phaser.GameObjects.Sprite {
    interest:number
    amount: number
    
    held: boolean;

    up: Phaser.GameObjects.Sprite;
    down: Phaser.GameObjects.Sprite;
    display: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, image, x: number, y: number, amount: number, interest: number) {
        super(scene, x, y, image);
        scene.add.existing(this);

        this.interest = interest;
        this.amount = amount;
        
        this.held = false;

        this.display = scene.add.bitmapText(x - 50, y - 15, "pixelFont", "Savings: $"+ Phaser.Math.RoundTo(this.amount, -2) + "\n Interest Rate: " + this.interest*100 + "%", 16);

        this.up = scene.add.sprite(x - 56, y - 15, 'arrow');
        this.up.scale = 0.05;
        this.up.angle = 90;

        this.down = scene.add.sprite(x - 54, y + 20, 'arrow');
        this.down.scale = 0.05;
        this.down.angle = 270;
    }

    add(amount: number) {
        this.amount += amount;
    }  

    remove(amount: number) {
        if (amount < this.amount) {
            this.amount -= amount;
        }
    }

    updateAmount() {
        this.amount += this.amount*this.interest;
    }

    refresh() {
        this.display.text =  "Savings: $"+ Phaser.Math.RoundTo(this.amount, -2) + "\n Interest Rate: " + this.interest*100 + "%";
    }
}
