import news from "../scenes/news";

export default class FinancialAccount extends Phaser.GameObjects.Sprite {
    count: number;
    
    price: number;
    priceVel: number;
    priceAccel: number;

    prevPrice: number;

    volatility: number;
    
    held: boolean;
    name: string;
    up: Phaser.GameObjects.Sprite;
    down: Phaser.GameObjects.Sprite;
    display: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, name: string, image: string, x: number, y: number, price: number, priceVel: number, priceAccel: number, volatility: number) {
        super(scene, x, y, image);
        scene.add.existing(this);
        this.name = name;

        this.price = price;
        this.priceVel = priceVel;
        this.priceAccel = priceAccel;

        this.prevPrice = price - priceVel;

        this.volatility = volatility;

        this.held = false;
        this.count = 0;

        this.display = scene.add.bitmapText(x - 30, y - 25, "pixelFont", 
                                            this.name + ": $"+ Phaser.Math.RoundTo(this.count*this.price, -2) 
                                            + "\n Stock Price: $" + this.price 
                                            + "\n Number owned: "+ this.count
                                            + "\n Change: " + Phaser.Math.RoundTo((price - this.prevPrice)/this.prevPrice*100, -2) + "%", 16);

        this.up = scene.add.sprite(x - 42, y - 15, 'arrow');
        this.up.scale = 0.05;
        this.up.angle = 90;

        this.down = scene.add.sprite(x - 40, y + 20, 'arrow');
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
        this.prevPrice = this.price;
        this.priceAccel = Phaser.Math.Between(-4, 5);
        let crash = this.randomEvent();
        console.log("crash = " + crash);
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
        this.display.text = this.name + ": $"+ Phaser.Math.RoundTo(this.count*this.price, -2) 
                            + "\n Stock Price: $" + this.price 
                            + "\n Number owned: "+ this.count
                            + "\n Change: " + Phaser.Math.RoundTo((this.price - this.prevPrice)/this.prevPrice*100, -2) + "%";
    }
}
