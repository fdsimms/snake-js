var Coord = require("./coord");

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
