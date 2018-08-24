const Game = require("./game.js");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game();
    this.keydown = "";
  }

  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.step.bind(this));
  }

  step() {
    this.game.updateScrollX(this.keydown);
    this.game.draw(this.ctx);
    this.game.move();
    this.game.checkCollisions();
    this.game.randomEnemyShoot();
    this.game.spawnEnemy();
    this.updateHealth();
    requestAnimationFrame(this.step.bind(this));
  }

  updateHealth() {
    const health = document.getElementById("health");
    if (this.game.player.health <= 0) {
      health.innerText = "Health: " + 0;
    } else {
      health.innerText = "Health: " + this.game.player.health;
    }
  }

  bindKeyHandlers() {
    key('space', () => {
      if (this.game.player.dead === false) this.game.shoot();
    });
    key('a', () => {
      if (this.game.player.dead === false) {
        this.keydown = "left";
        this.game.player.sprite = "run";
        this.game.moving = "left";
      }
    });
    key('d', () => {
      if (this.game.player.dead === false) {
        this.keydown = "right";
        this.game.player.sprite = "run";
        this.game.moving = "right";
      }
    });
    key('w', () => {
      if (this.game.player.dead === false) {
        this.game.player.updateJump();
      }
    });
    window.addEventListener("keyup", e => {
      if (this.game.player.dead === false) {
        switch(e.which) {
          case 65:
          if (this.keydown !== "right") {
            this.keydown = "";
            this.game.moving = "";
            if (this.game.player.jumping === false) {
              this.game.player.sprite = "stand";
            }
          }
          break;
          case 68:
          if (this.keydown !== "left") {
            this.keydown = "";
            this.game.moving = "";
            if (this.game.player.jumping === false) {
              this.game.player.sprite = "stand";
            }
          }
          break;
          default:
          break;
        }
      } else {
        this.keydown = "";
      }
    });
  }

}

module.exports = GameView;
