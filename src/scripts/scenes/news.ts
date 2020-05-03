export default class news extends Phaser.Scene {

    private background;
    private backButton;

    constructor() {
        super({ key: 'news' });
    }



    create() {
        this.scene.bringToTop();
        this.background = this.add.image(this.scale.width/6, 0, "stockCrashNews");
        this.add.text(20, 20, "News Placeholder - This Information Is Inaccurate");
        this.background.setOrigin(0, 0);
        this.background.scale = 1.3;
        
        this.backButton = this.add.image(60, 350, "arrow");
        this.backButton.scale = 0.17;
        this.backButton.angle = 180;
        this.backButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.goMain(this, this.backButton) );
    }

    update() {

    }

    goMain(pointer, gameObject){
        this.scene.sendToBack();
        //this.scene.launch('MainScene');
      }
}