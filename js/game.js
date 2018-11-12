//Create a new Game Scene
let gameScene = new Phaser.Scene('Game');


// load assets
gameScene.preload = function(){
  //the name can be anything, then the path name of where that asset is found
  this.load.image('background', 'assets/background.png');
  this.load.image('background', 'assets/player.png');
};

//called once after the preload ends
gameScene.create = function(){
  this.add.sprite(0,0, 'background');
}
// set the configuration of the game
let config ={
  type:Phaser.Auto,
  width: 640,
  height: 360,
  scene: gameScene
};

//create a new game, pass the configuration
let game = new phaser.Game(config);
