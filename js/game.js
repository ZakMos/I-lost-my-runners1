let config = {
     type: Phaser.AUTO,
     width: window.innerWidth,
     height: window.innerHeight,
     physics: {
       default: 'arcade',
       arcade: {
         gravity: { y: 200 },
         debug: true
       }
     },
     parent: 'phaser-example',
     scene: [ Start, PlayGame, GameOver ]
 };
  let soundFX;
  let bg;
  let rule;
  let ruleDescription;
  let startButton;
  let cloud1;
  let player;
  let platforms;
  let obstacle;
  let cursors;
  let score = 0;
  let scoreText;
  let timer = 0;
  let iter = 0;
  let arrowRight;
  let arrowLeft;
  let speedFactor = 1;
  let gameOverText;
  let gameOverScoreText;
  let highScoreText;
  let playAgain;
  let hitTile;
  let gameOver;
  let highScore;
  // let arrowUp;

let game = new Phaser.Game(config);
