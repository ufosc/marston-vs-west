/*
This code also serves as a test implementation of how to optimize css
*/

class Stage {
    constructor(startx, starty, icon) {
        this.icon = game.add.sprite(startx, starty, icon);
        this.icon.anchor.setTo(.5, .5);
        game.physics.arcade.enable(this.icon);
        this.icon.scale.setTo(.15, .15);
        this.selected = false; //Used to apply hover effect only once
        this.icon.enableBody = true;
        this.icon.inputEnabled = true;
        this.icon.tint = 0xffffff;
        this.icon.input.useHandCursor = true;
        this.icon.events.onInputOver.add(this.onOver, this);
        this.icon.events.onInputOut.add(this.onOut, this);
        this.icon.events.onInputDown.add(this.onClick, this);
    }
    onOver() { //Called when hovering over
        this.icon.scale.setTo(.25, .25); //Enlarge the selected icon
        if(this.icon.key == 'marstonPic')
            gameReadyText.text = "Marston Science Library";
        else if(this.icon.key == 'westPic')
            gameReadyText.text = "Library West";
    }
    onOut() { //Called after you stop hovering over
        this.icon.scale.setTo(.15, .15);
        gameReadyText.text = "";
    }
    onClick() {
        //gameReadyText.text = `GOOOOOO!`;
        gameManager.chosenStageName = this.icon.key;
        console.log("You chose: " + this.icon.key);
        music.stop();
        game.state.start('tcs');
        //game.state.start('play');
    }
}

var sssState = {
    create: function () {
        console.log("in sss????");
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

        stage1 = new Stage(game.world.width * .5 - 250, game.world.height * .5 - 300, 'WestPrintStage');
        stage2 = new Stage(game.world.width * .5, game.world.height * .5 - 300, 'WestDeskStage');
        stage3 = new Stage(game.world.width * .5 + 250, game.world.height * .5 - 300, 'MarstonTableStage');
        
        stage4 = new Stage(game.world.width * .5 - 250, game.world.height * .5, 'GatorStage');
        stage5 = new Stage(game.world.width * .5, game.world.height * .5, 'TreeStage');
        stage6 = new Stage(game.world.width * .5 + 250, game.world.height * .5, 'TableTopStage');
        
        stage7 = new Stage(game.world.width * .5 - 250, game.world.height * .5 + 300, 'TableTop2Stage');
        stage8 = new Stage(game.world.width * .5, game.world.height * .5 + 300, 'ReitzPondStage');
        stage9 = new Stage(game.world.width * .5 + 250, game.world.height * .5 + 300, 'ReitzStepStage');
      
      
        
        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume -= .5;

        gameReadyText = game.add.text(game.world.width * .5, game.world.height * .5 + 475, '', { font: '50px Arial', fill: '#ffffff' });
        gameReadyText.anchor.setTo(.5, .5);

        var backbutton = game.add.text(50, 200, 'Click to go back', { font: '25px Arial', fill: '#ffffff' });
        backbutton.inputEnabled = true;
        backbutton.events.onInputUp.add(function () {
            game.state.start('css');
        });

    },
    start: function () {
        gameReadyText.text = `Game Start!`;
        music.stop();
        //game.state.start('play');
        game.state.start('tcs');
    },
    update: function () {

    },

};
