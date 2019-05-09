var menuState = {

    create: function () {
        //Create the menu & settings
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.stage.backgroundColor = '#000000';   //Give us some color pls
        background = game.add.sprite(0, 0);
        background.width = 1920;
        background.height = 1080;

        filter = game.add.filter('Fire', 1920, 1080);
        filter.alpha = 0.0;
        background.filters = [filter];
        var backgroundSprite = game.add.image(0, 0, 'menuBackground');
        backgroundSprite.anchor.setTo(0,0);
        var logo = game.add.image(game.world.width * .5, game.world.height * .5, 'logo');
        logo.anchor.setTo(.5,.5);
        logo.scale.setTo(.8,.8);

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this); //Keep for debugging purposes, makes launching the game quicker
        var gkey = game.input.keyboard.addKey(Phaser.Keyboard.G);
        gkey.onDown.addOnce(this.characterSelect, this); //Keep for debugging purposes, makes launching the game quicker

        arcadeButton = game.add.button(game.world.width * .5, game.world.height * .5, 'arcadeButton');
        arcadeButton.anchor.setTo(.5,.5);
        arcadeButton.onInputUp.add(this.arcade, this);

        startButton = game.add.button(game.world.width * .5, game.world.height * .6, 'startButton');
        startButton.anchor.setTo(.5,.5);
        startButton.onInputUp.add(this.start, this);

        optionsButton = game.add.button(game.world.width * .5, game.world.height * .75, 'optionButton');
        optionsButton.anchor.setTo(.5,.5);
        optionsButton.onInputUp.add(this.options, this);

        creditsButton = game.add.button(game.world.width * .5, game.world.height * .9, 'creditButton');
        creditsButton.anchor.setTo(.5,.5);
        creditsButton.onInputUp.add(this.quit, this);


        fullScreenButton = game.add.button(game.world.width * .5, game.world.height, 'fullScreenButton');
        fullScreenButton.anchor.setTo(.5,.5);
        fullScreenButton.onInputUp.add(this.fullScreenConfig, this);
        fullScreenButton.anchor.setTo(.5, .5);
        fullScreenButton.visible = false;


        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume -= .3;


        if (music.name != 'menuMusic') {
            music = game.add.audio('menuMusic');
            music.loopFull();
        }

    },
    start: function () {
        if(muteState==false)
        buttonSound.play();
        //music.stop();
        game.state.start('css');

    },
    arcade: function(){
        console.log('stupid');
        if(muteState==false)
        buttonSound.play();
        //music.stop();
        game.state.start('arccss');
    },
    characterSelect: function () {
        if(muteState==false)
        buttonSound.play();
        console.log("css State");
        game.state.start('css');

    },
    options: function () {
        if(muteState==false)
        buttonSound.play();
        console.log("options state");
        game.state.start('options');
    },
    quit: function () {
        console.log("quit state");
        if(muteState==false)
        buttonSound.play();
        music.stop();
        game.destroy();
    },
    credits: function () {
        if(muteState==false)
        buttonSound.play();
        music.stop();
        game.state.start('credits');
    },
    update: function () {
        //filter.update();
        if (game.device.android || game.device.iOS) {
            fullScreenButton.visible = true;
        }
        music.volume = musicvol;
        music.mute = muteState;
        //buttonSound.volume = musicvol;
        //console.log("buttonSound: ", buttonSound.volume);
        //console.log("musicVolume: ", music.volume);
        //this is where music volume should handled by updating
        //but this is never triggered

    },


    fullScreenConfig: function () {
        console.log("Calling fullscreen function");
       /* if (!game.scale.isFullScreen) {
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.startFullScreen(true);
        }*/
        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }
    }


};
