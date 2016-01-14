/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__(4);
	
	
	$l(function () {
	
	  var SnakeEl = $l(".snake");
	  var snake = new SnakeView(SnakeEl);
	  snake.draw();
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Coord = __webpack_require__(2);
	
	var Snake = function (board) {
	  this.direction = "E";
	  this.segments = [];
	  this.board = board;
	  this.startSnake();
	};
	
	Snake.prototype.startSnake = function () {
	  var startSeg = new Coord(9, 9);
	  this.segments.push(startSeg);
	  this.board.grid[startSeg.x][startSeg.y] = "s";
	};
	
	Snake.prototype.move = function () {
	  var oldHead = this.segments[0];
	  var newHead = head.plus(Snake.DIRECTIONS[this.direction]);
	  this.segments.shift(newHead);
	  var oldTail = this.segments.pop();
	
	  this.board.grid[newHead.x][newHead.y] = "s";
	  this.board.grid[oldTail.x][oldTail.y] = null;
	};
	
	Snake.DIRECTIONS = {
	  N: new Coord(0, -1),
	  E: new Coord(1, 0),
	  S: new Coord(0, 1),
	  W: new Coord(-1, 0)
	};
	
	Snake.prototype.turn = function (direction) {
	  if (typeof Snake.DIRECTIONS[direction] !== "undefined") {
	    this.direction = direction;
	    console.log("I just turned " + this.direction);
	  }
	  console.log("What does that mean?" + direction);
	};
	
	module.exports = Snake;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Coord = function (x, y) {
	  this.x = x;
	  this.y = y;
	};
	
	Coord.prototype.plus = function (otherCoord) {
	  var newX = this.x + otherCoord.x;
	  var newY = this.y + otherCoord.y;
	  return new Coord(newX, newY);
	};
	
	Coord.prototype.equals = function (otherCoord) {
	  return (this.x === otherCoord.x) && (this.y === otherCoord.y);
	};
	
	Coord.prototype.isOpposite = function (otherCoord) {
	
	};
	
	module.exports = Coord;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(1);
	
	var Board = function () {
	  this.apples = [];
	  this.grid = this.makeGrid();
	  this.snake = new Snake(this);
	};
	
	Board.prototype.turnSnake = function (direction) {
	  this.snake.turn(direction);
	};
	
	Board.prototype.makeGrid = function () {
	  var grid = [];
	  for (var i = 0; i < 20; i++) {
	    var row = [];
	    for (var j = 0; j < 20; j++) {
	      row.push(null);
	    }
	    grid.push(row);
	  }
	  return grid;
	};
	
	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	
	var View = function ($el) {
	  this.$el = $el;
	  this.board = new Board();
	  this.setupBoard();
	  this.addListener();
	};
	
	View.prototype.addListener = function () {
	  this.$el.on("keydown", this.handleKeyEvent.bind(this));
	};
	
	View.prototype.handleKeyEvent = function (e) {
	  var keyCode = e.keyCode;
	  var direction = View.KEYCODES[keyCode];
	  this.board.turnSnake(direction);
	};
	
	View.KEYCODES = {
	  37: "W",
	  38: "N",
	  39: "E",
	  40: "S"
	};
	
	View.prototype.draw = function () {
	  $l('li').htmEls.forEach(function (htmEl) {
	    var $htmEl = $l(htmEl);
	    var row = $htmEl.attr("data-row");
	    var col = $htmEl.attr("data-col");
	
	    if (this.board.grid[row][col] === "s") {
	      $htmEl.addClass("contains-snake");
	    } else {
	      $htmEl.removeClass("contains-snake");
	    }
	  }.bind(this));
	};
	
	View.prototype.setupBoard = function () {
	  this.$el.append("<ul class=\"group\"></ul>");
	  var $ul = $l("ul");
	
	  for (var i = 0; i < 20; i++) {
	    for (var j = 0; j < 20; j++) {
	      $ul.append("<li data-row=\"" + i + "\" data-col=\""+ j + "\"></li>");
	    }
	  }
	
	};
	
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map