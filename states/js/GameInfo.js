//game play path, for arcade mode, after character selection, call randomize method, then go to TCS state, then play, after play, win screen, then randomize again and tcs again, repeat until stagenumber == 4?


class GameInfo {
    constructor() {
        this.gameType = "Menu"; // gametype can be either Menu Arcade, Multiplayer, Boss, or other gamemodes
        this.stageName = ""; //game system variable to keep track of current stage
        this.arcadeLevel = 0;
        this.playersTint;
        this.stages = ["Marston", "West"];
        
        this.gameMinutes = 1;
        this.gameSeconds = 0;

        this.lives = 3;

    }

    // random aracde mode/stage selection for next match
    random() {
        //select random number, use to access index in array containing list of arrays 
        this.stageName = "";
    }

    //if multiplayer, follow options settings, if arcade follow arcade settings
    changemode(mode){
        this.gameType = mode;
        
    }

    // reset game system settings
    resetsettings() {
        this.gameType = "Menu"
        this.stageName = "";
        this.arcadeLevel = 0;
    }

}