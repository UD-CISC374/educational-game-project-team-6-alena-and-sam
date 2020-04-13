import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private funds401k;
  private fundsStockA;
  private fundsStockB;
  private fundsStockC;
  private Savings;
  private Checking;
  private moneyBar;



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
    this.moneyBar = this.add.bitmapText(0, 0, "pixelFont", "Testing", 16);
  }

  moveFunds(accountA, accountB, amount){
    if ((amount <= accountA) && (amount>0)){
      accountA -= amount;
      accountB += amount;
    }
  }

  addFunds(amount){
    this.Checking += amount;
  }

  buyFrog(amount){
    this.Checking -= amount;
  }

  update() {
  }
}
