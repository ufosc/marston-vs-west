//color slider
class ColorSlider {
    constructor(x,y) {
        var xPosition1 = sprite1.x;
        var xPosition2 = sprite2.x;
        var xPosition3 = sprite3.x;

        var valColor1 = ((xPosition1 - right) /range) * 255;
        var valColor1 = parseInt(valColor1);
        valColor1 *= 256;
        sprite1.tint = valColor1;

        valColor2 = ((xPosition2 - right) /range) * 255;
        valColor2 = parseInt(valColor2);
        valColor2 *= 256;//We wanna modify the middle two digits now
        sprite2.tint = valColor2;

        valColor3 = (xPosition3 - right) /range * 255;
        valColor3 = parseInt(valColor3);
        valColor3 *= 65536;//We wanna modify the last two digits now
        sprite3.tint = valColor3;

    }

    


}