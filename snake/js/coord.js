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
