class Item {
    constructor(type, startx, starty, gameRef) {
        this.gameRef = gameRef;
        this.type = game.add.sprite(startx, starty, type);
        this.type.scale.setTo(1.75,1.75);
        game.physics.arcade.enable(this.type);
        this.type.anchor.setTo(.5, .5);
        this.type.body.bounce.y = 0.2;//0.2;
        this.type.body.bounce.x = .2;
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

    useItem(target) { //Only call if item has a user and is pickedUp
        //When you use the item, first check the type of item used, then do the approipiate action
        this.type.angle = 0;
        this.type.body.angularVelocity = 0;
        if (this.pickedUp && this.user != null) {
            this.inAir = false;
            console.log("Used item!")
            console.log(this);
            if (this.type.key == 'bottle') //heal the player and destroy bottle
            {
                if(muteState==false)
                itemSound.play();
                this.type.destroy();
                this.type = null;
                target.health -= 10;
                if (target.health < 0) {
                    target.health = 0;
                }
                game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this); //After 2 seconds, spawn the item
            }
            else if (this.type.key == 'gator') //Current does the same thing as bottle but does damange to player instead
            {
                if(muteState==false)
                itemSound.play();
                this.type.destroy();
                this.type = null;
                target.health += 10;
                game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this); //After 2 seconds, spawn the item
            }
            else if (this.type.key == 'helmet') //Current respawns player without decrementing lives
            {
                if(muteState==false)
                itemSound.play();
                target.lives++; //respawn decrements lives, this increments lives first
                this.gameRef.respawn(target);
                game.time.events.add(Phaser.Timer.SECOND * 2, this.spawnItem, this); //After 2 seconds, spawn the item
                this.type.destroy();
                this.type = null;
            }
        }
    }
    getActive() {
        return this.active;
    }
    getThrown() {
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
        if (holder.character.scale.x < 0) { //If they user is facing left
            if(muteState==false)
            itemSound.play();
            //console.log("facing left");

            this.type.body.velocity.x -= 700;
            this.type.body.velocity.y -= 200;
            holder.hasItem = false;
            this.thrown = true;
            this.active = true;
            this.inAir = true;

        }
        else //if facing to the left
        {
            if(muteState==false)
            itemSound.play();
            //console.log("facing right");

            this.type.body.velocity.x += 700;
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
        if (this.thrown && this.active && game.physics.arcade.overlap(target.character, this.type)) //active controls when the damage is applied ie only apply it once
        { //console.log("deal the item throw damage")
            if (this.type.body.velocity.x > 0) //If item is thrown to the right, obv. the target is gonna fly to the right
            {
                target.hitVelocity += 200;
                target.character.body.velocity.y -= 250;
                target.health += 10;

            }
            else {
                target.hitVelocity -= 200;
                target.character.body.velocity.y -= 250;
                target.health += 10;
                
            }
            //Change direction and slow on impact
            this.type.body.velocity.x *= -.25;
            this.active = false;
            hitSound.play();

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
        switch (signChoice) {
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
        switch (itemSelect) {
            case 0:
                this.type = game.add.sprite(game.world.width * .5 + (itemOffset * itemPosNeg), game.world.height * .5, 'gator');
                break;
            case 1:
                this.type = game.add.sprite(game.world.width * .5 + (itemOffset * itemPosNeg), game.world.height * .5, 'bottle');
                break;
            case 2:
                this.type = game.add.sprite(game.world.width * .5 + (itemOffset * itemPosNeg), game.world.height * .5, 'helmet');
                break;
        }

        this.type.scale.setTo(1.75,1.75);

        game.physics.arcade.enable(this.type);
        this.type.anchor.setTo(.5, .5);
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
    respawnItem() {
        console.log("RESPAWN ITEM");
        this.type.destroy(); //Delete the old item sprite
        this.spawnItem();
    }
    xDistCheck(target) { //Get the distance between the item and the target(probably the player in most cases)
        if (this.type != null) {
            return Math.abs(this.type.body.position.x - target.body.position.x);
        }

    }
    yDistCheck(target) { //Get the distance between the item and the target(probably the player in most cases)
        if (this.type != null) {
            return Math.abs(this.type.body.position.y - target.body.position.y);
        }

    }

    alignToTarget() //Should always have a type when called due to update function
    //Also checks if the item falls off the map
    {//This checks if the item is touching the ground, and sets its values back to default
        if (this.type.body.touching.down) {
            this.type.body.velocity.set(0, this.type.body.velocity.y);
            this.type.body.angularVelocity = 0;
            this.type.angle = 0;
            this.thrown = false;
            this.inAir = false;
        }


        if (this.user == null) {
            //Can't follow user, check if it falls off the map
            if (this.type.body.position.x < -50 || this.type.body.position.x > 900) {
                //this.type.destroy();
                //this.spawnItem();
            }
            else if (this.type.body.position.y > 700 || this.type.body.position.y < -100) {
                //this.type.destroy();
                //this.spawnItem();
            }
        }
        else {

            this.type.body.position.x = this.user.character.body.position.x;
            this.type.body.position.y = this.user.character.body.position.y;
            //Can't follow user, check if it falls off the map

            if (this.type.body.position.x < -50 || this.type.body.position.x > 900) {
                //this.type.destroy();
                //this.spawnItem();
            }
            else if (this.type.body.position.y > 700 || this.type.body.position.y < -100) {
                //this.type.destroy();
                //this.spawnItem();
            }

        }
    }

    onGround() {
        if (game.physics.arcade.collide(item1.type, platforms)) {
            this.inAir = false;
            if (!this.user) {
                this.user = null;
            }
            //console.log("user: " + this.user)

        }
    }


}
