console.log("winstate reached");

var winState={
  create: function(){

    if(Player1.lives > Player2.lives)
    {
      var winLabel=game.add.text(80,80,'Player 1 won!',{font: '50px Arial',fill: '#ffffff'});
    }
    else
    {
      var winLabel=game.add.text(80,80,'Player 2 won!',{font: '50px Arial',fill: '#ffffff'});
    }
    var statsLabel1 = game.add.text(80, 160, `Player 1 stats:` + '\n' + `Lives: ${Player1.lives}`); //Eventually integrate stats into player class, loop through and print out statistics for both players
    var statsLabel2 = game.add.text(game.world.width -240, 160, `Player 2 stats:` + '\n' + `Lives: ${Player2.lives}`);
    var startLabel=game.add.text(80,game.world.height-80,'Press "W" key to restart',{font: '25px Arial',fill:'#ffffff'});
    var wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start,this);
  },
  start: function(){
    music.stop();
   game.state.start('menu');
  }
};
