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
    
    this.foreground = new Foreground(fore_ctx, fore_dim, p_arena, e_arena);
    //this.background = new Background(back_ctx, canvas_back, this.player);
    this.player.pos.x = (fore_canvas.width - player.matrix[0].length)/ 2 | 0;
    this.player.pos.y = this.height - this.player.matrix.length * 1.5 | 0;
    this.player_arena = super.createMatrix(fore_canvas.width, fore_canvas.height);
    
    
    this.item_duration = 500;
    this.bullets = new Array();
  }
  
  damage_taken() {
    if(this.background.damage()) {
      super.set_gameover();
    }
  }
  
  draw() {
    this.drawBlank();
    this.drawPlayer();
    //this.drawEnemies();
    //this.drawBullets();
    this.drawArena();
  }
  
  drawArena() {
    //does not draw player
    this.arena.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value != 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x, y, 1, 1);
        }
      });
    });
    }
  
  drawPlayer() {
    super.drawMatrix(this.player_arena, this.player.pos, this.player.color);
  }
  
  drawBlank() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
  
  update_frame() {
    this.update_player();
    this.draw();
  }
  
  update_player() {
    this.player_arena.forEach((row) => {
      row.fill(0);
    });
    this.update_bullet();
  }
  
  update_bullet() {
    this.bullets.forEach((bullet) => {
      bullet.update();
    });
    //if bullet collide with enemy enemy dies
  }
  
  shoot() {
    debugger;
    this.bullets.push(new Bullet(this.player_arena, this.context, 
                              this.items.effects, this.player));
  }
}

class Bullet {
  constructor(context, items_effects, arena, player) {
    this.context = context;
    this.effects = items_effects;
    this.arena = arena;
    this.width = 4;
    this.height = 16;
    if (this.effects.large) {
      this.width *= 2;
      this.height *= 2;
    }
    this.x = [];
    this.x.push(player.pos.x + player.matrix[0].length - this.size / 2);
    if (this.effects.double) {
      const shifter = 8;
      this.x[0] -= shifter;
      this.x.push(this.x[0] + 2 * shifter);
    }
    this.y = player.pos.y - 1;
    
    this.bulletspd = 3;
    
  }
  
  update() {
    this.y -= this.bulletspd;
    this.merge();
  }
    
  merge(color_num = 10) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.x.forEach((val) => {
                  this.arena[i + this.y][j + val] = color_num; //bullet number
        });
      }
    }
  }
}