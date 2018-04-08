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

class Item
{
  constructor(type, startx, starty)
    {
    this.type = game.add.sprite(startx, starty, type);
    game.physics.arcade.enable(this.type);
    this.type.body.bounce.y = 0;//0.2;
    this.type.body.gravity.y = 400;
    this.type.body.collideWorldBounds = false;
    this.pickedUp = false;
    this.user = null; //Will be a sprite
    }
    useItem (target) { //Only call if item has a user and is pickedUp
      //When you use the item, first check the type of item used, then do the approipiate action
      if(this.pickedUp && this.user != null)
      {
        console.log("Used item!")
        console.log(this);
        if(this.type.key == 'bottle') //heal the player and destroy bottle
        {
          itemSound.play();
          this.type.destroy();
          this.type = null;
          target.health += 10;
          game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this);
        }
      }
    }
    spawnItem() {
      //Called after a timer goes off to reassign type and change position of item (allows for a reusable item)
      //For now, respawn it default as a bottle
        this.type = game.add.sprite(game.world.width * .5, game.world.height*.5, 'bottle');
        game.physics.arcade.enable(this.type);
        this.type.body.bounce.y = 0;//0.2;
        this.type.body.gravity.y = 400;
        this.type.body.collideWorldBounds = false;
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
    {
      if(this.user == null)
      {
        //Can't follow anything, no user
      }
      else
      {

          this.type.body.position.x = this.user.body.position.x;
          this.type.body.position.y = this.user.body.position.y;

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

class Fighter {
  constructor(character,health,lives,startx,starty,controlnum) {


       this.character = game.add.sprite(startx, starty, character);//player character variable to access sprite from phaser and all its properties character variable is name of spritesheet to use
       this.health = health;//player start health
       this.lives = lives;

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

       this.state = 0; //player state for state machine?

       this.jumps = 0;

       this.character.anchor.setTo(0.5,0);

           //  We need to enable physics on the player
       game.physics.arcade.enable(this.character);

       //  Player physics properties. Give the little guy a slight bounce.
       this.character.body.bounce.y = 0;//0.2;
       this.character.body.gravity.y = 1000;
       this.character.body.collideWorldBounds = false;


	   this.character.body.setSize(30, 70, 10, 0)
	   this.character.scale.x = 1.25;
       this.character.scale.y = 1.25;

       //Player animations

	     this.character.animations.add('right', [ 3,4,5,6,7], 10, true);

       //idle animation
       this.character.animations.add('idle', [5, 6], 5, true);

       //jump animation
       this.character.animations.add('jump', [13, 14], 5, false); //need to adjust animation speed

       //shield animation
       this.character.animations.add('shield', [10], 5, false);

       //punch animations
       this.character.animations.add('punch', [6, 7, 8], 10, false);

       //kick
       this.character.animations.add('kick', [11, 12, 12, 12], 10, false);

       //player got hit animation
       this.character.animations.add('ko', [12], 5, false);


       //this.controller1 = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'punch': Phaser.KeyCode.T, 'kick': Phaser.KeyCode.R});

    if(controlnum == 1)
     {
      //controller1 = new Object;
      this.controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.E, 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D , 'punch': Phaser.KeyCode.T, 'kick': Phaser.KeyCode.R, 'shield': Phaser.KeyCode.Y, 'special': Phaser.KeyCode.F});
     }
    else if(controlnum == 2)
     {
     //controller1 = new Object;
     this.controller1 = game.input.keyboard.addKeys({ 'jump': Phaser.KeyCode.I, 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT , 'punch': Phaser.KeyCode.P, 'kick': Phaser.KeyCode.O, 'shield': Phaser.KeyCode.OPEN_BRACKET, 'special': Phaser.KeyCode.J});
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
       this.weapon1.trackSprite(this.character, 28, 40, true);

       this.stocks = game.add.group();
//Stocks will now match up to character selected
       for (var g = 3; g > 0; g--)
       {

         if(controlnum == -1) //For the vpad
         {
           if(charName1 == 'dude')
           {
             var stock = this.stocks.create((game.world.width *.42) + (30 * g) + -300, 100, 'player2cssIcon');
             stock.anchor.setTo(.5,.5);
           }
           else if(charName1 == 'chick')
           {
             var stock = this.stocks.create((game.world.width *.42) + (30 * g) + -300, 100, 'player1cssIcon');
             stock.anchor.setTo(.5,.5);
           }
         }
         else if(controlnum == 1)
         {
           if(charName1 == 'dude')
           {
             var stock = this.stocks.create((game.world.width *.42) + (30 * g) + -300, 100, 'player2cssIcon');
             stock.anchor.setTo(.5,.5);
           }
           else(charName1 == 'chick')
           {
             var stock = this.stocks.create((game.world.width *.42) + (30 * g) + -300, 100, 'player1cssIcon');
             stock.anchor.setTo(.5,.5);
           }
         }
      }
      for(var h = 0; h < 3; h++)
      {
         if(controlnum == 2)
         {
           if(charName2 == 'dude') //dude is blue, chick is orange
           {
             var stock = this.stocks.create((game.world.width *.85) + (30 * h), 100, 'player2cssIcon');
             stock.anchor.setTo(.5,.5);
           }
           else if(charName2 == 'chick')
           {
             var stock = this.stocks.create((game.world.width *.85) + (30 * h), 100, 'player1cssIcon');
             stock.anchor.setTo(.5,.5);
           }

         }
         else if(controlnum == -2) //For the bot
         {
           if(charName2 == 'dude')
           {
             var stock = this.stocks.create((game.world.width *.85) + (30 * h), 100, 'player2cssIcon');
             stock.anchor.setTo(.5,.5);
           }
           else if(charName2 == 'chick')
           {
             var stock = this.stocks.create((game.world.width *.85) + (30 * h), 100, 'player1cssIcon');
             stock.anchor.setTo(.5,.5);
           }

         }
       }
       console.log("fighter made");
       //return this;
     }
  }

class lab extends Fighter {
    constructor(character,health,lives,startx,starty,controlnum) {

      super(character,health,lives,startx,starty,controlnum);
      this.character.body.gravity.y = 200;
      console.log("we created the lab construtor");

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
      this.character.body.gravity.y = 200;
      console.log("we created the dj construtor");

        this.jumpSpeed = 75;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1;
        this.attackDmg = 1;
        this.moveSpeed = 250;

    }
}



var playState={

  hitPlayer1: function(){

	if (Player1.m == 0 && !Player1.shielding){
    hitSound.play();
		Player1.health = Player1.health + (2/3) + (0.1 * (Player1.health * 0.1));
		Player1.hitVelocity = Player2.character.scale.x * Player1.health * 2;

         Player1.character.body.velocity.y = -(Math.pow(Player1.health, 1.25));

        if (Player1.health >= 0 || Player1.health <= 75)
      	{
      		Player1.stunCounter = 15;
      	}
      	else if (Player1.health > 75 || Player1.health <= 150)
      	{
          Player1.stunCounter = 45;
      	}
      	else if(Player1.health > 150 || Player1.health < 200)
      	{
      		Player1.stunCounter = 90;
      	}
      	else
      	{
      		Player1.stunCounter = 150;
      	}
	}
},

hitPlayer2: function(){

	if (Player2.m == 0 && !Player2.shielding){
      hitSound.play();

		Player2.health = Player2.health + (2/3) + (0.1 * (Player2.health * 0.1));
		Player2.hitVelocity = Player1.character.scale.x * Player2.health * 2;

     Player2.character.body.velocity.y = -(Math.pow(Player2.health, 1.25));
     if (Player2.health >= 0 || Player2.health <= 75)
     {
       Player2.stunCounter = 15;
     }
     else if (Player2.health > 75 || Player2.health <= 150)
     {
       Player2.stunCounter = 45;
     }
     else if(Player2.health > 150 || Player2.health < 200)
     {
       Player2.stunCounter = 90;
     }
     else
     {
       Player2.stunCounter = 150;
     }
	}
},

yHitVelocity: function(Fighter)
{
  Fighter.character.body.velocity.y = -(Math.pow(Fighter.health, 1.25));
  console.log("during call")
},

updateInput: function(Fighter,cooldownNum)
{
//Cooldown for attacking
if (Fighter.hitCD != 0)
{
  Fighter.hitCD -= 1;
}
//Cooldown for hit stun
if (Fighter.stunCounter != 0)
{
  Fighter.stunCounter -= 1;
}
  //update function to decrease/increase the hit velocity based on the original direction of the punch. The natural slowing down of hit velocity
if(Fighter.hitVelocity < 0)
{
  Fighter.hitVelocity += 1;
}
else if (Fighter.hitVelocity > 0)
{
  Fighter.hitVelocity -= 1;
}
else
{
  Fighter.hitVelocity = 0;
}


//control logic for virtual keys
if(Fighter.controlnum == -1 || Fighter.controlnum == -2 ){

if (Fighter.controller1.leftpress == true){
      console.log("left??");
}

  if (Fighter.controller1.xpress && Fighter.character.body.touching.down && Fighter.stunCounter == 0 && Fighter.hitVelocity == 0)
  {
      Fighter.character.body.velocity.x = 0;
      Fighter.character.animations.play('shield');
      Fighter.shielding = true;

  }
  else if (Fighter.controller1.apress && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -250 - Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 250 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('punch');
      Fighter.weapon1.fire();

      Fighter.shielding = false;
      Fighter.hitSwitchPunch = true;

  }
  else if (Fighter.controller1.bpress == true && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //  Move to the right

      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -350 - Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 350 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('kick');
      //Fighter.hitCD = 60;
      Fighter.weapon1.fire();

      if(Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.y = -200;
    }
    Fighter.shielding = false;
    Fighter.hitSwitchKick = true;
  }

  else if (Fighter.controller1.bpress && Fighter.controller1.ypress)
  {
    console.log("Up Special");
  }
  else if (Fighter.controller1.bpress && Fighter.controller1.rightpress)
  {
    console.log("Right Special");
  }
  else if (Fighter.controller1.bpress && Fighter.controller1.leftpress)
  {
    console.log("Left Special");
  }
  else if (Fighter.controller1.bpress && Fighter.controller1.downpress)
  {
    console.log("Down Special");
  }
  else if (Fighter.controller1.bpress)
  {
    console.log("Normal Special")
  }

  else if (Fighter.controller1.ypress && Fighter.jumps <= 5  && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      Fighter.character.body.velocity.y = -350 + Fighter.jumpSpeed;
      jumpSound.play();
      Fighter.jumps += 1;
      Fighter.shielding = false;
  }
  else if (Fighter.controller1.leftpress && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }

      if (Fighter.character.scale.x > 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, -40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = -250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = -200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + -125 < 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += -125;
        }
      }
      console.log(Fighter);
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }
  else if (Fighter.controller1.rightpress && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      //  Move to the right
      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, 40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = 250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = 200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + 125 > 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += 125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }

  else
  {
      //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
    if (Fighter.hitVelocity != 0)
    {
      Fighter.character.body.velocity.x = Fighter.hitVelocity;
    }
    else
    {
      Fighter.character.body.velocity.x = 0;
    }
      if (Fighter.stunCounter > 0)
      {
        Fighter.character.animations.play('ko');
      }
      else
      {
        //Fighter.character.animations.play('idle');
      }
      Fighter.shielding = false;

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
  }
  if(Fighter.controller1.apress && Fighter.hitSwitchPunch)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchPunch = false;
  }
  if (Fighter.controller1.bpress && Fighter.hitSwitchKick)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchKick= false;
  }
    //console.log('end of vpad read');
}


