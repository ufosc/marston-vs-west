var arcsssState = {
    create: function () {
        //Reset values to default so if player wants to play again, it does not start off "ready" to play
        gameManager.chosenStageName = '';

        var backgroundSprite = game.add.image(0, 0, 'menuBackground');
        backgroundSprite.anchor.setTo(0,0);
        var logo = game.add.image(game.world.width * .5, game.world.height * .5, 'logo');
        logo.anchor.setTo(.5,.5);
        logo.scale.setTo(.8,.8);
        var text = game.add.image(game.world.width * .5, game.world.height * .5 + 100, 'chooseStage');
        text.anchor.setTo(.5,.5);
       
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        stage1 = new Stage(game.world.width * .5 - 250, game.world.height * .5 + 300, 'marstonPic');
        stage2 = new Stage(game.world.width * .5 + 250, game.world.height * .5 + 300, 'westPic');
       
        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume = gameManager.volume * 0.2;

        gameReadyText = game.add.text(game.world.width * .5, game.world.height * .5 + 475, '', { font: '50px Arial', fill: '#ffffff' });
        gameReadyText.anchor.setTo(.5, .5);

        var backbutton = new textButton(this.game, 50, 200, 'Click to go back', { font: '25px Arial', fill: '#ffffff' });
        
        backbutton.events.onInputUp.add(function () {
            game.state.start('arccss');
        });

    },
    start: function () {
        gameReadyText.text = `Game Start!`;
        music.stop();
        //game.state.start('play');
        game.state.start('arctcs');
    },
    update: function () {

    },

};
