//Slider object
class Slider {

    constructor(x, y, range, type) {
       
        this.minx = x;
        this.miny = y;

        this.range = range;

        this.value = this.x - range;
        this.type = type;

        this.knob = game.add.sprite(this.minx, this.miny, 'knob');
        this.knob.inputEnabled = true;
        this.knob.input.enableDrag(true);
        //this.knob.events.onDragUpdate.add(this.SlideDragUpdate);
        //this.knob.events.onDragUpdate.add(this.xcheck);
        //this.knob.events.onDragUpdate.add(this.ycheck);
    }

   

/*
    SlideDragUpdate(knob, minx, miny, range) {
        console.log("In correct slide drag update");
        //this.xcheck();
        if(knob.x > minx + range) {
            knob.x = minx + range;
            console.log("x???");
        }
        else if(knob.x < minx ) {
            knob.x = minx;
            console.log("adjust x");
        }
        //ycheck();
        if(knob.y != miny) {
            knob.y = miny;
            console.log("adjust y?");
        }
    }
*/ 

    //SlideDragUpdate1: Phaser.Signal = new Phaser.signal();

    

    
    //sayHi: function() {
    xcheck() {
        console.log("Slide me side!");
        if(this.knob.x > this.minx + this.range) {
            this.knob.x = this.minx + this.range;
        }
        else if(this.knob.x < this.minx ) {
            this.knob.x = this.minx;
        }
    }

    ycheck() {
        console.log("Cant Slide me up!");
        if(this.knob.y != this.miny) {
            this.knob.y = this.miny;
        }
    }

    SlideDragUpdate() {
        //console.log("In correct slide drag update");
        this.xcheck();
        //console.log("working?");
        this.ycheck();
        //console.log("maybe?");
    }
}