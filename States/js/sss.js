/*
This code also servers as a test implementation of how to optimize css
*/

class Stage {
  constructor(startx, starty, icon)
  {
    this.icon = game.add.sprite(startx, starty, icon);
    this.icon.anchor.setTo(.5,.5);
    game.physics.arcade.enable(this.icon);
    this.icon.scale.setTo(.5,.5);
    this.selected = false; //Used to apply hover effect only once
    this.icon.enableBody = true;
    this.icon.inputEnabled = true;
    this.icon.tint =  0xffffff;
    this.icon.input.useHandCursor = true;
    this.icon.events.onInputOver.add(this.onOver,this);
    this.icon.events.onInputOut.add(this.onOut, this);
    this.icon.events.onInputDown.add(this.onClick, this);
    this.icon.scale.setTo(.25);
  }
  onOver() { //Called when hovering over
    this.icon.scale.setTo(.45, .45); //Enlarge the selected icon
    gameReadyText.text = `${this.icon.key} Selected!`;
    //chosenStageSelected = true;
  }
  onOut() { //Called after you stop hovering over
    this.icon.scale.setTo(.25,.25);
    gameReadyText.text = `Please select a stage!`;
    //chosenStageSelected = false;
  }
  onClick() {
    gameReadyText.text = `GOOOOOO!`;
    chosenStageName = this.icon.key;
    console.log("You chose: " + this.icon.key);
    music.stop();
    game.state.start('play');
  }
}

var sssState={
  create: function(){
    //Reset values to default so if player wants to play again, it does not start off "ready" to play
    chosenStageName = '';


    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

    stage1 = new Stage(game.world.width * .5 - 200, game.world.height * .25 + 50, 'marstonPic');

    stage2 = new Stage(game.world.width * .5 + 200, game.world.height * .25 + 50, 'westPic');

    buttonSound = game.add.audio('buttonSound');
    buttonSound.volume -= .5;

    var startLabel=game.add.text(80,game.world.height-40,'Choose a stage!',{font: '25px Arial',fill:'#ffffff'});

    gameReadyText = game.add.text(game.world.width * .5,game.world.height-200,'',{font: '50px Arial',fill:'#ffffff'});
    gameReadyText.anchor.setTo(.5,.5);


  },
  start: function(){
    gameReadyText.text = `Game Start!`;
    music.stop();
    game.state.start('play');
 },
 update: function() {

 },

};
