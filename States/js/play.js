class crowd{
  constructor(startx, starty)
  {
    this.crowdsprite = game.add.sprite(startx, starty, 'crowd');
    game.physics.arcade.enable(this.crowdsprite);
    this.people = game.add.weapon(5, 'dude');
    this.people.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.people.bulletLifespan = 300;
    this.people.bulletSpeed = 0;
    this.people.fireRate = 50;
    this.people.trackSprite(this.crowdsprite, 10, -30, true);
    this.crowdsprite.anchor.setTo(0.5,0);
  }
}

class cam{

	constructor(toplx, toply, w, h){

		this.toplx = toplx;
		this.toply = toply;
		this.w = w;
		this.h = h;

		game.camera.bounds = null;


		//this.minx = 100;
		//this.miny = 100;

		//game.camera.follow(Player1);
    	//game.camera.deadzone = new Phaser.Rectangle(450, 350, 100, 100);

		//game.camera.deadzone = new Phaser.Rectangle(toplx, toply, w, h);

	}

	updatecamera(sprite1,sprite2,xmin, ymin,xmax, ymax){

		//console.log(game.camera.x);
		//console.log(game.camera.y);
		//console.log(xdist);
		//console.log(ydist);

		//update topleft x coordinate

		//console.log(game.camera.x);

		//average pixel positions of sprite1 and sprite2

    //Phaser.Camera.SHAKE_BOTH = 100;
    //Phaser.Camera.shake(0.05,500);

    //Phaser.Camera.shake(0.05,500);

    var xtarget = 0.5*(sprite2.character.body.position.x + sprite1.character.body.position.x);
		var ytarget = 0.5*(sprite2.character.body.position.y -sprite1.character.body.position.y);

		if(xtarget < 0){
			xtarget = xtarget*-1;
		}

		if(ytarget < 0){
			ytarget = ytarget*-1;
		}

		//math for scaling (camera zoom)
		var xscaletarget = (sprite2.character.body.position.x - sprite1.character.body.position.x);
		var yscaletarget = (sprite2.character.body.position.y -sprite1.character.body.position.y);


		//adjust position to be adjusted for topleft corner of camerabox
		xtarget -= 300;

		game.camera.x += 0.2*(xtarget-game.camera.x);

		//console.log(game.camera.x);
		//update topleft y coordinate
		game.camera.y += 0.2*((-1*ytarget)-game.camera.y);

		w = 0;
		h = 0;
		if(xtarget < xmin){
			w = xmin;
		}
		else if(xtarget > xmax){
			w = xmax;
		}
		else{
			w = xtarget;
		}

		//update camera height
		if(ytarget < ymin){
			h = ymin;
		}
		else if(ytarget > ymax){
			h = ymax;
		}
		else{
			h = ytarget;
		}

		//game.camera.setSize(w,h);

		/*
		//zoom in
		if(xscaletarget < 0){
			xscaletarget = xscaletarget * -1;
		}
		console.log(xscaletarget);
		if(xscaletarget < 100 && xscaletarget > 50){
			game.camera.scale.x += 0.001;
			//game.camera.scale.y += 0.001;
		}
		//zoom out
		if(xscaletarget >= 100  && xscaletarget <70){
			game.camera.scale.x -= 0.001;
			game.camera.scale.y -= 0.001;
		}
		*/


		//not working???
		/*
		//update camera width
		if(xtarget < xmin){
			game.camera.width = xmin;
		}
		else if(xtarget > xmax){
			game.camera.width = xmax;
		}
		else{
			game.camera.width = xtarget;
		}

		//update camera height
		if(ytarget < ymin){
			game.camera.height = ymin;
		}
		else if(ytarget > ymax){
			game.camera.height = ymax;
		}
		else{
			game.camera.height = ytarget;
		}
		*/

		//console.log(game.camera.width);
		//console.log(game.camera.height);


		//update width
		//game.camera.deadzone.width = ;

		//update height
		//game.camera.deadzone.height =;
	}


}


class Item
{
  constructor(type, startx, starty, gameRef)
    {
    this.gameRef = gameRef;
    this.type = game.add.sprite(startx, starty, type);
    game.physics.arcade.enable(this.type);
    this.type.anchor.setTo(.5,.5);
    this.type.body.bounce.y = 0.2;//0.2;
    this.type.body.bounce.x = .2
    this.type.body.gravity.y = 400;
    this.type.body.angularDrag = 100;
    this.type.body.friction = 100;
    this.type.body.damping = .5;

    this.pickedUp = false;
    this.user = null; //Will be a Fighter
    this.previousUser = null; //Will be Fighter
    //These three variables help control the various situations that items can be in
    this.thrown = false;
    this.active = false;
    this.inAir = false;
    this.type.body.rotation = 0;
    this.type.angle = 0;

    this.type.body.collideWorldBounds = true;
    this.type.body.onWorldBounds = new Phaser.Signal();
    this.type.body.onWorldBounds.add(this.respawnItem, this);

    }

    useItem (target) { //Only call if item has a user and is pickedUp
      //When you use the item, first check the type of item used, then do the approipiate action
      this.type.angle = 0;
      this.type.body.angularVelocity = 0;
      if(this.pickedUp && this.user != null)
      {
        this.inAir = false;
        console.log("Used item!")
        console.log(this);
        if(this.type.key == 'bottle') //heal the player and destroy bottle
        {
          itemSound.play();
          this.type.destroy();
          this.type = null;
          target.health -= 10;
          if (target.health < 0)
          {
          	target.health = 0;
          }
          game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this); //After 2 seconds, spawn the item
        }
        else if(this.type.key == 'gator') //Current does the same thing as bottle but does damange to player instead
        {
          itemSound.play();
          this.type.destroy();
          this.type = null;
          target.health += 10;
          game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this); //After 2 seconds, spawn the item
        }
        else if(this.type.key == 'helmet') //Current does the same thing as bottle but does damange to player instead
        {
          itemSound.play();

          this.gameRef.respawn(target);
          game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this); //After 2 seconds, spawn the item
          this.type.destroy();
          this.type = null;
        }
      }
    }
    getActive()
    {
      return this.active;
    }
    getThrown()
    {
      return this.thrown;
    }
    throwItem(holder) { //Takes the holder sprite as a parameter to calculate which direction he's facing
      //console.log("You threw item!!");
      //this.spin = game.add.tween(this.type).to( { angle: '-1440' }, 2400, Phaser.Easing.Linear.None, true);
      this.type.angle = 0;
      this.type.body.angularVelocity = 0;
      this.type.body.rotation = 0;
      this.type.body.velocity.x = 0;
      this.type.body.velocity.y = 0;
      this.thrown = true;
      this.active = true;
      this.previousUser = this.user;
      this.user = null;
      //console.log('item1.thrown: ' + this.thrown);
      //console.log('item1.active: ' + this.active);
      if(holder.character.scale.x < 0)
      { //If they user is facing left
          itemSound.play();
          //console.log("facing left");

          this.type.body.velocity.x -= 300;
          this.type.body.velocity.y -= 200;
          holder.hasItem = false;
          this.thrown = true;
          this.active = true;
          this.inAir = true;

      }
      else //if facing to the left
      {
          itemSound.play();
          //console.log("facing right");

          this.type.body.velocity.x += 300;
          this.type.body.velocity.y -= 200;
          this.pickedUp = false;
          holder.hasItem = false;
          this.thrown = true;
          this.active = true;
          this.inAir = true;

      }
    }
    itemCollision(target) //target is Fighter sprite who is getting hit by thrown item
    {
      //  console.log("In itemCollision w/target");
      if(this.thrown && this.active && game.physics.arcade.overlap(target.character, this.type)) //active controls when the damage is applied ie only apply it once
      { //console.log("deal the item throw damage")
        if(this.type.body.velocity.x > 0) //If item is thrown to the right, obv. the target is gonna fly to the right
        {
            target.hitVelocity += 200;
            target.character.body.velocity.y -= 250;
            target.health += 10;

        }
        else
        {
          target.hitVelocity -= 200;
          target.character.body.velocity.y -= 250;
          target.health += 10;
        }
        this.active = false;

      }

    }
    spawnItem() {
      //Called after a timer goes off to reassign type and change position of item (allows for a reusable item)
      //For now, respawn it default as a bottle
      console.log("ITEM SPAWNN ~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        this.inAir = true;
        this.user = null;
        this.previousUser = null;


//Depending on the random selection, spawn a random item
        let itemSelect = Math.floor(Math.random() * 3); // A random number generator of integers from 0 to 1 used to randomly spawn an item
        let itemPosNeg = 0;
        let signChoice = Math.floor(Math.random() * 2);
        switch(signChoice)
        {
          case 0:
            itemPosNeg = 1;
            break;
          case 1:
            itemPosNeg = -1;
            break;
        }

        let itemOffset = Math.floor(Math.random() * 300);
        console.log("Item Offset: " + itemOffset);
        console.log("itemPosNeg: " + itemPosNeg);
        switch(itemSelect)
        {
          case 0:
            this.type = game.add.sprite(game.world.width * .5 + (itemOffset * itemPosNeg), game.world.height*.5, 'gator');
            break;
          case 1:
            this.type = game.add.sprite(game.world.width * .5 + (itemOffset * itemPosNeg), game.world.height*.5, 'bottle');
            break;
          case 2:
            this.type = game.add.sprite(game.world.width * .5 + (itemOffset * itemPosNeg), game.world.height* .5, 'helmet');
            break;
        }

        game.physics.arcade.enable(this.type);
        this.type.anchor.setTo(.5,.5);
        this.type.body.bounce.y = .2;//0.2;
        this.type.body.bounce.x = .2;
        this.type.body.gravity.y = 400;
        this.type.body.angularDrag = 100;
        this.type.body.friction = 100;
        this.type.body.mass = 1;
        this.type.body.DYNAMIC;
        this.type.body.collideWorldBounds = true;
        this.type.body.onWorldBounds = new Phaser.Signal();
        this.type.body.onWorldBounds.add(this.respawnItem, this);
        this.active = false;
        this.thrown = false;
        this.type.angle = 0;
        this.type.body.rotation = 0;
    }
    respawnItem()
    {
      console.log("RESPAWN ITEM");
        this.type.destroy(); //Delete the old item sprite
        this.spawnItem();
    }
    xDistCheck(target) { //Get the distance between the item and the target(probably the player in most cases)
      if(this.type != null)
      {
        return Math.abs(this.type.body.position.x - target.body.position.x);
      }

    }
    yDistCheck(target) { //Get the distance between the item and the target(probably the player in most cases)
      if(this.type != null)
      {
        return Math.abs(this.type.body.position.y - target.body.position.y);
      }

    }

    alignToTarget() //Should always have a type when called due to update function
    //Also checks if the item falls off the map
    {//This checks if the item is touching the ground, and sets its values back to default
      if(this.type.body.touching.down)
      {
        this.type.body.velocity.set(0,this.type.body.velocity.y);
        this.type.body.angularVelocity = 0;
        this.type.angle = 0;
        this.thrown = false;
        this.inAir = false;
      }


      if(this.user == null)
      {
        //Can't follow user, check if it falls off the map
        if(this.type.body.position.x < -50 || this.type.body.position.x > 900)
        {
          //this.type.destroy();
          //this.spawnItem();
        }
        else if(this.type.body.position.y > 700 || this.type.body.position.y < -100)
        {
          //this.type.destroy();
          //this.spawnItem();
        }
      }
      else
      {

          this.type.body.position.x = this.user.character.body.position.x;
          this.type.body.position.y = this.user.character.body.position.y;
          //Can't follow user, check if it falls off the map
          if(this.type.body.position.x < -50 || this.type.body.position.x > 900)
          {
            //this.type.destroy();
            //this.spawnItem();
          }
          else if(this.type.body.position.y > 700 || this.type.body.position.y < -100)
          {
            //this.type.destroy();
            //this.spawnItem();
          }

      }
    }

    onGround() {
      if(game.physics.arcade.collide(item1.type, platforms))
      {
        this.inAir = false;
        if(!this.user)
        {
            this.user = null;
        }
        //console.log("user: " + this.user)

      }
    }


}


