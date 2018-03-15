console.log("winstate reached");

var cssState={
  create: function(){
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    marstonPicture = game.add.sprite(game.world.width * .5 - 200, game.world.height * .5 + 50, 'marstonPic');
    marstonPicture.anchor.setTo(.5,.5);
    marstonPicture.scale.setTo(.25,.25);
    game.physics.arcade.enable(marstonPicture);
    marstonPicture.tint =  0xffffff;

    westPicture = game.add.sprite(game.world.width * .5 + 200, game.world.height * .5 + 50, 'westPic');
    westPicture.anchor.setTo(.5,.5);
    westPicture.scale.setTo(.25,.25);
    game.physics.arcade.enable(westPicture);
    westPicture.tint =  0xffffff;

    player1Icon = game.add.sprite(game.world.width * .5 -50, game.world.height * .5, 'player1cssIcon');
    player2Icon = game.add.sprite(game.world.width * .5 +50, game.world.height * .5, 'player2cssIcon');

    player1Icon.inputEnabled = true;
    player2Icon.inputEnabled = true;

    player1Icon.input.enableDrag(true);
    player2Icon.input.enableDrag(true);

    game.physics.arcade.enable(player1Icon);
    game.physics.arcade.enable(player2Icon);

    player1Icon.enableBody = true;
    player2Icon.enableBody = true;

    player1Icon.events.onDragStop.add(this.onDragStop, this);
    player1Icon.events.onDragStart.add(this.onDragStart, this);
    player2Icon.events.onDragStop.add(this.onDragStop, this);
    player2Icon.events.onDragStart.add(this.onDragStart, this);

    marstonPicture.enableBody = true;
    westPicture.enableBody = true;
    var startLabel=game.add.text(80,game.world.height-80,'Press "1" key to play game after selecting characters!',{font: '25px Arial',fill:'#ffffff'});
    //var wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
    //wkey.onDown.addOnce(this.start,this);
    player1Text = game.add.text(80,game.world.height-240,'Character 1 selected: ',{font: '25px Arial',fill:'#ffffff'});
    player2Text = game.add.text(80,game.world.height-160,'Character 2 selected: ',{font: '25px Arial',fill:'#ffffff'});
    gameReadyText = game.add.text(80,game.world.height-320,'',{font: '25px Arial',fill:'#ffffff'});
//TODO: Create needed animations and spawn portrait and character sprite as well
//find a way to change text, show sprite and name with alpha applied when hovering but NOT selecting character
//Only make option to start game true if both players have selected characters
  },
  start: function(){
    music.stop();
    console.log("overlap")
   game.state.start('play');
 },
 update: function() {
   player1Text.text = `Character selected 1: ${charName1}`;
   player2Text.text = `Character selected 2: ${charName2}`;

   game.physics.arcade.collide(player1Icon, player2Icon);
   if(charSelected1 && charSelected2 && key1.isDown)
   {
     //Eventually allow the player to start game;
     gameReadyText.text = `Game ready`;
     game.state.start('play');




   }
   else {
     {
       gameReadyText.text = ``;
     }
   }
 },
 onDragStop: function() {
   if(game.physics.arcade.overlap(player1Icon, marstonPicture,)) //Call function to change tint/size of icon picture,
   {
     charName1 = "dude";
     charSelected1 = true;
     marstonPicture.tint =  0xffff00;
     console.log("You selected Marston, they are overlapping and the icon was dropped" + charSelected1);
   }
   if(game.physics.arcade.overlap(player1Icon, westPicture,)) //Call function to change tint/size of icon picture,
   {
     charName1 = "chick";
     charSelected1 = true;
     westPicture.tint =  0xffff00;
     console.log("You selected West, they are overlapping and the icon was dropped" + charSelected1);
   }
   if(game.physics.arcade.overlap(player2Icon, marstonPicture,)) //Call function to change tint/size of icon picture,
   {
     charName2 = "dude";
     charSelected2 = true;
     marstonPicture.tint =  0xffff00;
     console.log("You selected Marston, they are overlapping and the icon was dropped" + charSelected2);
   }
   if(game.physics.arcade.overlap(player2Icon, westPicture,)) //Call function to change tint/size of icon picture,
   {
     charName2 = "chick";
     charSelected2 = true;
     westPicture.tint =  0xffff00;
     console.log("You selected West, they are overlapping and the icon was dropped" + charSelected2);
   }

 },
 onDragStart: function() {
   if(game.physics.arcade.overlap(player1Icon, marstonPicture)) //Call function to revert tint/size of icon pic
   {
     charName1 = "";
     charSelected1 = false;
     marstonPicture.tint =  0xffffff;
     console.log("You De-selected Marston, they are overlapping and the icon was picked up" + charSelected1);
   }
   if(game.physics.arcade.overlap(player1Icon, westPicture)) //Call function to revert tint/size of icon pic
   {
     charName1 = "";
     charSelected1 = false;
     westPicture.tint =  0xffffff;
     console.log("You De-selected West, they are overlapping and the icon was picked up" + charSelected1);
   }
   if(game.physics.arcade.overlap(player2Icon, marstonPicture)) //Call function to revert tint/size of icon pic
   {
     charName2 = "";
     charSelected2 = false;
     marstonPicture.tint =  0xffffff;
     console.log("You De-selected Marston, they are overlapping and the icon was picked up" + charSelected2);
   }
   if(game.physics.arcade.overlap(player2Icon, westPicture)) //Call function to revert tint/size of icon pic
   {
     charName2 = "";
     charSelected2 = false;
     westPicture.tint =  0xffffff;
     console.log("You De-selected West, they are overlapping and the icon was picked up" + charSelected2);
   }
 }
};
