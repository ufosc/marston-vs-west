console.log("loadstate reached");
var loadState = {

    preload: function () {
        var loadingLabel = game.add.text(80, 150, 'Loading...', { font: '30px Courier', fill: '#ffffff' });

        //Fighting assets

        //game.load.image('sky', 'assets/sky.png');
        game.load.image('sky', 'assets/TestStage2.png');
        game.load.image('WestPrintStage', 'assets/Stage/WestPrint.jpg');
        game.load.image('WestDeskStage', 'assets/Stage/WestDesk.jpg');
        game.load.image('MarstonTableStage', 'assets/Stage/MarstonTable.jpg');
        game.load.image('GatorStage', 'assets/Stage/gator.jpg');
        game.load.image('TreeStage', 'assets/Stage/Tree.jpg');
        game.load.image('TableTopStage', 'assets/Stage/TableTop.jpg');
        game.load.image('TableTop2Stage', 'assets/Stage/TableTop2.jpg');
        game.load.image('ReitzPondStage', 'assets/Stage/ReitzPond.jpg');
        game.load.image('ReitzStepStage', 'assets/Stage/ReitzSteps.jpg');
        
        
        //game.load.image('ground', 'assets/platform.png');
        //game.load.image('ground', 'assets/platform2.png');
        game.load.image('ground', 'assets/floorblock.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('ColorBottle', 'assets/ColorBottleB.png');
        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

        //game.load.spritesheet('dude', 'assets/Fighter1master.png', 36, 42);
        //game.load.spritesheet('chick', 'assets/Fighter2master.png', 36, 42);
        //game.load.spritesheet('dude', 'assets/TESTFIGHTER1.png', 64, 84);
        //game.load.spritesheet('dude', 'assets/Fighters/Blanks/DJ_W.png', 64, 84);
        //game.load.spritesheet('chick', 'assets/TESTFIGHTER2.png', 64, 84);
        //game.load.spritesheet('goth', 'assets/Fighters/Blanks/Goth_W.png', 64, 96);
        //game.load.spritesheet('boxer', 'assets/Fighters/Blanks/Boxer_W.png', 64, 96);
        game.load.spritesheet('Fighter', 'assets/Fighters/Canvas/Fighter_Blank.png', 64, 84);
        game.load.spritesheet('Lab','assets/Fighters/Canvas/Nerd_Blank.png', 60, 94);
        game.load.spritesheet('Goth', 'assets/Fighters/Canvas/Goth_Blank.png', 64, 96);
        game.load.spritesheet('Boxer','assets/Fighters/Canvas/Boxer_Blank.png', 100, 93);

        game.load.image('hitboxTest', 'assets/testHitbox.png');
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.spritesheet('slash', 'assets/slash (1).png', 64, 64);
        game.load.spritesheet('slash2', 'assets/slash.png', 32, 32);
        game.load.spritesheet('helmet', 'assets/helmet.png', 32, 32);
        game.load.spritesheet('bottle', 'assets/bottle.png', 32, 32);
        game.load.spritesheet('book', 'assets/book.png', 32, 32);
        game.load.spritesheet('Sandbag', 'assets/sandbag.png', 32, 32);
        game.load.image('deathBlast', 'assets/DeathBlast.png');
        
        //Punching effect assets
        game.load.image('pow', 'assets/pow.png');
        game.load.image('ugh', 'assets/ugh.png');
        game.load.image('ouch', 'assets/ouch.png');

        //swipe attack sprites
        /*game.load.image('SwipeD', 'assets/swipeD.png');
        game.load.image('SwipeFD', 'assets/swipeFD.png');
        game.load.image('SwipeFU', 'assets/swipeFU.png');
        game.load.image('SwipeU', 'assets/swipeU.png');*/
        
        game.load.image('SwipeV', 'assets/SwipeBoxV.png');
        game.load.image('SwipeH', 'assets/SwipeBoxH.png');

        //Virtual controller assets
        game.load.image('leftButton', 'assets/ButtonLeftbig.png');

        game.load.image('rightButton', 'assets/ButtonRightbig.png');
        game.load.image('upButton', 'assets/ButtonUpbig.png');
        game.load.image('downButton', 'assets/ButtonDownbig.png');

        game.load.image('aButton', 'assets/ButtonAbig.png');
        game.load.image('bButton', 'assets/ButtonBbig.png');
        game.load.image('xButton', 'assets/ButtonXbig.png');
        game.load.image('yButton', 'assets/ButtonYbig.png');

        //Menu Assets
        
        game.load.image('menuButton', 'assets/menuButton.png');
        this.game.load.audio('creditsMusic', 'assets/Birdbeat.ogg');
        this.game.load.audio('menuMusic', 'assets/Birdbeat.ogg');
        this.game.load.audio('allstar', 'assets/swampysmash.ogg');
        game.load.image('marstonPic', 'assets/thegreatestlibrary.jpg');
        game.load.image('westPic', 'assets/theworstlibrary.jpg');
        game.load.image('fullScreenButton', 'assets/fullScreenButton.png');
        game.load.image('displayButton1', 'assets/displayButton1.png');
        game.load.image('displayButton2', 'assets/displayButton2.png');
        game.load.image('displayButton3', 'assets/displayButton3.png');
        game.load.image('displayButton4', 'assets/displayButton4.png');
        game.load.image('player1cssIcon', 'assets/player1cssIcon.png');
        game.load.image('player2cssIcon', 'assets/player2cssIcon.png');
        game.load.image('minusButton', 'assets/minusButton.png');
        game.load.image('plusButton', 'assets/plusButton.png');
        //game.load.image('dudeIcon', 'assets/dudeIcon.png');
        //game.load.image('chickIcon', 'assets/chickIcon.png');
        game.load.image('LabIcon', 'assets/CharIcon/LabIcon.png');
        game.load.image('GothIcon', 'assets/CharIcon/GothIcon.png');
        game.load.image('FighterIcon', 'assets/CharIcon/FighterIcon.png');
        game.load.image('BoxIcon', 'assets/CharIcon/BoxIcon.png');

        //game.load.spritesheet('crowd', 'assets/dude.png', 32, 48);        
        
        //Audio
        game.load.audio('hitSound', 'assets/audio/jab.wav');
        game.load.audio('hitSound1', 'assets/audio/RightCross.wav');
        game.load.audio('hitSound2', 'assets/audio/LeftHook.wav');
        game.load.audio('hitSound3', 'assets/audio/RightHook.wav');

        //game.load.audio('hitSound', 'assets/hitSound.wav');
        game.load.audio('jumpSound', 'assets/jumpSound.wav');
        game.load.audio('buttonSound', 'assets/buttonSound.wav');
        game.load.audio('deathSound', 'assets/deathSound.wav');
        game.load.audio('respawnSound', 'assets/respawnSound.wav');
        game.load.image('vsIcon', 'assets/vsIcon.png');
        game.load.image('computerIcon', 'assets/aiImage.jpg')
        game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Fire.js');
        game.load.audio('itemSound', 'assets/itemSound.wav');
        game.load.audio('titleCardSound', 'assets/titlecarddota.mp3');
        
        //game.load.audio('playMusic', 'assets/playTestMusic.ogg');
        game.load.tilemap('tilemap1', 'assets/Floor.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('gator', 'assets/gatorBat.png', 32, 32);
        game.load.spritesheet('helmet', 'assets/helmet.png', 32, 32);

        game.load.image('blueDamageBox', 'assets/damageBorder1.png');
        game.load.image('orangeDamageBox', 'assets/damageBorder2.png');
        game.load.image('orangeStock', 'assets/orangeStock.png');
        game.load.image('blueStock', 'assets/blueStock.png');
        game.load.image('dust', 'assets/dust.png');
        game.load.image('music_icon', 'assets/music_sprite.png');

        //Menu Images
        game.load.image('menuBackground', 'assets/MvW Menus/MainMenu_Sprites/Sprites/Brick Wall_Background.png');
        game.load.image('logo', 'assets/MvW Menus/MainMenu_Sprites/Sprites/Main_Menu_Logo_Sprite.png');
        game.load.image('startButton', 'assets/MvW Menus/MainMenu_Sprites/Buttons/Start_Button.png');
        game.load.image('arcadeButton', 'assets/MvW Menus/MainMenu_Sprites/Buttons/Arcade_Button.png');
        game.load.image('optionButton', 'assets/MvW Menus/MainMenu_Sprites/Buttons/Options_Button.png');
        game.load.image('creditButton', 'assets/MvW Menus/MainMenu_Sprites/Buttons/Exit_Button.png');
        game.load.image('chooseStage', 'assets/MvW Menus/MapMenu_Sprites/Sprites/ChooseYourStage_Sprite.png');
        game.load.image('plus', 'assets/MvW Menus/OptionMenu_Sprites/Buttons/Add_Button.png');
        game.load.image('minus', 'assets/MvW Menus/OptionMenu_Sprites/Buttons/Minus_Button.png');
        game.load.image('fullscreen', 'assets/MvW Menus/OptionMenu_Sprites/Buttons/Fullscreen_Button.png');
        game.load.image('minutes', 'assets/MvW Menus/OptionMenu_Sprites/Sprites/Minutes_Sprite.png');
        game.load.image('seconds', 'assets/MvW Menus/OptionMenu_Sprites/Sprites/Seconds_Sprite.png');
        game.load.image('settings', 'assets/MvW Menus/OptionMenu_Sprites/Sprites/Settings_Sprite.png');
        game.load.image('Pause Menu', 'assets/MvW Menus/Pause_Screen.png');
        game.load.image('Kim', 'assets/bottle.png');//for sliding bar and needs to be modified (?)
        game.load.image('Chi', 'assets/WhiteBall.png');//for sliding bar and needs to be modified (?)
        game.load.image('knob', 'assets/WhiteBall.png');//for sliding bar and needs to be modified (?)
        game.load.image('mute', 'assets/mute.png');
        
        game.load.image('helpButton', '/assets/helpButton.png');
    },
    create: function () {
        music = game.add.audio('menuMusic');
        music.loopFull();
        game.state.start('menu');
    },
    update: function(){
        music.volume = musicvol;

    }
};
