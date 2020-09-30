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
    }
    
    xcheck() {;
        if(this.knob.x > this.minx + this.range) {
            this.knob.x = this.minx + this.range;
        }
        else if(this.knob.x < this.minx ) {
            this.knob.x = this.minx;
        }
    }

    ycheck() {
        if(this.knob.y != this.miny) {
            this.knob.y = this.miny;
        }
    }

    SlideDragUpdate() {
        this.xcheck();
        this.ycheck();
    }
}