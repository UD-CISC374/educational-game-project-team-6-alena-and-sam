export default class FinancialAccount extends Phaser.GameObjects.Sprite {
    amount: number;
    interest: number;
    hasArrows: boolean;
    held: boolean;
    name: string;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, amount: number, interest: number, hasArrows: boolean) {
        super(scene, x, y, 'account');
        scene.add.existing(this);
        this.name = name;
        this.amount = amount;
        this.interest = interest;
        this.hasArrows = hasArrows;
        this.held = false;
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
}
