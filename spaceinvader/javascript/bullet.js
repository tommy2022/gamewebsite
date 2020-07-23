class Bullet {
  constructor(arena, items_effects, pos, dir, num) {
    this.effects = items_effects;
    this.arena = arena;
    this.dir = dir;
    this.num = num;
    this.width = Bullet.width;

    if (this.effects.large) {
      this.width *= 5;
    }
    this.x = [];
    this.x.push(pos.x - (this.width / 2 | 0));
    if (this.effects.double) {
      const shifter = 4;
      this.x[0] -= shifter;
      this.x.push(this.x[0] + 2 * shifter);
    }
    
    if (this.effects.diagnal) {
      this.x.forEach((x_pos) => {
        this.x.push(x_pos);
        this.x.push(x_pos);
      });
    }
    this.y = pos.y + this.dir;
  }
  
  draw() {
    this.x.forEach((val) => {
      for (let i = 0; i < Bullet.height; i++) {
        for (let j = 0; j < this.width; j++) {
          if (i + this.y > 0 && i + this.y < this.arena.length) {
            this.arena[i + this.y][j + val] = this.num; //bullet number
          }
        }
      }
    });
  }
  
  get_x() {
    return this.x;
  }
  
  
  reachEnd() {
    if (this.y <= -Bullet.height || this.y >= this.arena.length) {
      return true;
    }
    return false;
  }
  
  update() {
    this.draw();
    this.y += this.dir;
    if (this.x.length > 2) {
      //if diagnal
      this.update_diagnal();
    }
  }
  
  update_diagnal() {
    const start_index = this.x.length / 3;
    for (let i = start_index; i < this.x.length; i++) {
      if (i % 2 == 0) {
        this.x[i] -= 1;
      }
      else {
        this.x[i] += 1;
      }
    }
  }
}

Bullet.width = 1;
Bullet.height = 2;