//Virtual pad
class vpad{
  constructor(controlnum)
  {

  this.controlnum = controlnum;

  //Virtual controller variables
  this.leftpress = false;
  this.rightpress = false;
  this.uppress = false;
  this.downpress = false;

  this.apress = false;//regular attack button
  this.bpress = false;//special button
  this.xpress = false;//jump button
  this.ypress = false;//block button

  }
  //end of vpad class
}

class nespad{
  constructor(controlnum){
  //gamepad stuff

    //this.nescontroller = null;
    this.nescontroller = game.input.gamepad.pad1;

    this.nesaButton = false;
    this.nesbButton = false;
    this.nesxButton = false;
    this.nesyButton = false;
    this.nesleftButton = false;
    this.nesrightButton = false;
    this.nesupButton = false;
    this.nesdownButton = false;
    this.indicator = false;
    this.pad1 = false;
    this.controlnum = controlnum;
    this.testconnect = false;


  }

    connectgamepad(){
        if(this.testconnect == false){

        //try to add nes controller support
        //game.input.gamepad.start();

        /*
        var nesaButton = null;
        var nesbButton = null;
        var nesxButton = null;
        var nesyButton = null;
        var nesleftButton = null;
        var nesrightButton = null;
        var nesupButton = null;
        var nesdownButton = null;
        */

        this.nescontroller = game.input.gamepad.pad1;

        this.nescontroller.addCallbacks(this, {
            onConnect: function(){
              this.testconnect = true;
              console.log("controller recognized and connected! buttons set!");
              // you could use a different button here if you want...

              //buttons seem to go from 0 to 10
              //nesaxes = nescontroller.
              this.nesaButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_1);
              this.nesbButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_2);
              this.nesxButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_0);
              this.nesyButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_3);
              /*nesrtrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_4);
              nesltrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_5);

              nesrightButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_6);
              nesdownButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
              nesleftButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
              nesupButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_7);

              nesselectButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_8);
              nesstartButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_9); */

            }

        });
    game.input.gamepad.start();
        }
  }

  updategamepad(){
          //try to add nes controller support
    //game.input.gamepad.start();

    /*
    var nesaButton = null;
    var nesbButton = null;
    var nesxButton = null;
    var nesyButton = null;
    var nesleftButton = null;
    var nesrightButton = null;
    var nesupButton = null;
    var nesdownButton = null;
    */

      nescontroller = game.input.gamepad.pad1;

      nescontroller.addCallbacks(this, {
        onConnect: function(){
        testconnect1 = true;
        console.log("controller recognized and connected! buttons set!");
        // you could use a different button here if you want...

        //buttons seem to go from 0 to 10
        //nesaxes = nescontroller.
        nesaButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_1);
        nesbButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_2);
        nesxButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_0);
        nesyButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_3);
        /*nesrtrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_4);
        nesltrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_5);

        nesrightButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_6);
        nesdownButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
        nesleftButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
        nesupButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_7);

        nesselectButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_8);
        nesstartButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_9);*/

      }

    });
    game.input.gamepad.start();
  }

}



