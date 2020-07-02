class Game {
  constructor (context, width_in, height_in, player, scaler = 1) {
    this.context = context;
    this.width = width_in;
    this.height = height_in;
    this.player = player;
    this.arena = this.createMatrix(this.width / scaler,
                                   this.height / scaler);
    this.dropInfo = {
      counter: 0,
      interval: 1000,
      lastTime: 0,
    }
    this.gameover = false;
  }

  calc_deltatime(time) {
    const deltaTime = time - this.dropInfo.lastTime;
    this.dropInfo.lastTime = time;
    return (this.dropInfo.counter += deltaTime);
  }

  createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
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

  dropPos() {
    this.player.pos.y++;
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

  set_gameover() {
    this.gameover = true;
  }
}
