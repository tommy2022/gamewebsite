class Enemy {
    constructor(arena, ) {
        this.arena = arena;
        this.dir = 1;
        this.x_pos = 0;
        
        const margin_scale = 0.7;
        let h = this.arena.length * margin_scale/ Aliens.blockDim;
        const w = this.arena[0].length * margin_scale / Aliens.blockDim;
        this.turn_x = this.arena[0].length - w * Aliens.blockDim;
        
        this.enemy_army = [];
        while (h--) {
            this.enemy_army.push(new Array(w));
        }
        this.enemy_army[0].fill(new Octopus);
        
    }
    
    defeated(x_pos, y_pos) {
        
    }
    
    drop() {
        this.dir *= 1;
        
    }
    
    update() {
        this.x_pos += dir;
        this.enemy_army.forEach((row, y) => {
           row.forEach((enemy, x) => {
               if (enemy != null) {
                   this.draw(enemy.update(dir, 
                            x * Alian.blockDim + x_pos,  y * Alian.blockDim));
               }
           }); 
        });
        if (this.x_pos == 0 || this.x_pos == this.turn_x) {
            drop();
        }
    }
}

class Aliens {
    constructor(score_in, color_num, row, col, arena) {
        this.arena = arena;
        this.score = score_in;
        this.color_num =color_num;
        this.matrix = null;
        this.bullet_effects = null;
        this.bullet = null;
    }
    
    attack () {
        this.bullet = new Bullet(this.arena, this.bullet_effects, position, 1, this.color_num * -1);
    }
    
    update(dir) {
        movePos(dir)
        //return position
    }
    
    dropRow() {
        this.pos.y += this.blockDim;
    }
    
    movePos(val) {
        this.pos.x += val;
    }
    
    reflect(matrix, middle) {
        const newMat = new Array(matrix.length);
        matrix.forEach((row, index) => {
          newMat[index] = row;

          if (middle) {
            var num = row.length- 1;
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
    draw_bullet() {
        this.bullet.draw();
    }
}

Aliens.dim = 4;
Aliens.blockDim = 15;

class Octopus extends Aliens {
    constructor (row, col, arena) {
        super(10, 5, row, col, arena);
        
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
}

class Crab extends Aliens {
    constructor (row, col) {
        super(20, 6, row, col);
    
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
    }
}

class Squid extends Aliens {
    constructor (row, col) {
        super(30, 7, row, col);
        
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
    }
}