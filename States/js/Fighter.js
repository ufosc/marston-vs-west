class Fighter {
    constructor(character, health, lives, startx, starty, controlnum) {


        this.character = game.add.sprite(startx, starty, character);//player character variable to access sprite from phaser and all its properties character variable is name of spritesheet to use
        this.health = health;//player start health
        this.lives = lives;
        this.attacking = false; //Controls when to register active hit frames
        this.deltDamage = false;
        this.attack = '';
        this.airTime = 0;
        this.deathBlast = game.add.sprite(game.world.width * 0.2, game.world.width * 0.05, "deathBlast");
        this.deathBlast.visible = false;

        this.combo = 0;
        this.comboclock = 0;

        switch (character) {
            case 'dude':
                this.fighterStyle = {
                    font: "bold 32px Skranji", fill: '#0076b9', boundsAlignH: "left", boundsAlignV: "top"
                };
                this.damageBox = 'blueDamageBox';
                break;
            case 'chick':
                this.fighterStyle = {
                    font: "bold 32px Skranji", fill: "#ff7000", boundsAlignH: "left", boundsAlignV: "top"
                };
                this.damageBox = 'orangeDamageBox';
                break;
            case 'dude':
                this.fighterStyle = {
                    font: "bold 32px Skranji", fill: "#0076b9", boundsAlignH: "left", boundsAlignV: "top"
                };
                this.damageBox = 'blueDamageBox';
                break;
            case 'chick':
                this.fighterStyle = {
                    font: "bold 32px Skranji", fill: "#ff7000", boundsAlignH: "left", boundsAlignV: "top"
                };
                this.damageBox = 'orangeDamageBox';
                break;

        }

        //Allows an animation event to take place
        this.inputLock = false;
        //Cooldown for dash movement
        this.dashCD = 0;
        //Cooldown for warlock kick
        this.warlockCD = 0;
        //Cooldown for uppercut
        this.uppercutCD = 0;
        //cooldown for all basic moves
        this.basicCD = 0;
        //cooldown for air dodging
        this.airDodgeCD = 0;

        //turns on and off the auto reset of zero x velocity when the player is standing
        this.xZero = true;

        //Respawn Animation Activator Switch
        this.respawnSwitch = false;
        //m is the respawn animation counter
        this.m = 0;
        //Invincibility boolean
        this.invincible = false;

        this.startx = startx;
        this.starty = starty;

        this.character.hasItem = false;

        //Cooldown for attacks
        this.hitCD = 0;

        //Switch for when an attack is on CD
        this.hitSwitchPunch = false;
        this.hitSwitchKick = false;


        //shielding is the boolean if the shield is up or not
        this.shielding = false;

        //hitVelocity determines the knockback
        this.hitVelocity = 0;
        //Hit stun counter
        this.stunCounter = 0;

        this.controlnum = controlnum;
        console.log("controlnum: " + this.controlnum)
        this.state = 0; //player state for state machine?

        this.jumps = 0;

        this.character.anchor.setTo(0.5, 0);

        this.AImode = 1;
        this.reaction = 0;

        //  We need to enable physics on the player
        game.physics.arcade.enable(this.character);

        //  Player physics properties. Give the little guy a slight bounce.
        this.character.body.bounce.y = 0;//0.2;
        this.character.body.gravity.y = 650;
        this.character.body.collideWorldBounds = false;


        this.character.body.setSize(30, 70, 10, 0)
        this.character.scale.x = 1.25;
        this.character.scale.y = 1.25;

        //Player animations

        this.aniRight = this.character.animations.add('right', [3, 4, 5, 6, 7], 10, true);
        this.aniRight.onComplete.add(this.walkEnd, this);

        //idle animation
        this.aniIdle = this.character.animations.add('idle', [6], 5, true);

        //jump animation
        this.aniJump = this.character.animations.add('jump', [13, 14], 5, false); //need to adjust animation speed
        this.aniJump.onStart.add(this.jumpStart, this);
        this.aniJump.onComplete.add(this.jumpEnd, this);
        //shield animation
        this.aniShield = this.character.animations.add('shield', [10], 5, false);
        this.aniShield.onComplete.add(this.shieldEnd, this);

        //punch animations
        this.aniPunch = this.character.animations.add('punch', [8, 7, 6], 10, false);
        this.aniPunch.onStart.add(this.punchStart, this);
        this.aniPunch.onComplete.add(this.punchEnd, this);

        //kick
        this.aniKick = this.character.animations.add('kick', [12, 12, 12, 11, 6], 10, false);
        this.aniKick.onStart.add(this.kickStart, this);
        this.aniKick.onComplete.add(this.kickEnd, this);

        //dash
        this.aniDash = this.character.animations.add('dash', [5], 15, false);
        this.aniDash.onStart.add(this.dashStart, this);
        this.aniDash.onComplete.add(this.dashEnd, this);

        //Tatsumaki (i am weeb)
        this.aniJumpKick = this.character.animations.add('jumpKick', [14, 13, 12, 12, 12], 15, false);
        this.aniJumpKick.onStart.add(this.jumpKickStart, this);
        this.aniJumpKick.onComplete.add(this.jumpKickEnd, this);

        //Uppercut (change 16 later for a better uppercut frame)
        this.aniUppercut = this.character.animations.add('uppercut', [16, 16, 14, 13], 10, false);
        this.aniUppercut.onStart.add(this.uppercutStart, this);
        this.aniUppercut.onComplete.add(this.uppercutEnd, this);

        //Slow warlock punch
        this.aniWarlock = this.character.animations.add('warlock', [13, 13, 11, 12], 7, false);
        this.aniWarlock.onStart.add(this.warlockStart, this);
        this.aniWarlock.onComplete.add(this.warlockEnd, this);

        //player got hit animation
        this.aniKo = this.character.animations.add('ko', [12], 5, false);
        this.aniKo.onComplete.add(this.koEnd, this);

        //Player air swipe forward/neutral
        this.aniAirF = this.character.animations.add('airforward', [24, 24, 25, 25, 25], 7, false);
        this.aniAirF.onStart.add(this.airforwardStart, this);
        this.aniAirF.onComplete.add(this.airforwardEnd, this);

        //Player air swipe down
        this.aniAirD = this.character.animations.add('airdown', [28, 28, 29, 30], 7, false);
        this.aniAirD.onStart.add(this.airdownStart, this);
        this.aniAirD.onComplete.add(this.airdownEnd, this);

        //Player air swipe neutral
        this.aniAirN = this.character.animations.add('airneutral', [31, 31, 32, 32], 7, false);
        this.aniAirN.onStart.add(this.airneutralStart, this);
        this.aniAirN.onComplete.add(this.airneutralEnd, this);

        //Player juggle
        this.aniJuggle = this.character.animations.add('juggle', [26, 21, 22, 23], 7, false);
        this.aniJuggle.onStart.add(this.JuggleStart, this);
        this.aniJuggle.onComplete.add(this.JuggleEnd, this);

        //Player Air Dodge
        this.aniAirDodge = this.character.animations.add('airDodge', [6], 15, false);
        this.aniAirDodge.onStart.add(this.airDodgeStart, this);
        this.aniAirDodge.onComplete.add(this.airDodgeEnd, this);




        //Player air swipe down



        //this.controller1 = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'punch': Phaser.KeyCode.T, 'kick': Phaser.KeyCode.R});

        this.nespad = new nespad(controlnum);

        if (controlnum == 1) {
            //controller1 = new Object;
            this.controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.E, 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'basic': Phaser.KeyCode.T, 'special': Phaser.KeyCode.R, 'shield': Phaser.KeyCode.Y });
        }
        else if (controlnum == 2) {
            //controller1 = new Object;
            this.controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.I, 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT, 'basic': Phaser.KeyCode.P, 'special': Phaser.KeyCode.O, 'shield': Phaser.KeyCode.OPEN_BRACKET });
        }
        else if (controlnum == -1) {
            this.controller1 = new vpad(-1);
        }
        else if (controlnum == -2) {
            this.controller1 = new vpad(-2);
        }

        this.weapon1 = game.add.weapon(1, 'slash');
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon1.bulletLifespan = 50; //50
        this.weapon1.bulletSpeed = 0; //0
        this.weapon1.fireRate = 100;
        this.weapon1.trackSprite(this.character, 30, 20, true);

        this.weaponKick = game.add.weapon(1, 'slash');
        this.weaponKick.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weaponKick.bulletLifespan = 50; //50
        this.weaponKick.bulletSpeed = 0; //0
        this.weaponKick.fireRate = 100;
        this.weaponKick.trackSprite(this.character, 50, 50, true);

        this.weaponUppercut = game.add.weapon(1, 'slash');
        this.weaponUppercut.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weaponUppercut.bulletLifespan = 50; //50
        this.weaponUppercut.bulletSpeed = 0; //0
        this.weaponUppercut.fireRate = 100;
        this.weaponUppercut.trackSprite(this.character, 30, 10, true);

        //Weapon used for jump kick
        this.jumpKick = game.add.weapon(1, 'slash');
        this.jumpKick.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.jumpKick.bulletLifespan = 300; //50
        this.jumpKick.bulletSpeed = 150; //0
        this.jumpKick.fireRate = 100;
        this.jumpKick.trackSprite(this.character, 50, 50, true);

        //used to create the trail effect for knockback
        this.dustTrail = game.add.weapon(20, 'dust');
        this.dustTrail.alpha = .5;
        this.dustTrail.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.dustTrail.bulletLifespan = 500; //50
        this.dustTrail.bulletSpeed = 0; //0
        this.dustTrail.fireRate = 200;
        this.dustTrail.trackSprite(this.character, 0, -50, true);

        this.stocks = game.add.group();
        //Stocks will now match up to character selected
        for (var g = lives - 1; g > -1; g--) {

            if (controlnum == -1 || controlnum == 1) //For the vpad
            {
                if (charName1 == 'dude') {
                    //sets up the cell for the damage icon and stocks
                    var damageBox1 = game.add.sprite(0, game.world.game.world.height - 75, this.damageBox);
                    damageBox1.scale.setTo(5.5, 2.2);
                    var stock = this.stocks.create((30) + (90 * g / lives), game.world.height - 25, 'blueStock');
                    stock.anchor.setTo(.5, .5);
                }
                else if (charName1 == 'chick') {
                    //sets up the cell for the damage icon and stocks
                    var damageBox1 = game.add.sprite(0, game.world.game.world.height - 75, this.damageBox);
                    damageBox1.scale.setTo(5.5, 2.2);
                    var stock = this.stocks.create((30) + (90 * g / lives), game.world.height - 25, 'orangeStock');
                    stock.anchor.setTo(.5, .5);
                }
            }

        }
        for (var h = 0; h < lives; h++) {
            if (controlnum == 2 || controlnum == -2) {
                if (charName2 == 'dude') //dude is blue, chick is orange
                {
                    //sets up the cell for the damage icon and stocks
                    var damageBox2 = game.add.sprite(650, game.world.game.world.height - 75, this.damageBox);
                    damageBox2.scale.setTo(5.5, 2.2);
                    var stock = this.stocks.create((game.world.width * .85) + (90 * h / lives), game.world.height - 25, 'blueStock');
                    stock.anchor.setTo(.5, .5);
                }
                else if (charName2 == 'chick') {
                    //sets up the cell for the damage icon and stocks
                    var damageBox2 = game.add.sprite(650, game.world.game.world.height - 75, this.damageBox);
                    damageBox2.scale.setTo(5.5, 2.2);
                    var stock = this.stocks.create((game.world.width * .85) + (90 * h / lives), game.world.height - 25, 'orangeStock');
                    stock.anchor.setTo(.5, .5);
                }

            }

        }
        console.log("fighter made");
        //return this;
    }

    //Method to check whether or not fighter is currently trying to execute a combo
    combocheck() {
        if (this.combo > 0 && this.comboclock > 0) {
            this.comboclock--;
        }
        else if (this.comboclock == 0) {
            this.combo = 0;
        }
    }

    getleft() {
        if (this.testconnect == true) {
            if (nescontroller._axes[1] == -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.leftpress && this.controlnum == -1) {
                this.controller1.buttonleft.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttonleft.tint = 0xffffff;
            }
            return this.controller1.leftpress;
        }
        else {
            return this.controller1.left.isDown;
        }

    }
    getright() {
        if (this.testconnect == true) {
            if (nescontroller._axes[1] == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.rightpress && this.controlnum == -1) {
                this.controller1.buttonright.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttonright.tint = 0xffffff;
            }
            return this.controller1.rightpress;
        }
        else {
            return this.controller1.right.isDown;
        }

    }
    getup() {
        if (this.testconnect == true) {
            if (nescontroller._axes[5] == -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.uppress && this.controlnum == -1) {
                this.controller1.buttonup.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttonup.tint = 0xffffff;
            }
            return this.controller1.uppress;
        }
        else {
            return this.controller1.up.isDown;
        }

    }
    getdown() {
        if (this.testconnect == true) {
            if (nescontroller._axes[5] == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.downpress && this.controlnum == -1) {
                this.controller1.buttondown.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttondown.tint = 0xffffff;
            }
            return this.controller1.downpress;
        }
        else {
            return this.controller1.down.isDown;
        }

    }
    geta() {
        if (this.testconnect == true) {
            return this.nespad.nessaButton;
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.apress && this.controlnum == -1) {
                this.controller1.buttona.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttona.tint = 0xffffff;
            }
            return this.controller1.apress;
        }
        else {
            return this.controller1.basic.isDown;
        }

    }
    getb() {
        if (this.testconnect == true) {
            return this.nespad.nesbButton;
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.bpress && this.controlnum == -1) {
                this.controller1.buttonb.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttonb.tint = 0xffffff;
            }
            return this.controller1.bpress;
        }
        else {
            return this.controller1.special.isDown;
        }

    }
    getx() {
        if (this.testconnect == true) {
            return this.nespad.nesxButton;
        }
        else if (this.controlnum < 0) {
            //logic to change tint of button depending on whether it is pressed down or not for mobile version
            if (this.controller1.xpress && this.controlnum == -1) {
                this.controller1.buttonx.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttonx.tint = 0xffffff;
            }
            return this.controller1.xpress;
        }
        else {
            return this.controller1.shield.isDown;
        }
    }
    gety() {
        if (this.testconnect == true) {
            return this.nespad.nesyButton;
        }
        else if (this.controlnum < 0) {
            if (this.controller1.ypress && this.controlnum == -1) {
                this.controller1.buttony.tint = 0;
            }
            else if (this.controlnum == -1) {
                this.controller1.buttony.tint = 0xffffff;
            }
            return this.controller1.ypress;
        }
        else {
            return this.controller1.jump.isDown;
        }

    }

    punchStart() {
        console.log("Punch start");
        if (this.character.scale.x < 0) //If facing left, flip the angle of the hitbox
        {
            this.weapon1.bulletAngleOffset = 40;
        }
        else {
            this.weapon1.bulletAngleOffset = -40;
        }
        this.attack = 'punch';
        this.weapon1.fire();
        this.attacking = true;
        this.inputLock = true;
    }
    punchEnd() {
        console.log("Punch end");
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.basicCD = 15;
    }
    airforwardStart() {
        console.log('air forward start');
        if (this.character.scale.x < 0) //If facing left, flip the angle of the hitbox
        {
            this.weapon1.bulletAngleOffset = 40;
        }
        else {
            this.weapon1.bulletAngleOffset = -40;
        }
        this.attack = 'airforward';
        this.weapon1.fire();
        this.attacking = true;
        this.inputLock = true;
    }
    airforwardEnd() {
        console.log("air forward end");
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.basicCD = 15;
        this.aniIdle.play(10, false);
    }
    airdownStart() {
        console.log('airdown start');
        this.attack = 'airdown';
        this.weaponUppercut.fire();
        this.attacking = true;
        this.inputLock = true;
    }
    airdownEnd() {
        console.log("air forward end");
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.basicCD = 15;
        this.aniIdle.play(10, false);
    }
    airneutralStart() {
        console.log('airneutral start');
        this.attack = 'airneutral';
        this.weaponUppercut.fire();
        this.attacking = true;
        this.inputLock = true;
    }
    airneutralEnd() {
        console.log("air neutral end");
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.basicCD = 15;
        this.aniIdle.play(10, false);
    }
    JuggleStart() {
        this.attack = 'juggle';
        this.weaponUppercut.fire();
        this.attacking = true;
        this.inputLock = true;
    }
    JuggleEnd() {
        console.log("Juggle end");
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.basicCD = 15;
        this.aniIdle.play(10, false);
    }
    kickStart() {
        console.log("Kick start");
        this.attacking = true;
        this.attack = 'kick';
        this.weaponKick.fire();
        this.inputLock = true;
    }
    kickEnd() {
        console.log("kick end");
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.basicCD = 25;
    }
    jumpStart() {
        this.character.body.velocity.y = -350 + this.jumpSpeed;
        jumpSound.play();

        this.shielding = false;
        this.character.animations.play('jump');
    }
    jumpEnd() {
        this.aniIdle.play(10, false);
    }
    koEnd() {
        this.aniIdle.play(10, false);
        this.inputLock = false;
    }
    walkEnd() {
        //this.aniIdle.play(10, false);
    }
    dashStart() {
        this.character.alpha = 0.5;
        let direction;
        this.xZero = false;
        this.invincible = true;
        //this.character.body.velocity.x = 500 * direction;
        this.character.body.velocity.x = 500 * this.character.scale.x;
        //this.character.body.position.x += direction * 100;
        this.inputLock = true;
    }
    dashEnd() {
        this.aniIdle.play(10, false);
        this.invincible = false;
        this.character.alpha = 1;
        this.inputLock = false;
        this.xZero = true;
        this.dashCD = 60;
    }
    jumpKickTimer() {
        if (this.attacking) {
            this.jumpKick.fire();
            this.character.body.velocity.x = 150 * this.character.scale.x;
            this.character.body.velocity.y = -100;
        }
        else {
            this.xZero = true;
            this.aniIdle.play(10, false);
        }

    }
    jumpKickTimer2() {
        this.xZero = true;
    }
    jumpKickStart() {
        this.attacking = true;
        this.attack = 'jumpKick';
        this.inputLock = true;
        this.xZero = false;
        game.time.events.add(Phaser.Timer.SECOND * .3, this.jumpKickTimer, this);
    }
    jumpKickEnd() {
        this.aniIdle.play(10, false);
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        game.time.events.add(Phaser.Timer.SECOND * .05, this.jumpKickTimer2, this);
        this.attack = '';
    }
    uppercutStart() {
        if (this.character.scale.x < 0) //If facing left, flip the angle of the hitbox
        {
            this.weaponUppercut.bulletAngleOffset = 40;
        }
        else {
            this.weaponUppercut.bulletAngleOffset = -40;
        }
        this.character.body.velocity.y = 0;
        this.character.body.velocity.x = 50 * this.character.scale.x;
        this.character.body.velocity.y -= 400;
        this.attacking = true;
        this.attack = 'uppercut';
        this.weaponUppercut.fire();
        this.inputLock = true;
    }
    uppercutEnd() {
        this.aniIdle.play(10, false);
        this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        this.attack = '';
        this.uppercutCD = 60;
    }
    warlockTimer() {
        console.log("hi");
        if (this.attacking) {
            this.weaponKick.fire();
            this.character.body.moves = true;
            this.character.body.velocity.x = 5 * this.character.scale.x;
        }
        else {
            this.xZero = true;
            this.character.body.moves = true;
            this.aniIdle.play(10, false);
        }

    }
    warlockStart() {
        this.xZero = false;
        this.inputLock = true;
        this.attacking = true;
        if (this.character.body.touching.down) {
            this.character.body.moves = false;
        }
        this.attack = 'warlock';
        this.character.body.velocity.x = 5 * this.character.scale.x;
        game.time.events.add(Phaser.Timer.SECOND * 1.15, this.warlockTimer, this);
    }

    warlockEnd() {
        //this.character.body.position.x += 200 * this.character.scale.x;
        //this.weaponKick.fire();
        this.aniIdle.play(10, false);
        this.attacking = false;
        this.character.body.moves = true;
        this.deltDamage = false;
        this.attack = '';
        this.inputLock = false;
        this.warlockCD = 30;
        this.xZero = true;
    }
    shieldEnd() {
        this.aniIdle.play(10, false);
    }

    airDodgeTimer() {
        //Timer till invicibility wears off for air dodge
        this.invincible = false;
    }

    airDodgeStart() {
        this.character.alpha = 0.5;
        this.invincible = true;
        this.xZero = false;
        if (this.controller1.left.isDown || this.controller1.right.isDown) {
            this.character.body.velocity.y = 0;
            this.character.body.velocity.x = 200 * this.character.scale.x;
        }
        if (this.controller1.up.isDown) {
            this.character.body.velocity.y = 0;
            this.character.body.velocity.y = -250;
        }
        else if (this.controller1.down.isDown) {
            this.character.body.velocity.y = 0;
            this.character.body.velocity.y = 150;
        }
        this.inputLock = true;
        game.time.events.add(Phaser.Timer.SECOND * 1.25, this.airDodgeTimer, this);

    }

    airDodgeEnd() {
        this.aniIdle.play(10, false);
        //this.character.body.velocity.x = (this.character.body.velocity.x) / 1.5;
        this.character.alpha = 1;
        this.airDodgeCD = 60;
        this.xZero = true;
        this.inputLock = false;
    }


    updateInput() {
        //Cooldown for attacks
        if (this.dashCD != 0) {
            this.dashCD -= 1;
        }
        if (this.uppercutCD != 0) {
            this.uppercutCD -= 1;
        }
        if (this.warlockCD != 0) {
            this.warlockCD -= 1;
        }
        if (this.basicCD != 0) {
            this.basicCD -= 1;
        }
        if (this.airDodgeCD != 0) {
            this.airDodgeCD -= 1;
        }
        //Cooldown for hit stun
        if (this.stunCounter != 0) {
            this.stunCounter -= 1;
        }
        else {
            this.character.tint = 0xffffff;
        }
        //update function to decrease/increase the hit velocity based on the original direction of the punch. The natural slowing down of hit velocity
        if (this.hitVelocity < 0) {
            this.hitVelocity += 1;
        }
        else if (this.hitVelocity > 0) {
            this.hitVelocity -= 1;
        }
        else {
            this.hitVelocity = 0;
        }

        //control logic for real keyboard
        //else if(this.controlnum > 0){   <- Change to this when controller above is put back in
        if (this.controlnum > -10) {
            //console.log("inside real key check");
            //console.log(this.comboclock);
            //Shield logic
            if (this.character.body.touching.down) //prevents jumping when in the air
            {
                this.airTime = 0;
            }
            else if (this.airTime <= 5) {
                this.airTime++;
            }

            if (this.getx() && this.stunCounter == 0 && this.hitVelocity == 0 && !this.inputLock) {
                //If statement that decides if the character will perform a shield on the ground or else it the air dodge animation will be played
                if (this.character.body.touching.down) {
                    this.character.body.velocity.x = 0;
                    this.character.animations.play('shield');
                    this.shielding = true;
                    if (this.character.hasItem) //If he has an item, THROW IT!
                    {
                        item1.throwItem(this);

                        item1.user = null;
                        item1.pickedUp = false;
                        this.character.hasItem = false;
                    }
                }
                else {
                    if (this.airDodgeCD == 0) {
                        this.aniAirDodge.play(4, false);
                        this.shielding = true;
                    }

                }

            }


            //air forawrd swipe (air launcher)
            else if (this.geta() && this.character.body.touching.down == false && (this.getleft() || this.getright()) && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                this.aniAirF.play(10, false);

                //this.hitCD = 30;
                this.shielding = false;
                this.hitSwitchPunch = true;
            }

            // air down attack, spike kick sweep
            else if (this.geta() && this.character.body.touching.down == false && this.getdown() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                this.aniAirD.play(10, false);

                //this.hitCD = 30;
                this.shielding = false;
                this.hitSwitchPunch = true;
            }


            //juggle move aka up normal attack, can be done in air and on ground
            else if (this.geta() && (this.getup()) && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                this.aniJuggle.play(10, false);

                //this.hitCD = 30;
                this.shielding = false;
                this.hitSwitchPunch = true;
            }

            //air neutral attack logic (air spike)
            else if (this.geta() && this.character.body.touching.down == false && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                this.aniAirN.play(10, false);

                //this.hitCD = 30;
                this.shielding = false;
                this.hitSwitchPunch = true;
            }



            //punch logic
            //else if ( this.geta() && (this.getright() || this.getleft()) && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0)
            else if (this.geta() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                //console.log("test**************************");
                this.combo++;
                //console.log("Increased comboclock?");
                //console.log(this.combo);
                //console.log(this.comboclock);
                this.comboclock = 55;

                if (this.character.hasItem) //If he has an item, USE IT!
                {
                    item1.useItem(this);
                    item1.user = null;
                    item1.pickedUp = false;
                    this.character.hasItem = false;
                }


                //If really freaking close to item, and if he isnt holding something, use it!
                if ((item1.xDistCheck(this.character) < 50) && (item1.yDistCheck(this.character) < 100) && !(this.character.hasItem) && (item1.user == null)) {
                    item1.user = this;
                    item1.pickedUp = true;
                    this.character.hasItem = true;
                    //console.log("close to item");
                }


                if (this.combo == 1) {
                    //logic to change direction facing
                    if (this.character.scale.x < 0) {
                        this.character.body.velocity.x = -250 + this.moveSpeed;
                    }
                    else {
                        this.character.body.velocity.x = 250 + this.moveSpeed;
                    }
                    this.aniPunch.play(10, false);

                    //this.hitCD = 30;
                    this.shielding = false;
                    this.hitSwitchPunch = true;
                    //Causes Player health to increase
                    //this.health += 1;
                }
                else if (this.combo == 2) {
                    //console.log("combo of 2 kick?");
                    //logic to change direction facing
                    if (this.character.scale.x < 0) {
                        this.character.body.velocity.x = -350 - this.moveSpeed;
                    }
                    else {
                        this.character.body.velocity.x = 350 + this.moveSpeed;
                    }
                    this.aniKick.play(10, false);
                    //this.hitCD = 60;
                    //this.weapon1.fire();
                    this.shielding = false;
                    this.hitSwitchKick = true;
                }
                else if (this.combo == 3) {
                    //logic to change direction facing
                    if (this.character.scale.x < 0) {
                        this.character.body.velocity.x = -250 + this.moveSpeed;
                    }
                    else {
                        this.character.body.velocity.x = 250 + this.moveSpeed;
                    }
                    //this.aniPunch.play(10, false);
                    this.aniUppercut.play(10, false);
                    //this.hitCD = 30;
                    this.shielding = false;
                    this.hitSwitchPunch = true;
                    this.combo = 0;
                    //Causes Player health to increase
                    //this.health += 1;
                }

            }

            // Kick logic
            else if (this.geta() && this.getdown() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                //  Move to the right

                //logic to change direction facing
                if (this.character.scale.x < 0) {
                    this.character.body.velocity.x = -350 - this.moveSpeed;
                }
                else {
                    this.character.body.velocity.x = 350 + this.moveSpeed;
                }
                this.aniKick.play(10, false);
                //this.hitCD = 60;
                //this.weapon1.fire();

                if (this.character.body.touching.down) {
                    this.character.body.velocity.y = -200;
                }

                this.shielding = false;
                this.hitSwitchKick = true;
            }

            //Use item logic
            else if (this.geta() && this.getdown() == false && this.getright() == false && this.getleft() == false && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0) {
                //logic to change direction facing
                if (this.character.scale.x < 0) {
                    this.character.body.velocity.x = -250 + this.moveSpeed;
                }
                else {
                    this.character.body.velocity.x = 250 + this.moveSpeed;
                }
                this.aniPunch.play(10, false);
                if (this.character.hasItem) //If he has an item, USE IT!
                {
                    item1.useItem(this);
                    item1.user = null;
                    item1.pickedUp = false;
                    this.character.hasItem = false;
                }
                //this.character.animations.play('punch');
                //this.weapon1.fire();

                //If really freaking close to item, and if he isnt holding something, use it!
                if ((item1.xDistCheck(this.character) < 50) && (item1.yDistCheck(this.character) < 100) && !(this.character.hasItem) && (item1.user == null)) {
                    item1.user = this;
                    item1.pickedUp = true;
                    this.character.hasItem = true;
                    //console.log("close to item");
                }


                //this.hitCD = 30;
                this.shielding = false;
                this.hitSwitchPunch = true;
                //Causes Player health to increase
                //this.health += 1;
            }

            else if (this.getb() && !this.inputLock && this.getup() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.uppercutCD == 0) {
                //console.log("Up Special");
                this.aniUppercut.play(10, false);
            }
            else if (this.getb() && !this.inputLock && this.getright() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.dashCD == 0) {
                //console.log("Right Special");
                this.aniDash.play(5, false);
            }
            else if (this.getb() && !this.inputLock && this.getleft() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.dashCD == 0) {
                //console.log("Left Special");
                this.aniDash.play(5, false);
            }
            else if (this.getb() && !this.inputLock && this.getdown() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0) {
                //console.log("Down Special");
                this.aniJumpKick.play(7, false);
            }
            else if (this.getb() && this.getleft() == false && this.getright() == false && this.getup() == false && !this.inputLock && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.warlockCD == 0) {
                //console.log("Normal Special")
                this.aniWarlock.play(3, false);
            }

            //TODO: downDuration is still here, but in merge conflict it was gone, POSSIBLY REMOVE downDuration
            else if (this.gety() && this.jumps <= 5 && this.airTime <= 5 && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock) {
                this.character.body.velocity.y = -550 + this.jumpSpeed;
                jumpSound.play();
                this.jumps += 1;
                this.shielding = false;
                this.character.animations.play('jump');
            }
            else if (this.getleft() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock) {

                if (this.character.body.touching.down) {
                    this.jumps = 0;
                }

                if (this.character.scale.x > 0) {
                    this.character.scale.x *= -1;
                    this.weapon1.trackSprite(this.character, 30, -20, true);
                    this.weaponKick.trackSprite(this.character, 50, -50, true);
                    this.weaponUppercut.trackSprite(this.character, 30, -10, true);
                    this.jumpKick.trackSprite(this.character, 50, -50, true);
                    this.jumpKick.bulletSpeed = -150;
                }
                if (this.character.body.touching.down) {
                    this.character.body.velocity.x = -250 + this.hitVelocity;
                }
                else {
                    this.character.body.velocity.x = -200 + this.hitVelocity;
                }
                //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
                if (this.hitVelocity != 0) {
                    if (this.hitVelocity + -125 < 0) {
                        this.hitVelocity = 0;
                    }
                    else {
                        this.hitVelocity += -125;
                    }
                }
                this.character.animations.play('right');
                this.shielding = false;
            }
            else if (this.getright() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock) {
                //  Move to the right
                if (this.character.body.touching.down) {
                    this.jumps = 0;
                }
                //logic to change direction facing
                if (this.character.scale.x < 0) {
                    this.character.scale.x *= -1;
                    this.weapon1.trackSprite(this.character, 30, 20, true);
                    this.weaponKick.trackSprite(this.character, 50, 50, true);
                    this.weaponUppercut.trackSprite(this.character, 30, 10, true);
                    this.jumpKick.trackSprite(this.character, 50, 50, true);
                    this.jumpKick.bulletSpeed = 150;
                }
                if (this.character.body.touching.down) {
                    this.character.body.velocity.x = 250 + this.hitVelocity;
                }
                else {
                    this.character.body.velocity.x = 200 + this.hitVelocity;
                }
                //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
                if (this.hitVelocity != 0) {
                    if (this.hitVelocity + 125 > 0) {
                        this.hitVelocity = 0;
                    }
                    else {
                        this.hitVelocity += 125;
                    }
                }
                this.character.animations.play('right');
                this.shielding = false;
            }
            else {
                //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
                if (this.hitVelocity != 0) {
                    this.character.body.velocity.x = this.hitVelocity;
                }
                else {
                    if (this.xZero) {
                        this.character.body.velocity.x = 0;
                    }
                }
                if (this.stunCounter > 0) {
                    this.character.animations.play('ko');
                    this.character.tint = Math.random() * 0xffffff;
                    //game.camera.shake(0.01,15);

                    //If hit really hard, add a dust trail that depends on hit velocity
                    if (this.hitVelocity > 350 || this.hitVelocity < -350) {
                        this.dustTrail.fire();
                        //game.camera.shake(0.04,50);
                        game.camera.shake(0.04, 20);
                    }

                }
                else {
                    //Makes character just a silhouete
                    //this.character.tint = 0;

                    this.character.tint = 0xffffff;

                    //this.character.animations.play('idle');
                }
                this.shielding = false;

                if (this.character.body.touching.down) {
                    this.jumps = 0;
                }
            }
        }
        //end of update input function
    }
}