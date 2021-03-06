export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
    this.load.bitmapFont("Firefont", "assets/FireFont.png", "assets/FireFont.fnt");
    
    this.load.image("bat", "assets/thenewBAT.png");
    this.load.image("dragon", "assets/images/dragon_boi.png");
    this.load.spritesheet("arrow", "assets/arrow_button_idle.png", {frameWidth: 637, frameHeight:308});
    this.load.spritesheet("arrowActive", "assets/arrow_button_active.png", {frameWidth: 637, frameHeight:308});
    this.load.spritesheet("frog1", "assets/Frog1.png", {frameWidth: 32, frameHeight:32});
    this.load.spritesheet("frog2", "assets/Frog2.png", {frameWidth: 32, frameHeight:32});
    this.load.spritesheet("frog3", "assets/Frog3.png", {frameWidth: 32, frameHeight:32});
    this.load.spritesheet("frog4", "assets/Frog4.png", {frameWidth: 32, frameHeight:32});
    this.load.spritesheet("frog5", "assets/Frog5.png", {frameWidth: 32, frameHeight:32});
    this.load.spritesheet("fire", "assets/FireTransition.png", {frameWidth: 32, frameHeight:32});
    this.load.image("cave", "assets/fossil_cave.jpg");
    this.load.image("day", "assets/moon_sun_star.png");
    this.load.image("jesterFrog", "assets/jester frog.PNG");
    this.load.spritesheet("coin", "assets/01coin.png", {frameWidth: 120, frameHeight: 120});
    this.load.image("frogStore", "assets/FrogStore2.png");
    this.load.image("news", "assets/NewsIcon.jpg");
    this.load.image("stockCrashNews", "assets/StockCrash.jpg");
    this.load.image("buyButton", "assets/BuyButton.png");
    this.load.image("buyButtonDown", "assets/BuyButtonDown.png");
    this.load.image("exitSign", "assets/ExitSign.png");
    this.load.image("sold", "assets/Sold.png");
    this.load.image("winner", "assets/Winner.png");
    this.load.image("rockA", "assets/a.png");
    this.load.image("rockB", "assets/b.png");
    this.load.image("rockC", "assets/c.png");
    this.load.image("X", "assets/critical-32.png");
    this.load.image("bank", "assets/Green@2x.png");
    this.load.audio("bgmusic", "assets/Night.mp3");
    this.load.audio("fireSound", "assets/flame.ogg");
    this.load.audio("croak", "assets/mutant_frog-1.ogg");
    this.load.audio("winner", "assets/frogWin.wav");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.launch('winScene');
    this.scene.sleep("winScene");
    this.scene.launch('store');
    this.scene.sleep('store');
    this.scene.launch('news');
    this.scene.sleep('news');
    this.scene.launch('MainScene');
    this.scene.bringToTop('MainScene');

    
  }
}
