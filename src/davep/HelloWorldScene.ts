import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
  //private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private map?: Phaser.Tilemaps.Tilemap;
  private groundLayer?: Phaser.Tilemaps.TilemapLayer;
  constructor() {
    super('hello-world')
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.tilemapTiledJSON('map', 'assets/daves.json');
    this.load.image('tiles', 'assets/buch-outdoor.png');
  }

  create() {
    this.add.image(400, 300, 'sky')
    this.map = this.make.tilemap({ key: 'map' });
    // tiles for the ground layer
    var groundTiles = this.map.addTilesetImage('outdoors', 'tiles');
    // create the ground layer
    this.groundLayer = this.map.createLayer('Platforms', groundTiles, 0, 200);
    // the player will collide with this layer
    this.groundLayer.setCollisionByExclusion([-1]);




    //this.platforms = this.physics.add.staticGroup()
    //const ground = this.platforms.create(400, 500, 'ground') as Phaser.Physics.Arcade.Sprite
    //ground.setScale(2).refreshBody()

    this.player = this.physics.add.sprite(100, 350, 'dude');
    ///this.physics.add.collider(this.player, this.platforms);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.cameras.main.startFollow(this.player);
    //this.cameras.main.setBackgroundColor('#ccccff');



    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

  }

  update() {
    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-160);

      this.player?.anims.play('left', true);
    }
    else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(160);

      this.player?.anims.play('right', true);
    }
    else {
      this.player?.setVelocityX(0);

      this.player?.anims.play('turn');
    }

    if (this.cursors?.up.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330);
    }

  }
}