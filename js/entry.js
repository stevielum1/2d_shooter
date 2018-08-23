const GameView = require('./game_view.js');

console.log("game works");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const gameView = new GameView(ctx);
  gameView.start();

  canvas.addEventListener("mousemove", e => {
    gameView.game.player.updateAngle(e);
  });

});
