export default class Dragon extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
    }
}
