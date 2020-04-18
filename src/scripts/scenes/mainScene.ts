import ExampleObject from '../objects/exampleObject';
import Dragon from '../objects/dragon';

export default class MainScene extends Phaser.Scene {

  public funds401k: number;
  private fundsStock;
  public Checking: number;
  private Bar401;
  private BarA;
  private BarChecking;
  private InvestArrowUp;
  private InvestArrowDown;
  private StockArrowUp;
  private StockArrowDown;


  dragon: Phaser.GameObjects.Sprite;



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.funds401k = 0;
    this.fundsStock = 0;
    this.Checking = 100;


    this.Bar401 = this.add.bitmapText(0, 0, "pixelFont", "   401K: $"+ this.funds401k, 16);
    this.BarA = this.add.bitmapText(75, 0, "pixelFont", "Stock : $"+ this.fundsStock, 16);
    this.BarChecking = this.add.bitmapText(375, 0, "pixelFont", "Checking: $"+ this.Checking, 16);

    this.InvestArrowUp = this.add.sprite(100, 40, "arrow");
    this.InvestArrowUp.scale = 0.05;
    this.InvestArrowUp.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveAdd401K(this, this.InvestArrowUp));

    this.InvestArrowDown = this.add.sprite(200, 40, "arrow");
    this.InvestArrowDown.scale = 0.05;
    this.InvestArrowDown.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveMinus401K(this, this.InvestArrowDown) );

    this.StockArrowDown = this.add.sprite(200, 80, "arrow");
    this.StockArrowDown.scale = 0.05;
    this.StockArrowDown.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveMinusStock(this, this.StockArrowDown) );

    this.StockArrowUp = this.add.sprite(100, 80, "arrow");
    this.StockArrowUp.scale = 0.05;
    this.StockArrowUp.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveAddStock(this, this.StockArrowDown) );


    this.dragon = new Dragon(this, "dragon", this.scale.width/8, this.scale.height/1.3);
    this.dragon.scale = 0.5;
  }

  buttonMoveAdd401K(pointer, gameObject){
    this.moveFundsto401K(10);
  }
  buttonMoveMinus401K(pointer, gameObject){
    this.moveFundsto401K(-10);
  }
  moveFundsto401K(amount){
    if (((amount <= this.Checking) && (amount>0))||(((-1)*amount <= this.funds401k) && (amount<0))){
      this.Checking -= amount;
      this.funds401k += amount;
      this.updateAccounts();
    }
  }

  buttonMoveAddStock(pointer, gameObject){
    this.moveFundstoStock(10);
  }
  buttonMoveMinusStock(pointer, gameObject){
    this.moveFundstoStock(-10);
  }
  moveFundstoStock(amount){
    if (((amount <= this.Checking) && (amount>0))||(((-1)*amount <= this.fundsStock) && (amount<0))){
      this.Checking -= amount;
      this.fundsStock += amount;
      this.updateAccounts();
    }
  }

  addFunds(amount){
    this.Checking += amount;
  }

  buyFrog(amount){
    this.Checking -= amount;
  }

  updateAccounts(){
    this.BarChecking.text = "Checking: $"+ this.Checking;
    this.Bar401.text = "401K: $"+ this.funds401k;
    this.BarA.text = "Stock: $" + this.fundsStock;

  }


  update() {
    
  }
}
