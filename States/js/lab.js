class lab extends Fighter {
    constructor(character, health, lives, startx, starty, controlnum) {

        super(character, health, lives, startx, starty, controlnum);
        this.character.body.gravity.y = 650;
        //console.log("we created the lab construtor");

        this.jumpSpeed = 25;
        this.fallSpeed = 50;
        this.runSpeed = 50;
        this.attackSpeed = 1; //250;
        this.attackDmg = 1;
        this.moveSpeed = 200;

    }
}