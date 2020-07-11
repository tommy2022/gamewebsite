class SpaceInvader extends Game {
    constructor(ctx, canvas, ctx_back, canvas_back, player) {
        super(ctx, canvas.width, canvas.height, player);
        this.background = new Background(ctx_back, canvas_back, player);
        this.player.pos.x = (canvas.width - player.matrix[0].length)/ 2 | 0;
        this.player.pos.y = this.height - this.player.matrix.length * 1.5 | 0;
    }
    
    drawBlank() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    
    update_frame() {
        this.drawBlank();
        super.drawMatrix(this.player.matrix, this.player.pos, this.player.color);
    }
}

class Background {
    constructor(ctx, canvas, player) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = ctx;
        this.background_color = "#0b0b31";
        this.player_matrix = player.matrix;
        this.player_color = player.color;
        this.score = player.score;
        
        this.fill_background();
        this.life = 3;
        this.life_x = this.width / 50;
        this.life_height = this.height * 0.98;
        
        this.display_life();
        this.update_score();
    }
    display_life() {
        const gap = this.player_matrix.length + 10;;
        this.context.fillStyle = "white";
        this.context.font = "bold 14px Arial";
        this.context.fillText("Lives", this.life_x, this.life_height);
        for (let i = 0; i < this.life; i++) {
            this.drawMatrix(gap * i + 45)
        }
    }
    
    damage() {
        this.life--;
        this.display_life();
    }
    
    enemy_kill(score) {
        if (this.score != score) {
            this.score == score;
            this.update_score();
        }
    }
    
     drawMatrix(x_pos) {
        this.player_matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value != 0) {
              this.context.fillStyle = this.player_color;
              this.context.fillRect(x + x_pos,
                                y + this.life_height - this.player_matrix.length,
                                 1, 1);
        }
      });
    });
  }
    
    fill_background() {
        this.context.fillStyle = this.background_color;
        this.context.fillRect(0, 0, this.width, this.height);
    }
    
    update_score() {
        this.context.fillStyle = "white";
        this.context.fillText("SCORE, 50, 50");
    }
}