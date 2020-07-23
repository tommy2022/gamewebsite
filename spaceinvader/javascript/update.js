const canvas_fore = document.getElementById("fore");
const canvas_back = document.getElementById("back");
const ctx_fore = canvas_fore.getContext("2d");
const ctx_back = canvas_back.getContext("2d");
const player = {
  pos: {x: 0, y: 0},
  matrix: [
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ],
  score: 0,
  color: "#ABE1FA",
}
for (let i = 0; i < 5; i++) {
  player.matrix.push(new Array(player.matrix[0].length).fill(1));
}

start();

var game;

function start() {
  game = new SpaceInvader(ctx_fore, canvas_fore, ctx_back, canvas_back, player, colors);
  update(); 
}

function update(time = 0){
  game.update_frame(time);
  if (!game.get_gameover()) {
    requestAnimationFrame(update);
  }
  /*
  else {
    gameover;
  }
  */
}

$(window).keydown(function(e) {
  if (e.keyCode == 37) {
    game.playerMove("x", -7);
  } else if (e.keyCode == 38) {
    game.playerMove("y", -4);
  } else if (e.keyCode == 39) {
    game.playerMove("x", 7);
  } else if (e.keyCode == 40) {
    game.playerMove("y", 4);
  }
});
