class ColorMenu {
    constructor(playernum) {
        
        //this.original = "0xffffff";
        this.white = "0xffffff";
        this.orange = "0xff8615";
        this.blue = "0x1c6bff";
        this.red = "0xcc0000";
        this.green = "0x33cc33";
        this.yellow = "0xffff00";
        this.purple = "0x9933ff";
        this.black = "0x343434";
        
        
        this.tintList = [this.white, this.orange, this.blue, this.red, this.green, this.yellow, this.purple, this.black];
        
        this.button = new Array;
        var i;
        var colorcount = 0;
        for(i= 0; i < 3; i++){
            var j;
            //colorcount++;
            for(j = 0; j < 3; j++){
               
                if(playernum == 1){
                    var xpos = (game.world.width * 0.05) + (j*120);
                                                    
                }
                else if(playernum == 2){
                    var xpos = (game.world.width * 0.8) + (j*120);                             
                }
                var ypos = (game.world.height * .5) + (i*120);
                if(i == 2 && j == 2) {
                    //this.button[colorcount].tint = this.tintList[colorcount];
                    this.button[colorcount] = game.add.button(xpos, ypos, 'bottle');
                    this.button[colorcount].anchor.setTo(.5, .5);
                    this.button[colorcount].scale.setTo(5, 4);
                }
                else {
                    this.button[colorcount] = game.add.button(xpos, ypos, 'ColorBottle');
                    this.button[colorcount].anchor.setTo(.5, .5);
                    this.button[colorcount].scale.setTo(5, 4);
                    this.button[colorcount].tint = this.tintList[colorcount];
                }
                colorcount++;
                //this.button[i].onInputUp.add(this.colorPick(i), this);
            }
        }
        //arcadeButton.onInputUp.add(this.arcade, this);
    }

    colorPick(buttonNum){
        console.log(buttonNum);
        //return("0xffffff");
        return(this.tintList[buttonNum]);
        //gameManager.playerTint[0] = tint[i] 
        //gameManager.playerTint[0] = Player1ColorMenu.colorPick(i);
        //buttonSound.play();
    }

}