class lab extends Fighter {
    constructor(character, health, lives, startx, starty, controlnum) {

        super(character, health, lives, startx, starty, controlnum);
        this.character.body.gravity.y = 650;
        //console.log("we created the lab construtor");

        this.jumpSpeed = 25;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1; //250;
        this.attackDmg = 1;
        this.moveSpeed = 200;
        this.jumpKickBulletSpeedCons = 600; //250;
        //Player animations

        //idle animation
        this.aniHang = this.character.animations.add('hang', [24, 25, 26], 5, true);

        this.aniRight = this.character.animations.add('right', [6, 7, 8, 9], 10, true);
        this.aniRight.onComplete.add(this.walkEnd, this);

        //idle animation
        this.aniIdle = this.character.animations.add('idle', [1, 2, 3, 4, 5], 5, true);
        this.aniIdle.onComplete.add(this.IdleEnd, this);

        //jump animation
        this.aniJump = this.character.animations.add('jump', [20], 5, false); //need to adjust animation speed
        this.aniJump.onStart.add(this.jumpStart, this);
        this.aniJump.onComplete.add(this.jumpEnd, this);
        
        //shield animation
        this.aniShield = this.character.animations.add('shield', [20, 20, 20], 1, false);
        this.aniShield.onComplete.add(this.shieldEnd, this);

        //punch animations
        this.aniPunchWindUp= this.character.animations.add('punchwindup', [19], 5, false);
        this.aniPunchWindUp.onStart.add(this.PunchWindUpStart, this);
        this.aniPunchWindUp.onComplete.add(this.PunchWindUpEnd, this);

        this.aniPunch = this.character.animations.add('punch', [18], 10, false);
        this.aniPunch.onStart.add(this.punchStart, this);
        this.aniPunch.onComplete.add(this.punchEnd, this);

        //kick
        this.aniKickWindUp= this.character.animations.add('kickwindup', [20, 20, 20], 10, false);
        this.aniKickWindUp.onStart.add(this.KickWindUpStart, this);
        this.aniKickWindUp.onComplete.add(this.KickWindUpEnd, this);

        this.aniKick = this.character.animations.add('kick', [21, 21, 22, 22, 22], 10, false);
        this.aniKick.onStart.add(this.kickStart, this);
        this.aniKick.onComplete.add(this.kickEnd, this);

        //dash
        this.aniDash = this.character.animations.add('dash', [6], 15, false);
        this.aniDash.onStart.add(this.dashStart, this);
        this.aniDash.onComplete.add(this.dashEnd, this);

        //Tatsumaki (i am weeb)
        this.aniJumpKickWindUp= this.character.animations.add('JumpKickwindup', [10, 11, 12, 13], 5, false);
        this.aniJumpKickWindUp.onStart.add(this.JumpKickWindUpStart, this);
        this.aniJumpKickWindUp.onComplete.add(this.JumpKickWindUpEnd, this);

        this.aniJumpKick = this.character.animations.add('jumpKick', [14, 15], 5, false);
        this.aniJumpKick.onStart.add(this.jumpKickStart, this);
        this.aniJumpKick.onComplete.add(this.jumpKickEnd, this);

        //Uppercut (change 16 later for a better uppercut frame)
        this.aniUppercutWindUp= this.character.animations.add('Uppercutwindup', [21, 22], 5, false);
        this.aniUppercutWindUp.onStart.add(this.UppercutWindUpStart, this);
        this.aniUppercutWindUp.onComplete.add(this.UppercutWindUpEnd, this);
        
        this.aniUppercut = this.character.animations.add('uppercut', [23], 5, false);
        this.aniUppercut.onStart.add(this.uppercutStart, this);
        this.aniUppercut.onComplete.add(this.uppercutEnd, this);

        //Slow warlock punch
        this.aniWarlockWindUp= this.character.animations.add('Warlockwindup', [10, 11, 12, 13], 5, false);
        this.aniWarlockWindUp.onStart.add(this.WarlockWindUpStart, this);
        this.aniWarlockWindUp.onComplete.add(this.WarlockWindUpEnd, this);
        
        this.aniWarlock = this.character.animations.add('warlock', [14, 15], 7, false);
        this.aniWarlock.onStart.add(this.warlockStart, this);
        this.aniWarlock.onComplete.add(this.warlockEnd, this);

        //player got hit animation
        this.aniKo = this.character.animations.add('ko', [27, 28], 5, false);
        this.aniKo.onComplete.add(this.koEnd, this);

        //Player air swipe forward/neutral
        this.aniAirFWindUp= this.character.animations.add('AirFwindup', [14], 5, false);
        this.aniAirFWindUp.onStart.add(this.AirFWindUpStart, this);
        this.aniAirFWindUp.onComplete.add(this.AirFWindUpEnd, this);
        
        this.aniAirF = this.character.animations.add('airforward', [15], 7, false);
        this.aniAirF.onStart.add(this.airforwardStart, this);
        this.aniAirF.onComplete.add(this.airforwardEnd, this);

        //Player air swipe down
        this.aniAirDWindUp= this.character.animations.add('AirDwindup', [20], 5, false);
        this.aniAirDWindUp.onStart.add(this.AirDWindUpStart, this);
        this.aniAirDWindUp.onComplete.add(this.AirDWindUpEnd, this);

        this.aniAirD = this.character.animations.add('airdown', [8], 7, false);
        this.aniAirD.onStart.add(this.airdownStart, this);
        this.aniAirD.onComplete.add(this.airdownEnd, this);

        //Player air swipe neutral
        this.aniAirNWindUp= this.character.animations.add('airNwindup', [15], 5, false);
        this.aniAirNWindUp.onStart.add(this.AirNWindUpStart, this);
        this.aniAirNWindUp.onComplete.add(this.AirNWindUpEnd, this);

        this.aniAirN = this.character.animations.add('airneutral', [14], 7, false);
        this.aniAirN.onStart.add(this.airneutralStart, this);
        this.aniAirN.onComplete.add(this.airneutralEnd, this);

        //Player juggle
        this.aniJuggleWindUp= this.character.animations.add('Jugglewindup', [15, 14], 5, false);
        this.aniJuggleWindUp.onStart.add(this.JuggleWindUpStart, this);
        this.aniJuggleWindUp.onComplete.add(this.JuggleWindUpEnd, this);

        this.aniJuggle = this.character.animations.add('juggle', [13], 7, false);
        this.aniJuggle.onStart.add(this.JuggleStart, this);
        this.aniJuggle.onComplete.add(this.JuggleEnd, this);

        //Player Air Dodge
        this.aniAirDodge = this.character.animations.add('airDodge', [20], 15, false);
        this.aniAirDodge.onStart.add(this.airDodgeStart, this);
        this.aniAirDodge.onComplete.add(this.airDodgeEnd, this);

        //overridden weapons
        this.weaponKick = game.add.weapon(10, 'slash');
        this.weaponKick.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weaponKick.bulletLifespan = 700; //50
        this.weaponKick.bulletSpeed = 500; //0
        this.weaponKick.fireRate = 2;
        //this.weaponKick.multiFire = true;
        this.weaponKick.trackSprite(this.character, 50, 50, true);

        //Weapon used for jump kick
        this.jumpKick = game.add.weapon(10, 'slash');
        this.jumpKick.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.jumpKick.bulletLifespan = 600; //50
        this.jumpKick.bulletSpeed = 500; //0
        this.jumpKick.fireRate = 2;
        this.jumpKick.trackSprite(this.character, 50, 50, false);
        this.jumpKick.fireAngle = 45;
    }

