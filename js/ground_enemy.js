const PlayerBullet = require('./player_bullet.js');

const RUNNING_RIGHT = [[819,9,32,39],[858,8,27,40],[890,9,34,39]];
const RUNNING_LEFT = [[699,9,32,39],[665,8,27,40],[626,9,34,39]];
const BUFFER = 10;

//vel, health, position as OPTIONS

class GroundEnemy {
  constructor(options) {
    this.health = 2;
    this.pos = [300, 450];
    this.vel = [3, 0];
    this.width = 32;
    this.height = 40;
    this.currentSprite = 0;
    this.buffer = 0;
  }

  draw(ctx) {
    const groundEnemies = document.getElementById("contra3GroundEnemies");

    if (this.vel[0] >= 0) {
      ctx.drawImage(groundEnemies, RUNNING_RIGHT[this.currentSprite][0], RUNNING_RIGHT[this.currentSprite][1], RUNNING_RIGHT[this.currentSprite][2], RUNNING_RIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_RIGHT[this.currentSprite][2], RUNNING_RIGHT[this.currentSprite][3]);
    } else {
      ctx.drawImage(groundEnemies, RUNNING_LEFT[this.currentSprite][0], RUNNING_LEFT[this.currentSprite][1], RUNNING_LEFT[this.currentSprite][2], RUNNING_LEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_LEFT[this.currentSprite][2], RUNNING_LEFT[this.currentSprite][3]);
    }

    if (this.buffer < BUFFER) {
      this.buffer += 1;
    } else {
      this.buffer = 0;
      this.currentSprite = (this.currentSprite + 1) % 3;
    }
  }

  move() {
    this.pos[0] += this.vel[0];
    if (this.pos[0] >= 1005) {
      this.pos[0] = -5;
    }
    if (this.pos[0] <= -5) {
      this.pos[0] = 1005;
    }
  }

  collideWith(object) {
    if (object instanceof PlayerBullet) {
      if (object.pos[0] < this.pos[0] + this.width &&
          object.pos[0] + object.radius > this.pos[0] &&
          object.pos[1] < this.pos[1] + this.height &&
          object.pos[1] + object.radius > this.pos[1]) {
            this.health -= 1;
            object.pos = [-10,-10];
            object.vel = [0,0];
      }
    }
  }
}

module.exports = GroundEnemy;
