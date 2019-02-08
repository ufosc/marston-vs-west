console.log("Reached options state");
var optionsState = {
    //Plan to add: fullscreen, change aspect ratio, keyboard config?, Toggle Items
    create: function () {
        var nameLabel = game.add.text(80, 80, 'Options menu', { font: '50px Arial', fill: '#ffffff' });
        var startLabel = game.add.text(80, game.world.height - 40, 'Under Construction', { font: '25px Arial', fill: '#ffffff' });
        menuButton = game.add.button(game.world.width * .5 - 195, game.world.height * .5 - 100, 'menuButton');
        menuButton.onInputUp.add(this.menu, this);
        var marstonPicture = game.add.image(game.world.width * .5 + 15, game.world.height * .5 + 75, 'marstonPic');
        marstonPicture.anchor.setTo(1, 1);
        marstonPicture.scale.setTo(.15, .15);
        fullScreenButton = game.add.button(game.world.width * .5, game.world.height * .5 - 100, 'fullScreenButton');
        fullScreenButton.onInputUp.add(this.fullScreenConfig, this);
        stretchFullScreen = Phaser.ScaleManager.EXACT_FIT;
        resizeFullScreen = Phaser.ScaleManager.RESIZE;
        preservedFullScreen = Phaser.ScaleManager.SHOW_ALL;
        borderFullScreen = Phaser.ScaleManager.NO_SCALE;
        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;         //HERE IS WHERE WE CONFIGURE THE DIFFERENT DISPLAY SETTINGS
        displayOptionButton1 = game.add.button(game.world.width * .5 + 195, game.world.height * .75 - 200, 'displayButton1');
        displayOptionButton1.onInputUp.add(this.setFullScreenDisplay1, this);
        displayOptionButton1.visible = false;
        displayOptionButton2 = game.add.button(game.world.width * .5 + 195, game.world.height * .75 - 150, 'displayButton2');
        displayOptionButton2.onInputUp.add(this.setFullScreenDisplay2, this);
        displayOptionButton2.visible = false;
        displayOptionButton3 = game.add.button(game.world.width * .5 + 195, game.world.height * .75 - 100, 'displayButton3');
        displayOptionButton3.onInputUp.add(this.setFullScreenDisplay3, this);
        displayOptionButton3.visible = false;
        displayOptionButton4 = game.add.button(game.world.width * .5 + 195, game.world.height * .75 - 50, 'displayButton4');
        displayOptionButton4.onInputUp.add(this.setFullScreenDisplay4, this);
        displayOptionButton4.visible = false;
        game.scale.onFullScreenChange.add(this.onFullScreenChange, this);
        var incLabel = game.add.text(game.world.width * .5 - 195, game.world.height - 345, '+', { font: '35px Arial', fill: '#ffffff' });
        var decLabel = game.add.text(game.world.width * .5 + 100, game.world.height - 345, '-', { font: '35px Arial', fill: '#ffffff' });
        minLabel = game.add.text(game.world.width * .5 - 375, game.world.height - 305, `Min: ${gameMinutes}`, { font: '35px Arial', fill: '#ffffff' });
        secLabel = game.add.text(game.world.width * .5 - 375, game.world.height - 255, `Sec: ${gameSeconds}`, { font: '35px Arial', fill: '#ffffff' });
        livesLabel = game.add.text(game.world.width * .5 - 375, game.world.height - 205, `Lives: ${lives}`, { font: '35px Arial', fill: '#ffffff' });
        gameMinIncButton = game.add.button(game.world.width * .5 - 245, game.world.height - 300, 'plusButton');
        gameMinIncButton.onInputUp.add(this.gameMinInc, this);
        gameMinDecButton = game.add.button(game.world.width * .5 + 50, game.world.height - 300, 'minusButton');
        gameMinDecButton.onInputUp.add(this.gameMinDec, this);

        gameSecIncButton = game.add.button(game.world.width * .5 - 245, game.world.height - 250, 'plusButton');
        gameSecIncButton.onInputUp.add(this.gameSecInc, this);
        gameSecDecButton = game.add.button(game.world.width * .5 + 50, game.world.height - 250, 'minusButton');
        gameSecDecButton.onInputUp.add(this.gameSecDec, this);

        gameLivesIncButton = game.add.button(game.world.width * .5 - 245, game.world.height - 200, 'plusButton');
        gameLivesIncButton.onInputUp.add(this.gameLivesInc, this);
        gameLivesDecButton = game.add.button(game.world.width * .5 + 50, game.world.height - 200, 'minusButton');
        gameLivesDecButton.onInputUp.add(this.gameLivesDec, this);

        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume -= .5;

        //the sliding bars part

        volumeIcon = game.add.sprite(xPos, initMulY, 'Kim');//modify this icon
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
        minLabel.text = `Min: ${gameMinutes}`;
        secLabel.text = `Sec: ${gameSeconds}`;
        livesLabel.text = `Lives: ${lives}`;
        colorChange(colorOverlap);


        hexString = colorAdjustmentIcon.tint.toString(16);
        if (hexString.length % 2) {
            hexString = '0' + hexString;
        }
        console.log(hexString);//delete this later
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
        if (game.scale.isFullScreen) {
            displayOptionButton1.visible = true;
            displayOptionButton2.visible = true;
            displayOptionButton3.visible = true;
            displayOptionButton4.visible = true;
        }
        else {
            displayOptionButton1.visible = false;
            displayOptionButton2.visible = false;
            displayOptionButton3.visible = false;
            displayOptionButton4.visible = false;
        }
    },
    setFullScreenDisplay1: function () {
        game.scale.fullScreenScaleMode = stretchFullScreen;

    },
    setFullScreenDisplay2: function () {
        game.scale.fullScreenScaleMode = resizeFullScreen;

    },
    setFullScreenDisplay3: function () {
        game.scale.fullScreenScaleMode = preservedFullScreen;

    },
    setFullScreenDisplay4: function () {
        game.scale.fullScreenScaleMode = borderFullScreen;

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