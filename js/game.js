const Player = require('./player.js');
const Bullet = require('./bullet.js');

class Game {
  constructor() {
    this.player = new Player();
    this.initBullets();
    this.currentBullet = 0;
    this.scrollX = 0;
  }

  initBullets() {
    this.bullets = [];
    for (let i = 0; i < 10; i++) {
      const bullet = new Bullet(this.player);
      this.bullets.push(bullet);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawBackground(ctx);
    this.player.draw(ctx);
    this.bullets.forEach(bullet => {
      bullet.draw(ctx);
    });
  }

  drawBackground(ctx) {
    const background = document.getElementById("background");
    ctx.drawImage(background, ctx.canvas.width-this.scrollX, 0, this.scrollX, ctx.canvas.height, 0, 0, this.scrollX, ctx.canvas.height);
    ctx.drawImage(background, this.scrollX, 0, ctx.canvas.width, ctx.canvas.height);
  }

  updateScrollX(key) {
    if (key === "left") {
      this.scrollX += 5;
      if (this.scrollX >= 1000) this.scrollX = 0;
    } else if (key === "right") {
      this.scrollX -= 5;
      if (this.scrollX <= 0) this.scrollX = 1000;
    }
  }

  move() {
    this.bullets.forEach(bullet => {
      bullet.move();
    });
  }

  shoot() {
    this.bullets[this.currentBullet].shoot();
    this.currentBullet = (this.currentBullet + 1) % this.bullets.length;
  }
}

module.exports = Game;
