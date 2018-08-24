/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/enemy_bullet.js":
/*!****************************!*\
  !*** ./js/enemy_bullet.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class EnemyBullet {
  constructor(game) {
    this.game = game;
    this.pos = [-10, -10];
    this.vel = [0, 0];
    this.radius = 3;
  }

  shoot(enemy) {
    this.pos[0] = enemy.pos[0] + 15;
    this.pos[1] = enemy.pos[1] + 15;
    this.vel[0] = enemy.vel[0] * 2;
  }

  move() {
    if (this.game.moving === "left") {
      if (this.vel[0] > 0) {
        this.pos[0] = this.pos[0] + this.vel[0] * 1.5;
      } else {
        this.pos[0] = this.pos[0] + this.vel[0] * 0.5;
      }
    } else if (this.game.moving === "right") {
      if (this.vel[0] > 0) {
        this.pos[0] = this.pos[0] + this.vel[0] * 0.5;
      } else {
        this.pos[0] = this.pos[0] + this.vel[0] * 1.5;
      }
    } else {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }

    if (this.pos[0] >= 1005 || this.pos[0] <= -10) {
      this.pos[0] = -10;
      this.vel = [0, 0];
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = EnemyBullet;


/***/ }),

/***/ "./js/entry.js":
/*!*********************!*\
  !*** ./js/entry.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(/*! ./game_view.js */ "./js/game_view.js");

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


/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player.js */ "./js/player.js");
const PlayerBullet = __webpack_require__(/*! ./player_bullet.js */ "./js/player_bullet.js");
const GroundEnemy = __webpack_require__(/*! ./ground_enemy.js */ "./js/ground_enemy.js");
const EnemyBullet = __webpack_require__(/*! ./enemy_bullet.js */ "./js/enemy_bullet.js");

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


/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./js/game.js");

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


/***/ }),

/***/ "./js/ground_enemy.js":
/*!****************************!*\
  !*** ./js/ground_enemy.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayerBullet = __webpack_require__(/*! ./player_bullet.js */ "./js/player_bullet.js");

const RUNNING_RIGHT = [[819,9,32,39],[858,8,27,40],[890,9,34,39]];
const RUNNING_LEFT = [[699,9,32,39],[665,8,27,40],[626,9,34,39]];
const BUFFER = 10;

//vel, health, position as OPTIONS

class GroundEnemy {
  constructor(options) {
    this.game = options.game;
    this.health = 2;
    this.from = options.from;
    this.pos = [0,0];
    this.updatePos();
    this.vel = [0,0];
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
    if (this.game.moving === "left") {
      if (this.vel[0] > 0) {
        this.pos[0] = this.pos[0] + this.vel[0] * 1.5;
      } else {
        this.pos[0] = this.pos[0] + this.vel[0] * 0.5;
      }
    } else if (this.game.moving === "right") {
      if (this.vel[0] > 0) {
        this.pos[0] = this.pos[0] + this.vel[0] * 0.5;
      } else {
        this.pos[0] = this.pos[0] + this.vel[0] * 1.5;
      }
    } else {
      this.pos[0] += this.vel[0];
    }
    if (this.pos[0] > 1005) {
      this.pos[0] = -5;
    }
    if (this.pos[0] < -5) {
      this.pos[0] = 1005;
    }
  }

  updateSpeed(speed) {
    this.vel = this.from === "left" ? [-speed, 0] : [speed, 0];
  }

  updatePos() {
    this.pos = this.from === "left" ? [-30, 450] : [1005, 450];
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


/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyBullet = __webpack_require__(/*! ./enemy_bullet.js */ "./js/enemy_bullet.js");
const GroundEnemy = __webpack_require__(/*! ./ground_enemy.js */ "./js/ground_enemy.js");

const RUNNING_RIGHT = [[7,82,30,39],[44,82,29,39], [78,82,34,40],[118,83,29,39]];
const RUNNING_LEFT = [[496,82,32,39],[462,82,29,39], [423,82,34,40],[388,83,29,39]];
const RUNNING_UPRIGHT = [[8,171,28,48],[47,171,23,48],[71,171,29,48],[107,173,24,48]];
const RUNNING_DOWNRIGHT = [[11,226,27,42],[47,226,26,42],[78,226,27,43],[116,227,26,42]];
const RUNNING_UPLEFT = [[497,171,28,48],[465,171,23,48],[435,171,29,48],[404,173,24,48]];
const RUNNING_DOWNLEFT = [[495,226,29,42],[462,226,27,42],[428,226,28,43],[393,227,26,42]];
const JUMPING_RIGHT = [[2,50,24,20],[30,49,20,24],[59,49,24,20],[93,48,20,24]];
const JUMPING_LEFT = [[509,50,24,20],[485,49,20,24],[452,49,24,20],[422,48,20,24]];
const DEAD_RIGHT = [[110,278,30,41],[16,291,32,27],[55,280,48,42]];
const DEAD_LEFT = [[395,278,30,41],[487,291,32,27],[432,280,48,42]];

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


/***/ }),

/***/ "./js/player_bullet.js":
/*!*****************************!*\
  !*** ./js/player_bullet.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class PlayerBullet {
  constructor(player) {
    this.player = player;
    this.pos = [-10, -10];
    this.vel = [0, 0];
    this.radius = 3;
  }

  shoot() {
    this.pos[0] = this.player.pos[0]+15;
    this.pos[1] = this.player.pos[1]+15;
    this.vel[0] = Math.cos(this.player.angle) * 10;
    this.vel[1] = Math.sin(this.player.angle) * 10;
  }

  move() {
    const xPos = this.pos[0] + this.vel[0];
    const yPos = this.pos[1] + this.vel[1];
    if (xPos > 1000 || xPos < 0) {
      this.pos = [-10, -10];
      this.vel = [0, 0];
    } else if (yPos > 500 || yPos < 0) {
      this.pos = [-10, -10];
      this.vel = [0, 0];
    } else {
      this.pos[0] = xPos;
      this.pos[1] = yPos;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = PlayerBullet;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map