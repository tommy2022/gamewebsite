const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
const nextCanvas = document.getElementById("next");
const nextContext = nextCanvas.getContext("2d");


context.scale(20, 20);
nextContext.scale(30, 30);

const player = {
  pos: {x: 0, y: 0},
  matrix: [[[]], [[]]],
  currMatrix: 0,
  score: 0,
  gameover: false
}

const colors = [
  null,
  'purple',
  'yellow',
  'orange',
  'blue',
  'aqua',
  'green',
  'red'
]

const nextShifter = [
  null,
  {x: 2, y: 1},
  {x: 2, y: 2},
  {x: 2, y: 1},
  {x: 2, y: 1},
  {x: 2, y: 1},
  {x: 2, y: 2},
  {x: 2, y: 2},
]

const arena = createMatrix(12,20);

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
start();

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; y--) {
    for (let x = 0; x < arena[y].length; x++) {
      if (arena[y][x] == 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;
    player.score += rowCount * 10;
    dropInterval -= 10;
    updateScore();
    rowCount *= 2;
  }
}

function collide(arena, player) {
  const [m, o] = [player.matrix[player.currMatrix % 2], player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] != 0 &&
        (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) != 0) {
            return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function createPiece(blockname) {
  if (blockname == 'T') {
    return  [
       [0, 0, 0],
       [1, 1, 1],
       [0, 1, 0],
    ];
  } else if (blockname == 'O') {
    return [
      [2, 2],
      [2, 2],
    ];
  } else if (blockname == 'L') {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3],
    ];
  } else if (blockname == 'J') {
    return [
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 0],
    ];
  } else if (blockname == 'I') {
    return [
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
    ];
  } else if (blockname == 'S') {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (blockname == 'Z') {
    return [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ];
  }
}

function draw() {
  drawBlank();

  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix[player.currMatrix % 2], player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x,
                          y + offset.y,
                           1, 1);
      }
    });
  });
}

function drawBlank() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_gameover() {
  drawBlank();
  document.getElementById("scoreResult").innerHTML =  "Score: " + player.score.toString();
  $(".result").css("display", "block");
  $("#currscore").css("visibility", "hidden");
}

function dropPos() {
  player.pos.y++;
  if (collide(arena, player)) {
    dropAdjust();
  }
  dropCounter = 0;
}

function dropAdjust() {
  player.pos.y--;
  merge(arena, player);
  player.pos.y = 0;
  playerReset();
  arenaSweep();
}

function dropHard() {
  while (!collide(arena, player)) {
    player.pos.y++;
  }
  dropAdjust();
  dropCounter = 0;
}

function nextBlock() {
  debugger;
  player.currMatrix++;
  let pos = player.pos.x;
  let offset = 0;
  while (collide(arena, player)) {
    player.pos.x += (++offset % 2 == 1 ? offset : -offset);
    if (offset > player.matrix[player.currMatrix % 2][0].length) {
      player.currMatrix++;
      player.pos.x = pos;
      return;
    }
  }
  nextDraw();
}

function nextDraw() {
  nextContext.fillStyle = '#000';
  nextContext.fillRect(0, 0, canvas.width, canvas.height);

  var nextMatrix = player.matrix[(player.currMatrix + 1) % 2];
  nextMatrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        nextContext.fillStyle = colors[value];
        nextContext.fillRect(x + nextShifter[value].x, y +  nextShifter[value].y , 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix[player.currMatrix % 2].forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerReset() {
  const pieces = 'ILJOTSZ';

  if (player.currMatrix == 0) {
      player.matrix[1] = createPiece(pieces[pieces.length * Math.random() | 0]);
  }

  player.matrix[player.currMatrix % 2] = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.currMatrix++;

  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0)
                  - (player.matrix[player.currMatrix % 2][0].length / 2 | 0);
  nextDraw();
  if (collide(arena, player)) {
    player.gameover = true;
    arena.forEach(row => row.fill(0));
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 0;
  rotate(player.matrix[player.currMatrix % 2], dir);
  while (collide(arena, player)) {
    player.pos.x += (++offset % 2 == 1 ? offset : -offset);
    if (offset > player.matrix[player.currMatrix % 2][0].length) {
      rotate(player.matrix[player.currMatrix % 2], -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function start() {
  $(".result").css("display", "none");
  $("#currscore").css("visibility", "visible");
  player.score = 0;
  player.gameover = false;
  player.currMatrix = 0;
  dropInterval = 1000;



  updateScore();
  playerReset();
  update();
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y], matrix[y][x]
      ]
      = [
        matrix[y][x], matrix[x][y]
      ];
    }
  }
  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  }
  else {
    console.table(matrix);
    matrix.reverse();
    console.table(matrix);
  }
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    dropPos();
  }
  draw();
  if (!player.gameover) {
      requestAnimationFrame(update);
  }
  else {
    draw_gameover();
  }
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

$(window).keydown(function(e){
  if (e.keyCode == 37) {
    playerMove(-1);
  } else if (e.keyCode == 39) {
    playerMove(1);
  } else if (e.keyCode == 40) {
    dropPos();
  } else if (e.keyCode == 81) {
    playerRotate(1);
  } else if (e.keyCode == 87) {
    playerRotate(-1);
  } else if (e.keyCode == 32) {
    if (!player.gameover) {
      dropHard();
    }
    else {
      start();
    }
  } else if (e.keyCode == 13) {
    nextBlock();
  }

});
