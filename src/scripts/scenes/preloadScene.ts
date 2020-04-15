export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
    this.load.image("dragon", "assets/images/dragon_boi.png");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene');
  }
}
