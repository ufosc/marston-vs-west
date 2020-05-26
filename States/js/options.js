//console.log("Reached options state");
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323' ]
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
        
        //slide test
        //slide = new Slider(50, 200, 200, false);
        //end of slide test

        //Fullscreen event listeners
        //fullScreenButton = game.add.button(game.world.width * .5 - 400, game.world.height * .5 + 450, 'fullscreen');
        //fullScreenButton.anchor.setTo(.5,.5);
        //fullScreenButton.onInputUp.add(this.fullScreenConfig, this);
        //game.scale.onFullScreenChange.add(this.onFullScreenChange, this);

        menuLabel = new TextButton(this.game, game.world.width * .1, game.world.height * .2, 'MENU', { font: '90px Permanent Marker', fill: '#ffffff' });

        menuLabel.events.onInputUp.add(this.menu, this);

        //var fullScreenLabel = game.add.text(game.world.width * .3, game.world.height * .85, 'FULLSCREEN', { font: '90px Permanent Marker', fill: '#ffffff' });

        fullScreenLabel = new TextButton(this.game, game.world.width * .3, game.world.height * .8, 'FULLSCREEN', { font: '90px Permanent Marker', fill: '#ffffff' });

        fullScreenLabel.inputEnabled = true;

        fullScreenLabel.events.onInputUp.add(
            this.fullScreenConfig, this);
        game.scale.onFullScreenChange.add(this.onFullScreenChange, this);      

        //incremental buttons for different values that can be set in options menu
        plusButton1 = game.add.button(game.world.width * .58, game.world.height * .5, 'plus');
        plusButton1.anchor.setTo(1,0.5);
        minusButton1 = game.add.button(game.world.width * .6, game.world.height * .5, 'minus');
        minusButton1.anchor.setTo(0,0.5);
        plusButton2 = game.add.button(game.world.width * .58, game.world.height * .65, 'plus');
        plusButton2.anchor.setTo(1,0.5);
        minusButton2 = game.add.button(game.world.width * .6, game.world.height * .65, 'minus');
        minusButton2.anchor.setTo(0,0.5);
        
        //values // originaly 250
        minLabel = game.add.text(game.world.width * .4, game.world.height *.5, `MINUTES: ${gameManager.gameMinutes}`);
        minLabel.anchor.setTo(0.5,0.5);
        //secLabel = game.add.text(game.world.width * .3, game.world.height * .5 + 210, `SECONDS: ${gameManager.gameSeconds}`, { font: '65px VT323', fill: '#ffffff' });
        livesLabel = game.add.text(game.world.width * .4, game.world.height * .65, `LIVES: ${gameManager.lives}`, { font: '65px VT323', fill: '#ffffff' });
        livesLabel.anchor.setTo(0.5,0.5);

        minLabel.font = 'Permanent Marker'; //'VT323';
        minLabel.fontSize = 60;
        minLabel.fill = '#ffffff';
        //secLabel.font = 'Permanent Marker';
        livesLabel.font = 'Permanent Marker';

        //event listeners for buttons
        plusButton1.onInputUp.add(this.gameMinInc, this);
        minusButton1.onInputUp.add(this.gameMinDec, this);

        plusButton2.onInputUp.add(this.gameLivesInc, this);
        minusButton2.onInputUp.add(this.gameLivesDec, this);

        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume = musicvol;

        //the sliding bars part

        volumeIcon = game.add.sprite(game.world.width * 0.7, game.world.height * 0.7, 'music_icon');//modify this icon
        volumeIcon.scale.x *= 2;
        volumeIcon.scale.y *= 2;
        volumeIcon.inputEnabled = true;
        //volumeIcon.input.enableDrag(true);
        //volumeIcon.events.onDragUpdate.add(dragUpdate);

        muteIcon = game.add.button(game.world.width * 0.65 , initMulY, 'mute');
        muteIcon.scale.x *= 2;
        muteIcon.scale.y *= 2;
        muteIcon.inputEnabled = true;
        muteIcon.events.onInputDown.add(muteFunction);
        //end of the sliding bar function

        //Can add other options as well, music and sfx toggle, anti-alias, and other ideas
    },
    update: function () {
        minLabel.text = `MINUTES: ${gameManager.gameMinutes}`;
        //secLabel.text = `SECONDS: ${gameManager.gameSeconds}`;
        livesLabel.text = `Lives: ${gameManager.lives}`;
    },
    gameMinInc: function () {
        if(gameManager.gameMinutes + 1 <= 5){
            gameManager.gameMinutes++;
        }
        buttonSound.play();
    },
    gameSecInc: function () {
        if(gameManager.gameSeconds + 30 < 60){           
            gameManager.gameSeconds = gameManager.gameSeconds + 30;
        }
        buttonSound.play();
    },
    gameMinDec: function () {
        buttonSound.play();
        
        if (gameManager.gameMinutes - 1 >= 1) {
            gameManager.gameMinutes--;
        }
    },
    gameSecDec: function () {
        buttonSound.play();
        if (gameManager.gameSeconds - 1 >= 0) {
            gameManager.gameSeconds = gameManager.gameSeconds - 30;
        }
    },
    gameLivesInc: function () {
        if(gameManager.lives + 1 <= 5){
            gameManager.lives++;
        }
        buttonSound.play();
    },
    gameLivesDec: function () {
        if (gameManager.lives - 1 >= 1) {
            gameManager.lives--;
        }
        buttonSound.play();
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
        if (!game.scale.isFullScreen) {
            game.scale.startFullScreen();
            //game.scaleMode = SHOW_ALL;
        }
        // else {
        //     //game.scaleMode = EXACT_FIT;
        // }
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

