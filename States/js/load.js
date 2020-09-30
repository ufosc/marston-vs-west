var loadState = {

    preload: function () {
        var loadingLabel = game.add.text(80, 150, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
        //Fighting assets

        //game.load.image('sky', 'assets/sky.png');
        game.load.image('sky', 'https://ufosc.github.io/marston-vs-west/assets/TestStage2.png');
        game.load.image('WestPrintStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/WestPrint.jpg');
        game.load.image('WestDeskStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/WestDesk.jpg');
        game.load.image('MarstonTableStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/MarstonTable.jpg');
        game.load.image('GatorStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/gator.jpg');
        game.load.image('TreeStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/Tree.jpg');
        game.load.image('TableTopStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/TableTop.jpg');
        game.load.image('TableTop2Stage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/TableTop2.jpg');
        game.load.image('ReitzPondStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/ReitzPond.jpg');
        game.load.image('ReitzStepStage', 'https://ufosc.github.io/marston-vs-west/assets/Stage/ReitzSteps.jpg');
        
        
        //game.load.image('ground', 'https://ufosc.github.io/marston-vs-west/assets/platform.png');
        //game.load.image('ground', 'https://ufosc.github.io/marston-vs-west/assets/platform2.png');
        game.load.image('ground', 'https://ufosc.github.io/marston-vs-west/assets/floorblock.png');
        game.load.image('plat1', 'https://ufosc.github.io/marston-vs-west/assets/Floor/Plat1.png');
        game.load.image('plat2', 'https://ufosc.github.io/marston-vs-west/assets/Floor/Plat2.png');
        game.load.image('star', 'https://ufosc.github.io/marston-vs-west/assets/star.png');
        game.load.image('ColorBottle', 'https://ufosc.github.io/marston-vs-west/assets/ColorBottleB.png');
        
        game.load.spritesheet('Fighter', 'https://ufosc.github.io/marston-vs-west/assets/Fighters/Canvas/Fighter_Blank.png', 64, 84);
        game.load.spritesheet('Lab','https://ufosc.github.io/marston-vs-west/assets/Fighters/Canvas/Nerd_Blank.png', 60, 94);
        game.load.spritesheet('Goth', 'https://ufosc.github.io/marston-vs-west/assets/Fighters/Canvas/Goth_Blank.png', 64, 96);
        game.load.spritesheet('Boxer','https://ufosc.github.io/marston-vs-west/assets/Fighters/Canvas/Boxer_Blank.png', 100, 93);

        game.load.image('hitboxTest', 'https://ufosc.github.io/marston-vs-west/assets/testHitbox.png');
        game.load.spritesheet('baddie', 'https://ufosc.github.io/marston-vs-west/assets/baddie.png', 32, 32);
        game.load.spritesheet('slash', 'https://ufosc.github.io/marston-vs-west/assets/slash (1).png', 64, 64);
        game.load.spritesheet('slash2', 'https://ufosc.github.io/marston-vs-west/assets/slash.png', 32, 32);
        game.load.spritesheet('helmet', 'https://ufosc.github.io/marston-vs-west/assets/helmet.png', 32, 32);
        game.load.spritesheet('bottle', 'https://ufosc.github.io/marston-vs-west/assets/bottle.png', 32, 32);
        game.load.spritesheet('book', 'https://ufosc.github.io/marston-vs-west/assets/book.png', 32, 32);
        game.load.spritesheet('Sandbag', 'https://ufosc.github.io/marston-vs-west/assets/sandbag.png', 32, 32);
        game.load.image('deathBlast', 'https://ufosc.github.io/marston-vs-west/assets/DeathBlast.png');
        
        //Punching effect assets
        game.load.image('pow', 'https://ufosc.github.io/marston-vs-west/assets/pow.png');
        game.load.image('ugh', 'https://ufosc.github.io/marston-vs-west/assets/ugh.png');
        game.load.image('ouch', 'https://ufosc.github.io/marston-vs-west/assets/ouch.png');

        //swipe attack sprites
        /*game.load.image('SwipeD', 'assets/swipeD.png');
        game.load.image('SwipeFD', 'assets/swipeFD.png');
        game.load.image('SwipeFU', 'assets/swipeFU.png');
        game.load.image('SwipeU', 'assets/swipeU.png');*/
        
        /*game.load.image('SwipeV', 'assets/swipeFU.png');
        game.load.image('SwipeH', 'assets/swipeU.png');*/

        game.load.image('SwipeV', 'https://ufosc.github.io/marston-vs-west/assets/swipeV.png');
        game.load.image('SwipeH', 'https://ufosc.github.io/marston-vs-west/assets/swipeH.png');

        /*game.load.image('SwipeV', 'assets/SwipeBoxV.png');
        game.load.image('SwipeH', 'assets/SwipeBoxH.png');*/

        //Virtual controller assets
        game.load.image('leftButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonLeftbig.png');
        game.load.image('rightButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonRightbig.png');
        game.load.image('upButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonUpbig.png');
        game.load.image('downButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonDownbig.png');

        game.load.image('aButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonAbig.png');
        game.load.image('bButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonBbig.png');
        game.load.image('xButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonXbig.png');
        game.load.image('yButton', 'https://ufosc.github.io/marston-vs-west/assets/ButtonYbig.png');

        //Menu Assets   
        game.load.image('menuButton', 'https://ufosc.github.io/marston-vs-west/assets/menuButton.png');
        this.game.load.audio('creditsMusic', 'https://ufosc.github.io/marston-vs-west/assets/Birdbeat.ogg');
        this.game.load.audio('menuMusic', 'https://ufosc.github.io/marston-vs-west/assets/Birdbeat.ogg');
        this.game.load.audio('allstar', 'https://ufosc.github.io/marston-vs-west/assets/swampysmash.ogg');
        game.load.image('marstonPic', 'https://ufosc.github.io/marston-vs-west/assets/thegreatestlibrary.jpg');
        game.load.image('westPic', 'https://ufosc.github.io/marston-vs-west/assets/theworstlibrary.jpg');
        game.load.image('fullScreenButton', 'https://ufosc.github.io/marston-vs-west/assets/fullScreenButton.png');
        game.load.image('displayButton1', 'https://ufosc.github.io/marston-vs-west/assets/displayButton1.png');
        game.load.image('displayButton2', 'https://ufosc.github.io/marston-vs-west/assets/displayButton2.png');
        game.load.image('displayButton3', 'https://ufosc.github.io/marston-vs-west/assets/displayButton3.png');
        game.load.image('displayButton4', 'https://ufosc.github.io/marston-vs-west/assets/displayButton4.png');
        game.load.image('player1cssIcon', 'https://ufosc.github.io/marston-vs-west/assets/player1cssIcon.png');
        game.load.image('player2cssIcon', 'https://ufosc.github.io/marston-vs-west/assets/player2cssIcon.png');
        game.load.image('minusButton', 'https://ufosc.github.io/marston-vs-west/assets/minusButton.png');
        game.load.image('plusButton', 'https://ufosc.github.io/marston-vs-west/assets/plusButton.png');
        //game.load.image('dudeIcon', 'assets/dudeIcon.png');
        //game.load.image('chickIcon', 'assets/chickIcon.png');
        game.load.image('LabIcon', 'https://ufosc.github.io/marston-vs-west/assets/CharIcon/LabIcon.png');
        game.load.image('GothIcon', 'https://ufosc.github.io/marston-vs-west/assets/CharIcon/GothIcon.png');
        game.load.image('FighterIcon', 'https://ufosc.github.io/marston-vs-west/assets/CharIcon/FighterIcon.png');
        game.load.image('BoxIcon', 'https://ufosc.github.io/marston-vs-west/assets/CharIcon/BoxIcon.png');

        //game.load.spritesheet('crowd', 'assets/dude.png', 32, 48);        
        
        //Audio 
        game.load.audio('hitSound', 'https://ufosc.github.io/marston-vs-west/assets/audio/jab.wav');
        game.load.audio('hitSound1', 'https://ufosc.github.io/marston-vs-west/assets/audio/RightCross.wav');
        game.load.audio('hitSound2', 'https://ufosc.github.io/marston-vs-west/assets/audio/LeftHook.wav');
        game.load.audio('hitSound3', 'https://ufosc.github.io/marston-vs-west/assets/audio/RightHook.wav');

        //game.load.audio('hitSound', 'assets/hitSound.wav');

        game.load.audio('jumpSound', 'https://ufosc.github.io/marston-vs-west/assets/jumpSound.wav');
        game.load.audio('buttonSound', 'https://ufosc.github.io/marston-vs-west/assets/buttonSound.wav');
        game.load.audio('deathSound', 'https://ufosc.github.io/marston-vs-west/assets/deathSound.wav');
        game.load.audio('respawnSound', 'https://ufosc.github.io/marston-vs-west/assets/respawnSound.wav');
        game.load.image('vsIcon', 'https://ufosc.github.io/marston-vs-west/assets/vsIcon.png');
        game.load.image('computerIcon', 'https://ufosc.github.io/marston-vs-west/assets/aiImage.jpg')
        game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Fire.js');
        game.load.audio('itemSound', 'https://ufosc.github.io/marston-vs-west/assets/itemSound.wav');
        game.load.audio('titleCardSound', 'https://ufosc.github.io/marston-vs-west/assets/titlecarddota.mp3');
        
        //game.load.audio('playMusic', 'assets/playTestMusic.ogg');
        game.load.tilemap('tilemap1', 'https://ufosc.github.io/marston-vs-west/assets/Floor.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('gator', 'https://ufosc.github.io/marston-vs-west/assets/gatorBat.png', 32, 32);
        game.load.spritesheet('helmet', 'https://ufosc.github.io/marston-vs-west/assets/helmet.png', 32, 32);

        game.load.image('blueDamageBox', 'https://ufosc.github.io/marston-vs-west/assets/damageBorder1.png');
        game.load.image('orangeDamageBox', 'https://ufosc.github.io/marston-vs-west/assets/damageBorder2.png');
        game.load.image('orangeStock', 'https://ufosc.github.io/marston-vs-west/assets/orangeStock.png');
        game.load.image('blueStock', 'https://ufosc.github.io/marston-vs-west/assets/blueStock.png');
        game.load.image('dust', 'https://ufosc.github.io/marston-vs-west/assets/dust.png');
        game.load.image('music_icon', 'https://ufosc.github.io/marston-vs-west/assets/music_sprite.png');

        //Menu Images
        game.load.image('menuBackground', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MainMenu_Sprites/Sprites/Brick Wall_Background.png');
        game.load.image('logo', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MainMenu_Sprites/Sprites/Main_Menu_Logo_Sprite.png');
        game.load.image('startButton', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MainMenu_Sprites/Buttons/Start_Button.png');
        game.load.image('arcadeButton', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MainMenu_Sprites/Buttons/Arcade_Button.png');
        game.load.image('optionButton', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MainMenu_Sprites/Buttons/Options_Button.png');
        game.load.image('creditButton', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MainMenu_Sprites/Buttons/Exit_Button.png');
        game.load.image('chooseStage', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/MapMenu_Sprites/Sprites/ChooseYourStage_Sprite.png');
        game.load.image('plus', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/OptionMenu_Sprites/Buttons/Add_Button.png');
        game.load.image('minus', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/OptionMenu_Sprites/Buttons/Minus_Button.png');
        game.load.image('fullscreen', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/OptionMenu_Sprites/Buttons/Fullscreen_Button.png');
        game.load.image('minutes', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/OptionMenu_Sprites/Sprites/Minutes_Sprite.png');
        game.load.image('seconds', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/OptionMenu_Sprites/Sprites/Seconds_Sprite.png');
        game.load.image('settings', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/OptionMenu_Sprites/Sprites/Settings_Sprite.png');
        game.load.image('Pause Menu', 'https://ufosc.github.io/marston-vs-west/assets/MvW Menus/Pause_Screen.png');
        game.load.image('Kim', 'https://ufosc.github.io/marston-vs-west/assets/bottle.png');//for sliding bar and needs to be modified (?)
        game.load.image('Chi', 'https://ufosc.github.io/marston-vs-west/assets/WhiteBall.png');//for sliding bar and needs to be modified (?)
        game.load.image('knob', 'https://ufosc.github.io/marston-vs-west/assets/WhiteBall.png');//for sliding bar and needs to be modified (?)
        game.load.image('mute', 'https://ufosc.github.io/marston-vs-west/assets/mute.png');
        
        game.load.image('helpButton', 'https://ufosc.github.io/marston-vs-west/assets/helpButton.png');
    },
    create: function () {
        musicvol = 0.1;
        music = game.add.audio('menuMusic');
        music.volume = musicvol;
        music.loopFull();
        game.state.start('menu');
    },
    update: function(){
        music.volume = musicvol;

    }
};
