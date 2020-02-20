class Start extends Phaser.Scene {

  constructor() {
    super({key: "Start"});
  }

  preload(){
    this.load.audio('startAudio', ['assets/audio/startAudio.mp3']);
    this.load.image('bg', 'assets/background2.png');
    this.load.image('start', 'assets/start-start.png');
    this.load.image('cloud1', 'assets/Export/cloud1.png');
    this.load.image('cloud2', 'assets/Export/cloud2.png');
    this.load.image('cloud3', 'assets/Export/cloud3.png');
    this.load.image('arrow', 'assets/arrow-right.png');
    this.load.image('leftarrow', 'assets/left-arrow.png');
    this.load.image('webup', 'assets/webup_logo.jpg');
  }

  create(){

    ///=========================AUDIO=======================///
    // soundFX = this.sound.add("startAudio", { loop: "true"});
    // soundFX.play();

    ///=========================Background=======================///
    bg = this.add.tileSprite(width/2,height/2, width/2,height/2, 'bg').setScale(2);
    cloud1= this.add.sprite(75,80, 'cloud1');
    cloud1= this.add.sprite(1400,100, 'cloud3');
    this.webup= this.add.sprite(600,150, 'webup');
    this.webup.setScale(0.2);

    ///=========================Auto resize=======================///

    resize();
    window.addEventListener("resize", resize, false);
    function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

    ///=========================Rules =======================///
    ruleDescription = this.add.text(width/2 - 380, height/2 +150, 'Use the right arrow to begin running and the spacebar or up key to jump.' ,  { font: '25px Arial', boundsAlignH: "center", fill: '#000'});

    arrowRight= this.add.sprite(width/2+ 330,height/2,  'arrow').setScale(0.26);
    arrowLeft= this.add.sprite(width/2-330,height/2,  'leftarrow').setScale(0.25);
    footerText = this.add.text(width/2 - 130, height/2 +365, '© 2020 Zakaria Moslim' ,  { font: '25px Arial', boundsAlignH: "center", fill: '#000'});

    ///=========================Button=======================///
    this.startButton = this.add.image(width/2,height/2,'start').setScale(1.25);
    this.startButton.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked)
    }

    

    onObjectClicked(e){
    this.scene.scene.start('PlayGame');
    //for sound
    // if(soundFX.isPlaying) soundFX.pause();
    // else soundFX.resume();
    }
  update(){

  }
}
