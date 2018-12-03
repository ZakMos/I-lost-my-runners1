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
    this.load.image('tiles', 'assets/Export/tile_2.png');
    // this.load.image('test', 'assets/Export/cloud2.png');
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

    ///=========================Ground=======================///
     //      platforms = this.physics.add.sprite(window.innerWidth, window.innerHeight, 'ground')
     //      platforms.setScale(2);
     //      platforms.body.setCollideWorldBounds(true);
     //
     // console.log(this.physics.add.staticGroup)
    // platforms.setScale(4);



    platforms = this.physics.add.staticGroup();
    platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();

///=========================Player=======================///
      player = this.physics.add.sprite(100, 450, 'dude');
      player.setBounce(0.2);
      player.body.setCollideWorldBounds(true);
      player.flipX = true;
      player.body.setGravityY(500);
      player.setScale(1.5)
      // player.body.immovable = true;
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


     ///=========================Tiles=======================///
     // tiles = this.physics.add.group((200, 602, 'tile1'){

     stars = this.physics.add.group({
       key: 'star',
       sprite: (200, 200),
       repeat: 2,
       setXY: { x: 12, y: 0, stepX: 70}
     });


     stars.children.iterate(function (child){
       child.setBounceX(Phaser.Math.FloatBetween(0.1, 0.4));
     });


     tiles = this.physics.add.group();

     // tiles = this.physics.add.staticGroup();
     // tiles.create(window.innerWidth/4, window.innerHeight, 'tile1').setScale(1).refreshBody();

     ///========================= Score =======================///
     // The style of the text
     // Display the score in the top left corner
     // Parameters: x position, y position, text, style
     scoreText = this.add.text(20, 20, 'score: ' + score, { fontSize: '20px Arial', fill: '#fff', backgroundColor: 'black'});

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




     this.physics.add.collider(player, platforms);
     this.physics.add.collider(stars, platforms);
     this.physics.add.collider(tiles, platforms);
     this.physics.add.overlap(player, stars, this.collectStar, null, this);
     this.physics.add.collider(player, tiles, this.hitTile, null, this);
}

// makeTiles() {
//   let wallHeight = this.physics.rnd.integerInRange(2, 6);
//   for (let i = 0; i < wallHeight; i++){
//     let tile = this.physics.add.srpite(0, -i * 25, "tile1");
//     tiles.add(tile);
//   }
// }



update ( time, delta) {
  if(gameOver) {
    this.scene.start('GameOver');
  }

  ///========================= Animated Background =======================///
  bg.tilePositionX = (iter) * -400;
  cloud1.tilePositionX = (iter) * -400;
  iter -=0.01;

  ///========================= Collider =======================///
    if (cursors.right.isDown)  {
        player.anims.play('right', true);
        player.x += 100 * (delta / 1500);
    } else if(cursors.left.isDown) {
        player.anims.play('left', true);
        player.x += -100 * (delta / 1500);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down)
       {  player.setVelocityY (-600);    }

}

collectStar (player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
  stars.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
  });

    let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    tile1 = tiles.create(x, 16, "tiles");
    tile1.setBounce(1);
    tile1.setCollideWorldBounds(true);
    tile1.setVelocity(Phaser.Math.Between(-200, 200), 20);
    tile1.allowGravity = false;
  }
}


 hitTile (player, tile1) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('right');
  gameOver = true;
}
}
