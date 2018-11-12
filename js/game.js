//Create a new Game Scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config ={
  type:Phaser.Auto,
  width: 640,
  height: 360,
  scene: gameScene
};

//create a new game, pass the configuration
let game = new phaser.Game(config);
