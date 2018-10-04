  class box extends Fighter {
      constructor(character,health,lives,startx,starty,controlnum) {
  
        super(character,health,lives,startx,starty,controlnum);
        this.character.body.gravity.y = 650;
        //console.log("we created the lab construtor");
  
          this.jumpSpeed = 40;
          this.fallSpeed = 55;
          this.runSpeed = 60;
          this.attackSpeed = 1; //250;
          this.attackDmg = 1;
          this.moveSpeed = 230;
  
      }
  }