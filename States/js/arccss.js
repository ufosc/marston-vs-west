var cssState = {
    create: function () {
        console.log("CSS???!");
        //Reset values to default so if player wants to play again, it does not start off "ready" to play
        charSelected1 = false;
        charSelected2 = false;
        botSelected = false;
        controlOptionAI = 0;
        charName1 = "";
        charName2 = "";
        multimanmode = false;

        var backgroundSprite = game.add.image(0, 0, 'menuBackground');
        backgroundSprite.anchor.setTo(0,0);
        var logo = game.add.image(game.world.width * .5, game.world.height * .5, 'logo');
        logo.anchor.setTo(.5,.5);
        logo.scale.setTo(.8,.8);

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        dudeIcon = game.add.sprite(game.world.width * 0.5 - 250, game.world.height * .5 + 150, 'dudeIcon');
        dudeIcon.anchor.setTo(.5, .5);
        //dudeIcon.scale.setTo(.5, .5);
        game.physics.arcade.enable(dudeIcon);
        dudeIcon.tint = 0xffffff;

        chickIcon = game.add.sprite(game.world.width * 0.5 + 250, game.world.height * .5 + 150, 'chickIcon');
        chickIcon.anchor.setTo(.5, .5);
        //chickIcon.scale.setTo(.5, .5);
        game.physics.arcade.enable(chickIcon);
        chickIcon.tint = 0xffffff;

        //TEST:COMPUTER icon
        computerIcon = game.add.sprite(game.world.width * .5, game.world.height * .5 + 150, 'computerIcon');
        computerIcon.anchor.setTo(.5, .5);
        computerIcon.scale.setTo( .35, .53);
        game.physics.arcade.enable(computerIcon);
        computerIcon.tint = 0xffffff;

        player1Icon = game.add.sprite(game.world.width * .5 - 200, game.world.height * .5 + 400, 'player1cssIcon');
        player1Icon.scale.setTo(3, 3);
        player1Icon.anchor.setTo(.5, .5);

        player2Icon = game.add.sprite(game.world.width * .5 + 200, game.world.height * .5 + 400, 'player2cssIcon');
        player2Icon.scale.setTo(3, 3);
        player2Icon.anchor.setTo(.5, .5);

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

        dudeIcon.enableBody = true;
        chickIcon.enableBody = true;

        buttonSound = game.add.audio('buttonSound');
        buttonSound.volume -= .5;

        //var startLabel = game.add.text(80, game.world.height - 40, 'Press "1" key to play game after selecting characters!', { font: '25px Arial', fill: '#ffffff' });
        gameReadyText = game.add.text(game.world.width * .5, game.world.height - 75, '', { font: '75px Arial', fill: '#ffffff' });
        gameReadyText.anchor.setTo(.5, .5);

        player1Text = game.add.text(game.world.width * .25 - 85, game.world.height * .5 + 275, '', { font: '25px Arial', fill: '#ffffff' });
        player2Text = game.add.text(game.world.width * .75 + 215, game.world.height * .5 + 275, '', { font: '25px Arial', fill: '#ffffff' });
        player1Text.anchor.setTo(.5,.5);
        player2Text.anchor.setTo(.5,.5);


        player1BodyIcon = game.add.sprite(game.world.width * .25 - 150, game.world.height * .5 + 150, '');
        player2BodyIcon = game.add.sprite(game.world.width * .75 + 150, game.world.height * .5 + 150, '');
        player1BodyIcon.anchor.setTo(.5,.5);
        player2BodyIcon.anchor.setTo(.5,.5);
        player1BodyIcon.scale.setTo(1.5, 1.5);
        player2BodyIcon.scale.setTo(1.5, 1.5);

        player1BodyIcon.tint = gameManager.playerTint[0];
        player2BodyIcon.tint = gameManager.playerTint[1];
        console.log("TINT!");

        //Chose your library: Click on label to set variable to a library, then send info later
        var player1Label = game.add.text(game.world.width*0.25, 50, 'Choose your Library!', { font: '25px Arial', fill: '#ffffff' });
        
        player1Label.inputEnabled = true;
        player1Label.selected = 0;
        player1Label.librarySelected = '';
        player1Label.events.onInputUp.add(function () {
            switch (player1Label.selected) {

                case 0:
                    player1Label.librarySelected = 'Marston'
                    player1Label.text = `${player1Label.librarySelected}`;
                    player1Label.selected++;
                    break;
                case 1:
                    player1Label.librarySelected = 'West'
                    player1Label.text = `${player1Label.librarySelected}`;
                    player1Label.selected--;
                    break;
            }
        });

        
        var player2Label = game.add.text(game.world.width * .65 + 150, 50, 'Choose your Library!', { font: '25px Arial', fill: '#ffffff' });
        player2Label.inputEnabled = true;
        player2Label.selected = 0;
        player2Label.librarySelected = '';
        player2Label.events.onInputUp.add(function () {
            switch (player2Label.selected) {

                case 0:
                    player2Label.librarySelected = 'Marston'
                    player2Label.text = `${player2Label.librarySelected}`;
                    player2Label.selected++;
                    break;
                case 1:
                    player2Label.librarySelected = 'West'
                    player2Label.text = `${player2Label.librarySelected}`;
                    player2Label.selected--;
                    break;
            }
        });
        
        //Hide labels used in debugging
        player1Label.visible = false;
        player2Label.visible = false;

        var MultimanLabel = game.add.text(game.world.width * .5, game.world.height * .5 + 20, 'Multiman Mode: OFF', { font: '25px Arial', fill: '#ffffff' });
        MultimanLabel.anchor.setTo(.5,.5);
        MultimanLabel.inputEnabled = true;
        MultimanLabel.selected = 0;
        MultimanLabel.librarySelected = '';
        MultimanLabel.events.onInputUp.add(function () {
            switch (MultimanLabel.selected) {

                case 0:
                    MultimanLabel.librarySelected = 'Multiman Mode: OFF'
                    MultimanLabel.text = `${MultimanLabel.librarySelected}`;
                    MultimanLabel.selected++;
                    multimanmode = false;
                    break;
                case 1:
                    MultimanLabel.librarySelected = 'Multiman Mode: ON'
                    MultimanLabel.text = `${MultimanLabel.librarySelected}`;
                    MultimanLabel.selected--;
                    multimanmode = true;
                    break;
            }
        });

        var backbutton = game.add.text(50, 200, 'Click to go back', { font: '25px Arial', fill: '#ffffff' });
        backbutton.inputEnabled = true;
        backbutton.events.onInputUp.add(function () {
            game.state.start('menu');
        });


        //TODO:Incorperate dragUpdate function event system into current system. I think it's needed to fix bugs/add dynamic features like spawning the character when hovering over while still dragging.
        //TODO:
        //find a way to change text, show sprite and name with alpha applied when hovering but NOT selecting character, SOLUTION: probably above comment

    },
    start: function () {
        gameReadyText.text = `Game Start!`;
        //music.stop();
        game.state.start('arcsss');
    },
    update: function () {
        player1Text.text = `${charName1}`;
        player2Text.text = `${charName2}`;
        //If the character is selected, play the selected animation
        game.physics.arcade.collide(player1Icon, player2Icon);
        if (player1BodyIcon.animations) {
            player1BodyIcon.animations.play('idle');
        }

        if (player2BodyIcon.animations) {
            player2BodyIcon.animations.play('idle');
        }

        if (charSelected1 && (charSelected2 || botSelected) && key1.isDown) {
            //Eventually allow the player to start game;
            gameReadyText.text = `Game Start!`;
            game.state.start('arcsss');
        }
        else if (charSelected1 && (botSelected || charSelected2)) { //Allow the player to tap game ready to start game
            gameReadyText.text = `Click here or Press 'ENTER' to start!`;
            gameReadyText.inputEnabled = true;
            gameReadyText.events.onInputUp.addOnce(function () {
                //music.stop();
                game.state.start('arcsss');
            });
            
        }
        else {
            {
                gameReadyText.text = ``;
                gameReadyText.inputEnabled = false;
            }

        }
    },
    onDragStop: function () {
        console.log("test?");
        //If you drop the cursor on the icon
        if (game.physics.arcade.overlap(player1Icon, dudeIcon)) {
            console.log("test?");
            if(muteState==false)
            buttonSound.play();
            //Determine's what's spawned, and lets you start game
            charName1 = "Lab";
            charSelected1 = true;
            //"select" dude, and change color of pic
            dudeIcon.tint = 0xffff00;
            //destroys the old sprite so when you create a new one only one exists
            player1BodyIcon.kill();

            player1BodyIcon = game.add.sprite(game.world.width * .25 - 150, game.world.height * .5 - 50, 'Lab');

            player1BodyIcon.scale.setTo(3.5, 3.5);
            player1BodyIcon.animations.add('idle', [1, 2], 5, true);
            player1BodyIcon.animations.add('kick', [6], 5, true);
            if (player1BodyIcon.animations) {
                player1BodyIcon.alpha = 1;
            }
        }
        else {
            // player1BodyIcon.kill();
        }
        
        //If you drop the icon on the chick Picture
        if (game.physics.arcade.overlap(player1Icon, chickIcon)) {
            if(muteState==false)
            buttonSound.play();
            charName1 = "Goth";
            charSelected1 = true;
            chickIcon.tint = 0xffff00;
            player1BodyIcon.kill();

            player1BodyIcon = game.add.sprite(game.world.width * .25 - 150, game.world.height * .5 - 50, 'Goth');

            player1BodyIcon.scale.setTo(3.5, 3.5);
            
            player1BodyIcon.animations.add('idle', [1, 2], 5, true);
            player1BodyIcon.animations.add('kick', [6], 5, true);
            if (player1BodyIcon.animations) {
                player1BodyIcon.alpha = 1;
            }
        }



        if (game.physics.arcade.overlap(player2Icon, dudeIcon)) {
            if(muteState==false)
            buttonSound.play();
            charName2 = "Lab";
            charSelected2 = true;
            dudeIcon.tint = 0xffff00;
            player2BodyIcon.kill();
            controlOptionAI = 2;

            player2BodyIcon = game.add.sprite(game.world.width * .75 + 150, game.world.height * .5 - 50, 'Lab');
            player2BodyIcon.scale.setTo(3.5, 3.5);
            player2BodyIcon.animations.add('idle', [1, 2], 5, true);
            player2BodyIcon.animations.add('kick', [6], 5, true);
            player2BodyIcon.visible = true;


            if (player2BodyIcon.animations) {
                player2BodyIcon.alpha = 1;
            }
        }
        else {
            //player2BodyIcon.kill();
        }



        if (game.physics.arcade.overlap(player2Icon, chickIcon)) {
            if(muteState==false)
            buttonSound.play();
            charName2 = "Goth";
            charSelected2 = true;
            chickIcon.tint = 0xffff00;
            player2BodyIcon.kill();
            controlOptionAI = 2;

            player2BodyIcon = game.add.sprite(game.world.width * .75 + 150, game.world.height * .5 - 50, 'Goth');
            player2BodyIcon.scale.setTo(3.5, 3.5);
            player2BodyIcon.animations.add('idle', [1, 2], 5, true);
            player2BodyIcon.animations.add('kick', [6], 5, true);

            if (player2BodyIcon.animations) {
                player2BodyIcon.alpha = 1;
            }
        }
        else {
            // player2BodyIcon.kill();
        }

        if (game.physics.arcade.overlap(player2Icon, computerIcon)) {
            if(muteState==false)
            buttonSound.play();
            charName2 = "Goth";
            botSelected = true;
            computerIcon.tint = 0xffff00;
            player2BodyIcon.kill();
            controlOptionAI = -2; //Temporary till we have the AI logic, then replace this with a -2 instead,using vpad to test functionality
            console.log("controlOptionAI: " + controlOptionAI);
            player2BodyIcon = game.add.sprite(game.world.width * .75 + 150, game.world.height * .5 - 50, 'Goth');
            player2BodyIcon.scale.setTo(3.5, 3.5);
            player2BodyIcon.animations.add('idle', [1, 2], 5, true);
            player2BodyIcon.animations.add('kick', [6], 5, true);

            if (player2BodyIcon.animations) {
                player2BodyIcon.alpha = 1;
            }
        }
        else {
            // player2BodyIcon.kill();
        }

        if (!game.physics.arcade.overlap(player1Icon, dudeIcon) && !game.physics.arcade.overlap(player1Icon, chickIcon)) {
            player1BodyIcon.kill();
        }

        if (!game.physics.arcade.overlap(player2Icon, dudeIcon) && !game.physics.arcade.overlap(player2Icon, chickIcon) && !game.physics.arcade.overlap(player2Icon, computerIcon)) {
            player2BodyIcon.kill();
        }

    },
    onDragStart: function () {


        if (game.physics.arcade.overlap(player1Icon, dudeIcon)) {
            charName1 = "";
            charSelected1 = false;
            dudeIcon.tint = 0xffffff;

            if (player1BodyIcon.animations) {
                player1BodyIcon.alpha = .5;
            }
        }


        if (game.physics.arcade.overlap(player1Icon, chickIcon)) {
            charName1 = "";
            charSelected1 = false;
            chickIcon.tint = 0xffffff;

            if (player1BodyIcon.animations) {
                player1BodyIcon.alpha = .5;
            }
        }


        if (game.physics.arcade.overlap(player2Icon, dudeIcon)) {
            charName2 = "";
            charSelected2 = false;
            dudeIcon.tint = 0xffffff;

            if (player2BodyIcon.animations) {
                player2BodyIcon.alpha = .5;
            }
        }


        if (game.physics.arcade.overlap(player2Icon, chickIcon)) {
            charName2 = "";
            charSelected2 = false;
            chickIcon.tint = 0xffffff;

            if (player2BodyIcon.animations) {
                player2BodyIcon.alpha = .5;
            }
        }
        if (game.physics.arcade.overlap(player2Icon, computerIcon)) {
            charName2 = "";
            botSelected = false;
            computerIcon.tint = 0xffffff;

            console.log("controlOptionAI: " + controlOptionAI);

            if (player2BodyIcon.animations) {
                player2BodyIcon.alpha = .5;
            }
        }


    }
};
