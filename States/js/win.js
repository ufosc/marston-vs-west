class Link extends Phaser.Text {
    constructor(game, x, y, text, url, style) {
        super(game, x, y, text, style);
        this.url = url;
        this._oldFill = null;
        //add custom objects to the game
        this.game.add.existing(this);
        //Activate inpute events
        this.inputEnabled = true;
        //Change hover cursor
        this.input.useHandCursor = true;
        //Listen to the events
        this.events.onInputOver.add(this.onOver, this);
        this.events.onInputOut.add(this.onOut, this);
        this.events.onInputDown.add(this.onClick, this);
    }

    onOver() {
        this._oldFill = this.fill;
        this.fill = "blue";
    }

    onOut() {
        this.fill = this._oldFill;
    }

    onClick() {
        window.open(this.url, "_blank");
    }
}

class form extends Phaser.Text {
    constructor(game, x, y, text, url, style) {
        super(game, x, y, text, style);
        this.url = url;
        this._oldFill = null;
        //add custom objects to the game
        this.game.add.existing(this);
        //Activate inpute events
        this.inputEnabled = true;
        //Change hover cursor
        this.input.useHandCursor = true;
        //Listen to the events
        this.events.onInputOver.add(this.onOver, this);
        this.events.onInputOut.add(this.onOut, this);
        this.events.onInputDown.add(this.onClick, this);
    }

    onOver() {
        this._oldFill = this.fill;
        this.fill = "blue";
    }

    onOut() {
        this.fill = this._oldFill;
    }

    onClick() {
        document.getElementById("feedbackForm").innerHTML = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSem2W45GCSasljASseR6tbXA_H7vwtgezITt_A97JBNJ0maug/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';
    }
}


var winState = {
    create: function () {
        if(gameManager.gameType === "Arcade") {

            gameManager.ScoreKeeper.calcScore(1);
            gameManager.ScoreKeeper.calcScore(2);
    
            console.log("SCORES:");
            console.log(gameManager.ScoreKeeper.scoreTemp);

            var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' 
            + `Score: ${gameManager.ScoreKeeper.scoreTemp[0]}` + '\n'
            + `Lives Lost Bonus: ${gameManager.ScoreKeeper.calcLivesLostScore(0)}` + '\n'
            + `Damage Dealt: ${gameManager.ScoreKeeper.pointTemp[0][1]}` + '\n'
            + `Damage Dealt Bonus: ${gameManager.ScoreKeeper.calcDmgDealtPoints(0)}` + '\n'
            + `Damage Taken: ${gameManager.ScoreKeeper.pointTemp[0][2]}` + '\n'
            + `Damage Taken Bonus: ${gameManager.ScoreKeeper.calcDmgTakenPoints(0)}` + '\n'
            , { font: '70px Arial', fill: '#ffffff' });
        }
        else {
            if(multimanmode == false){
                if (Player1.lives > Player2.lives) {
                    var winLabel = game.add.text(game.world.width*0.4, 80, 'Player 1 won!', { font: '70px Arial', fill: '#ffffff' });
                }
                else if (Player1.lives == Player2.lives) {
                    var winLabel = game.add.text(game.world.width*0.4, 80, "It's a tie", { font: '70px Arial', fill: '#ffffff' });
                }
                else {
                    var winLabel = game.add.text(game.world.width*0.4, 80, 'Player 2 won!', { font: '70px Arial', fill: '#ffffff' });
                }
                var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' + `Lives: ${Player1.lives}`, { font: '70px Arial', fill: '#ffffff' }); 
                var statsLabel2 = game.add.text(game.world.width*0.7, 160, `Player 2 stats:` + '\n' + `Lives: ${Player2.lives}`,{ font: '70px Arial', fill: '#ffffff' });
            }
            else{
                var winLabel = game.add.text(80, 80, 'Nice Game!', { font: '70px Arial', fill: '#ffffff' });
                var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' + `KO(s): ${multimenko}`, { font: '70px Arial', fill: '#ffffff' });
            }
            var startLabel = game.add.text(80, game.world.height - 80, 'Press "W" key or tap this label to go to menu', { font: '40px Arial', fill: '#ffffff' });
            startLabel.inputEnabled = true;
            startLabel.events.onInputUp.add(function () {
                music.stop();
                game.state.start('menu');
            });

            var restartLabel = game.add.text(80, game.world.height - 180, 'Press this label to restart', { font: '40px Arial', fill: '#ffffff' });
            restartLabel.inputEnabled = true;
            restartLabel.events.onInputUp.add(function () {
                music.stop();
                game.state.start('play');
            });
        }

        if (game.device.android || game.device.iOS) {
            //If on mobile, open a new tab with the survey form
            feedbackLabel = new Link(this.game, 80, game.world.height - 240, "Click here to send feedback! Thanks for playing on  Mobile!", "https://goo.gl/forms/wA6NGUAJ4OiKhVC93", { font: '40px Arial', fill: '#ffffff' });

        }
        else {
            //If on desktop, open up embedded form.
            //feedbackLabel = new form(this.game, 80,game.world.height-240, "Click here to send feedback! Thanks for playing on Desktop!", "https://goo.gl/forms/wA6NGUAJ4OiKhVC93", {font: '25px Arial',fill:'#ffffff'});
            feedbackLabel = new Link(this.game, 80, game.world.height - 240, "Click here to send feedback! Thanks for playing on Desktop!", "https://goo.gl/forms/wA6NGUAJ4OiKhVC93", { font: '40px Arial', fill: '#ffffff' });
        }

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);

        var esckey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        esckey.onDown.addOnce(this.start, this);



        /*
        if(game.device.android || game.device.iOS)
        {
          menuButton = game.add.button(game.world.width *.5,game.world.height * - 100, 'menuButton');
          menuButton.onInputUp.add(this.start,this);
        }
        */
    },
    start: function () {
        music.stop();
        game.state.start('menu');
    }
};
