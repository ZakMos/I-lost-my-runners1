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
     scene: [ Start, PlayGame ]
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
  let citybackground;
  let tiles;
  let cursors;
  let score = 0;
  let scoreText;
  let timer = 0;
  let iter = 0;
  let arrowRight;
  let arrowLeft;
  let building1;
  let building2;
  let building3;
  let building4;
  let building5;
  let building16;
  let speedFactor = 1;

  // let arrowUp;

let game = new Phaser.Game(config);