    //end of constructor

    weapontracking() {

        if(this.character.scale.x > 0) {
            
            this.weapon1.trackSprite(this.character, 30, 20, true);
            this.weaponKick.trackSprite(this.character, 50, 50, true);
            this.weaponKick.bulletSpeed = 500;
            this.weaponUppercut.trackSprite(this.character, 30, 10, true);
            this.jumpKick.trackSprite(this.character, 50, 50, false); //true
            this.jumpKick.bulletSpeed = this.jumpKickBulletSpeedCons; //150;

            this.weaponSwipeD.trackSprite(this.character, 0, 90, true);                    
            this.weaponSwipeFD.trackSprite(this.character, 25, 30, true);
            this.weaponSwipeFU.trackSprite(this.character, 25, 20, true);
            this.weaponSwipeU.trackSprite(this.character, 0, 10, true);
        }
        else if (this.character.scale.x < 0) {
            
            this.weapon1.trackSprite(this.character, 30, -20, true);
            this.weaponKick.trackSprite(this.character, 50, -50, true);
            this.weaponKick.bulletSpeed = -500;
            this.weaponUppercut.trackSprite(this.character, 30, -10, true);
            this.jumpKick.trackSprite(this.character, 0, 50, false ); //false
            this.jumpKick.bulletSpeed = -1 * this.jumpKickBulletSpeedCons; //-150;
            
            this.weaponSwipeD.trackSprite(this.character, 0, -90, true);                    
            this.weaponSwipeFD.trackSprite(this.character, 25, -30, true);
            this.weaponSwipeFU.trackSprite(this.character, 25, -20, true);
            this.weaponSwipeU.trackSprite(this.character, 0, -10, true);

        }

    }

