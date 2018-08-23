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
    this.currentEnemyBullet = 0;
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

    this.enemyBullets = [];
    for(let i = 0; i < 50; i++) {
      const bullet = new EnemyBullet();
      this.enemyBullets.push(bullet);
    }
  }

  initEnemies() {
    this.enemies = [];

    const enemy = new GroundEnemy({
      from: "left",
      speed: 3
    });

    this.enemies.push(enemy);
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
    if (this.buffer === 7) {
      const idx = Math.floor(Math.random() * this.enemies.length);
      const enemy = this.enemies[idx];
      this.enemyBullets[this.currentEnemyBullet].shoot(enemy);
      this.currentEnemyBullet = (this.currentEnemyBullet + 1) % 50;
    }
  }

  spawnEnemy() {
    if (this.buffer === 0) {
      const from = Math.random() < 0.5 ? "left" : "right";
      const speed = Math.floor(Math.random() * 4) + 1;
      const enemy = new GroundEnemy({
        from,
        speed
      });
      this.enemies.push(enemy);
    }
  }

  removeEnemy(enemy) {
    const idx = this.enemies.indexOf(enemy);
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
