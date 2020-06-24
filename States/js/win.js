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

        music.stop();

        //TextButton
        menuLabel = new TextButton(this.game, game.world.width * .65, game.world.height * .1, 'MENU', { font: '90px Permanent Marker', fill: '#ffffff' });

        menuLabel.events.onInputUp.add(function () {
            game.state.start('menu');
        });

        var startLabel = new TextButton(this.game, game.world.width * 0.75, game.world.height * 0.7, 'Press "W" key\nor tap this label\nto continue', { font: '50px Permanent Marker', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5,0.5);
        
        feedbackLabel = new Link(this.game, game.world.width * 0.75, game.world.height * 0.4, "Click here to\nsend feedback!", "https://goo.gl/forms/wA6NGUAJ4OiKhVC93", { font: '50px Permanent Marker', fill: '#ffffff' });
        feedbackLabel.anchor.setTo(0.5, 0.5);

        console.log("win.js???");

        if(gameManager.gameType === "Arcade") {

            if(Player1.lives < 0){
                gameManager.matchOutcome = "Loss"
            }

            gameManager.ScoreKeeper.ArcCalcScore(1);
            gameManager.ScoreKeeper.updateMasterScore(1);
            
            if(gameManager.matchOutcome === "Win"){
            
                if(gameManager.arcadeLevel == 4){
                    var winBanner = game.add.text(80, 20,
                    "ONLY A TRUE GATOR CAN WIN IT ALL, CONGRATS!"
                    ,{ font: '50px Permanent Marker', fill: '#ffffff' });
                }
                else {
                    var winBanner = game.add.text(80, 20,
                        "MATCH WIN!"
                        ,{ font: '50px Permanent Marker', fill: '#ffffff' });
                }
            }

            else if(gameManager.matchOutcome === "Loss"){
                var winBanner = game.add.text(80, 20,
                    "MATCH LOSS ..."
                    ,{ font: '50px Permanent Marker', fill: '#ffffff' });
            }

            var statsLabel1 = game.add.text(80, 85,
              'LEVEL' + gameManager.arcadeLevel + '\n'
            + `Player 1 stats:` + '\n' 
            + `Lives Lost Bonus: ${gameManager.ScoreKeeper.calcLivesLostScore(0)}` + '\n'
            + `Damage Dealt: ${gameManager.ScoreKeeper.pointTemp[0][1]}` + '\n'
            + `Damage Dealt Bonus: ${gameManager.ScoreKeeper.calcDmgDealtPoints(0)}` + '\n'
            + `Damage Taken: ${gameManager.ScoreKeeper.pointTemp[0][2]}` + '\n'
            + `Damage Taken Bonus: ${gameManager.ScoreKeeper.calcDmgTakenPoints(0)}` + '\n'
            //+ `Time Left: ${gameManager.ScoreKeeper.pointTemp[0][4]}` + '\n'
            + `Time Left Bonus: ${gameManager.ScoreKeeper.calcTimePoints(0)}` + '\n'
            + `Match Score: ${gameManager.ScoreKeeper.scoreTemp[0]}` + '\n'
            + `Total Score: ${gameManager.ScoreKeeper.scoreMaster[0]}`
            , { font: '50px Permanent Marker', fill: '#ffffff' });

        }
        else if (gameManager.gameType === "MultiPlayer"){
            gameManager.ScoreKeeper.calcScore(1);
            gameManager.ScoreKeeper.calcScore(2);

            var statsLabel1 = game.add.text(40, 160, `Player 1 stats:` + '\n' 
            + `Score: ${gameManager.ScoreKeeper.scoreTemp[0]}` + '\n'
            + `Lives Lost Bonus: ${gameManager.ScoreKeeper.calcLivesLostScore(0)}` + '\n'
            + `Damage Dealt: ${gameManager.ScoreKeeper.pointTemp[0][1]}` + '\n'
            + `Damage Dealt Bonus: ${gameManager.ScoreKeeper.calcDmgDealtPoints(0)}` + '\n'
            + `Damage Taken: ${gameManager.ScoreKeeper.pointTemp[0][2]}` + '\n'
            + `Damage Taken Bonus: ${gameManager.ScoreKeeper.calcDmgTakenPoints(0)}` + '\n'
            , { font: '50px Permanent Marker', fill: '#ffffff' });

            var statsLabel2 = game.add.text((game.world.width* 0.5) + 20, 160, `Player 2 stats:` + '\n' 
            + `Score: ${gameManager.ScoreKeeper.scoreTemp[1]}` + '\n'
            + `Lives Lost Bonus: ${gameManager.ScoreKeeper.calcLivesLostScore(2)}` + '\n'
            + `Damage Dealt: ${gameManager.ScoreKeeper.pointTemp[1][1]}` + '\n'
            + `Damage Dealt Bonus: ${gameManager.ScoreKeeper.calcDmgDealtPoints(2)}` + '\n'
            + `Damage Taken: ${gameManager.ScoreKeeper.pointTemp[1][2]}` + '\n'
            + `Damage Taken Bonus: ${gameManager.ScoreKeeper.calcDmgTakenPoints(2)}` + '\n'
            , { font: '50px Permanent Marker', fill: '#ffffff' });

            startLabel.inputEnabled = false;
            startLabel.alpha = 0;

            feedbackLabel.x = game.world.width * 0.25;
            feedbackLabel.y = game.world.height * 0.12;

        }
        else {
            if(multimanmode == false){
                if (Player1.lives > Player2.lives) {
                    var winLabel = game.add.text(game.world.width*0.4, 80, 'Player 1 won!', { font: '50px Permanent Marker', fill: '#ffffff' });
                }
                else if (Player1.lives == Player2.lives) {
                    var winLabel = game.add.text(game.world.width*0.4, 80, "It's a tie", { font: '50px Permanent Marker', fill: '#ffffff' });
                }
                else {
                    var winLabel = game.add.text(game.world.width*0.4, 80, 'Player 2 won!', { font: '50px Permanent Marker', fill: '#ffffff' });
                }
                var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' + `Lives: ${Player1.lives}`, { font: '50px Permanent Marker', fill: '#ffffff' }); 
                var statsLabel2 = game.add.text(game.world.width*0.7, 160, `Player 2 stats:` + '\n' + `Lives: ${Player2.lives}`,{ font: '50px Permanent Marker', fill: '#ffffff' });
            }
            else{
                var winLabel = game.add.text(80, 80, 'Nice Game!', { font: '50px Permanent Marker', fill: '#ffffff' });
                var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' + `KO(s): ${multimenko}`, { font: '50px Permanent Marker', fill: '#ffffff' });
            }
        }
            startLabel.events.onInputUp.add(function () {
                music.stop();
                gameManager.ScoreKeeper.resetAll();

                music.stop();

                if(gameManager.gameType === "Arcade") {
                    if(gameManager.matchOutcome === "Win" && gameManager.arcadeLevel < 5) {
                        gameManager.arcadeLevel += 1;
                    }
                    if(gameManager.matchOutcome === "Win" && gameManager.arcadeLevel >= 5 ){
                        
                        console.log("win state back to menu");

                        gameManager.ScoreKeeper.resetAll();
                        
                        gameManager.changemode("Menu");
                        
                        game.state.start('menu');
                    }
                    else{
                        gameManager.ScoreKeeper.softReset();
                        game.state.start('arctcs');
                    }
                }
                else{
                    gameManager.ScoreKeeper.resetAll();
                    gameManager.changemode("Menu");
                    game.state.start('menu');
                }
            });

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);

        var esckey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        esckey.onDown.addOnce(this.start, this);
    },
    start() {
        music.stop();

        if(gameManager.gameType === "Arcade") {
            if(gameManager.matchOutcome === "Win" && gameManager.arcadeLevel <= 5) {
                gameManager.arcadeLevel += 1;
                //gameManager.ScoreKeeper.scoreMaster = gameManager.ScoreKeeper.scoreMaster - 2000;
                gameManager.ScoreKeeper.softReset();
                game.state.start('arctcs');
            }
            if(gameManager.matchOutcome === "Win" && gameManager.arcadeLevel >= 5 ){

                gameManager.ScoreKeeper.resetAll();
                gameManager.changemode("Menu");
                gameManager.resetsettings();
                game.state.start('menu');
            }
        }
        else{
            gameManager.ScoreKeeper.resetAll();
            gameManager.changemode("Menu");
            game.state.start('menu');
        }
    }
};