//game play path, for arcade mode, after character selection, call randomize method, then go to TCS state, then play, after play, win screen, then randomize again and tcs again, repeat until stagenumber == 4?

class GameInfo {
    constructor() {
        this.gameType = "Menu"; // gametype can be either Menu, Arcade, Multiplayer, Boss, or other gamemodes
        this.chosenStageName = ""; //game system variable to keep track of current stage
        this.arcadeLevel = 1;
        this.playerTint = [0,0]; //2d matrix each index is an rgb for a character, player1, player2/npc 
        this.scenario = "";

        this.matchOutcome = "";
        
        this.stageList = ["WestPrintStage", "WestDeskStage",  "MarstonTableStage", 
                          "GatorStage",     "TreeStage",      "TableTopStage",
                          "TableTop2Stage", "ReitzPondStage", "ReitzStepStage" ];
        
        this.stageHistory = [];

        this.scenarioList = ["MultiMan",  "1v1",       "Defender", 
                             "GatorFight","Boss",      "RockPaper",
                             "OnePunch",  "Invisible", "Reverse"];

        this.scenarioHistory = [];

        /*this.scenario = ["MultiMan", "1v1",      "Target", 
                         "1v2",      "Giant",    "Boss", 
                         "Metal",    "Invisible"];*/
        
        this.gameMinutes = 1;
        this.gameSeconds = 0;
        this.OnePunchDeath = 0; //10000;

        //list of playable characters
        this.characterList = ["Boxer", "Fighter", "Goth", "Lab"];

        //list of charcaters being used by players currently
        this.characters = ["Lab", "Lab", "Lab", "Lab"];

        this.characterHistory = [];

        this.lives = 1;

        this.ScoreKeeper = new ScoreCounter();

        //Tint list
        //this.white = "0xffffff";
        this.orange = "0xff8615";
        this.blue = "0x1c6bff";
        this.red = "0xcc0000";
        this.green = "0x33cc33";
        this.yellow = "0xffff00";
        this.purple = "0x9933ff";
        //this.black = "0x343434";
        
        //this.tintList = [this.white, this.orange, this.blue, this.red, this.green, this.yellow, this.purple, this.black];
        this.tintList = [this.orange, this.blue, this.red, this.green, this.yellow, this.purple];
    }

    randomscenario() {

        var randNum = Math.floor(Math.random() * 8);

        randNum = this.checkHistory(8, randNum, this.scenarioHistory)

        console.log(randNum);
        this.scenario = this.scenarioList[randNum];
        console.log("scenario: " + this.scenario);

        if (this.scenario === "OnePunch") {
            this.OnePunchDeath = 10000;
        }
        else {
            this.OnePunchDeath = 0; //10000;
        }

        this.scenarioHistory[this.scenarioHistory.length] = randNum;

    }

    // random aracde mode/stage selection for next match
    randomstage() {
        //select random number, use to access index in array containing list of arrays 
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 9);
        
        randNum = this.checkHistory(9, randNum, this.stageHistory)
        
        this.chosenStageName = this.stageList[randNum];
        console.log("stage?:" + this.ChosenStageName);

        this.stageHistory[this.stageHistory.length] = randNum;
    }

    randomcharacter(numSpot) {
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 4);

        //randNum = this.checkHistory(4, randNum, this.characterHistory)

        this.characters[numSpot] = this.characterList[randNum];
        console.log(randNum);
        this.characterHistory[this.characterHistory.length] = randNum;
    }

    randomtint(numSpot) {
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 6);
        this.playerTint[numSpot] = this.tintList[randNum];
    }

    checkHistory(randomSize, newEntry, entryHistory) {
        while(entryHistory.includes(newEntry)){
            newEntry = Math.floor(Math.random() * randomSize);
        }
        return newEntry;
    }

    //if multiplayer, follow options settings, if arcade follow arcade settings
    changemode(mode) {
        this.gameType = mode;
    }
    
    // reset game system settings
    resetsettings() {
        this.gameType = "Menu"
        this.characterHistory = [];
        this.stageHistory = [];
        this.scenarioHistory = [];
        this.stageName = "";
        this.arcadeLevel = 0;
    }

}