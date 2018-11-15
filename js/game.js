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
   this.load.image('background', 'assets/background.png');
   this.load.image('ground', 'assets/platform.png');
   this.load.spritesheet('dude','assets/dude.png',
    { frameWidth: 32, frameHeight: 48 });
}
var platforms;

function create () {
  ///=========================SKY=======================///

  this.add.image(window.innerWidth/2, window.innerHeight/2, 'background').setScale(2);

  ///=========================Player=======================///
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.flipX = true;
    player.body.setGravityY(500);

    this.anims.create({
     key: 'right',
     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
     frameRate: 10,
     repeat: -1
    });
   ///=========================Ground=======================///

   platforms = this.physics.add.staticGroup();
   platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();


   // Store the score in a variable, initialized at 0
   this.score = 0;

   // The style of the text
   let style = { font: '20px Arial', fill: '#fff', backgroundColor: 'black'};

   // Display the score in the top left corner
   // Parameters: x position, y position, text, style
   this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
 }



function update () {
  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.right.isDown) {

      player.anims.play('right', true);
      player.x += 3;

  }else if(!cursors.left.isDown){
      player.anims.play('right', false);
  }
  // else if (cursors.right.isDown) {
  //     player.setVelocityX(160);
  //     player.anims.play('right', true);
  // }
  // else {
  //     player.setVelocityX(0);
  //     player.anims.play('turn');
  // }
  if (cursors.up.isDown || cursors.space.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);

  }
}
