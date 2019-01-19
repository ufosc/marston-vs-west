class platform {
    
    constructor(x, y, phasable, sprite) {
        //create basic platform
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.phasable = phasable;
        this.plat = game.add.sprite(x, y, sprite);
        
        //game.add.group();
        //this.plat.create(x, y, sprite);
        //game.add.sprite(startx, starty, character);
        
        //create ledge grab hitboxes
        this.leftledge = game.add.sprite(x, y,'SwipeV'); // left recovery hitbox
        //this.rightledge = game.add.sprite(x, y,'SwipeV'); // left recovery hitbox
        //plat.create(x, y,'SwipeV'); //right recovery hitbox

        this.plat.enableBody = true;
        this.plat.friction = 100;

        this.plat.anchor.setTo(0.5,1);
        
        //Scale it to fit the width of the game (the original sprite is ? in size)
        this.plat.scale.setTo(40, 2);

        //This stops it from falling away when you jump on it
        this.plat.immovable = true;


    }


}