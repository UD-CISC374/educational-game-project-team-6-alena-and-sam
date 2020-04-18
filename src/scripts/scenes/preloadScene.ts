export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
    this.load.image("dragon", "assets/images/dragon_boi.png");
    this.load.spritesheet("arrow", "assets/arrow_button_idle.png", {frameWidth: 637, frameHeight:308});
    this.load.image("cave", "assets/fossil_cave.jpg");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene');
    
  }
}
