class FlappyAbe extends Game {
  constructor(ctx, canvas_w, canvas_h, player, abeCtx, num_player, abe, aso, building_imgs) {
    super(ctx, abe.x_pos + abe.dim, canvas_h, player);
    this.abengers = new Abengers(abeCtx, num_player, abe, aso);
    this.player.matrix = this.createMatrix(abe.dim - 20, abe.dim - 10, 1);
    this.num_player = num_player;
    this.canvas_width = canvas_w;
    this.buildings = new Building(ctx, canvas_w, canvas_h, building_imgs, this.player,
                            this.arena, aso.x_pos - aso.dim, abe.x_pos + abe.dim);

    if (num_player == 2) {
      this.player2 = player;
      this.player2.matrix = this.createMatrix(aso.dim - 20, abe.dim - 10, 1);
    }
    this.frontContext = abeCtx;
    this.prevScore = -1;
  }

  display_score() {
    this.prevScore = this.player.score;
    this.frontContext.clearRect(250, 0, this.canvas_width, this.canvas_width);
    this.frontContext.fillStyle = "black";
    this.frontContext.font = "bold 4vmin Arial";
    this.frontContext.fillText(this.player.score, 300, 100);
  }

  drawMatrix(matrix, init_pos) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0 && x <= this.canvas_width) {
          this.context.fillStyle = colors[value];
          this.context.fillRect(x + init_pos.x,
                            y + init_pos.y,
                             1, 1);
        }
      });
    });
  }

  update_frame() {
    this.abengers.drop();
    this.buildings.update();
    this.getPos1();
    if (this.collide()) {
      this.abengers.set_status(0, true);
    }
    if (num_player == 2) {
      this.getPos2();
      if (this.collide(this.player2.matrix, this.player2.pos)) {
        this.abengers.set_status(1, true);
      }
    }
    if (this.player.score != this.prevScore) this.display_score();
    this.check_gameover();
  }

  jump(p_num) {
    this.abengers.jump(p_num - 1);
  }

  getPos1() {
    this.player.pos = this.abengers.getPos(0);
  }

  getPos2() {
    this.player2.pos = this.abengers.getPos(1);
  }

  getScore() {
    return this.player.score.toString();
  }

  check_gameover() {
    if(this.abengers.get_gameover()) {
      super.set_gameover();
    }
  }
}

class Building {
  constructor(context, canvas_w, canvas_h, images, player, arena, start_pos, end_pos) {
    this.context = context;
    this.imagesArr = images;
    this.canvas_w = canvas_w;
    this.canvas_h = canvas_h;
    this.arena = arena;
    this.start = start_pos;
    this.end = end_pos;
    this.player = player;

    this.gapHeight = 140;
    this.buildingGap = 200;
    this.width = 65;
    this.index = 0;

    this.shortHeight = (this.canvas_h - this.gapHeight) / 3;
    this.longHeight = (this.canvas_h - this.gapHeight) / 3 * 2;

    this.obstacles = [];

    for (let i = 0; i < Math.ceil(canvas_w / (this.buildingGap + this.width)); i++) {
      this.obstacles.push({
          x_pos: canvas_w + i * (this.buildingGap + this.width),
          height: null,
          img_up: null,
          img_down: null,
        });
      this.setHeight(i);
      this.selectImage(i);
    }
  }

  scoreIncrement() {
    this.player.score++;
  }

  update() {
    if (this.obstacles[this.index % this.obstacles.length].x_pos < -this.width) {
      this.createObstacle();
    }
    if (this.obstacles[this.index % this.obstacles.length].x_pos ==
                this.end - 30 - this.width ||
      this.obstacles[this.index % this.obstacles.length].x_pos
                == this.end - 31- this.width) {
        this.player.score++;
    }
    else if (this.obstacles[(this.index + 1) % this.obstacles.length].x_pos ==
                this.end - 50 - this.width ||
      this.obstacles[(this.index + 1) % this.obstacles.length].x_pos ==
        this.end - 51 - this.width) {
        this.player.score++;
    }
    this.obstacles.forEach((obj) => {
      obj.x_pos -= 2;
    });
    this.draw();
    this.reflect_arena();
  }

  createObstacle() {
    const len = this.obstacles.length;
    this.obstacles[this.index % len].x_pos =
      this.obstacles[(this.index + len - 1) % len].x_pos + (this.buildingGap + this.width)
    this.setHeight();
    this.selectImage();
    this.index++;
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas_w, this.canvas_h);
    this.obstacles.forEach((obj) => {
      if (obj.x_pos < canvas.width) {
        this.context.translate(this.canvas_w, this.canvas_h);
        this.context.rotate(Math.PI);
        this.context.drawImage(obj.img_up, this.canvas_w - obj.x_pos - this.width,
                              this.canvas_w - obj.height, this.width, obj.height);
        this.context.rotate(Math.PI);
        this.context.translate(-this.canvas_w, -this.canvas_h);
        var ref_h = this.canvas_h - this.gapHeight - obj.height;
        this.context.drawImage(obj.img_down, obj.x_pos,
                                  this.canvas_h - ref_h, this.width, ref_h);
      }
    });
  }

  reflect_arena() {
    for (let i = 0; i < this.arena.length; i++) {
      this.arena[i].fill(0);
    }
    this.obstacles.forEach((obj) => {
      if (obj.x_pos < this.end && obj.x_pos > this.start) {
        outer: for (let i = 0; i < obj.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (obj.x_pos + j >= this.end) continue outer;
            var x = obj.x_pos + j;
            this.arena[i][obj.x_pos + j] = 1;
          }
        }
        var ref_h = this.canvas_h - this.gapHeight - obj.height | 0;
        outer: for (let i = 0; i < ref_h; i++) {
          for (let j = 0; j < this.width; j++) {
            if (obj.x_pos + j >= this.end) continue outer;
            var x = obj.x_pos + j;
            var y = this.canvas_h - ref_h + i;
            this.arena[this.canvas_h - ref_h + i][obj.x_pos + j] = 1;
          }
        }
      }
    });
  }

  setHeight(index = this.index) {
    this.obstacles[index % this.obstacles.length].height =
                              Math.random() * (this.canvas_h - this.gapHeight);
  }

  selectImage(index = this.index % this.obstacles.length){
    const imgIndex = Math.random() * this.imagesArr.length | 0;
    if (this.obstacles[index].height < this.shortHeight) {
      this.obstacles[index].img_up = this.imagesArr[imgIndex].short;
      this.obstacles[index].img_down = this.imagesArr[imgIndex].long;
    }
    else if (this.obstacles[index].height > this.longHeight) {
      this.obstacles[index].img_up = this.imagesArr[imgIndex].long;
      this.obstacles[index].img_down = this.imagesArr[imgIndex].short;
    }
    else {
      this.obstacles[index].img_up = this.imagesArr[imgIndex].medium;
      this.obstacles[index].img_down = this.imagesArr[imgIndex].medium;
    }
  }
}





/*
var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d");
var bird = new Image();
bird.src="./image/test.jpg";
bird.onload = function() {
    context.drawImage(bird, 20, 20, 300, 260);
};

*/
