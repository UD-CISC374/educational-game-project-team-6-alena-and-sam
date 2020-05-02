export default class Arrow extends Phaser.GameObjects.Sprite {
    direction: number;

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number) {
        super(scene, x, y, 'arrow');
        scene.add.existing(this);
       // this.direction = direction;
    }
}
