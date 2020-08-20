var creditsState = {
    create: function () {
        
        var creditsLabel = game.add.text(game.world.width * 0.5, game.world.height * 0.15, 'Credits:', { font: '160px Permanent Marker', fill: '#ffffff' });
        creditsLabel.anchor.setTo(0.5, 0.5);

        var textLabel = game.add.text(game.world.width * .5, game.world.height * 0.85, 'Music:\nBryan Alvarez', { font: '50px Permanent Marker', fill: '#ffffff' });
        textLabel.anchor.setTo(0.5,0);
        var projectLead = game.add.text(game.world.width * .5, game.world.height *0.35, 'Project Lead/Stage Photography:\nAlejandro Santacoloma', { font: '50px Permanent Marker', fill: '#ffffff' });
        projectLead.anchor.setTo(0.5, 0);

        var programmersLabel = game.add.text(game.world.width * .25, game.world.height *0.5, 'Programmers:\nDylan Alvarez\nBenjamin Cohen\nHaozhe Zhang', { font: '50px Permanent Marker', fill: '#ffffff' });
        programmersLabel.anchor.setTo(0.5, 0);

        var artistsLabel = game.add.text(game.world.width * .75, game.world.height *0.5, 'Artists:\nChloe Jones\nThomas Nguyen', { font: '50px Permanent Marker', fill: '#ffffff' });
        artistsLabel.anchor.setTo(0.5, 0);

        var menuLabel = new TextButton(this.game, game.world.width * .15, game.world.height * .2, 'MENU', { font: '90px Permanent Marker', fill: '#ffffff' });

        menuLabel.events.onInputUp.add(function () {
            game.state.start('menu');
        });

        //Will eventually have its own music
        //music = game.add.audio('creditsMusic');
        //music.loopFull();

    },

    menu: function () {
        //music.stop();

        game.state.start('menu');
    },

};