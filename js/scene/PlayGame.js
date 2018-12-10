 class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
    this.load.audio('gameAudio', ['assets/audio/game.mp3']);
    this.load.image('background', 'assets/background.png');
    this.load.image('cloud1', 'assets/Export/cloud1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('platforms', 'assets/Export/tile_3.png');
    this.load.image('p1', 'assets/Export/tile_3.png');
    this.load.image('p2', 'assets/Export/tile.png');


    // this.load.image('test', 'assets/Export/cloud2.png');
    this.load.spritesheet('dude','assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

create () {

  ///=========================AUDIO=======================///
    // soundFX = this.sound.add("gameAudio", { loop: "true"});
    // soundFX.play();

  ///=========================SKY=======================///
    bg = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2.3);

    cloud1 = this.add.tileSprite(600, 200, 2500, 2000, 'cloud1').setScale(1);



    ///=========================Tiles=======================///
//
    p1 = this.add.tileSprite(100, 1100, 4000, 2000, 'p1').setScale(0.5);


    platforms = this.physics.add.group({
      key: 'platforms',
      frameQuantity: 1,
      repeat: true,
      setXY: { x: 600, y: 500, stepX: 400},
      velocityX: -100,
      immovable: false
    });
    // platforms.getChildren()[0].setFrictionX(1.5);
    // platforms.getChildren()[1].setFrictionX(1);
    // platforms.getChildren()[2].setFrictionX(0.5);
    // platforms.getChildren()[3].setFrictionX(0);



    ///=========================Ground=======================///
    ground = this.physics.add.staticGroup();
    ground.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();



    ///=========================Player=======================///
      player = this.physics.add.sprite(100, 450, 'dude');
      player.setBounce(0.2);
      player.body.setCollideWorldBounds(true);
      player.flipX = true;
      player.body.setGravityY(500);
      player.setScale(1.5);

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
      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      });


     stars = this.physics.add.group({
       key: 'star',
       sprite: (200, 200),
       repeat: 11,
       setXY: { x: 12, y: 0, stepX: 70}
     });


     stars.children.iterate(function (child){
       child.setBounceX(Phaser.Math.FloatBetween(0.1, 0.4));
     });


     // ========= code work (tile) from bomb example part (1-2)========
     tiles = this.physics.add.group();

     ///========================= Score =======================///
     scoreText = this.add.text(20, 20, 'score: ' + score, { fontSize: '20px Arial', fill: '#fff', backgroundColor: 'black'});

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();

     this.physics.add.collider(player, ground);

     this.physics.add.overlap(player, stars, this.collectStar, null, this);
     this.physics.add.collider(player, platforms, this.hitTile, null, this);



     // this.physics.add.collider(stars, platforms);
     this.physics.add.collider(stars, ground);



    this.physics.add.collider(platforms, ground);


    this.physics.add.collider(p1, ground);
    this.physics.add.collider(p1, platforms);
    this.physics.add.collider(p1, player);
    this.physics.add.collider(p1, stars);

}

update ( time, delta) {
  if(gameOver) {
    this.scene.start('GameOver');
  }

  //========================= Animated Background =======================///
  bg.tilePositionX += 1.5;
  cloud1.tilePositionX  += 1;
  p1.tilePositionX  += 1;
  platforms.tilePositionX  += 1;

  ///========================= Collider =======================///
    if (cursors.right.isDown)  {
        player.anims.play('right', true);
        player.x += 100 * (delta / 330);
    } else if(cursors.left.isDown) {
        player.anims.play('left', true);
        player.x += -100 * (delta /330);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down)
       {  player.setVelocityY (-1000);    }
}

collectStar (player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
  stars.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
  });

  ///=========================Tiles=======================///

// ========= code work (tile) from bomb example part (2-2)========
    let y = (player.y < -100) ? Phaser.Math.Between(100, 200) : Phaser.Math.Between(600, 600);
    tile1 = tiles.create(y, 16, "p1");
    // tile1.setBounce(1);
    // tile1.setCollideWorldBounds(true);
    tile1.setVelocity(Phaser.Math.Between(-100, 0), -200);
    tile1.allowGravity = false;
    this.physics.add.collider(tile1, ground);

  }
}


 hitTile (player, platforms) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('right');
  gameOver = true;
}
}
