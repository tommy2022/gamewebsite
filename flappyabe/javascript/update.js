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

var building_imgs;

const abe = {
  rise: new Image(),
  fall: new Image(),
  x_pos: 200,
  dim: 50,
}
const aso = {
  rise: new Image(),
  fall: new Image(),
  x_pos: 125,
  dim: 50,
}

get_images();


function get_images() {
  const building1 = {
    short: new Image(),
    medium: new Image(),
    long: new Image(),
  }
  const building2 = {
    short: new Image(),
    medium: new Image(),
    long: new Image(),
  }
  const building3 = {
    short: new Image(),
    medium: new Image(),
    long: new Image(),
  }
  setImages(building1, "building1");
  setImages(building2, "building2");
  setImages(building3, "building3");

  building_imgs = [
    building1,
    building2,
    building3,
  ];

  abe.rise.src = "./image/abe_rise.png";
  abe.fall.src = "./image/abe_fall.png";

  aso.rise.src = "./image/aso_rise.png";
  aso.fall.src = "./image/aso_fall.png";
  aso.fall.onload = function() {
    started = false;
    menu_display();
  };
}

function setImages(building, name) {
  building.short.src = "./image/" + name + "/short.jpg";
  building.medium.src = "./image/" + name + "/medium.jpg";
  building.long.src = "./image/" + name + "/medium.jpg";
}

function get_coordinates(event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) / canvas.clientWidth * canvas.width;
  const y = (event.clientY - rect.top) / canvas.clientHeight * canvas.height;
  get_menu_option(x, y);
}

function menu_display() {
  player.score = 0;
  started = false;

  ctx.fillStyle = "#000080";
  ctx.fillRect(70, 430, 200, 80);
  ctx.fillRect(340, 430, 200, 80);

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "black";
  ctx.rect(70, 430, 200, 80);
  ctx.rect(340, 430, 200, 80);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.rect(72, 432, 196, 76);
  ctx.rect(342, 432, 196, 76);
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.font = 'bold 2.2vmin "Courier New", Courier, monospace';
  ctx.fillText("Single player", 85, 470);
  ctx.fillText("Double player", 360, 470);

  ctx.drawImage(abe.fall, 130, 360, 70, 70);
  ctx.drawImage(abe.fall, 440, 360, 70, 70);
  ctx.drawImage(aso.fall, 370, 360, 70, 70);
}

function get_menu_option(x, y) {
  //single player
  if ((x < 270 && x > 70) && (y > 430 && y < 510)) {
    num_player = 1;
    startgame();
  }
  else if ((x > 340 && x < 540) && (y > 430 && y < 510)) {
    num_player = 2;
    startgame();
  }
}

function gameover_screen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  abeCtx.clearRect(0, 0, abeCanvas.width, abeCanvas.height);
  $("#canvas").css("background-blend-mode", "normal");
  const score = "Your score: " + flappyabe.getScore();
  ctx.fillStyle = "white";
  ctx.font = 'bold 5vmin Arial';
  ctx.fillText(score, 150, 100);
  menu_display();
}


function startgame() {
  $("#canvas").css("background-blend-mode", "lighten");
  flappyabe = new FlappyAbe(ctx, canvas.width, canvas.height, player, abeCtx, num_player, abe, aso, building_imgs);
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

var down = false;

$(window).keydown(function(e){
  if (down) return;
  down = true;
  if (e.keyCode == 32) {
    if (!flappyabe.get_gameover()) {
      flappyabe.jump(2);
    }
    else {
      startgame();
    }
  } else if (e.keyCode == 87 && !flappyabe.get_gameover()) {
      flappyabe.jump(2);
  } else if (e.keyCode == 38 && !flappyabe.get_gameover()) {
    flappyabe.jump(1);
  } else if (e.keyCode == 13  && !flappyabe.get_gameover()) {
      flappyabe.jump(1);
  } else if (e.keyCode == 27) {
    flappyabe.set_gameover();
  }
});
$(window).keyup(function(e) {
  down=false;
});
