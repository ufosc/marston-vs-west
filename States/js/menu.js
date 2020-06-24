var menuState = {

    create: function () {
        //Create the menu & settings
        
        background = game.add.sprite(0, 0);
        background.width = game.width;
        background.height = game.height;

        game.stage.backgroundColor = '#000000';   //Give us some color pls

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.scale._scaleMode = 3;

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

        /*
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
        
        helpButton = game.add.button(0, game.world.height, 'helpButton');
        helpButton.anchor.setTo(0, 1);
        helpButton.onInputUp.add(this.help, this);
        
        */
        
        //var arcadeLabel = game.add.text(game.world.width * .4, game.world.height * .45, 'ARCADE', { font: '90px Permanent Marker', fill: '#ffffff' });
        arcadeLabel = new TextButton(this.game, game.world.width * .2, game.world.height * .45, 'ARCADE', { font: '80px Permanent Marker', fill: '#ffffff' });
        arcadeLabel.anchor.setTo(0, 0);
        arcadeLabel.events.onInputUp.add(function () {
            menuState.arcade();            
        });

        //var versusLabel = game.add.text(game.world.width * .4, game.world.height * .55 + 30, 'VERSUS', { font: '90px Permanent Marker', fill: '#ffffff' });
        versusLabel = new TextButton(this.game, game.world.width * .8, game.world.height * .45, 'VERSUS', { font: '80px Permanent Marker', fill: '#ffffff' });
        versusLabel.anchor.setTo(1, 0);

        versusLabel.events.onInputUp.add(function () {
            menuState.start();
        });
        
        //var optionsLabel = game.add.text(game.world.width * .4, game.world.height * .65 + 60, 'OPTIONS', { font: '90px Permanent Marker', fill: '#ffffff' });
        optionsLabel = new TextButton(this.game, game.world.width * .2, game.world.height * .65, 'OPTIONS', { font: '80px Permanent Marker', fill: '#ffffff' });
        optionsLabel.anchor.setTo(0, 0);
        optionsLabel.events.onInputUp.add(function () {
            menuState.options();            
        });

        //var creditsLabel = game.add.text(game.world.width * .4, game.world.height * .75 + 90, 'CREDITS', { font: '90px Permanent Marker', fill: '#ffffff' });
        
        creditsLabel =  new TextButton(this.game, game.world.width * .8, game.world.height * .65, 'CREDITS', { font: '80px Permanent Marker', fill: '#ffffff' });
        creditsLabel.anchor.setTo(1, 0);
        creditsLabel.inputEnabled = true;
        creditsLabel.events.onInputUp.add(function () {
            menuState.credits();
        });

        buttonSound = game.add.audio('buttonSound', 0.06);
        buttonSound.stop();
        
        buttonSound.volume = gameManager.volume * 0.2;

        if (music.name != 'menuMusic') {
            music = game.add.audio('menuMusic',gameManager.volume);
            music.loopFull();
        }

    },
    start: function () {

        if (music.name != 'menuMusic') {
            music = game.add.audio('menuMusic',gameManager.volume);
            music.loopFull();
        }

        music.volume = gameManager.volume;
        music.mute = muteState;

        if(muteState==false){
            buttonSound.play();
            //music.stop();
        }

        gameManager.resetsettings();
        gameManager.ScoreKeeper.resetAll();
        
        console.log("go to normal css?");
        gameManager.changemode("MultiPlayer");
        game.state.start('css');
        gameManager.playerTint[0] = "0xff8615";
        gameManager.playerTint[1] = "0x1c6bff";

    },
    arcade: function(){
        console.log('arcade');

        if(muteState==false){
            buttonSound.play();
        }

        gameManager.lives = 1;

        gameManager.playerTint[0] = "0xff8615";
        gameManager.playerTint[1] = "0x1c6bff";

        gameManager.resetsettings();
        gameManager.ScoreKeeper.resetAll();
        gameManager.changemode("Arcade");
        game.state.start('arccss');
    },
    characterSelect: function () {
        if(muteState==false)
        buttonSound.play();
        console.log("css State");
        gameManager.resetsettings();
        gameManager.ScoreKeeper.resetAll();
        gameManager.changemode("Multi");
        
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
        game.state.start('credits');
    },
    update: function () {
        //filter.update();
        if (game.device.android || game.device.iOS) {
            //fullScreenButton.visible = true;
        }
        music.volume = gameManager.volume;
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
    },
    
    help: function(){
       if(muteState==false)
        buttonSound.play();
        game.state.start('help');
    }


};
