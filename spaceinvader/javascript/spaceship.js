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
    
    check_items() {
        if (this.items.effects.double && this.items.time.double >= 0) {
            this.items.time.double -= this.time;
            if (this.items.time.double < 0) {
                this.items.effects.double = false;
            }
        }
        if (this.items.effects.diagnal && this.items.time.diagnal >= 0) {
            this.items.time.diagnal -= this.time;
            if (this.items.time.diagnal < 0) {
                this.items.effects.diagnal = false;
            }
        }
        if (this.items.effects.large && this.items.time.large >= 0) {
            this.items.time.large -= this.time;
            if (this.items.time.large < 0) {
                this.items.effects.large = false;
            }
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
    
    enemy_hit(x_pos, y_pos) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (y_pos >= this.bullets[i].y && 
                y_pos < this.bullets[i].y + Bullet.height) {
                if (this.bullets[i].x.length == 1) {
                    this.bullets[i].x.shift();
                }
                else {
                    for (let j = 0; j < this.bullets[i].x.length; j++) {
                        if (x_pos >=  this.bullets[i].x[j] 
                        && x_pos <  this.bullets[i].x[j] + this.bullets[i].width) {
                            this.bullets[i].x.splice(j, 1);
                        }
                    }
                }
                return;
            }
        }
    }
    
    item_collected(effect_name) {
        if (effect_name == "double") {
            this.items.effects.double = true;
            this.items.time.double = Spaceship.item_interval;
        }
        else if (effect_name == "diagnal") {
            this.items.effects.diagnal = true;
            this.items.time.diagnal = Spaceship.item_interval;
        }
        else if (effect_name == "large") {
            this.items.effects.large = true;
            this.items.time.large = Spaceship.item_interval;
        }
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
            if (bullet) {
                bullet.update();
            }
        });
    }

    
    shoot(time) {
        this.time += (time - this.lastTime);
        this.lastTime = time;
        if (this.time > this.attack_interval) {
            this.check_items();
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

Spaceship.item_interval = 10000;
