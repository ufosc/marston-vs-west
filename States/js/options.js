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
        minLabel = game.add.text(game.world.width * .5 - 250, game.world.height *.5 + 110, `${gameMinutes}`);
        secLabel = game.add.text(game.world.width * .5 - 250, game.world.height * .5 + 210, `${gameSeconds}`, { font: '65px VT323', fill: '#ffffff' });
        livesLabel = game.add.text(game.world.width * .5 - 425, game.world.height * .5 + 310, `Lives: ${lives}`, { font: '65px Arial', fill: '#ffffff' });
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
        //end of the sliding bar function

        //color bars
        valColor1 = 0;
        valColor2 = 0;
        valColor3 = 0;

        colorAdjustmentIcon = game.add.sprite(xPos2, initY1, 'Chi');//modify this icon and note that 50 is the radius of the icon?
        colorAdjustmentIcon2 = game.add.sprite(xPos3, initY2, 'Chi');//modify this icon
        colorAdjustmentIcon3 = game.add.sprite(xPos4, initY3, 'Chi');//modify this icon
        colorOverlap = game.add.sprite (0, 0, 'Chi');//display the final effect and also modify this icon

        colorInit(colorAdjustmentIcon, colorAdjustmentIcon2, colorAdjustmentIcon3);//initializes the icon colors

        colorAdjustmentIcon.inputEnabled = true;
        colorAdjustmentIcon.input.enableDrag(true);
        colorAdjustmentIcon.events.onDragUpdate.add(dragUpdate2);


        colorAdjustmentIcon2.inputEnabled = true;
        colorAdjustmentIcon2.input.enableDrag(true);
        colorAdjustmentIcon2.events.onDragUpdate.add(dragUpdate3);


        colorAdjustmentIcon3.inputEnabled = true;
        colorAdjustmentIcon3.input.enableDrag(true);
        colorAdjustmentIcon3.events.onDragUpdate.add(dragUpdate4);

        //end of the sliding bar function for color adjustment

        //Can add other options as well, music and sfx toggle, anti-alias, and other ideas
    },
    update: function () {
        minLabel.text = `${gameMinutes}`;
        secLabel.text = `${gameSeconds}`;
        livesLabel.text = `Lives: ${lives}`;
        colorChange(colorOverlap);
    },
    gameMinInc: function () {
        gameMinutes++;
        buttonSound.play();
        console.log("Minutes: " + gameMinutes);
    },
    gameSecInc: function () {
        gameSeconds = gameSeconds + 30;
        buttonSound.play();
        console.log("Seconds: " + gameSeconds);
    },
    gameMinDec: function () {
        buttonSound.play();
        gameMinutes--;
        if (gameMinutes < 0) {
            gameMinutes = 0;
        }
        console.log("Minutes: " + gameMinutes);
    },
    gameSecDec: function () {
        gameSeconds = gameSeconds - 30;
        buttonSound.play();
        if (gameSeconds < 0) {
            gameSeconds = 0;
        }
        console.log("Seconds: " + gameSeconds);
    },
    gameLivesInc: function () {
        lives++;
        buttonSound.play();
        console.log("Lives: " + lives);
    },
    gameLivesDec: function () {
        lives--;
        if (lives < 1) {
            lives = 1;
        }
        buttonSound.play();
        console.log("Lives: " + lives);
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

function colorInit (sprite1, sprite2, sprite3) {
    var xPosition1 = sprite1.x;
    var xPosition2 = sprite2.x;
    var xPosition3 = sprite3.x;

    valColor1 = (xPosition1 - right) /range * 255;
    valColor1 = parseInt(valColor1);
    sprite1.tint = valColor1;

    valColor2 = (xPosition2 - right) /range * 255;
    valColor2 = parseInt(valColor2);
    valColor2 *= 256;//We wanna modify the middle two digits now
    sprite2.tint = valColor2;

    valColor3 = (xPosition3 - right) /range * 255;
    valColor3 = parseInt(valColor3);
    valColor3 *= 65536;//We wanna modify the last two digits now
    sprite3.tint = valColor3;
}

function dragUpdate (sprite){
    //the following code is for x-axis sliding bar
    //music volume adjustment not activated before dragged

    //455: the upper bound set for this sliding bar
    //260: the lower bound set for this sliding bar
    //720: the length of the background
    //195: the range that the sliding bar can move


    const yValue = 500;

    xPos = sprite.x;


    if (xPos > left){//upper bound
        xPos = left;
        sprite.x = left;
    }
    else if (xPos < right) {//lower bound
        xPos = right;
        sprite.x = right;
    }

    musicvol = (xPos-right) / range;
    music.volume = musicvol;
    buttonSound.volume = musicvol;

    if(sprite.y != yValue){
        sprite.y = yValue;
    }
}

function dragUpdate2 (sprite){

    const yValue = 450;
    xPos2 = sprite.x;

    if (xPos2 > left){//upper bound
        xPos2 = left;
        sprite.x = left;
    }
    else if (xPos2 < right) {//lower bound
        xPos2 = right;
        sprite.x = right;
    }


    //255 is the max value of the first two digits under hex
    valColor1 = (xPos2 - right) /range * 255;
    valColor1 = parseInt(valColor1);
    sprite.tint = valColor1;

    //printing the hex val
    /*hexString = sprite.tint.toString(16);
    if (hexString.length % 2) {
        hexString = '0' + hexString;
    }
    console.log(hexString);*/

    colorChange(colorOverlap);

    if(sprite.y != yValue){
        sprite.y = yValue;
    }
}

function dragUpdate3 (sprite){

    const yValue = 300;

    xPos3 = sprite.x;
    if (xPos3 > left){//upper bound
        xPos3 = left;
        sprite.x = left;
    }
    else if (xPos3 < right) {//lower bound
        xPos3 = right;
        sprite.x = right;
    }


    //255 is the max value of the first two digits under hex
    valColor2 = (xPos3 - right) /range * 255;
    valColor2 = parseInt(valColor2);
    valColor2 *= 256;//We wanna modify the middle two digits now
    sprite.tint = valColor2;

    //printing the hex val
    /*hexString = sprite.tint.toString(16);
    if (hexString.length % 2) {
        hexString = '0' + hexString;
    }
    console.log(hexString);*/

    colorChange(colorOverlap);

    if(sprite.y != yValue){
        sprite.y = yValue;
    }
}
function dragUpdate4 (sprite){

    const yValue = 100;

    xPos4 = sprite.x;

    if (xPos4 > left){//upper bound
        xPos4 = left;
        sprite.x = left;
    }
    else if (xPos4 < right) {//lower bound
        xPos4 = right;
        sprite.x = right;
    }

    //255 is the max value of the first two digits under hex
    valColor3 = (xPos4 - right) /range * 255;
    valColor3 = parseInt(valColor3);
    valColor3 *= 65536;//We wanna modify the last two digits now
    sprite.tint = valColor3;

    //printing the hex val
    /*hexString = sprite.tint.toString(16);
    if (hexString.length % 2) {
        hexString = '0' + hexString;
    }
    console.log(hexString);*/

    colorChange(colorOverlap);

    if(sprite.y != yValue){
        sprite.y = yValue;
    }
}
function colorChange(sprite){
    var finalColor = valColor1 + valColor2 + valColor3;
    sprite.tint = finalColor;
    /*hexString = sprite.tint.toString(16);
    if (hexString.length % 2) {
        hexString = '0' + hexString;
    }
    console.log(hexString);*/
}