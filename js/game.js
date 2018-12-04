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
     scene: [ Start, PlayGame, GameOver ]
 };
  let soundFX;
  let bg;
  let rule;
  let startButton;
  let playAgain;
  let cloud1;
  let assassins = Phaser.Physics.Arcade.Group;
  let player;
  let platforms;
  let stars;
  let tile1;
  let tiles;
  let cursors;
  let score = 0;
  let highScore = 0;
  let scoreText;
  let timer = 0;
  let iter = 0;
  let gameOver = false;
  let gameOverText;
  let gameOverScoreText;
  let highScoreText;

let game = new Phaser.Game(config);
