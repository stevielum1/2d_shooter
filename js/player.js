const RUNNING_RIGHT = [[7,82,30,39],[44,82,29,39], [78,82,34,40],[118,83,29,39]];
const RUNNING_LEFT = [[496,82,32,39],[462,82,29,39], [423,82,34,40],[388,83,29,39]];
const RUNNING_UPRIGHT = [[8,171,28,48],[47,171,23,48],[71,171,29,48],[107,173,24,48]];
const RUNNING_DOWNRIGHT = [[11,226,27,42],[47,226,26,42],[78,226,27,43],[116,227,26,42]];
const RUNNING_UPLEFT = [[497,171,28,48],[465,171,23,48],[435,171,29,48],[404,173,24,48]];
const RUNNING_DOWNLEFT = [[495,226,29,42],[462,226,27,42],[428,226,28,43],[393,227,26,42]];
const BUFFER = 10;

class Player {

  constructor() {
    this.health = 100;
    this.pos = [500, 450];
    this.angle = 0;
    this.sprite = "stand right";
    this.currentSprite = 0;
    this.buffer = 0;
  }

  updateAngle(e) {
    const xDist = e.pageX - this.pos[0];
    const yDist = e.pageY - this.pos[1];
    this.angle = Math.atan2(yDist, xDist);
  }

  // draw(ctx) {
  //   ctx.save();
  //
  //   ctx.translate(this.pos[0]-7.5, this.pos[1]);
  //   ctx.rotate(this.angle);
  //
  //   ctx.beginPath();
  //   ctx.rect(0, -5, 30, 10);
  //   ctx.fill();
  //   ctx.closePath();
  //
  //   ctx.translate(-this.pos[0]+7.5, -this.pos[1]);
  //   ctx.rotate(-this.angle);
  //
  //   ctx.restore();
  // }

  draw(ctx) {
    const contra3 = document.getElementById("contra3");
    switch(this.sprite) {
      case "run right":
        if (-1.5 < this.angle && this.angle < -0.25) {
          ctx.drawImage(contra3, RUNNING_UPRIGHT[this.currentSprite][0], RUNNING_UPRIGHT[this.currentSprite][1], RUNNING_UPRIGHT[this.currentSprite][2], RUNNING_UPRIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_UPRIGHT[this.currentSprite][2], RUNNING_UPRIGHT[this.currentSprite][3]);
        } else if (0.5 < this.angle && this.angle < 1) {
          ctx.drawImage(contra3, RUNNING_DOWNRIGHT[this.currentSprite][0], RUNNING_DOWNRIGHT[this.currentSprite][1], RUNNING_DOWNRIGHT[this.currentSprite][2], RUNNING_DOWNRIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_DOWNRIGHT[this.currentSprite][2], RUNNING_DOWNRIGHT[this.currentSprite][3]);
        } else {
          ctx.drawImage(contra3, RUNNING_RIGHT[this.currentSprite][0], RUNNING_RIGHT[this.currentSprite][1], RUNNING_RIGHT[this.currentSprite][2], RUNNING_RIGHT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_RIGHT[this.currentSprite][2], RUNNING_RIGHT[this.currentSprite][3]);
        }
        break;
      case "run left":
        if (-3 < this.angle && this.angle < -1.5) {
          ctx.drawImage(contra3, RUNNING_UPLEFT[this.currentSprite][0], RUNNING_UPLEFT[this.currentSprite][1], RUNNING_UPLEFT[this.currentSprite][2], RUNNING_UPLEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_UPLEFT[this.currentSprite][2], RUNNING_UPLEFT[this.currentSprite][3]);
        } else if (1.2 < this.angle && this.angle < 2) {
          ctx.drawImage(contra3, RUNNING_DOWNLEFT[this.currentSprite][0], RUNNING_DOWNLEFT[this.currentSprite][1], RUNNING_DOWNLEFT[this.currentSprite][2], RUNNING_DOWNLEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_DOWNLEFT[this.currentSprite][2], RUNNING_DOWNLEFT[this.currentSprite][3]);
        } else {
          ctx.drawImage(contra3, RUNNING_LEFT[this.currentSprite][0], RUNNING_LEFT[this.currentSprite][1], RUNNING_LEFT[this.currentSprite][2], RUNNING_LEFT[this.currentSprite][3], this.pos[0], this.pos[1], RUNNING_LEFT[this.currentSprite][2], RUNNING_LEFT[this.currentSprite][3]);
        }
        break;
      case "stand right":
        if (-1.5 < this.angle && this.angle < -0.25) {
          ctx.drawImage(contra3, RUNNING_UPRIGHT[1][0], RUNNING_UPRIGHT[1][1], RUNNING_UPRIGHT[1][2], RUNNING_UPRIGHT[1][3], this.pos[0], this.pos[1], RUNNING_UPRIGHT[1][2], RUNNING_UPRIGHT[1][3]);
        } else if (0.5 < this.angle && this.angle < 1) {
          ctx.drawImage(contra3, RUNNING_DOWNRIGHT[1][0], RUNNING_DOWNRIGHT[1][1], RUNNING_DOWNRIGHT[1][2], RUNNING_DOWNRIGHT[1][3], this.pos[0], this.pos[1], RUNNING_DOWNRIGHT[1][2], RUNNING_DOWNRIGHT[1][3]);
        } else {
          ctx.drawImage(contra3, RUNNING_RIGHT[1][0], RUNNING_RIGHT[1][1], RUNNING_RIGHT[1][2], RUNNING_RIGHT[1][3], this.pos[0], this.pos[1], RUNNING_RIGHT[1][2], RUNNING_RIGHT[1][3]);
        }
        break;
      case "stand left":
        if (-3 < this.angle && this.angle < -1.55) {
          ctx.drawImage(contra3, RUNNING_UPLEFT[1][0], RUNNING_UPLEFT[1][1], RUNNING_UPLEFT[1][2], RUNNING_UPLEFT[1][3], this.pos[0], this.pos[1], RUNNING_UPLEFT[1][2], RUNNING_UPLEFT[1][3]);
        } else if (1.2 < this.angle && this.angle < 2) {
          ctx.drawImage(contra3, RUNNING_DOWNLEFT[1][0], RUNNING_DOWNLEFT[1][1], RUNNING_DOWNLEFT[1][2], RUNNING_DOWNLEFT[1][3], this.pos[0], this.pos[1], RUNNING_DOWNLEFT[1][2], RUNNING_DOWNLEFT[1][3]);
        } else {
          ctx.drawImage(contra3, RUNNING_LEFT[1][0], RUNNING_LEFT[1][1], RUNNING_LEFT[1][2], RUNNING_LEFT[1][3], this.pos[0], this.pos[1], RUNNING_LEFT[1][2], RUNNING_LEFT[1][3]);
        }
        break;
      default:
        break;
    }

    if (this.buffer < BUFFER) {
      this.buffer += 1;
    } else {
      this.buffer = 0;
      this.currentSprite = (this.currentSprite + 1) % 4;
    }
  }
}

module.exports = Player;
