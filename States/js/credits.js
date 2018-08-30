console.log("Reached credits state");

var creditsState={
   create: function(){
   	var nameLabel=game.add.text(80,80,'Credits:',{font: '50px Arial',fill: '#ffffff'});
   	var textLabel=game.add.text(40,game.world.height-80,'The Open Source Club and all of its cool members' + '\n' + 'and Marston for being best library',{font: '25px Arial',fill:'#ffffff'});
    menuButton = game.add.button(game.world.width *.5 -95,game.world.height *.5 - 100, 'menuButton');
    menuButton.onInputUp.add(this.menu,this);

    //Will eventually have its own music
    music = game.add.audio('creditsMusic');
    music.loopFull();

  },
  menu: function () {
    music.stop();

    game.state.start('menu');
  }
};
