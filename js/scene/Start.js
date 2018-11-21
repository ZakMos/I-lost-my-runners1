class Start extends Phaser.Scene {

  constructor() {
    super({key: "Start"});
  }

  preload(){
    this.load.image('start', 'assets/startGame.gif');
  }

  create(){
    this.startButton= this.add.image(400,300,'start');
    this.startButton.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }
    onObjectClicked(pointer, gameObject){
      // console.log("blah")
      this.scene.scene.start('PlayGame');
      // console.log(this.scene.scene.start);
    }

  update(delta){

  }
}
