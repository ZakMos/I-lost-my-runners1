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
  }

create () {


  ///=========================AUDIO=======================///
  // soundFX = this.sound.add("gameAudio", { loop: "true"});
  // soundFX.play();

    ///=========================SKY=======================///
    // bg = this.add.tileSprite(0, 0,  'background').setScale(2);
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
      player = this.physics.add.sprite(500, 450, 'dude');
      player.setCollideWorldBounds(true);
      player.body.setGravityY(500);
      player.setScale(0.25)

      this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 17 }),
       frameRate: 9,
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
     platforms.create(window.innerWidth/2, window.innerHeight -45 , 'ground').setScale(0.45).refreshBody();

     // platforms = this.physics.add.sprite(0,657, 1000, 30, 'ground').setScale(4);
     // platforms.setCollideWorldBounds(true);

     ///=========================Tiles=======================///
     tiles = this.physics.add.sprite(350, 460, 'tiles');
     tiles.setBounce(0.2);
     tiles.setCollideWorldBounds(true);
     tiles.body.setGravityY(500);
     tiles.setScale(0.4);


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

  score += 0.04;
  scoreText.setText( 'score: '+ Math.floor(score));


  this.physics.add.collider(player, platforms);
  this.physics.add.collider(platforms, tiles);
  this.physics.add.collider(player, tiles);


  // platforms.tilePositionX = (iter) * -300;

  bg.tilePositionX = (iter) * -200;
  cloud1.tilePositionX = (iter) * -350;

  tiles.tilePositionX =(iter) * -200;


  iter -=0.01;
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
    if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down && timer < 330)
       {  player.body.velocity.y = -450;    }

  };
}
