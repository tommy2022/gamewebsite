class SpaceInvader extends Game {
  constructor(fore_ctx, fore_canvas, back_ctx, back_canvas, player, color) {
    super(fore_ctx, fore_canvas.width, fore_canvas.height, player);
    const fore_dim = {
      width: fore_canvas.width,
      height: fore_canvas.height,
    }
    const back_dim = {
      width: back_canvas.width,
      height: back_canvas.height,
    }
    const p_arena = super.createMatrix(fore_dim.width, fore_dim.height);
    const e_arena = super.createMatrix(fore_dim.width, fore_dim.height);
    
    this.foreground = new Foreground(fore_ctx, fore_dim, p_arena, e_arena, this.player.matrix);
    this.background = new Background(back_ctx, back_canvas, this.player.matrix);
    
    this.item_duration = 500;
  }
  
  damage_taken() {
    if(this.background.damage()) {
      debugger;
      super.set_gameover();
    }
  }
  
  update_frame(time) {
    const result = this.foreground.update(time);
    if (result.life != 0) {
      this.damage_taken();
    }
    if (result.score != 0) {
      this.score_increment(result.score);
    }
  }
  
  playerMove(dir, val) {
    this.foreground.spaceship.movePos(dir, val);
  }
  
  score_increment(score) {
    this.background.score_increment(score);
  }
  
  shoot() {
    this.foreground.spaceship.shoot();
  }
}