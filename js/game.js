const Player = require('./player.js');
const PlayerBullet = require('./player_bullet.js');
const GroundEnemy = require('./ground_enemy.js');
const EnemyBullet = require('./enemy_bullet.js');

const BUFFER = 100;

class Game {
  constructor() {
    this.player = new Player();
    this.initBullets();
    this.currentBullet = 0;
    this.scrollX = 0;
    this.initEnemies();
    this.buffer = 0;
  }

  initBullets() {
    this.playerBullets = [];
    for (let i = 0; i < 10; i++) {
      const bullet = new PlayerBullet(this.player);
      this.playerBullets.push(bullet);
    }
  }

  initEnemies() {
    this.enemies = [];
    this.enemyBullets = [];

    const enemy = new GroundEnemy();
    this.enemies.push(enemy);

    for(let i = 0; i < 5; i++) {
      const enemyBullet = new EnemyBullet(enemy);
      this.enemyBullets.push(enemyBullet);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawBackground(ctx);
    this.allObjects().forEach(obj => {
      obj.draw(ctx);
    });
  }

  drawBackground(ctx) {
    const background = document.getElementById("background");
    ctx.drawImage(background, ctx.canvas.width-this.scrollX, 0, this.scrollX, ctx.canvas.height, 0, 0, this.scrollX, ctx.canvas.height);
    ctx.drawImage(background, this.scrollX, 0, ctx.canvas.width, ctx.canvas.height);
  }

  updateScrollX(key) {
    if (key === "left") {
      this.scrollX += 3;
      if (this.scrollX >= 1000) this.scrollX = 0;
    } else if (key === "right") {
      this.scrollX -= 3;
      if (this.scrollX <= 0) this.scrollX = 1000;
    }
  }

  move() {
    this.playerBullets.forEach(pBullet => {
      pBullet.move();
    });
    this.enemies.forEach(enemy => {
      enemy.move();
    });
    this.enemyBullets.forEach(eBullet => {
      eBullet.move();
    });

    this.buffer = (this.buffer + 1) % BUFFER;
  }

  checkCollisions() {
    this.enemyBullets.forEach(eBullet => {
      this.player.collideWith(eBullet);
    });

    this.enemies.forEach(enemy => {
      this.player.collideWith(enemy);

      this.playerBullets.forEach(pBullet => {
        enemy.collideWith(pBullet);
        if (enemy.health <= 0) {
          this.removeEnemy(enemy);
        }
      });
    });
  }

  randomEnemyShoot() {
    if (this.buffer === 0) {
      const idx = Math.floor(Math.random() * this.enemyBullets.length);
      if (idx !== 0) {
        this.enemyBullets[idx].shoot();
      }
    }
  }

  removeEnemy(enemy) {
    const idx = this.enemies.indexOf(enemy);

    this.enemyBullets = this.enemyBullets.filter(bullet => (
      bullet.enemy !== this.enemies[idx]
    ));

    this.enemies = this.enemies.slice(0, idx).concat(this.enemies.slice(idx+1));
  }

  allObjects() {
    return this.playerBullets.concat(this.enemies).concat([this.player]).concat(this.enemyBullets);
  }

  shoot() {
    this.playerBullets[this.currentBullet].shoot();
    this.currentBullet = (this.currentBullet + 1) % this.playerBullets.length;
  }
}

module.exports = Game;
