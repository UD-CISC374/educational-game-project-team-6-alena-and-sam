export default class FinancialAccount extends Phaser.GameObjects.Sprite {
    amount: number;
    interest: number;
    held: boolean;
    name: string;
    up: Phaser.GameObjects.Sprite;
    down: Phaser.GameObjects.Sprite;
    display: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, amount: number, interest: number) {
        super(scene, x, y, 'account');
        scene.add.existing(this);
        this.name = name;
        this.amount = amount;
        this.interest = interest;
        this.held = false;

        this.display = scene.add.bitmapText(x, y, "pixelFont", name + ": $"+ amount, 16);

        this.up = scene.add.sprite(x, y + 40, 'arrow');
        this.up.scale = 0.05;
        this.up.rotation = 1.57;

        this.down = scene.add.sprite(x, y + 80, 'arrow');
        this.down.scale = 0.05;
        this.down.rotation = 4.71;
    }

    add(amount: number) {
        this.amount += amount;
    }  

    remove(amount: number) {
        if (amount < this.amount) {
            this.amount -= amount;
        }
    }

    setInterest(interest: number) {
        this.interest = interest;
    }

    toString() {
      return this.name;
    }

    refresh() {
      this.display.text = this.name + ": $"+ this.amount;
    }
}
