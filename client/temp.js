//Player constructor
var Player = function() {
  
  this.path = 'm292,116l91,111l-187,-1l96,-110z';

  this.fill = '#ff6600';
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.r = 5;

};

Player.prototype.render = function(to) {
  this.el = to.append('svg:path')
    .attr('d', this.path)
    .attr('fill', this.fill);

  this.transform = {
    x: this.gameOptions.width * 0.5,
    y: this.gameOptions.height * 0.5
  };

  this.setupDragging();
  return this;
};

Player.prototype.getX = function() {
  return this.x;
};

Player.prototype.setX = function(x) {
  var minX = this.gameOptions.padding;
  var maxX = this.gameOptions.width - this.gameOptions.padding;
  
  if(x <= minX) {
    x = minX;
  }
  if(x >= maxX) {
    x = maxX;
  }
  return this.x = x;
};

Player.prototype.getY = function() {
  return this.y;
};

Player.prototype.setY = function(y) {
  var minY = this.gameOptions.padding;
  var maxY = this.gameOptions.height - this.gameOptions.padding;
  
  if(y <= minY) {
    y = minY;
  }
  if(y >= maxY) {
    y = maxY;
  }
  return this.y = y;
};

Player.prototype.transform = function(opts) {
  this.angle = opts.angle || this.angle;
  // this.setX = 
};