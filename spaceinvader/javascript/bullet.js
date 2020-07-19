class Bullet {
  constructor(arena, items_effects, position, dir, num) {
    this.effects = items_effects;
    this.arena = arena;
    this.dir = dir;
    this.num = num;

    if (this.effects.large) {
      this.width *= 2;
      this.height *= 2;
    }
    this.x = [];
    this.x.push(pos.x - this.size / 2);
    if (this.effects.double) {
      const shifter = 8;
      this.x[0] -= shifter;
      this.x.push(this.x[0] + 2 * shifter);
    }
    this.y = pos.y + this.dir;
    
    this.bulletspd = 3;
    
  }
  
  update() {
    this.y -= this.bulletspd;
    this.merge();
  }
    
  draw() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.x.forEach((val) => {
                  this.arena[i + this.y][j + val] = this.num; //bullet number
        });
      }
    }
  }
}

Bullet.width = 2;
Bullet.height = 6;