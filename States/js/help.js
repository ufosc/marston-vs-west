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
        buttonSound.volume = gameManager.volume * 0.2;
        
        menuLabel = new TextButton(this.game, 0, 0, 'MENU', { font: '90px Permanent Marker', fill: '#ffffff' });
        menuLabel.events.onInputUp.add(this.menu, this);
        
        var player1Col = game.add.text(game.world.width * .2, game.world.height *0, 'Player 1\nA\nD\nE\nR\nT\nY');
        player1Col.font = 'VT323';
        player1Col.fontSize = 60;
        player1Col.fill = '#ffffff';
        player1Col.anchor.setTo(0, 0);

        var player2Col = game.add.text(game.world.width * 1, game.world.height *0, 'Player 2\nLeft\nRight\nI\nO\nP\n[');
        player2Col.font = 'VT323';
        player2Col.fontSize = 60;
        player2Col.fill = '#ffffff';
        player2Col.anchor.setTo(1, 0);

        var playerMoveCol = game.add.text(game.world.width * .5, game.world.height *0, 'Moves\nWalk Left\nWalk Right\nPunch (Pickup item)\nSpecial\nJump\nBlock(use Item)\n');
        playerMoveCol.font = 'VT323';
        playerMoveCol.fontSize = 60;
        playerMoveCol.fill = '#ffffff';
        playerMoveCol.anchor.setTo(0.5, 0);
    },

    menu: function () {
        if(muteState==false)
        buttonSound.play();
        game.state.start('menu');
    }    
}