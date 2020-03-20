//game play path, for arcade mode, after character selection, call randomize method, then go to TCS state, then play, after play, win screen, then randomize again and tcs again, repeat until stagenumber == 4?

class GameInfo {
    constructor() {
        this.gameType = "Menu"; // gametype can be either Menu, Arcade, Multiplayer, Boss, or other gamemodes
        this.chosenStageName = ""; //game system variable to keep track of current stage
        this.arcadeLevel = 1;
        this.playerTint = [0,0]; //2d matrix each index is an rgb for a character, player1, player2/npc 
        
        this.stageList = ["WestPrintStage", "WestDeskStage",    "MarstonTableStage", 
                        "GatorStage",     "TreeStage",       "TableTopStage",
                        "TableTop2Stage", "ReitzPondStage",  "ReitzStepStage" ];
        
        this.scenario = ["MultiMan", "1v1",      "Target", 
                         "1v2",      "Giant",    "Boss", 
                         "Metal",    "Invisible"]
        
        this.gameMinutes = 1;
        this.gameSeconds = 0;
        this.OnePunchDeath = 10000;
        //list of playable characters
        this.characterList = ["Boxer", "Fighter", "Goth", "Lab"];

        //list of charcaters being used by players currently
        this.characters = ["Lab", "Lab", "Lab", "Lab"];
        //this.charName2 = "Boxer";

        this.lives = 3;

        this.ScoreKeeper = new ScoreCounter();

        //Tint list
        this.white = "0xffffff";
        this.orange = "0xff8615";
        this.blue = "0x1c6bff";
        this.red = "0xcc0000";
        this.green = "0x33cc33";
        this.yellow = "0xffff00";
        this.purple = "0x9933ff";
        this.black = "0x343434";
        
        this.tintList = [this.white, this.orange, this.blue, this.red, this.green, this.yellow, this.purple, this.black];

    }

    // random aracde mode/stage selection for next match
    randomstage() {
        //select random number, use to access index in array containing list of arrays 
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 10);
        this.chosenStageName = this.stageList[randNum];
        console.log("stage?:" + this.ChosenStageName);
    }

    randomcharacter(numSpot) {
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 4);
        this.characters[numSpot] = this.characterList[randNum];
        console.log(randNum);
    }

    randomtint(numSpot) {
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 9);
        this.playerTint[numSpot] = this.tintList[randNum];
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