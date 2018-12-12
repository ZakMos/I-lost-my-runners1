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

    this.load.image('newPlatform', 'assets/kenny_platformer_64x64.png');
    this.load.tilemapTiledJSON('map', 'assets/multiple-layers.json');

    this.load.spritesheet('player','assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

create () {

  ///=========================AUDIO=======================///
    // soundFX = this.sound.add("gameAudio", { loop: "true"});
    // soundFX.play();

  ///=========================SKY=======================///
    bg = this.add.tileSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2, 'background').setScale(2.3)

    cloud1 = this.add.tileSprite(600, 300, 2500, 2000, 'cloud1').setScale(1);

    // ground = this.physics.add.staticGroup();
    // ground.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();

    map = this.make.tilemap({
      key: 'map'
    });

    let tiles       = map.addTilesetImage('newPlatform');
    rockLayer       = map.createStaticLayer('RockLayer', tiles, 0, -1090);
    waterLayer      = map.createStaticLayer('WaterLayer', tiles, 0, -1090);
    bush            = map.createStaticLayer('bush', tiles, 0, -1090);
    arrow           = map.createStaticLayer('arrow', tiles, 0, -1090);
    platformLayer   =
        [map.createStaticLayer('PlatformLayer', tiles, 0, -1090),
        map.createStaticLayer('PlatformLayer', tiles, 0, -1090)]




    // platformLayer   = map.createStaticLayer('PlatformLayer', tiles, 0, -1090);
    //
    //
    // platformLayer2   = map.createStaticLayer('PlatformLayer2', tiles, 2000, -325);


    // keeping track of added platforms
    this.addedPlatforms = 0;
    // group with all active platforms.
        this.platformGroup = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(platformLayer){
                platformLayer.scene.platformPool.add(platformLayer, arrow, bush, waterLayer, rockLayer)
            }
        });
     // platform pool
      this.platformPool = this.add.group({
          // once a platform is removed from the pool, it's added to the active platforms group
          removeCallback: function(platformLayer){
              platformLayer.scene.platformGroup.add(platformLayer)
          }
      });

    // number of consecutive jumps made by the player so far
    this.playerJumps = 0;
    // this.physics.add.existing(platformLayer);
    // platformLayer.body.setImmovable(true);
    // platformLayer.body.setVelocityX(Phaser.Math.Between(-100, -200));
    // this.platformGroup.add(platformLayer);

    // platformLayer = this.physics.add.staticGroup();
    // platformLayermap.createStaticLayer(window.innerWidth/2, window.innerHeight, 'PlatformLayer', tiles).setScale(4).refreshBody();

    // stuffLayer = map.createStaticLayer('StuffLayer', tiles, 0, 100);

    // platformLayer.setCollisionBetween(1, 50);
    arrow.setCollisionBetween(1, 50);
    waterLayer.setCollisionBetween(1, 50);

    ///=========================Tiles=======================///

    // p1 = this.add.tileSprite(100, 1100, 4000, 2000, 'p1').setScale(0.5);

    // platforms = this.physics.add.group({
    //   key: 'platforms',
    //   frameQuantity: 1,
    //   repeat: +20,
    //   setXY: { x: 600, y: 500, stepX: 400},
    //   velocityX: -100,
    //   immovable: false
    // });
    // platforms.getChildren()[0].setFrictionX(1.5);
    // platforms.getChildren()[1].setFrictionX(1);
    // platforms.getChildren()[2].setFrictionX(0.5);
    // platforms.getChildren()[3].setFrictionX(0);

    ///=========================Ground=======================///

    ///=========================Player=======================///
      player = this.physics.add.sprite(100, 450, 'player');
      player.body.setCollideWorldBounds(true);
      player.flipX = true;
      player.body.setGravityY(500);
      player.setScale(1.5);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, 0);

      this.anims.create({
         key: 'run',
         frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
         frameRate: 10,
         repeat: -1
        });
      // added new in 23-11-2018,, (Left side)
      // this.anims.create({
      //   key: 'up',
      //   frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      //   frameRate: 10,
      //   repeat: -1
      //   });

      player.anims.play("run");
      // this.anims.create({
      //   key: 'turn',
      //   frames: [ { key: 'player', frame: 4 } ],
      //   frameRate: 20
      // });

     // stars = this.physics.add.group({
     //   key: 'star',
     //   sprite: (200, 200),
     //   repeat: 11,
     //   setXY: { x: 12, y: 0, stepX: 70}
     // });


     // stars.children.iterate(function (child){
     //   child.setBounceX(Phaser.Math.FloatBetween(0.1, 0.4));
     // });


     // ========= code work (tile) from bomb example part (1-2)========
     // tiles = this.physics.add.group();

     ///========================= Score =======================///
     scoreText = this.add.text(20, 20, 'score: ' + score, { fontSize: '20px Arial', fill: '#fff', backgroundColor: 'black'});
     scoreText.fixedToCameras = true;
     this.cameras.main.startFollow(player);

     ///========================= Cursors =======================///
     cursors = this.input.keyboard.createCursorKeys();

     function onGround() {
        if (player) {
            player.anims.play("run");
        }
      }

     // this.physics.add.collider(player, platformLayer, this.arrow, null, this);
     // console.log(this.physics.add.collider);
     // console.log(this.physics.arcade.collide);

     this.physics.add.collider(player, platformLayer,this.onGround,null,this);

     // this.physics.add.collider(player, ground, platformLayer);
     // this.physics.add.collider(player, platformLayer);
     // this.physics.add.collider(player, arrow);
     // this.physics.add.collider(player, waterLayer);

     // this.physics.add.overlap(player, stars, this.collectStar, null, this);
     // this.physics.add.collider(player, platforms, this.hitTile, null, this);
     // this.physics.add.collider(player, tile1, this.hitTile, null, this);
     // this.physics.add.collider(stars, platforms);
     // this.physics.add.collider(stars, ground);
    // this.physics.add.collider(platforms, ground);

}

