//game play path, for arcade mode, after character selection, call randomize method, then go to TCS state, then play, after play, win screen, then randomize again and tcs again, repeat until stagenumber == 4?
class ScoreCounter {
    constructor() {
        this.arcadeLevel = 0;
        this.ScoreMaster = [0, 0]; //2d matrix each index is an rgb for a character, player1, player2/npc
        this.ScoreTemp = [0, 0];
    }

    updateScore(player, points){
        this.ScoreTemp[player] += points;
    }

    updateMasterScore(){
        this.ScoreMaster[0] += this.ScoreTemp[0];
        this.ScoreMaster[1] += this.ScoreTemp[1];
    }

    calcLivesLostPoints(){

    }

    calcThrowPoints(){

    }

    calcDmgDealtPoints(){

    }

    calcDmgTakenPoints(){

    }

    calcTimePoints(){

    }

}