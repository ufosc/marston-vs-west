class platform {
    
    constructor(x, y, phasable, sprite, scaleX, scaleY) {
        //create basic platform
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
        
        //create ledge grab hitboxes

        this.leftledge = game.add.sprite((this.plat.x + (this.plat.x * 0.6) + this.plat.width), (y * 0.95),'SwipeV'); // left recovery hitbox
        this.rightledge = game.add.sprite((this.plat.x - (this.plat.x * 0.6) - (3*this.plat.width)), (y * 0.95),'SwipeV'); // right recovery hitbox
        console.log(this.plat.width);
        console.log(this.plat.x);
        //this.rightledge = game.add.sprite(x, y,'SwipeV'); // right recovery hitbox
        //plat.create(x, y,'SwipeV'); //right recovery hitbox
        
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

}