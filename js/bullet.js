class Bullet {
  constructor(player) {
    this.player = player;
    this.pos = [-10, -10];
    this.vel = [0, 0];
  }

  shoot() {
    this.pos[0] = this.player.pos[0]+15;
    this.pos[1] = this.player.pos[1]+15;
    this.vel[0] = Math.cos(this.player.angle) * 10;
    this.vel[1] = Math.sin(this.player.angle) * 10;
  }

  move() {
    const xPos = this.pos[0] + this.vel[0];
    const yPos = this.pos[1] + this.vel[1];
    if (xPos > 1000 || xPos < 0) {
      this.pos = [-10, -10];
      this.vel = [0, 0];
    } else if (yPos > 500 || yPos < 0) {
      this.pos = [-10, -10];
      this.vel = [0, 0];
    } else {
      this.pos[0] = xPos;
      this.pos[1] = yPos;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = Bullet;
