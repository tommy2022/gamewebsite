class FlappyAbe extends Game {
  constructor(ctx, canvas_w, canvas_h, player, abeCtx, num_player, abe, aso) {
    super(ctx, canvas_w, canvas_h, player);
    this.abengers = new Abengers(abeCtx, super.createMatrix(canvas_w, canvas_h),
                                  num_player, abe, aso);
  }
  update_frame() {
    this.abengers.drop();
  }
  jump(p_num) {
    debugger;
    this.abengers.jump(p_num - 1);
  }
}

class Abengers {
  constructor(context, arena, num_player, abe, aso) {
    this.context = context;
    this.arena = arena;

    const matrix = [];
    matrix.push(new Abe(abe, context));
    if (num_player == 2) {
      matrix.push(new Aso(aso, context));
    }
    this.characters = matrix;
    this.draw();
  }
  draw() {
    this.characters.forEach((character) => {
      character.draw();
    });
  }

  drop() {
    this.characters.forEach((character) => {
      character.drop();
    });
  }
  jump(p_num) {
    if (this.characters.length == 1) {
      this.characters[0].jump();
    }
    else {
      this.characters[p_num].jump();
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
