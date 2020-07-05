class Abengers {
  constructor(context, arena, num_player, abe, aso) {
    this.context = context;
    this.arena = arena;

    const temp = [];
    temp.push(new Abe(abe, context));
    if (num_player == 2) {
      temp.push(new Aso(aso, context));
    }
    this.characters = temp;
    this.draw();
  }
  draw() {
    this.characters.forEach((character) => {
      character.draw();
    });
  }

  drop() {
    this.characters.forEach((character) => {
      character.drop();
    });
  }
  jump(p_num) {
    if (this.characters.length == 1) {
      this.characters[0].jump();
    }
    else {
      this.characters[p_num].jump();
    }
  }
  getPos(index) {
    return this.characters[index].getPos();
  }
}

class Jiminto {
  constructor(images, context, x_pos) {
    this.context = context;
    this.img = {
      rise: images.rise,
      fall: images.fall,
    }
    this.pos = {
      x: x_pos,
      y: 50,
    }
    this.dim = {
      w: 50,
      h: 50,
    }
    this.rate = 0;
    this.jumpInitSpeed = -10;
    this.count_after_rise = 0;
  }

  clear() {
    this.context.clearRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
  }

  draw() {
    if (this.rate >= 0 || this.count_after_rise < 5) {
      this.draw_fall();
    }
    else {
      this.draw_rise();
    }
  }

  draw_fall() {
    this.context.drawImage(this.img.fall, this.pos.x, this.pos.y, this.dim.w, this.dim.h);
  }

  draw_rise() {
    this.context.drawImage(this.img.rise, this.pos.x, this.pos.y, this.dim.w, this.dim.h);
  }

  drop() {
    this.count_after_rise++;
    this.time++;
    this.clear();
    this.pos.y += this.rate;
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.rate = 0;
    }
    else if (this.pos.y > canvas.height - this.dim.h) {
      this.pos.y = canvas.height - this.dim.h;
    }
    this.rate += 0.5;
    this.draw();
  }

  jump() {
    this.count_after_rise = 0;
    this.rate = this.jumpInitSpeed;
  }

  getPos() {
    return {
      x: this.pos.x,
      y: this.pos.y,
    }
  }
}

class Abe extends Jiminto {
  constructor(abe, context) {
    super(abe, context, 200);
  }
}

class Aso extends Jiminto{
  constructor(aso, context) {
    super(aso, context, 125);
  }
}