update ( time, delta) {
  if(gameOver) {
    this.scene.start('GameOver');
  }

  //====================-===== Animated Background =======================///
  bg.tilePositionX += 1.5;
  cloud1.tilePositionX  += 1;
  platformLayer.tilePositionX += 1;
  // p1.tilePositionX  += 1;
  // platforms.tilePositionX  += 1;

  ///========================= Collider =======================///
//         if(this.cursors.right.isDown){
//               player.anims.play('run', true);
//               player.body.setVelocityX(500);
//           }
//           else{
//               if(player.body.onFloor()){
//                   player.play('jumping');
//               }
//               player.body.setVelocityX(0);
//           }
//           if(this.cursors.up.isDown && player.body.onFloor()&& player.play('run', true)){
//               player.body.setVelocityY(-600);
//           }
//
// }


    if (cursors.right.isDown)  {
      player.anims.play('run', true);
      // player.body.setVelocityX(200);
        player.x += 90 * (delta / 400);
        score += 1;
        scoreText.setText('Score: ' + score);
        player.body.setCollideWorldBounds(false);
    } else { if (player.body.onFloor()) {
          player.anims.play('run', true);
      }
      player.body.setVelocityX(0);
      player.anims.play('run', true);
      }
      if(cursors.up.isDown && player.body.onFloor()&& player.anims.play('run', true)){
          player.body.setVelocityY(-330);
          player.anims.play('run', true);
      }
}

  // else if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.platformLayer)
       // {
         // player.anims.play('up', true);
         // player.y -= 200 * (delta / 400);
       //   player.setVelocityY(-100);
       // }
     // } else {
    //     player.setVelocityX(0);
    //     player.anims.play('turn');
   // if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down)
   //     {  player.setVelocityY (-330);    }
// }

// collectStar (player, star) {
//   star.disableBody(true, true);
//   score += 10;
//   scoreText.setText('Score: ' + score);
//
//   if (stars.countActive(true) === 0) {
//   stars.children.iterate(function (child) {
//     child.enableBody(true, child.x, 0, true, true);
//   });

  ///=========================Tiles=======================///

// ========= code work (tile) from bomb example part (2-2)========
    // let y = (player.y < -100) ? Phaser.Math.Between(100, 200) : Phaser.Math.Between(600, 600);
    // tile1 = tiles.create(y, 16, "p1");
    // // tile1.setBounce(1);
    // // tile1.setCollideWorldBounds(true);
    // tile1.setVelocity(Phaser.Math.Between(-100, 0), -200);
    // tile1.repeat = -10;
    // tile1.allowGravity = false;
    // this.physics.add.collider(tile1, ground);
    // this.physics.add.collider(tile1, player);
  // }
// }


//  hitTile (player, tile1, platforms) {
//   this.physics.pause();
//   player.setTint(0xff0000);
//   player.anims.play('right');
//   gameOver = true;
// }
}


//     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
//     tileInfoText = this.add.text(16, 16, '', {
//         fontSize: '18px',
//         padding: { x: 10, y: 5 },
//         backgroundColor: '#000000',
//         fill: '#ffffff'
//     });
//     tileInfoText.setScrollFactor(0);
//
//     var cursors = this.input.keyboard.createCursorKeys();
//     var controlConfig = {
//         camera: this.cameras.main,
//         left: cursors.left,
//         right: cursors.right,
//         up: cursors.up,
//         down: cursors.down,
//         speed: 0.5
//     };
//     controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
// }
//
// function update (time, delta)
// {
//     controls.update(delta);
//
//     var cam = this.cameras.main;
//     var worldPoint = this.input.activePointer.positionToCamera(cam);
//
//     var mapHasTile = map.hasTileAtWorldXY(worldPoint.x, worldPoint.y);
//     var platformLayerHasTile = platformLayer.hasTileAtWorldXY(worldPoint.x, worldPoint.y);
//
//     // If you want to use the map and be specific, the last parameter is a layer id. All of the
//     // following are valid ways to get something from the rock layer:
//     //  map.hasTileAtWorldXY(worldPoint.x, worldPoint.y, cam, rockLayer)
//     //  map.hasTileAtWorldXY(worldPoint.x, worldPoint.y, cam, 'Rock Layer')
//     //  map.hasTileAtWorldXY(worldPoint.x, worldPoint.y, cam, 0)
//
//     tileInfoText.setText(
//         'Press 1/2/3/4 to change the map\'s selected layer' +
//         '\nMap\'s selected layer: ' + (map.layer.name) +
//         '\nMap hasTileAt pointer: ' + (mapHasTile ? 'yes' : 'no') +
//         '\nPlatform layer hasTileAt pointer: ' + (platformLayerHasTile ? 'yes' : 'no')
//     );
//
// }
//
// function selectLayer (layer)
// {
//     // You can use map.setLayer(...) or map.layer. Either can be set using a layer name, layer
//     // index, StaticTilemapLayer/DynamicTilemapLayer.
//     map.setLayer(layer);
//
//     rockLayer.alpha = 0.5;
//     waterLayer.alpha = 0.5;
//     platformLayer.alpha = 0.5;
//     stuffLayer.alpha = 0.5;
//
//     layer.alpha = 1;
// }
