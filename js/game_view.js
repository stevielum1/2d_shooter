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
    requestAnimationFrame(this.step.bind(this));
  }

  bindKeyHandlers() {
    key('space', () => this.game.shoot() );
    key('a', () => {
      this.keydown = "left";
      this.game.player.sprite = "run";
    });
    key('d', () => {
      this.keydown = "right";
      this.game.player.sprite = "run";
    });
    window.addEventListener("keyup", e => {
      switch(e.which) {
        case 65:
          if (this.keydown !== "right") {
            this.keydown = "";
            this.game.player.sprite = "stand";
          }
          break;
        case 68:
          if (this.keydown !== "left") {
            this.keydown = "";
            this.game.player.sprite = "stand";
          }
          break;
        default:
          break;
      }
    });
  }

}

module.exports = GameView;
