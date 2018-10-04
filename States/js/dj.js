  class dj extends Fighter {
      constructor(character,health,lives,startx,starty,controlnum) {
  
        super(character,health,lives,startx,starty,controlnum);
        this.character.body.gravity.y = 650;
        //console.log("we created the dj construtor");
  
          this.jumpSpeed = 75;
          this.fallSpeed = 50;
          this.runSpeed = 50;
          this.attackSpeed = 1;
          this.attackDmg = 1;
          this.moveSpeed = 250;
  
      }
  }