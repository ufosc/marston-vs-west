var menuState={

   create: function(){
    game.stage.backgroundColor = '#4d4d4d';   //Give us some color pls
   	var nameLabel=game.add.text(80,80,'Marston vs. West',{font: '50px Arial',fill: '#ffffff'});
    var subNameLabel=game.add.text(140,140,'-The fate of two libraries: Arcade Edition',{font: '25px Arial',fill: '#ffffff'});
   	var textLabel=game.add.text(80,game.world.height-80,'Press "W" key to start' + '\n' + 'Press "G" key to select characters',{font: '25px Arial',fill:'#ffffff'});
    var marstonPicture = game.add.image(game.world.width * .5 - 200, game.world.height * .5 + 50, 'marstonPic');
    var westPicture = game.add.image(game.world.width * .5 + 200, game.world.height * .5 + 50, 'westPic');
    marstonPicture.anchor.setTo(.5,.5);
    marstonPicture.scale.setTo(.51,.56);
    westPicture.anchor.setTo(.5,.5);
    westPicture.scale.setTo(.5,.5);
   	var wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
   	wkey.onDown.addOnce(this.start,this); //Keep for debugging purposes, makes launching the game quicker
    var gkey= game.input.keyboard.addKey(Phaser.Keyboard.G);
   	gkey.onDown.addOnce(this.characterSelect,this); //Keep for debugging purposes, makes launching the game quicker

    startButton = game.add.button(game.world.width *.5 - 65,game.world.height *.5 - 100, 'startButton');
    startButton.onInputUp.add(this.start,this);

    optionsButton = game.add.button(game.world.width *.5 -65,game.world.height *.5, 'optionsButton');
    optionsButton.onInputUp.add(this.options,this);

    creditsButton = game.add.button(game.world.width *.5 -65,game.world.height *.5 + 100, 'creditsButton');
    creditsButton.onInputUp.add(this.credits,this);

    quitButton = game.add.button(game.world.width *.5 -65,game.world.height *.5 + 200, 'quitButton');
    quitButton.onInputUp.add(this.quit,this);

    if(music.name != 'menuMusic')
    {
      music = game.add.audio('menuMusic');
      music.loopFull();
    }

   },
   start: function(){
    music.stop();
    game.state.start('css');

  },
  characterSelect: function(){
   console.log("css State");
   game.state.start('css');

 },
  options: function() {
    console.log("options state");
    game.state.start('options');
  },
  quit:function() {
    console.log("quit state");
    music.stop();
    game.state.start('boot'); //Placeholder until we change it to something else
  },
  credits: function() {
    music.stop();
    game.state.start('credits');
  }
};
