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
     scene: [ Start, PlayGame ]
 };
  let soundFX;
  let bg;
  let startButton;
  let cloud1;
  let player;
  let platforms;
  let cursors;
  let score = 0;
  let scoreText;
  let timer = 0;
  let iter = 0;

let game = new Phaser.Game(config);
