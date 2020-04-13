export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");
  }

  create() {
    this.scene.start('MainScene');
  }
}
