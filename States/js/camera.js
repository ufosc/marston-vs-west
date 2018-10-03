class cam {

    constructor(toplx, toply, w, h) {

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

    updatecamera(sprite1, sprite2, xmin, ymin, xmax, ymax) {

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

        var xtarget = 0.5 * (sprite2.character.body.position.x + sprite1.character.body.position.x);
        var ytarget = 0.5 * (sprite2.character.body.position.y - sprite1.character.body.position.y);

        if (xtarget < 0) {
            xtarget = xtarget * -1;
        }

        if (ytarget < 0) {
            ytarget = ytarget * -1;
        }

        //math for scaling (camera zoom)
        var xscaletarget = (sprite2.character.body.position.x - sprite1.character.body.position.x);
        var yscaletarget = (sprite2.character.body.position.y - sprite1.character.body.position.y);


        //adjust position to be adjusted for topleft corner of camerabox
        xtarget -= 300;

        game.camera.x += 0.2 * (xtarget - game.camera.x);

        //console.log(game.camera.x);
        //update topleft y coordinate
        game.camera.y += 0.2 * ((-1 * ytarget) - game.camera.y);

        w = 0;
        h = 0;
        if (xtarget < xmin) {
            w = xmin;
        }
        else if (xtarget > xmax) {
            w = xmax;
        }
        else {
            w = xtarget;
        }

        //update camera height
        if (ytarget < ymin) {
            h = ymin;
        }
        else if (ytarget > ymax) {
            h = ymax;
        }
        else {
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