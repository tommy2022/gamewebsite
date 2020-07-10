class Game {
  constructor (context, width_in, height_in, player, scaler = 1) {
    this.context = context;
    this.width = width_in; //canvas width
    this.height = height_in; //canvas height
    this.player = player; //includes pos, matrix (of the player), score
    this.arena = this.createMatrix(this.width / scaler,
                                   this.height / scaler);

    this.gameover = false;
  }

  calc_deltatime(time) {
    const deltaTime = time - this.dropInfo.lastTime;
    this.dropInfo.lastTime = time;
    return (this.dropInfo.counter += deltaTime);
  }

  createMatrix(w, h, num = 0) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(num));
    }
    return matrix;
  }

  collide(obj = this.player.matrix, pos = this.player.pos) {
    for (let y = 0; y < obj.length; ++y) {
      for (let x = 0; x < obj[y].length; ++x) {
        if (obj[y][x] != 0 &&
          (this.arena[y + pos.y] &&
            this.arena[y + pos.y][x + pos.x]) != 0) {
              return true;
        }
      }
    }
    return false;
  }

  drawMatrix(matrix, init_pos, color) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0) {
          this.context.fillStyle = color;
          this.context.fillRect(x + init_pos.x,
                            y + init_pos.y,
                             1, 1);
        }
      });
    });
  }

  dropPos() {
    this.player.pos.y++;
  }

  get_gameover() {
    return this.gameover;
  }

  getScore() {
    return (this.player.score).toString();
  }

  merge(mergeObj = this.player.matrix) {
    mergeObj.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0) {
          this.arena[y + this.player.pos.y][x + this.player.pos.x] = value;
        }
      });
    });
  }

  playerMove(dir, val) {
    if (dir == "x") {
      this.player.pos.x += val;
      if (this.collide()) {
        this.player.pos.x -= val;
      }
    }
    else {
      this.player.pos.y += val;
      if (this.collide()) {
        this.player.pos.y -= val;
      }
    }
  }

  set_gameover() {
    this.gameover = true;
  }
}
