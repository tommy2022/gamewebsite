class Foreground {
    constructor(fore_ctx, fore_dim, player_arena, enemy_arena, player_matrix) {

        this.context = fore_ctx;
        this.dim = fore_dim;
        
        this.player_arena = player_arena;
        this.enemy_arena = enemy_arena;
        this.counter = 0;
        this.spaceship = new Spaceship(this.player_arena, fore_dim, player_matrix);
        this.enemy = new Enemy(this.enemy_arena);
        this.rtn = {
          life: 0,
          score: 0,
        };
    }

    collide() {
      this.reset_rtn();
      for (let i = 0; i < this.player_arena.length; i++) {
        for (let j = 0; j < this.player_arena[0].length; j++) {
          if (this.player_arena[i][j] != 0 && this.enemy_arena[i][j] != 0) {
            if(this.collide_action(i, j, this.player_arena[i][j], this.enemy_arena[i][j])) {
              return;
            }
          }
        }
      }
    }
    
    collide_action(i , j, p_val, e_val) {
      if (p_val < 0 && e_val < 0) return;
      else if (p_val < 0 && e_val > 0) {
        this.rtn.score += this.enemy.defeated(j, i);
        this.spaceship.enemy_hit(j, i);
        return true;
      }
      else if (p_val > 0 && e_val > 0) {
        this.rtn.life = 1;
        this.enemy.defeated(j, i);
        return true;
      }
      else if (p_val > 0 && e_val < 0) {
        if (e_val <= -10) {
          const effect = this.enemy.get_item(j, i);
          this.spaceship.item_collected(effect);
        }
        else {
          this.rtn.life = 1;
          this.enemy.player_hit(j, i, -e_val);
        }
        return true;
      }
    }
    
    draw() {
      this.draw_blank();
      this.draw_arena(this.enemy_arena);
      this.draw_arena(this.player_arena);
    }
    
    draw_blank() {
      this.context.clearRect(0, 0, this.dim.width, this.dim.height);
    }
    
    draw_arena(matrix) {
        matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value < 0) {
              this.context.fillStyle = colors[-value];
              this.context.fillRect(x, y, 1, 1);
            }
            if (value > 0) {
              this.context.fillStyle = colors[value];
              this.context.fillRect(x, y, 1, 1);
            }
          });
        });
    }
    
    reset_rtn() {
      this.rtn.life = 0;
      this.rtn.score = 0;
    }
    
    update(time) {
      this.spaceship.update(time);
      this.enemy.update(time);
      this.draw();
      this.collide();
      return this.rtn;
    }
}

