class ScoreCounter {
    constructor() {
        this.arcadeLevel = 0;
        this.scoreMaster = [0, 0];
        this.scoreTemp = [0, 0];
        this.pointTemp = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]]; // lives, dmgdealt, dmgtaken, time, throw
    }

    resetAll(){
        this.arcadeLevel = 0;
        this.scoreMaster = [0, 0];
        this.scoreTemp = [0, 0];
        this.pointTemp = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]];
    }

    softReset(){
        this.scoreTemp = [0, 0];
        this.pointTemp = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]];
    }

    resetScoreTemp(){
        this.scoreTemp = [0, 0];
    }

    resetPoint(){
        this.pointTemp = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]];
    }

    updatePoint(player, spot, points){
        (this.pointTemp[player][spot]) += points;
    }

    calcScore(player){
        //check player number logic
        //player = this.verifyPlayer(player);

        //calc points where necessary
        
        //calc throws
        //this.calcThrowScore(player);

        //calc lives
        /*this.calcLivesLostScore(player);

        this.calcDmgDealtPoints(player);

        this.calcDmgTakenPoints(player);*/

        //lives lost bonus
        this.updateScore(this.verifyPlayer(player), this.calcLivesLostScore(player));

        //damage dealt
        this.updateScore(this.verifyPlayer(player), this.calcDmgDealtPoints(player));

        //damage taken
        this.updateScore(this.verifyPlayer(player), this.calcDmgTakenPoints(player));

        //time
        //this.updateScore(this.verifyPlayer(player), this.calcLivesLostScore(player));

        //throws
        //this.updateScore(this.verifyPlayer(player), this.calcLivesLostScore(player));
        
        //player = this.verifyPlayer(player);
        //update scores
        //this.updateScore(player, this.pointTemp[player] [0]);//already calced by other func
        
        //this.updateScore(player, this.pointTemp[player][1]);
        //this.updateScore(player, this.pointTemp[player][2]);
        //this.updateScore(player, this.pointTemp[player][3]);
        //this.updateScore(player, this.pointTemp[player] [4]);
    }

    verifyPlayer(oldplayer){
        //check player number logic
        let player = oldplayer;

        if(player <= 1 && player >= -1){
            player = 0; //player1
        }
        else {
            player = 1;//player 2/AI
        }
        
        return player;       
    }

    updateScore(player, points){
        //check player number logic
        //player = this.verifyPlayer(player);
        
        this.scoreTemp[player] += points;
    }

    updateMasterScore(player){
        //check player number logic
        player = this.verifyPlayer(player);
        
        this.scoreMaster[player] += this.scoreTemp[player];
    }

    calcLivesLostScore(player){
        //check player number logic
        player = this.verifyPlayer(player);

        let score = 1000;

        if (this.pointTemp[player][0] != 0) {
            score = 0;
        }
        //this.updateScore(player, score);
        return score;
    }

    calcThrowScore(player){
        //check player number logic
        player = this.verifyPlayer(player);
        
        let score = (this.pointTemp[player] [4]) * 50;
        if(score > 500){
           score = 500
        }

        return score;
        //this.updateScore(player, score);
    }

    calcThrowPoints(player, points){
        //check player number logic
        player = this.verifyPlayer(player);
        
        return points;
        //this.updatePoint(player, 4, points);
    }

    calcLivePoints(player, points){
        //check player number logic
        player = this.verifyPlayer(player);
        
        return points;
        //this.updatePoint(player, 0, points);
    }

    calcDmgDealtPoints(player){
        //check player number logic
        player = this.verifyPlayer(player);

        //multiply by 6 but its really 7 cause added back to original
        let points = 6 * this.pointTemp[player][1];
        if (points > 1000) {
            points = 1000;
        }

        return points;
        //this.updatePoint(player, 1, points);
    }

    calcDmgTakenPoints(player){
        //check player number logic
        player = this.verifyPlayer(player);
        
        let points = 1000 - 5 * this.pointTemp[player][2];
        if (points < 0) {
            points = 0;
        }

        return points;
        //this.updatePoint(player, 2, points);
    }

    calcTimePoints(player, timeLeft, timeStart){
        //check player number logic
        player = this.verifyPlayer(player);
        
        let points = 500;
        if(timeLeft < 15){
            points = 100;
        }
        else if(timeLeft < 30){
            points = 200;
        }
        else if(timeLeft < 45){
            points = 300;
        }
        else if(timeLeft < 60){
            points = 400;
        }

        return points;
        //this.updatePoint(player, 3, points);
    }
}