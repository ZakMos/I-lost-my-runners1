class Start extends Phaser.Scene {

  constructor() {
    super({key: "Start"});
  }

  preload(){
    this.load.audio('startAudio', ['assets/audio/startAudio.mp3']);
    this.load.image('bg', 'assets/back01.jpeg');
    this.load.image('start', 'assets/startGame.gif');
  }

  create(){

    ///=========================AUDIO=======================///
    // soundFX = this.sound.add("startAudio", { loop: "true"});
    // soundFX.play();

    ///=========================Background=======================///
    bg = this.add.tileSprite(window.innerWidth/2,window.innerHeight/2, window.innerWidth/2,window.innerHeight/2, 'bg').setScale(2);

    ///=========================Auto resize=======================///

    window.addEventListener('resize', resize);
    resize();
    function resize() {
        var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    };

    ///=========================Rules =======================///
    // rule = this.add.text(window.innerWidth/2*0.93, 440, 'Rule' ,  { font: '20px Arial', boundsAlignH: "center", fill: '#fff', backgroundColor: 'black'});

    rule = this.add.text(window.innerWidth/2.45, window.innerHeight/1.75, 'Rules of The Game' ,  { font: '35px Arial', boundsAlignH: "center", fill: '#000'});

    ruleDescription = this.add.text(window.innerWidth/4, window.innerHeight/1.55, 'Use the right arrow to begin running and the spacebar or up key to jump.' ,  { font: '25px Arial', boundsAlignH: "center", fill: '#000'});


    ///=========================Button=======================///
    startButton = this.add.image(window.innerWidth/2,window.innerHeight/2,'start').setScale(1);
    startButton.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }

    onObjectClicked(e){
    this.scene.scene.start('PlayGame');
    // if(soundFX.isPlaying) soundFX.pause();
    // else soundFX.resume();
    }

  update(){

  }
}
