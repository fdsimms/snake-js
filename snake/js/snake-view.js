var Board = require("./board");

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
