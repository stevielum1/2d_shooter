const EnemyBullet = require('./enemy_bullet.js');
const GroundEnemy = require('./ground_enemy.js');

const RUNNING_RIGHT = [[7,82,30,39],[44,82,29,39], [78,82,34,40],[118,83,29,39]];
const RUNNING_LEFT = [[496,82,32,39],[462,82,29,39], [423,82,34,40],[388,83,29,39]];
const RUNNING_UPRIGHT = [[8,171,28,48],[47,171,23,48],[71,171,29,48],[107,173,24,48]];
const RUNNING_DOWNRIGHT = [[11,226,27,42],[47,226,26,42],[78,226,27,43],[116,227,26,42]];
const RUNNING_UPLEFT = [[497,171,28,48],[465,171,23,48],[435,171,29,48],[404,173,24,48]];
const RUNNING_DOWNLEFT = [[495,226,29,42],[462,226,27,42],[428,226,28,43],[393,227,26,42]];
const JUMPING_RIGHT = [[2,50,24,20],[30,49,20,24],[59,49,24,20],[93,48,20,24]];
const JUMPING_LEFT = [[509,50,24,20],[485,49,20,24],[452,49,24,20],[422,48,20,24]];
const DEAD_RIGHT = [[110,278,30,41],[16,291,32,27],[55,290,48,32]];
const DEAD_LEFT = [[395,278,30,41],[487,291,32,27],[432,290,48,32]];

const BUFFER = 10;

class Player {

  constructor() {
    this.health = 100;
    this.pos = [500, 450];
    this.angle = 0;
    this.width = 30;
    this.height = 40;
    this.sprite = "stand";
    this.face = "right";
    this.jumping = false;
    this.dead = false;
    this.vel = [0,0];
    this.currentSprite = 0;
    this.buffer = 0;
  }

  updateAngle(e) {
    const xDist = e.pageX - (this.pos[0] + 15);
    const yDist = e.pageY - (this.pos[1] + 15);
    this.angle = Math.atan2(yDist, xDist);
    if (-1.5 < this.angle && this.angle < 1.5) {
      this.face = "right";
    } else {
      this.face = "left";
    }
  }

  updateJump() {
    if (this.jumping) {
      this.vel[1] += 0.1;
      this.pos[1] += this.vel[1];
      if (this.pos[1] >= 450) {
        this.pos[1] = 450;
        this.vel = [0,0];
        this.jumping = false;
        this.sprite = "run";
      }
    } else {
      this.jumping = true;
      this.vel[1] = -5;
      this.pos[1] += this.vel[1];
    }
  }

  collideWith(object) {
    if (object instanceof GroundEnemy) {
      if (object.pos[0] < this.pos[0] + this.width &&
          object.pos[0] + object.width > this.pos[0] &&
          object.pos[1] < this.pos[1] + this.height &&
          object.pos[1] + object.width > this.pos[1]) {
            this.health -= 100;
          }
    } else if (object instanceof EnemyBullet) {
      if (object.pos[0] < this.pos[0] + this.width &&
          object.pos[0] + object.radius > this.pos[0] &&
          object.pos[1] < this.pos[1] + this.height &&
          object.pos[1] + object.radius > this.pos[1]) {
            this.health -= 10;
            object.pos = [-10, -10];
            object.vel = [0, 0];
          }
    }
    if (this.health <= 0 && this.sprite !== "dead") {
      this.currentSprite = 0;
      this.dead = true;
      this.sprite = "dead";
    }
  }

