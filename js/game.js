let config = {
     type: Phaser.AUTO,

     width: window.innerWidth,
     height: window.innerHeight,
     physics: {
       default: 'arcade',
       arcade: {
         gravity: { y: 300 },
         debug: false
       }
     },
     scene: {
       preload: preload,
       create: create,
       update: update
     }
 };

var game = new Phaser.Game(config);

function preload () {
   this.load.image('sky', 'assets/sky4.png');
   this.load.image('ground', 'assets/platform.png');
   this.load.spritesheet('dude','assets/dude.png',
    { frameWidth: 32, frameHeight: 48 });
}
var platforms;

function create () {
  ///=========================SKY=======================///

  this.add.image(window.innerWidth/2, window.innerHeight/2, 'sky').setScale(2.5);

  ///=========================Player=======================///
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.flipX = true;
    player.body.setGravityY(300);

    this.anims.create({
     key: 'right',
     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
     frameRate: 10,
     repeat: -1
    });
   ///=========================Ground=======================///

   platforms = this.physics.add.staticGroup();
   platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();

 }



function update () {

  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.right.isDown) {
      player.setVelocityX(100);
      player.anims.play('right', true);
      // player.anims.play('left', false);
  }
  // else if (cursors.right.isDown) {
  //     player.setVelocityX(160);
  //     player.anims.play('right', true);
  // }
  // else {
  //     player.setVelocityX(0);
  //     player.anims.play('turn');
  // }
  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }
}
