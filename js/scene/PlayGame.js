 class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
    this.load.audio('gameAudio', ['assets/audio/game.mp3']);
    this.load.image('sky', 'assets/Background/Sky.png');

    this.load.image('background', 'assets/Background/citybackground5.png');

    this.load.image('citybackground', 'assets/Background/citybackground2.png');

    this.load.image('ground', 'assets/Background/floorcopy1.png');
    this.load.spritesheet('player','assets/Running/runningsprite1.png',
      { frameWidth: 336, frameHeight: 447 });
    this.load.image('small', 'assets/small.png');
    this.load.image('long', 'assets/long2.png');
    this.load.image('high', 'assets/high1.png');
  }

create () {
  ///=========================AUDIO=======================///
  // soundFX = this.sound.add("gameAudio", { loop: "true"});
  // soundFX.play();

    ///=========================SKY=======================///
    sky = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'sky').setScale(2.3);

    citybackground = this.add.tileSprite(window.innerWidth/2,window.innerHeight/2 , window.innerWidth * 1.20, window.innerHeight, 'citybackground').setScale(0.85);

    bg = this.add.tileSprite(1100, 472, 0, 0, 'background').setScale(0.45);


    // building1 = this.add.tileSprite(90, window.innerHeight/2 +90, window.innerWidth * 2, window.innerHeight /2 ,'building1').setScale(1);
    // building2 = this.add.sprite(window.innerWidth/2 + 200, window.innerHeight/2 - 20 ,'building2').setScale(0.40);
    // building3 = this.add.sprite(window.innerWidth/2 + 350, window.innerHeight/2 + 90 ,'building3').setScale(0.40);
    // building4 = this.add.sprite(window.innerWidth/2 + 500, window.innerHeight/2 + 100 ,'building4').setScale(0.40);
    // building5 = this.add.sprite(window.innerWidth/2 + 190, window.innerHeight/2 +150 ,'building5').setScale(0.5);
    // building16 = this.add.sprite(window.innerWidth/2, window.innerHeight/2 + 175 ,'building16').setScale(0.5);

    ///=========================Player=======================///
      player = this.physics.add.sprite(window.innerWidth / 10, window.innerHeight - 170, 'player');
      player.setCollideWorldBounds(true);
      player.body.setGravityY(300);
      player.setScale(0.25)

      this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
       frameRate: 15,
       repeat: -1
     });
     this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 14 }),
      // frameRate: 15,
      // repeat: -1
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
  if(gameOver) {
     this.scene.start('GameOver');
   }


  score = parseFloat((score + 0.04).toFixed(2));
  scoreText.setText( 'score: '+ Math.floor(score));
  if (score % 25 === 0){
    speedFactor += 0.25
  }
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(platforms, obstacle);
  this.physics.add.collider(player, obstacle, this.gameOver, null, this);

  // animation
  citybackground.tilePositionX += 2 * speedFactor;
  bg.tilePositionX += 2 * speedFactor;
  obstacle.x -= 4 * speedFactor;


  if(obstacle.x < -50) {
    this.makeObstacle()
  }

  if(player.anims.play('right', true)){
        player.anims.play('right', true);

          }
  else if(cursors.up.isDown && player.anims.play('right', true)){
    player.anims.play('jump', true);

      player.anims.play('right', false)
       }

    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -450    }


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
    this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('right');
      gameOver = true;

    speedFactor = 1;
    // this.scene.pause();
    // this.scene.start('GameOver');
  }
}
