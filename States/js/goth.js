class goth extends Fighter {
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

        //Player animations

        //idle animation
        this.aniHang = this.character.animations.add('hang', [24, 25, 26], 5, true);

        this.aniRight = this.character.animations.add('right', [6, 7, 8, 9, 10, 11, 12], 10, false);
        this.aniRight.onComplete.add(this.walkEnd, this);

        //idle animation
        this.aniIdle = this.character.animations.add('idle', [3, 4, 5], 5, true);

        //jump animation
        this.aniJump = this.character.animations.add('jump', [23, 23], 5, false); //need to adjust animation speed
        this.aniJump.onStart.add(this.jumpStart, this);
        this.aniJump.onComplete.add(this.jumpEnd, this);
        
        //shield animation
        this.aniShield = this.character.animations.add('shield', [13], 5, false);
        this.aniShield.onComplete.add(this.shieldEnd, this);

        //punch animations
        this.aniPunchWindUp= this.character.animations.add('punchwindup', [15, 16], 5, false);
        this.aniPunchWindUp.onStart.add(this.PunchWindUpStart, this);
        this.aniPunchWindUp.onComplete.add(this.PunchWindUpEnd, this);

        this.aniPunch = this.character.animations.add('punch', [20], 10, false);
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
        this.aniDash = this.character.animations.add('dash', [20], 15, false);
        this.aniDash.onStart.add(this.dashStart, this);
        this.aniDash.onComplete.add(this.dashEnd, this);

        //Tatsumaki (i am weeb)
        this.aniJumpKickWindUp= this.character.animations.add('JumpKickwindup', [14, 15, 16], 5, false);
        this.aniJumpKickWindUp.onStart.add(this.JumpKickWindUpStart, this);
        this.aniJumpKickWindUp.onComplete.add(this.JumpKickWindUpEnd, this);

        this.aniJumpKick = this.character.animations.add('jumpKick', [17, 18, 19], 5, false);
        this.aniJumpKick.onStart.add(this.jumpKickStart, this);
        this.aniJumpKick.onComplete.add(this.jumpKickEnd, this);

        //Uppercut (change 16 later for a better uppercut frame)
        this.aniUppercutWindUp= this.character.animations.add('Uppercutwindup', [14, 15, 16, 16], 5, false);
        this.aniUppercutWindUp.onStart.add(this.UppercutWindUpStart, this);
        this.aniUppercutWindUp.onComplete.add(this.UppercutWindUpEnd, this);
        
        this.aniUppercut = this.character.animations.add('uppercut', [17, 18, 19], 5, false);
        this.aniUppercut.onStart.add(this.uppercutStart, this);
        this.aniUppercut.onComplete.add(this.uppercutEnd, this);

        //Slow warlock punch
        this.aniWarlockWindUp= this.character.animations.add('Warlockwindup', [20, 20, 20, 21, 21], 5, false);
        this.aniWarlockWindUp.onStart.add(this.WarlockWindUpStart, this);
        this.aniWarlockWindUp.onComplete.add(this.WarlockWindUpEnd, this);
        
        this.aniWarlock = this.character.animations.add('warlock', [22], 14, false);
        this.aniWarlock.onStart.add(this.warlockStart, this);
        this.aniWarlock.onComplete.add(this.warlockEnd, this);

        //player got hit animation
        this.aniKo = this.character.animations.add('ko', [27, 28], 5, false);
        this.aniKo.onComplete.add(this.koEnd, this);

        //Player air swipe forward/neutral
        this.aniAirFWindUp= this.character.animations.add('AirFwindup', [20], 5, false);
        this.aniAirFWindUp.onStart.add(this.AirFWindUpStart, this);
        this.aniAirFWindUp.onComplete.add(this.AirFWindUpEnd, this);
        
        this.aniAirF = this.character.animations.add('airforward', [21, 22], 7, false);
        this.aniAirF.onStart.add(this.airforwardStart, this);
        this.aniAirF.onComplete.add(this.airforwardEnd, this);

        //Player air swipe down
        this.aniAirDWindUp= this.character.animations.add('AirDwindup', [20], 5, false);
        this.aniAirDWindUp.onStart.add(this.AirDWindUpStart, this);
        this.aniAirDWindUp.onComplete.add(this.AirDWindUpEnd, this);

        this.aniAirD = this.character.animations.add('airdown', [14], 7, false);
        this.aniAirD.onStart.add(this.airdownStart, this);
        this.aniAirD.onComplete.add(this.airdownEnd, this);

        //Player air swipe neutral
        this.aniAirNWindUp= this.character.animations.add('airNwindup', [21], 5, false);
        this.aniAirNWindUp.onStart.add(this.AirNWindUpStart, this);
        this.aniAirNWindUp.onComplete.add(this.AirNWindUpEnd, this);

        this.aniAirN = this.character.animations.add('airneutral', [22, 23], 7, false);
        this.aniAirN.onStart.add(this.airneutralStart, this);
        this.aniAirN.onComplete.add(this.airneutralEnd, this);

        //Player juggle
        this.aniJuggleWindUp= this.character.animations.add('Jugglewindup', [21], 5, false);
        this.aniJuggleWindUp.onStart.add(this.JuggleWindUpStart, this);
        this.aniJuggleWindUp.onComplete.add(this.JuggleWindUpEnd, this);

        this.aniJuggle = this.character.animations.add('juggle', [22, 22], 7, false);
        this.aniJuggle.onStart.add(this.JuggleStart, this);
        this.aniJuggle.onComplete.add(this.JuggleEnd, this);

        //Player Air Dodge
        this.aniAirDodge = this.character.animations.add('airDodge', [20], 15, false);
        this.aniAirDodge.onStart.add(this.airDodgeStart, this);
        this.aniAirDodge.onComplete.add(this.airDodgeEnd, this);

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
                // this.weaponKick.trackSprite(this.character, 50, -1*(50 + Math.floor(Math.random() * 51)), true);
                // this.weaponKick.bulletSpeed = -150;
        this.weapon1.fire();    
           
        //game.time.events.add(Phaser.Timer.SECOND * 1.15, this.warlockTimer, this);
    }

    jumpKickStart() {
        this.attacking = true;
        this.attack = 'jumpKick';
        this.inputLock = true;
        this.xZero = false;
        game.time.events.add(Phaser.Timer.SECOND * .3, this.jumpKickTimer, this);

        //this.velocity.x = 50 + this.velocity.x;
    }

    jumpKickEnd() {
        this.aniIdle.play(10, false);
        this.attacking = true;
        this.deltDamage = false;
        this.inputLock = false;
        game.time.events.add(Phaser.Timer.SECOND * .05, this.jumpKickTimer2, this);
        this.attack = '';
        //this.velocity.x = 0;
    }

}

/*
        let i = 0;
        if(this.character.scale.x < 0){  
            while (i < 5){

                this.weaponKick.trackSprite(this.character, 50, -1*(50 + Math.floor(Math.random() * 51)), true);
                this.weaponKick.bulletSpeed = -150;
                this.weaponKick.fire();
                i++;
            }    
        }
        else {
            while (i < 5){

                this.weaponKick.trackSprite(this.character, 50, (50 + Math.floor(Math.random() * 51)), true);
                this.weaponKick.bulletSpeed = 150;
                this.weaponKick.fire();
                i++;
            }
        }
*/