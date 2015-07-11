var Player = function(width, height) {
  
  this.path = 'm241,221l13,-16l12,16l-25,0z';
  this.fill = '#ff6600';
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.r = 5;
  this.width = width;
  this.height = height;
};

Player.prototype.render = function(to) {
  this.el = to.append('g:path')
    .attr('d', this.path)
    .attr('fill', this.fill);
    // .attr(transform, 'translate('+this.width/2+','+this.height/2+')');

  // this.setupDragging();
  // return this;
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
  this.x = x;

  return this.x;
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
  this.y = y;
  return this.y;
};

Player.prototype.transform = function(opts) {
  this.angle = opts.angle || this.angle;
  // this.setX = 
};