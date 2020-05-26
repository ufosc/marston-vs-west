class DialogueManager {

    constructor() {

        this.phrase;

        this.response;

        this.phraseList = [
            "I actually prefer Pugh" ,  
            "You killed my father!",   
            "Time to avenge \nmy village",
            "Yeah it's big \nbrain time",
            "Why do we fight?",
            "Why don't we\njust not fight and have a\ncoffee baby <3",
            "Ummm ... Line!?!?",
            "Marston for life!",
            "West for life!",
            "Who are you!?!?",
            "We are all but \nactors on a stage we\ncall life",
            "Ever think theres\nmore to life than punching?",
            "I'm gonna be king\nof the ninjas and slay\nthe evil demon lord!",
            "10010001111001",
            "Orange and blue\nis a terrible color combination",
            "A gator mascot\nis so overated",
            "I'm actually\njust here to hit on people",
            "Hey cutie ;p"
        ];

        this.responseList = [
            "You're worse than\nthe last guy!",
            "Umm dude ...\nwrong game",
            "Good for you man,\nwait what!?!?",
            "Big brain,\nmeet fist",
            "That's Honsetly\na great question,\nwe can talk after I'm done kicking your butt!",
            "Eww seriously?\nI'm gonna karate\nyou extra for that",
            "Wait there's\na script?",
            "You monster!",
            "NEVER!",
            "Does anyone really\nknow themselves?",
            "To punch or not\nto punch, that is the question",
            "You mean like\n... kicking?",
            "Way too\nmuch anime …",
            "Time for a hard\nreboot (and maybe some sleep)",
            "Take ... that\n... BACK!",
            "I can't tell\nif you're joking or\nif you really believe that",
            "Hit people,\nhit on people,\nsubtle but big difference",
            "Yeah, I'm gonna\nhave to left swipe that"
        ];

        this.previousCalls = [];

    }

    selectPhrase() {

        var randNum = Math.floor(Math.random() * 18);
        this.Phrase = this.phraseList[randNum];
        this.Response = this.responseList[randNum];

    }

}