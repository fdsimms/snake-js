var SnakeView = require("./snake-view");


$l(function () {

  var SnakeEl = $l(".snake");
  var snake = new SnakeView(SnakeEl);
  snake.draw();

});
