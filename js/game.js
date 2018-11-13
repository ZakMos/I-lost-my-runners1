var config = {
       type: Phaser.AUTO,
       width: 1200,
       height: 600,
       physics: {
           default: 'arcade',
           arcade: {
               gravity: { y: 200 }
           }
       },
       scene: {
           preload: preload,
           create: create
       }
   };

   var game = new Phaser.Game(config);

   function preload ()
   {
       // this.load.setBaseURL('http://labs.phaser.io');
       //

       this.load.image('sky', 'assets/sky4.png');
       this.load.image('logo', 'assets/slimeeyes.png');
       this.load.image('red', 'assets/bubble.png');

       // this.load.image('sky', 'assets/skies/sky4.png');
       // this.load.image('logo', 'assets/sprites/slimeeyes.png');
       // this.load.image('red', 'assets/particles/bubble.png');
       // this.load.image('background', 'assets/background.png');

   }

   function create ()
   {
      // this.add.image(400, 300, 'background');
       this.add.image(600, 300, 'sky');
       // sky.setScale(1,2);

       var particles = this.add.particles('red');

       var emitter = particles.createEmitter({
           speed: 100,
           scale: { start: 1, end: 0 },
           blendMode: 'ADD'
       });

       var logo = this.physics.add.image(300, 100, 'logo');

       logo.setVelocity(100, 200);
       logo.setBounce(1, 1);
       logo.setCollideWorldBounds(true);

       emitter.startFollow(logo);
   }


//Create a new Game Scene
// let gameScene = new Phaser.Scene('Game');
//
//
// // load Images
// gameScene.preload = function(){
//   //the name can be anything, then the path name of where that images is found
//   this.load.image('background', 'imgs/background.png');
//   this.load.image('background', 'imgs/player.png');
// };
//
// //called once after the preload ends
// gameScene.create = function(){
//   this.add.sprite(0,0, 'background');
// }
// // set the configuration of the game
// let config ={
//   type:Phaser.Auto,
//   width: 600,
//   height: 360,
//   margin: 0,
//   scene: gameScene
// };
//
// //create a new game, pass the configuration
// let game = new Phaser.Game(config);
