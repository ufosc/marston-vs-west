var config =
{
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    parent: 'gameDiv',
    transparent: false,
    antialias: false,
    state: this,
    scaleMode: Phaser.ScaleManager.SHOW_ALL

}

var game = new Phaser.Game(config);
//Change the screen dimensions to accomidate mobile users (eventually will change other things about mobile experience but not here)
//Start mobile users in exact_fit with full screen default

var multimanmode = false;
var multimenko = 0;


var nameText1;
var nameText2;
var item1;
var controlOptionVpad = 1;
var controlOptionAI = 2;
var feedbackLabel;
var background;
var filter;
var key1;
var playSound;
var playMusic;
var hitSound;
var respawnSound;
var deathSound;
var buttonSound;
var jumpSound;
var isHitting = false;
var timer;
var timerText;
var player1Icon;
var player2Icon;
var marstonPicture;
var westPicture;
var mob;
var people;

var lives;

var hitpause;

//Display options variables
var stretchFullScreen;
var resizeFullScreen;
var preservedFullScreen;
var borderFullScreen;

var displayOptionButton1;
var displayOptionButton2;
var displayOptionButton3;
var displayOptionButton4;

var player;
var weapon;
var weapon2;
var weapon3;
var weapon3y;

var weapon1;


var platforms;
var cursors;
var punchkey;
var combo = 0; //variable for punch comobo
var kickkey;
var j = 0; // temporary variable

var energyText;
var playerstate; //may be implemented later on in fighter class


var controller;
var pun;

var stars;
var score = 0;
var scoreText;

var healthtext1;
var healthtext2;

var livetext1;
var livetext2;
var charactername;
var player1Text;
var player2Text;
var gameReadyText;
var charName1 = "";
var charName2 = "";
var charSelected1 = false;
var charSelected2 = false;
var botSelected = false;
var charPortrait1;
var charPortrait2;
var dudeIcon;
var chickIcon;
var dudeBodyIcon;
var chickBodyIcon;
var player1BodyIcon;
var player2BodyIcon;


//gamepad stuff

var nesaButton;
var nesbButton;
var nesxButton;
var nesyButton;
var nesleftButton;
var nesrightButton;
var nesupButton;
var nesdownButton;
var indicator;
var pad1;
var testconnect1;
//end of gamepad variables




var style =
    {
        font: "bold 32px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top"
    };

var style2 =
    {
        font: "bold 32px Skranji", fill: "#ffff00", boundsAlignH: "left", boundsAlignV: "top"
    };


var enemyText;
var enemy;
var bottle;
var helmet;

var hitbox1;
var myPlayer;
var hitboxes;


var prevkey; //currently unused

var Player1;
var Player2;
var Player3;
var Player4;

var controller1;
var controller2;

//cooldown vars
var cooldown1;
var cooldown2;

var charactername;
var minLabel;
var secLabel;
var pauseLabel;
var choiseLabel;
var pauseMenu;
var startButton;
var optionsButton;
var quitButton;
var menuButton;
var fullScreenButton;
var displayButton1;
var displayButton2;
var displayButton3;
var displayButton4;
var gameMinIncButton;
var gameSecIncButton;
var gameMinDecButton;
var gameSecDecButton;

var music;

var gameMinutes = 1;
var gameSeconds = 0;

var stage1;
var stage2;
var chosenStageName;
var chosenMap;

game.state.add('boot',bootState);
game.state.add('options',optionsState);
game.state.add('credits',creditsState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('win',winState);
game.state.add('css', cssState);
game.state.add('sss', sssState);

game.state.start('boot');
