import ExampleObject from '../objects/exampleObject';
import Dragon from '../objects/dragon';

export default class MainScene extends Phaser.Scene {

  public fundsSavingsAccount: number;
  private fundsStock;
  public Checking: number;
  private Bar401;
  private BarA;
  private BarChecking;
  private InvestArrowUp;
  private InvestArrowDown;
  private StockArrowUp;
  private StockArrowDown;
  private background;
  private day;
  private dayButton;
  private coin;


  dragon: Phaser.GameObjects.Sprite;



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.image(0, 0, "cave");
    this.background.setOrigin(0, 0);
    this.background.scale = 0.65;

    this.dayButton = this.add.image(300, 300, "day");
    this.add.text(300, 300, "next week");
    this.dayButton.scale = 0.1;
    this.dayButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.nextDay(this, this.dayButton) );
    this.day = 0;

    this.fundsSavingsAccount = 0;
    this.fundsStock = 0;
    this.Checking = 100;

    this.Bar401 = this.add.bitmapText(25, 0, "pixelFont", "Savings Account: $"+ this.fundsSavingsAccount, 16);
    this.BarA = this.add.bitmapText(175, 0, "pixelFont", "Stock : $"+ this.fundsStock, 16);
    this.BarChecking = this.add.bitmapText(275, 0, "pixelFont", "Checking: $"+ this.Checking, 16);

    this.InvestArrowUp = this.add.sprite(50, 40, "arrow");
    this.InvestArrowUp.scale = 0.05;
    this.InvestArrowUp.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveAddSavingsAccount(this, this.InvestArrowUp));
    this.InvestArrowUp.rotation = 1.57;

    this.InvestArrowDown = this.add.sprite(50, 80, "arrow");
    this.InvestArrowDown.scale = 0.05;
    this.InvestArrowDown.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveMinusSavingsAccount(this, this.InvestArrowDown) );
    this.InvestArrowDown.rotation = 4.71;

    this.StockArrowDown = this.add.sprite(150, 80, "arrow");
    this.StockArrowDown.scale = 0.05;
    this.StockArrowDown.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveMinusStock(this, this.StockArrowDown) );
    this.StockArrowDown.rotation = 4.71;

    this.StockArrowUp = this.add.sprite(150, 40, "arrow");
    this.StockArrowUp.scale = 0.05;
    this.StockArrowUp.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonMoveAddStock(this, this.StockArrowDown) );
    this.StockArrowUp.rotation = 1.57;

    this.dragon = new Dragon(this, "dragon", this.scale.width/8, this.scale.height/1.3);
    this.dragon.scale = 0.5;

    this.add.image(500, 300, "jesterFrog");
    this.add.text(450, 210, "Price: $50,000");

    this.anims.create({
      key: "coinSpin",
      frames: this.anims.generateFrameNumbers("coin", {start:0, end: 7}), 
      frameRate: 12, 
      repeat: -1
    });

    this.coin = this.add.sprite(500, 150, "coin");
    this.coin.play("coinSpin");
    this.add.text(465, 150, "BUY FROG");
    this.coin.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buyFrog(this, this.coin) );
  }

  buyFrog(pointer, gameObject){
    if(this.fundsStock >= 50000){
      this.fundsStock -= 50000;
      this.add.text(300, 20, "YOU BOUGHT THE FROG");
      this.updateAccounts();
    }
  }


  buttonMoveAddSavingsAccount(pointer, gameObject){
    this.moveFundstoSavingsAccount(10);
  }
  buttonMoveMinusSavingsAccount(pointer, gameObject){
    this.moveFundstoSavingsAccount(-10);
  }
  moveFundstoSavingsAccount(amount){
    if (((amount <= this.Checking) && (amount>0))||(((-1)*amount <= this.fundsSavingsAccount) && (amount<0))){
      this.Checking -= amount;
      this.fundsSavingsAccount += amount;
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


  updateAccounts(){
    this.BarChecking.text = "Checking: $"+ this.Checking;
    this.Bar401.text = "SavingsAccount: $"+ this.fundsSavingsAccount;
    this.BarA.text = "Stock: $" + this.fundsStock;
  }

  nextDay(pointer, gameobject){
    this.day += 1;
    this.fundsSavingsAccount = Phaser.Math.RoundTo(((1.05)*this.fundsSavingsAccount), -2);
    let randNum = Phaser.Math.Between(75, 150)/100;
    this.fundsStock = Phaser.Math.RoundTo((randNum*this.fundsStock), -2);
    this.Checking += 100;
    this.updateAccounts();
  }



  update() {
    
  }
}
