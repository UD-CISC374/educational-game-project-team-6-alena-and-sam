export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
    this.load.image("dragon", "assets/images/dragon_boi.png");
    this.load.spritesheet("arrow", "assets/arrow_button_idle.png", {frameWidth: 637, frameHeight:308});
    this.load.image("cave", "assets/fossil_cave.jpg");
    this.load.image("day", "assets/moon_sun_star.png");
    this.load.image("jesterFrog", "assets/jester frog.PNG");
    this.load.spritesheet("coin", "assets/01coin.png", {frameWidth: 120, frameHeight: 120});
    this.load.image("frogStore", "assets/FrogStore.png");
    this.load.image("news", "assets/NewsIcon.jpg");
    this.load.image("stockCrashNews", "assets/StockCrash.jpg");
    this.load.image("buyButton", "assets/BuyButton.png");
    this.load.image("buyButtonDown", "assets/BuyButtonDown.png");
    this.load.image("exitSign", "assets/ExitSign.png");
    this.load.image("sold", "assets/Sold.png");
    this.load.image("winner", "assets/Winner.png");
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
