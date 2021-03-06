class GameOver extends Phaser.Scene{
  constructor(){
    super({key: "GameOver"});
  }
  preload(){

    this.load.audio('GameOverAudio', ['assets/audio/gameOver.mp3']);
    this.load.image('playAgain', 'assets/play-again.png');

  }

  create(){
    this.soundFX = this.sound.add('GameOverAudio', { loop: 'true'});
    gameOverText = this.add.text(width/2 -350, height/2 + 100, 'Game Over' ,  { font: '150px Arial', boundsAlignH: "center", fill: '#f00'});
    footerText = this.add.text(width/2 - 130, height/2 +365, '© 2020 Zakaria Moslim' ,  { font: '25px Arial', boundsAlignH: "center", fill: '#fff'});

    gameOverScoreText = this.add.text(20, 40, 'Your Score: ' + Math.floor(score), {
      font: '25px Arial',
       fill: '#fff'
     });

    highScoreText = this.add.text(width/1.3, 40, 'HS: ' + Math.floor(highScore), {
            font: '25px Arial',
            fill: '#fff'
        });

    playAgain = this.add.image(width/2,height/2,'playAgain').setScale(1);
    playAgain.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }

    onObjectClicked(e){
      this.scene.scene.start('PlayGame');
      gameOver = false;
      score = 0;
    // if(soundFX.isPlaying) soundFX.pause();
    // else soundFX.resume();
  }

  update(){
    highScoreText.text = 'High Score: ' + localStorage.getItem("highScore");
      {
         if (score > localStorage.getItem("highScore"))
            {
                localStorage.setItem("highScore", Math.floor(score));
            }
        }
  }
}
