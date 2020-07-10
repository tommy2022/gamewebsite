class Tetris extends Game {
  constructor (player_in, colors_in, context, dim_main, next, dim_next, shifter) {
    super(context, dim_main.width, dim_main.height, player_in, dim_main.scaler);
    this.next = new NextTetris(next, dim_next, shifter);

    this.colors = colors_in;

    this.dropInfo = {
      counter: 0,
      interval: 1000,
      lastTime: 0,
    }


    this.updateScore();
    this.playerReset();
  }

  arenaSweep() {
    let rowCount = 1;
    outer: for (let y = this.arena.length - 1; y > 0; y--) {
      for (let x = 0; x < this.arena[y].length; x++) {
        if (this.arena[y][x] == 0) {
          continue outer;
        }
      }
      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      y++;
      this.player.score += rowCount * 10;
      this.dropInfo.interval -= 10;
      this.updateScore();
      rowCount *= 2;
    }
  }

  createPiece(blockname) {
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

  collide() {
    const [obj, pos] = [this.player.matrix[player.currMatrix % 2], this.player.pos];
    return super.collide(obj, pos);
  }

  draw() {
    this.drawBlank();

    this.drawMatrix(this.arena, {x: 0, y: 0});
    this.drawMatrix(this.player.matrix[player.currMatrix % 2], this.player.pos);
    this.showShadow();
  }

  drawBlank() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawMatrix(matrix, init_pos, color) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x + init_pos.x,
                            y + init_pos.y,
                             1, 1);
        }
      });
    });
  }

  draw_gameover() {
    this.drawBlank();
    this.next.blank();
    document.getElementById("scoreResult").innerHTML =  "Score: " + super.getScore();
    $(".result").css("display", "block");
    $("#currscore").css("visibility", "hidden");
  }

  dropAdjust() {
    this.player.pos.y--;
    super.merge(player.matrix[player.currMatrix % 2]);
    this.player.pos.y = 0;
    this.playerReset();
    this.arenaSweep();
  }

  dropPos() {
    this.player.pos.y++;
    if (this.collide()) {
      this.dropAdjust();
    }
    this.dropInfo.counter = 0;
  }

  dropHard() {
    while (!this.collide()) {
      this.player.pos.y++;
    }
    this.dropAdjust();
    this.dropInfo.counter = 0;
  }

  nextBlock() {
    player.currMatrix++;
    this.nextDraw_helper();
    let offset = 0;
    while (this.collide()) {
      this.player.pos.x += (++offset % 2 == 1 ? offset : -offset);
      if (offset > this.player.matrix[this.player.currMatrix % 2][0].length) {
        player.currMatrix++;
        this.player.pos.x = pos;
        return;
      }
    }
  }

  nextDraw_helper() {
    this.next.draw(this.player.matrix[(this.player.currMatrix + 1) % 2]);
  }

  playerMove(val) {
    super.playerMove("x", val);
  }

  playerReset() {
    const pieces = 'ILJOTSZ';

    if (this.player.currMatrix == 0) {
        this.player.matrix[1] = this.createPiece(pieces[pieces.length * Math.random() | 0]);
    }

    this.player.matrix[this.player.currMatrix % 2] = this.createPiece(pieces[pieces.length * Math.random() | 0]);
    this.player.currMatrix++;
    this.player.pos.y = 0;
    this.player.pos.x = (this.arena[0].length / 2 | 0)
                    - (this.player.matrix[this.player.currMatrix % 2][0].length / 2 | 0);
    this.nextDraw_helper();
    if (this.collide()) {
      super.set_gameover();
      this.arena.forEach(row => row.fill(0));
    }
  }

  playerRotate(dir) {
    const pos = this.player.pos.x;
    let offset = 0;
    this.rotate(this.player.matrix[this.player.currMatrix % 2], dir);
    while (this.collide()) {
      this.player.pos.x += (++offset % 2 == 1 ? offset : -offset);
      if (offset > this.player.matrix[this.player.currMatrix % 2][0].length) {
        this.rotate(this.player.matrix[this.player.currMatrix % 2], -dir);
        this.player.pos.x = pos;
        return;
      }
    }
  }

  rotate(matrix, dir) {
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
      matrix.reverse();
    }
  }

  showShadow() {
    const y_pos = this.player.pos.y;
    this.player.pos.y++;
    if (this.collide()) {
      this.player.pos.y--;
      return;
    }
    while (!this.collide()) {
      this.player.pos.y++;
    }
    this.player.pos.y--;
    super.drawMatrix(this.player.matrix[player.currMatrix % 2], this.player.pos, "rgba(220, 220, 220, 0.5)");
    this.player.pos.y = y_pos;
  }

  update_frame(time) {
    if (this.calc_deltatime(time) > this.dropInfo.interval) {
      this.dropPos();
    }
    this.draw();
  }

  updateScore() {
    document.getElementById('score').innerText = super.getScore();
  }
}

class NextTetris {
  constructor(next, dimension, shifter) {
    this.context = next;
    this.shifter = shifter;
    this.width = dimension.width;
    this.height = dimension.height;
  }
  blank() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
  }
  draw(nextBlock) {
    this.blank();
    nextBlock.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0) {
          this.context.fillStyle = colors[value];
          this.context.fillRect(x + nextShifter[value].x, y +  nextShifter[value].y , 1, 1);
        }
      });
    });
  }
}
