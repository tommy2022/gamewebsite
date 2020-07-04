var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var abeCanvas = document.getElementById("abe");
var abeCtx = abeCanvas.getContext("2d");
let num_player;
let started = null;

const player = {
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0,
}

var p1;
var p2;
const abe = {
  rise: new Image(),
  fall: new Image(),
}
const aso = {
  rise: new Image(),
  fall: new Image(),
}
abe.rise.src = "./image/abe_rise.jpg";
abe.fall.src = "./image/abe_fall.jpg";

aso.rise.src = "./image/aso_rise.jpg";
aso.fall.src = "./image/aso_fall.jpg";
aso.fall.onload = function() {
  started = false;
  menu_display();
};

function get_coordinates(event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) / canvas.clientWidth * canvas.width;
  const y = (event.clientY - rect.top) / canvas.clientHeight * canvas.height;
  console.log(x, y);
  get_menu_option(x, y);
}

function menu_display() {
$("#canvas").css("background-blend-mode:", "normal");

  ctx.fillStyle = "#000080";
  ctx.fillRect(70, 430, 200, 130);
  ctx.fillRect(340, 430, 200, 130);

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "black";
  ctx.rect(70, 430, 200, 130);
  ctx.rect(340, 430, 200, 130);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.rect(72, 432, 196, 126);
  ctx.rect(342, 432, 196, 126);
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.font = '2vmin "Courier New", Courier, monospace'
  ctx.fillText("Hello World!", 76, 50)
}

function get_menu_option(x, y) {
  //single player
  if ((x < 270 && x > 70) && (y > 430 && y < 560)) {
    num_player = 1;
    startgame();
  }
  else if ((x > 340 && x < 540) && (y > 430 && y < 560)) {
    num_player = 2;
    startgame();
  }
}

function gameover_screen() {
  started = false;
}

function startgame() {
  $("#canvas").css("background-blend-mode", "lighten");
  flappyabe = new FlappyAbe(ctx, canvas.width, canvas.height, player, abeCtx, num_player, abe, aso);
  started = true;
  update();
}

function update() {
  flappyabe.update_frame();
  if(!flappyabe.get_gameover()) {
    requestAnimationFrame(update);
  }
  else {
      gameover_screen();
  }
}



$(document).on('click', function(e) {
  if (started == false) {
    get_coordinates(e);
  }
  else {
    flappyabe.jump(1);
  }
})

$(window).keydown(function(e){
  if (e.keyCode == 32) {
    if (!flappyabe.get_gameover()) {
      flappyabe.jump(2);
    }
    else {
      startgame();
    }
  } else if (e.keyCode == 87 && !flappyabe.get_gameover()) {
      if (!flappyabe.get_gameover()) {
        flappyabe.jump(2);
      }
  } else if (e.keyCode == 38) {
      if (!flappyabe.get_gameover()) {
        flappyabe.jump(1);
      }
  } else if (e.keyCode == 13) {
      if (!flappyabe.get_gameover()) {
        flappyabe.jump(1);
      }
      else {
        menu_display();
      }
  } else if (e.keyCode == 27) {
    menu_display();
  }
});