class Fighter {
  constructor(character,health,lives,startx,starty,controlnum) {


       this.character = game.add.sprite(startx, starty, character);//player character variable to access sprite from phaser and all its properties character variable is name of spritesheet to use
       this.health = health;//player start health
       this.lives = lives;
       this.attacking = false; //Controls when to register active hit frames
       this.deltDamage = false;
       this.attack = '';

       switch(character)
       {
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
      this.dashCD = false;
      //Cooldown for warlock kick
      this.warlockCD = false;
      //Cooldown for uppercut
      this.uppercutCD = false;
      //cooldown for all basic moves
      this.basicCD = false;

      //turns on and off the auto reset of zero x velocity when the player is standing
      this.xZero = true;

      //Respawn Animation Activator Switch
      this.respawnSwitch = false;
      //m is the respawn animation counter
      this.m = 0;

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
       console.log("controlnum: "+ this.controlnum)
       this.state = 0; //player state for state machine?

       this.jumps = 0;

       this.character.anchor.setTo(0.5,0);

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

	     this.aniRight = this.character.animations.add('right', [ 3,4,5,6,7], 10, true);
       this.aniRight.onComplete.add(this.walkEnd, this);

       //idle animation
       this.aniIdle = this.character.animations.add('idle', [6], 5, true);

       //jump animation
       this.aniJump = this.character.animations.add('jump', [13, 14], 5, false); //need to adjust animation speed
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
       this.aniJumpKick = this.character.animations.add('jumpKick', [14, 13, 12, 12 , 12], 15, false);
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


       //this.controller1 = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'punch': Phaser.KeyCode.T, 'kick': Phaser.KeyCode.R});

    this.nespad = new nespad(controlnum);

    if(controlnum == 1)
     {
      //controller1 = new Object;
      this.controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.E, 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'basic': Phaser.KeyCode.T, 'special': Phaser.KeyCode.R, 'shield': Phaser.KeyCode.Y});
     }
    else if(controlnum == 2)
     {
     //controller1 = new Object;
     this.controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.I, 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT , 'basic': Phaser.KeyCode.P, 'special': Phaser.KeyCode.O, 'shield': Phaser.KeyCode.OPEN_BRACKET});
     }
     else if(controlnum == -1)
     {
      this.controller1 = new vpad(-1);
     }
      else if(controlnum == -2)
      {
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
       for (var g = 3; g > 0; g--)
       {

         if(controlnum == -1 || controlnum == 1) //For the vpad
         {
           if(charName1 == 'dude')
           {
            //sets up the cell for the damage icon and stocks
             var damageBox1 = game.add.sprite(0, game.world.game.world.height - 75, this.damageBox);
             damageBox1.scale.setTo(5.5,2.2);
             var stock = this.stocks.create((0) + (30 * g), game.world.height - 25, 'blueStock');
             stock.anchor.setTo(.5,.5);
           }
           else if(charName1 == 'chick')
           {
            //sets up the cell for the damage icon and stocks
             var damageBox1 = game.add.sprite(0, game.world.game.world.height - 75, this.damageBox);
             damageBox1.scale.setTo(5.5,2.2);
             var stock = this.stocks.create((0) + (30 * g), game.world.height - 25, 'orangeStock');
             stock.anchor.setTo(.5,.5);
           }
         }

      }
      for(var h = 0; h < 3; h++)
      {
         if(controlnum == 2 || controlnum == -2)
         {
           if(charName2 == 'dude') //dude is blue, chick is orange
           {
            //sets up the cell for the damage icon and stocks
             var damageBox2 = game.add.sprite(650, game.world.game.world.height - 75, this.damageBox);
             damageBox2.scale.setTo(5.5,2.2);
             var stock = this.stocks.create((game.world.width *.85) + (30 * h), game.world.height - 25, 'blueStock');
             stock.anchor.setTo(.5,.5);
           }
           else if(charName2 == 'chick')
           {
            //sets up the cell for the damage icon and stocks
             var damageBox2 = game.add.sprite(650, game.world.game.world.height - 75, this.damageBox);
             damageBox2.scale.setTo(5.5,2.2);
             var stock = this.stocks.create((game.world.width *.85) + (30 * h), game.world.height - 25, 'orangeStock');
             stock.anchor.setTo(.5,.5);
           }

         }

       }
       console.log("fighter made");
       //return this;
     }

    getleft(){
      if(this.testconnect == true){
        if(nescontroller._axes[1] == -1){
          return true;
        }
        else{
          return false;
        }
      }
      else if(this.controlnum < 0){
     		return this.controller1.leftpress;
     	}
     	else{
     		return this.controller1.left.isDown;
     	}

     }
    getright(){
     	if(this.testconnect == true){
        if(nescontroller._axes[1] == 1){
          return true;
        }
        else{
          return false;
        }
      }
      else if(this.controlnum < 0){
     		return this.controller1.rightpress;
     	}
     	else{
     		return this.controller1.right.isDown;
     	}

    }
    getup(){
     	if(this.testconnect == true){
        if(nescontroller._axes[5] == -1){
          return true;
        }
        else{
          return false;
        }
      }
      else if(this.controlnum < 0){
     		return this.controller1.uppress;
     	}
     	else{
     		return this.controller1.up.isDown;
     	}

     }
    getdown(){
     	if(this.testconnect == true){
            if(nescontroller._axes[5] == 1){
            return true;
            }
        else{
          return false;
        }
      }
      else if(this.controlnum < 0){
     		return this.controller1.downpress;
     	}
     	else{
     		return this.controller1.down.isDown;
     	}

    }
    geta(){
     	if(this.testconnect == true){
        return this.nespad.nessaButton;
      }
      else if(this.controlnum < 0){
     		return this.controller1.apress;
     	}
     	else{
     		return this.controller1.basic.isDown;
     	}

    }
    getb(){
     	if(this.testconnect == true){
        return this.nespad.nesbButton;
      }
      else if(this.controlnum < 0){
     		return this.controller1.bpress;
     	}
     	else{
     		return this.controller1.special.isDown;
     	}

    }
    getx(){
     	if(this.testconnect == true){
        return this.nespad.nesxButton;
      }
      else if(this.controlnum < 0){
     		return this.controller1.xpress;
     	}
     	else{
     		return this.controller1.shield.isDown;
     	}
    }
    gety(){
     	if(this.testconnect == true){
        return this.nespad.nesyButton;
      }
      else if(this.controlnum < 0){
     		return this.controller1.ypress;
     	}
     	else{
     		return this.controller1.jump.isDown;
     	}

    }

    punchStart () {
       console.log("Punch start");
       if(this.character.scale.x < 0) //If facing left, flip the angle of the hitbox
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
    punchEnd () {
       console.log("Punch end");
       this.attacking = false;
       this.deltDamage = false;
       this.inputLock = false;
       this.attack = '';
       this.basicCD = 15;
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
    dashStart()
    {
      this.character.alpha = 0.5;
      let direction;
      if (this.controller1.right.isDown)
      {
        direction = 1;
      }
      else if (this.controller1.left.isDown)
      {
        direction = -1;
      }
      else
      {
        direction = 0;
      }
      this.xZero = false;
      this.character.body.velocity.x = 500 * direction;
      //this.character.body.position.x += direction * 100;
      this.inputLock = true;
    }
    dashEnd()
    {
      this.aniIdle.play(10, false);
      this.character.alpha = 1;
      this.inputLock = false;
      this.xZero = true;
      this.dashCD = 60;
    }
    jumpKickTimer()
    {
      this.jumpKick.fire();
      this.character.body.velocity.x = 150 * this.character.scale.x;
      this.character.body.velocity.y = -100;
    }
    jumpKickTimer2()
    {
      this.xZero = true;
    }
    jumpKickStart()
    {
      this.attacking = true;
      this.attack = 'jumpKick';
      this.inputLock = true;
      this.xZero = false;
      game.time.events.add(Phaser.Timer.SECOND * .3, this.jumpKickTimer, this);
    }
    jumpKickEnd()
    {
      this.aniIdle.play(10, false);
      this.attacking = false;
      this.deltDamage = false;
      this.inputLock = false;
      game.time.events.add(Phaser.Timer.SECOND * .05, this.jumpKickTimer2, this);
      this.attack = '';
    }
    uppercutStart()
    {
       if(this.character.scale.x < 0) //If facing left, flip the angle of the hitbox
       {
         this.weaponUppercut.bulletAngleOffset = 40;
       }
       else {
          this.weaponUppercut.bulletAngleOffset = -40;
       }
      this.character.body.velocity.x = 50 * this.character.scale.x;
      this.character.body.velocity.y -= 400;
      this.attacking = true;
      this.attack = 'uppercut';
      this.weaponUppercut.fire();
      this.inputLock = true;
    }
    uppercutEnd()
    {
      this.aniIdle.play(10, false);
      this.attacking = false;
      this.deltDamage = false;
      this.inputLock = false;
      this.attack = '';
      this.uppercutCD = 60;
    }
    warlockTimer()
    {
      this.weaponKick.fire();
    }
    warlockStart()
    {
      this.xZero = false;
      this.inputLock = true;
      this.attacking = true;
      this.attack = 'warlock';
      this.character.body.velocity.x = 5 * this.character.scale.x;
      game.time.events.add(Phaser.Timer.SECOND * 1.15, this.warlockTimer, this);
    }

    warlockEnd()
    {
      //this.character.body.position.x += 200 * this.character.scale.x;
      //this.weaponKick.fire();
      this.aniIdle.play(10, false);
      this.attacking = false;
      this.deltDamage = false;
      this.attack = '';
      this.inputLock = false;
      this.warlockCD = 30;
      this.xZero = true;
    }
    shieldEnd()
    {
      this.aniIdle.play(10, false);
    }


    updateInput()
    {
    //Cooldown for attacks
    if (this.dashCD != 0)
    {
      this.dashCD -= 1;
    }
    if (this.uppercutCD != 0)
    {
      this.uppercutCD -= 1;
    }
    if (this.warlockCD != 0)
    {
      this.warlockCD -= 1;
    }
    if (this.basicCD != 0)
    {
      this.basicCD -= 1;
    }
    //Cooldown for hit stun
    if (this.stunCounter != 0)
    {
      this.stunCounter -= 1;
    }
      //update function to decrease/increase the hit velocity based on the original direction of the punch. The natural slowing down of hit velocity
    if(this.hitVelocity < 0)
    {
      this.hitVelocity += 1;
    }
    else if (this.hitVelocity > 0)
    {
      this.hitVelocity -= 1;
    }
    else
    {
      this.hitVelocity = 0;
    }


    //control logic for virtual keys DO NOT DELETE THIS
    /*
    if(this.controlnum == -1 || this.controlnum == -2 ){



      if (this.controller1.xpress && this.character.body.touching.down && this.stunCounter == 0 && this.hitVelocity == 0)
      {
          this.character.body.velocity.x = 0;
          this.character.animations.play('shield');
          this.shielding = true;
          if(this.character.hasItem) //If he has an item, THROW IT!
          {

            item1.throwItem(this);

            item1.user = null;
            item1.pickedUp = false;
            this.character.hasItem = false;

          }

      }
      else if (this.controller1.apress && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.hitCD == 0)
      {
          //logic to change direction facing
          if (this.character.scale.x < 0 ){
            this.character.body.velocity.x = -250 - this.moveSpeed;
          }
          else
          {
            this.character.body.velocity.x = 250 + this.moveSpeed;
          }
          this.character.animations.play('punch');
          this.weapon1.fire();
          //If really freaking close to item, and if he isnt holding something, use it!
          if((item1.xDistCheck(this.character) < 50) && (item1.yDistCheck(this.character) < 100) && !(this.character.hasItem) && (item1.user == null))
          {
            item1.user = this.character;
            item1.pickedUp = true;
            this.character.hasItem = true;
            console.log("close to item");


          }

          this.shielding = false;
          this.hitSwitchPunch = true;

      }
      else if (this.controller1.bpress == true && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.hitCD == 0)
      {
          //  Move to the right

          //logic to change direction facing
          if (this.character.scale.x < 0 ){
            this.character.body.velocity.x = -350 - this.moveSpeed;
          }
          else
          {
            this.character.body.velocity.x = 350 + this.moveSpeed;
          }
          this.character.animations.play('kick');
          //this.hitCD = 60;
          this.weapon1.fire();

          if(this.character.body.touching.down)
          {
            this.character.body.velocity.y = -200;
          }
          if(this.character.hasItem) //If he has an item, USE IT!
          {

            item1.useItem(this);

            item1.user = null;
            item1.pickedUp = false;
            this.character.hasItem = false;

          }
        this.shielding = false;
        this.hitSwitchKick = true;
      }

      else if (this.controller1.bpress && this.controller1.ypress)
      {
        console.log("Up Special");
      }
      else if (this.controller1.bpress && this.controller1.rightpress)
      {
        console.log("Right Special");
      }
      else if (this.controller1.bpress && this.controller1.leftpress)
      {
        console.log("Left Special");
      }
      else if (this.controller1.bpress && this.controller1.downpress)
      {
        console.log("Down Special");
      }
      else if (this.controller1.bpress)
      {
        console.log("Normal Special")
      }

      else if (this.controller1.ypress && this.jumps <= 5  && !(this.m < 120 && this.m != 0) && this.stunCounter == 0)
      {
          this.character.body.velocity.y = -350 + this.jumpSpeed;
          jumpSound.play();
          this.jumps += 1;
          this.shielding = false;
          this.character.animations.play('jump');
      }
      else if (this.controller1.leftpress && !(this.m < 120 && this.m != 0) && this.stunCounter == 0)
      {

          if(this.character.body.touching.down)
          {
            this.jumps = 0;
        }

          if (this.character.scale.x > 0 ){
          this.character.scale.x *=-1;
          this.weapon1.trackSprite(this.character, 28, -40, true);
          }
          if (this.character.body.touching.down)
          {
            this.character.body.velocity.x = -250 + this.hitVelocity;
          }
          else
          {
            this.character.body.velocity.x = -200 + this.hitVelocity;
          }
          //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
          if (this.hitVelocity != 0)
          {
            if (this.hitVelocity + -125 < 0){
              this.hitVelocity = 0;
            }
            else
            {
              this.hitVelocity += -125;
            }
          }
          console.log(this);
          this.character.animations.play('right');
          this.shielding = false;
      }
      else if (this.controller1.rightpress && !(this.m < 120 && this.m != 0) && this.stunCounter == 0)
      {
          //  Move to the right
          if(this.character.body.touching.down)
          {
            this.jumps = 0;
        }
          //logic to change direction facing
          if (this.character.scale.x < 0 ){
          this.character.scale.x *=-1;
          this.weapon1.trackSprite(this.character, 28, 40, true);
          }
          if (this.character.body.touching.down)
          {
            this.character.body.velocity.x = 250 + this.hitVelocity;
          }
          else
          {
            this.character.body.velocity.x = 200 + this.hitVelocity;
          }
          //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
          if (this.hitVelocity != 0)
          {
            if (this.hitVelocity + 125 > 0){
              this.hitVelocity = 0;
            }
            else
            {
              this.hitVelocity += 125;
            }
          }
          this.character.animations.play('right');
          this.shielding = false;
      }

      else
      {
          //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
        if (this.hitVelocity != 0)
        {
          this.character.body.velocity.x = this.hitVelocity;
        }
        else
        {
          this.character.body.velocity.x = 0;
        }
          if (this.stunCounter > 0)
          {
            this.character.animations.play('ko');
          }
          else
          {
            //this.character.animations.play('idle');
          }
          this.shielding = false;

          if(this.character.body.touching.down)
          {
            this.jumps = 0;
        }
      }
      if(this.controller1.apress && this.hitSwitchPunch)
      {
        this.hitCD = 15;
        this.hitSwitchPunch = false;
      }
      if (this.controller1.bpress && this.hitSwitchKick)
      {
        this.hitCD = 15;
        this.hitSwitchKick= false;
      }
        //console.log('end of vpad read');
    }*/   //DO NOT DELETE THIS


    //control logic for real keyboard
    //else if(this.controlnum > 0){   <- Change to this when controller above is put back in
    if(this.controlnum > -10){
    //console.log("inside real key check");


      //Shield logic
      if (this.getx() && this.character.body.touching.down && this.stunCounter == 0 && this.hitVelocity == 0 && !this.inputLock)
      {
          this.character.body.velocity.x = 0;
          this.character.animations.play('shield');
          this.shielding = true;
          if(this.character.hasItem) //If he has an item, THROW IT!
          {

            item1.throwItem(this);

            item1.user = null;
            item1.pickedUp = false;
            this.character.hasItem = false;

          }

      }
      //punch logic
      else if ( this.geta() && (this.getright() || this.getleft()) && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0)
      {

          //logic to change direction facing
          if (this.character.scale.x < 0 ){
            this.character.body.velocity.x = -250 + this.moveSpeed;
          }
          else
          {
            this.character.body.velocity.x = 250 + this.moveSpeed;
          }
          this.aniPunch.play(10, false);

          //this.hitCD = 30;
          this.shielding = false;
          this.hitSwitchPunch = true;
          //Causes Player health to increase
          //this.health += 1;
      }

      // Kick logic
      else if (this.geta() && this.getdown() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0)
      {
          //  Move to the right

          //logic to change direction facing
          if (this.character.scale.x < 0 ){
            this.character.body.velocity.x = -350 - this.moveSpeed;
          }
          else
          {
            this.character.body.velocity.x = 350 + this.moveSpeed;
          }
          this.aniKick.play(10, false);
          //this.hitCD = 60;
          //this.weapon1.fire();

          if(this.character.body.touching.down)
          {
            this.character.body.velocity.y = -200;
          }

        this.shielding = false;
        this.hitSwitchKick = true;
      }

      //Use item logic
      else if (this.geta() && this.getdown() == false && this.getright() == false && this.getleft() == false && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock && this.basicCD == 0)
      {
        //logic to change direction facing
          if (this.character.scale.x < 0 ){
            this.character.body.velocity.x = -250 + this.moveSpeed;
          }
          else
          {
            this.character.body.velocity.x = 250 + this.moveSpeed;
          }
          this.aniPunch.play(10, false);
          if(this.character.hasItem) //If he has an item, USE IT!
          {

            item1.useItem(this);

            item1.user = null;
            item1.pickedUp = false;
            this.character.hasItem = false;

          }
          //this.character.animations.play('punch');
          //this.weapon1.fire();

          //If really freaking close to item, and if he isnt holding something, use it!
          if((item1.xDistCheck(this.character) < 50) && (item1.yDistCheck(this.character) < 100) && !(this.character.hasItem) && (item1.user == null))
          {
            item1.user = this;
            item1.pickedUp = true;
            this.character.hasItem = true;
            console.log("close to item");
          }


          //this.hitCD = 30;
          this.shielding = false;
          this.hitSwitchPunch = true;
          //Causes Player health to increase
          //this.health += 1;
      }

      else if ( this.getb() && !this.inputLock && this.getup()  && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.uppercutCD == 0)
      {
      	//console.log("Up Special");
        this.aniUppercut.play(10, false);
      }
      else if ( this.getb() && !this.inputLock && this.getright() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.dashCD == 0)
      {
      	//console.log("Right Special");
        this.aniDash.play(5, false);
      }
      else if ( this.getb() && !this.inputLock && this.getleft() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.dashCD == 0)
      {
      	//console.log("Left Special");
        this.aniDash.play(5, false);
      }
      else if ( this.getb() && !this.inputLock && this.getdown() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0)
      {
      	//console.log("Down Special");
        this.aniJumpKick.play(7, false);
      }
      else if ( this.getb() && this.getleft() == false && this.getright() == false && this.getup() == false  && !this.inputLock && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && this.warlockCD == 0)
      {
      	//console.log("Normal Special")
        this.aniWarlock.play(3, false);
      }

      //TODO: downDuration is still here, but in merge conflict it was gone, POSSIBLY REMOVE downDuration
      else if (this.gety() && this.jumps <= 5  && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock)
      {
          this.character.body.velocity.y = -350 + this.jumpSpeed;
          jumpSound.play();
          this.jumps += 1;
          this.shielding = false;
          this.character.animations.play('jump');
      }
      else if (this.getleft() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock)
      {

          if(this.character.body.touching.down)
          {
            this.jumps = 0;
        }

          if (this.character.scale.x > 0 ){
          this.character.scale.x *=-1;
          this.weapon1.trackSprite(this.character, 30, -20, true);
          this.weaponKick.trackSprite(this.character, 50, -50, true);
          this.weaponUppercut.trackSprite(this.character, 30, -10, true);
          this.jumpKick.trackSprite(this.character, 50, -50, true);
          this.jumpKick.bulletSpeed = -150;
          }
          if (this.character.body.touching.down)
          {
            this.character.body.velocity.x = -250 + this.hitVelocity;
          }
          else
          {
            this.character.body.velocity.x = -200 + this.hitVelocity;
          }
          //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
          if (this.hitVelocity != 0)
          {
            if (this.hitVelocity + -125 < 0){
              this.hitVelocity = 0;
            }
            else
            {
              this.hitVelocity += -125;
            }
          }
          this.character.animations.play('right');
          this.shielding = false;
      }
      else if (this.getright() && !(this.m < 120 && this.m != 0) && this.stunCounter == 0 && !this.inputLock)
      {
          //  Move to the right
          if(this.character.body.touching.down)
          {
            this.jumps = 0;
        }
          //logic to change direction facing
          if (this.character.scale.x < 0 ){
          this.character.scale.x *=-1;
          this.weapon1.trackSprite(this.character, 30, 20, true);
          this.weaponKick.trackSprite(this.character, 50, 50, true);
          this.weaponUppercut.trackSprite(this.character, 30, 10, true);
          this.jumpKick.trackSprite(this.character, 50, 50, true);
          this.jumpKick.bulletSpeed = 150;
          }
          if (this.character.body.touching.down)
          {
            this.character.body.velocity.x = 250 + this.hitVelocity;
          }
          else
          {
            this.character.body.velocity.x = 200 + this.hitVelocity;
          }
          //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
          if (this.hitVelocity != 0)
          {
            if (this.hitVelocity + 125 > 0){
              this.hitVelocity = 0;
            }
            else
            {
              this.hitVelocity += 125;
            }
          }
          this.character.animations.play('right');
          this.shielding = false;
      }
      else
      {
          //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
        if (this.hitVelocity != 0)
        {
          this.character.body.velocity.x = this.hitVelocity;
        }
        else
        {
        	if (this.xZero)
        	{
        		this.character.body.velocity.x = 0;
        	}
        }
          if (this.stunCounter > 0)
          {
            this.character.animations.play('ko');
            //game.camera.shake(0.01,15);

            //If hit really hard, add a dust trail that depends on hit velocity
            if(this.hitVelocity > 350 || this.hitVelocity < -350)
            {
              this.dustTrail.fire();
              //game.camera.shake(0.04,50);
              game.camera.shake(0.04,20);
            }

          }
          else
          {
            //this.character.animations.play('idle');
          }
          this.shielding = false;

          if(this.character.body.touching.down)
          {
            this.jumps = 0;
        }
      }


    }
    //end of update input function
    }


  }

class lab extends Fighter {
    constructor(character,health,lives,startx,starty,controlnum) {

      super(character,health,lives,startx,starty,controlnum);
      this.character.body.gravity.y = 650;
      //console.log("we created the lab construtor");

        this.jumpSpeed = 25;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1; //250;
        this.attackDmg = 1;
        this.moveSpeed = 200;

    }
}

class dj extends Fighter {
    constructor(character,health,lives,startx,starty,controlnum) {

      super(character,health,lives,startx,starty,controlnum);
      this.character.body.gravity.y = 650;
      //console.log("we created the dj construtor");

        this.jumpSpeed = 75;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1;
        this.attackDmg = 1;
        this.moveSpeed = 250;

    }
}



var playState={


  hitPlayer1: function(attacking){
    //console.log('inside hitplayer1');
    let hitDmg = 0;
    console.log("attack: " + Player2.attack);
    if(!Player2.deltDamage && attacking && (game.physics.arcade.overlap(Player1.character, Player2.weapon1.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponKick.bullets) || game.physics.arcade.overlap(Player1.character, Player2.weaponUppercut.bullets) || game.physics.arcade.overlap(Player1.character, Player2.jumpKick.bullets)))
    {
      switch(Player2.attack)
      {
        case 'punch':
          console.log("Got to punch");
          hitDmg = 9;
          attackDistance = 2;
          break;
        case 'kick':
          hitDmg = 15;
          attackDistance = 10;
          break;
        case 'uppercut':
          hitDmg = 35;
          attackDistance = 70;
          break;
        case 'jumpKick':
          hitDmg = 10;
          attackDistance = 25;
          break;
        case 'warlock':
          hitDmg = 300;
          attackDistance = 300;
          break;
        default:
          console.log("No attacks went off, you have an error");
      }

console.log("hitDmg = " + hitDmg);

  	if (Player1.m == 0 && !Player1.shielding){
      hitSound.play();
      //game.time.slowMotion = 4.0;
  		Player1.health += hitDmg;
  		Player1.hitVelocity = Player2.character.scale.x * Player1.health * 2 + attackDistance;

           Player1.character.body.velocity.y = -(Math.pow(Player1.health, 1.25) + attackDistance);

          if (Player1.health >= 0 || Player1.health <= 75)
        	{
        		Player1.stunCounter = 60;
        	}
        	else if (Player1.health > 75 || Player1.health <= 150)
        	{
            Player1.stunCounter = 120;
        	}
        	else if(Player1.health > 150 || Player1.health < 200)
        	{
        		Player1.stunCounter = 300;
        	}
        	else
        	{
        		Player1.stunCounter = 450;
        	}
  	    }
        Player2.deltDamage = true;
     }
},

hitPlayer2: function(attacking){
  let hitDmg = 0;
  let attackDistance = 0;
  console.log("attack: " + Player1.attack)
  if(!Player1.deltDamage && attacking && (game.physics.arcade.overlap(Player2.character, Player1.weapon1.bullets) || game.physics.arcade.overlap(Player2.character, Player1.weaponKick.bullets) || game.physics.arcade.overlap(Player2.character, Player1.weaponUppercut.bullets) || game.physics.arcade.overlap(Player2.character, Player1.jumpKick.bullets)))
  {
    switch(Player1.attack)
    {
      case 'punch':
        console.log("Got to punch");
        hitDmg = 9;
        attackDistance = 2;
        break;
      case 'kick':
        hitDmg = 15;
        attackDistance = 10;
        break;
      case 'uppercut':
        hitDmg = 35;
        attackDistance = 70;
        break;
      case 'jumpKick':
        hitDmg = 10;
        attackDistance = 25;
        break;
      case 'warlock':
        hitDmg = 300;
        attackDistance = 300;
        break;
      default:
        console.log("No attacks went off, you have an error");
    }

console.log("hitDmg = " + hitDmg);
  	if (Player2.m == 0 && !Player2.shielding){
        hitSound.play();

  		Player2.health += hitDmg;
  		Player2.hitVelocity = Player1.character.scale.x * Player2.health * 2 + attackDistance;

       Player2.character.body.velocity.y = -(Math.pow(Player2.health, 1.25) + attackDistance);
       if (Player2.health >= 0 || Player2.health <= 75)
       {
         Player2.stunCounter = 60;
       }
       else if (Player2.health > 75 || Player2.health <= 150)
       {
         Player2.stunCounter = 120;
       }
       else if(Player2.health > 150 || Player2.health < 200)
       {
         Player2.stunCounter = 300;
       }
       else
       {
         Player2.stunCounter = 450;
       }
  	}
    Player1.deltDamage = true;
  }
},

yHitVelocity: function(Fighter)
{
  Fighter.character.body.velocity.y = -(Math.pow(Fighter.health, 1.25));
},

respawn: function(Fighter){
      game.time.events.add(Phaser.Timer.SECOND, this.playRespawnSound, this);
      Fighter.aniIdle.play(10, false);

      if(Fighter.controlnum == 1 ){
          console.log("controlnum = 1");
          Fighter.character.x = 200;
          Fighter.character.y = 230;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
          Fighter.inputLock = false;
      }

      else if(Fighter.controlnum == 2 ){
          console.log("controlnum = 2");
          Fighter.character.x = 600;
          Fighter.character.y = 230;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
          Fighter.inputLock = false;
      }

      else if(Fighter.controlnum == -1 ){
          console.log("controlnum = -1");
          //Fighter.character.body.position.x = 200;
          Fighter.character.x = 200;
          Fighter.character.y = 230;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
          Fighter.inputLock = false;
      }
      else if(Fighter.controlnum == -2 ){
          console.log("controlnum = -2");
          //Fighter.character.body.position.x = 200;
          Fighter.character.x = 600;
          Fighter.character.y = 230;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
          Fighter.inputLock = false;
      }

      Fighter.health = 0;
      Fighter.lives += -1;
      Fighter.character.body.velocity.x = 0;
      Fighter.character.body.velocity.y = 0;
      Fighter.hitVelocity = 0;
  },

  respawnEvent: function(Fighter){
    //Respawn Switch is activated during the KO function
    if (Fighter.respawnSwitch == true){
    Fighter.m += 1;
    //Invisible moment
    if (Fighter.m < 60 && Fighter.m != 0){
      Fighter.character.body.gravity.y = 0;
      Fighter.character.body.velocity.x = 0;
      Fighter.hitVelocity = 0;
      Fighter.character.visible = false;
    }
    //Book Crashing down Animation
    else if(Fighter.m >= 60 && Fighter.m < 120){
      Fighter.character.body.gravity.y = 400;
      Fighter.character.body.velocity.x = 0;
      Fighter.hitVelocity = 0;
      Fighter.character.visible = true;
    }
    else{
      Fighter.character.body.gravity.y = 650;
    }
    //Makes character alpha to signify invulnerability
    if (Fighter.m <= 300){
      if (Fighter.m % 20 <= 5){
        Fighter.character.alpha = 1;
      }
      else {
        Fighter.character.alpha = 0.5;
      }

    }
    else{
      Fighter.character.alpha = 1;
      Fighter.m = 0;
      Fighter.respawnSwitch = false;
    }
  }
  },


playerHitStun: function(Fighter)
{
	if (Fighter.health >= 0 || Fighter.health <= 75)
	{
		Fighter.stunCounter = 15;
	}
	else if (Fighter.health > 75 || Fighter.health <= 150)
	{
		Fighter.stunCounter = 45;
	}
	else if(Fighter.health > 150 || Fighter.health < 200)
	{
		Fighter.stunCounter = 90;
	}
	else
	{
		Fighter.stunCounter = 150;
	}
},

  KO:function(Fighter){
      if(Fighter.character.body.position.x < -50 || Fighter.character.body.position.x > 900){
        Fighter.character.hasItem = false;
         deathSound.play();
         this.respawn(Fighter);
         var live = Fighter.stocks.getFirstAlive();
         if(live)
         {
           live.kill();
         }

         if(multimanmode == true){
            multimenko++;
         }
      }
      else if(Fighter.character.body.position.y > 700 || Fighter.character.body.position.y < -100){
        Fighter.character.hasItem = false;
         deathSound.play();
         this.respawn(Fighter);

         var live = Fighter.stocks.getFirstAlive();
         if(live)
         {
           live.kill();
         }
         if(multimanmode == true){
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

 create: function() {

      //  We're going to be using physics, so enable the Arcade Physics system
      w= 800;
      h = 600;
      game.time.advancedTiming = true;

      //create a timer for the game
      timer = game.time.create(false);
      timerEvent = timer.add(Phaser.Timer.MINUTE * gameMinutes + Phaser.Timer.SECOND * gameSeconds, this.timeOutGame, this);
      timer.start();

      var esckey= game.input.keyboard.addKey(Phaser.Keyboard.ESC);
      esckey.onDown.addOnce(this.timeOutGame);

      //Play music
      music = game.add.audio('allstar');
      music.volume = 0.5;
      music.loopFull();


      //Camera tests
      stagecam = new cam(40, 350, 1200, 1000);


      if(chosenStageName == 'marstonPic')
      {


      //Background for our game
      game.add.sprite(0, 0, 'sky');

      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = game.add.group();

      //  Enable physics for any object that is created in this group
      platforms.enableBody = true;
      platforms.friction = 100;

      // Create the ground.
      var ground = platforms.create(110, game.world.height - 100, 'ground');

      //  Scale it to fit the width of the game (the original sprite is ? in size)
      ground.scale.setTo(18, 1);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

    }
    else
    {

      //Background for our game
      game.add.sprite(0, 0, 'sky');

      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = game.add.group();
      miniPlatforms = game.add.group();

      //  Enable physics for any object that is created in this group
      platforms.enableBody = true;
      miniPlatforms.enableBody = true;

      // Create the ground.
      var ground = platforms.create(110, game.world.height - 100, 'ground');
      var plat1 = miniPlatforms.create(110, game.world.height - 250, 'ground');
      var plat2 = miniPlatforms.create(game.world.width - 300, game.world.height - 250, 'ground');
      plat1.body.collideWorldBounds = true;
      plat2.body.collideWorldBounds = true;
      plat1.body.checkCollision.down = false;
      plat2.body.checkCollision.down = false;
      plat1.body.immovable = true;
      plat2.body.immovable = true;


      plat1.scale.setTo(4,1);
      plat2.scale.setTo(4,1);

      //  Scale it to fit the width of the game (the original sprite is ? in size)
      ground.scale.setTo(16, 1);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;


      /*
      chosenMap = game.add.tilemap('tilemap1');
      console.log(chosenMap);
      chosenMap.addTilesetImage('floor', 'hitboxTest');
      let layer = chosenMap.createLayer('Tile Layer 1');
      layer.resizeWorld();
      chosenMap.setCollisionBetween(37, 62);
      */
    }

hitSound = game.add.audio('hitSound');
respawnSound = game.add.audio('respawnSound');
deathSound = game.add.audio('deathSound');
jumpSound = game.add.audio('jumpSound');
itemSound = game.add.audio('itemSound');
buttonSound = game.add.audio('buttonSound');
buttonSound.volume -= .5;

if(game.device.android || game.device.iOS)
{
  //If on mobile, use the vpad as input for player 1,
  controlOptionVpad = -1;
}
else {
  //If on desktop, do not use virtual inputs for player 1.
  controlOptionVpad = 1;
}

if(charName1 == 'dude')
{
  Player1 =  new dj(charName1,  0, 3, game.world.width*0.25,game.world.height*0.5,controlOptionVpad);
  console.log(Player1);
  console.log("Player 1 is dj");
}
else if(charName1 == 'chick')
{
  Player1 =  new lab(charName1,  0, 3, game.world.width*0.25,game.world.height*0.5,controlOptionVpad);
  console.log("Player 1 is lab");
}
else
{
  Player1 =  new lab(charName1,  0, 3, game.world.width*0.25,game.world.height*0.5,controlOptionVpad);
  console.log("Player 1 is lab");
}

if(charName2 == 'dude')
{
  Player2 =  new dj(charName2,  0, 3, game.world.width*0.75,game.world.height*0.5, controlOptionAI);
  console.log("Player 2 is dj");
}
else if(charName2 == 'chick')
{
  Player2 =  new lab(charName2,  0, 3, game.world.width*0.75,game.world.height*0.5, controlOptionAI);
  console.log("Player 2 is lab");
}
else
{
  Player2 =  new lab(charName2,  0, 3, game.world.width*0.75,game.world.height*0.5, controlOptionAI);
  console.log("Player 2 is lab");
}



if(multimanmode == true){
    Player3 =  new lab(charName2,  0, 3, game.world.width*0.5,game.world.height*0.5, controlOptionAI);
    console.log("Player 3 is lab");

    Player4 =  new lab(charName2,  0, 3, game.world.width*0.62,game.world.height*0.5, controlOptionAI);
    console.log("Player 4 is lab");
}

//event listener for player1 touch controls
//console.log("test print");

//console.log(Player1.controlnum);

//Create an item
item1 = new Item('bottle', game.world.width * .5, game.world.height * .5, this);


if(Player1.controlnum == -1){
  //console.log("virtual buttons are made buttons");
  Player1.controller1.buttonleft = game.add.button(5, 472, 'leftButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonleft.events.onInputOver.add(function(){Player1.controller1.leftpress = true;});
  Player1.controller1.buttonleft.events.onInputOut.add(function(){Player1.controller1.leftpress = false;});
  Player1.controller1.buttonleft.events.onInputDown.add(function(){Player1.controller1.leftpress = true;});
  Player1.controller1.buttonleft.events.onInputUp.add(function(){Player1.controller1.leftpress = false;});

  //Right button
  Player1.controller1.buttonright = game.add.button(105, 472, 'rightButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonright.events.onInputOver.add(function(){Player1.controller1.rightpress = true;});
  Player1.controller1.buttonright.events.onInputOut.add(function(){Player1.controller1.rightpress = false;});
  Player1.controller1.buttonright.events.onInputDown.add(function(){Player1.controller1.rightpress = true;});
  Player1.controller1.buttonright.events.onInputUp.add(function(){Player1.controller1.rightpress = false;});

  //Up button
  Player1.controller1.buttonup = game.add.button(55, 412, 'upButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonup.events.onInputOver.add(function(){Player1.controller1.uppress = true;});
  Player1.controller1.buttonup.events.onInputOut.add(function(){Player1.controller1.uppress = false;});
  Player1.controller1.buttonup.events.onInputDown.add(function(){Player1.controller1.uppress = true;});
  Player1.controller1.buttonup.events.onInputUp.add(function(){Player1.controller1.uppress = false;});

  //Down button
  Player1.controller1.buttondown = game.add.button(55, 535, 'downButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttondown.events.onInputOver.add(function(){Player1.controller1.downpress = true;});
  Player1.controller1.buttondown.events.onInputOut.add(function(){Player1.controller1.downpress = false;});
  Player1.controller1.buttondown.events.onInputDown.add(function(){Player1.controller1.downpress = true;});
  Player1.controller1.buttondown.events.onInputUp.add(function(){Player1.controller1.downpress = false;});


  //A button
  Player1.controller1.buttona = game.add.button(685, 425, 'aButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttona.events.onInputOver.add(function(){Player1.controller1.apress = true;});
  Player1.controller1.buttona.events.onInputOut.add(function(){Player1.controller1.apress = false;});
  Player1.controller1.buttona.events.onInputDown.add(function(){Player1.controller1.apress = true;});
  Player1.controller1.buttona.events.onInputUp.add(function(){Player1.controller1.apress = false;});

  //B button
  Player1.controller1.buttonb = game.add.button(735, 475, 'bButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonb.events.onInputOver.add(function(){Player1.controller1.bpress = true;});
  Player1.controller1.buttonb.events.onInputOut.add(function(){Player1.controller1.bpress = false;});
  Player1.controller1.buttonb.events.onInputDown.add(function(){Player1.controller1.bpress = true;});
  Player1.controller1.buttonb.events.onInputUp.add(function(){Player1.controller1.bpress = false;});

  //X button
  Player1.controller1.buttonx = game.add.button(635, 475, 'xButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttonx.events.onInputOver.add(function(){Player1.controller1.xpress = true;});
  Player1.controller1.buttonx.events.onInputOut.add(function(){Player1.controller1.xpress = false;});
  Player1.controller1.buttonx.events.onInputDown.add(function(){Player1.controller1.xpress = true;});
  Player1.controller1.buttonx.events.onInputUp.add(function(){Player1.controller1.xpress = false;});

  //Y button
  Player1.controller1.buttony = game.add.button(685, 525, 'yButton', null, this, 0, 1, 0, 1);
  Player1.controller1.buttony.events.onInputOver.add(function(){Player1.controller1.ypress = true;});
  Player1.controller1.buttony.events.onInputOut.add(function(){Player1.controller1.ypress = false;});
  Player1.controller1.buttony.events.onInputDown.add(function(){Player1.controller1.ypress = true;});
  Player1.controller1.buttony.events.onInputUp.add(function(){Player1.controller1.ypress = false;});

  //end of event listeners


  //controller1
  testconnect1 = false;



  }



      //mob = new crowd(0,0);


      healthtext1 = game.add.text(0, game.world.height - 75, `DMG ${Player1.health}`,Player1.fighterStyle);
      healthtext1.stroke = '#ffffff';
      healthtext1.strokeThickness = 4;

      healthtext2 = game.add.text(650, game.world.height - 75, `DMG ${Player2.health}`,Player2.fighterStyle);
      healthtext2.stroke = '#ffffff';
      healthtext2.strokeThickness = 4;

      //livetext1 = game.add.text(0, game.world.height - 50, ``,style2);

      //livetext2 = game.add.text(650, game.world.height - 50, `Lives ${Player2.lives}`,style2);
      //livetext2 = game.add.text(650, game.world.height - 50, ``,style2);

      nameText1 = game.add.text(0, 0, "P1", style);
      nameText2 = game.add.text(0, 0, "P2", style);


      //Pause
      pauseLabel = game.add.text(game.world.width * .5, game.world.height * .15, 'Pause', {font: '50px Arial',fill: '#ffffff'});
      pauseLabel.anchor.setTo(.5,.5);
      pauseLabel.inputEnabled = true;
      pauseLabel.events.onInputUp.add(function() {
        game.paused = true;
        //Pause menu
        pauseMenu = game.add.sprite(game.world.width * .5, game.world.height *.5, 'menuButton');
        pauseMenu.anchor.setTo(.5,.5);

        choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue, click center to quit', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
      });
      game.input.onDown.add(unpause, self);
      function unpause(event)
      {
        //only act if isPaused
        if(game.paused)
        {
          //Calculate corners of menu button
          var x1 = game.world.width * .5 - 50;
          var x2 = game.world.width * .5 + 50;
          var y1 = game.world.height * .5 - 30;
          var y2 = game.world.height * .5 + 30;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )
            {
                music.stop();
                buttonSound.play();
                game.state.start('menu');
                pauseMenu.destroy();
                choiseLabel.destroy();

                // Unpause the game, required to actually jump to the menu
                game.paused = false;
                console.log('inside menu');
            }
            else {
              	// Remove the menu and the label
                pauseMenu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }

      };


timerText = game.add.text(game.world.width * .5, 40,`Time: ${timer.duration}`,{font: '40px Arial',fill: '#000000'});
timerText.anchor.setTo(.5,.5);

  },

  formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    playRespawnSound: function()
    {
      respawnSound.play();
    },

  timeOutGame: function()
  {
    timer.stop();
    game.state.start('win');
  },



  update: function() {
    //console.log('Inside update function');
    //console.log("controlOptionAI: " + controlOptionAI);
    game.physics.arcade.overlap(Player1.character, this.win, this.Win, null, this);
    game.physics.arcade.overlap(Player2.character, this.win, this.Win, null, this);

    //  Collide the players with the platforms and eachother
    if(chosenStageName == 'westPic')
    {
	    if (Player1.getdown())
	    {
	    	Player1.character.body.immovable = false;
	    }
	    else
	    {
	    	game.physics.arcade.collide(Player1.character, miniPlatforms);
	    }
	    if (Player2.getdown())
	    {
	    	Player2.character.body.immovable = false;
	    }
	    else
	    {
	    	game.physics.arcade.collide(Player2.character, miniPlatforms);
	    }
    }
    
    game.physics.arcade.collide(Player1.character, platforms);
    game.physics.arcade.collide(Player2.character, platforms);
    game.physics.arcade.collide(Player1.character,Player2.character);
    //add physics for item (eventually just add items to a group and use collision detection for the group)
    game.physics.arcade.collide(item1.type, platforms, item1.onGround());

    if(multimanmode == true){
        game.physics.arcade.collide(Player3.character, platforms);
        game.physics.arcade.collide(Player4.character, platforms);
        game.physics.arcade.collide(Player1.character, Player3.character);
        game.physics.arcade.collide(Player1.character, Player4.character);

    }

    //Player1.nespad.connectgamepad();
    //console.log(Player1.nespad.nescontroller.aButton);

    //console.log(Player1.nespad.testconnect);
    //console.log(Player1.nespad.nescontroller.getButton(Phaser.Gamepad.BUTTON_3));

    //using overlap to calculate the knockback when an item is thrown since we dont want the items trajectory to change
    //This is always colliding? even when i replace it with random stuff like player1.weapon1.bullets

    if(item1.user)
    {
      console.log('item1.user.controlnum: '+ item1.user.controlnum);
      console.log('item1.thrown: ' + item1.thrown);
      console.log('item1.active: ' + item1.active);

    }

    //Item Collision, makes sure that the item you hold doesnt hit you when you throw it, but only hits the other person
    //Item must be active(can only hit you once), and thrown for the collision to go off
    if(item1.thrown && item1.getActive() && item1.getThrown())
    {

      if(item1.previousUser.controlnum == Player1.controlnum && !Player2.respawnSwitch) //if the user is the the person colliding with the item(Player1)
      {
        game.physics.arcade.overlap(Player2.character, item1.type, item1.itemCollision(Player2), null, this);
      }
      else if(item1.previousUser.controlnum == Player2.controlnum && !Player1.respawnSwitch) //if the user is the the person colliding with the item(Player2)
      {
        game.physics.arcade.overlap(Player1.character, item1.type, item1.itemCollision(Player1), null, this);
      }
    }


    //hitbox collision for player 2, we pass the type of hit into the hit player function
    if(Player1.attacking)
    {
      game.physics.arcade.overlap(Player1.weapon1.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
      game.physics.arcade.overlap(Player1.weaponKick.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
      game.physics.arcade.overlap(Player1.weaponUppercut.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
      game.physics.arcade.overlap(Player1.jumpKick.bullets, Player2.character, this.hitPlayer2(Player1.attacking));
    }
    else if(Player2.attacking)
    {
      //hitbox collision for player 1, we pass the type of hit into the hit player function
  	  game.physics.arcade.overlap(Player2.weapon1.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player2.weaponKick.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player2.weaponUppercut.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player2.jumpKick.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
    }

    else if(multimanmode)
    {
      if(Player3.attacking)
      {
      //hitbox collision for player 1, we pass the type of hit into the hit player function
      game.physics.arcade.overlap(Player3.weapon1.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player3.weaponKick.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player3.weaponUppercut.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
    }
    else if(Player4.attacking)
    {
      //hitbox collision for player 1, we pass the type of hit into the hit player function
      game.physics.arcade.overlap(Player4.weapon1.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player4.weaponKick.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
      game.physics.arcade.overlap(Player4.weaponUppercut.bullets, Player1.character, this.hitPlayer1(Player2.attacking));
    }
    }


    //Name tag align/follow
    nameText1.alignTo(Player1.character, Phaser.TOP, 16);
    nameText2.alignTo(Player2.character,Phaser.TOP, 16);

    //item align/follow
    if(item1.type != null)
    {
      if(item1.inAir)
      {
        item1.angle += 5;
      }
      else
      {
        item1.alignToTarget();
      }

    }






    if(controlOptionAI == -2)
    {

      this.AIplay(Player1, Player2);

    //Multiman mode on so AI controls 2 additional fighters
      if(multimanmode == true){
            this.AIplay(Player1, Player3);
            this.AIplay(Player1, Player4);
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
    if(multimanmode == true){
    this.KO(Player3);
    this.KO(Player4);
    }

    this.respawnEvent(Player1);
    this.respawnEvent(Player2);
    if(multimanmode == true){
        this.respawnEvent(Player3);
        this.respawnEvent(Player4);
    }



    //If out of lives, end the game
    if(Player1.lives == 0)
    {
      game.state.start('win');
      if(multimanmode == true){
            console.log("# of KOs in multiman mode:");
            console.log(multimenko);
         }
    }
    if(Player2.lives == 0)
    {
      game.state.start('win');
    }

  timerText.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));

  //stagecam.updatecamera(Player1,Player2,100,100,800,600);


  },

//actually is the win function
  start: function(){
   game.state.start('win');

 },

 //AI idea
  AIdistcheck: function(Fighter1,Fighter2){
  //Fighter.character.body.position.x < -50

  AIxdist = Fighter2.character.body.position.x -Fighter1.character.body.position.x;
  AIydist =  Fighter2.character.body.position.y -Fighter1.character.body.position.y;
  if(AIxdist > 50){
  	Fighter2.character.body.velocity.x = -150;
  	//controller2.right.isDown == true;
  	console.log("AI should be moving left");
  }
  else if(AIxdist < -50){
  	//controller2.left.isDown == true;
  	Fighter2.character.body.velocity.x = 150;
  	//controller2.right.isDown == true;
  	console.log("AI should be moving right");
  }

  if(AIydist > 100){
  	console.log("jump?");
  	Fighter2.character.body.velocity.y = -100;
  }

 },


attackMode: function(Fighter,AIxdist,AIydist){
	//aggressive ai behavior mode

    if(AIxdist > 50){

	  	//console.log("AI should be moving left");
	  	Fighter.controller1.leftpress = true;
  		Fighter.controller1.rightpress = false;
  	}
  	else if(AIxdist < -50){

  		//console.log("AI should be moving right");
  		Fighter.controller1.leftpress = false;
  		Fighter.controller1.rightpress = true;
    }
    else{
    	Fighter.controller1.leftpress = false;
  		Fighter.controller1.rightpress = false;
    }

},


defendMode: function(Fighter,AIxdist,AIydist){
	//defensive behavior mode
	if(AIxdist < 150 && AIxdist > 0 || AIxdist < -250 ){

	  	//console.log("AI should be keeping right");
	  	Fighter.controller1.leftpress = false;
  		Fighter.controller1.rightpress = true;
  	}
  	else if(AIxdist > -150 && AIxdist < 0 || AIxdist > 250){

  		//console.log("AI should be keeping left");
  		Fighter.controller1.leftpress = true;
  		Fighter.controller1.rightpress = false;
    }
    else{
    	Fighter.controller1.leftpress = false;
  		Fighter.controller1.rightpress = false;

  		Fighter.controller1.ypress = false;
    }

},

defendMode2: function(Fighter,AIxdist,AIydist){
	//defensive behavior mode2, try to stay close to center of stage
	if(Fighter.character.body.position.x < 200 ){

	  	//console.log("AI should be keeping right");
	  	Fighter.controller1.leftpress = false;
  		Fighter.controller1.rightpress = true;
  	}
  	else if(Fighter.character.body.position.x > 400){

  		//console.log("AI should be keeping left");
  		Fighter.controller1.leftpress = true;
  		Fighter.controller1.rightpress = false;
    }
    else{
    	Fighter.controller1.leftpress = false;
  		Fighter.controller1.rightpress = false;

  		Fighter.controller1.ypress = false;
    }

},

AIplay: function(Fighter1, Fighter2){

	AIxdist = Fighter2.character.body.position.x -Fighter1.character.body.position.x;
	AIydist = Fighter2.character.body.position.y -Fighter1.character.body.position.y;


	//if AIxdist is > 0 then fighter2 is on right, fighter 1 on left
	//if AIxdist is < 0 then fighter2 is on left, fighter 1 on right

	//random number generator
	react = Math.floor((Math.random() * 1000) + 1);

	if(react < 10){
		console.log("Behavior switch!");

		//console.log(Fighter2.AImode);

		Fighter2.AImode = Fighter2.AImode * -1;
	}
	if(react >100){
		Fighter1.leftpress = false;
  		Fighter1.rightpress = false;
		Fighter1.uppress = false;
		Fighter1.downpress = false;

	    Fighter1.apress = false;//regular attack button
   	    Fighter1.bpress = false;//special button
		Fighter1.xpress = false;//jump button
		Fighter1.ypress = false;//block button
		console.log("reacting to nothing");
		return;
	}


	  //attack logic
	if(AIxdist < 60 && AIxdist > 0 ){
	  	Fighter2.controller1.apress = true;
	}
	else if(AIxdist > -60 && AIxdist < 0){
	    Fighter2.controller1.apress = true;
	}
	else{
	  	Fighter2.controller1.apress = false;
	  	Fighter2.controller1.apress = false;
	}


	  //jump logic
	/*
	if(AIydist > 100 || Fighter2.character.body.position.y < 40){
	  	//Fighter2.controller1.ypress = true;
	}
	else{
	  	Fighter2.controller1.ypress = false;
	}
	*/

    //General movement/walk behavior


    if(Fighter2.AImode == 1){
	    //aggresive behavior

	    //attackMode(Fighter2,AIxdist,AIydist);


	if(AIxdist > 50){

	  	//console.log("AI should be moving left");
	  	//console.log(Fighter2.controller1.leftpress);
	  	//console.log( (Fighter2.controller1.left.isDown || Fighter2.controller1.leftpress)  && !(Fighter2.m < 120 && Fighter2.m != 0) && Fighter2.stunCounter == 0 && Fighter2.inputLock == false );
	  	//console.log("LEFT PRESS: " + Fighter2.getleft());
      Fighter2.controller1.leftpress = true;

	  	//console.log( Fighter2.getleft()  && !(Fighter2.m < 120 && Fighter2.m != 0) && Fighter2.stunCounter == 0 && Fighter2.inputLock == false );
      console.log("Fighter2.controller1.leftpress: " + Fighter2.controller1.leftpress);
      //console.log( Fighter2.getleft()  && !(Fighter2.m < 120 && Fighter2.m != 0) && Fighter2.stunCounter == 0 && !Fighter2.inputLock );
      //console.log(Fighter2.getleft());


      Fighter2.updateInput();
  		Fighter2.controller1.rightpress = false;

  	}
  	else if(AIxdist < -50){

  		console.log("AI should be moving right");
  		Fighter2.controller1.leftpress = false;
  		Fighter2.controller1.rightpress = true;
    }
    else{
    	Fighter2.controller1.leftpress = false;
  		Fighter2.controller1.rightpress = false;
    	Fighter2.controller1.ypress = false;
    }


	}
	else if(Fighter2.AImode == -10){
	    //defensive behavior1
	    //defendMode(Fighter2, AIxdist, AIydist);


	if(AIxdist < 150 && AIxdist > 0 || AIxdist < -250 ){

	  	//console.log("AI should be keeping right");
	  	Fighter2.controller1.leftpress = false;
  		Fighter2.controller1.rightpress = true;
  	}
  	else if(AIxdist > -150 && AIxdist < 0 || AIxdist > 250){

  		//console.log("AI should be keeping left");
  		Fighter2.controller1.leftpress = true;
  		Fighter2.controller1.rightpress = false;
    }
    else{
    	Fighter2.controller1.leftpress = false;
  		Fighter2.controller1.rightpress = false;

  		Fighter2.controller1.ypress = false;
    }

	}
	else if(Fighter2.AImode == -1){

	    //defensive behavior2
	    //defendMode(Fighter2, AIxdist, AIydist);


		if(Fighter2.character.body.position.x < 300 ){

		  	//console.log("AI should be keeping right");
		  	Fighter2.controller1.leftpress = false;
	  		Fighter2.controller1.rightpress = true;
	  	}
	  	else if(Fighter2.character.body.position.x > 400){

	  		//console.log("AI should be keeping left");
	  		Fighter2.controller1.leftpress = true;
	  		Fighter2.controller1.rightpress = false;
	    }
	    else{
	    	Fighter2.controller1.leftpress = false;
	  		Fighter2.controller1.rightpress = false;

	  		Fighter2.controller1.ypress = false;
	    }

	}



	//avoid going out of bounds
	if(Fighter2.character.body.position.x < 250){
		Fighter2.controller1.rightpress = true;
		Fighter2.controller1.ypress = true;
		//console.log("Avoid left bound");
	}
	else if(Fighter2.character.body.position.x > 650){
		Fighter2.controller1.leftpress = true;
		Fighter2.controller1.ypress = true;
		//console.log("Avoid right bound");
	}
	else{
		//temporary fix need to remove later
  		//Fighter2.controller1.leftpress = false;
  		//Fighter2.controller1.rightpress = false;
    }

},

// function to control the moving mob hazard in marston stage
crowdupdate: function(){
	// modify x direction of mob
    if(mob.crowdsprite.body.position.x < 50){
     if(mob.crowdsprite.scale.x > 0 ){
        mob.crowdsprite.scale.x *=-1;
        mob.people.trackSprite(mob.crowdsprite, 10, -30, true);
        mob.people.bulletSpeed = 0;
        }
        mob.crowdsprite.body.velocity.x = 200;
    }
    else if(mob.crowdsprite.body.position.x > 600){
        if(mob.crowdsprite.scale.x < 0 ){
        mob.crowdsprite.scale.x *=-1;
        mob.people.trackSprite(mob.crowdsprite, 10, 30, true);
        mob.people.bulletSpeed =0;
        }
        mob.crowdsprite.body.velocity.x = -200;
    }

    // modify y direction of mob
    if(mob.crowdsprite.body.position.y < 100){
        mob.crowdsprite.body.velocity.y = 200;
    }
    else if(mob.crowdsprite.body.position.y > 500){
        mob.crowdsprite.body.velocity.y = -200;
    }
    mob.people.fire();
}

};
