let config = {
     type: Phaser.AUTO,
     width: window.innerWidth,
     height: window.innerHeight,
     physics: {
       default: 'arcade',
       arcade: {
         gravity: { y: 200 },
         debug: false
       }
     },
     parent: 'phaser-example',
     scene: [ Start, PlayGame, GameOver ],
     title: 'Webup runner Game',
     pixerlArt: false
 };
  let soundFX;
  let bg;
  let rule;
  let ruleDescription;
  let startButton;
  let level1;
  var controls;
  var map;
  var rockLayer;
  var waterLayer;
  var platformLayer;
  let platformLayer2
  var stuffLayer;
  var tileInfoText;
  let bush;
  let arrow;

  let playAgain;
  let cloud1;
  let assassins = Phaser.Physics.Arcade.Group;
  let player;
  let platforms;
  let p1;
  let ground;
  let stars;
  let tile1;
  let tiles;
  let cursors;
  let score = 0;
  let highScore = 0;
  let scoreText;
  let timer = 0;
  let gameOver = false;
  let gameOverText;
  let gameOverScoreText;
  let highScoreText;

let game = new Phaser.Game(config);



let gameOptions = {
     // platform speed range, in pixels per second
    platformSpeedRange: [300, 300],

    // player jump force
    jumpForce: 400,

    // consecutive jumps allowed
    jumps: 2,
}
