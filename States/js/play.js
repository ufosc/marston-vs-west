var dmgText;

var playState = {
    //hitPlayer12: function (target,attacker)
    hitPlayer12: function (Player1,Player2) {

        var OnePunchBonus = 0;
        
        if(gameManager.OnePunchDeath){
            OnePunchBonus = 10000;
        }

        let hitDmg = 0;
        let hitAngle = 0;
        let attackDistance = 0;
        if (!Player2.deltDamage && !Player1.invincible && Player2.attacking && (game.physics.arcade.overlap(Player1.character, Player2.weapon1.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponKick.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponUppercut.bullets) || game.physics.arcade.overlap(Player1.character, Player2.jumpKick.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponSwipeD.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponSwipeFD.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponSwipeFU.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponSwipeU.bullets) )) {
            Player1.attacking = false;
            switch (Player2.attack) {
                case 'punch':
                    hitDmg = 9 + Player2.DMGModifier;
                    attackDistance = 2;
                    hitAngle = 1;
                    break;
                case 'kick':
                    hitDmg = 15 + Player2.DMGModifier;
                    attackDistance = 10;
                    hitAngle = 1;
                    break;
                case 'uppercut':
                    hitDmg = 35 + Player2.DMGModifier;
                    attackDistance = 70;
                    hitAngle = 1.35;
                    break;
                case 'jumpKick':
                    hitDmg = 10 + Player2.DMGModifier;
                    attackDistance = 25;
                    hitAngle = 1;
                    break;
                case 'warlock':
                    hitDmg = 65 + Player2.DMGModifier;
                    attackDistance = 300;
                    hitAngle = 1.25;
                    break;
                case 'airneutral':
                    hitDmg = 15 + Player2.DMGModifier;
                    attackDistance = 300;
                    hitAngle = 0.7;
                    break;
                case 'airforward':
                    hitDmg = 15 + Player2.DMGModifier;
                    attackDistance = 300;
                    hitAngle = 1.25;
                    break;
                case 'airdown':
                    hitDmg = 15 + Player2.DMGModifier;
                    attackDistance = 300;
                    hitAngle = 0.7 //1.25;
                    break;
                case 'juggle':
                    hitDmg = 15 + Player2.DMGModifier;
                    attackDistance = 300;
                    hitAngle = 1.6;
                    break;
                default:
                    console.log("No attacks went off, you have an error");
            }

            if (Player1.m === 0 && !Player1.shielding) {
                
                RandHit = Math.floor((Math.random() * 4));
                
                if(muteState == false){
                    if(RandHit === 0){
                        hitSound.play();
                    }
                    else if(RandHit === 1){
                        hitSound1.play();
                    }
                    else if(RandHit === 2){
                        hitSound2.play();
                    }
                    else if(RandHit === 3){
                        hitSound3.play();
                    }
                    else {
                        hitSound.play();
                    }
                }

                Player1.hangingState = "LetGo";
                Player1.hangingTimer = 100;
                Player1.health += hitDmg + OnePunchBonus;
                Player1.hitVelocity = Player2.character.scale.x * Player1.health * 2 + OnePunchBonus;

                //update points for damage dealt
                gameManager.ScoreKeeper.updatePoint(gameManager.ScoreKeeper.verifyPlayer(Player2.controlnum), 1, hitDmg);

                //update points for damage taken
                gameManager.ScoreKeeper.updatePoint(gameManager.ScoreKeeper.verifyPlayer(Player1.controlnum), 2, hitDmg);

                /*dmgText = game.add.text(Player1.character.x, Player1.character.y, `${hitDmg}`);
                dmgText.anchor.setTo(.5,.5);
                dmgText.fill = '#ffffff';
                //dmgText.velocity.y = 100;
                game.time.events.add(Phaser.Timer.SECOND * 3, this.textGoAway, this);*/
                if(hitDmg <= 10)
                    game.time.events.add(Phaser.Timer.SECOND * 0, function(){
                        let animation = game.add.sprite(Player1.character.x, Player1.character.y, 'pow');
                        animation.anchor.setTo(0.5, 0.5);
                        game.add.tween(animation).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                        game.add.tween(animation).to( { y: Player1.character.y - 50 }, 1000, Phaser.Easing.Linear.None, true);
                    }, this);
                else if((hitDmg > 10) && (hitDmg <= 20))
                    game.time.events.add(0, function(){
                        let animation = game.add.sprite(Player1.character.x, Player1.character.y, 'ugh');
                        animation.anchor.setTo(0.5, 0.5);
                        game.add.tween(animation).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                        game.add.tween(animation).to( { y: Player1.character.y - 50 }, 1000, Phaser.Easing.Linear.None, true);
                    }, this);
                else
                    game.time.events.add(Phaser.Timer.SECOND * 0, function() {
                        let animation = game.add.sprite(Player1.character.x, Player1.character.y, 'ouch');
                        animation.anchor.setTo(0.5, 0.5);
                        game.add.tween(animation).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                        game.add.tween(animation).to( { y: Player1.character.y - 50 }, 1000, Phaser.Easing.Linear.None, true);
                    }, this);

                Player1.character.body.velocity.y = -(Math.pow(Player1.health, hitAngle));
                
                if (gameManager.scenario == "Metal"){
                    Player1.stuncounterset(0);
                }
                else if (Player1.health >= 0 || Player1.health <= 75) {
                    Player1.stuncounterset(60);
                }
                else if (Player1.health > 75 || Player1.health <= 150) {
                    Player1.stuncounterset(120);
                    if (Player1.health >= 120) {
                        hitpause = 10;
                    }
                }
                else if (Player1.health > 150 || Player1.health < 200) {
                    hitpause = 10;
                    Player1.stuncounterset(300);
                }
                else {
                    hitpause = 10;
                    Player1.stuncounterset(450);
                }
            }
            Player2.deltDamage = true;
        }
    },

    yHitVelocity: function (Fighter) {
        Fighter.character.body.velocity.y = -(Math.pow(Fighter.health, 1.25));
    },

    respawn: function (Fighter) {
        /*
        if(Fighter.lives -1 >= 0){
            Fighter.lives += -1;
        }*/

        game.time.events.add(Phaser.Timer.SECOND, this.playRespawnSound, this);
        Fighter.aniIdle.play(10, false);

        Fighter.deathBlast.x = (Fighter.character.x < 0) ? (0) : (Fighter.character.x);
        Fighter.deathBlast.y = (Fighter.character.y < 0) ? (0) : (Fighter.character.y);
        Fighter.deathBlast.x = (Fighter.character.x > game.world.width) ? (game.world.width) : (Fighter.deathBlast.x);
        Fighter.deathBlast.y = (Fighter.character.y > game.world.height) ? (game.world.height) : (Fighter.deathBlast.y);
        
        if (Fighter.character.x < 0)
        {
            if (Fighter.character.y < 0)
            {
                Fighter.deathBlast.angle = 45;
            }
            else if (Fighter.character.y > game.world.height)
            {
                Fighter.deathBlast.angle = -45;
            }
            else
            {
                Fighter.deathBlast.angle = 0;
            }
        }
        else if (Fighter.character.x > game.world.width)
        {
            if (Fighter.character.y < 0)
            {
                Fighter.deathBlast.angle = 135;
            }
            else if (Fighter.character.y > game.world.height)
            {
                Fighter.deathBlast.angle = -135;
            }
            else
            {
                Fighter.deathBlast.angle = 180;
            }
        }
        else if (Fighter.character.y < 0)
        {
            Fighter.deathBlast.angle = 90;
        }
        else
        {
            Fighter.deathBlast.angle = -90;
        }

        if(Fighter.lives >= 1){
            if (Fighter.controlnum === 1) {
                Fighter.character.x = 0.25 * game.width  //200;
                Fighter.character.y = 0.15 * game.height //230;
                Fighter.respawnSwitch = true;
                Fighter.m = 0;
                Fighter.inputLock = false;
                Fighter.invincible = false;
                Fighter.xZero = true;
            }
            else if (Fighter.controlnum === 2) {
                Fighter.character.x = 0.75 * game.width;
                Fighter.character.y = 0.15 * game.height;
                Fighter.respawnSwitch = true;
                Fighter.m = 0;
                Fighter.inputLock = false;
                Fighter.invincible = false;
                Fighter.xZero = true;
            }
            else if (Fighter.controlnum === -1) {
                //console.log("controlnum = -1");
                //Fighter.character.body.position.x = 200;
                Fighter.character.x = 0.25 * game.width  //200;
                Fighter.character.y = 0.15 * game.height //230;
                Fighter.respawnSwitch = true;
                Fighter.m = 0;
                Fighter.inputLock = false;
                Fighter.invincible = false;
                Fighter.xZero = true;
            }
            else if (Fighter.controlnum === -2) {
                //console.log("controlnum = -2");
                //Fighter.character.body.position.x = 200;
                //Fighter.character.x = 600;
                //Fighter.character.y = 230;
                Fighter.character.x = 0.75 * game.width;
                Fighter.character.y = 0.15 * game.height;
                Fighter.respawnSwitch = true;
                Fighter.m = 0;
                Fighter.inputLock = false;
                Fighter.invincible = false;
                Fighter.xZero = true;
            }
            Fighter.health = 0;
            
            if(gameManager.OnePunchDeath === true){
                Fighter.lives = 0;
            }
        }

        Fighter.character.body.velocity.x = 0;
        Fighter.character.body.velocity.y = 0;
        Fighter.hitVelocity = 0;

        gameManager.ScoreKeeper.updatePoint(gameManager.ScoreKeeper.verifyPlayer(Fighter.controlnum), 0, 1);

    },

    respawnEvent: function (Fighter) {
        //Respawn Switch is activated during the KO function
        if (Fighter.respawnSwitch === true && Fighter.lives > 0) {
            Fighter.m += 1;
            //Invisible moment
            if (Fighter.m < 60 && Fighter.m != 0) {
                Fighter.character.body.gravity.y = 0;
                Fighter.character.body.velocity.x = 0;
                Fighter.hitVelocity = 0;
                Fighter.character.visible = false;
                Fighter.deathBlast.visible = true;
            }
            //Book Crashing down Animation
            else if (Fighter.m >= 60 && Fighter.m < 120) {
                Fighter.character.body.gravity.y = 400;
                Fighter.character.body.velocity.x = 0;
                Fighter.hitVelocity = 0;
                Fighter.character.visible = true;
                Fighter.deathBlast.visible = false;
            }
            else {
                Fighter.character.body.gravity.y = 650;
            }
            //Makes character alpha to signify invulnerability
            if (Fighter.m <= 300) {
                if (Fighter.m % 20 <= 5) {
                    Fighter.character.alpha = 1;
                }
                else {
                    Fighter.character.alpha = 0.5;
                }

            }
            else {
                Fighter.character.alpha = 1;
                Fighter.m = 0;
                Fighter.respawnSwitch = false;
            }
        }
    },
    
    playerHitStun: function (Fighter) {
        if (gameManager.scenario == "Metal"){
            Fighter.stuncounterset(0);
        }
        else if (Fighter.health >= 0 || Fighter.health <= 75) {
            Fighter.stuncounterset(15);
        }
        else if (Fighter.health > 75 || Fighter.health <= 150) {
            Fighter.stuncounterset(45);
        }
        else if (Fighter.health > 150 || Fighter.health < 200) {
            Fighter.stuncounterset(90);
        }
        else {
            Fighter.stuncounterset(150);
        }
    },

    KO: function (Fighter) {
        
        //if (Fighter.character.body.position.x < -50 || Fighter.character.body.position.x > 900) {
        if (Fighter.character.body.position.x < -100 || Fighter.character.body.position.x > game.world.width + 100 || Fighter.health > 300) {
            Fighter.character.hasItem = false;
            if(muteState==false)
            deathSound.play();
           
            if(Fighter.lives > 1){
                Fighter.lives += -1;
                console.log('KO player died?');
                this.respawn(Fighter);
            }
            else{
                Fighter.lives = 0;
            }
            
            var live = Fighter.stocks.getFirstAlive();
            if (live) {
                live.kill();
            }
            if (multimanmode === true && Fighter.controlnum < 0) {
                multimenko++;
            }         
        }
        //else if (Fighter.character.body.position.y > 700 || Fighter.character.body.position.y < -200) {
        else if (Fighter.character.body.position.y > game.world.height + 300 || Fighter.character.body.position.y < -300) {
            Fighter.character.hasItem = false;
            if(muteState==false)
            deathSound.play();
            if(Fighter.lives > 1){
                Fighter.lives += -1;
                console.log('KO player died vertically?');
                this.respawn(Fighter);
            }
            else{
                Fighter.lives = 0;
            }
            var live = Fighter.stocks.getFirstAlive();
            if (live) {
                live.kill();
            }
            if (multimanmode === true && Fighter.controlnum < 0) {
                multimenko++;
            }
        }
    },

    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            //  game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), game.world.width * .5, 15, "#ffffff");
        }
        else {
            game.debug.text("Done!", 2, 14, "#0f0");
        }
    },

    create: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        //w = 800;
        //h = 600;
        game.time.advancedTiming = true;
        FrameTimer = 0;
        FrameTarget = 3;

        //Items = game.add.group();
        //Items.add();

        Items = [];

        //create a timer for the game
        timer = game.time.create(false);
        timerEvent = timer.add(Phaser.Timer.MINUTE * gameManager.gameMinutes + Phaser.Timer.SECOND * gameManager.gameSeconds, this.timeOutGame, this);
        timer.start();

        if(gameManager.gameType === "Arcade") {
            gameManager.ScoreKeeper.updatePoint(0, 3, timer.duration);
        }
        
        var esckey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        esckey.onDown.addOnce(this.timeOutGame);

        if(gameManager.scenario === "MultiMan"){
            multimanmode = true;
        }
        else{
            multimanmode = false;
        }

        //Play music
        music.stop();
        music = game.add.audio('allstar', gameManager.volume*0.1);

        music.loopFull();

        hitpause = 0;

        //Camera tests
        stagecam = new cam(40, 350, 1200, 1000);

        if(gameManager.chosenStageName === 'MarstonTableStage') {

            //Background for our game
            back = game.add.sprite(0, 0, 'MarstonTableStage');

            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();
            
            

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.7, false, 'plat1',35, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
            
        }
        else if(gameManager.chosenStageName === 'WestPrintStage') {
            back = game.add.sprite(0, 0, 'WestPrintStage');

            back.scale.setTo(1.6,1.3);
           
            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.78, false, 'plat1', 35, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
              
            //  The platforms group contains the ground and the 2 ledges we can jump on
            miniPlatforms = game.add.group();
            
            miniland1 = new platform(game.world.width*0.45, game.world.height * 0.5 - 5, false, 'plat2', 1,1);
            miniland2 = new platform(game.world.width*0.63, game.world.height * 0.5, false, 'plat2', 1,1);

            var plat1 = miniPlatforms.add(miniland1.plat);
            var plat2 = miniPlatforms.add(miniland2.plat);

            plat1.anchor.setTo(0.5,1);
            plat2.anchor.setTo(0.5,1);

            plat1.body.collideWorldBounds = true;
            plat2.body.collideWorldBounds = true;
            
            plat1.body.checkCollision.down = false;
            plat2.body.checkCollision.down = false;
            
            plat1.body.immovable = true;
            plat2.body.immovable = true;

            plat1.scale.setTo(5, 0.7);
            plat2.scale.setTo(5, 0.7);


            miniland3 = new platform(game.world.width*0.85, game.world.height * 0.45, false, 'plat2', 7, 1);
            var plat3 = miniPlatforms.add(miniland3.plat);
            plat3.anchor.setTo(0.5,1);
            //plat3.body.collideWorldBounds = true;
            plat3.body.checkCollision.down = false;
            plat3.body.immovable = true;
            
            miniland4 = new platform(game.world.width*0.1 -20, game.world.height * 0.5, false, 'plat2', 7, 1);
            var plat4 = miniPlatforms.add(miniland4.plat);
            plat4.anchor.setTo(0.5,1);
            //plat4.body.collideWorldBounds = true;
            plat4.body.checkCollision.down = false;
            plat4.body.immovable = true;

            //  Scale it to fit the width of the game (the original sprite is ? in size)
            //ground.scale.setTo(16, 1);
            //ground.scale.setTo(40, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;
        }
        else if(gameManager.chosenStageName === 'WestDeskStage') {
            back = game.add.sprite(0, 0, 'WestDeskStage');

            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.7, false, 'plat1',40, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
            
            //  The platforms group contains the ground and the 2 ledges we can jump on
            miniPlatforms = game.add.group();
            
            miniland1 = new platform(game.world.width*0.2, game.world.height * 0.35, false, 'plat2', 5, 0.7);
            miniland2 = new platform(game.world.width*0.48, game.world.height * 0.27, false, 'plat2', 17, 0.7);

            var plat1 = miniPlatforms.add(miniland1.plat);
            var plat2 = miniPlatforms.add(miniland2.plat);

            plat1.anchor.setTo(0.5,1);
            plat2.anchor.setTo(0.5,1);

            plat1.body.collideWorldBounds = true;
            plat2.body.collideWorldBounds = true;
            
            plat1.body.checkCollision.down = false;
            plat2.body.checkCollision.down = false;
            
            plat1.body.immovable = true;
            plat2.body.immovable = true;

            //plat1.scale.setTo(5, 0.7);
            //plat2.scale.setTo(5, 0.7);

            miniland3 = new platform(game.world.width*0.8, game.world.height * 0.35, false, 'plat2', 5,0.7);
            var plat3 = miniPlatforms.add(miniland3.plat);
            plat3.anchor.setTo(0.5,1);
            //plat3.body.collideWorldBounds = true;
            plat3.body.checkCollision.down = false;
            plat3.body.immovable = true;
        }
        else if(gameManager.chosenStageName === 'GatorStage') {
            back = game.add.sprite(0, 0, 'GatorStage');

            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.68, false, 'plat1',35, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
        }
        else if(gameManager.chosenStageName === 'TreeStage') {
            back = game.add.sprite(0, 0, 'TreeStage');

            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.9, false, 'plat1',40, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
           
            //  The platforms group contains the ground and the 5 ledges we can jump on
            miniPlatforms = game.add.group();
            
            miniland1 = new platform(game.world.width*0.45, game.world.height * 0.6, false, 'plat2', 5,0.7);
            miniland2 = new platform(game.world.width*0.63, game.world.height * 0.58, false, 'plat2', 5,0.7);
            
            var plat1 = miniPlatforms.add(miniland1.plat);
            var plat2 = miniPlatforms.add(miniland2.plat);
            
            plat1.anchor.setTo(0.5,1);
            plat2.anchor.setTo(0.5,1);

            plat1.body.collideWorldBounds = true;
            plat2.body.collideWorldBounds = true;
            
            plat1.body.checkCollision.down = false;
            plat2.body.checkCollision.down = false;
            
            plat1.body.immovable = true;
            plat2.body.immovable = true;
            
            
            miniland3 = new platform(game.world.width*0.82, game.world.height * 0.57, false, 'plat2', 5,0.7);
            var plat3 = miniPlatforms.add(miniland3.plat);
            plat3.anchor.setTo(0.5,1);
            //plat3.body.collideWorldBounds = true;
            plat3.body.checkCollision.down = false;
            plat3.body.immovable = true;
            
            miniland4 = new platform(game.world.width*0.3, game.world.height * 0.52, false, 'plat2', 5,0.7);
            var plat4 = miniPlatforms.add(miniland4.plat);
            plat4.anchor.setTo(0.5,1);
            //plat4.body.collideWorldBounds = true;
            plat4.body.checkCollision.down = false;
            plat4.body.immovable = true;
            
            miniland5 = new platform(game.world.width*0.15, game.world.height * 0.47, false, 'plat2', 5,0.7);
            var plat5 = miniPlatforms.add(miniland5.plat);
            plat5.anchor.setTo(0.5,1);
            //plat5.body.collideWorldBounds = true;
            plat5.body.checkCollision.down = false;
            plat5.body.immovable = true;
            
        }
        else if(gameManager.chosenStageName === 'TableTopStage') {
            back = game.add.sprite(0, 0, 'TableTopStage');

            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.48, game.world.height * 0.95, false, 'plat1',40, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);

            miniPlatforms = game.add.group();

            miniland1 = new platform(game.world.width * 0.47, game.world.height * 0.47, false, 'plat2', 14,0.7);
            var plat1 = miniPlatforms.add(miniland1.plat);
            plat1.anchor.setTo(0.5,1);
            //plat1.body.collideWorldBounds = true;
            plat1.body.checkCollision.down = false;
            plat1.body.immovable = true;
            
            miniland2 = new platform(game.world.width * 0.28, game.world.height * 0.68, false, 'plat2', 7,0.7);
            var plat2 = miniPlatforms.add(miniland2.plat);
            plat2.anchor.setTo(0.5,1);
            //plat2.body.collideWorldBounds = true;
            plat2.body.checkCollision.down = false;
            plat2.body.immovable = true;

            miniland3 = new platform(game.world.width * 0.67, game.world.height * 0.68, false, 'plat2', 7,0.7);
            var plat3 = miniPlatforms.add(miniland3.plat);
            plat3.anchor.setTo(0.5,1);
            //plat3.body.collideWorldBounds = true;
            plat3.body.checkCollision.down = false;
            plat3.body.immovable = true;

        }
        else if(gameManager.chosenStageName === 'TableTop2Stage') {
            back = game.add.sprite(0, 0, 'TableTop2Stage');
            
            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.97, false, 'plat1', 42, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
            
            miniPlatforms = game.add.group();
            
            miniland1 = new platform(game.world.width * 0.5, game.world.height * 0.68, false, 'plat2', 32,0.7);
            var plat1 = miniPlatforms.add(miniland1.plat);
            plat1.anchor.setTo(0.5,1);
            //plat1.body.collideWorldBounds = true;
            plat1.body.checkCollision.down = false;
            plat1.body.immovable = true;            
        }
        else if(gameManager.chosenStageName === 'ReitzPondStage') {
            back = game.add.sprite(0, 0, 'ReitzPondStage');

            back.scale.setTo(1.6,1.3);

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height *0.85, false, 'plat1',40, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
            
            //  The platforms group contains the ground and the 5 ledges we can jump on
            miniPlatforms = game.add.group();
            
            miniland1 = new platform(game.world.width*0.1, game.world.height * 0.53, false, 'plat2', 5,0.7);
            miniland2 = new platform(game.world.width*0.3, game.world.height * 0.4, false, 'plat2', 5,0.7);
            
            var plat1 = miniPlatforms.add(miniland1.plat);
            var plat2 = miniPlatforms.add(miniland2.plat);
            
            plat1.anchor.setTo(0.5,1);
            plat2.anchor.setTo(0.5,1);

            plat1.body.collideWorldBounds = true;
            plat2.body.collideWorldBounds = true;
            
            plat1.body.checkCollision.down = false;
            plat2.body.checkCollision.down = false;
            
            plat1.body.immovable = true;
            plat2.body.immovable = true;
            
            
            miniland3 = new platform(game.world.width*0.5, game.world.height * 0.53, false, 'plat2', 5,0.7);
            var plat3 = miniPlatforms.add(miniland3.plat);
            plat3.anchor.setTo(0.5,1);
            //plat3.body.collideWorldBounds = true;
            plat3.body.checkCollision.down = false;
            plat3.body.immovable = true;
            
            miniland4 = new platform(game.world.width*0.7, game.world.height * 0.4, false, 'plat2', 5,0.7);
            var plat4 = miniPlatforms.add(miniland4.plat);
            plat4.anchor.setTo(0.5,1);
            //plat4.body.collideWorldBounds = true;
            plat4.body.checkCollision.down = false;
            plat4.body.immovable = true;
            
            miniland5 = new platform(game.world.width*0.9, game.world.height * 0.53, false, 'plat2', 5,0.7);
            var plat5 = miniPlatforms.add(miniland5.plat);
            plat5.anchor.setTo(0.5,1);
            //plat5.body.collideWorldBounds = true;
            plat5.body.checkCollision.down = false;
            plat5.body.immovable = true;

            }
        else {
            //west
            //Background for our game
            back = game.add.sprite(0, 0, 'ReitzStepStage');
            
            back.scale.setTo(1.6,1.3);

            //  The platforms group contains the ground and the 2 ledges we can jump on
            miniPlatforms = game.add.group();

            // The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();
            platformsELeft = game.add.group();
            platformsERight = game.add.group();

            // Create the ground.
            land = new platform(game.world.width * 0.5, game.world.height * 0.82, false, 'plat1',35, 2)
            
            ground = platforms.add(land.plat);
            leftledge = platformsELeft.add(land.leftledge);
            rightledge = platformsERight.add(land.rightledge);
            
            miniland1 = new platform(game.world.width*0.2, game.world.height*0.54, false, 'plat2', 1,1);
            miniland2 = new platform(game.world.width*0.85, game.world.height*0.52, false, 'plat2', 1,1);

            var plat1 = miniPlatforms.add(miniland1.plat);
            var plat2 = miniPlatforms.add(miniland2.plat);

            plat1.anchor.setTo(0.5,1);
            plat2.anchor.setTo(0.5,1);

            plat1.body.collideWorldBounds = true;
            plat2.body.collideWorldBounds = true;
            
            plat1.body.checkCollision.down = false;
            plat2.body.checkCollision.down = false;
            
            plat1.body.immovable = true;
            plat2.body.immovable = true;

            plat1.scale.setTo(10, 1);
            plat2.scale.setTo(10, 1);

            //  Scale it to fit the width of the game (the original sprite is ? in size)
            //ground.scale.setTo(16, 1);
            //ground.scale.setTo(40, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;
        }

        //set stage to correct size
        back.width = game.world.width;
        back.height = game.world.height * 1.05;

        var scenarioLabel = game.add.text(game.world.width * 0.5, game.world.height * 0.9, gameManager.scenario, { font: '50px Permanent Marker', fill: '#ffffff' });
        scenarioLabel.anchor.setTo(0.5, 0.5);

        hitvol = 0.07;
        hitSound = game.add.audio('hitSound',hitvol);
        hitSound1 = game.add.audio('hitSound1',hitvol);
        hitSound2 = game.add.audio('hitSound2',hitvol);
        hitSound3 = game.add.audio('hitSound3',hitvol);

        respawnSound = game.add.audio('respawnSound', 0.1);
        deathSound = game.add.audio('deathSound', 0.2);
        jumpSound = game.add.audio('jumpSound',0.1);
        itemSound = game.add.audio('itemSound',0.05);
        buttonSound = game.add.audio('buttonSound', 0.4);
        buttonSound.volume = gameManager.volume * 0.2;
        //buttonSound.volume -= .5;

        if (game.device.android || game.device.iOS) {
            //If on mobile, use the vpad as input for player 1,
            controlOptionVpad = -1;
        }
        else {
            //If on desktop, do not use virtual inputs for player 1.
            controlOptionVpad = 1;
            //reverse controls
            if(gameManager.scenario === "Reverse"){
                controlOptionVpad = 24;
            }
            
        }

        if (charName1 === 'Fighter'){
            Player1 = new dj(charName1, 0, gameManager.lives, game.world.width * 0.25, game.world.height * 0.25, controlOptionVpad);
        }
        else if (charName1 === 'Lab') {
            Player1 = new lab(charName1, 0, gameManager.lives, game.world.width * 0.25, game.world.height * 0.25, controlOptionVpad);
        }
        else if (charName1 === 'Goth') {
            Player1 = new goth(charName1, 0, gameManager.lives, game.world.width * 0.25, game.world.height * 0.25, controlOptionVpad);
        }
        else if (charName1 === 'Boxer') {
            Player1 = new boxer(charName1, 0, gameManager.lives, game.world.width * 0.25, game.world.height * 0.25, controlOptionVpad);
        }


        if (charName2 === 'Fighter') {
            Player2 = new dj(charName2, 0, gameManager.lives, game.world.width * 0.75, game.world.height * 0.25, controlOptionAI);
        }
        else if (charName2 === 'Goth') {
            Player2 = new goth(charName2, 0, gameManager.lives, game.world.width * 0.75, game.world.height * 0.25, controlOptionAI);
        }
        else if (charName2 === 'Lab') {
            Player2 = new lab(charName2, 0, gameManager.lives, game.world.width * 0.75, game.world.height * 0.25, controlOptionAI);
        }
        else if (charName2 === 'Boxer') {
            Player2 = new boxer(charName2, 0, gameManager.lives, game.world.width * 0.75, game.world.height * 0.25, controlOptionAI);
        }

        if (multimanmode === true) {
            if (charName2 === 'Fighter') {
                Player3 = new dj(charName2, 0, gameManager.lives, game.world.width * 0.5, game.world.height * 0.25, controlOptionAI);
            }
            else if (charName2 === 'Goth') {
                Player3 = new goth(charName2, 0, gameManager.lives, game.world.width * 0.5, game.world.height * 0.25, controlOptionAI);
            }
            else if (charName2 === 'Lab') {
                Player3 = new lab(charName2, 0, gameManager.lives, game.world.width * 0.5, game.world.height * 0.25, controlOptionAI);
            }
            else if (charName2 === 'Boxer') {
                Player3 = new boxer(charName2, 0, gameManager.lives, game.world.width * 0.5, game.world.height * 0.25, controlOptionAI);
            }

            Player1.DMGModifier =  20;
            Player2.DMGModifier = -10;
            Player3.DMGModifier = -10;

            //Player3 = new lab(charName2, 0, gameManager.lives, game.world.width * 0.5, game.world.height * 0.25, controlOptionAI);
        }


        console.log("work?");
        
        Player1.resettint();
        
        Player2.resettint();

        //event listener for player1 touch controls
        //console.log("test print");

        //console.log(Player1.controlnum);

        //Create an item
        //item1 = new Item('bottle', game.world.width * .5, game.world.height * .5, this);

        //gatorfight
        if(gameManager.scenario === "GatorFight"){
            item1 = new Item('gator', game.world.width * .25, game.world.height * .5, this);
            item2 = new Item('gator', game.world.width * .35, game.world.height * .5, this);
            item3 = new Item('gator', game.world.width * .5, game.world.height * .5, this);
            item4 = new Item('gator', game.world.width * .45, game.world.height * .5, this);
            item5 = new Item('gator', game.world.width * .75, game.world.height * .5, this);
            
            Items = [ item1, item2, item3, item4, item5];

            /*Items.add(item1);
            Items.add(item2);
            Items.add(item3);
            Items.add(item4);
            Items.add(item5);*/
        }
        else {
            item1 = new Item('bottle', game.world.width * .5, game.world.height * .5, this);
            //Items.add(item1);
            Items = [ item1];
        }

        if (Player1.controlnum === -1) {
            //console.log("virtual buttons are made buttons");
            //Player1.controller1.buttonleft = game.add.button(5, 472, 'leftButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonleft = game.add.button(0, game.world.height*0.7, 'leftButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonleft.events.onInputOver.add(function () { Player1.controller1.leftpress = true; });
            Player1.controller1.buttonleft.events.onInputOut.add(function () { Player1.controller1.leftpress = false; });
            Player1.controller1.buttonleft.events.onInputDown.add(function () { Player1.controller1.leftpress = true; });
            Player1.controller1.buttonleft.events.onInputUp.add(function () { Player1.controller1.leftpress = false; });

            //Right button
            //Player1.controller1.buttonright = game.add.button(105, 472, 'rightButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonright = game.add.button(Player1.controller1.buttonleft.width * 2, game.world.height*0.7, 'rightButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonright.events.onInputOver.add(function () { Player1.controller1.rightpress = true; });
            Player1.controller1.buttonright.events.onInputOut.add(function () { Player1.controller1.rightpress = false; });
            Player1.controller1.buttonright.events.onInputDown.add(function () { Player1.controller1.rightpress = true; });
            Player1.controller1.buttonright.events.onInputUp.add(function () { Player1.controller1.rightpress = false; });

            //Up button
            //Player1.controller1.buttonup = game.add.button(55, 412, 'upButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonup = game.add.button(Player1.controller1.buttonleft.width, game.world.height*0.7 - Player1.controller1.buttonleft.height, 'upButton', null, this, 0, 1, 0, 1);            
            Player1.controller1.buttonup.events.onInputOver.add(function () { Player1.controller1.uppress = true; });
            Player1.controller1.buttonup.events.onInputOut.add(function () { Player1.controller1.uppress = false; });
            Player1.controller1.buttonup.events.onInputDown.add(function () { Player1.controller1.uppress = true; });
            Player1.controller1.buttonup.events.onInputUp.add(function () { Player1.controller1.uppress = false; });

            //Down button
            //Player1.controller1.buttondown = game.add.button(55, 535, 'downButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttondown = game.add.button(Player1.controller1.buttonleft.width, game.world.height*0.7 + Player1.controller1.buttonleft.height, 'downButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttondown.events.onInputOver.add(function () { Player1.controller1.downpress = true; });
            Player1.controller1.buttondown.events.onInputOut.add(function () { Player1.controller1.downpress = false; });
            Player1.controller1.buttondown.events.onInputDown.add(function () { Player1.controller1.downpress = true; });
            Player1.controller1.buttondown.events.onInputUp.add(function () { Player1.controller1.downpress = false; });

            //A button
            //Player1.controller1.buttona = game.add.button(685, 425, 'aButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttona = game.add.button(game.world.width - (Player1.controller1.buttonleft.width), game.world.height*0.7, 'aButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttona.events.onInputOver.add(function () { Player1.controller1.apress = true; });
            Player1.controller1.buttona.events.onInputOut.add(function () { Player1.controller1.apress = false; });
            Player1.controller1.buttona.events.onInputDown.add(function () { Player1.controller1.apress = true; });
            Player1.controller1.buttona.events.onInputUp.add(function () { Player1.controller1.apress = false; });

            //B button
            //Player1.controller1.buttonb = game.add.button(735, 475, 'bButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonb = game.add.button(game.world.width - (2 * Player1.controller1.buttonleft.width), game.world.height*0.7 + Player1.controller1.buttonleft.height, 'bButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonb.events.onInputOver.add(function () { Player1.controller1.bpress = true; });
            Player1.controller1.buttonb.events.onInputOut.add(function () { Player1.controller1.bpress = false; });
            Player1.controller1.buttonb.events.onInputDown.add(function () { Player1.controller1.bpress = true; });
            Player1.controller1.buttonb.events.onInputUp.add(function () { Player1.controller1.bpress = false; });

            //X button
            //Player1.controller1.buttonx = game.add.button(635, 475, 'xButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonx = game.add.button(game.world.width - (2 * Player1.controller1.buttonleft.width), game.world.height*0.7 - Player1.controller1.buttonleft.height, 'xButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttonx.events.onInputOver.add(function () { Player1.controller1.xpress = true; });
            Player1.controller1.buttonx.events.onInputOut.add(function () { Player1.controller1.xpress = false; });
            Player1.controller1.buttonx.events.onInputDown.add(function () { Player1.controller1.xpress = true; });
            Player1.controller1.buttonx.events.onInputUp.add(function () { Player1.controller1.xpress = false; });

            //Y button
            //Player1.controller1.buttony = game.add.button(685, 525, 'yButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttony = game.add.button(game.world.width - (3 * Player1.controller1.buttonleft.width), game.world.height*0.7, 'yButton', null, this, 0, 1, 0, 1);
            Player1.controller1.buttony.events.onInputOver.add(function () { Player1.controller1.ypress = true; });
            Player1.controller1.buttony.events.onInputOut.add(function () { Player1.controller1.ypress = false; });
            Player1.controller1.buttony.events.onInputDown.add(function () { Player1.controller1.ypress = true; });
            Player1.controller1.buttony.events.onInputUp.add(function () { Player1.controller1.ypress = false; });

            //end of event listeners

            //controller1
            testconnect1 = false;
        }

        //mob = new crowd(0,0);

        healthtext1 = game.add.text(game.world.width*0.1, game.world.height * 0.95, `DMG ${Player1.health}`,{ font: '20px Permanent Marker'}, Player1.fighterStyle );
        healthtext1.stroke = '#ffffff';
        healthtext1.strokeThickness = 10;
        healthtext1.scale.x = 2;
        healthtext1.scale.y = 2;
        healthtext1.anchor.setTo(0,1);

        healthtext2 = game.add.text(game.world.width*0.9, game.world.height * 0.95, `DMG ${Player2.health}`,{ font: '20px Permanent Marker'}, Player2.fighterStyle);
        healthtext2.stroke = '#ffffff';
        healthtext2.strokeThickness = 10;
        healthtext2.scale.x = 2;
        healthtext2.scale.y = 2;
        healthtext2.anchor.setTo(1,1);


        //livetext1 = game.add.text(0, game.world.height - 50, ``,style2);

        //livetext2 = game.add.text(650, game.world.height - 50, `Lives ${Player2.lives}`,style2);
        //livetext2 = game.add.text(650, game.world.height - 50, ``,style2);

        nameText1 = game.add.text(0, 0, "P1", style);
        nameText2 = game.add.text(0, 0, "P2", style);
        
        if(multimanmode === true) {
            nameText3 = game.add.text(0, 0, "P3", style);
        }

        //Pause
        pauseLabel = game.add.text(game.world.width * .5, game.world.height * .1, 'Pause', { font: '50px Permanent Marker', fill: '#ffffff' });
        pauseLabel.anchor.setTo(.5, 0.5);
        pauseLabel.inputEnabled = true;
        pauseLabel.events.onInputUp.add(function () {
            
            //Pause menu
            if(game.paused == false) {
                pauseMenu = game.add.sprite(game.world.width * .5, game.world.height * .5, 'Pause Menu');
                pauseMenu.anchor.setTo(.5, .5);
            }
            game.paused = true;
            
        });
        game.input.onDown.add(unpause, self);
        function unpause(event) {
            //only act if isPaused
            if (game.paused) {
                
                //Calculate corners of menu button
                var x1 = game.world.width * .5 - 170;
                var x2 = game.world.width * .5 + 200;
                var y1 = game.world.height * .5 - 30;
                var y2 = game.world.height * .5 + 30;

                // Check if the click was menu text
                if (event.x > x1 && event.x < x2 && event.y > y1+65 && event.y < y2+65) {
                    console.log("go to menu!!!");
                    music.stop();
                    if(muteState==false)
                    buttonSound.play();
                    game.state.start('menu');
                    pauseMenu.destroy();

                    // Unpause the game, required to actually jump to the menu
                    game.paused = false;
                    console.log('inside menu');
                }
                //if resume is clicked
                else if (event.x > x1 && event.x < x2 && event.y > y1-50 && event.y < y2-30) {
                    console.log("resume game!!!");
                    // Remove the menu and the label
                    pauseMenu.destroy();
                   
                    // Unpause the game
                    game.paused = false;
                }
                else if (event.x > x1+80 && event.x < x2-100 && event.y > y1+160 && event.y < y2+160){
                    console.log("Exit game!!!");
                    game.destroy();
                }
            }
        };
        timerText = game.add.text(game.world.width * .5, game.world.height* 0, `Time: ${timer.duration}`, { font: '50px Permanent Marker', fill: '#000000' });
        timerText.anchor.setTo(.5, 0);
    },

    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    playRespawnSound: function () {
        if(muteState==false)
        respawnSound.play();
    },
    timeOutGame: function () {
    
        if(gameManager.gameType === "Arcade") {
            gameManager.ScoreKeeper.updatePoint(0, 4, timer.duration);
            gameManager.matchOutcome = "Loss";
        }
    
        timer.stop();
        //checkArcadeWin();
        //music.stop();
        game.state.start('win');
    },
    update: function () {

    /*
    console.log("update?");
    // Pad "connected or not" indicator
    if (game.input.gamepad.supported && game.input.gamepad.active)
    {
        console.log("Controller works?!?!?");
    }
    else
    {
        console.log("Controller doesnt works?!?!?");
    }
    */

        FrameTimer++;
        if (FrameTimer > FrameTarget){
            FrameTimer = 0
        } 

        if(gameManager.scenario === "Invisible"){
            Player1.character.alpha = 0;
            Player2.character.alpha = 0;

            if (multimanmode === true){
                Player3.character.alpha = 0;
            }
        }

        if(gameManager.scenario === "Giant"){
            Player1.character.scale.x  = 10;

            if (multimanmode === true){
                Player3.character.alpha = 0;
            }
        }
        //console.log('Inside update function');
        //console.log("controlOptionAI: " + controlOptionAI);
        game.physics.arcade.overlap(Player1.character, this.win, this.Win, null, this);
        game.physics.arcade.overlap(Player2.character, this.win, this.Win, null, this);

        //updates the music volume for 'allstar'
        //music.volume = musicvol;
        music.mute = muteState;

        // logic check for hitpause, split second intentional slowdown when players are hit
        if (hitpause > 0) {

            game.time.slowMotion = 18;

            hitpause--;
        }
        else {
            game.time.slowMotion = 1;
        }

        // Check for combos
        //console.log(Player1.combo);
        //console.log(Player1.comboclock);
        Player1.combocheck();
        Player2.combocheck();

        //check for ledge grab/hangs
        Player1.checkLedge(leftledge, rightledge);
        Player2.checkLedge(leftledge, rightledge);

        //Applies Super armor and immovabilty to players while attacking
        if (Player1.attacking) {
            Player1.character.body.velocity.x = 5 * Player1.character.scale.x;
        }

        if (Player2.attacking) {
            Player2.character.body.velocity.x = 5 * Player2.character.scale.x;
        }

        //  Collide the players with the platforms and eachother
        if (gameManager.chosenStageName === 'ReitzStepStage' || gameManager.chosenStageName === 'WestPrintStage' || gameManager.chosenStageName === 'WestDeskStage' || gameManager.chosenStageName === 'TreeStage' || gameManager.chosenStageName === 'TableTopStage' || gameManager.chosenStageName === 'TableTop2Stage' || gameManager.chosenStageName === 'ReitzPondStage') {
    
        if (Player1.getdown()) {
                Player1.character.body.immovable = false;
            }
            else {
                game.physics.arcade.collide(Player1.character, miniPlatforms);
            }
            
            if (Player2.getdown()) {
                Player2.character.body.immovable = false;
            }
            else {
                game.physics.arcade.collide(Player2.character, miniPlatforms);
            }
        }

        game.physics.arcade.collide(Player1.character, ground);
        game.physics.arcade.collide(Player2.character, ground);

        game.physics.arcade.collide(Player1.character, platforms);
        game.physics.arcade.collide(Player2.character, platforms);

        //stop goomba stomp logic
        //console.log("Velocity is Player1.character.body.velocity.y");
        //console.log(Player1.character.body.velocity.y);
        //implement a terminal velocity
        if (Player1.character.body.velocity.y > 450) {
            Player1.character.body.velocity.y = 450;
        }

        if (Player2.character.body.velocity.y > 450) {
            Player2.character.body.velocity.y = 450;
        }
        //end of goomba stomp bug killer
        //if bug still persists, maybe turn off collisions once velocity > velocity limit?

        // logic for player to bump against then pass through other character
        if (game.physics.arcade.overlap(Player2.character, Player1.character)) {
            passtimer1v2 += 10;

            if (passtimer1v2 < 100) {

                Player1.character.body.velocity.y = 0;
                Player2.character.body.velocity.y = 0;
            }
            //game.physics.arcade.overlap(Player2.character, Player1.character);
            //game.physics.arcade.overlap(Player2.character, item1.type, item1.itemCollision(Player2), null, this);
        }
        else {
            passtimer1v2 = 0;
        }

        if (passtimer1v2 < 100) {
            game.physics.arcade.collide(Player1.character, Player2.character);
        }
        else {
            if (Player1.attacking) {
                game.physics.arcade.collide(Player1.character, Player2.character);
            }
            else if (Player2.attacking) {
                game.physics.arcade.collide(Player1.character, Player2.character);
            }
            else {
                passtimer1v2--;
            }
        }
        //console.log(passtimer1v2);    
        // end of logic for player to bump against then pass through other character

        //add physics for item (eventually just add items to a group and use collision detection for the group)
        game.physics.arcade.collide(item1.type, platforms, item1.onGround());

        if(gameManager.scenario === "GatorFight"){
            game.physics.arcade.collide(item2.type, platforms, item2.onGround());
            game.physics.arcade.collide(item3.type, platforms, item3.onGround());
            game.physics.arcade.collide(item4.type, platforms, item4.onGround());
            game.physics.arcade.collide(item5.type, platforms, item5.onGround());
        }

        if (multimanmode === true ) {
            game.physics.arcade.collide(Player3.character, platforms);
            
            if(passtimer1v2 < 100){
                game.physics.arcade.collide(Player1.character, Player3.character);
            }
        }
        //Player1.nespad.connectgamepad();
        //console.log(Player1.nespad.nescontroller.aButton);

        //console.log(Player1.nespad.testconnect);
        //console.log(Player1.nespad.nescontroller.getButton(Phaser.Gamepad.BUTTON_3));

        //using overlap to calculate the knockback when an item is thrown since we dont want the items trajectory to change
        //This is always colliding? even when i replace it with random stuff like player1.weapon1.bullets

        if (item1.user) {
            //console.log('item1.user.controlnum: '+ item1.user.controlnum);
            //console.log('item1.thrown: ' + item1.thrown);
            //console.log('item1.active: ' + item1.active);
        }

        //Item Collision, makes sure that the item you hold doesnt hit you when you throw it, but only hits the other person
        //Item must be active(can only hit you once), and thrown for the collision to go off
        /*if (item1.thrown && item1.getActive() && item1.getThrown()) {
            if (item1.previousUser.controlnum === Player1.controlnum && !Player2.respawnSwitch) //if the user is the the person colliding with the item(Player1)
            {   
                console.log("THROW!");
                game.physics.arcade.overlap(Player2.character, item1.type, item1.itemCollision(Player2), null, this);
            }
            else if (item1.previousUser.controlnum === Player2.controlnum && !Player1.respawnSwitch) //if the user is the the person colliding with the item(Player2)
            {
                console.log("THROW!");
                game.physics.arcade.overlap(Player1.character, item1.type, item1.itemCollision(Player1), null, this);
            }
        }*/
        playState.itemCheck(item1);

        playState.itemUpdate(item1, Player1);
        playState.itemUpdate(item1, Player2);

        if (gameManager.scenario === "GatorFight"){
            playState.itemCheck(item2);
            playState.itemCheck(item3);
            playState.itemCheck(item4);
            playState.itemCheck(item5);

            playState.itemUpdate(item2, Player1);
            playState.itemUpdate(item3, Player1);
            playState.itemUpdate(item4, Player1);
            playState.itemUpdate(item5, Player1);

            playState.itemUpdate(item2, Player2);
            playState.itemUpdate(item3, Player2);
            playState.itemUpdate(item4, Player2);
            playState.itemUpdate(item5, Player2);
        }



        //special logic for lab's items


        //hitbox collision for player 2, we pass the type of hit into the hit player function
        if (Player1.attacking) {
            /*game.physics.arcade.overlap(Player1.weapon1.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
            game.physics.arcade.overlap(Player1.weaponKick.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
            game.physics.arcade.overlap(Player1.weaponUppercut.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
            game.physics.arcade.overlap(Player1.jumpKick.bullets, Player2.character, this.hitPlayer2(Player1.attacking));*/
            game.physics.arcade.overlap(Player1.weapon1.bullets, Player2.character, this.hitPlayer12(Player2, Player1));
            game.physics.arcade.overlap(Player1.weaponKick.bullets, Player2.character, this.hitPlayer12(Player2, Player1));
            game.physics.arcade.overlap(Player1.weaponUppercut.bullets, Player2.character, this.hitPlayer12(Player2, Player1));
            game.physics.arcade.overlap(Player1.jumpKick.bullets, Player2.character, this.hitPlayer12(Player2, Player1));

            game.physics.arcade.overlap(Player1.weaponSwipeU, Player2.character, this.hitPlayer12(Player2, Player1));
            game.physics.arcade.overlap(Player1.weaponSwipeFD, Player2.character, this.hitPlayer12(Player2, Player1));
            game.physics.arcade.overlap(Player1.weaponSwipeFU, Player2.character, this.hitPlayer12(Player2, Player1));
            game.physics.arcade.overlap(Player1.weaponSwipeD, Player2.character, this.hitPlayer12(Player2, Player1));

            if(multimanmode === true){
                game.physics.arcade.overlap(Player1.weapon1.bullets, Player3.character, this.hitPlayer12(Player3, Player1));
                game.physics.arcade.overlap(Player1.weaponKick.bullets, Player3.character, this.hitPlayer12(Player3, Player1));
                game.physics.arcade.overlap(Player1.weaponUppercut.bullets, Player3.character, this.hitPlayer12(Player3, Player1));
                game.physics.arcade.overlap(Player1.jumpKick.bullets, Player3.character, this.hitPlayer12(Player3, Player1));
                
                game.physics.arcade.overlap(Player1.weaponSwipeU, Player3.character, this.hitPlayer12(Player3, Player1));
                game.physics.arcade.overlap(Player1.weaponSwipeFD, Player3.character, this.hitPlayer12(Player3, Player1));
                game.physics.arcade.overlap(Player1.weaponSwipeFU, Player3.character, this.hitPlayer12(Player3, Player1));
                game.physics.arcade.overlap(Player1.weaponSwipeD, Player3.character, this.hitPlayer12(Player3, Player1));
            }
        }
        if (Player2.attacking) {
            //hitbox collision for player 1, we pass the type of hit into the hit player function
            /*game.physics.arcade.overlap(Player2.weapon1.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
            game.physics.arcade.overlap(Player2.weaponKick.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
            game.physics.arcade.overlap(Player2.weaponUppercut.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
            game.physics.arcade.overlap(Player2.jumpKick.bullets, Player1.character, this.hitPlayer1(Player2.attacking));*/
            game.physics.arcade.overlap(Player2.weapon1.bullets, Player1.character, this.hitPlayer12(Player1, Player2));
            game.physics.arcade.overlap(Player2.weaponKick.bullets, Player1.character, this.hitPlayer12(Player1, Player2));
            game.physics.arcade.overlap(Player2.weaponUppercut.bullets, Player1.character, this.hitPlayer12(Player1, Player2));
            game.physics.arcade.overlap(Player2.jumpKick.bullets, Player1.character, this.hitPlayer12(Player1, Player2));

            game.physics.arcade.overlap(Player2.weaponSwipeU, Player1.character, this.hitPlayer12(Player1, Player2));
            game.physics.arcade.overlap(Player2.weaponSwipeFD, Player1.character, this.hitPlayer12(Player1, Player2));
            game.physics.arcade.overlap(Player2.weaponSwipeFU, Player1.character, this.hitPlayer12(Player1, Player2));
            game.physics.arcade.overlap(Player2.weaponSwipeD, Player1.character, this.hitPlayer12(Player1, Player2));
        }

        if (multimanmode === true) {            
            if (Player3.attacking) {
                //hitbox collision for player 1, we pass the type of hit into the hit player function
                game.physics.arcade.overlap(Player3.weapon1.bullets, Player1.character, this.hitPlayer12(Player1,Player3));
                game.physics.arcade.overlap(Player3.weaponKick.bullets, Player1.character, this.hitPlayer12(Player1,Player3));
                game.physics.arcade.overlap(Player3.weaponUppercut.bullets, Player1.character, this.hitPlayer12(Player1,Player3));
                game.physics.arcade.overlap(Player3.jumpKick.bullets, Player1.character, this.hitPlayer12(Player1,Player3));
               
                game.physics.arcade.overlap(Player3.weaponSwipeU, Player1.character, this.hitPlayer12(Player1, Player3));
                game.physics.arcade.overlap(Player3.weaponSwipeFD, Player1.character, this.hitPlayer12(Player1, Player3));
                game.physics.arcade.overlap(Player3.weaponSwipeFU, Player1.character, this.hitPlayer12(Player1, Player3));
                game.physics.arcade.overlap(Player3.weaponSwipeD, Player1.character, this.hitPlayer12(Player1, Player3));
            }
        }

        //Name tag align/follow
        nameText1.alignTo(Player1.character, Phaser.TOP, 16);
        nameText2.alignTo(Player2.character, Phaser.TOP, 16);

        //item align/follow
        if (item1.type != null) {
            if (item1.inAir) {
                item1.angle += 5;
            }
            else {
                item1.alignToTarget();
            }
        }

        if (controlOptionAI === -2) {
            this.AIplay(Player1, Player2, FrameTimer);
            //Multiman mode on so AI controls 2 additional fighters
            if (multimanmode === true) {
                this.AIplay(Player1, Player3, FrameTimer);
                Player3.updateInput();
                this.KO(Player3);
                this.respawnEvent(Player3);
                nameText3.alignTo(Player3.character, Phaser.TOP, 16);
            }
        }

        //console.log("echo");
        Player1.updateInput();
        Player2.updateInput();

        //console.log("echo");
        healthtext1.text = `DMG ${Math.ceil(Player1.health)} %`;
        healthtext2.text = `DMG ${Math.ceil(Player2.health)} %`;

        //livetext1.text = `Lives ${Player1.lives}`;
        //livetext2.text = `Lives ${Player2.lives}`;

        this.KO(Player1);
        this.KO(Player2);

        this.respawnEvent(Player1);
        this.respawnEvent(Player2);

        //If out of lives, end the game
        if (Player1.lives === 0) {
            if(gameManager.gameType === "Arcade") {
                gameManager.ScoreKeeper.updatePoint(0, 4, timer.duration);
            }
            
            if (multimanmode === true) {
                console.log("# of KOs in multiman mode:");
                console.log(multimenko);
            }
            
            this.checkArcadeWin();
            //music.stop();
            game.state.start('win');
        }
        if (Player2.lives === 0 && multimanmode === false) {
            if(gameManager.gameType === "Arcade") {{}
                gameManager.ScoreKeeper.updatePoint(0, 4, timer.duration);
            }
            this.checkArcadeWin();
            //music.stop();
            game.state.start('win');
        }
        
        if (multimanmode === true) {
            if(Player2.lives == 0 && Player3.lives == 0) {
                if(gameManager.gameType === "Arcade") {
                    gameManager.ScoreKeeper.updatePoint(0, 4, timer.duration);
                }
                this.checkArcadeWin();
                //music.stop();
                game.state.start('win');
            }
        }

        timerText.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
    },

    itemUpdate: function (helditem, targetFighter) {

        //If really freaking close to item, and if he isnt holding something, grab it!
        if (helditem.type != null) {
            if (helditem.inAir) {
                helditem.angle += 5;
            }
            else {
                helditem.alignToTarget();
            }
        }

        if (targetFighter.geta() && (helditem.xDistCheck(targetFighter.character) < 50) && (helditem.yDistCheck(targetFighter.character) < 100) && !(targetFighter.character.hasItem) && (helditem.user == null)) {
            console.log("Grab?");
            helditem.user = targetFighter;
            helditem.pickedUp = true;
            targetFighter.character.hasItem = true;
            //console.log("close to item");
        }

        //else if (targetFighter.character.hasItem && targetFighter.throwItem && helditem.user == targetFighter) //If he has an item, THROW IT!
        else if (targetFighter.character.hasItem && targetFighter.useItem && helditem.user == targetFighter) //If he has an item, USE IT!
            {
                /*helditem.throwItem(targetFighter);

                helditem.user = null;
                helditem.pickedUp = false;
                targetFighter.character.hasItem = false;
                targetFighter.throwItem = false;*/

                helditem.useItem(targetFighter);
                helditem.user = null;
                helditem.pickedUp = false;
                targetFighter.character.hasItem = false;
                targetFighter.useItem = false;

            }

        /*else if (targetFighter.character.hasItem && targetFighter.useItem) //If he has an item, USE IT!
            {
                helditem.useItem(targetFighter);
                helditem.user = null;
                helditem.pickedUp = false;
                targetFighter.character.hasItem = false;
                targetFighter.useItem = false;
            }*/
    },

    itemCheck: function (heldItem) {
        //Item Collision, makes sure that the item you hold doesnt hit you when you throw it, but only hits the other person
        //Item must be active(can only hit you once), and thrown for the collision to go off
        if (heldItem.thrown && heldItem.getActive() && heldItem.getThrown() && heldItem.previousUser != null) {
            if (heldItem.previousUser.controlnum === Player1.controlnum && !Player2.respawnSwitch) //if the user is the the person colliding with the item(Player1)
            {   
                console.log("THROW!");
                game.physics.arcade.overlap(Player2.character, heldItem.type, heldItem.itemCollision(Player2), null, this);
            }
            else if (heldItem.previousUser.controlnum === Player2.controlnum && !Player1.respawnSwitch) //if the user is the the person colliding with the item(Player2)
            {
                console.log("THROW!");
                game.physics.arcade.overlap(Player1.character, heldItem.type, heldItem.itemCollision(Player1), null, this);
            }
        }
    },

    //actually is the win function
    start: function () {
        //update time points, store time left
        if(gameManager.gameType === "Arcade") {
            gameManager.ScoreKeeper.updatePoint(0, 4, timer.duration);
        }
        this.checkArcadeWin();
        //console.log("Time Left: Start func?" + timer.duration)
        //music.stop();
        game.state.start('win');
    },

    //AI Logic and functions
    AIdistcheck: function (Target, AIFighter) {
        //Fighter.character.body.position.x < -50

        AIxdist = AIFighter.character.body.position.x - Target.character.body.position.x;
        AIydist = AIFighter.character.body.position.y - Target.character.body.position.y;
        if (AIxdist > 50) {
            AIFighter.character.body.velocity.x = -150;
            //controller2.right.isDown === true;
            //console.log("AI should be moving left");
        }
        else if (AIxdist < -50) {
            //controller2.left.isDown === true;
            AIFighter.character.body.velocity.x = 150;
            //controller2.right.isDown === true;
            console.log("AI should be moving right");
        }
        if (AIydist > 100) {
            console.log("jump?");
            AIFighter.character.body.velocity.y = -100;
        }
    },

    aiXPosCheck: function (Target, AIFighter){
        AIxdist = AIFighter.character.body.position.x - Target.character.body.position.x;
         
        return AIxdist;
    },

    aiYPosCheck: function (Target, AIFighter){
        AIydist = AIFighter.character.body.position.y - Target.character.body.position.y;
        
        return AIydist;
    },

    aiItemCheck: function (AIFighter, Items){
        if (AIFighter.character.hasItem === false){
            AIFighter.controller1.ypress = false;
            Items.forEach(element => {
                if(element.type != null){
                    xDist = AIFighter.character.body.position.x - element.type.body.x;
                    yDist = AIFighter.character.body.position.y - element.type.body.y;

                    if(Math.abs(xDist) < AIFighter.character.body.width && Math.abs(yDist) < AIFighter.character.body.height){
                        AIFighter.controller1.apress = true;
                    }
                    /*xDist = this.AIXPosCheck(element, AIFighter);
                    yDist = this.AIYPosCheck(element, AIFighter);*/
                }
            });
            AIFighter.controller1.xpress = false;
        }
    },

    defendMode: function (AIFighter, AIxdist, AIydist) {
        //defensive behavior mode
        if (AIxdist < 150 && AIxdist > 0 || AIxdist < -250) {

            //console.log("AI should be keeping right");
            AIFighter.controller1.leftpress = false;
            AIFighter.controller1.rightpress = true;
        }
        else if (AIxdist > -150 && AIxdist < 0 || AIxdist > 250) {

            //console.log("AI should be keeping left");
            AIFighter.controller1.leftpress = true;
            AIFighter.controller1.rightpress = false;
        }
        else {
            AIFighter.controller1.leftpress = false;
            AIFighter.controller1.rightpress = false;

            AIFighter.controller1.ypress = false;
        }
    },

    defendMode2: function (AIFighter, AIxdist, AIydist) { 
        //defensive behavior mode2, try to stay close to center of stage
        if (AIFighter.character.body.position.x < game.world.width * 0.35) {

            AIFighter.controller1.leftpress = false;
            AIFighter.controller1.rightpress = true;
        }
        else if (AIFighter.character.body.position.x > game.world.width * 0.65) {

            AIFighter.controller1.leftpress = true;
            AIFighter.controller1.rightpress = false;
        }
        else {
            AIFighter.controller1.leftpress = false;
            AIFighter.controller1.rightpress = false;

            AIFighter.controller1.ypress = false;
        }
    },

    AIUseItem: function (AIFighter) {
        if(AIFighter.character.hasItem === true ){
            AIFighter.controller1.xpress = true;
        }
    },

    AIplay: function (Target, AIFighter, FrameTimer) {
        if(FrameTimer === FrameTarget) {
            this.AIFighter = AIFighter;
            this.Target = Target;

            this.AIUseItem(AIFighter);

            this.aiItemCheck(AIFighter, Items);

            

            function attackMode(Fighter, AIxdist, AIydist) 
            {
                //aggressive ai behavior mode

                if (AIxdist > AIFighter.character.body.width) {
                    Fighter.controller1.leftpress = true;
                    Fighter.controller1.rightpress = false;
                }
                else if (AIxdist < -AIFighter.character.body.width * -1) {
                    Fighter.controller1.leftpress = false;
                    Fighter.controller1.rightpress = true;
                }
                else {
                    Fighter.controller1.leftpress = false;
                    Fighter.controller1.rightpress = false;
                }
            }

            AIxdist = AIFighter.character.body.position.x - Target.character.body.position.x;
            AIydist = AIFighter.character.body.position.y - Target.character.body.position.y;

            //if AIxdist is > 0 then AIFighter is on right, fighter 1 on left
            //if AIxdist is < 0 then AIFighter is on left, fighter 1 on right

            //initialize all buttons to false
            AIFighter.leftpress = false;
            AIFighter.rightpress = false;
            AIFighter.uppress = false;
            AIFighter.downpress = false;

            AIFighter.apress = false;//regular attack button
            AIFighter.bpress = false;//special button
            AIFighter.xpress = false;//jump button
            AIFighter.ypress = false;//block button

            //random number generator between 1 and 10
            react = Math.floor((Math.random() * 10) + 1);
            if (react == 1) {
                console.log("Behavior switch!");

                AIFighter.AImode = AIFighter.AImode * -1;

                if(AIFighter.hangingState === "Hanging" && react == 10){
                    AIFighter.controller1.ypress = true;
                }
            }
            if (react == 10) {
                AIFighter.controller1.leftpress = false;
                AIFighter.controller1.rightpress = false;
                AIFighter.controller1.uppress = false;
                AIFighter.controller1.downpress = false;

                AIFighter.controller1.apress = false;//regular attack button
                AIFighter.controller1.bpress = false;//special button
                AIFighter.controller1.xpress = false;//jump button
                AIFighter.controller1.ypress = false;//block button
                console.log("reacting to nothing");
                return;
            }
            
            //random number to determine if AI should use a special or normal attack
            attack = Math.floor((Math.random() * 10) + 1);
            //normal attack logic
            
            if(attack > 4){
                //if (AIxdist < 60 && AIxdist > 0 && AIydist < 10 && AIydist > -10) {
                if (AIxdist < AIFighter.character.body.width && AIxdist > 0 && AIydist < AIFighter.character.body.height && AIydist > AIFighter.character.body.height * -1) {
                    AIFighter.controller1.apress = true;
                }
                else if (AIxdist > AIFighter.character.body.width*-1 && AIxdist < 0 && AIydist < AIFighter.character.body.height && AIydist > AIFighter.character.body.height * -1) {
                    AIFighter.controller1.apress = true;
                }
                //Juggle AKA Up swipe attack
                else if ((AIydist < AIFighter.character.body.height && AIydist > 0) && (AIxdist < AIFighter.character.body.width && AIxdist > AIFighter.character.body.width * -1)) {
                //else if ((AIydist < 15 && AIydist > 0) && (AIxdist < 20 && AIxdist > -20)) {
                //AIFighter.character.body.width
                    AIFighter.controller1.uppress = true;
                    AIFighter.controller1.apress = true;
                }
                else {
                    AIFighter.controller1.apress = false;
                }
            }
            else{
                //special attack logic
                AIFighter.controller1.bpress = true;
            }
            //jump logic
            //170
            if(AIydist > AIFighter.character.body.height){
                    AIFighter.controller1.ypress = true;
            }
            else if(AIydist < AIFighter.character.body.height * -1){
                    AIFighter.controller1.downpress = true;
            }
            else{
                    AIFighter.controller1.ypress = false;
                    AIFighter.controller1.downpress = false;
            }
            

            //General movement/walk behavior

            if (AIFighter.AImode === 1) {
                //THE MOVE SCRIPTS
                // if the distance between the AI and the user is greater than 50 pixels, then the AI should move left
                if (AIxdist > AIFighter.character.body.width) {
                    AIFighter.controller1.leftpress = true;
                    AIFighter.controller1.rightpress = false;
                }
                // if the distance between the AI and the user is less than -50 pixels, then the AI should move right
                else if (AIxdist < AIFighter.character.body.width * -1) {
                    AIFighter.controller1.leftpress = false;
                    AIFighter.controller1.rightpress = true;
                }
                else {
                    AIFighter.controller1.leftpress = false;
                    AIFighter.controller1.rightpress = false;
                    AIFighter.controller1.ypress = false;
                }
            }
            else if (AIFighter.AImode === -10) {
                //defensive behavior1 (AI tries to stay away from User)
                //defendMode(AIFighter, AIxdist, AIydist);

                if (AIxdist < AIFighter.character.body.width * 2 && AIxdist > 0 || AIxdist < AIFighter.character.body.width * -2) {
                    AIFighter.controller1.leftpress = false;
                    AIFighter.controller1.rightpress = true;
                }
                else if (AIxdist > AIFighter.character.body.width * -2 && AIxdist < 0 || AIxdist > AIFighter.character.body.width * 2) {
                    AIFighter.controller1.leftpress = true;
                    AIFighter.controller1.rightpress = false;
                }
                else {
                    AIFighter.controller1.leftpress = false;
                    AIFighter.controller1.rightpress = false;
                    AIFighter.controller1.ypress = false;
                }
            }
            else if (AIFighter.AImode === -1) {
                //defensive behavior2 (AI tries to stay in center of stage)
                //defendMode(AIFighter, AIxdist, AIydist);
//game.world.width * 0.3
                if (AIFighter.character.body.position.x < game.world.width*0.35) {
                    //300
                    AIFighter.controller1.leftpress = false;
                    AIFighter.controller1.rightpress = true;
                }
                else if (AIFighter.character.body.position.x > game.world.width*0.65) {
                    //400
                    AIFighter.controller1.leftpress = true;
                    AIFighter.controller1.rightpress = false;
                }
                else {
                    AIFighter.controller1.leftpress = false;
                    AIFighter.controller1.rightpress = false;
                    AIFighter.controller1.ypress = false;
                }
            }

            //avoid going out of bounds, this logic is always checked 
            if (AIFighter.character.body.position.y > ground.body.y) {
                //Avoid left bound
                AIFighter.controller1.rightpress = true;
                AIFighter.controller1.ypress = true;
            }
            if (AIFighter.character.body.position.x < game.world.width*0.15) {
                //150
                //Avoid left bound
                AIFighter.controller1.rightpress = true;
                //AIFighter.controller1.ypress = true;
            }
            else if (AIFighter.character.body.position.x > game.world.width*0.8) {
                //820
                //Avoid right bound
                AIFighter.controller1.leftpress = true;
                //AIFighter.controller1.ypress = true;
            }
            else {
                //temporary fix need to remove later
                //AIFighter.controller1.leftpress = false;
                //AIFighter.controller1.rightpress = false;
            }
        }
    },

    checkArcadeWin: function () {
        if(gameManager.gameType === "Arcade") {
            if(Player1.lives > 0 && timer.duration > 0){
                gameManager.matchOutcome = "Win"
            }
            else{
                gameManager.matchOutcome = "Loss"
            }
        }
    },

    // function to control the moving mob hazard in marston stage
    crowdupdate: function () {
        // modify x direction of mob
        if (mob.crowdsprite.body.position.x < 50) {
            if (mob.crowdsprite.scale.x > 0) {
                mob.crowdsprite.scale.x *= -1;
                mob.people.trackSprite(mob.crowdsprite, 10, -30, true);
                mob.people.bulletSpeed = 0;
            }
            mob.crowdsprite.body.velocity.x = 200;
        }
        else if (mob.crowdsprite.body.position.x > 600) {
            if (mob.crowdsprite.scale.x < 0) {
                mob.crowdsprite.scale.x *= -1;
                mob.people.trackSprite(mob.crowdsprite, 10, 30, true);
                mob.people.bulletSpeed = 0;
            }
            mob.crowdsprite.body.velocity.x = -200;
        }

        // modify y direction of mob
        if (mob.crowdsprite.body.position.y < 100) {
            mob.crowdsprite.body.velocity.y = 200;
        }
        else if (mob.crowdsprite.body.position.y > 500) {
            mob.crowdsprite.body.velocity.y = -200;
        }
        mob.people.fire();
    }
};