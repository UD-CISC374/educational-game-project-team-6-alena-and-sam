import news from "../scenes/news";

export default class FinancialAccount extends Phaser.GameObjects.Sprite {
    count: number;
    
    price: number;
    priceVel: number;
    priceAccel: number;

    volatility: number;
    
    held: boolean;
    name: string;
    up: Phaser.GameObjects.Sprite;
    down: Phaser.GameObjects.Sprite;
    display: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, price: number, priceVel: number, priceAccel: number, volatility: number) {
        super(scene, x, y, 'account');
        scene.add.existing(this);
        this.name = name;

        this.price = price;
        this.priceVel = priceVel;
        this.priceAccel = priceAccel;

        this.volatility = volatility;

        this.held = false;
        this.count = 0;

        this.display = scene.add.bitmapText(x, y, "pixelFont", this.name + ": $"+ Phaser.Math.RoundTo(this.count*this.price, -2) + "\n Stock Price: $" + this.price + "\n Number owned: "+ this.count, 16);

        this.up = scene.add.sprite(x - 10, y + 10, 'arrow');
        this.up.scale = 0.05;
        this.up.angle = 90;

        this.down = scene.add.sprite(x - 10, y + 50, 'arrow');
        this.down.scale = 0.05;
        this.down.angle = 270;
    }

    add(count: number) {
        this.count += count;
    }  

    remove(count: number) {
        if (count < this.count) {
            this.count -= count;
        }
    }

    updatePrice() {
        this.priceAccel = Phaser.Math.Between(-4, 5);
        let crash = this.randomEvent();
        //console.log("crash = " + crash);
        this.priceVel = this.priceVel + this.priceAccel;
        if(this.price + this.priceVel > 1){
            this.price = this.price + this.priceVel;
        }
        else{
            this.price = 1;
        }
        return crash;
    }

    randomEvent() {
        let eventCheck = Phaser.Math.Between(1, 100);
        if(eventCheck <= this.volatility){
            this.price = 0.1*this.price; //stock crash
            console.log(this.name + " crashed");
            return true;
        }
        else {
            return false;
        }
    }

    toString() {
        return this.name;
    }

    refresh() {
        this.display.text = this.name + ": $"+ Phaser.Math.RoundTo(this.count*this.price, -2) + "\n Stock Price: $" + Phaser.Math.RoundTo(this.price, -2) + "\n Number owned: "+ this.count;
    }
}
