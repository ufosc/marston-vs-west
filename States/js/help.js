console.log('ugh');
WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323']
    }
};
var helpState = {
    preload: function () {
        //Load the Google WebFont Loader script
        this.game.load.script(
            'font.VT323',
            '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js'
          );
    },
    create: function(){
       var backgroundSprite = game.add.image(0, 0, 'menuBackground');
        backgroundSprite.anchor.setTo(0,0);
        
        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume = musicvol;
        
        menuButton = game.add.button(0, game.world.height, 'menuButton');
        menuButton.anchor.setTo(0, 1);
        menuButton.onInputUp.add(this.menu, this);
        
        var gator = game.add.sprite(game.world.width * .5 - 850, game.world.height *.5 - 300, 'gator');
        gator.scale.setTo(2, 2);
        gator.anchor.setTo(.5, .5);
        var gatorText = game.add.text(game.world.width * .5 - 775, game.world.height *.5 - 300, '123');
        gatorText.font = 'VT323';
        gatorText.fontSize = 40;
        gatorText.fill = '#ffffff';
        gatorText.anchor.setTo(.5, .5);
        
        var helmet = game.add.sprite(game.world.width * .5 - 850, game.world.height *.5, 'helmet');
        helmet.scale.setTo(2, 2);
        helmet.anchor.setTo(.5, .5);
        var helmetText = game.add.text(game.world.width * .5 - 775, game.world.height *.5, '123');
        helmetText.font = 'VT323';
        helmetText.fontSize = 40;
        helmetText.fill = '#ffffff';
        helmetText.anchor.setTo(.5, .5);
        
        var bottle = game.add.sprite(game.world.width * .5 - 850, game.world.height *.5 + 300, 'bottle');
        bottle.scale.setTo(2, 2);
        bottle.anchor.setTo(.5, .5);
        var bottleText = game.add.text(game.world.width * .5 - 775, game.world.height *.5 + 300, '123');
        bottleText.font = 'VT323';
        bottleText.fontSize = 40;
        bottleText.fill = '#ffffff';
        bottleText.anchor.setTo(.5, .5);
        
        var player1Text = game.add.text(game.world.width * .5 - 250, game.world.height *.5 - 450, 'Player 1');
        player1Text.font = 'VT323';
        player1Text.fontSize = 40;
        player1Text.fill = '#ffffff';
        player1Text.anchor.setTo(.5, .5);
        
        var player1Up = game.add.text(game.world.width * .5 - 250, game.world.height *.5 - 350, 'W');
        player1Up.font = 'VT323';
        player1Up.fontSize = 40;
        player1Up.fill = '#ffffff';
        player1Up.anchor.setTo(.5, .5);
        
        var player1Left = game.add.text(game.world.width * .5 - 250, game.world.height *.5 - 250, 'A');
        player1Left.font = 'VT323';
        player1Left.fontSize = 40;
        player1Left.fill = '#ffffff';
        player1Left.anchor.setTo(.5, .5);
        
        var player1Down = game.add.text(game.world.width * .5 - 250, game.world.height *.5 - 150, 'S');
        player1Down.font = 'VT323';
        player1Down.fontSize = 40;
        player1Down.fill = '#ffffff';
        player1Down.anchor.setTo(.5, .5);
        
        var player1Right = game.add.text(game.world.width * .5 - 250, game.world.height *.5 - 50, 'D');
        player1Right.font = 'VT323';
        player1Right.fontSize = 40;
        player1Right.fill = '#ffffff';
        player1Right.anchor.setTo(.5, .5);
        
        var player1Jump = game.add.text(game.world.width * .5 - 250, game.world.height *.5 + 50, 'E');
        player1Jump.font = 'VT323';
        player1Jump.fontSize = 40;
        player1Jump.fill = '#ffffff';
        player1Jump.anchor.setTo(.5, .5);
        
        var player1Sprint = game.add.text(game.world.width * .5 - 250, game.world.height *.5 + 150, 'R');
        player1Sprint.font = 'VT323';
        player1Sprint.fontSize = 40;
        player1Sprint.fill = '#ffffff';
        player1Sprint.anchor.setTo(.5, .5);
        
        var player1PunchGrab = game.add.text(game.world.width * .5 - 250, game.world.height *.5 + 250, 'T');
        player1PunchGrab.font = 'VT323';
        player1PunchGrab.fontSize = 40;
        player1PunchGrab.fill = '#ffffff';
        player1PunchGrab.anchor.setTo(.5, .5);
        
        var player1Shield = game.add.text(game.world.width * .5 - 250, game.world.height *.5 + 350, 'Y');
        player1Shield.font = 'VT323';
        player1Shield.fontSize = 40;
        player1Shield.fill = '#ffffff';
        player1Shield.anchor.setTo(.5, .5);
        
        var up = game.add.text(game.world.width * .5 + 200, game.world.height *.5 - 350, 'Up');
        up.font = 'VT323';
        up.fontSize = 40;
        up.fill = '#ffffff';
        up.anchor.setTo(.5, .5);
        
        var left = game.add.text(game.world.width * .5 + 200, game.world.height *.5 - 250, 'Left');
        left.font = 'VT323';
        left.fontSize = 40;
        left.fill = '#ffffff';
        left.anchor.setTo(.5, .5);
        
        var down = game.add.text(game.world.width * .5 + 200, game.world.height *.5 - 150, 'Down');
        down.font = 'VT323';
        down.fontSize = 40;
        down.fill = '#ffffff';
        down.anchor.setTo(.5, .5);
        
        var right = game.add.text(game.world.width * .5 + 200, game.world.height *.5 - 50, 'Right');
        right.font = 'VT323';
        right.fontSize = 40;
        right.fill = '#ffffff';
        right.anchor.setTo(.5, .5);
        
        var jump = game.add.text(game.world.width * .5 + 200, game.world.height *.5 + 50, 'Jump');
        jump.font = 'VT323';
        jump.fontSize = 40;
        jump.fill = '#ffffff';
        jump.anchor.setTo(.5, .5);
        
        var sprint = game.add.text(game.world.width * .5 + 200, game.world.height *.5 + 150, 'Special Movements');
        sprint.font = 'VT323';
        sprint.fontSize = 40;
        sprint.fill = '#ffffff';
        sprint.anchor.setTo(.5, .5);
        
        var punchGrab = game.add.text(game.world.width * .5 + 200, game.world.height *.5 + 250, 'Punch/Grab');
        punchGrab.font = 'VT323';
        punchGrab.fontSize = 40;
        punchGrab.fill = '#ffffff';
        punchGrab.anchor.setTo(.5, .5);
        
        var shield = game.add.text(game.world.width * .5 + 200, game.world.height *.5 + 350, 'Throw/Shield');
        shield.font = 'VT323';
        shield.fontSize = 40;
        shield.fill = '#ffffff';
        shield.anchor.setTo(.5, .5);
        
        var player2Text = game.add.text(game.world.width * .5 + 650, game.world.height *.5 - 450, 'Player 2');
        player2Text.font = 'VT323';
        player2Text.fontSize = 40;
        player2Text.fill = '#ffffff';
        player2Text.anchor.setTo(.5, .5);
        
        var player2Up = game.add.text(game.world.width * .5 + 650, game.world.height *.5 - 350, '↑');
        player2Up.font = 'VT323';
        player2Up.fontSize = 40;
        player2Up.fill = '#ffffff';
        player2Up.anchor.setTo(.5, .5);
        
        var player2Left = game.add.text(game.world.width * .5 + 650, game.world.height *.5 - 250, '←');
        player2Left.font = 'VT323';
        player2Left.fontSize = 40;
        player2Left.fill = '#ffffff';
        player2Left.anchor.setTo(.5, .5);
        
        var player2Down = game.add.text(game.world.width * .5 + 650, game.world.height *.5 - 150, '↓');
        player2Down.font = 'VT323';
        player2Down.fontSize = 40;
        player2Down.fill = '#ffffff';
        player2Down.anchor.setTo(.5, .5);
        
        var player2Right = game.add.text(game.world.width * .5 + 650, game.world.height *.5 - 50, '→');
        player2Right.font = 'VT323';
        player2Right.fontSize = 40;
        player2Right.fill = '#ffffff';
        player2Right.anchor.setTo(.5, .5);
        
        var player2Jump = game.add.text(game.world.width * .5 + 650, game.world.height *.5 + 50, 'I');
        player2Jump.font = 'VT323';
        player2Jump.fontSize = 40;
        player2Jump.fill = '#ffffff';
        player2Jump.anchor.setTo(.5, .5);
        
        var player2Sprint = game.add.text(game.world.width * .5 + 650, game.world.height *.5 + 150, 'O');
        player2Sprint.font = 'VT323';
        player2Sprint.fontSize = 40;
        player2Sprint.fill = '#ffffff';
        player2Sprint.anchor.setTo(.5, .5);
        
        var player2PunchGrab = game.add.text(game.world.width * .5 + 650, game.world.height *.5 + 250, 'P');
        player2PunchGrab.font = 'VT323';
        player2PunchGrab.fontSize = 40;
        player2PunchGrab.fill = '#ffffff';
        player2PunchGrab.anchor.setTo(.5, .5);
        
        var player2Shield = game.add.text(game.world.width * .5 + 650, game.world.height *.5 + 350, '[');
        player2Shield.font = 'VT323';
        player2Shield.fontSize = 40;
        player2Shield.fill = '#ffffff';
        player2Shield.anchor.setTo(.5, .5);
    },
    
    menu: function () {
        if(muteState==false)
        buttonSound.play();
        game.state.start('menu');
    }    
}