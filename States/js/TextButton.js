//class TextButton extends Phaser.Text

class TextButton extends Phaser.Text {
    constructor(game, x, y, text, style) {
        super(game, x, y, text, style);
        //this.url = url;
        this._oldFill = null;
        //add custom objects to the game
        this.game.add.existing(this);
        //Activate inpute events
        this.inputEnabled = true;
        //Change hover cursor
        this.input.useHandCursor = true;
        //Listen to the events
        this.events.onInputOver.add(this.onOver, this);
        this.events.onInputOut.add(this.onOut, this);

    }

    onOver() {
        this._oldFill = this.fill;
        this.fill = "blue";
    }

    onOut() {
        this.fill = this._oldFill;
    }

}