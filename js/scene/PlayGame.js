class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
     this.load.image('background', 'assets/background.png');
     this.load.image('ground', 'assets/platform.png');
     this.load.spritesheet('dude','assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

create () {
    ///=========================SKY=======================///
    background = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2);

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

     ///========================= Score =======================///
     // Store the score in a variable, initialized at 0
     // // The style of the text
     let style = { font: '20px Arial', fill: '#fff', backgroundColor: 'black'};
     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(20, 20, 'score: ' + score, style);

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();
   }

update () {
  background.tilePositionX = (iter) * -800;
  iter -=0.01;
    this.physics.add.collider(player, platforms);
    if (cursors.right.isDown) {
        player.anims.play('right', true);
        player.x += 3;

    } else if(!cursors.left.isDown){
        player.anims.play('right', false);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -330;    }

  };
}