  draw(ctx) {
    const contra3 = document.getElementById("contra3");
    if (this.jumping) {
      this.updateJump();
    }
    switch(this.sprite) {
      case "run":
        if (this.face === "right") {
          if (this.jumping) {
            ctx.drawImage(contra3, JUMPING_RIGHT[this.currentSprite][0], JUMPING_RIGHT[this.currentSprite][1], JUMPING_RIGHT[this.currentSprite][2], JUMPING_RIGHT[this.currentSprite][3], this.pos[0], this.pos[1], JUMPING_RIGHT[this.currentSprite][2], JUMPING_RIGHT[this.currentSprite][3]);
          } else {
            if (-1.55 < this.angle && this.angle < -0.25) {
              ctx.drawImage(contra3, RUNNING_UPRIGHT[this.currentSprite][0], RUNNING_UPRIGHT[this.currentSprite][1], RUNNING_UPRIGHT[this.currentSprite][2], RUNNING_UPRIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_UPRIGHT[this.currentSprite][2], RUNNING_UPRIGHT[this.currentSprite][3]);
            } else if (0.35 < this.angle && this.angle < 1.5) {
              ctx.drawImage(contra3, RUNNING_DOWNRIGHT[this.currentSprite][0], RUNNING_DOWNRIGHT[this.currentSprite][1], RUNNING_DOWNRIGHT[this.currentSprite][2], RUNNING_DOWNRIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_DOWNRIGHT[this.currentSprite][2], RUNNING_DOWNRIGHT[this.currentSprite][3]);
            } else {
              ctx.drawImage(contra3, RUNNING_RIGHT[this.currentSprite][0], RUNNING_RIGHT[this.currentSprite][1], RUNNING_RIGHT[this.currentSprite][2], RUNNING_RIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_RIGHT[this.currentSprite][2], RUNNING_RIGHT[this.currentSprite][3]);
            }
          }
        } else {
          if (this.jumping) {
            ctx.drawImage(contra3, JUMPING_LEFT[this.currentSprite][0], JUMPING_LEFT[this.currentSprite][1], JUMPING_LEFT[this.currentSprite][2], JUMPING_LEFT[this.currentSprite][3], this.pos[0], this.pos[1], JUMPING_LEFT[this.currentSprite][2], JUMPING_LEFT[this.currentSprite][3]);
          } else {
            if (-2.9 < this.angle && this.angle < -1.5) {
              ctx.drawImage(contra3, RUNNING_UPLEFT[this.currentSprite][0], RUNNING_UPLEFT[this.currentSprite][1], RUNNING_UPLEFT[this.currentSprite][2], RUNNING_UPLEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_UPLEFT[this.currentSprite][2], RUNNING_UPLEFT[this.currentSprite][3]);
            } else if (1.5 < this.angle && this.angle < 2.75) {
              ctx.drawImage(contra3, RUNNING_DOWNLEFT[this.currentSprite][0], RUNNING_DOWNLEFT[this.currentSprite][1], RUNNING_DOWNLEFT[this.currentSprite][2], RUNNING_DOWNLEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_DOWNLEFT[this.currentSprite][2], RUNNING_DOWNLEFT[this.currentSprite][3]);
            } else {
              ctx.drawImage(contra3, RUNNING_LEFT[this.currentSprite][0], RUNNING_LEFT[this.currentSprite][1], RUNNING_LEFT[this.currentSprite][2], RUNNING_LEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_LEFT[this.currentSprite][2], RUNNING_LEFT[this.currentSprite][3]);
            }
          }
        }
        break;
      case "stand":
        if (this.face === "right") {
          if (-1.5 < this.angle && this.angle < -0.25) {
            ctx.drawImage(contra3, RUNNING_UPRIGHT[1][0], RUNNING_UPRIGHT[1][1], RUNNING_UPRIGHT[1][2], RUNNING_UPRIGHT[1][3], this.pos[0], this.pos[1], RUNNING_UPRIGHT[1][2], RUNNING_UPRIGHT[1][3]);
          } else if (0.5 < this.angle && this.angle < 1) {
            ctx.drawImage(contra3, RUNNING_DOWNRIGHT[1][0], RUNNING_DOWNRIGHT[1][1], RUNNING_DOWNRIGHT[1][2], RUNNING_DOWNRIGHT[1][3], this.pos[0], this.pos[1], RUNNING_DOWNRIGHT[1][2], RUNNING_DOWNRIGHT[1][3]);
          } else {
            ctx.drawImage(contra3, RUNNING_RIGHT[1][0], RUNNING_RIGHT[1][1], RUNNING_RIGHT[1][2], RUNNING_RIGHT[1][3], this.pos[0], this.pos[1], RUNNING_RIGHT[1][2], RUNNING_RIGHT[1][3]);
          }
        } else {
          if (-3 < this.angle && this.angle < -1.55) {
            ctx.drawImage(contra3, RUNNING_UPLEFT[1][0], RUNNING_UPLEFT[1][1], RUNNING_UPLEFT[1][2], RUNNING_UPLEFT[1][3], this.pos[0], this.pos[1], RUNNING_UPLEFT[1][2], RUNNING_UPLEFT[1][3]);
          } else if (1.2 < this.angle && this.angle < 2) {
            ctx.drawImage(contra3, RUNNING_DOWNLEFT[1][0], RUNNING_DOWNLEFT[1][1], RUNNING_DOWNLEFT[1][2], RUNNING_DOWNLEFT[1][3], this.pos[0], this.pos[1], RUNNING_DOWNLEFT[1][2], RUNNING_DOWNLEFT[1][3]);
          } else {
            ctx.drawImage(contra3, RUNNING_LEFT[1][0], RUNNING_LEFT[1][1], RUNNING_LEFT[1][2], RUNNING_LEFT[1][3], this.pos[0], this.pos[1], RUNNING_LEFT[1][2], RUNNING_LEFT[1][3]);
          }
        }
        break;
      case "dead":
        if (this.face === "right") {
          ctx.drawImage(contra3, DEAD_RIGHT[this.currentSprite][0], DEAD_RIGHT[this.currentSprite][1], DEAD_RIGHT[this.currentSprite][2], DEAD_RIGHT[this.currentSprite][3], this.pos[0], this.pos[1], DEAD_RIGHT[this.currentSprite][2], DEAD_RIGHT[this.currentSprite][3]);
        }
        if (this.face === "left") {
          ctx.drawImage(contra3, DEAD_LEFT[this.currentSprite][0], DEAD_LEFT[this.currentSprite][1], DEAD_LEFT[this.currentSprite][2], DEAD_LEFT[this.currentSprite][3], this.pos[0], this.pos[1], DEAD_LEFT[this.currentSprite][2], DEAD_LEFT[this.currentSprite][3]);
        }
        break;
      default:
        break;
    }

    if (this.buffer < BUFFER) {
      this.buffer += 1;
    } else {
      this.buffer = 0;
      if (this.dead) {
        if (this.currentSprite < 2) {
          this.currentSprite = (this.currentSprite + 1) % 4;
        }
      } else {
        this.currentSprite = (this.currentSprite + 1) % 4;
      }
    }
  }
}

module.exports = Player;
