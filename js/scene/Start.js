class Start extends Phaser.Scene {

  constructor() {
    super({key: "Start"});
  }

  preload(){
    this.load.audio('startAudio', ['assets/startAudio.mp3']);
    this.load.image('bg', 'assets/back01.jpeg');
    this.load.image('start', 'assets/startGame.gif');
  }

  create(){
    soundFX = this.sound.add("startAudio", { loop: "true"});
    soundFX.play();



    this.bg = this.add.sprite(0,0, 'bg').setOrigin(0);
    this.bg.width=this.width;

    // startButton= this.add.sprite(this.world.centerX, this.world.centerY,'start');
    // console.log(this.game.world, "=====this world====")
    // console.log(this.game.worldToTileX, "=====this.game.world====")
    // console.log(this.game, "=====this.world====")


    // startButton.anchor.setTo(0.5);




    this.startButton= this.add.image(400,300,'start');
    this.startButton.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }
    onObjectClicked(e){
    this.scene.scene.start('PlayGame');
    if(soundFX.isPlaying) soundFX.pause();
    else soundFX.resume();
    }

  update(delta){

  }
}
