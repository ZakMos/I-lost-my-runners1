 class PlayGame extends Phaser.Scene {
  constructor(){
    super({key: "PlayGame"});
  }


preload () {
    this.load.audio('gameAudio', ['assets/audio/game.mp3']);
    this.load.image('background', 'assets/background.png');
    this.load.image('cloud1', 'assets/Export/cloud1.png');
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
    // bg = this.add.tileSprite(0, 0,  'background').setScale(2);
    bg = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2.3);

    cloud1 = this.add.tileSprite(600, 200, 2500, 2000, 'cloud1').setScale(1);


    ///=========================Player=======================///
      player = this.physics.add.sprite(180, 450, 'dude');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.flipX = true;
      player.body.setGravityY(500);
      player.setScale(1.5)

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

     // platforms = this.physics.add.sprite(0,657, 1000, 30, 'ground').setScale(4);
     // platforms.setCollideWorldBounds(true);

     ///=========================Tiles=======================///
     tiles = this.physics.add.sprite(350, 460, 'tiles');
     tiles.setBounce(0.2);
     tiles.setCollideWorldBounds(true);
     tiles.body.setGravityY(500);
     tiles.setScale(0.4);
     console.log(tiles);

     // tiles = this.physics.add.staticGroup();
     // tiles.create(window.innerWidth/4, window.innerHeight, 'tile1').setScale(1).refreshBody();

     ///========================= Score =======================///
     // The style of the text
     let style = { font: '30px Arial', fill: '#000'};
     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(1275, 20, 'score: ' + score, style);

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();
     // this.input.on("pointermove", (pointer = Phaser.Input.Pointer) => {
     //    if(pointer.isDown){
     //      let tiles = this.add.sprite(pointer.x, pointer.y, 'tile1').play("hello");
     //        tiles.on("animationcomplete", ()=> {
     //          tile.destroy()
     //        })
     //    }
     // });
     //
   }

update ( time, delta) {

  function UpdateCollisions() {

      SolveAABBOverlap();
      SolvePolygonOverlap();
      SolveStaticAABBCollision();
      SolveStaticPolygonCollision();
      SolveDynamicAABBCollision();
      SolveDynamicPolygonCollision();

  }

  // Iterate score
  score += 0.04;
  scoreText.setText( 'score: '+ Math.floor(score));

  // Poll collisions
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(platforms, tiles);
  this.physics.add.collider(player, tiles);


  // platforms.tilePositionX = (iter) * -300;
  // Animate bg
  bg.tilePositionX = (iter) * -200;
  cloud1.tilePositionX = (iter) * -350;

  tiles.tilePositionX =(iter) * -200;

  // Defined in game.js
  iter -=0.01;
  // might be redundant we just need to play the anim
    if (cursors.right.isDown) {
        player.anims.play('right', true);
        player.x = player.x + 64 * (delta / 1500);

    } else if(cursors.left.isDown){
        player.anims.play('left', true);
        player.x = player.x + -64 * (delta / 1500);
        //====== old code before 23-11-2018 =====
    // } else if (cursors.left.isDown) {
    //     player.setVelocityX(160);
    //     player.anims.play('left', true);
    // } else {
    //     player.setVelocityX(0);
    //     player.anims.play('turn');

    }
    // JUMP!
    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -400;    }

  };
}
