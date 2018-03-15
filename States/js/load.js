console.log("loadstate reached");
var loadState={

	preload: function(){
		var loadingLabel= game.add.text(80,150,'Loading...',{font: '30px Courier',fill: '#ffffff'});


				//game.load.image('sky', 'assets/sky.png');
				game.load.image('sky', 'assets/TestStage2.png');
				//game.load.image('ground', 'assets/platform.png');
				//game.load.image('ground', 'assets/platform2.png');
				game.load.image('ground', 'assets/floorblock.png');
				game.load.image('star', 'assets/star.png');
				//game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

				game.load.spritesheet('dude', 'assets/Fighter1master.png', 36, 42);
				game.load.spritesheet('chick', 'assets/Fighter2master.png', 36, 42);

				game.load.image('hitboxTest', 'assets/testHitbox.png');
				game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32 );
				game.load.spritesheet('slash', 'assets/slash (1).png', 64, 64 );
				game.load.spritesheet('slash2', 'assets/slash.png', 32, 32 );
				game.load.spritesheet('helmet', 'assets/helmet.png', 32, 32 );
				game.load.spritesheet('bottle', 'assets/bottle.png', 32, 32 );
				game.load.spritesheet('book', 'assets/book.png', 32, 32 );
				game.load.spritesheet('Sandbag', 'assets/sandbag.png', 32, 32 );
				game.load.image('startButton', 'assets/startButton.png');
				game.load.image('optionsButton', 'assets/optionsButton.png');
				game.load.image('quitButton', 'assets/quitButton.png');
				game.load.image('creditsButton', 'assets/creditsButton.png');
				game.load.image('menuButton', 'assets/menuButton.png');
				this.game.load.audio('creditsMusic', 'assets/creditsTestMusic.ogg');
				this.game.load.audio('menuMusic', 'assets/menuTestMusic.ogg');
				this.game.load.audio('allstar', 'assets/allstar.ogg');
				game.load.image('marstonPic', 'assets/thegreatestlibrary.JPEG');
				game.load.image('westPic', 'assets/theworstlibrary.JPG');
				game.load.image('fullScreenButton', 'assets/fullScreenButton.png');
				game.load.image('displayButton1', 'assets/displayButton1.png');
				game.load.image('displayButton2', 'assets/displayButton2.png');
				game.load.image('displayButton3', 'assets/displayButton3.png');
				game.load.image('displayButton4', 'assets/displayButton4.png');
				game.load.image('player1cssIcon', 'assets/player1cssIcon.png');
				game.load.image('player2cssIcon', 'assets/player2cssIcon.png');
				game.load.image('minusButton', 'assets/minusButton.png');
				game.load.image('plusButton', 'assets/plusButton.png');
				game.load.image('dudeIcon', 'assets/dudeIcon.png');
				game.load.image('chickIcon', 'assets/chickIcon.png');
				game.load.spritesheet('crowd', 'assets/dude.png', 32, 48);
				//game.load.audio('playMusic', 'assets/playTestMusic.ogg');

		},
	create: function(){
		music = game.add.audio('menuMusic');
		music.loopFull();
		game.state.start('menu');

	}
};
