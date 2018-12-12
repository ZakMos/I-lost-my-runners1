 class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
    this.load.audio('gameAudio', ['assets/audio/game.mp3']);
    this.load.image('background', 'assets/Background/Sky.png');
    this.load.image('citybackground', 'assets/Background/citybackground2.png');
    // this.load.image('cloud1', 'assets/Export/cloud1.png');
    this.load.image('cloud1', 'assets/Background/cloud1.png');
    this.load.image('cloud2', 'assets/Background/cloud2.png');
    this.load.image('cloud3', 'assets/Background/cloud3.png');
    this.load.image('cloud4', 'assets/Background/cloud4.png');
    this.load.image('cloud5', 'assets/Background/cloud5.png');
    this.load.image('cloud6', 'assets/Background/cloud6.png');
    this.load.image('building1', 'assets/Background/building1.png');
    this.load.image('building2', 'assets/Background/building2.png');
    this.load.image('building3', 'assets/Background/building3.png');
    this.load.image('building4', 'assets/Background/building4.png');
    this.load.image('building5', 'assets/Background/building5.png');
    this.load.image('building6', 'assets/Background/building6.png');
    this.load.image('building7', 'assets/Background/building7.png');
    this.load.image('building8', 'assets/Background/building8.png');
    this.load.image('building9', 'assets/Background/building9.png');
    this.load.image('building10', 'assets/Background/building10.png');
    this.load.image('building11', 'assets/Background/building11.png');
    this.load.image('building12', 'assets/Background/building12.png');
    this.load.image('building13', 'assets/Background/building13.png');
    this.load.image('building14', 'assets/Background/building14.png');
    this.load.image('building15', 'assets/Background/building15.png');
    this.load.image('building16', 'assets/Background/building16.png');
    this.load.image('ground', 'assets/Background/floorcopy.png');
    this.load.image('tiles', 'assets/Export/tile_2.png');
    this.load.spritesheet('dude','assets/Running/runningsprite.png',
      { frameWidth: 627.5, frameHeight: 447 });
    this.load.image('small', 'assets/small.png');
    this.load.image('long', 'assets/long.png');
    this.load.image('high', 'assets/high.png');
  }

create () {
  ///=========================AUDIO=======================///
  // soundFX = this.sound.add("gameAudio", { loop: "true"});
  // soundFX.play();

    ///=========================SKY=======================///
    bg = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2.3);
    citybackground = this.add.sprite(window.innerWidth/2,window.innerHeight/2 + 25 , 'citybackground').setScale(0.85);
    cloud1 = this.add.tileSprite(0,0, 'cloud1').setScale(0.25);
    building1 = this.add.sprite(90, window.innerHeight/2 + 90 ,'building1').setScale(0.40);
    building2 = this.add.sprite(window.innerWidth/2 + 200, window.innerHeight/2 - 20 ,'building2').setScale(0.40);
    building3 = this.add.sprite(window.innerWidth/2 + 350, window.innerHeight/2 + 90 ,'building3').setScale(0.40);
    building4 = this.add.sprite(window.innerWidth/2 + 500, window.innerHeight/2 + 100 ,'building4').setScale(0.40);
    building5 = this.add.sprite(window.innerWidth/2 + 190, window.innerHeight/2 +150 ,'building5').setScale(0.5);
    building16 = this.add.sprite(window.innerWidth/2, window.innerHeight/2 + 175 ,'building16').setScale(0.5);

    ///=========================Player=======================///
      player = this.physics.add.sprite(window.innerWidth / 3, window.innerHeight - 170, 'dude');
      player.setCollideWorldBounds(true);
      player.body.setGravityY(300);
      player.setScale(0.25)

      this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 17 }),
       frameRate: 9,
       repeat: -1
     });


     ///=========================Ground=======================///
     platforms = this.physics.add.staticGroup();
     platforms.create(window.innerWidth/2, window.innerHeight -45 , 'ground').setScale(0.45).refreshBody();



     ///=========================Obstacle=======================///


     this.makeObstacle();


     ///========================= Score =======================///

     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(50, 20, 'score: ' + score, { font: '30px Arial', fill: '#000'});

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();

   }

update ( time, delta) {
  score = parseFloat((score + 0.04).toFixed(2));
  scoreText.setText( 'score: '+ Math.floor(score));
  if (score % 25 === 0){
    speedFactor += 0.25
  }
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(platforms, obstacle);
  this.physics.add.collider(player, obstacle, this.gameOver, null, this);

  bg.tilePositionX += 2 * speedFactor;
  cloud1.tilePositionX += 1 * speedFactor;
  obstacle.x -= 4 * speedFactor;

  if(obstacle.x < -50) {
    this.makeObstacle()
  }

  player.anims.play('right', true);

    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -450;    }

  };

  makeObstacle(){
    const obstacleArray = [
      {
        name: "small",
        height: 115
      },
      {
        name: "long",
        height: 115
      },
      {
        name: "high",
        height: 140
      }
    ]

    const chosen = obstacleArray[Phaser.Math.Between(0, obstacleArray.length -1)];

    obstacle = this.physics.add.sprite(window.innerWidth, window.innerHeight - chosen.height, chosen.name );
  }

  gameOver(){
    speedFactor = 1;
    this.scene.pause();
    // this.scene.start('GameOver');
  }
}
