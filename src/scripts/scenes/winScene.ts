import MainScene from "./mainScene";


export default class winScene extends Phaser.Scene {

    private background;
    private Frog1;
    private Frog2;
    private Frog3;
    private Frog4;
    private Frog5;

    constructor() {
        super({ key: 'winScene' });
    }



    create() {
        this.background = this.add.image(0, 0, "winner");
        this.background.setOrigin(0, 0);
        this.background.scale = 1.3;

        this.anims.create({
            key: "frogHop",
            frames: this.anims.generateFrameNumbers("frog1", {start:0, end: 2}), 
            frameRate: 3, 
            repeat: -1
        });
    
        this.anims.create({
            key: "frogHop2",
            frames: this.anims.generateFrameNumbers("frog2", {start:0, end: 2}), 
            frameRate: 3, 
            repeat: -1
            });
        
        this.anims.create({
            key: "frogHop3",
            frames: this.anims.generateFrameNumbers("frog3", {start:0, end: 2}), 
            frameRate: 3, 
            repeat: -1
        });
        this.anims.create({
            key: "frogHop4",
            frames: this.anims.generateFrameNumbers("frog4", {start:0, end: 2}), 
            frameRate: 3, 
            repeat: -1
        });
    
        this.anims.create({
            key: "frogHop5",
            frames: this.anims.generateFrameNumbers("frog5", {start:0, end: 2}), 
            frameRate: 3, 
            repeat: -1
        });


    this.Frog1 = this.add.sprite(this.scale.width-40 , this.scale.height-40, "frog1");
    this.Frog1.setScale(3, 3);
    this.Frog1.play("frogHop")

    this.Frog2 = this.add.sprite(this.scale.width-90 , this.scale.height-40, "frog2");
    this.Frog2.setScale(3, 3);
    this.Frog2.play("frogHop2")

    this.Frog3 = this.add.sprite(this.scale.width-140 , this.scale.height-40, "frog3");
    this.Frog3.setScale(3, 3);
    this.Frog3.play("frogHop3")

    this.Frog4 = this.add.sprite(this.scale.width-190 , this.scale.height-40, "frog4");
    this.Frog4.setScale(4, 4);
    this.Frog4.play("frogHop4")

    this.Frog5 = this.add.sprite(this.scale.width-240 , this.scale.height-40, "frog5");
    this.Frog5.setScale(1, 1);
    this.Frog5.play("frogHop5")

    }


    update() {
        
    }
}