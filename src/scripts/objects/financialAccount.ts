export default class FinancialAccount extends Phaser.GameObjects.Sprite {
    amount: number;
    interest: number;

    constructor(scene: Phaser.Scene, x: number, y: number, amount: number, interest: number) {
        super(scene, x, y, 'account');
        scene.add.existing(this);
        this.amount = amount;
        this.interest = interest;
    }

    add(amount: number) {
        this.amount += amount;
    }  

    remove(amount: number) {
        if (amount < this.amount) {
            this.amount -= amount;
        }
    }
}
