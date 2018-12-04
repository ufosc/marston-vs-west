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

        //the sliding bar part
        game.load.image('Kim', 'assets/Kim.jpg');
        var volumeIcon = game.add.sprite(360, 500, 'Kim');//modify this icon
        volumeIcon.inputEnabled = true;
        volumeIcon.input.enableDrag(true);
        volumeIcon.events.onDragUpdate.add(dragUpdate);
        //end of the sliding bar function

        //Can add other options as well, music and sfx toggle, anti-alias, and other ideas
    },
    update: function () {
        minLabel.text = `Min: ${gameMinutes}`;
        secLabel.text = `Sec: ${gameSeconds}`;
        livesLabel.text = `Lives: ${lives}`;
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


    }

};
function dragUpdate (sprite){
    /*//455: the upper bound set for this sliding bar
    //260: the lower bound set for this sliding bar
    //720: the length of the background
    //195: the range that the sliding bar can move

    var yPos = 720 - sprite.centerY;

    if (yPos > 455){//upper bound
        yPos = 455;
        sprite.centerY = 265;
    }
    else if (yPos < 260) {//lower bound
        yPos = 260;
        sprite.centerY = 460;
    }

    musicvol = (yPos-260) /195;
    //console.log(musicvol);
    music.volume = musicvol;

    if(sprite.x != 640){
        sprite.x = 640;
    }*/
    
    //the following code is for x-axis sliding bar
    //music volume adjustment not activated before dragged
    //455: the upper bound set for this sliding bar
    //260: the lower bound set for this sliding bar
    //720: the length of the background
    //195: the range that the sliding bar can move

    //var xPos = 720 - sprite.centerX;
    xPos = sprite.centerX;
    console.log(xPos);

    if (xPos > 455){//upper bound
        xPos = 455;
        //sprite.centerX = 265;
        sprite.centerX = 455;
    }
    else if (xPos < 260) {//lower bound
        xPos = 260;
        //sprite.centerX = 460;
        sprite.centerX = 260;
    }

    musicvol = (xPos-260) /195;
    console.log(musicvol);
    music.volume = musicvol;

    if(sprite.y != 500){
        sprite.y = 500;
    }
}