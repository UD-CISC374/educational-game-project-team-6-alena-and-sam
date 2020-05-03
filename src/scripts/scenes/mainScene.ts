import ExampleObject from '../objects/exampleObject';
import Dragon from '../objects/dragon';
import financialAccount from '../objects/financialAccount';

export default class MainScene extends Phaser.Scene {

  //public fundsSavingsAccount: number;
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
  //private StockUpisHeld: boolean;
  private market: number;
  private newsButton;
  tutorial: Array<Phaser.GameObjects.Text>;
  tutorialCount = 0;

  private savings: financialAccount;
  private stockB: financialAccount;
  //private stockC: financialAccount;
  private BarB;
  //private fundsStock;

  dragon: Phaser.GameObjects.Sprite;
  checking: financialAccount;



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    /* checking  start */
    this.Checking = 100;
    /* checking end */


    this.market = 1.12;

    this.background = this.add.image(0, 0, "cave");
    this.background.setOrigin(0, 0);
    this.background.scale = 0.65;

    this.dayButton = this.add.image(300, 300, "day");
    this.add.text(300, 300, "next week");
    this.dayButton.scale = 0.1;
    this.dayButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.nextDay(this, this.dayButton) );
    this.day = 0;

    this.newsButton = this.add.image(350, 350, "news");
    this.newsButton.scale = 0.2;
    this.newsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.goNews(this, this.newsButton) );


    this.dragon = new Dragon(this, "dragon", this.scale.width/8, this.scale.height/1.3);
    this.dragon.scale = 0.5;

    this.add.image(this.scale.width/2 + this.scale.width/3 + 20, this.scale.height/2 + this.scale.height/3 - 20, "jesterFrog");
    this.add.text(this.scale.width/2 + this.scale.width/4 + 10, this.scale.height/2 + this.scale.height/9 + 3, "Price: $5,000");
    this.add.text(this.scale.width/2 + this.scale.width/4 + 25, this.scale.height/2 + this.scale.height/3 + 25, "JESTER FROG");

     /* creating financial account amount displays*/
     /* constructing financial accounts*/
     this.savings = new financialAccount(this, 'savings', 50, 0, 0, 0.05);
     this.stockB = new financialAccount(this, 'stockB', 175, 0, 0, 0.05);

     //this.Bar401 = this.add.bitmapText(25, 0, "pixelFont", "Savings Account: $"+ this.savings.amount, 16);
     //this.BarB = this.add.bitmapText(175, 0, "pixelFont", "Stock : $"+ this.stockB.amount, 16);
     this.BarChecking = this.add.bitmapText(275, 0, "pixelFont", "Checking: $"+ this.Checking, 16);

     /*arrows start*/

    this.savings.up.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.InvestArrowUp, this.savings, 1))
    .on('pointerup', () => this.stopRaiseAccount(this, this.InvestArrowUp, this.savings));

    this.savings.down.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.InvestArrowDown, this.savings, -1) )
    .on('pointerup', () => this.stopRaiseAccount(this, this.InvestArrowDown, this.savings));
    //this.InvestArrowDown.rotation = 4.71;

    this.stockB.down.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.StockArrowDown, this.stockB, -1) )
    .on('pointerup', () => this.stopRaiseAccount(this, this.StockArrowUp, this.stockB));

    this.stockB.up.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.stockB.up, this.stockB, 1) )
    .on('pointerup', () => this.stopRaiseAccount(this, this.stockB.up, this.stockB));

    /*arrows end*/

    this.anims.create({
      key: "coinSpin",
      frames: this.anims.generateFrameNumbers("coin", {start:0, end: 7}), 
      frameRate: 12, 
      repeat: -1
    });

    this.coin = this.add.sprite(this.scale.width/2 + this.scale.width/5, this.scale.height/2 + this.scale.height/3, "coin");
    this.coin.play("coinSpin");
    this.add.text(this.scale.width/2 + this.scale.width/5 - 40, this.scale.height/2 + this.scale.height/3, "BUY FROG");
    this.coin.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buyFrog(this, this.coin) );

    this.tutorial = new Array(4);

    this.add.text(this.scale.width/8, this.scale.height/2 - 10, "OBJECTIVE: Save up enough money to buy the Jester Frog.");
    this.tutorial[0] = this.add.text(this.scale.width/8, this.scale.height/3, "Use the arrows to move money from your checking account\ninto your stock portfolio or your savings account!");
    this.tutorial[1] = this.add.text(this.scale.width/8, this.scale.height/3, "When you're satisfied with how your money is distributed,\nclick 'next week'!");
    this.tutorial[2] = this.add.text(this.scale.width/8, this.scale.height/3, "The stock market fluctuates,\nand so does the money in your stock portfolio!");
    this.tutorial[3] = this.add.text(this.scale.width/8, this.scale.height/3, "When you have enough money in checking to buy the frog, \nclick the coin!");
    this.tutorial[4] = this.add.text(this.scale.width/3, this.scale.height/3, "YOU BOUGHT THE FROG");


    for (var i = 1; i < 5; i ++){
      this.tutorial[i].visible = false;
    }
    
  }

  stepTutorial(count: number) {
    console.log("tutorial step: " + count);
    this.tutorial[count-1].visible = false;
    this.tutorial[count].visible = true;
  }

  buyFrog(pointer, gameObject){
      // if(this.Checking >= 5000){
      // this.Checking -= 5000;
      //this.updateAccounts();
      //this.tutorialCount += 1;
      //this.stepTutorial(this.tutorialCount);
      this.scene.start('store');
    //}
  }

  goNews(pointer, gameObject){
    this.scene.start('news');
  }

  startRaiseAccount(pointer, gameObject, account: financialAccount, direction: number){
    if (this.tutorialCount < 1) {
      this.tutorialCount += 1;
      this.stepTutorial(this.tutorialCount);
    }
    account.held = true;
    this.buttonMoveAddAccount(account, direction); 
  }
  stopRaiseAccount(pointer, gameObject, account: financialAccount){
    account.held = false;
  }

  buttonMoveAddAccount(account: financialAccount, direction: number){
    if (this.tutorialCount < 1) {
      this.tutorialCount += 1;
      this.stepTutorial(this.tutorialCount);
    }
    if(account.held == true){
      this.moveFundstoAccount(direction*10, account);
      this.time.addEvent({
      delay: 50,
      callback: ()=>{
        this.buttonMoveAddAccount(account, direction);
      },
      loop: false
      });
    }
  }

  buttonMoveMinusAccount(account: financialAccount){
    if(account.held == true){
      this.moveFundstoAccount(-10, account);
      this.time.addEvent({
        delay: 50,
        callback: ()=>{
          this.buttonMoveMinusAccount(account);
        },
        loop: false
      });
    }
  }

  moveFundstoAccount(amount: number, account: financialAccount){
    if (((amount <= this.Checking) && (amount>0))||(((-1)*amount <= account.amount) && (amount<0))){
      this.Checking -= amount;
      //console.log(account);
      account.add(amount);
      this.updateAccounts();
    }
  }

  addFunds(amount: number){
    this.checking.add(amount);
  }

  updateMarket(){
    this.market = Phaser.Math.Between(75, 150)/100;
  }

  updateAccounts(){
    this.BarChecking.text = "Checking: $"+ Phaser.Math.RoundTo(this.Checking, -2);
    this.savings.refresh();
    this.stockB.refresh();
  }

  stockCrash(){
    this.stockB.amount = 0.1*(this.stockB.amount);
  }

  randomEvent(){
    let eventCheck = Phaser.Math.Between(1, 100);

  }



  nextDay(pointer, gameobject){
    this.day += 1;
    this.savings.amount = Phaser.Math.RoundTo(((1.05)*this.savings.amount), -2);
    this.stockB.amount = Phaser.Math.RoundTo((this.market*this.stockB.amount), -2);
    this.updateMarket();
    this.Checking += 100;
    this.updateAccounts();
    if (this.tutorialCount < 3) {
      this.tutorialCount += 1;
      this.stepTutorial(this.tutorialCount);
    }
  }



  update() {

  }
}
