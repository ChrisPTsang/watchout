// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
}

var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

var container = d3.select('.container');

var gameBoard = container.append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('background-color', 'black');

container.style('margin', '50px');

var updateScore = function() {
  container.select('.current')
    .text(gameStats.score.toString());
};

var updateBestScore = function () {
  gameStats.bestScore = gameStats.bestScore > gameStats.score ? gameStats.bestScore : gameStats.score;

  container.select('.high')
    .text(gameStats.bestScore.toString());
};


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

  
};


//create enemies
var createEnemies = function() {
  var enemies = _.range(0, gameOptions.nEnemies);

  return _.map(enemies, function(enemy, index) {
    return {
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
  
};

var render = function(enemy_data) {
  
  console.log(enemy_data.length);

  var enemies = gameBoard.selectAll('circle.enemy')
  // we don't understand this::::
    .data(enemy_data, function(d) { return d.y; });


  enemies.enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    // .transition()
    .attr('cx', function(enemy) {
      // console.log(axes.x(enemy.x));
      return axes.x(enemy.x);
    })
    .attr('cy', function(enemy) {
      // console.log(axes.y(enemy.y));
      // console.log(enemy);
      return axes.y(enemy.y);
    })
    .attr('r', 20)
    .attr('fill', 'red');

  enemies.exit()
    .remove();

};


var play = function() {

  var gameTurn = function() {
    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);
  };


  gameTurn();
  console.log('-------');
  setInterval(gameTurn, 2000);        


  // render(createEnemies());

  // window.setInterval(function() {
  //   render(createEnemies());
  // }, 2000); 
};

play();








