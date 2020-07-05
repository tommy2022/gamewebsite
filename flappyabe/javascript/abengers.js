class Abengers {
  constructor(context, num_player, abe, aso) {
    this.context = context;

    const temp = [];
    temp.push(new Jiminto(abe, context));
    if (num_player == 2) {
      temp.push(new Jiminto(aso, context));
    }
    this.characters = temp;
  }

  drop() {
    this.characters.forEach((character) => {
      if (!character.dead) {
        character.drop();
      }
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


  get_status(num) {
    return this.characters[num].dead;
  }

  get_gameover() {
    let bool = true;
    this.characters.forEach((character) => {
      //if there is one false, then bool = false;
      bool = (bool && character.get_status())
    });
    return bool;
  }

  set_status(num, bool) {
    this.characters[num].dead = bool;
    this.characters[num].clear();
  }
}

class Jiminto {
  constructor(character, context) {
    this.context = context;
    this.img = {
      rise: character.rise,
      fall: character.fall,
    }
    this.pos = {
      x: character.x_pos,
      y: 50,
    }
    this.dim = {
      w: character.dim,
      h: character.dim,
    }
    this.rate = 0;
    this.drop_increment = 0.4;
    this.jumpInitSpeed = -6;
    this.count_after_rise = 0;
    this.dead = false;
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
    this.clear();
    this.pos.y += this.rate;
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.rate = 0;
    }
    else if (this.pos.y > canvas.height - this.dim.h) {
      this.pos.y = canvas.height - this.dim.h;
    }
    this.rate += this.drop_increment;
    this.draw();
  }

  jump() {
    this.count_after_rise = 0;
    this.rate = this.jumpInitSpeed;
  }

  getPos() {
    return {
      x: this.pos.x + 10,
      y: (this.pos.y + 5)| 0,
    }
  }

  get_status() {
    return this.dead;
  }
}
