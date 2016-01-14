var Snake = require('./snake');

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
