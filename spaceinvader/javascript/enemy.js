class Enemy {
    constructor(arena) {
        this.arena = arena;
        this.dir = 1;
        this.start = 0;
        this.counter = 0;

        
        const margin_scale = 0.7;
        let h = this.arena.length / Aliens.blockDim;
        const w = this.arena[0].length * margin_scale / Aliens.blockDim | 0;
        this.turn_x = this.arena[0].length - w * Aliens.blockDim;
        
        this.enemy_army = [];
        while (h--) {
            this.enemy_army.push(new Array(w));
        }
        this.fill_row(0, 0);
    }
    
    defeated(x_pos, y_pos) {
        debugger;
        const row = y_pos / Aliens.blockDim | 0;
        const col = (x_pos - this.start) / Aliens.blockDim | 0;
        const score_gain = this.enemy_army[row][col].get_score();
        this.enemy_army[row][col] = null;
        return score_gain;
    }
    
    drop(time) {
        this.dir *= -1;
        this.enemy_army.splice(this.enemy_army.length - 1);
        const rand = Math.random() * 3 | 0;
        this.enemy_army.unshift(new Array (this.enemy_army[0].length));
        this.fill_row(0, rand, time);
    }
    
    fill_row(row, character, time) {
        if (character == 0) {
            for (let i = 0; i < this.enemy_army[0].length; i++) {
                this.enemy_army[row][i] = new Octopus(this.arena, time);
            }
        }
        
        else if (character == 1) {
            for (let i = 0; i < this.enemy_army[0].length; i++) {
                this.enemy_army[row][i] = new Crab(this.arena, time);
            }
        }
        
        else {
            for (let i = 0; i < this.enemy_army[0].length; i++) {
                this.enemy_army[row][i] = new Squid(this.arena, time);
            }
        }
    }
    
    player_hit(x_pos, y_pos, number) {
        this.enemy_army.forEach((row) => {
            row.forEach((enemy) => {
                if (enemy && enemy.bullet && enemy.color_num == number) {
                    if(enemy.check_bullet_pos(x_pos, y_pos)) {
                        enemy.bullet = null;
                    }
                }
            });
        });
    }
    
    update(time) {
        if (this.counter != 2) {
            this.counter++;
        }
        else if (this.counter == 2) {
            this.counter = 0;
            this.start += this.dir;
            if (this.start == 0 || this.start == this.turn_x) {
                this.drop(time);
            }
        }
        reset_arena(this.arena);
        this.enemy_army.forEach((row, y) => {
           row.forEach((enemy, x) => {
               if (enemy != null) {
                    enemy.update(time,
                        x * Aliens.blockDim + this.start,  y * Aliens.blockDim);
               }
           }); 
        });

    }
}

class Aliens {
    constructor(score_in, color_num, interval, arena, time) {
        this.arena = arena;
        this.score = score_in;
        this.color_num = color_num;
        this.matrix = null;
        this.bullet_effects = null;
        this.bullet = null;
        this.attack_interval = interval;
        this.time = Math.random() * this.attack_interval;
        this.lastTime = time;
    }
    
    attack (x_pos, y_pos, speed = 2) {
        const pos = {
            x: x_pos + this.matrix[0].length / 2 | 0,
            y: y_pos,
        };
        this.bullet = new Bullet(this.arena, this.bullet_effects, pos, speed, this.color_num * -1);
    }
    
    draw(x_pos, y_pos) {
        const adjust = (Aliens.blockDim - this.matrix[0].length) / 2 | 0;
        this.matrix.forEach((row, y) => {
            row.forEach((number, x) => {
                if (number != 0) {
                   this.arena[y_pos + y][x_pos + x + adjust] = number;
                }
            });
        });
    }
    
    draw_bullet() {
        this.bullet.draw();
    }
    
    get_score() {
        return this.score;
    }
    
    increment_time(time, x_pos, y_pos) {
        this.time += (time - this.lastTime);
        this.lastTime = time;
        if (this.time > this.attack_interval && !this.bullet) {
            this.time = 0;
            this.attack(x_pos, y_pos);
        }
    }
        
    update(time, x_pos, y_pos) {
        if (this.attack_interval) {
            this.increment_time(time, x_pos, y_pos);
        }
        this.draw(x_pos, y_pos);
        if (this.bullet) {
            if (this.bullet.reachEnd()) {
                this.bullet = null;
            }
            else {
                this.bullet.update();
                this.draw_bullet();
            }
        }
    }
    
    reflect(matrix, middle) {
        const newMat = new Array(matrix.length);
        matrix.forEach((row, index) => {
          newMat[index] = row;

          if (middle) {
            var num = row.length - 1;
          }
          else {
            var num = row.length - 2;
          }

          for (let i = num; i >= 0; i--) {
            newMat[index].push(row[i]);
          }
        });
        return newMat;
    }
    
    check_bullet_pos(x_pos, y_pos) {
        if (!this.bullet) return;
        if (y_pos >= this.bullet.y && y_pos < this.bullet.y + Bullet.height) {
            const bullet_x = this.bullet.get_x;
            bullet_x.forEach((x) => {
               if (x_pos >= x && x_pos < x + this.bullet.width)  {
                   return true;
               }
            });
        }
    }

}

Aliens.dim = 4;
Aliens.blockDim = 20;

class Octopus extends Aliens {
    constructor (arena, time) {
        super(10, 5, null, arena, time);
        
        const octopus = [
            [0, 0, 0, 0, 5, 5],
            [0, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5],
            [5, 5, 5, 0, 0, 5],
            [5, 5, 5, 5, 5, 5],
            [0, 0, 0, 5, 5, 0],
            [0, 0, 5, 5, 0, 5],
            [5, 5, 0, 0, 0, 0],
      ];
      this.matrix = super.reflect(octopus, true);
    }
    attack() {
        return;
    }
}

class Crab extends Aliens {
    constructor (arena, time) {
        super(20, 6, 10000, arena, time);
    
        const crab = [
            [0, 0, 6, 0, 0, 0],
            [0, 0, 0, 6, 0, 0],
            [0, 0, 6, 6, 6, 6],
            [0, 6, 6, 0, 6, 6],
            [6, 6, 6, 6, 6, 6],
            [6, 0, 6, 6, 6, 6],
            [6, 0, 6, 0, 0, 0],
            [0, 0, 0, 6, 6, 0],
        ];
        this.matrix = super.reflect(crab, false);
        
        this.bullet_effects = {
            double: false,
            diagnal: false,
            large: false,
        };
    }
    
    attack (x_pos, y_pos) {
        super.attack(x_pos, y_pos, 4);
    }
}

class Squid extends Aliens {
    constructor (arena, time) {
        super(30, 7, 20000, arena, time);
        
        const squid = [
            [0, 0, 0, 7],
            [0, 0, 7, 7],
            [0, 7, 7, 7],
            [7, 7, 0, 7],
            [7, 7, 7, 7],
            [0, 0, 7, 0],
            [0, 7, 0, 7],
            [7, 0, 7, 0],
      ];
        this.matrix = super.reflect(squid, true);
        this.bullet_effects = {
            double: false,
            diagnal: true,
            large: false,
        };
    }
}