//control logic for real keyboard
else if(Fighter.controlnum > 0){
//console.log("inside real key check");

  if (Fighter.controller1.shield.isDown && Fighter.character.body.touching.down && Fighter.stunCounter == 0 && Fighter.hitVelocity == 0)
  {
      Fighter.character.body.velocity.x = 0;
      Fighter.character.animations.play('shield');
      Fighter.shielding = true;

  }
  else if (Fighter.controller1.punch.isDown && Fighter.controller1.punch.downDuration(80 + Fighter.attackSpeed) && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -250 + Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 250 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('punch');
      Fighter.weapon1.fire();

      //If really freaking close to item, and if he isnt holding something, use it!
      if((item1.xDistCheck(Fighter.character) < 150) && (item1.yDistCheck(Fighter.character) < 150) && !(Fighter.character.hasItem) && (item1.user == null))
      {
        item1.user = Fighter.character;
        item1.pickedUp = true;
        Fighter.character.hasItem = true;
        console.log("close to item");


      }

      if(Fighter.character.hasItem) //If he has an item, USE IT!
      {

        item1.useItem(Fighter);

        item1.user = null;
        item1.pickedUp = false;
        Fighter.character.hasItem = false;

      }

      //Fighter.hitCD = 30;
      Fighter.shielding = false;
      Fighter.hitSwitchPunch = true;
      //Causes Player health to increase
      //Fighter.health += 1;
  }
  else if (Fighter.controller1.kick.isDown && Fighter.controller1.kick.downDuration(200 + Fighter.attackSpeed) && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0 && Fighter.hitCD == 0)
  {
      //  Move to the right

      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
        Fighter.character.body.velocity.x = -350 - Fighter.moveSpeed;
      }
      else
      {
        Fighter.character.body.velocity.x = 350 + Fighter.moveSpeed;
      }
      Fighter.character.animations.play('kick');
      //Fighter.hitCD = 60;
      Fighter.weapon1.fire();

      if(Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.y = -200;
      }
    Fighter.shielding = false;
    Fighter.hitSwitchKick = true;
  }

  else if (Fighter.controller1.special.isDown && Fighter.controller1.up.isDown)
  {
  	console.log("Up Special");
  }
  else if (Fighter.controller1.special.isDown && Fighter.controller1.right.isDown)
  {
  	console.log("Right Special");
  }
  else if (Fighter.controller1.special.isDown && Fighter.controller1.left.isDown)
  {
  	console.log("Left Special");
  }
  else if (Fighter.controller1.special.isDown && Fighter.controller1.down.isDown)
  {
  	console.log("Down Special");
  }
  else if (Fighter.controller1.special.isDown)
  {
  	console.log("Normal Special")
  }

  else if (Fighter.controller1.jump.isDown && Fighter.jumps <= 5 && Fighter.controller1.jump.downDuration(80 + Fighter.attackSpeed) && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      Fighter.character.body.velocity.y = -350 + Fighter.jumpSpeed;
      jumpSound.play();
      Fighter.jumps += 1;
      Fighter.shielding = false;
  }
  else if (Fighter.controller1.left.isDown && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }

      if (Fighter.character.scale.x > 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, -40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = -250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = -200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + -125 < 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += -125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }
  else if (Fighter.controller1.right.isDown && !(Fighter.m < 120 && Fighter.m != 0) && Fighter.stunCounter == 0)
  {
      //  Move to the right
      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
      //logic to change direction facing
      if (Fighter.character.scale.x < 0 ){
      Fighter.character.scale.x *=-1;
      Fighter.weapon1.trackSprite(Fighter.character, 28, 40, true);
      }
      if (Fighter.character.body.touching.down)
      {
        Fighter.character.body.velocity.x = 250 + Fighter.hitVelocity;
      }
      else
      {
        Fighter.character.body.velocity.x = 200 + Fighter.hitVelocity;
      }
      //Determines the hitvelocity of the player based on inputs from keyboard to decrease the velocity
      if (Fighter.hitVelocity != 0)
      {
        if (Fighter.hitVelocity + 125 > 0){
          Fighter.hitVelocity = 0;
        }
        else
        {
          Fighter.hitVelocity += 125;
        }
      }
      Fighter.character.animations.play('right');
      Fighter.shielding = false;
  }

  else
  {
      //Code that assigns the velocity of the player based on the current hitVelocity. Keeps track of jump count and determines the idle animation of the character
    if (Fighter.hitVelocity != 0)
    {
      Fighter.character.body.velocity.x = Fighter.hitVelocity;
    }
    else
    {
      Fighter.character.body.velocity.x = 0;
    }
      if (Fighter.stunCounter > 0)
      {
        Fighter.character.animations.play('ko');
      }
      else
      {
        //Fighter.character.animations.play('idle');
      }
      Fighter.shielding = false;

      if(Fighter.character.body.touching.down)
      {
        Fighter.jumps = 0;
    }
  }
  if(Fighter.controller1.punch.isUp && Fighter.hitSwitchPunch)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchPunch = false;
  }
  if (Fighter.controller1.kick.isUp && Fighter.hitSwitchKick)
  {
    Fighter.hitCD = 15;
    Fighter.hitSwitchKick= false;
  }

}
//console.log("end of key check");
//end of update input function
},




  respawn: function(Fighter){
      console.log("Beginning of respawn");
      game.time.events.add(Phaser.Timer.SECOND, this.playRespawnSound, this);


      if(Fighter.controlnum == 1 ){
          console.log("controlnum = 1");
          Fighter.character.x = 200;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }

      else if(Fighter.controlnum == 2 ){
          console.log("controlnum = 2");
          Fighter.character.x = 600;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }

      else if(Fighter.controlnum == -1 ){
          console.log("controlnum = -1");
          //Fighter.character.body.position.x = 200;
          Fighter.character.x = 200;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }
      else if(Fighter.controlnum == -2 ){
          console.log("controlnum = -2");
          //Fighter.character.body.position.x = 200;
          Fighter.character.x = 600;
          Fighter.character.y = 300;
          Fighter.respawnSwitch = true;
          Fighter.m = 0;
      }

      Fighter.health = 0;
      Fighter.lives += -1;
      Fighter.character.body.velocity.x = 0;
      Fighter.character.body.velocity.y = 0;
  },

  respawnEvent: function(Fighter){
    //Respawn Switch is activated during the KO function
    if (Fighter.respawnSwitch == true){
    Fighter.m += 1;
    //Invisible moment
    if (Fighter.m < 60 && Fighter.m != 0){
      Fighter.character.body.gravity.y = 0;
      Fighter.character.visible = false;
    }
    //Book Crashing down Animation
    else if(Fighter.m >= 60 && Fighter.m < 120){
      Fighter.character.body.gravity.y = 800;
      Fighter.character.visible = true;
    }
    else{
      Fighter.character.body.gravity.y = 1000;
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
         deathSound.play();
         var live = Fighter.stocks.getFirstAlive();
         if(live)
         {
           live.kill();
         }
         this.respawn(Fighter);

      }
      else if(Fighter.character.body.position.y > 700 || Fighter.character.body.position.y < -100){
         deathSound.play();
         var live = Fighter.stocks.getFirstAlive();
         if(live)
         {
           live.kill();
         }
         this.respawn(Fighter);
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
      game.time.advandedTiming = true;

      //create a timer for the game
      timer = game.time.create(false);
      timerEvent = timer.add(Phaser.Timer.MINUTE * gameMinutes + Phaser.Timer.SECOND * gameSeconds, this.timeOutGame, this);
      timer.start();

      //Play music
      music = game.add.audio('allstar');
      music.loopFull();

      //Background for our game
      game.add.sprite(0, 0, 'sky');

      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = game.add.group();

      //  Enable physics for any object that is created in this group
      platforms.enableBody = true;

      // Create the ground.
      var ground = platforms.create(110, game.world.height - 30, 'ground');

      //  Scale it to fit the width of the game (the original sprite is ? in size)
      ground.scale.setTo(18, 1);

      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

hitSound = game.add.audio('hitSound');
respawnSound = game.add.audio('respawnSound');
deathSound = game.add.audio('deathSound');
jumpSound = game.add.audio('jumpSound');
itemSound = game.add.audio('itemSound');
buttonSound = game.add.audio('buttonSound');

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

//event listener for player1 touch controls
//console.log("test print");

//console.log(Player1.controlnum);

//Create an item
item1 = new Item('bottle', game.world.width * .5, game.world.height * .5);


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


  }


      //mob = new crowd(0,0);

      healthtext1 = game.add.text(0,0, `DMG ${Player1.health}`,style);

      healthtext2 = game.add.text(650,0, `DMG ${Player2.health}`,style);

      livetext1 = game.add.text(0,30, `Lives ${Player1.lives}`,style);

      livetext2 = game.add.text(650,30, `Lives ${Player2.lives}`,style);

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
    game.physics.arcade.overlap(Player1.character, this.win, this.Win, null, this);
    game.physics.arcade.overlap(Player2.character, this.win, this.Win, null, this);

    //  Collide the players with the platforms and eachother
    game.physics.arcade.collide(Player1.character, platforms );
    game.physics.arcade.collide(Player2.character, platforms );
    game.physics.arcade.collide(Player1.character,Player2.character);
    //add physics for item (eventually just add items to a group and use collision detection for the group)
    game.physics.arcade.collide(item1.type, platforms );



    game.physics.arcade.overlap(Player1.weapon1.bullets, Player2.character, this.hitPlayer2);
	   game.physics.arcade.overlap(Player2.weapon1.bullets, Player1.character, this.hitPlayer1);

    nameText1.alignTo(Player1.character, Phaser.TOP, 16);
    nameText2.alignTo(Player2.character,Phaser.TOP, 16);
    if(item1.type != null)
    {
      item1.alignToTarget();
    }






    if(controlOptionAI == -2)
    {

      this.AIplay(Player1, Player2);

    }

      //console.log("echo");
    this.updateInput(Player1,cooldown1);
    this.updateInput(Player2,cooldown2);

      //console.log("echo");
    healthtext1.text = `DMG ${Math.ceil(Player1.health)} %`;
    healthtext2.text = `DMG ${Math.ceil(Player2.health)} %`;

    livetext1.text = `Lives ${Player1.lives}`;
    livetext2.text = `Lives ${Player2.lives}`;

    this.KO(Player1);
    this.KO(Player2);

    this.respawnEvent(Player1);
    this.respawnEvent(Player2);
    //If out of lives, end the game
    if(Player1.lives == 0)
    {
      game.state.start('win');
    }
    if(Player2.lives == 0)
    {
      game.state.start('win');
    }

  timerText.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));

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

AIplay: function(Fighter1,Fighter2){

	AIxdist = Fighter2.character.body.position.x -Fighter1.character.body.position.x;
	AIydist =  Fighter2.character.body.position.y -Fighter1.character.body.position.y;

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
	if(AIydist > 100 || Fighter2.character.body.position.y < 40){
	  	//console.log("jump?");
	  	Fighter2.controller1.ypress = true;
	  	//Fighter2.character.body.velocity.y = -100;
	}
	else{
	  	Fighter2.controller1.ypress = false;
	}

	//avoid going out of bounds
	if(Fighter2.character.body.position.x < 200){
		Fighter2.controller1.rightpress = true;
		//console.log("Avoid wall");
	}
	else if(Fighter2.character.body.position.x > 400){
		Fighter2.controller1.leftpress = true;
		//console.log("Avoid right bound");
	}
	else{
		//temporary fix need to remove later
  		Fighter2.controller1.leftpress = false;
  		Fighter2.controller1.rightpress = false;
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
