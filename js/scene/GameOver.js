class GameOver extends Phaser.Scene{
  constructor(){
    super({key: "GameOver"});
  }
  preload(){

    this.load.audio('GameOverAudio', ['assets/audio/gameOver.mp3']);
    this.load.image('playAgain', 'assets/playAgain.gif');
  }

  create(){
    // this.soundFX = this.sound.add('GameOverAudio', { loop: 'true'});
    gameOverText = this.add.text(window.innerWidth/2*0.93, 440, 'Game Over' ,  { font: '20px Arial', boundsAlignH: "center", fill: '#fff', backgroundColor: 'black'});



    playAgain = this.add.image(window.innerWidth/2,window.innerHeight/2,'playAgain').setScale(1);
    playAgain.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }
    onObjectClicked(e){
    this.scene.scene.start('PlayGame');
    gameOver = true;
    // if(soundFX.isPlaying) soundFX.pause();
    // else soundFX.resume();

  }


  update(){

  }
}
