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
    this.enemyBuffer = 0;
    this.enemyShootBuffer = 0;
    this.moving = "";
  }

  initBullets() {
    this.playerBullets = [];
    for (let i = 0; i < 10; i++) {
      const bullet = new PlayerBullet(this.player);
      this.playerBullets.push(bullet);
    }

    this.enemyBullets = [];
    for(let i = 0; i < 50; i++) {
      const bullet = new EnemyBullet(this);
      this.enemyBullets.push(bullet);
    }
  }

  initEnemies() {
    this.enemies = [];

    for (let i = 0; i < 20; i++) {
      const from = Math.random() < 0.5 ? "left" : "right";
      const enemy = new GroundEnemy({
        from,
        speed: 0,
        game: this
      });
      this.enemies.push(enemy);
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
    if (this.enemyShootBuffer === 7) {
      const idx = Math.floor(Math.random() * this.enemies.length);
      const enemy = this.enemies[idx];
      this.enemyBullets[this.currentEnemyBullet].shoot(enemy);
      this.currentEnemyBullet = (this.currentEnemyBullet + 1) % 50;
    }
    this.enemyShootBuffer = (this.enemyShootBuffer + 1) % BUFFER;
  }

  spawnEnemy() {
    if (this.enemyBuffer === 0) {
      const idx = Math.floor(Math.random() * this.enemies.length);
      this.enemies[idx].updateSpeed(Math.floor(Math.random() * 4) + 1);
    }
    this.enemyBuffer = (this.enemyBuffer + 1) % BUFFER;
  }

  removeEnemy(enemy) {
    const idx = this.enemies.indexOf(enemy);
    this.enemies[idx].updateSpeed(0);
    this.enemies[idx].updatePos();
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
