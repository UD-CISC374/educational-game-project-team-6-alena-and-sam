import ExampleObject from '../objects/exampleObject';
import Dragon from '../objects/dragon';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private funds401k;
  private fundsStockA;
  private fundsStockB;
  private fundsStockC;
  private Savings;
  private Checking;
  private Bar401;
  private BarA;
  private BarB;
  private BarC;
  private BarSavings;
  private BarChecking;
  private idleArrow;


  dragon: Phaser.GameObjects.Sprite;



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.funds401k = 0;
    this.fundsStockA = 0;
    this.fundsStockB = 0;
    this.fundsStockC = 0;
    this.Savings = 0;
    this.Checking = 0;


    this.Bar401 = this.add.bitmapText(0, 0, "pixelFont", "   401K: $"+ this.funds401k, 16);
    this.BarA = this.add.bitmapText(75, 0, "pixelFont", "Stock A: $"+ this.fundsStockA, 16);
    this.BarB = this.add.bitmapText(150, 0, "pixelFont", "Stock B: $"+ this.fundsStockB, 16);
    this.BarC = this.add.bitmapText(225, 0, "pixelFont", "Stock C: $"+ this.fundsStockC, 16);
    this.BarSavings = this.add.bitmapText(300, 0, "pixelFont", "Savings: $"+ this.Savings, 16);
    this.BarChecking = this.add.bitmapText(375, 0, "pixelFont", "Checking: $"+ this.Checking, 16);

    this.idleArrow = this.add.image(100, 40, "arrow");
    this.idleArrow.scale = 0.05;

    this.dragon = new Dragon(this, "dragon", this.scale.width/8, this.scale.height/1.3);
    this.dragon.scale = 0.5;
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
