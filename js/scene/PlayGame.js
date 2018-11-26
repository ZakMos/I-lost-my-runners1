 class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
    this.load.audio('gameAudio', ['assets/audio/game.mp3']);
    this.load.image('background', 'assets/background.png');
    this.load.image('cloud1', 'assets/Export/cloud1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude','assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

create () {

  ///=========================AUDIO=======================///
  // soundFX = this.sound.add("gameAudio", { loop: "true"});
  // soundFX.play();

    ///=========================SKY=======================///
    // background = this.add.tileSprite(0, 0,  'background').setScale(2);
    bg = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2);

    cloud1 = this.add.tileSprite(600, 300, 2500, 1000, 'cloud1');


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
     // added new in 23-11-2018,, (Left side)
     this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

     ///=========================Ground=======================///
     platforms = this.physics.add.staticGroup();
     platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();

     ///========================= Score =======================///
     // The style of the text
     let style = { font: '20px Arial', fill: '#fff', backgroundColor: 'black'};
     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(20, 20, 'score: ' + score, style);

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();
   }

update () {
  bg.tilePositionX = (iter) * -400;
  cloud1.tilePositionX = (iter) * -400;
  iter -=0.01;
    this.physics.add.collider(player, platforms);
    if (cursors.right.isDown) {
        player.anims.play('right', true);
        player.x += 3;

    } else if(cursors.left.isDown){
        player.anims.play('left', true);
        player.x -= 3;
        //====== old code before 23-11-2018 =====
    // } else if (cursors.left.isDown) {
    //     player.setVelocityX(160);
    //     player.anims.play('left', true);
    // } else {
    //     player.setVelocityX(0);
    //     player.anims.play('turn');

    }
    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -330;    }

  };
}
