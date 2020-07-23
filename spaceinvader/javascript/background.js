class Background {
  constructor(ctx, canvas, player_matrix) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = ctx;
    this.background_color = "#0b0b31";
    this.player_matrix = player_matrix;
    this.player_color = colors[1];
    this.score = {
      val: 0,
      x: this.width / 10,
      y: this.height * 0.08,
      num_x: this.width / 10 + 45,
    };
    this.life = {
      val: 3,
      x: this.width / 50,
      y: this.height * 0.98,
      gap: this.player_matrix.length + 10,
      ill_start: 55,
    };
    this.update_screen();
  }
  display_life() {
    this.context.fillStyle = "white";
    this.context.font = 'bold 14px "Courier New", Courier, monospace';
    this.context.fillText("Lives", this.life.x, this.life.y);
    for (let i = 0; i < this.life.val; i++) {
      this.drawMatrix(this.life.gap * i + this.life.ill_start);
    }
  }
  
  damage() {
    this.life.val--;
    this.display_life();
  }
  
  score_increment(score) {
      this.score.val += score;
      this.update_screen();
  }
  
   drawMatrix(x_pos) {
    this.player_matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0) {
          this.context.fillStyle = this.player_color;
          this.context.fillRect(x + x_pos,
                            y + this.life.y - this.player_matrix.length,
                             1, 1);
        }
      });
    });
  }
  
  fill_background() {
    this.context.fillStyle = this.background_color;
    this.context.fillRect(0, 0, this.width, this.height);
  }
  
  getlife() {
    return this.life.val;
  }
  
  update_screen() {
    this.fill_background();
    this.display_life();
    this.update_score();
  }
  
  update_score() {
    this.context.fillStyle = "white";
    this.context.font = '12px "Courier New", Courier, monospace'
    this.context.fillText("SCORE", this.score.x, this.score.y);
    this.context.fillStyle = this.player_color;
    this.context.fillText(this.score.val.toString(), this.score.num_x, this.score.y);
  }
}