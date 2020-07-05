class FlappyAbe extends Game {
  constructor(ctx, canvas_w, canvas_h, player, abeCtx, num_player, abe, aso, building_imgs) {
    super(ctx, canvas_w, canvas_h, player);
    this.abengers = new Abengers(abeCtx, super.createMatrix(canvas_w, canvas_h),
                                  num_player, abe, aso);
    this.player.matrix = this.createMatrix(30, 50, 1);
    this.num_player = num_player;
    this.canvas_width = canvas_w;
    this.building = new Building(ctx, canvas_w, canvas_h, building_imgs);

    if (num_player == 2) {
      this.player2 = player;
      this.player2.matrix = this.createMatrix(30, 50, 1);
    }
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
  }
  jump(p_num) {
    this.abengers.jump(p_num - 1);
  }
  getPos() {
    this.player.pos = this.abengers.getPos(0);
    if (this.num_player == 2) {
      this.player2.pos = this.abengers.getPos(1);
    }
  }
}

class Building {
  constructor(context, canvas_w, canvas_h, images) {
    console.log("building constructed");
    this.context = context;
    this.imagesArr = images;
    this.canvas_h = canvas_h;

    this.gapHeight = 50;
    this.buildingGap = 130;
    this.width = 50;
    this.index = 0;

    this.obstacles = [];

    for (let i = 0; i < Math.ceil(canvas_w / (this.buildingGap + this.width)); i++) {
      this.obstacles.push({
          x_pos: canvas_w + i * (this.buildingGap + this.width),
          height: this.setHeight(i);
          img: null,
        });
      this.selectImage(i);
    }
    debugger;
  }

  /*
  obstacleUpdate() {
    if (this.obstacles[])
  }

  createObstacle() {
    this.obstacle[first] =
  }
  */

  draw() {

  }

  setHeight(index = this.index) {
    this.obstacles[index % this.obstacles.length].height =
                              Math.random() * (this.canvas_h - this.gapHeight);

  }
  selectImage(index = this.index){
    const imgIndex = Math.random() * this.imagesArr.length | 0;
    this.obstacles[index % this.obstacles.length].img = this.imagesArr[imgIndex];
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
