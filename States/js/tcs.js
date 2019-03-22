var timer;
var total = 0;

var tcsState = {
    update:function() {
    },
    create:function(){
        /*dudeIcon = game.add.sprite(game.world.width * .5 - 200, game.world.height * .25 + 50, 'dudeIcon');
        dudeIcon.anchor.setTo(.5, .5);
        dudeIcon.scale.setTo(.5, .5);
        game.physics.arcade.enable(dudeIcon);
        dudeIcon.tint = 0xffffff;

        chickIcon = game.add.sprite(game.world.width * .5 + 200, game.world.height * .25 + 50, 'chickIcon');
        chickIcon.anchor.setTo(.5, .5);
        chickIcon.scale.setTo(.5, .5);
        game.physics.arcade.enable(chickIcon);
        chickIcon.tint = 0xffffff;*/

        player1ico = game.add.sprite(game.world.width * .05 - 100, game.world.height * .7, 'dude');
        musicToPlay = game.add.audio('titleCardSound');
        musicToPlay.play();

        //buttonSound.play();
        //Determine's what's spawned, and lets you start game
       // charName1 = "dude";
        //charSelected1 = true;
        //"select" dude, and change color of pic
        dudeIcon.tint = 0xffff00;
        //destroys the old sprite so when you create a new one only one exists
       // player1ico.kill();

        player1ico.scale.setTo(15, 15);
        player1ico.anchor.setTo(.5,.5);
        player1ico.scale.x *= -1;//flip
        player1ico.animations.add('idle', [1, 2], 5, true);
        player1ico.animations.add('kick', [6], 5, true);
        if (player1ico.animations) {
            player1ico.alpha = 1;
        }


        buttonSound.play();
        //charName2 = "chick";
        //charSelected2 = true;
        chickIcon.tint = 0xffffff;

        player2ico = game.add.sprite(game.world.width * .95 + 100, game.world.height * .7, 'chick');
        player2ico.scale.setTo(15, 15);
        player2ico.anchor.setTo(.5,.5);

        player2ico.animations.add('idle', [1, 2], 5, true);
        player2ico.animations.add('kick', [6], 5, true);

        if (player2ico.animations) {
            player2ico.alpha = 1;
        }

        //Fixme:
        //let tempAnim = player1ico.animations.add('meme', [10, 11, 5], 5, true);

        //tempAnim.play(10, true);
        player1ico.animations.play('idle');
        player2ico.animations.play('idle');
        game.physics.enable(player1ico, Phaser.Physics.ARCADE);
        game.physics.enable(player2ico, Phaser.Physics.ARCADE);

        game.time.events.add(Phaser.Timer.SECOND * 3.5, rush, this);


        player1ico.inputEnabled = true;
        player1ico.events.onInputDown.add(start, this);
        player2ico.inputEnabled = true;
        player2ico.events.onInputDown.add(start, this);
    },



};

function rush(){
    player1ico.animations.play('kick');
    player1ico.scale.x *= -1;//flip
    player1ico.x = game.world.width * .15 + 100;

    player2ico.animations.play('kick');
    player2ico.scale.x *= -1;//flip
    player2ico.x = game.world.width * .85 - 100;

    player1ico.body.velocity.x = 100;
    player2ico.body.velocity.x = -100;

    game.time.events.add(Phaser.Timer.SECOND * 4.7, rushStop, this);
}

function rushStop(){
    player1ico.body.velocity.x = 0;
    player2ico.body.velocity.x = 0;

    game.time.events.add(Phaser.Timer.SECOND * 3, start, this);
}
function start(){
    gameReadyText.text = `Game Start!`;
    game.state.start('play');

}