class EnemyBullet {
  constructor() {
    this.pos = [-10, -10];
    this.vel = [0, 0];
    this.radius = 3;
  }

  shoot(enemy) {
    this.pos[0] = enemy.pos[0] + 15;
    this.pos[1] = enemy.pos[1] + 15;
    this.vel[0] = enemy.vel[0] * 2;
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.pos[0] >= 1005 || this.pos[0] <= -10) {
      this.pos[0] = -10;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = EnemyBullet;
