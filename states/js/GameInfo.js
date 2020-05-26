class GameInfo {
    constructor() {
        this.gameType = "Menu"; // gametype can be either Menu, Arcade, Multiplayer, Boss, or other gamemodes
        this.chosenStageName = ""; //keep track of current stage
        this.arcadeLevel = 1;
        this.playerTint = [0,0]; //each index is an rgb value for a character, player1, player2/npc 
        this.scenario = "";

        this.difficulty = ""; //difficulty in aracde mode is either undergrad or grad level

        this.matchOutcome = "";
        
        this.stageList = ["WestPrintStage", "WestDeskStage",  "MarstonTableStage", 
                          "GatorStage",     "TreeStage",      "TableTopStage",
                          "TableTop2Stage", "ReitzPondStage", "ReitzStepStage" ];
        
        this.stageHistory = [];

        //first row is normal or undergrad mode, 2nd row is hard or grad level, third row is minigames
        this.scenarioList = ["1v1",      "Metal",    "Invisible",
                             "OnePunch", "MultiMan", "GatorFight",
                             "Sculpt"]; 

        this.scenarioHistory = [];
        
        this.gameMinutes = 1;
        this.gameSeconds = 0;
        this.OnePunchDeath = false; //10000;

        //list of playable characters
        this.characterList = ["Boxer", "Fighter", "Goth", "Lab"];

        //list of charcaters being used by players currently
        this.characters = ["Lab", "Lab", "Lab", "Lab"];

        this.characterHistory = [];

        this.lives = 1;

        this.ScoreKeeper = new ScoreCounter();

        //Tint list
        this.orange = "0xff8615";
        this.blue = "0x1c6bff";
        this.red = "0xcc0000";
        this.green = "0x33cc33";
        this.yellow = "0xffff00";
        this.purple = "0x9933ff";
        
        this.tintList = [this.orange, this.blue, this.red, this.green, this.yellow, this.purple];
    }

    randomscenario() {

        var randNum = Math.floor(Math.random() * 6);

        randNum = this.checkHistory(6, randNum, this.scenarioHistory)

        this.scenario = this.scenarioList[randNum];

        if (this.scenario === "OnePunch") {
            this.OnePunchDeath = true;
        }
        else {
            this.OnePunchDeath = false;
        }

        this.scenarioHistory[this.scenarioHistory.length] = randNum;

    }

    // random aracde mode/stage selection for next match
    randomstage() {
        //select random number, use to access index in array containing list of arrays 
        var randNum = Math.floor(Math.random() * 9);
        
        randNum = this.checkHistory(9, randNum, this.stageHistory)
        
        this.chosenStageName = this.stageList[randNum];

        this.stageHistory[this.stageHistory.length] = randNum;
    }

    randomcharacter(numSpot) {
        //randNum = 0;
        var randNum = Math.floor(Math.random() * 4);
        console.log(randNum);
        //randNum = this.checkHistory(4, randNum, this.characterHistory)
        randNum = this.checkHistory(4, randNum, this.characterHistory)
        this.characters[numSpot] = this.characterList[randNum];
        console.log(this.characters[numSpot]);
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

        //this.gameType = "Menu"
        console.log("reset?");
        this.matchOutcome = "";
        this.characterHistory = [];
        this.stageHistory = [];
        this.scenarioHistory = [];
        this.stageName = "";
        this.arcadeLevel = 1;
    }

}