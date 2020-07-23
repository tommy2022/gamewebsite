class Spaceship {
    constructor(arena, fore_dim, player_matrix) { 
        this.arena = arena;
        this.ctx_dim = fore_dim;
        this.matrix = player_matrix;
        this.num_color = 1;
        
        this.pos = {
            x: (this.ctx_dim.width - this.matrix[0].length) / 2 | 0,
            y: this.ctx_dim.height - this.matrix.length * 1.5 | 0,
        };
        
        this.items = {
          effects: {
            double: false,
            diagnal: false,
            large: false,
          },
          time: {
            double: 0,
            diagnal: 0,
            large: 0,
          },
        };
        
        this.bullets = [];
        this.draw();
        this.attack_interval = 600;
        this.lastTime = 0;
        this.time = 0;
    }
    
    check_boudary() {
        if (this.pos.x < 0) {
            this.pos.x = 0;
        } else if (this.pos.x >= this.arena[0].length - this.matrix[0].length) {
            this.pos.x = this.arena[0].length - this.matrix[0].length - 1;
        } else if (this.pos.y < 0) {
            this.pos.y = 0;
        } else if (this.pos.y >= this.arena.length - this.matrix.length) {
            this.pos.y = this.arena.length - this.matrix.length - 1;
        }
    }
    
    draw() {
        this.matrix.forEach((row, y) => {
           row.forEach((value, x) => {
                if (value != 0) {
                    this.arena[y + this.pos.y][x + this.pos.x] = value;
                }
           });
        });
    }
    
    movePos(dir, val) {
        if (dir == "x") {
            this.pos.x += val;
        }
        else {
            this.pos.y += val;
        }
        this.check_boudary();
    }
    
    update(time) {
        this.shoot(time);
        reset_arena(this.arena);
        if (this.bullets[0] && this.bullets[0].reachEnd()) {
            this.bullets.shift();
        }
        this.update_bullet();
        this.draw();
    }
    
    update_bullet() {
        this.bullets.forEach((bullet) => {
            bullet.update();
        });
    }

    
    shoot(time) {
        this.time += (time - this.lastTime);
        this.lastTime = time;
        if (this.time > this.attack_interval) {
            this.time = 0;
            const position = {
                x: this.pos.x + this.matrix[0].length / 2 | 0,
                y: this.pos.y,
            }
            this.bullets.push(new Bullet(this.arena, this.items.effects, 
                                position, -2, -this.num_color));
        }
    }
}
