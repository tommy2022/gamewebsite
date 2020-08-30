const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const nextCanvas = document.getElementById("next");
const nextCtx = nextCanvas.getContext("2d");

const dim_main = {
  width: canvas.width,
  height: canvas.height,
  scaler: 20,
};

const dim_next = {
  width: nextCanvas.width,
  height: nextCanvas.height,
  scaler: 30,
};

ctx.scale(dim_main.scaler, dim_main.scaler);
nextCtx.scale(dim_next.scaler, dim_next.scaler);

const player = {
  pos: {x: 0, y: 0},
  matrix: [[[]], [[]]],
  currMatrix: 0,
  score: 0,
};
const dropInterval = 1000;

const colors = [
  null,
  'purple',
  'yellow',
  'orange',
  'blue',
  'aqua',
  'green',
  'red'
];
const nextShifter = [
  null,
  {x: 2, y: 1},
  {x: 2, y: 2},
  {x: 2, y: 1},
  {x: 2, y: 1},
  {x: 2, y: 1},
  {x: 2, y: 2},
  {x: 2, y: 2},
];

var tetris;

start();

function start() {
  $(".result").css("display", "none");
  $("#currscore").css("visibility", "visible");
  player.score = 0;
  tetris = new Tetris(player, colors, ctx, dim_main, nextCtx, dim_next, nextShifter);
  update();
}


function update(time = 0) {
  tetris.update_frame(time);
  if (!tetris.get_gameover()) {
      requestAnimationFrame(update);
  }
  else {
    set_score(tetris.getScore(), "TE", username);
    tetris.draw_gameover();
  }
}



$(window).keydown(function(e){
  if (e.keyCode == 37) {
    tetris.playerMove(-1);
  } else if (e.keyCode == 39) {
    tetris.playerMove(1);
  } else if (e.keyCode == 40) {
    tetris.dropPos();
  } else if (e.keyCode == 81) {
    tetris.playerRotate(1);
  } else if (e.keyCode == 87) {
    tetris.playerRotate(-1);
  } else if (e.keyCode == 32) {
    if (!tetris.get_gameover()) {
      tetris.dropHard();
    }
    else {
      start();
    }
  } else if (e.keyCode == 13) {
    tetris.nextBlock();
  }
});
