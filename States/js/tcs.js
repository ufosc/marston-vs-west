//title card file
var timer;

var tcsState = {
    create:function(){
        console.log("in tcs????")

        //gameManager.randomscenario();

        //var scenarioLabel = game.add.text(game.world.width * 0.5, game.world.height * 0.9, gameManager.scenario, { font: '60px Arial', fill: '#ffffff' });
        
        numX = 20;
        numY = 20;

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        var skipLabel = game.add.text(game.world.width * .5 , game.world.height - 25, "Press 'Enter' to skip", { font: '50px Permanent Marker', fill: '#ffffff' });
        skipLabel.anchor.setTo(.5,.5);

        player1ico = game.add.sprite(game.world.width * .05 - 100, game.world.height * .7, charName1);
        musicToPlay = game.add.audio('titleCardSound');
        musicToPlay.volume = musicvol;
        if(!muteState)
        musicToPlay.play();
        
        //dudeIcon.tint = 0xffff00;

        player1ico.scale.setTo(15, 15);
        player1ico.anchor.setTo(.5,.5);
        player1ico.scale.x *= -1;//flip
        player1ico.animations.add('idle', [1, 2], 5, true);
        player1ico.animations.add('kick', [6], 5, true);
        if (player1ico.animations) {
            player1ico.alpha = 1;
        }
        buttonSound.volume = musicvol;
        if(muteState==false)
        buttonSound.play();
        //chickIcon.tint = 0xffffff;

        player2ico = game.add.sprite(game.world.width * .95 + 100, game.world.height * .7, charName2);
        player2ico.scale.setTo(15, 15);
        player2ico.anchor.setTo(.5,.5);

        player2ico.animations.add('idle', [1, 2], 5, true);
        player2ico.animations.add('kick', [6], 5, true);

        if (player2ico.animations) {
            player2ico.alpha = 1;
        }

        player1ico.animations.play('idle');
        player2ico.animations.play('idle');
        game.physics.enable(player1ico, Phaser.Physics.ARCADE);
        game.physics.enable(player2ico, Phaser.Physics.ARCADE);

        game.time.events.add(Phaser.Timer.SECOND * 3.5, this.rush, this);

        player1ico.inputEnabled = true;
        player1ico.events.onInputDown.add(this.start, this);
        player2ico.inputEnabled = true;
        player2ico.events.onInputDown.add(this.start, this);

        player1ico.tint = gameManager.playerTint[0];
        player2ico.tint = gameManager.playerTint[1];
        


    },
    rush:function(){
        
        player1ico.animations.play('kick');
        player1ico.scale.x *= -1;//flip
        player1ico.x = game.world.width * .15 + 100;

        player2ico.animations.play('kick');
        player2ico.scale.x *= -1;//flip
        player2ico.x = game.world.width * .85 - 100;

        player1ico.body.velocity.x = 70;
        player2ico.body.velocity.x = -70;

        game.time.events.add(Phaser.Timer.SECOND * 4.7, this.rushStop, this);
   },
    rushStop:function(){
    player1ico.body.velocity.x = 0;
    player2ico.body.velocity.x = 0;

    vs = game.add.sprite(game.world.width * 0.5, game.world.height * 0.5, 'vsIcon');

    vs.anchor.setTo(0.5, 0.5);
    vs.scale.setTo(20,20);
    game.add.tween(vs.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
   
    game.time.events.add(Phaser.Timer.SECOND * 3, this.start, this);
},
    start:function(){
    musicToPlay.stop();
    gameReadyText.text = `Game Start!`;
    game.state.start('play');
},

    update: function() {
        if(key1.isDown) {
            game.state.start('play');
            musicToPlay.stop();
        }
    }

    
};




