var Player = function(width, height) {
  this.fill = '#ff6600';
  this.x = width / 2;
  this.y = height / 2;
  this.width = width;
  this.height = height;
};

Player.prototype.render = function(to) {
  this.player = to.append('svg:rect')
    .attr('width', 20)
    .attr('height', 20)
    .attr('class', 'player')
    .attr('fill', this.fill)
    .attr('x', this.width / 2)
    .attr('y', this.height / 2);

  this.setupDragging();
};

Player.prototype.setupDragging = function() {
  var that = this;
  var drag = d3.behavior.drag()
    .on("drag", function(d,i) {

      if(that.x >= that.width - 9) {
        that.x = that.width - 10;
      } else if(that.x <= 10) {
        that.x = 11;
      } else {
        that.x += d3.event.dx
      }

      if(that.y >= that.height - 9) {
        that.y = that.height - 10;
      } else if(that.y <= 10) {
        that.y = 11;
      } else {
        that.y += d3.event.dy        
      }

      that.player
        .attr('x', that.x)
        .attr('y', that.y);
    });

  this.player.call(drag);


};






