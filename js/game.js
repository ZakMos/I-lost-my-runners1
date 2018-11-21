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
     scene: [ Start, PlayGame ]
 };

let game = new Phaser.Game(config);
