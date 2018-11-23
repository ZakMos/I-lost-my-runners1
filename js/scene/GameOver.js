class GameOver extends Phaser.Scene{
  constructor(){
    super({key: "GameOver"});
  }
  preload(){
    this.load.audio('GameOverAudio', ['assets/gameOver.mp3'])
  }

  create(){
    this.soundFX = this.sound.add('GameOverAudio', { loop: 'true'});
  }
  update(){

  }
}
