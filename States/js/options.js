console.log("Reached options state");
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323']
    }
};
var optionsState = {
    preload: function () {
        //Load the Google WebFont Loader script
        this.game.load.script(
            'font.VT323',
            '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js'
          );
    },
    //Plan to add: fullscreen, change aspect ratio, keyboard config?, Toggle Items
    create: function () {
        
        //Menu and background
        var backgroundSprite = game.add.image(0, 0, 'menuBackground');
        backgroundSprite.anchor.setTo(0,0);
        var logo = game.add.image(game.world.width * .5, game.world.height * .5, 'logo');
        logo.anchor.setTo(.5,.5);
        logo.scale.setTo(.8,.8);
        menuButton = game.add.button(game.world.width * .5 - 50, game.world.height * .5 + 50, 'menuButton');
        menuButton.anchor.setTo(.5,.5);
        menuButton.onInputUp.add(this.menu, this);
        
        //slide test
        //slide = new Slider(50, 200, 200, false);
        //end of slide test


        //Fullscreen event listeners
        fullScreenButton = game.add.button(game.world.width * .5 - 400, game.world.height * .5 + 450, 'fullscreen');
        fullScreenButton.anchor.setTo(.5,.5);
        fullScreenButton.onInputUp.add(this.fullScreenConfig, this);
        game.scale.onFullScreenChange.add(this.onFullScreenChange, this);

        //incremental buttons for different values that can be set in options menu
        //minutes = 1, seconds = 2, lives = 3
        plusButton1 = game.add.button(game.world.width * .5 - 125, game.world.height * .5 + 150, 'plus');
        plusButton1.anchor.setTo(.5,.5);
        minusButton1 = game.add.button(game.world.width * .5 - 50, game.world.height * .5 + 150, 'minus');
        minusButton1.anchor.setTo(.5,.5);
        plusButton2 = game.add.button(game.world.width * .5 - 125, game.world.height * .5 + 250, 'plus');
        plusButton2.anchor.setTo(.5,.5);
        minusButton2 = game.add.button(game.world.width * .5 - 50, game.world.height * .5 + 250, 'minus');
        minusButton2.anchor.setTo(.5,.5);
        plusButton3 = game.add.button(game.world.width * .5 - 125, game.world.height * .5 + 350, 'plus');
        plusButton3.anchor.setTo(.5,.5);
        minusButton3 = game.add.button(game.world.width * .5 - 50, game.world.height * .5 + 350, 'minus');
        minusButton3.anchor.setTo(.5,.5);

        //labels
        SettingLabel = game.add.button(game.world.width * .5 - 400, game.world.height * .5 + 50, 'settings');
        SettingLabel.anchor.setTo(.5,.5);
        minutesButton = game.add.button(game.world.width * .5 - 450, game.world.height * .5 + 150, 'minutes');
        minutesButton.anchor.setTo(.5,.5);
        secondsButton = game.add.button(game.world.width * .5 - 450, game.world.height * .5 + 250, 'seconds');
        secondsButton.anchor.setTo(.5,.5);
        
        //values
        minLabel = game.add.text(game.world.width * .5 - 250, game.world.height *.5 + 110, `${gameManager.gameMinutes}`);
        secLabel = game.add.text(game.world.width * .5 - 250, game.world.height * .5 + 210, `${gameManager.gameSeconds}`, { font: '65px VT323', fill: '#ffffff' });
        livesLabel = game.add.text(game.world.width * .5 - 425, game.world.height * .5 + 310, `Lives: ${gameManager.lives}`, { font: '65px Arial', fill: '#ffffff' });
        minLabel.font = 'VT323';
        minLabel.fontSize = 60;
        minLabel.fill = '#ffffff';
        secLabel.font = 'VT323';
        livesLabel.font = 'VT323';

        //event listeners for buttons
        plusButton1.onInputUp.add(this.gameMinInc, this);
        minusButton1.onInputUp.add(this.gameMinDec, this);

        plusButton2.onInputUp.add(this.gameSecInc, this);
        minusButton2.onInputUp.add(this.gameSecDec, this);

        plusButton3.onInputUp.add(this.gameLivesInc, this);
        minusButton3.onInputUp.add(this.gameLivesDec, this);

        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume -= .5;

        //the sliding bars part

        volumeIcon = game.add.sprite(xPos, initMulY, 'music_icon');//modify this icon
        volumeIcon.inputEnabled = true;
        volumeIcon.input.enableDrag(true);
        volumeIcon.events.onDragUpdate.add(dragUpdate);

        muteIcon = game.add.sprite(1300, initMulY, 'mute');
        muteIcon.inputEnabled = true;
        muteIcon.events.onInputDown.add(muteFunction);
        //end of the sliding bar function



        //Can add other options as well, music and sfx toggle, anti-alias, and other ideas
    },
    update: function () {
        minLabel.text = `${gameManager.gameMinutes}`;
        secLabel.text = `${gameManager.gameSeconds}`;
        livesLabel.text = `Lives: ${gameManager.lives}`;
       
    },
    gameMinInc: function () {
        gameManager.gameMinutes++;
        buttonSound.play();
        console.log("Minutes: " + gameManager.gameMinutes);
    },
    gameSecInc: function () {
        gameManager.gameSeconds = gameManager.gameSeconds + 30;
        buttonSound.play();
        console.log("Seconds: " + gameManager.gameSeconds);
    },
    gameMinDec: function () {
        buttonSound.play();
        gameManager.gameMinutes--;
        if (gameManager.gameMinutes < 0) {
            gameManager.gameMinutes = 0;
        }
        console.log("Minutes: " + gameManager.gameMinutes);
    },
    gameSecDec: function () {
        gameManager.gameSeconds = gameManager.gameSeconds - 30;
        buttonSound.play();
        if (gameManager.gameSeconds < 0) {
            gameManager.gameSeconds = 0;
        }
        console.log("Seconds: " + gameManager.gameSeconds);
    },
    gameLivesInc: function () {
        gameManager.lives++;
        buttonSound.play();
        console.log("Lives: " + gameManager.lives);
    },
    gameLivesDec: function () {
        gameManager.lives--;
        if (gameManager.lives < 1) {
            gameManager.lives = 1;
        }
        buttonSound.play();
        console.log("Lives: " + gameManager.lives);
    },
    onFullScreenChange: function (scale) {
        //if you need to change something when fullscreen toggled
        if (game.scale.isFullScreen) {
            fullScreenButton.visible = false;
        }
        else {
            fullScreenButton.visible = true;
        }
    },
    render: function () {
        if (game.scale.isFullScreen) {
            game.debug.text('ESC to leave fullscreen', 270, 16);
        }
    },
    menu: function () {
        if(muteState==false)
        buttonSound.play();
        game.state.start('menu');
    },
    fullScreenConfig: function () {
        console.log("Calling fullscreen function");
        if (!game.scale.isFullScreen) {
            game.scale.startFullScreen();
            //game.scaleMode = SHOW_ALL;
        }
        else {
            //game.scaleMode = EXACT_FIT;
        }


    },

};

function muteFunction(sprite){
    if(muteState == false){
        muteState = true;
    }
    else{
        muteState = false;
    }
    music.mute = muteState;
    buttonSound.mute = muteState;
}

function dragUpdate (sprite){
    //the following code is for x-axis sliding bar
    //music volume adjustment not activated before dragged

    //455: the upper bound set for this sliding bar
    //260: the lower bound set for this sliding bar
    //720: the length of the background
    //195: the range that the sliding bar can move


    const yValue = 970;

    xPos = sprite.x;


    if (xPos > mulLeft){//upper bound
        xPos = mulLeft;
        sprite.x = mulLeft;
    }
    else if (xPos < mulRight) {//lower bound
        xPos = mulRight;
        sprite.x = mulRight;
    }

    musicvol = (xPos-mulRight) / range;
    music.volume = musicvol;
    buttonSound.volume = musicvol;

    if(sprite.y != yValue){
        sprite.y = yValue;
    }
}