    jumpKickTimer() {
        if (this.attacking) {
            this.jumpKick.fire();
            this.character.body.velocity.x = 150 * this.character.scale.x;
            this.character.body.velocity.y = -100;
            this.inputLock = true;
            console.log("Lab attacking?");
            console.log(this.attacking);
        }
        else {
            this.xZero = true;
            this.inputLock = false;
            this.aniIdle.play(10, false);   
        }
    }
    jumpKickTimer2() {
        this.xZero = true;
    }
    jumpKickStart() {
        if (this.character.scale.x < 0) //If facing left, flip the angle of the hitbox
        {
            //this.jumpKick.bulletAngleOffset = -40;
            //this.jumpKick.velocity.x = this.jumpKickBulletSpeedCons;
            this.jumpKick.fireAngle = -45;
        }
        else {
            //this.jumpKick.bulletAngleOffset = 40;

            this.jumpKick.fireAngle = 45;
        }
        
        console.log(this.jumpKick.fireAngle);

        this.attacking = true;
        this.attack = 'jumpKick';
        this.inputLock = true;
        this.xZero = false;
        game.time.events.add(Phaser.Timer.SECOND * .3, this.jumpKickTimer, this);
    }
    jumpKickEnd() {
        this.aniIdle.play(10, false);
        //this.attacking = false;
        this.deltDamage = false;
        this.inputLock = false;
        game.time.events.add(Phaser.Timer.SECOND * .05, this.jumpKickTimer2, this);
        //this.attack = '';
    }

    warlockStart() {
        this.xZero = false;
        this.inputLock = true;
        this.attacking = true;
        console.log("Attack??");
        if (this.character.body.touching.down) {
            this.character.body.moves = false;
        }
        this.attack = 'warlock';
        this.character.body.velocity.x = 5 * this.character.scale.x;
        
        this.weaponKick.fire();

        //game.time.events.add(Phaser.Timer.SECOND * 1.15, this.warlockTimer, this);
    }

    warlockTimer(){
        if (this.attacking) {
            console.log("Lab toss!");
            
                this.weaponKick.fire();
            
                this.character.body.moves = true;
                this.character.body.velocity.x = 5 * this.character.scale.x;
                this.inputLock = true;
            
        }
        else {
            this.xZero = true;
            this.character.body.moves = true;
            this.inputLock = false;
            this.aniIdle.play(10, true);
        }

    }
}