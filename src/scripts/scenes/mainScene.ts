import ExampleObject from '../objects/exampleObject';
import Dragon from '../objects/dragon';
import financialAccount from '../objects/financialAccount';
import store from "./store";

export default class MainScene extends Phaser.Scene {

  //public fundsSavingsAccount: number;
  public Checking: number;
  public Savings: number;
  private BarChecking;
  private BarSavings;
  private background;
  private day;
  private dayButton;
  private coin;


  tutorial: Array<Phaser.GameObjects.Text>;
  tutorialCount = 0;

  //private savings: financialAccount;
  private stockA: financialAccount;
  private stockB: financialAccount;


  dragon: Phaser.GameObjects.Sprite;
  //checking: financialAccount;



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.scene.bringToTop();
    
    /* checking  start */
    this.Checking = 90;
    this.registry.set("Checking", this.Checking);
    this.Savings = 10;
    /* checking end */

    this.scene.get("store").events.on("buyFrog1", this.buyFrog1, this);

    //this.market = 1.12;

    this.background = this.add.image(0, 0, "cave");
    this.background.setOrigin(0, 0);
    this.background.scale = 0.65;

    this.dayButton = this.add.image(300, 300, "day");
    this.add.text(300, 300, "next week");
    this.dayButton.scale = 0.1;
    this.dayButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.nextDay(this, this.dayButton) );
    this.day = 0;

    //this.newsButton = this.add.image(350, 350, "news");
    //this.newsButton.scale = 0.2;
    //this.newsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.goNews(this, this.newsButton) );


    this.dragon = new Dragon(this, "dragon", this.scale.width/8, this.scale.height/1.3);
    this.dragon.scale = 0.5;

    /* creating financial account amount displays*/
    /* constructing financial accounts*/
    this.stockA = new financialAccount(this, 'stockA', 50, 0, 10, 1, -0.5);
    this.stockB = new financialAccount(this, 'stockB', 175, 0, 25, 5, -1);

     //this.Bar401 = this.add.bitmapText(25, 0, "pixelFont", "Savings Account: $"+ this.savings.amount, 16);
     //this.BarB = this.add.bitmapText(175, 0, "pixelFont", "Stock : $"+ this.stockB.amount, 16);
    this.BarChecking = this.add.bitmapText(300, 0, "pixelFont", "Checking: $"+ this.Checking, 16);
    this.BarSavings = this.add.bitmapText(300, 20, "pixelFont", "Savings: $"+ this.Savings, 16);

    /*arrows start*/

    this.stockA.up.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.stockA.up, this.stockA, 1))
    .on('pointerup', () => this.stopRaiseAccount(this, this.stockA.up, this.stockA));

    this.stockA.down.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.stockA.down, this.stockA, -1) )
    .on('pointerup', () => this.stopRaiseAccount(this, this.stockA.down, this.stockA));

    this.stockB.up.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.stockB.up, this.stockB, 1) )
    .on('pointerup', () => this.stopRaiseAccount(this, this.stockB.up, this.stockB));

    this.stockB.down.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.startRaiseAccount(this, this.stockB.down, this.stockB, -1) )
    .on('pointerup', () => this.stopRaiseAccount(this, this.stockB.down, this.stockB));

    /*arrows end*/

    this.anims.create({
      key: "coinSpin",
      frames: this.anims.generateFrameNumbers("coin", {start:0, end: 7}), 
      frameRate: 12, 
      repeat: -1
    });

    this.coin = this.add.sprite(this.scale.width/2 + this.scale.width/5, this.scale.height/2 + this.scale.height/3, "coin");
    this.coin.play("coinSpin");
    this.add.text(this.scale.width/2 + this.scale.width/5 - 40, this.scale.height/2 + this.scale.height/3, "FROG STORE");
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
      this.scene.bringToTop('store');
    //}
  }

  buyFrog1(data){
    this.Checking -= data;
    this.updateAccounts();
}

  public goNews(){
    this.scene.bringToTop('news');
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
      this.moveFundstoAccount(direction*1, account);
      this.time.addEvent({
      delay: 50,
      callback: ()=>{
        this.buttonMoveAddAccount(account, direction);
      },
      loop: false
      });
    }
  }

  moveFundstoAccount(count: number, account: financialAccount){
    if ((count > 0)&&(account.price * count <= this.Checking)||((count < 0)&&(count <= account.count))){
      this.Checking -= count * account.price;
      //console.log(account);
      account.add(count);
      this.updateAccounts();
      this.events.emit("updateChecking", this.Checking); 
    }
  }

  updateMarket(){
    this.stockA.updatePrice();
    this.stockB.updatePrice();
  }

  updateAccounts(){
    this.BarChecking.text = "Checking: $"+ Phaser.Math.RoundTo(this.Checking, -2);
    this.BarSavings.text = "Savings: $"+ Phaser.Math.RoundTo(this.Savings, -2);
    this.stockA.refresh();
    this.stockB.refresh();
  }

  stockCrash(){
    this.stockB.price = 0.1*(this.stockB.price);
  }

  /*randomEvent(){
    let eventCheck = Phaser.Math.Between(1, 100);

  }*/



  nextDay(pointer, gameobject){
    this.day += 1;
    this.Savings = Phaser.Math.RoundTo(((1.05)*this.Savings), -2);
    //this.stockB.price = Phaser.Math.RoundTo((this.market*this.stockB.price), -2);
    this.updateMarket();
    this.Checking += 100;
    this.updateAccounts();
    this.events.emit("updateChecking", this.Checking); 
    if (this.tutorialCount < 3) {
      this.tutorialCount += 1;
      this.stepTutorial(this.tutorialCount);
    }
    this.goNews();
  }



  update() {

  }
}
