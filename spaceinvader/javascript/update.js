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
  ctx_fore.clearRect(0, 0, canvas_fore.width, canvas_fore.height);
  game = new SpaceInvader(ctx_fore, canvas_fore, ctx_back, canvas_back, player);
  update(); 
}

function update(time = 0) {
  game.update_frame(time);
  if (!game.get_gameover()) {
    requestAnimationFrame(update);
  }
  else {
    gameover_screen();
  }
}

function gameover_screen() {
  ctx_fore.clearRect(0, 0, canvas_fore.width, canvas_fore.height);
  ctx_back.fillStyle = "#0b0b31";
  ctx_back.fillRect(0, 0, canvas_back.width, canvas_back.height);
  const score = "Your score: " + game.getScore();
  
  ctx_fore.fillStyle = "#8B0000";
  ctx_fore.font = 'bold 25px "Courier New", Courier, monospace';
  ctx_fore.fillText("Game Over", 85, 40);
  
  ctx_fore.fillStyle = "white";
  ctx_fore.font = 'bold 15px Arial';
  ctx_fore.fillText(score, 95, 90);
  
  ctx_fore.font = '10px';
  ctx_fore.fillText("Press space to play again", 60, 170);
}

$(window).keydown(function(e) {
  if (e.keyCode == 37) {
    game.playerMove("x", -7);
  } else if (e.keyCode == 39) {
    game.playerMove("x", 7);
  } if (e.keyCode == 32 && game.get_gameover()) {
    start();
  }
});