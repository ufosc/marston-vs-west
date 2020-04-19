//Virtual pad
class vpad {
    constructor(controlnum) {

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

class nespad {
    constructor(controlnum) {
        //gamepad stuff

        //this.nescontroller = null;
        this.nescontroller = game.input.gamepad.pad1;

        this.nesaButton = false;
        this.nesbButton = false;
        this.nesxButton = false;
        this.nesyButton = false;
        this.nesleftButton = false;
        this.nesrightButton = false;
        this.nesupButton = false;
        this.nesdownButton = false;
        this.indicator = false;
        this.pad1 = false;
        this.controlnum = controlnum;
        this.testconnect = false;

    }

    connectgamepad() {
        if (this.testconnect == false) {

            //try to add nes controller support
            //game.input.gamepad.start();

            /*
            var nesaButton = null;
            var nesbButton = null;
            var nesxButton = null;
            var nesyButton = null;
            var nesleftButton = null;
            var nesrightButton = null;
            var nesupButton = null;
            var nesdownButton = null;
            */

            this.nescontroller = game.input.gamepad.pad1;

            this.nescontroller.addCallbacks(this, {
                onConnect: function () {
                    this.testconnect = true;
                    console.log("controller recognized and connected! buttons set!");
                    // you could use a different button here if you want...

                    //buttons seem to go from 0 to 10
                    //nesaxes = nescontroller.
                    this.nesaButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_1);
                    this.nesbButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_2);
                    this.nesxButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_0);
                    this.nesyButton = this.nescontroller.getButton(Phaser.Gamepad.BUTTON_3);
                    /*nesrtrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_4);
                    nesltrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_5);
      
                    nesrightButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_6);
                    nesdownButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
                    nesleftButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
                    nesupButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_7);
      
                    nesselectButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_8);
                    nesstartButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_9); */

                }

            });
            game.input.gamepad.start();
        }
    }

    updategamepad() {
        //try to add nes controller support
        //game.input.gamepad.start();

        /*
        var nesaButton = null;
        var nesbButton = null;
        var nesxButton = null;
        var nesyButton = null;
        var nesleftButton = null;
        var nesrightButton = null;
        var nesupButton = null;
        var nesdownButton = null;
        */

        nescontroller = game.input.gamepad.pad1;

        nescontroller.addCallbacks(this, {
            onConnect: function () {
                testconnect1 = true;
                console.log("controller recognized and connected! buttons set!");
                // you could use a different button here if you want...

                //buttons seem to go from 0 to 10
                //nesaxes = nescontroller.
                nesaButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_1);
                nesbButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_2);
                nesxButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_0);
                nesyButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_3);
                /*nesrtrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_4);
                nesltrigButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_5);
        
                nesrightButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_6);
                nesdownButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
                nesleftButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_10);
                nesupButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_7);
        
                nesselectButton = nescontroller.getButton(Phaser.Gamepad.BUTTON_8);
                nesstartButton   = nescontroller.getButton(Phaser.Gamepad.BUTTON_9);*/

            }

        });
        game.input.gamepad.start();
    }

}