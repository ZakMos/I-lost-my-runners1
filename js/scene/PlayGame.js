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
    this.load.spritesheet('player','assets/Running/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('small', 'assets/small.png');
    this.load.image('long', 'assets/webup_logo1.png');
    this.load.image('high', 'assets/high.png');
  }

create () {
  ///=========================AUDIO=======================///
  // soundFX = this.sound.add("gameAudio", { loop: "true"});
  // soundFX.play();

    ///=========================SKY=======================///
    sky = this.add.tileSprite(width/2, height/2, width/2, height/2, 'sky').setScale(2.3);

    citybackground = this.add.tileSprite(width/2,height/2 , width * 1.20, height, 'citybackground').setScale(0.85);

    bg = this.add.tileSprite(width/2, height/2 +102, 0, 0, 'background').setScale(0.85);

  ///=========================Player=======================///
      player = this.physics.add.sprite(width / 10, height - 170, 'player');
      player.setCollideWorldBounds(true);
      player.body.setGravityY(300);
      player.setScale(3)

      this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
       frameRate: 15,
       repeat: -1
      });
      this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      });

     ///=========================Ground=======================///
    //  platforms = this.physics.add.sprite(width/2, height - 45, 'ground');
    //  platforms.setScale(0.45);
    //   platforms.setCollideWorldBounds(true);

     platforms = this.physics.add.staticGroup();
     platforms.create(width/2, height -45 , 'ground').setScale(0.45).refreshBody();

     ///=========================Obstacle=======================///
     this.makeObstacle();

     ///========================= Score =======================///
     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(20, 40, 'score: ' + score, { font: '30px Arial', fill: '#fff'});

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();
   }

update ( time, delta) {
  if(gameOver) {
     this.scene.start('GameOver');
   }

  score = parseFloat((score + 0.04).toFixed(2));
  scoreText.setText( 'score: '+ Math.floor(score));
  if (score % 15 === 0){
    speedFactor += 0.35
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
    } else if(cursors.up.isDown && player.anims.play('right', true)){
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

    obstacle = this.physics.add.sprite(width, height - chosen.height, chosen.name );
  }

  gameOver(){
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('right');
    gameOver = true;
    speedFactor = 1;
  }
}
