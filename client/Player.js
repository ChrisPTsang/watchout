var Player = function(width, height) {
  this.fill = '#ff6600';
  this.x = width / 2;
  this.y = height / 2;
  this.width = width;
  this.height = height;
};

Player.prototype.render = function(to) {
  this.player = to.append('svg:image')
    .attr('xlink:href', 'alienblaster.png')
    .attr('width', 30)
    .attr('height', 30)
    .attr('class', 'player')
    .attr('fill', this.fill)
    .attr('x', this.width / 2)
    .attr('y', this.height / 2);
};


