let config = {
     type: Phaser.AUTO,
     width: window.innerWidth,
     height: window.innerHeight,
     physics: {
       default: 'arcade',
       arcade: {
         gravity: { y: 200 },
         debug: false
       }
     },
     scene: {
       preload: preload,
       create: create,
       update: update
     }
 };

let game = new Phaser.Game(config);

function preload () {
   this.load.image('sky', 'assets/sky4.png');
   this.load.image('ground', 'assets/platform.png');
   this.load.spritesheet('dude','assets/dude.png',
    { frameWidth: 32, frameHeight: 48 });
}

function create () {
  ///=========================SKY=======================///
  this.add.image(window.innerWidth/2, window.innerHeight/2, 'sky').setScale(2);

  ///=========================Player=======================///
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(1);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.anims.create({
     key: 'left',
     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
     frameRate: 10,
     repeat: -1
    });
    this.anims.create({
     key: 'turn',
     frames: [ { key: 'dude', frame: 4 } ],
     frameRate: 20
   });
    this.anims.create({
     key: 'right',
     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
     frameRate: 10,
     repeat: -1
    });
   ///=========================Ground=======================///

   platforms = this.physics.add.staticGroup();
   platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();
   platforms.body.inmovable = true;

   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.physics.arcade.enable([player, platforms])
   // platforms.setCollideWorldBounds(true);

 }


 // cursors = this.input.keyboard.createCursorKeys();

function update () {
  this.game.physics.arcade.collide(this.player, this.platforms);

  // this.physics.add.collider(player, platforms);

  // if (cursors.left.isDown) {
  //     player.setVelocityX(-160);
  //     player.anims.play('left', true);
  // }
  // else if (cursors.right.isDown) {
  //     player.setVelocityX(160);
  //     player.anims.play('right', true);
  // }
  // else {
  //     player.setVelocityX(0);
  //     player.anims.play('turn');
  // }
  // if (cursors.up.isDown && player.body.touching.down)
  // {
  //     player.setVelocityY(-330);
  // }
}
