class PlayGame extends Phaser.Scene{
  constructor(){
    super({key: "PlayGame"});
  }
preload () {
  this.load.image('background', 'assets/background.png', "assets");
  this.load.image('ground', 'assets/platform.png');
  this.load.spritesheet('dude','assets/dude.png',
    { frameWidth: 32, frameHeight: 48 });
}

// let platforms;
create () {
  ///=========================Background=======================///

  let background = this.add.sprite(0, 0, 'background');

  ///=========================Player=======================///
  let player = this.physics.add.sprite(100, 450, 'dude');
  console.log(player);
    this.player.setBounce(0.2);
    console.log(setBounce);
    this.player.setCollideWorldBounds(true);
    this.player.flipX = true;
    this.player.body.setGravityY(300);

    this.anims.create({
     key: 'right',
     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
     frameRate: 10,
     repeat: -1
   }), this;

   ///=========================Ground=======================///
  let platforms;
  this.platforms = this.physics.add.staticGroup();
  this.platforms.create(window.innerWidth/2, window.innerHeight, 'ground').setScale(4).refreshBody();
 }

update () {

  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play('right', true);
  }
  if (cursors.space.isDown || cursors.up.isDown && player.body.touching.down)
  {
      this.player.setVelocityY(-330);
  }
}
}






    // mvback = this.add.sprite(0, 400, 'background', './assets/Export/cloud3.png');
    // mvback.setScale(0.5, 0.5);

    // animation
    // let frameNames = this.anims.generateFrameNames('background', { start: 1, end: 8, zeroPad: 4, prefix:'background/', suffix:'.png' });
    // this.anims.create({ key: 'background', frames: frameNames, frameRate: 10, repeat: -1 });
    // mvback.anims.play('background');



  // this.add.image(window.innerWidth/2, window.innerHeight/2, 'background').setScale(2.5);




// ===== update ====
// else if (cursors.right.isDown) {
//     player.setVelocityX(160);
//     player.anims.play('right', true);
// }
// else {
//     player.setVelocityX(0);
//     player.anims.play('turn');
// }
