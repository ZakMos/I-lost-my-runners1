 class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
    this.load.audio('gameAudio', ['assets/audio/game.mp3']);
    this.load.image('background', 'assets/background.png');
    this.load.image('cloud1', 'assets/Export/cloud-crop.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('tiles', 'assets/Export/tile_2.png');
    this.load.spritesheet('dude','assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

create () {


  ///=========================AUDIO=======================///
  // soundFX = this.sound.add("gameAudio", { loop: "true"});
  // soundFX.play();

    ///=========================SKY=======================///
    bg = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2.3);
console.log(window.innerWidth)
    cloud1 = this.add.tileSprite(247/2 + 50, 100, window.innerWidth * 2, window.innerHeight / 2, 'cloud1').setScale(1);


    ///=========================Player=======================///
      player = this.physics.add.sprite(window.innerWidth/3, window.innerHeight-170, 'dude');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(500);
      player.setScale(1.5)

      this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
       frameRate: 10,
       repeat: -1
     });


     ///=========================Ground=======================///
     platforms = this.physics.add.staticGroup();
     platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();


     ///=========================Tiles=======================///
     // tiles = this.physics.add.sprite(350, 460, 'tiles');
     // tiles.setBounce(0.2);
     // tiles.setCollideWorldBounds(true);
     // tiles.body.setGravityY(500);
     // tiles.setScale(0.4);
     // console.log(tiles);

     ///========================= Score =======================///
     // The style of the text
     let style = { font: '30px Arial', fill: '#000'};
     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(1275, 20, 'score: ' + score, style);

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();

   }

update ( time, delta) {

  score += 0.04;
  scoreText.setText( 'score: '+ Math.floor(score));


  this.physics.add.collider(player, platforms);
  // this.physics.add.collider(platforms, tiles);
  // this.physics.add.collider(player, tiles);

  bg.tilePositionX += 2;
  cloud1.tilePositionX += 1;

  // tiles.tilePositionX += 1;



  player.anims.play('right', true);

    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -400;    }

  };
}
