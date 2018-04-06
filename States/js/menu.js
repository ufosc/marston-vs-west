var menuState={

   create: function(){
     //Create the menu triangles
     var bmd = game.add.bitmapData(800, 600);
        bmd.addToWorld();
        var graphics = game.add.graphics(0, 0);
      //  graphics.lineStyle(2, 0x0000FF, 1); THE LINE
        graphics.beginFill(0x00ad14, 0.5); //GREEEN
        var point1 = new Phaser.Point(0,0); //Top left corner
        var point2 = new Phaser.Point(game.world.width, game.world.height); //Bottom Right Corner
        var point3= new Phaser.Point(0, game.world.height); //Bottom Left Corner
        var point4 = new Phaser.Point(game.world.width, 0); //Top Right Corner
        var pointArray = [point1, point2, point3];
        graphics.drawTriangle(pointArray);
        graphics.endFill();
        graphics.beginFill(0x0000FF, 0.5);  //BLUUUEE
        pointArray = [point1, point4, point2];
        graphics.drawTriangle(pointArray);

        //Second triangle not created?

    game.stage.backgroundColor = '#00ad14';   //Give us some color pls
   	var nameLabel=game.add.text(game.world.height - 250,80,'Marston vs. West',{font: '50px Arial',fill: '#ffffff'});
    var subNameLabel=game.add.text(game.world.height - 275,140,'The fate of two libraries: Arcade Edition',{font: '25px Arial',fill: '#ffffff'});
   	var textLabel=game.add.text(50,game.world.height-150,'Press "W" key to start' + '\n' + 'Press "G" key to select characters \n Debug build',{font: '25px Arial',fill:'#ffffff'});
    var marstonPicture = game.add.image(game.world.width * .25 - 50 , game.world.height * .25 - 50, 'marstonPic');
    var westPicture = game.add.image(game.world.width * .75 + 50, game.world.height * .75 + 50, 'westPic');
    var vsIcon = game.add.image(game.world.width * .5 , game.world.height * .5 , 'vsIcon');
    vsIcon.scale.setTo(.45,.45);
    vsIcon.anchor.setTo(.5,.5);
    marstonPicture.anchor.setTo(.5,.5);
    marstonPicture.scale.setTo(.51,.56);
    westPicture.anchor.setTo(.5,.5);
    westPicture.scale.setTo(.5,.5);
   	var wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
   	wkey.onDown.addOnce(this.start,this); //Keep for debugging purposes, makes launching the game quicker
    var gkey= game.input.keyboard.addKey(Phaser.Keyboard.G);
   	gkey.onDown.addOnce(this.characterSelect,this); //Keep for debugging purposes, makes launching the game quicker

    startButton = game.add.button(game.world.width *.25 - 150,game.world.height *.5 -20, 'startButton');
    startButton.onInputUp.add(this.start,this);

    optionsButton = game.add.button(game.world.width *.25 ,game.world.height *.5 -20 , 'optionsButton');
    optionsButton.onInputUp.add(this.options,this);

    creditsButton = game.add.button(game.world.width *.75 -100,game.world.height *.5-20 , 'creditsButton');
    creditsButton.onInputUp.add(this.credits,this);

    quitButton = game.add.button(game.world.width *.75 +50 ,game.world.height *.5 -20, 'quitButton');
    quitButton.onInputUp.add(this.quit,this);

    buttonSound = game.add.audio('buttonSound');

    if(music.name != 'menuMusic')
    {
      music = game.add.audio('menuMusic');
      music.loopFull();
    }

   },
   start: function(){
    buttonSound.play();
    music.stop();
    game.state.start('css');

  },
  characterSelect: function(){
  buttonSound.play();
   console.log("css State");
   game.state.start('css');

 },
  options: function() {
    buttonSound.play();
    console.log("options state");
    game.state.start('options');
  },
  quit:function() {
    console.log("quit state");
    buttonSound.play();
    music.stop();
    game.state.start('boot'); //Placeholder until we change it to something else
  },
  credits: function() {
    buttonSound.play();
    music.stop();
    game.state.start('credits');
  }
};
