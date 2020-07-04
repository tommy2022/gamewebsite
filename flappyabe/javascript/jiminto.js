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
    this.rate += 0.5;
    this.draw();
  }

  jump() {
    this.count_after_rise = 0;
    this.rate = this.jumpInitSpeed;
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
