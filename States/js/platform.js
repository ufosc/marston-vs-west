class platform {
    
    constructor(x, y, phasable, sprite, scaleX, scaleY) {
        //create basic platform
        //this.grabbable = grabbable;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.phasable = phasable;
        this.plat = game.add.sprite(x, y, sprite);
        
        this.scaleX = scaleX;
        this.scaleY = scaleY;
       
        //game.add.group();
        //this.plat.create(x, y, sprite);
        //game.add.sprite(startx, starty, character);
        
        //if (this.grabbable == true) {
            //create ledge grab hitboxes
            this.rightledge = game.add.sprite((this.plat.x + (this.plat.x * 0.6) + (2*this.plat.width)), (y* 0.95),'SwipeV'); // left recovery hitbox
            this.leftledge = game.add.sprite((this.plat.x - (this.plat.x * 0.6) - (2*this.plat.width)), (y * 0.95),'SwipeV'); // right recovery hitbox
            
            this.rightledge.visible = false;
            this.leftledge.visible = false;

            this.rightledge.scale.setTo(1, 0.4);
            this.leftledge.scale.setTo(1, 0.4);

            //console.log(this.plat.width);
            //console.log(this.plat.x);
            //this.rightledge = game.add.sprite(x, y,'SwipeV'); // right recovery hitbox
            //plat.create(x, y,'SwipeV'); //right recovery hitbox
            
            game.physics.arcade.enable(this.leftledge);
            this.leftledge.enableBody = true;
            this.leftledge.anchor.setTo(0.5,0);

            game.physics.arcade.enable(this.rightledge);
            this.rightledge.enableBody = true;
            this.rightledge.anchor.setTo(0.5,0);
        //}
        game.physics.arcade.enable(this.plat);

        //this.sprite.enableBody = true;

        this.plat.enableBody = true;
        this.plat.friction = 100;

        this.plat.anchor.setTo(0.5,1);
        
        //Scale it to fit the width of the game (the original sprite is ? in size)
        this.plat.scale.setTo(scaleX, scaleY);

        //This stops it from falling away when you jump on it
        this.plat.body.immovable = true;

    }
    // End of constructor

}