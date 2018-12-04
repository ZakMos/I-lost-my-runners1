class GameOver extends Phaser.Scene{
  constructor(){
    super({key: "GameOver"});
  }
  preload(){

    this.load.audio('GameOverAudio', ['assets/audio/gameOver.mp3']);
    this.load.image('playAgain', 'assets/playAgain.gif');
  }

  create(){
    this.soundFX = this.sound.add('GameOverAudio', { loop: 'true'});
    gameOverText = this.add.text(window.innerWidth/2*0.93, 440, 'Game Over' ,  { font: '20px Arial', boundsAlignH: "center", fill: '#fff'});

    gameOverScoreText = this.add.text(20, 40, 'Your Score: ' + score, {
      font: '25px Arial',
       fill: '#fff'
     });

    highScoreText = this.add.text(600, 40, 'HS: ' + highScore, {
            font: '25px Arial',
            fill: '#fff'
        });








    playAgain = this.add.image(window.innerWidth/2,window.innerHeight/2,'playAgain').setScale(1);
    // playAgain.anchor.set(0.5);
    // this.input.on('gameobjectdown', this.restartGame, this);
    playAgain.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }
    onObjectClicked(e){
    // restartGame () {
      this.onObjectClicked.tilesArray.length = 0;
      this.selectedArray.length = 0;
      this.state.start('PlayGame');
      // this.scene.scene.restart('PlayGame');
      // this.scene.scene.start('PlayGame');

    // if(soundFX.isPlaying) soundFX.pause();
    // else soundFX.resume();

  }




  update(){
    highScoreText.text = 'High Score: ' + localStorage.getItem("highScore");
      {
         if (score > localStorage.getItem("highScore"))
            {
                localStorage.setItem("highScore", score);
            }
        }

  }
}
